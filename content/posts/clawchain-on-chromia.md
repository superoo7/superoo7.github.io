+++
draft = false
date = 2026-02-11T14:00:00+08:00
title = "How to Use ClawChain on Chromia"
description = "ClawChain is a 100% on-chain social network built on Chromia. Here is how to register your OpenClaw bot and get it posting on-chain in a few steps."
authors = ["johnson lai"]
tags = ["chromia", "blockchain", "clawchain"]
categories = []
externalLink = ""
series = []
images = ["/images/clawchain-chromia/cover.png"]
+++


Chromia recently launched [ClawChain](https://blog.chromia.com/introducing-clawchain-ai-a-100-on-chain-agentic-social-network/), a 100% on-chain agentic social network built entirely on the Chromia blockchain. When [Moltbook](https://www.moltbook.com/) launched as an AI-only social network, it went viral for all the wrong reasons. A security researcher single-handedly registered 1 million fake agents on the platform, exposing how trivially easy it was to flood the network with fake identities. With no way to verify whether a post came from a real agent or an impersonator, the platform collapsed under its own hype.

ClawChain tackles this head-on by anchoring every identity and interaction on-chain, making fake accounts verifiably impossible. No throwaway accounts, no anonymous spam floods, just verifiable, blockchain-backed participants. In this guide, I'll walk you through how to connect your **OpenClaw bot** to ClawChain and get it posting on-chain.

{{< figure src="/images/clawchain-chromia/clawchain-site.png" caption="ClawChain site" >}}


## Prerequisites

- Set up an OpenClaw bot at [openclaw.ai](https://openclaw.ai/)

## Registering Your Agent

Head to [clawchain.ai](https://www.clawchain.ai/) and click **"Register Agent"**. The platform is agent-only, humans can browse but not post. To register, copy the instruction shown on the page and send it to your OpenClaw bot via any connected chat app or the dashboard chat.

```
Read https://www.clawchain.ai/skill.md and follow the instructions to join ClawChain
```

Your bot will read the skill file and register its account by itself. Once done, it will share a claim link with you to complete the process.

{{< figure src="/images/clawchain-chromia/chat.png" caption="Setting up clawchain on Telegram" >}}


## Claiming Your Agent

Follow the claim link your bot provides. You'll land on a page like `https://www.clawchain.ai/claim/<your-claim-id>`. To complete the claim:

1. Connect your wallet (MetaMask or equivalent)
2. Sign the on-chain transaction

The claim requires an actual on-chain transaction from your wallet. Without it, your agent stays unclaimed on the blockchain.

Once the transaction goes through, you'll be prompted to post a verification tweet from your X account:

```
I'm claiming my AI agent "ClawChainBot"
on @claw_chain 🦞
Verification: claw-XXXX
```

This step ties your bot to your X identity, proving ownership, preventing duplicates, and enforcing the one bot per human rule that keeps ClawChain spam-free.

{{< figure src="/images/clawchain-chromia/claim.png" caption="You've successfully signed up a ClawChain account" >}}

## Next Steps

Your agent is now live on ClawChain. Just text your bot to start interacting with the network, no extra setup needed:

- **Create a post**: Ask your bot to write and publish a post on ClawChain
- **Interact with other agents**: Ask your bot to browse the feed and reply to other agents

Since every post and reply is an on-chain transaction on Chromia, all activity is transparent and permanently verifiable. If you are adventurous, each post on ClawChain links directly to the Chromia block explorer, so you can inspect every interaction on-chain yourself.

## Conclusion

ClawChain is an early but promising answer to a real problem in the AI agent space. The Moltbook saga showed how quickly an agent social network can be overrun when there are no guardrails. By building on Chromia and requiring on-chain identity from day one, ClawChain makes that kind of abuse significantly harder.

If you already have an OpenClaw bot running, getting it onto ClawChain takes just a few minutes. Give it a try and see what the on-chain agent social graph looks like.
