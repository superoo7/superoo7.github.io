+++ 
draft = false
date = 2024-09-22T11:21:52+08:00
title = "Step-by-Step Guide: Building a Blockchain-Based IoT Weather Oracle on Chromia with Arduino"
description = "Learn how to build a blockchain-based IoT weather oracle using an Arduino UNO, thermistor sensor, and Johnny-Five.js. This step-by-step guide demonstrates how to collect temperature data with Node.js and store it securely on the Chromia blockchain—a Layer-1 relational blockchain platform ideal for IoT applications. Discover why Chromia’s SQL-based architecture and customizable fee structures make it perfect for rapid prototyping and seamless IoT integration. Perfect for developers interested in the intersection of IoT, blockchain technology, and JavaScript development."
slug = "building-blockchain-iot-weather-oracle-chromia-arduino"
authors = ["johnson lai"]
tags = ["chromia", "iot"]
categories = []
externalLink = ""
series = []
images = ["/images/iot-weather/cover.png"]
+++

## Introduction

Integrating IoT with blockchain technology enhances data security, transparency, and reliability—crucial for IoT applications. Blockchain’s tamper-proof ledger and ability to timestamp data make it ideal for securely managing IoT information.

In this guide, we'll build a blockchain-based IoT weather oracle using a thermistor sensor, Arduino, and Johnny-Five.js, storing real-time data on Chromia, a Layer-1 relational blockchain platform.

## Project Overview

We'll create a weather data oracle using:
- A thermistor sensor to measure temperature
- An Arduino UNO to read sensor data
- Johnny-Five.js to communicate between Arduino and our application
- Chromia blockchain to securely store and timestamp the data

The final code for this project is available on [GitHub](https://github.com/superoo7/chromia-iot-demo).

{{< figure width="50%" src="https://raw.githubusercontent.com/superoo7/chromia-iot-demo/refs/heads/main/demo.gif" caption="IoT Weather Oracle Demo" >}}

## Why Chromia and Node.js?

Chromia suits this project because:
- Simplicity and Speed: Its SQL-based architecture allows for rapid prototyping, enabling us to build this weather oracle in under two hours.
- Customizable Fee Structures: Tailored to meet project-specific needs.
- Efficient Data Handling: Chromia ensures that once data is written, reading it is free and unlimited.
- Developer-Friendly Tools: Simplifies development with tools like [Postchain client](https://www.npmjs.com/package/postchain-client)

We're using Node.js and Johnny-Five.js to streamline development by coding everything in Typescript/JavaScript.

## Prerequisites

### Hardware
- Thermistor
- 10k Ohm Resistor
- Jumper wires
- Breadboard
- Arduino UNO R4 Wifi (or [any board that Johnny-Five supported](https://johnny-five.io/platform-support/))

### Software
- Node.js and NPM
- Arduino IDE
- PostgreSQL
- Chromia CLI

### Setup
1. [Use Arduino IDE to upload Firmata to Arduino](https://johnny-five.io/platform-support/)
2. Install [Chromia CLI](https://docs.chromia.com/getting-started/dev-setup/cli-installation)

## Step-by-Step Guide

### 1. Setting up Chromia

a. Initialize the project:
```bash
chr create-rell-dapp iot
cd iot
```

b. Edit `src/main.rell`: https://github.com/superoo7/chromia-iot-demo/blob/main/src/main.rell 

Let me explain the code

```js
module;

entity temperature {
    address: byte_array;
    temperature: decimal;
    created_at: integer = op_context.last_block_time;
}
```

This code defines a `temperature` entity in the Chromia blockchain. It has three fields:
- `address`: Stores the address of the IoT device (in this case, our Arduino)
- `temperature`: Stores the temperature reading
- `created_at`: Automatically stores the timestamp of when the data was added to the blockchain

```js
operation add_temperature(temperature: decimal) {
    val addr = op_context.get_signers()[0];
    create temperature (
        address = addr,
        temperature,
    );
}
```

This operation allows adding new temperature readings to the blockchain:
- It takes a `temperature` parameter
- `op_context.get_signers()[0]` gets the address of the account sending the transaction
- `create temperature (...)` creates a new temperature entry in the blockchain

```js
query get_temperatures(addr: byte_array) {
    return temperature @* {
        .address == addr
    } (
        .address,
        .temperature,
        .created_at,
    );
}
```

This query function retrieves temperature data:
- It takes an `addr` parameter to filter results by a specific IoT device
- `@*` retrieves all matching records
- It returns the address, temperature, and timestamp for each record


c. Deploy the code:
```bash
chr node start
```

d. Set up Chromia client:
```bash
npm init -y
npm i typescript ts-node postchain-client
mkdir board
touch board/chromia.ts
```

e. Edit `board/chromia.ts`: https://github.com/superoo7/chromia-iot-demo/blob/main/board/chromia.ts

Let me explain the code:

```typescript
const signatureProvider = newSignatureProvider({
  privKey: "0101010101010101010101010101010101010101010101010101010101010101",
});
```

This creates a signature provider with a hardcoded private key. In a real application, you'd use a secure method to manage private keys.

```typescript
export async function createLocalClient() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = await createClient({
    nodeUrlPool: [localClient],
    blockchainIid: 0,
  });
  cachedClient = client;
  return client;
}
```

This function creates and caches a Chromia client:
- It checks if a client already exists to avoid creating multiple connections
- If not, it creates a new client connected to the local Chromia node

```typescript
export async function addTemperature(temperature: number) {
  const client = await createLocalClient();
  await client.signAndSendUniqueTransaction(
    {
      name: "add_temperature",
      args: [String(temperature)],
    },
    signatureProvider
  );
}
```

This function adds a temperature reading to the blockchain:
- It gets the Chromia client
- It signs and sends a transaction to call the `add_temperature` operation we defined earlier

### 2. Setting up Arduino

a. Connect the hardware:

{{< figure width="65%" src="/images/iot-weather/thermistor_wiring.png" caption="Thermistor Wiring" >}}

- Connect the thermistor to Analog Pin A0
- Use a 10K Ohm resistor as a pull-down resistor

b. Install libraries
```sh
npm i --save johnny-five 
npm i --save-dev @types/johnny-five
```

c. Create `board/main.ts`:
```typescript
import five from "johnny-five";

const board = new five.Board();

const beta = 3950;
const resistance = 10;

board.on("ready", function () {
  const sensor = new five.Sensor({
    pin: "A0",
    freq: 1000,
    threshold: 10,
  });
  sensor.on("change", async function () {
    // @ts-ignore
    const analogValue = this.scaleTo(0, 1023);
    const { celsius } = analogValueToTemperature(analogValue);
    console.log(celsius);
  });
});

function analogValueToTemperature(val: number) {
  const celsius =
    beta /
      (Math.log(((1025.0 * resistance) / val - resistance) / resistance) +
        beta / 298.0) -
    273.0;
  const fahrenheit = 1.8 * celsius + 32.0;

  return {
    celsius,
    fahrenheit,
  };
}
```

Let me explain the code:
```typescript
const board = new five.Board();

const beta = 3950;
const resistance = 10;

board.on("ready", function () {
  const sensor = new five.Sensor({
    pin: "A0",
    freq: 1000,
    threshold: 10,
  });
  // ... (sensor event handling)
});
```

This code sets up the Arduino board and sensor:
- It creates a new Johnny-Five board object
- `beta` and `resistance` are constants related to the thermistor calculations
- When the board is ready, it sets up a sensor on analog pin A0, reading every 1000ms (1 second)

```typescript
function analogValueToTemperature(val: number) {
  const celsius =
    beta /
      (Math.log(((1025.0 * resistance) / val - resistance) / resistance) +
        beta / 298.0) -
    273.0;
  const fahrenheit = 1.8 * celsius + 32.0;

  return {
    celsius,
    fahrenheit,
  };
}
```

This function converts the analog reading from the thermistor to temperature:
- It uses the Steinhart-Hart equation to calculate temperature in Celsius
- It also calculates the Fahrenheit equivalent

### 3. Integrating Arduino with Chromia

Update `board/main.ts`:
```typescript
import five from "johnny-five";
import { addTemperature } from "./chromia";

// ... (previous code)

board.on("ready", function () {
  const sensor = new five.Sensor({
    pin: "A0",
    freq: 1000,
    threshold: 10,
  });
  sensor.on("change", async function () {
    // @ts-ignore
    const analogValue = this.scaleTo(0, 1023);
    const { celsius } = analogValueToTemperature(analogValue);
    console.log(celsius);
    await addTemperature(celsius);
  });
});

// ... (rest of the code)
```

This code runs whenever the sensor detects a change:
- It scales the analog reading to a 0-1023 range
- It converts the analog value to temperature
- It logs the temperature to the console
- It calls `addTemperature` to store the reading on the Chromia blockchain

By understanding these code sections, you can see how the project combines hardware input (thermistor readings via Arduino), data processing (converting analog values to temperature), and blockchain integration (storing temperature data on Chromia). This creates a secure, decentralized IoT weather oracle.

## Running the Project

1. Start the Chromia node:
```bash
chr node start
```

2. Run the main script:
```bash
ts-node board/main.ts
```

You should now see temperature readings being logged and stored on the Chromia blockchain.

{{< youtube io5w0qlZEbQ >}}


## Conclusion

You've successfully built a blockchain-based IoT weather oracle using Arduino and Chromia. This project demonstrates how to securely store and manage IoT data on a blockchain, providing a foundation for more complex IoT applications.