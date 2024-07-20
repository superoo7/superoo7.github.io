+++ 
draft = false
date = 2024-07-20T15:59:18+08:00
title = "Run Chasm Node with Home PC"
description = ""
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
images = ["/images/home-pc/cover.png"]
+++

Chasm nodes are lightweight and can run on devices with as little as 2GB of RAM, including a Raspberry Pi. This guide is intended for those who want to try running a node for fun and to understand the Chasm Network better. 

This guide has been tested on Mac and Linux Ubuntu. Windows user might need to run this on [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) or [Git Bash](https://git-scm.com/downloads).

**Disclaimer: This guide is provided for informational purposes only. Use it at your own risk.**

> The author and publisher are not responsible for any errors, omissions, or damages resulting from the use of this information. Users should have a thorough understanding of network security and the potential risks involved. For optimal performance and security, please consider using a VPS (Virtual Private Server).


## Prerequisite

- Stable internet connection
- Minimum hardware requirements for running a Chasm Scout
- Docker installed on your system

## Connecting Your Home PC to the Public Web

There are two main methods to make your home PC accessible from the internet:

### Method 1: Port Forwarding (Not Recommended)

Port forwarding opens your local computer network to the public internet. This method can be risky if not properly configured.

Here's a quick guide on [how to open ports on router](https://nordvpn.com/blog/open-ports-on-router/).

If you choose this method, after obtaining your public IP, follow the guide in Chasm Network Scout Season 0 Hosting Tutorial from Step 5 onwards.

Once you obtain your public IP, You can follow the guide in [Chasm Network Scout Season 0 Hosting Tutorial](https://superoo7.com/posts/chasm-network-scout-hosting/) on Step 5 onwards.


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

### 1. Sign Up Ngrok account

Visit https://ngrok.com and create an account.

### 2. Installation

Follow the installation guide at https://dashboard.ngrok.com/get-started/setup

### 3. Setup tunneling

Open your terminal and run the following command:

```sh
ngrok http http://localhost:3001
```

![ngrok terminal](/images/home-pc/ngrok-terminal.png)

Take note of your `WEBHOOK_URL`, which will look like https://xxxx-xxx-xxx-xx-xxx.ngrok-free.app/

_Note: There's no need to include a port in the WEBHOOK_URL as ngrok handles this for you._


### 4. Run the build

Follow [Chasm Network Scout Season 0 Hosting Tutorial](https://superoo7.com/posts/chasm-network-scout-hosting/) from Step 5 onwards in the Chasm Network Scout Season 0 Hosting Tutorial, but replace the `WEBHOOK_URL` with the one you obtained from ngrok.

### 5. Verify your build

Open your web browser and visit your webhook URL (e.g., `https://xxxx-xxx-xxx-xx-xxx.ngrok-free.app/`). You should see the server respond with "OK".

![](/images/home-pc/ngrok-browser.jpeg)



Congratulations! You've successfully set up your Chasm node at home.