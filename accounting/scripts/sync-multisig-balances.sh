#!/usr/bin/env bash
# P326/P333 — Multi-Chain Multisig Balance Sync for RegenHub LCA
# Queries Safe Transaction Service API for current balances across all chains
# where the Safe holds >$1 in assets.
#
# Safe: 0xA594263e0449A28eAEf5BA6420E81cC1996b7782
# Chains: Ethereum Mainnet, Optimism (and any future chains with >$1)
# Output: accounting/data/multisig-balances.json
#
# Usage: ./sync-multisig-balances.sh [sunrise|sunset]

set -euo pipefail

SAFE_ADDRESS="0xA594263e0449A28eAEf5BA6420E81cC1996b7782"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DATA_DIR="$(cd "$SCRIPT_DIR/../data" && pwd)"
BALANCE_FILE="$DATA_DIR/multisig-balances.json"
CYCLE="${1:-manual}"
TIMESTAMP="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
DATE_SHORT="$(date -u +%Y-%m-%d)"

# Chain configurations: name|api_base|chain_id|native_symbol
CHAINS=(
  "ethereum|https://safe-transaction-mainnet.safe.global/api/v1|1|ETH"
  "optimism|https://safe-transaction-optimism.safe.global/api/v1|10|ETH"
  "base|https://safe-transaction-base.safe.global/api/v1|8453|ETH"
  "arbitrum|https://safe-transaction-arbitrum.safe.global/api/v1|42161|ETH"
)

# Fetch ETH price once (shared across all chains)
ETH_USD=$(curl -sfL "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd" 2>/dev/null | jq '.ethereum.usd // 0')
if [ "$ETH_USD" = "0" ] || [ -z "$ETH_USD" ]; then
  ETH_USD="0"
  ETH_USD_NOTE="price_unavailable"
else
  ETH_USD_NOTE="coingecko"
fi

# Accumulate per-chain results
ALL_CHAINS_JSON="[]"
GRAND_TOTAL_USD="0"

for CHAIN_CONFIG in "${CHAINS[@]}"; do
  IFS='|' read -r CHAIN_NAME API_BASE CHAIN_ID NATIVE_SYMBOL <<< "$CHAIN_CONFIG"

  # Fetch balances
  BALANCES_RAW=$(curl -sfL "${API_BASE}/safes/${SAFE_ADDRESS}/balances/?trusted=true" 2>/dev/null || echo "")

  # Skip chains where safe doesn't exist or has no response
  if [ -z "$BALANCES_RAW" ] || [ "$BALANCES_RAW" = "[]" ]; then
    continue
  fi

  # Check if it's valid JSON array
  echo "$BALANCES_RAW" | jq '.' >/dev/null 2>&1 || continue

  # Parse balances
  PARSED_BALANCES=$(echo "$BALANCES_RAW" | jq --arg native "$NATIVE_SYMBOL" '[.[] | {
    token: (if .token == null then $native else .token.symbol end),
    name: (if .token == null then
      (if $native == "ETH" then "Ether"
       elif $native == "MATIC" then "Polygon"
       else $native end)
    else .token.name end),
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

  # Filter: only include this chain if total value > $1
  NATIVE_BAL=$(echo "$PARSED_BALANCES" | jq --arg native "$NATIVE_SYMBOL" '[.[] | select(.token == $native) | .balance] | add // 0')
  STABLE_BAL=$(echo "$PARSED_BALANCES" | jq '[.[] | select(.token == "USDC" or .token == "DAI" or .token == "USDT") | .balance] | add // 0')
  NATIVE_USD=$(echo "$NATIVE_BAL $ETH_USD" | awk '{printf "%.2f", $1 * $2}')
  CHAIN_TOTAL=$(echo "$NATIVE_USD $STABLE_BAL" | awk '{printf "%.2f", $1 + $2}')

  # Skip chains with <$1 total
  if [ "$(echo "$CHAIN_TOTAL" | awk '{print ($1 < 1.0)}')" = "1" ]; then
    continue
  fi

  # Fetch recent transactions for this chain (last 20)
  TXS_RAW=$(curl -sfL "${API_BASE}/safes/${SAFE_ADDRESS}/all-transactions/?limit=20&executed=true" 2>/dev/null || echo '{"results":[]}')

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

  # Build chain object
  CHAIN_JSON=$(jq -n \
    --arg chain "$CHAIN_NAME" \
    --arg chain_id "$CHAIN_ID" \
    --argjson balances "$PARSED_BALANCES" \
    --argjson txs "$RECENT_TXS" \
    --arg native_balance "$NATIVE_BAL" \
    --arg stable_balance "$STABLE_BAL" \
    --arg native_usd "$NATIVE_USD" \
    --arg total "$CHAIN_TOTAL" \
    '{
      chain: $chain,
      chain_id: ($chain_id | tonumber),
      balances: $balances,
      native_balance: ($native_balance | tonumber),
      stable_balance: ($stable_balance | tonumber),
      native_value_usd: ($native_usd | tonumber),
      total_usd: ($total | tonumber),
      recent_transactions: $txs
    }')

  ALL_CHAINS_JSON=$(echo "$ALL_CHAINS_JSON" | jq --argjson chain "$CHAIN_JSON" '. + [$chain]')
  GRAND_TOTAL_USD=$(echo "$GRAND_TOTAL_USD $CHAIN_TOTAL" | awk '{printf "%.2f", $1 + $2}')
done

# --- Compute consolidated balances across all chains ---
TOTAL_ETH=$(echo "$ALL_CHAINS_JSON" | jq '[.[].balances[] | select(.token == "ETH") | .balance] | add // 0')
TOTAL_USDC=$(echo "$ALL_CHAINS_JSON" | jq '[.[].balances[] | select(.token == "USDC") | .balance] | add // 0')
TOTAL_DAI=$(echo "$ALL_CHAINS_JSON" | jq '[.[].balances[] | select(.token == "DAI") | .balance] | add // 0')
TOTAL_USDT=$(echo "$ALL_CHAINS_JSON" | jq '[.[].balances[] | select(.token == "USDT") | .balance] | add // 0')

# --- Load previous state for diff ---
PREV_TOTAL="0.00"
if [ -f "$BALANCE_FILE" ]; then
  PREV_TOTAL=$(jq -r '.consolidated.total_usd // .current.total_usd // "0.00"' "$BALANCE_FILE")
fi
CHANGE_USD=$(echo "$GRAND_TOTAL_USD $PREV_TOTAL" | awk '{printf "%.2f", $1 - $2}')

# --- Read history, append new snapshot ---
HISTORY="[]"
if [ -f "$BALANCE_FILE" ]; then
  HISTORY=$(jq '.history // []' "$BALANCE_FILE")
fi

# Keep last 90 snapshots (~45 days at 2x/day)
NEW_SNAPSHOT=$(jq -n \
  --arg ts "$TIMESTAMP" \
  --arg cycle "$CYCLE" \
  --arg total "$GRAND_TOTAL_USD" \
  --arg eth "$TOTAL_ETH" \
  --arg dai "$TOTAL_DAI" \
  --arg usdc "$TOTAL_USDC" \
  --arg usdt "$TOTAL_USDT" \
  --arg chains "$(echo "$ALL_CHAINS_JSON" | jq -r '[.[].chain] | join(",")')" \
  '{timestamp: $ts, cycle: $cycle, total_usd: ($total|tonumber), eth: ($eth|tonumber), dai: ($dai|tonumber), usdc: ($usdc|tonumber), usdt: ($usdt|tonumber), chains: $chains}')

HISTORY=$(echo "$HISTORY" | jq --argjson snap "$NEW_SNAPSHOT" '. + [$snap] | .[-90:]')

# --- Write output ---
jq -n \
  --arg safe "$SAFE_ADDRESS" \
  --arg ts "$TIMESTAMP" \
  --arg cycle "$CYCLE" \
  --argjson chains "$ALL_CHAINS_JSON" \
  --arg eth_usd "$ETH_USD" \
  --arg eth_usd_note "$ETH_USD_NOTE" \
  --arg total_eth "$TOTAL_ETH" \
  --arg total_usdc "$TOTAL_USDC" \
  --arg total_dai "$TOTAL_DAI" \
  --arg total_usdt "$TOTAL_USDT" \
  --arg grand_total "$GRAND_TOTAL_USD" \
  --arg prev_total "$PREV_TOTAL" \
  --arg change_usd "$CHANGE_USD" \
  --argjson history "$HISTORY" \
  '{
    safe: $safe,
    last_sync: $ts,
    cycle: $cycle,
    chains: $chains,
    consolidated: {
      eth_price_usd: ($eth_usd | tonumber),
      eth_price_source: $eth_usd_note,
      total_eth: ($total_eth | tonumber),
      total_usdc: ($total_usdc | tonumber),
      total_dai: ($total_dai | tonumber),
      total_usdt: ($total_usdt | tonumber),
      total_usd: ($grand_total | tonumber),
      previous_total_usd: ($prev_total | tonumber),
      change_usd: ($change_usd | tonumber)
    },
    history: $history,
    _meta: {
      generated: $ts,
      script: "sync-multisig-balances.sh",
      sprint: "P326/P333",
      habitat_account: "1120 — Crypto Holdings (Multisig)",
      note: "Multi-chain sync. Includes all chains where Safe holds >$1."
    }
  }' > "$BALANCE_FILE"

# --- Output summary ---
echo "=== Multi-Chain Multisig Balance Sync ($CYCLE) ==="
echo "Safe: $SAFE_ADDRESS"
echo "Time: $TIMESTAMP"
echo ""
echo "Per-Chain Breakdown:"
echo "$ALL_CHAINS_JSON" | jq -r '.[] | "  \(.chain) (chain \(.chain_id)): $\(.total_usd)"'
echo ""
echo "Consolidated:"
echo "  ETH: $TOTAL_ETH (\$$(echo "$TOTAL_ETH $ETH_USD" | awk '{printf "%.2f", $1 * $2}') @ \$${ETH_USD})"
echo "  USDC: \$${TOTAL_USDC}"
echo "  DAI: \$${TOTAL_DAI}"
echo "  Total: \$${GRAND_TOTAL_USD} (prev: \$${PREV_TOTAL}, change: \$${CHANGE_USD})"
echo ""
echo "Written to: $BALANCE_FILE"
