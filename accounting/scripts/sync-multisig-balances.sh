#!/usr/bin/env bash
# P326 — Multisig Balance Sync for RegenHub Optimism Safe
# Queries Safe Transaction Service API for current balances and recent transactions.
# Designed to run at sunrise/sunset cron cycles.
#
# Safe: 0xA594263e0449A28eAEf5BA6420E81cC1996b7782 (Optimism)
# Output: accounting/data/multisig-balances.json
#
# Usage: ./sync-multisig-balances.sh [sunrise|sunset]

set -euo pipefail

SAFE_ADDRESS="0xA594263e0449A28eAEf5BA6420E81cC1996b7782"
CHAIN="oeth"
SAFE_API="https://safe-transaction-optimism.safe.global/api/v1"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DATA_DIR="$(cd "$SCRIPT_DIR/../data" && pwd)"
BALANCE_FILE="$DATA_DIR/multisig-balances.json"
CYCLE="${1:-manual}"
TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
DATE_SHORT="$(date -u +%Y-%m-%d)"

# --- Fetch current balances ---
BALANCES_RAW=$(curl -sfL "${SAFE_API}/safes/${SAFE_ADDRESS}/balances/?trusted=true" 2>/dev/null || echo "[]")

if [ "$BALANCES_RAW" = "[]" ] || [ -z "$BALANCES_RAW" ]; then
  echo "ERROR: Failed to fetch balances from Safe API"
  exit 1
fi

# --- Parse balances with jq ---
PARSED_BALANCES=$(echo "$BALANCES_RAW" | jq '[.[] | {
  token: (if .token == null then "ETH" else .token.symbol end),
  name: (if .token == null then "Ether" else .token.name end),
  address: (if .tokenAddress == null then "native" else .tokenAddress end),
  decimals: (if .token == null then 18 else .token.decimals end),
  raw_balance: .balance,
  balance: (
    if .token == null then
      (.balance | tonumber / 1e18)
    elif .token.decimals == 6 then
      (.balance | tonumber / 1e6)
    elif .token.decimals == 18 then
      (.balance | tonumber / 1e18)
    else
      (.balance | tonumber / pow(10; .token.decimals))
    end
  )
}]')

# --- Fetch recent transactions (last 20) ---
TXS_RAW=$(curl -sfL "${SAFE_API}/safes/${SAFE_ADDRESS}/all-transactions/?limit=20&executed=true" 2>/dev/null || echo '{"results":[]}')

RECENT_TXS=$(echo "$TXS_RAW" | jq '[.results[:20] | .[] | {
  tx_hash: (.transactionHash // .safeTxHash // "pending"),
  timestamp: (.executionDate // .submissionDate // null),
  type: (
    if .transfers then "transfer"
    elif .dataDecoded then "contract_interaction"
    elif .to then "outgoing"
    else "other"
    end
  ),
  to: (.to // null),
  value: (.value // "0"),
  transfers: [(.transfers // [])[] | {
    token: (if .tokenInfo == null then "ETH" else .tokenInfo.symbol end),
    from: .from,
    to: .to,
    value: .value,
    decimals: (if .tokenInfo == null then 18 else (.tokenInfo.decimals // 18) end)
  }]
}]')

# --- Compute USD estimates (stablecoins at par, ETH needs price) ---
ETH_BALANCE=$(echo "$PARSED_BALANCES" | jq '[.[] | select(.token == "ETH") | .balance] | add // 0')
DAI_BALANCE=$(echo "$PARSED_BALANCES" | jq '[.[] | select(.token == "DAI") | .balance] | add // 0')
USDC_BALANCE=$(echo "$PARSED_BALANCES" | jq '[.[] | select(.token == "USDC") | .balance] | add // 0')
OTHER_STABLES=$(echo "$PARSED_BALANCES" | jq '[.[] | select(.token != "ETH" and .token != "DAI" and .token != "USDC") | .balance] | add // 0')

# Fetch ETH price from CoinGecko (free, no key)
ETH_USD=$(curl -sfL "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd" 2>/dev/null | jq '.ethereum.usd // 0')
if [ "$ETH_USD" = "0" ] || [ -z "$ETH_USD" ]; then
  ETH_USD="0"
  ETH_USD_NOTE="price_unavailable"
else
  ETH_USD_NOTE="coingecko"
fi

ETH_VALUE=$(echo "$ETH_BALANCE $ETH_USD" | awk '{printf "%.2f", $1 * $2}')
TOTAL_USD=$(echo "$ETH_VALUE $DAI_BALANCE $USDC_BALANCE $OTHER_STABLES" | awk '{printf "%.2f", $1 + $2 + $3 + $4}')

# --- Load previous state for diff ---
PREV_TOTAL="0.00"
if [ -f "$BALANCE_FILE" ]; then
  PREV_TOTAL=$(jq -r '.current.total_usd // "0.00"' "$BALANCE_FILE")
fi

CHANGE_USD=$(echo "$TOTAL_USD $PREV_TOTAL" | awk '{printf "%.2f", $1 - $2}')

# --- Read history, append new snapshot ---
HISTORY="[]"
if [ -f "$BALANCE_FILE" ]; then
  HISTORY=$(jq '.history // []' "$BALANCE_FILE")
fi

# Keep last 90 snapshots (~45 days at 2x/day)
NEW_SNAPSHOT=$(jq -n \
  --arg ts "$TIMESTAMP" \
  --arg cycle "$CYCLE" \
  --arg total "$TOTAL_USD" \
  --arg eth "$ETH_BALANCE" \
  --arg dai "$DAI_BALANCE" \
  --arg usdc "$USDC_BALANCE" \
  '{timestamp: $ts, cycle: $cycle, total_usd: ($total|tonumber), eth: ($eth|tonumber), dai: ($dai|tonumber), usdc: ($usdc|tonumber)}')

HISTORY=$(echo "$HISTORY" | jq --argjson snap "$NEW_SNAPSHOT" '. + [$snap] | .[-90:]')

# --- Write output ---
jq -n \
  --arg safe "$SAFE_ADDRESS" \
  --arg chain "$CHAIN" \
  --arg ts "$TIMESTAMP" \
  --arg cycle "$CYCLE" \
  --arg date "$DATE_SHORT" \
  --argjson balances "$PARSED_BALANCES" \
  --argjson txs "$RECENT_TXS" \
  --arg eth_balance "$ETH_BALANCE" \
  --arg dai_balance "$DAI_BALANCE" \
  --arg usdc_balance "$USDC_BALANCE" \
  --arg eth_usd "$ETH_USD" \
  --arg eth_usd_note "$ETH_USD_NOTE" \
  --arg eth_value "$ETH_VALUE" \
  --arg total_usd "$TOTAL_USD" \
  --arg prev_total "$PREV_TOTAL" \
  --arg change_usd "$CHANGE_USD" \
  --argjson history "$HISTORY" \
  '{
    safe: $safe,
    chain: $chain,
    last_sync: $ts,
    cycle: $cycle,
    current: {
      balances: $balances,
      eth_price_usd: ($eth_usd | tonumber),
      eth_price_source: $eth_usd_note,
      eth_value_usd: ($eth_value | tonumber),
      dai_balance: ($dai_balance | tonumber),
      usdc_balance: ($usdc_balance | tonumber),
      total_usd: ($total_usd | tonumber),
      previous_total_usd: ($prev_total | tonumber),
      change_usd: ($change_usd | tonumber)
    },
    recent_transactions: $txs,
    history: $history,
    _meta: {
      generated: $ts,
      script: "sync-multisig-balances.sh",
      sprint: "P326",
      habitat_account: "1120 — Crypto Holdings (Multisig)"
    }
  }' > "$BALANCE_FILE"

echo "--- Multisig Balance Sync ($CYCLE) ---"
echo "Safe: $SAFE_ADDRESS ($CHAIN)"
echo "Time: $TIMESTAMP"
echo ""
echo "Balances:"
echo "$PARSED_BALANCES" | jq -r '.[] | "  \(.token): \(.balance)"'
echo ""
echo "ETH price: \$${ETH_USD} (${ETH_USD_NOTE})"
echo "ETH value: \$${ETH_VALUE}"
echo "Stablecoins: \$$(echo "$DAI_BALANCE $USDC_BALANCE" | awk '{printf "%.2f", $1 + $2}')"
echo "Total USD: \$${TOTAL_USD} (prev: \$${PREV_TOTAL}, change: \$${CHANGE_USD})"
echo ""
echo "Recent transactions: $(echo "$RECENT_TXS" | jq 'length')"
echo "Written to: $BALANCE_FILE"
