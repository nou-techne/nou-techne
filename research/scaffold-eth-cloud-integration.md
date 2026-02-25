# Scaffold-ETH 2 × $CLOUD Credit Protocol: Integration Analysis

**Techne Studio · February 2026**

---

## Executive Summary

[Scaffold-ETH 2](https://scaffoldeth.io) is Austin Griffith's open-source toolkit for building Ethereum dApps — a full development environment built on NextJS, Wagmi, Viem, RainbowKit, and Hardhat/Foundry. This report analyzes how Scaffold-ETH 2 can accelerate the onchain implementation of the $CLOUD credit protocol, Techne's prepaid medium for information economy infrastructure.

The $CLOUD system is currently specified at the accounting layer (Supabase + PL/pgSQL) with Superfluid streaming integration and a patronage weight bridge. The onchain contract layer — minting, redemption, staking, transfer, and governance — has not yet been built. Scaffold-ETH 2 provides the fastest path from specification to working contracts with a live frontend.

---

## 1. What Scaffold-ETH 2 Provides

### Core Stack

| Layer | Technology | Role |
|-------|-----------|------|
| Smart Contracts | **Hardhat** or **Foundry** | Compile, deploy, test Solidity contracts |
| Frontend | **NextJS + TypeScript** | React app with SSR, routing, API routes |
| Wallet | **RainbowKit** | Multi-wallet connection (MetaMask, WalletConnect, Coinbase, etc.) |
| Chain Interaction | **Wagmi + Viem** | Type-safe React hooks for contract reads, writes, event listening |
| UI | **DaisyUI + Tailwind** | Component library with dark mode, responsive design |

### Key Developer Features

- **Contract Hot Reload** — Edit a Solidity file, the frontend auto-generates typed hooks to interact with the new ABI. Zero manual wiring.
- **Debug Contracts Page** — Auto-generated UI for every public function on every deployed contract. Immediate testing without writing frontend code.
- **Burner Wallet + Local Faucet** — Instant testing on a local Hardhat/Anvil chain without MetaMask or testnet tokens.
- **Extension System** — Modular add-ons via `npx create-eth@latest -e user/repo`. Extensions can add contracts, pages, components, and hooks that integrate cleanly with the base project.
- **AI-Ready** — Ships with `.agents/`, `.claude/`, `.cursor/`, `.opencode/` directories, designed for AI coding agents to build and iterate on contracts.

---

## 2. The $CLOUD Credit Protocol (Summary)

The $CLOUD credit is a prepaid unit of account, minted against USD held for service delivery, redeemable for four resource primitives:

| Primitive | Unit | Examples |
|-----------|------|----------|
| **Compute** | Compute-hours | API calls, model inference, rendering |
| **Transfer** | GB transferred | Page loads, streaming, downloads |
| **Long-term Memory** | GB-months | Database records, file hosting, backups |
| **Short-term Memory** | GB-hours | Session caches, CDN edge state |

**Key properties:**
- **Fixed issuance rate:** 1 CLOUD = 10 USDC (minted against USD held in Mercury)
- **Not speculative:** No expectation of value appreciation. Rate card adjusts quarterly.
- **Closed-loop transfer:** Transferable between members, not tradeable on external exchanges.
- **Staking:** Member-investors stake for cooperative revenue share. Compounding curve rewards longer lock periods (Seedling 2% → Old Growth 12% APY).
- **Patronage bridge:** `W = (α × ContribScore) + (β × RecognitionScore) + (γ × ln(1 + CloudEarned))` — log-scaled to prevent whale dominance, FSC-governable coefficients.

**Current implementation:** Supabase database layer (tables, functions, lifecycle tests). The onchain layer is next.

---

## 3. Contract Architecture for $CLOUD

Scaffold-ETH 2 would host the following contract system:

### 3.1 CloudToken.sol — ERC-20 with Minting Controls

```
CloudToken is ERC20, AccessControl
├── MINTER_ROLE (cooperative treasury multisig)
├── mint(address to, uint256 amount) — only MINTER_ROLE
├── burn(address from, uint256 amount) — on redemption
├── transfer() — restricted to registered members (closed-loop)
├── memberRegistry → address mapping
└── Events: Minted, Redeemed, MemberRegistered
```

**Why ERC-20:** Composability with existing tooling (wallets, explorers, Superfluid SuperTokens). The closed-loop transfer restriction is enforced at the contract level via an allowlist, not by using a non-standard token interface.

**Scaffold-ETH 2 benefit:** Contract Hot Reload means the Debug page immediately surfaces `mint()`, `burn()`, `transfer()`, and `memberRegistry` for manual testing. No frontend work needed to validate the core logic.

### 3.2 CloudStaking.sol — Tiered Pool System

```
CloudStaking
├── Pool[] pools (Seedling, Sapling, Canopy, Old Growth)
│   ├── lockDuration
│   ├── apy
│   └── totalStaked
├── stake(uint256 poolId, uint256 amount)
├── withdraw(uint256 stakeId) — enforces maturity or forfeits yield
├── compound() — daily call (automatable via Chainlink Keepers or Gelato)
├── getStake(address member) → StakeInfo[]
└── Events: Staked, Withdrawn, Compounded, YieldForfeited
```

**Design note:** The four pools mirror what's already built in the Supabase layer (Q110). The contract becomes the source of truth; the database becomes a read cache indexed via events.

### 3.3 CloudRedemption.sol — Rate Card Engine

```
CloudRedemption
├── RateCard { compute, transfer, longTermMemory, shortTermMemory }
├── currentRateCard → RateCard
├── updateRateCard(RateCard) — governance-gated, 30-day notice window
├── redeem(uint256 amount, Primitive primitive) → burns tokens, emits event
├── pendingRateCard → RateCard (staged for notice period)
└── Events: Redeemed, RateCardUpdated, RateCardStaged
```

**The rate card is the variable.** Credits have a fixed mint price (1:10 USDC) but a variable redemption value based on infrastructure costs. This is the mechanism that prevents securities classification under Howey — no reasonable expectation of profit from the efforts of others.

### 3.4 PatronageBridge.sol — Weight Calculation

```
PatronageBridge
├── coefficients { alpha, beta, gamma } — FSC-governable
├── minimumCloudThreshold (default: 10 CLOUD)
├── calculateWeight(address member) → uint256
│   └── W = α×contribScore + β×recognitionScore + γ×ln(1+cloudEarned)
├── updateCoefficients() — governance vote required
├── giniCoefficient() → view function
└── Events: WeightsRecalculated, CoefficientsUpdated
```

**Integration with 0xSplits:** The PatronageBridge output feeds directly into a 0xSplits distribution. Weights calculated onchain → passed as split percentages → surplus distributed proportionally. This aligns with the 0xSplits Teams capability Zach demoed (multi-network, agent-compatible, CSV export to Xero).

---

## 4. Scaffold-ETH 2 Extension Strategy

The most powerful move is packaging the $CLOUD system as a **Scaffold-ETH 2 extension**. This means any cooperative, municipality, or civic institution adopting the $CLOUD protocol can bootstrap with:

```bash
npx create-eth@latest -e Roots-Trust-LCA/cloud-credit-extension
```

### Extension Contents

```
cloud-credit-extension/
├── packages/
│   ├── hardhat/
│   │   └── contracts/
│   │       ├── CloudToken.sol
│   │       ├── CloudStaking.sol
│   │       ├── CloudRedemption.sol
│   │       ├── PatronageBridge.sol
│   │       └── interfaces/
│   │           └── ICloudCredit.sol
│   └── nextjs/
│       ├── app/
│       │   ├── cloud/
│       │   │   ├── page.tsx          — Dashboard (balance, burn rate, runway)
│       │   │   ├── staking/
│       │   │   │   └── page.tsx      — Pool selection, stake/withdraw
│       │   │   ├── budget/
│       │   │   │   └── page.tsx      — Budget manager
│       │   │   ├── bridge/
│       │   │   │   └── page.tsx      — Patronage weight calculator
│       │   │   └── marketplace/
│       │   │       └── page.tsx      — Rate card browser, redemption
│       │   └── ...
│       ├── components/
│       │   ├── CloudBalance.tsx
│       │   ├── StakingPoolCard.tsx
│       │   ├── BurnRateChart.tsx
│       │   └── PatronageWeightBreakdown.tsx
│       └── hooks/
│           ├── useCloudBalance.ts
│           ├── useCloudStaking.ts
│           └── usePatronageWeight.ts
└── README.md
```

### Why This Matters Beyond Techne

The $CLOUD spec is designed for adoption by **any conforming organization**. The postage stamp analogy is deliberate — just as national postal services interoperate through the Universal Postal Union without sharing a currency, $CLOUD issuers interoperate through shared accounting grammar (the four primitives + rate cards) without requiring a shared token.

A Scaffold-ETH extension makes this practical. A housing cooperative in Detroit, a maker space in Portland, and a mesh network in Barcelona can each issue their own $CLOUD credits against their own infrastructure, using the same contracts and frontend as a starting point.

---

## 5. Development Workflow

### Phase 1: Contract Development (Scaffold-ETH local)

```bash
npx create-eth@latest              # Bootstrap project
yarn chain                          # Start local Hardhat node
# Write CloudToken.sol, CloudStaking.sol, etc.
yarn deploy                         # Deploy to local chain
# Debug Contracts page auto-generates UI for testing
```

Scaffold-ETH's hot reload means contract changes are immediately testable in the browser. The Debug page eliminates the need for scripts during early development.

### Phase 2: Frontend Integration

The existing React components (CloudStaking.tsx, CloudBudgetManager.tsx, PatronageWeightBridge.tsx) can be migrated into the Scaffold-ETH NextJS structure. Key adaptation:

- Replace Supabase reads with **Wagmi hooks** (`useScaffoldReadContract`, `useScaffoldWriteContract`)
- Replace Supabase auth with **wallet connection** (RainbowKit)
- Keep Supabase as a **read cache** indexed from onchain events (via Ponder or Subgraph extension)

### Phase 3: Testnet Deployment

Deploy to Base Sepolia (aligned with existing Base presence — ERC-8004 Agent ID, ENS, Superfluid streams). Scaffold-ETH supports multi-chain configuration via `scaffold.config.ts`.

### Phase 4: Mainnet + Superfluid Integration

The $CLOUD token wraps as a **Superfluid SuperToken**, enabling:
- Continuous streaming of $CLOUD for ongoing service consumption (not discrete redemption events)
- Stream-based compensation in $CLOUD
- Real-time patronage distribution streams

This connects directly to the Superfluid mapping already specified in the accounting system.

---

## 6. AI-Agent Development Path

Scaffold-ETH 2 is explicitly AI-ready. The `.agents/` directory provides context for coding agents to:

1. **Generate contracts from specs** — Feed the $CLOUD service credit specification to an agent with Scaffold-ETH context; it can produce Solidity contracts that compile and deploy immediately.
2. **Iterate on tests** — Hardhat/Foundry test suites generated and run by agents in the Scaffold-ETH environment.
3. **Build frontend components** — Agents can scaffold React pages using the existing hook patterns and component library.

This aligns with the Workcraft TIO model — the SA (System Architect) and UIE (UI Engineer) roles can leverage AI agents within the Scaffold-ETH environment for rapid sprint execution.

---

## 7. Integration with Existing Infrastructure

| System | Current | With Scaffold-ETH |
|--------|---------|-------------------|
| **Payments** | Stripe → Mercury → manual mint | Stripe → Mercury → contract `mint()` via server action |
| **Identity** | ENS + ERC-8004 | RainbowKit wallet connection + ENS resolution built-in |
| **Accounting** | Supabase tables + PL/pgSQL | Onchain source of truth + Supabase as indexed read cache |
| **Staking** | `cloud_staking_pools` + `cloud_stakes` tables | `CloudStaking.sol` contract with Supabase mirror |
| **Patronage** | `PatronageWeightBridge.tsx` (Supabase) | `PatronageBridge.sol` → 0xSplits distribution |
| **Streaming** | Superfluid mapping spec | $CLOUD as SuperToken, native streaming |
| **Distribution** | Planned (post-FSC) | 0xSplits Teams + onchain patronage weights |

---

## 8. Risks and Considerations

### Regulatory
The $CLOUD credit is designed to avoid securities classification. The onchain implementation must preserve this:
- Fixed mint price (no bonding curve)
- Rate card adjustment mechanism (value tied to infrastructure cost, not speculation)
- Closed-loop transfer restriction enforced at contract level
- Staking yields derived from cooperative revenue, not token inflation

**Legal review required** before mainnet deployment. Jeff Pote's team should review the contract architecture against the existing LCA operating agreement and $CLOUD specification.

### Complexity Budget
Scaffold-ETH is a starting point, not a production framework. The extension provides rapid prototyping and testing. Production deployment may require:
- Custom deployment pipeline (beyond `yarn deploy`)
- Formal verification for staking and token contracts
- Audit before holding real value
- Monitoring and incident response infrastructure

### Sequencing
The Financial Systems Committee (first meeting March 2) must finalize patronage parameters before the PatronageBridge contract can be completed. The coefficient values (α, β, γ) and minimum thresholds are governance decisions, not technical ones.

---

## 9. Recommended Next Steps

1. **Bootstrap:** `npx create-eth@latest` in a new repo under Roots-Trust-LCA
2. **Implement CloudToken.sol** — ERC-20 with minting controls and member allowlist
3. **Port staking logic** from Supabase to CloudStaking.sol with matching test suite
4. **Build the extension** — Package contracts + frontend for `create-eth -e` distribution
5. **Deploy to Base Sepolia** after FSC meeting establishes patronage parameters
6. **Integrate with 0xSplits Teams** for distribution infrastructure
7. **Legal review** with Pote Law before any mainnet deployment

---

## References

- [Scaffold-ETH 2](https://scaffoldeth.io) — Austin Griffith
- [Scaffold-ETH 2 GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Scaffold-ETH 2 Docs](https://docs.scaffoldeth.io)
- [BuidlGuidl](https://buidlguidl.com)
- [$CLOUD Credit Protocol Spec](../../../coop-us-review/spec/service-credits.md) — Techne internal
- [$CLOUD Credit Integration](../../../coop-us-review/spec/service-credit-integration.md) — Techne internal
- [Superfluid Mapping](../../../coop-us-review/spec/superfluid-mapping.md) — Techne internal
- [0xSplits Teams](https://splits.org) — Multi-network distribution

---

*Techne Studio · Boulder, Colorado · February 2026*
