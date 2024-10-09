+++ 
draft = false
date = 2024-10-09T05:59:18+08:00
title = "My Journey of Automating a Telegram Game"
description = "Exploring three different approaches to automate the Telegram Lumberjack game - from simple pixel matching to machine learning"
slug = "telegram-game-automation"
authors = ["Johnson Lai"]
tags = ["machine learning"]
categories = []
externalLink = ""
series = []
images = ["/images/telegram-game-automation/cover.jpeg"]
+++

> **Automating boring tasks has always been a driving force behind my passion for building software.**

A few months ago, I stumbled upon the Telegram game Lumberjack, which seemed like an ideal project for testing automation using simple pixel matching mechanics. Its straightforward mechanics made it an appealing target for experimenting with different automation approaches.

## The Game: Lumberjack

![Lumberjack](/images/telegram-game-automation/lumberjack.jpg)

[Lumberjack](https://t.me/gamebot?game=LumberJack) is a simple Telegram game where players chop a tree while avoiding branches. The objective is to press the arrow key opposite to the side of the last branch to avoid hitting the lumberjack's head.

# The Journey: 3 Approaches to Automation

## The Allure of Simple Automation

The Telegram Lumberjack game presents a deceptively simple challenge: press arrow keys to avoid branches while chopping a tree. Its straightforward mechanics made it seem like an ideal candidate for basic automation techniques. However, this simplicity proved to be misleading.

## Attempt 1: PyAutoGui

My first attempt utilized [PyAutoGui](https://pyautogui.readthedocs.io/en/latest/), a Python library for GUI automation that I had previously used for auto-accepting game matches in Dota and LoL.

{{< youtube LGkNn_jB8jQ >}}

The solution involved:

1. Taking screenshots of the game area
2. Capturing reference images of left and right branches
3. Using image recognition to locate branches and game buttons
4. Automating keyboard presses based on detected branch positions

However, this method quickly revealed its limitations:

- PyAutoGui's wrapper nature resulted in slow performance
- Pixel matching proved unreliable, with low confidence levels
- False positives plagued the results
- Python's concurrent operation limitations became apparent

The fundamental issue wasn't just technical - it was conceptual. Simple automation tools weren't equipped to handle the dynamic nature of real-time game interaction.

## Attempt 2: Rewrite in Rust language

Realizing that Python's processing speed was a bottleneck, I rewrote the entire program in Rust to leverage its performance benefits and introduce more sophisticated image processing.

This wasn't just a simple port - it was a complete reimagining of the approach:
- OpenCV for more sophisticated image matching
- Predictive algorithms for multiple branch detection
- Rust's xcap library for faster screenshot capture
- Pattern matching for robust error handling

The branch matching logic evolved to anticipate moves:
```
Left -|
      |- Right
```

When detected, the program would respond with "Left Left Right Right", anticipating the next move.

[![](/images/telegram-game-automation/v2.jpeg) v2 demo](https://twitter.com/jlwhoo7/status/1843699941241393295)

Despite these advancements, accuracy remained elusive:
- Background variations interfered with pixel matching
- High accuracy thresholds (0.65) meant missed legitimate branches
- Fast-moving elements triggered false positives

## Attempt 3: Machine Learning Approach

The limitations of traditional image processing led me to explore machine learning, despite my initial reservations. This decision proved transformative:
{{< twitter user="jlwhoo7" id="1843699876766568756" >}}

Using Roboflow, the process involved:

1. Recording gameplay and manually labeling 127 screenshots
2. Creating three classes: "left" branch, "right" branch, and "restart" button
3. Training a custom object detection model
4. Rebuilding in Python with:
- Mac LaunchServices for faster screenshots
- Pynput for more reliable keyboard control
- Roboflow's inference API

The implementation was remarkably efficient:

- Just 60 lines of code (compared to 344 in Rust)
- 94.3% accuracy on the validation/test set
![Roboflow](/images/telegram-game-automation/roboflow.png)
- Consistent branch detection across different game backgrounds
- No false positives from interfering visual elements

## The Real Cost of Traditional Automation
The journey from PyAutoGui to machine learning reveals a deeper truth about automation: sometimes, the obvious solution isn't the optimal one. Traditional automation tools, while valuable in their domain, can impose hidden costs:

- Time spent fine-tuning unreliable detection mechanisms
- Processing overhead from constant screenshot analysis
- Maintenance burden of complex, brittle code

## Conclusion: Embracing the Right Tool

> Action cures fear - David J. Schwartz

This project taught me that sometimes, the most daunting solution - in this case, machine learning - can actually be the most elegant. The final implementation wasn't just more accurate; it was simpler, more maintainable, and more adaptable to future changes.

The final code for this project is available on [GitHub](https://github.com/superoo7/telegram-lumberjack-automation).