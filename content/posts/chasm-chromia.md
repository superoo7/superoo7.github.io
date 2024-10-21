+++ 
draft = false
date = 2024-10-21T10:21:52+08:00
title = "Chasm x Chromia: Paving the Way for Decentralized AI"
description = "Chasm Network partners with Chromia to enhance AI transparency and fairness using blockchain technology. By open-sourcing their code and decentralizing AI data, they aim to make AI decision-making processes more understandable and reliable for everyone."
slug = "chasm-chromia"
authors = ["johnson lai"]
tags = ["chromia", "decentralized ai"]
categories = []
externalLink = ""
series = []
images = ["/images/chasm-chromia/cover.jpg"]
+++

Imagine a world where AI influences political elections, determine your online content, and decide your loan applications. As AI agents proliferate across platforms, a crucial question emerges: how can we verify whether we're interacting with genuine AI systems? This isn't science fiction – it's our current reality, and blockchain technology, with its ability to timestamp and verify AI inferences on-chain, might help us solve this challenge.

{{< figure width="60%" src="/images/chasm-chromia/trust-me.jpg" caption="Trust me Bro!" >}}

The centralization of AI power isn’t just a technical issue; it’s a threat to our digital autonomy and fairness. When a handful of tech giants control the algorithms that influence everything from your political views to your personal finances, the balance of power shifts away from individuals and towards these entities. But what if we could change this?

This is where Chasm Network’s collaboration with Chromia comes in. By combining AI expertise with innovative blockchain technology, we’re building a future where AI decisions are transparent and accountable. Our goal? To democratize the power of AI, ensuring that its benefits are accessible to everyone, not just the few.

## Going Beyond Open Source

A few months ago, we [open-sourced the code for Chasm Scout](https://superoo7.com/posts/chasm-scout-architecture-design/), the scout node source code. This was an important step towards transparency, but we quickly realized it wasn't enough on its own.

We saw this clearly when looking at examples like Twitter/X. While they [open-sourced their recommendation algorithm](https://blog.x.com/engineering/en_us/topics/open-source/2023/twitter-recommendation-algorithm), they didn’t share the weights used in their Heavy Ranker. So, people could see the structure, but couldn’t fully grasp or replicate its decision-making.

{{< figure width="80%" src="/images/chasm-chromia/twitter-algo.png" caption="Twitter/X Algorithm" >}}

This made one thing clear: **to truly make AI transparent and fair, we need to go further than just sharing code**. That’s why our focus has now shifted to decentralizing inference data – the key information AI uses to make decisions.

By making both the code and the data transparent, we're aiming to create a system where the entire AI decision-making process can be understood and verified. This level of openness is what's needed to build trust in AI systems and ensure they're working fairly for everyone.

## Enter Chromia: Decentralizing AI Data

This is where Chromia comes in. Chromia isn’t just any blockchain – it’s a decentralized database, making it perfect for our goals.

With Chromia, we can store AI inference data on the blockchain, ensuring that:

The data is transparent: anyone can see it
It's tamper-proof: no one can change it secretly
It's decentralized: not controlled by any single entity

This deployment is a big deal. It means we're not just saying our AI is fair and transparent - we're proving it by making the actual data open and verifiable. By storing opML inference data on Chromia's decentralized platform, we're creating a traceable record of our AI's decision-making process.

{{< figure width="80%" src="/images/chasm-chromia/chromia-explorer.jpeg" caption="https://explorer.chromia.com/mainnet/blockchain/A870F5744F8C4EDFE5AAD5556B1B4DA1DCC6FB53B0E8CFAB84F9155A51D1042C" >}}

This level of transparency enables unprecedented scrutiny of AI systems. More importantly, the opML inference data stored on Chromia serves a crucial function: it can be used for challenges within the system. Participants can use this data to verify and contest the AI's results, ensuring that our opML mechanics are working as intended.

This challenge mechanism allows for continuous verification of the AI's performance, quick identification of errors, and active community involvement in maintaining the AI's integrity. By enabling data-based challenges, we're creating a more robust, accountable, and trustworthy AI system that sets a new standard for transparency in artificial intelligence.

## Our Step-by-Step Approach

![Chasm Roadmap](/images/chasm-chromia/chasm-roadmap.png)

We know that decentralizing AI is a big challenge. That's why we're taking it one step at a time:

1. Loadbalance the inference load: We started with Chasm Scout, distributing AI tasks across many computers.
2. Open-sourcing our code: We've made our Scout code public, allowing anyone to see how it works.
3. Decentralizing inference data: This is our current focus with Chromia. We're making the data AI uses to make decisions transparent and verifiable.
4. Decentralizing Orchestrator: In the future, we plan to have multiple "orchestrators" managing the network, not just one central authority.
5. A fully open network: Our big dream is to have a completely decentralized AI network. We're working towards this, but we know it will take time.

# Why This Matters

In the world of Decentralized AI, data is crucial. The decisions AI makes are only as good and fair as the data it uses. By decentralizing this data with Chromia, we're:

- Making it harder for AI to be biased or manipulated
- Allowing anyone to verify how AI systems are making decisions
- Creating a foundation for more trustworthy AI

# Looking to the Future

We’re excited about our partnership with Chromia, but we know this is just the beginning. Decentralizing and making AI more transparent is a huge challenge, and it’s going to take time, effort, and collaboration.

We believe this work is crucial. As AI becomes more powerful, ensuring it stays open and fair is more important than ever. By merging AI with blockchain technology, we’re striving to build a future where AI benefits everyone, not just a select few.

We’re grateful for the chance to work on these challenges, and we’ll keep sharing our progress as we continue on this path to truly transparent and decentralized AI.


