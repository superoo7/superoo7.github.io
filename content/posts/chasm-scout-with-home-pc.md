+++ 
draft = false
date = 2024-07-20T15:59:18+08:00
title = "Run Chasm Node with Home PC"
description = ""
slug = ""
authors = ["Johnson Lai"]
tags = ["chasm", "decentralized ai"]
categories = []
externalLink = ""
series = []
images = ["/images/home-pc/cover.png"]
+++

Chasm nodes are lightweight and can run on devices with as little as 2GB of RAM, including a Raspberry Pi. This guide is intended for those who want to try running a scout node for fun and to understand the Chasm Network better. 

> Important Note: For optimal security, low latency, and better performance, we strongly recommend [using a Virtual Private Server (VPS)](https://superoo7.com/posts/chasm-network-scout-hosting/) instead of a home PC to run your Chasm node. This guide is primarily for educational purposes and for those who want to experiment with running a node at home.


This guide has been tested on Mac and Linux Ubuntu. Windows user might need to run this on [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or [Git Bash](https://git-scm.com/downloads).

**Disclaimer: This guide is provided for informational purposes only. Use it at your own risk.**

> The author and publisher are not responsible for any errors, omissions, or damages resulting from the use of this information. Users should have a thorough understanding of network security and the potential risks involved. 


## Prerequisite

- Stable internet connection
- Minimum hardware requirements for running a Chasm Scout
- Docker installed on your system

## Connecting Your Home PC to the Public Web

There are two main methods to make your home PC accessible from the internet:

### Method 1: Port Forwarding (Not Recommended)

[Port forwarding](https://en.wikipedia.org/wiki/Port_forwarding) opens your local computer network to the public internet. This method can be risky if not properly configured.

Here's a quick guide on [how to open ports on router](https://nordvpn.com/blog/open-ports-on-router/).

If you choose this method, after obtaining your public IP, follow the guide in [Chasm Network Scout Season 0 Hosting Tutorial](https://superoo7.com/posts/chasm-network-scout-hosting/) from Step 5 onwards.

### Method 2: Tunneling (Recommended)

Tunneling is similar to port forwarding but uses a third-party service to handle the connection, making it safer than direct port forwarding. There are several tunneling services available:

**Commercial/Closed source**
- [ngrok](https://ngrok.com)

**Open Source**
- [loophole](https://loophole.cloud/)
- [zrok](https://zrok.io/)

For more options, check out the awesome-tunneling [awesome-tunneling](https://github.com/anderspitman/awesome-tunneling) repository.

This guide will use **ngrok** as it's the easiest to install and get started with.

## Step by Step guide

### 1. Installing Ngrok

1.	Go to https://ngrok.com and sign up with your email address.
2.	Download the application based on your OS from ngrok download https://ngrok.com/download.
3.	Follow the tutorial on the ngrok website to activate the app via your `AUTH KEY`.

Read more about installation guide at https://dashboard.ngrok.com/get-started/setup

### 2. Get a Redirected URL from NGROK

1.	Use the command below to run ngrok inside a screen:
```sh
screen ngrok http 3001
```

2.	After opening ngrok inside your device, you will see a URL that points to 127.0.0.1:3001. The URL format will be something like https://xxxx-xxx-xx-xxx-xxx.ngrok-free.app/.
_Note: There's no need to include a port in the WEBHOOK_URL as ngrok handles this for you._

![ngrok terminal](/images/home-pc/ngrok-terminal.png)

> Attention: If you close the ngrok process by pressing CTRL+C, the address will stop working. To solve this issue, we opened ngrok inside a screen. After you get the address, press CTRL+A+D to detach from the screen and let it keep working in the background. You can test the ngrok address by opening it in your browser and clicking on visit site. If you get “OK!”, then the address is working properly.

### 3. Edit Your .env Configuration
1.	Copy the URL you get from NGROK. Should be something like `https://xxxx-xxx-xx-xxx-xxx.ngrok-free.app/`
2.	Use the command below to open your .env config:
```sh
nano .env
```
3.	Paste your new address in the webhook URL. For example:
```sh
WEBHOOK_URL=https://xxxx-xxx-xx-xxx-xxx.ngrok-free.app/
```

### 4. Start docker


```sh
# Optional to allow firewall for port 3001
ufw allow 3001

# Run Docker
docker pull chasmtech/chasm-scout
docker run -d --restart=always --env-file ./.env -p 3001:3001 --name scout chasmtech/chasm-scout
```

### 5. Verify your build

Open your web browser and visit your webhook URL (e.g., `https://xxxx-xxx-xxx-xx-xxx.ngrok-free.app/`). You should see the server respond with "OK".

![Browser](/images/home-pc/ngrok-browser.jpeg)


## Next Steps

Congratulations! You've successfully set up your Chasm Scout node at home.

1.	Monitor Your Scout: Regularly check https://scout.chasm.net to ensure your Scout is running smoothly and processing requests.
2.	Stay Updated: Keep an eye on the official Chasm documentation for any updates or changes to the Scout requirements or configuration.
3.	Optimize Performance: Check out the optimization guide to optimize your server setup for better performance.