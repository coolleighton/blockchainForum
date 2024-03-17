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

async function messageCreate(author, title, text, posted, upVotes, comments) {
  const messagedetail = {
    author: author,
    title: title,
    text: text,
    posted: posted,
    upVotes: upVotes,
    comments: comments,
  };

  const message = new Message(messagedetail);
  await message.save();
  console.log(`Added message: ${text}`);
}

async function createMessages() {
  console.log("Adding messages");
  await Promise.all([
    messageCreate(
      "BitcoinBard",
      "What's a crypto's favorite dance move?",
      "The blockchain shuffle!",
      new Date("11-10-2023").toString(),
      80,
      [
        {
          Comment: "Great joke!",
          user: "CryptoLover123",
          posted: new Date("11-10-2023").toString(),
          upVotes: 4,
        },
        {
          Comment: "That's so lame!",
          user: "SatoshiFanatic",
          posted: new Date("11-10-2023").toString(),
          upVotes: 1,
        },
        {
          Comment: "Haha, made me chuckle!",
          user: "NFTEnthusiast",
          posted: new Date("11-10-2023").toString(),
          upVotes: 3,
        },
      ]
    ),
    messageCreate(
      "CryptoLover123",
      "Can someone explain how blockchain consensus works?",
      "I have no idea really.",
      new Date("11-10-2023").toString(),
      90,
      [
        {
          Comment: "Good question!",
          user: "BlockchainExpert",
          posted: new Date("11-10-2023").toString(),
          upVotes: 5,
        },
      ]
    ),
    messageCreate(
      "BlockchainExpert",
      "What is the role of miners in the Bitcoin network?",
      "want to start a mining rig.",
      new Date("11-10-2023").toString(),
      70,
      [
        {
          Comment: "Informative post!",
          user: "CryptoJester",
          posted: new Date("11-10-2023").toString(),
          upVotes: 3,
        },
        {
          Comment: "Everybody knows this!",
          user: "CryptoLover123",
          posted: new Date("11-10-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "SatoshiFanatic",
      "What are the advantages of using Bitcoin over traditional currencies?",
      "Im thinking about making an investment",
      new Date("11-10-2023").toString(),
      85,
      [
        {
          Comment: "Interesting question!",
          user: "CryptoLover123",
          posted: new Date("11-10-2023").toString(),
          upVotes: 4,
        },
      ]
    ),
    messageCreate(
      "EthereumEnthusiast",
      "Why did the cryptocurrency cross the road?",
      "To reach the digital wallet on the other side!",
      new Date("11-10-2023").toString(),
      60,
      [
        {
          Comment: "Hilarious!",
          user: "CryptoLover123",
          posted: new Date("11-10-2023").toString(),
          upVotes: 3,
        },
        {
          Comment: "Not as good as the first one!",
          user: "CryptoNinja",
          posted: new Date("11-10-2023").toString(),
          upVotes: 1,
        },
        {
          Comment: "Made me smile!",
          user: "BitcoinBard",
          posted: new Date("11-10-2023").toString(),
          upVotes: 2,
        },
      ]
    ),
    messageCreate(
      "NFTEnthusiast",
      "What are some popular NFT marketplaces?",
      "i have heard of open sea, are there any others?",
      "24-11-2021",
      75,
      [
        {
          Comment: "I've been looking for this too!",
          user: "CryptoLover123",
          posted: new Date("11-10-2023").toString(),
          upVotes: 3,
        },
      ]
    ),
    messageCreate(
      "CryptoNinja",
      "Why was the Bitcoin miner arrested at the airport?",
      "Because he was caught in a hashing baggage check!",
      new Date("11-07-2023").toString(),
      70,
      [
        {
          Comment: "LOL!",
          user: "CryptoChuckles",
          posted: new Date("11-07-2023").toString(),
          upVotes: 4,
        },
        {
          Comment: "That's a clever one!",
          user: "BitcoinBard",
          posted: new Date("11-07-2023").toString(),
          upVotes: 2,
        },
        {
          Comment: "Made my day!",
          user: "CryptoLover123",
          posted: new Date("11-07-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "StablecoinFan",
      "Why was the crypto investor always calm?",
      "Because he had a lot of stablecoins.",
      "11-07-2021",
      95,
      [
        {
          Comment: "Good one!",
          user: "BitcoinBard",
          posted: new Date("11-07-2023").toString(),
          upVotes: 3,
        },
        {
          Comment: "Keep 'em coming!",
          user: "CryptoLover123",
          posted: new Date("11-07-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "DecentralizedDuke",
      "How does a Bitcoin propose to its partner?",
      "With a blockchain ring!",
      new Date("11-07-2023").toString(),
      60,
      [
        {
          Comment: "Brilliant!",
          user: "CryptoMemeLord",
          posted: new Date("11-07-2023").toString(),
          upVotes: 4,
        },
        {
          Comment: "Keep the jokes rolling!",
          user: "CryptoLover123",
          posted: new Date("11-07-2023").toString(),
          upVotes: 2,
        },
      ]
    ),
    messageCreate(
      "CryptoMemeLord",
      "Why did the Ethereum developer break up with his girlfriend?",
      "Because he wanted smart contracts, not commitments!",
      new Date("11-07-2023").toString(),
      80,
      [
        {
          Comment: "Funny and creative!",
          user: "NFTEnthusiast",
          posted: new Date("11-07-2023").toString(),
          upVotes: 5,
        },
        {
          Comment: "Made me laugh out loud!",
          user: "CryptoLover123",
          posted: new Date("11-07-2023").toString(),
          upVotes: 2,
        },
      ]
    ),
    messageCreate(
      "NFTNutter",
      "What do you call a group of NFTs?",
      "A non-fungible token-ring circus!",
      new Date("11-07-2023").toString(),
      85,
      [
        {
          Comment: "Nice one!",
          user: "CryptoLover123",
          posted: new Date("11-07-2023").toString(),
          upVotes: 4,
        },
        {
          Comment: "Keep the humor flowing!",
          user: "CryptoChuckles",
          posted: new Date("11-07-2023").toString(),
          upVotes: 2,
        },
      ]
    ),
    messageCreate(
      "CryptoHumorist",
      "Why did the cryptocurrency get a job as a waiter?",
      "Because it had a good blockchain service!",
      new Date("11-07-2023").toString(),
      90,
      [
        {
          Comment: "Helpful post!",
          user: "BlockchainExpert",
          posted: new Date("11-07-2023").toString(),
          upVotes: 3,
        },
        {
          Comment: "Thanks for sharing!",
          user: "CryptoLover123",
          posted: new Date("11-07-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "CryptoConnoisseur",
      "How do I securely store my private keys?",
      "I need help",
      new Date("11-22-2023").toString(),
      40,
      [
        {
          Comment: "Good analogy!",
          user: "BlockchainExpert",
          posted: new Date("11-22-2023").toString(),
          upVotes: 2,
        },
        {
          Comment: "Interesting take!",
          user: "CryptoLover123",
          posted: new Date("11-22-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "BlockchainBanter",
      "Why did the blockchain refuse to fight?",
      "It didn't want to end up in a block collision!",
      new Date("11-22-2023").toString(),
      55,
      [
        {
          Comment: "Clear explanation!",
          user: "CryptoLover123",
          posted: new Date("11-22-2023").toString(),
          upVotes: 3,
        },
        {
          Comment: "Well done!",
          user: "BlockchainExpert",
          posted: new Date("11-22-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "CryptoCurious",
      "What is the difference between a public and a private blockchain?",
      "i have no clue?",
      new Date("11-22-2023").toString(),
      70,
      [
        {
          Comment: "Haha, clever twist!",
          user: "CryptoLover123",
          posted: new Date("11-22-2023").toString(),
          upVotes: 2,
        },
        {
          Comment: "Nice joke!",
          user: "BlockchainBanter",
          posted: new Date("11-22-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "CryptoChuckles",
      "Why did the Bitcoin go to therapy?",
      "To deal with its Bit-coinage!",
      new Date("11-22-2023").toString(),
      75,
      [
        {
          Comment: "Great insights!",
          user: "CryptoLover123",
          posted: new Date("11-22-2023").toString(),
          upVotes: 3,
        },
        {
          Comment: "Good analysis!",
          user: "BitcoinBard",
          posted: new Date("11-22-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "DecentralizedDreamer",
      "What are the major challenges facing blockchain adoption?",
      "Im writing a research paper",
      new Date("11-03-2023").toString(),
      60,
      [
        {
          Comment: "Clever pun!",
          user: "CryptoLover123",
          posted: new Date("11-03-2023").toString(),
          upVotes: 2,
        },
        {
          Comment: "Haha, encrypted jokes!",
          user: "BlockchainBanter",
          posted: new Date("11-03-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "CryptoJester",
      "Why did the blockchain comedian get arrested?",
      "Because his jokes were too encrypted!",
      new Date("11-03-2023").toString(),
      50,
      [
        {
          Comment: "Welcome to crypto!",
          user: "CryptoLover123",
          posted: new Date("11-03-2023").toString(),
          upVotes: 3,
        },
        {
          Comment: "Sure, I'll recommend one!",
          user: "StablecoinFan",
          posted: new Date("11-03-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "CryptoNoob",
      "I'm new to crypto, can someone recommend a reliable wallet?",
      "help guys",
      new Date("11-03-2023").toString(),
      70,
      [
        {
          Comment: "Repetitive question!",
          user: "CryptoLover123",
          posted: new Date("11-03-2023").toString(),
          upVotes: 2,
        },
        {
          Comment: "Search for the answer first!",
          user: "BitcoinBard",
          posted: new Date("11-03-2023").toString(),
          upVotes: 1,
        },
      ]
    ),
    messageCreate(
      "CryptoLover123",
      "Can someone explain how blockchain consensus works?",
      "no other info really",
      new Date("11-03-2023").toString(),
      85,
      [
        {
          Comment: "Interesting question!",
          user: "BlockchainExpert",
          posted: new Date("11-03-2023").toString(),
          upVotes: 4,
        },
        {
          Comment: "I've been wondering about this too!",
          user: "EthereumEnthusiast",
          posted: new Date("11-07-2023").toString(),
          upVotes: 2,
        },
      ]
    ),
  ]);
}
