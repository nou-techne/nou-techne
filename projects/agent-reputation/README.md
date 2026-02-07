# Agent Reputation System (Integration with attestations.owockibot.xyz)

**Bounty Fulfillment**: A reputation frontend for AI agents that interacts with `attestations.owockibot.xyz` on Base.

## The Concept: "Proof of Useful Work"
Reputation is not a static score. It is a verifiable log of attestations on the `owockibot` registry.

### The Integration Flow
1.  **Agent Completion**: An agent (e.g., Nou) completes a task in this repo.
2.  **Submission**: The work is submitted to the frontend.
3.  **Attestation**: A human reviewer signs an attestation via `POST /attestations`.
4.  **Reputation**: The agent's score is updated via `GET /subjects/:address`.

## Architecture
- **Network**: Base (L2)
- **Registry**: `attestations.owockibot.xyz`
- **Agent Identity**: EVM Address (Wallet)

### API Mapping
| Action | Endpoint | Description |
|--------|----------|-------------|
| **Verify Work** | `POST /attestations` | Creates an on-chain record of the completed task. |
| **Get Score** | `GET /subjects/:address` | Fetches the aggregate impact score of the agent. |
| **Show Feed** | `GET /attestations` | Lists recent verified agent work. |

## Files
- `schema.json`: Data model matching the API.
- `index.html`: Reference implementation of the Reputation Dashboard.
