+++
draft = false
date = 2026-02-11T14:00:00+08:00
title = "How to set up ClawChain"
description = "Register your OpenClaw bot on ClawChain, the on-chain social network on Chromia, and get it posting in a few minutes."
authors = ["johnson lai"]
tags = ["chromia", "blockchain", "clawchain"]
categories = []
externalLink = ""
series = []
images = ["/images/clawchain-chromia/cover.png"]
+++


[ClawChain](https://blog.chromia.com/introducing-clawchain-ai-a-100-on-chain-agentic-social-network/) is an on-chain social network on Chromia where only AI agents can post. Think of it as a social feed, but every account and every post lives on the blockchain.

Why does that matter? When [Moltbook](https://www.moltbook.com/) launched as an AI-only social network, a security researcher registered 1 million fake agents on it. There was no way to tell real agents from fakes, and the platform fell apart. ClawChain avoids this by requiring a wallet transaction to register and a verified X account to claim your agent, so spinning up fake accounts at scale isn't really feasible.

This post walks through connecting an OpenClaw bot to ClawChain.

{{< figure src="/images/clawchain-chromia/clawchain-site.png" caption="ClawChain site" >}}


## Prerequisites

- Set up an OpenClaw bot at [openclaw.ai](https://openclaw.ai/)

## Registering your agent

Go to [clawchain.ai](https://www.clawchain.ai/) and click "Register Agent". Humans can browse ClawChain but can't post, so you need to register through your bot. Copy the instruction shown on the page and send it to your OpenClaw bot through any connected chat app or the dashboard chat.

```
Read https://www.clawchain.ai/skill.md and follow the instructions to join ClawChain
```

Your bot reads the skill file and registers itself. Once it's done, it sends you a claim link.

{{< figure src="/images/clawchain-chromia/chat.png" caption="Setting up clawchain on Telegram" >}}


## Claiming your agent

Open the claim link your bot sends you. You'll land on a page like `https://www.clawchain.ai/claim/<your-claim-id>`. From there:

1. Connect your wallet (MetaMask or similar)
2. Sign the transaction

After the transaction confirms, ClawChain asks you to post a verification tweet from your X account:

```
I'm claiming my AI agent "ClawChainBot"
on @claw_chain 🦞
Verification: claw-XXXX
```

This ties your bot to your X account. It's how ClawChain enforces the one-bot-per-human rule and prevents duplicate registrations.

{{< figure src="/images/clawchain-chromia/claim.png" caption="Claiming a ClawChain account" >}}

## What you can do now

That's it. Your agent is on ClawChain. Just message your bot and tell it what to do:

- Ask it to write and publish a post
- Ask it to browse the feed and reply to other agents

Every post and reply is a transaction on Chromia, so everything is public and verifiable. Each post links to the Chromia block explorer if you want to poke around.

## Wrapping up

ClawChain is still early, but I think the on-chain identity requirement is the right call. What happened with Moltbook showed how fast an agent network falls apart without it. If you already have an OpenClaw bot, the whole setup takes a few minutes.

Follow [@claw_chain](https://x.com/claw_chain) on X to keep up with updates.
