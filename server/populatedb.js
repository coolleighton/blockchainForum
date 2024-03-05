#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Message = require("./models/message");

const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function messageCreate(index, author, text, posted) {
  const messagedetail = {
    index: index,
    author: author,
    text: text,
    posted: posted,
  };

  const message = new Message(messagedetail);
  await message.save();
  messages[index] = message;
  console.log(`Added message: ${text}`);
}

async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(
      0,
      "BitcoinBard",
      "What's a crypto's favorite dance move? The blockchain shuffle!",
      "27/11/2021"
    ),
    messageCreate(
      1,
      "CryptoLover123",
      "Can someone explain how blockchain consensus works?",
      "21/11/2021"
    ),
    messageCreate(
      2,
      "BlockchainExpert",
      "What is the role of miners in the Bitcoin network?",
      "28/11/2021"
    ),
    messageCreate(
      3,
      "SatoshiFanatic",
      "What are the advantages of using Bitcoin over traditional currencies?",
      "22/11/2021"
    ),
    messageCreate(
      4,
      "EthereumEnthusiast",
      "Why did the cryptocurrency cross the road? To reach the digital wallet on the other side!",
      "29/11/2021"
    ),
    messageCreate(
      5,
      "NFTEnthusiast",
      "What are some popular NFT marketplaces?",
      "24/11/2021"
    ),
    messageCreate(
      6,
      "CryptoNinja",
      "Why was the Bitcoin miner arrested at the airport? Because he was caught in a hashing baggage check!",
      "01/12/2021"
    ),
    messageCreate(
      7,
      "StablecoinFan",
      "Why was the crypto investor always calm? Because he had a lot of stablecoins.",
      "30/11/2021"
    ),
    messageCreate(
      8,
      "DecentralizedDuke",
      "How does a Bitcoin propose to its partner? With a blockchain ring!",
      "02/12/2021"
    ),
    messageCreate(
      9,
      "CryptoMemeLord",
      "Why did the Ethereum developer break up with his girlfriend? Because he wanted smart contracts, not commitments!",
      "03/12/2021"
    ),
    messageCreate(
      10,
      "NFTNutter",
      "What do you call a group of NFTs? A non-fungible token-ring circus!",
      "04/12/2021"
    ),
    messageCreate(
      11,
      "CryptoHumorist",
      "Why did the cryptocurrency get a job as a waiter? Because it had a good blockchain service!",
      "05/12/2021"
    ),
    messageCreate(
      12,
      "CryptoConnoisseur",
      "How do I securely store my private keys?",
      "06/12/2021"
    ),
    messageCreate(
      13,
      "BlockchainBanter",
      "Why did the blockchain refuse to fight? It didn't want to end up in a block collision!",
      "07/12/2021"
    ),
    messageCreate(
      14,
      "CryptoCurious",
      "What is the difference between a public and a private blockchain?",
      "08/12/2021"
    ),
    messageCreate(
      15,
      "CryptoChuckles",
      "Why did the Bitcoin go to therapy? To deal with its Bit-coinage!",
      "09/12/2021"
    ),
    messageCreate(
      16,
      "DecentralizedDreamer",
      "What are the major challenges facing blockchain adoption?",
      "10/12/2021"
    ),
    messageCreate(
      17,
      "CryptoJester",
      "Why did the blockchain comedian get arrested? Because his jokes were too encrypted!",
      "25/11/2021"
    ),
    messageCreate(
      18,
      "CryptoNoob",
      "I'm new to crypto, can someone recommend a reliable wallet?",
      "26/11/2021"
    ),
    messageCreate(
      19,
      "CryptoLover123",
      "Can someone explain how blockchain consensus works?",
      "21/11/2021"
    ),
  ]);
}
