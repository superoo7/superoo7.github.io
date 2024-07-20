+++ 
draft = false
date = 2024-07-18T11:21:52+08:00
title = "Chasm Network Scout Season 0 Hosting Tutorial"
description = "Quick step-by-step guide on how to run Chasm Scout Season 0"
slug = "chasm-network-scout-hosting"
authors = ["johnson lai"]
tags = ["chasm", "decentralized ai"]
categories = []
externalLink = ""
series = []
images = ["/images/chasm-scout/cover.png"]
+++

In this guide, I will walk you through the process of running Chasm Scout in Season 0 using Digital Ocean. Please note that you should always refer to the [Official Guide from Chasm Network](https://network-docs.chasm.net/)  for the most up-to-date information.

I've chosen Digital Ocean for two main reasons:
- It's easy to use, especially for those new to cloud services.
- Unlike AWS or GCP, it doesn't require going through a complex DevOps process.

> While Digital Ocean may be more expensive than some alternatives, it offers a user-friendly experience that's ideal for this guide. For those seeking more cost-effective options, platforms like [Linode](https://www.linode.com/), [Contabo](https://contabo.com/), [Google GCP](https://cloud.google.com), [AWS](https://aws.amazon.com/) or [Microsoft Azure](https://azure.microsoft.com/en-us) can also be considered.

This guide aims to provide a simple, step-by-step approach for those unfamiliar with Virtual Private Clouds (VPCs).

The guide is tested on both Mac and Ubuntu, Windows user might need to run this on [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or [Git Bash](https://git-scm.com/downloads).

## Step 1: Mint NFT to Get Scout ID and API Key

Visit https://scout.chasm.net

![Mint](/images/chasm-scout/mint.gif)

You will obtained `WEBHOOK_API_KEY` and `SCOUT_UID` from here.

## Step 2: Get Groq API Key

Sign up for an account at [Groq](https://console.groq.com/keys) to get `GROQ_API_KEY`

![Groq API Key](/images/chasm-scout/groq.gif)

## Step 3: Digital Ocean

Sign up for an account on [DigitalOcean](https://www.digitalocean.com/)

![Digital Ocean](/images/chasm-scout/digitalocean.png)

> Sign up a DigitalOcean using my reflink https://m.do.co/c/6b801669b201 to get free $200 credit over 2 months validity!

## Step 4: Create a Droplet

According to the [Onboarding guide](https://network-docs.chasm.net/chasm-scout-season-0/onboarding-to-season-0), the minimum requirements are:

> 1 vCPU, 1GB RAM / 20GB Disk, Static IP

![Digital Ocean Droplet Setup](/images/chasm-scout/do.gif)

Here's a detailed guide on [How to Create a Droplet](https://docs.digitalocean.com/products/droplets/how-to/create/) by Digital Ocean.

## Step 5: Setup Server

[Chasm Official Docs on setting up inference scout](https://network-docs.chasm.net/chasm-scout-season-0/chasm-inference-scout-setup-guide)

Open up your terminal and run these commands.

### I: SSH into the server

```sh
ssh root@<IP>
```

Take note of the `IP`, it will be used later as `WEBHOOK_URL`.

### II: Install Docker

[Install Docker on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)

```sh
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Install Docker
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### III: Setup `.env` file

Check your current directory, it should be in `/root`, if not then just call `cd /root`

```sh
pwd
```

Create a new `.env` file via [Nano](https://www.howtogeek.com/42980/the-beginners-guide-to-nano-the-linux-command-line-text-editor/)

```sh
nano .env
```

Copy the `.env` setup from [Chasm Inference Scout Guide](https://network-docs.chasm.net/chasm-scout-season-0/chasm-inference-scout-setup-guide#software-requirements) and paste it in your terminal. Then update the following env variables:
- `SCOUT_NAME`: Your scout name
- `SCOUT_UID`: From Step 1: Mint NFT
- `WEBHOOK_API_KEY`: From Step 1: Mint NFT
- `WEBHOOK_URL`: From Step 5: I: SSH, where the url should be `http://<ip>:<PORT>`
- `GROQ_API_KEY`: From Step 2: Get Groq API Key

```sh
PORT=3001
LOGGER_LEVEL=debug

# Chasm
ORCHESTRATOR_URL=https://orchestrator.chasm.net
SCOUT_NAME=myscout
SCOUT_UID=
WEBHOOK_API_KEY=
# Scout Webhook Url, update based on your server's IP and Port
# e.g. http://123.123.123.123:3001/
WEBHOOK_URL=

# Chosen Provider (groq, openai)
PROVIDERS=groq
MODEL=gemma2-9b-it
GROQ_API_KEY=

# Optional
OPENROUTER_API_KEY=
OPENAI_API_KEY=
```

You can save the `.env` file and exit Nano via Ctrl + x (`^X`),`Y`, `Enter`

### IV: Run the scout

```sh
# Pull the code from DockerHub
docker pull chasmtech/chasm-scout
# Start the docker file
docker run -d --restart=always --env-file ./.env -p 3001:3001 --name scout chasmtech/chasm-scout
```

### V: Verify

1. Test Server Response:

```sh
# Should get "OK" response
curl localhost:3001
```

2. Test LLM

```sh
source ./.env
curl -X POST \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $WEBHOOK_API_KEY" \
     -d '{"body":"{\"model\":\"gemma2-9b-it\",\"messages\":[{\"role\":\"system\",\"content\":\"You are a helpful assistant.\"}]}"}' \
     $WEBHOOK_URL
```

3. Check https://scout.chasm.net

![Scout Page](/images/chasm-scout/scout_page.jpeg)

> Note that it takes around 15 minutes for the scout to update to the latest state


## Next Steps

1. Monitor Your Scout: Regularly check https://scout.chasm.net to ensure your Scout is running smoothly and processing requests.
2. Stay Updated: Keep an eye on the [official Chasm documentation](https://network-docs.chasm.net/) for any updates or changes to the Scout requirements or configuration.
3. Optimize Performance: Checkout the [optimization guide](https://network-docs.chasm.net/chasm-scout-season-0/competitive-scout-optimization) to optimize your server setup for better performance. 