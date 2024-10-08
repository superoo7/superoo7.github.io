+++ 
draft = false
date = 2024-07-19T07:23:36+08:00
title = "Chasm Scout Architecture"
description = ""
slug = "chasm-scout-architecture-design"
authors = ["johnson lai"]
tags = ["chasm", "decentralized ai"]
categories = []
externalLink = ""
series = []
images = ["/images/scout-design/cover.jpg"]
+++

At Chasm, we believe the future of deAI is open-source.

{{< twitter user="ChasmNetwork" id="1814292355387932948"  >}}

We're excited to announce that we have open-sourced the [Chasm Scout codebase](https://github.com/ChasmNetwork/chasm-scout), which is aimed at democratizing access to Decentralized AI networks. 

> If you are new to operating nodes, no need to fret! We made sure Chasm Scout to be a very easy node to set up, so easy that even a 5-year old can do it. Here is a  [step-by-step guide on How to run Chasm Season 0 Scout Node](https://superoo7.com/posts/chasm-network-scout-hosting/). We promise it’ll only take 15-30 minutes of your time.


Over the past 4 months, our team has worked diligently to transform this concept into a functional protocol. Here's an article on the architecture design choices of Chasm Network Scout Node.

## Our experience with Bittensor

The journey that led to Chasm Scout began with plenty of hands-on experience within the [Bittensor network](https://bittensor.com/). 

John ([@johnkmj](https://x.com/johnkmj)), my co-founder, and I immersed ourselves in running nodes and optimizing miners on Bittensor subnets. Despite having a background with blockchain nodes since 2017 & John, who is an early adopter/miner of Bitcoin, we both faced challenges – burning a bunch of TAO running miners and getting miners deregistered from the network.

We found ourselves constantly improvising, even creating tools to track our mining activities and scripts to auto-claim rewards and put in subnet registration bids when it's cheap.

{{< twitter user="jlwhoo7" id="1762130523005284682" >}}

This collaborative experience highlighted a crucial need. For deAI to take off as a movement, decentralized AI networks need to be A LOT more user-friendly. 

We observed many newcomers struggling to host nodes, often paying for setup help, which reminded us of the early days of Bitcoin and Ethereum. Some of these users even fall prey to bad actors trying to phish for their information or hack their wallets by providing false information and acting as helpers.

{{< figure width="65%" src="/images/scout-design/chasm-bittensor.png" caption="Chasm inspired by Bittensor" >}}

These insights drove our vision for Chasm Scout. We aimed to preserve the innovative spirit of projects like Bittensor while vastly improving accessibility. 

Our goal became twofold: create a system that newcomers could set up easily and affordably, while still allowing experienced users to deeply optimize their setups.

While we're still learning and improving, we hope Chasm Scout can help bridge the gap between complex technology and user-friendly experiences in decentralized AI.

## What is Chasm Protocol

Chasm Protocol is our attempt to create a network where AI systems can work together efficiently to solve complex problems. Think of it as a team of AI experts, each with its own specialty, collaborating to provide the best possible answers and solutions. 

{{< figure src="/images/scout-design/chasm-network.png" caption="Chasm Network Design" >}}

At the heart of Chasm Protocol are two key components: Orchestrators and Scouts. 
- **Orchestrators** are like project managers. They receive requests (which we call "intents") from users, break them down into smaller tasks, and figure out the best way to get them done. 

- **Scouts** are like specialized & skilled workers. Each scout is capable of handling specific parts of a task. 

When an Orchestrator receives a request, it creates a plan (we call it a "Scroll") and sends it to the most suitable Scouts. 

These Scouts then work on their assigned parts and pass the results along until the entire task is complete. We're trying to make this system efficient, cost-effective, and capable of handling a wide range of AI-related tasks. 


At the core of Chasm Protocol is what we call Decentralized Mixture of Experts (DeMoE). Imagine a large, diverse team where each member is an expert in a specific field. In DeMoE, our Scouts act as these experts, each specializing in different areas like creative writing, technical analysis, or game character design. When a task comes in, instead of one big AI trying to do everything, we route it to the Scouts best suited for that particular job. This approach allows for more focused, efficient, and accurate results. We're constantly evaluating and rewarding the best-performing Scouts, which encourages ongoing improvement. While it's a complex system under the hood, our goal is to make it work seamlessly for users, providing them with the benefits of specialized expertise without the complexity.
While we're excited about its potential, we're also aware that there's still much to improve as we continue to develop Chasm.


[Read more about Chasm Protocol](https://chasm.net/litepaper)

## The Challenge: Designing for Accessibility

Designing a beginner-friendly Scout Nodes hasn’t been easy, we had to consider that people may not be familiar with DevOps, VPS etc, with many of them running nodes for the first time.

Our goal was to create something that didn't require extensive technical knowledge to use. 


To achieve this, we believe the easiest way is to reduce the number of steps needed. We’ve made small design decisions like using Docker instead of git pulling the repo and build from source, using easy to setup configuration etc. 

For example, 

We opted for more developer-friendly solutions like Docker instead of asking users to deal directly with code repositories. We also put a lot of thought into the overall user experience, trying to anticipate and address potential stumbling blocks.

It's been a learning process for us, and we're continually working to improve and simplify things based on user feedback. While we've made progress, we know there's still room for improvement in making Chasm Scout truly accessible to everyone.




## Technical Stack

Our node team consists of 3 engineers. We had to maintain good quality of code while handling various aspects: Onchain, Offchain, Scout, Orchestrator, UI. Essentially, we are building an “L1” with many offchain mechanisms. This is quite challenging, especially with such a small team.

However, a small team brings agility. We are able to adapt much quicker than larger teams. The AI space is moving fast, and I believe being agile is one of our competitive advantages.

The key to building this is “Subtraction.” We had to identify what was important and what was not. We frequently discussed what features we could ship and what to deprioritize.

We initially considered launching Chasm on Bittensor, but scaling beyond 10k nodes on Bittensor is not only expensive but also tough, dealing with Asynchronous in Python and the overhead of blockchain (Bittensor is a forked of Polkadot).

With a lean team, we decided to implement a lightweight “Orchestrator” and consider >10k scouts running concurrently. This design allows for vertical scaling of Orchestrator if needed at an early stage, with consensus achieved through a “Horizontal Scaling” mindset.

We released the idea of our own network with [our Litepaper](https://chasm.net/litepaper) back in April, and the work began. It took us 2 months to build the initial alpha test release and less than 4 months for Chasm Season 0.

### Programming Language

After some internal discussions, we decided to implement our entire stack in TypeScript on [Bun](https://bun.sh) runtime. Bun is a fast JavaScript runtime released on September 8, 2023. With Bun, we optimized our scout to use only <50 MB of memory for a single scout.

{{< figure width="70%" src="/images/scout-design/bun-benchmark.png" caption="Bun benchmark of websocket implementation" >}}

### Integration

We have integrated [Groq](https://groq.com/) and [OpenRouter](https://openrouter.ai/), API-based LLM providers. We plan to allow users to run their GPU down the road via vLLM/ollama, as we have many enthusiastic scouts that are already participating in Season 0 wanting to make use of their GPU.

### Webhook VS Websocket VS RPC

Most blockchains use RPC to communicate between nodes. Since we want to have an easy entry barrier for Scout Nodes, we decided to use REST-based Webhooks. The reason for this is that webhooks can be easily scaled, and we don't need scouts to constantly be connected to the Orchestrator.

### API Key vs Private Key

We have heard about private key leaks from time to time, even when the Private Key is encrypted. When users want to sign transactions, they still need the Private Key to be on run time. A common practice would be to allow multiple permissions on the blockchain layer, like some DPOS networks (EOS, Steem, Bitshare) with multiple keys for different purposes. However, this adds complexity for users. We decided to use API Key for safety, and users just need to use our dashboard to sign a tx to regenerate the API key.

### Performance

We conducted a quick performance check to see the optimization achieved using the “Bun-first” development methodology.

This experiment involved running Bun on our Chasm Scout server at rest.

**Running with Bun**

```sh
bun i
bun run build
pm2 start --interpreter ~/.bun/bin/bun dist/src/server/express.js
```

{{< figure src="/images/scout-design/bun.png" title="using bun to run scout" >}}



**Runnning with Node**

```sh
npm i
npm run build
pm2 start dist/src/server/express.js
```


{{< figure src="/images/scout-design/node.png" title="using node to run scout" >}}

Based on the similar build of V0.0.3 Scout at rest, Bun only used 25.9mb of memory, compared to Node, which used 44.6mb. Bun is 44% more efficient than Node, and Bun code is backward compatible with Node.

### Testing of Scout

We have integrated end-to-end AI tests into our CI pipeline, ensuring seamless integration with different providers. 

## Road to Decentralization

As of Scout Season 0, our network is not fully decentralized, but it is a key part of our roadmap. We are proceeding with caution, aware of the overfitting models issue on some of the Bittensor subnets, which makes some models hosted there practically unusable. This is unavoidable when the network open sources the weights and data used for training.

At Chasm, our decentralization plan involves “Horizontally Scaling” the orchestrator through Proof of Authority (POA), initially trusting only a few orchestrators.


## Conclusion

This is just our first step towards decentralized AI. 

I'm planning to share more detailed articles about our network and orchestrator soon. 

Your thoughts and feedback are invaluable to us as we work on making this technology more accessible. If you have any questions or ideas, please don't hesitate to reach out to me on [Twitter/X](https://x.com/jlwhoo7). Let's keep the conversation going and see where we can take decentralized AI together.
