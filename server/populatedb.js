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

async function messageCreate(
  index,
  author,
  text,
  posted,
  upVotes,
  downVotes,
  comments
) {
  const messagedetail = {
    index: index,
    author: author,
    text: text,
    posted: posted,
    upVotes: upVotes,
    downVotes: downVotes,
    comments: comments,
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
      "27/11/2021",
      80,
      15,
      ["Great joke!", "That's so lame!", "Haha, made me chuckle!"]
    ),
    messageCreate(
      1,
      "CryptoLover123",
      "Can someone explain how blockchain consensus works?",
      "21/11/2021",
      90,
      10,
      ["Good question!", "You should Google it!"]
    ),
    messageCreate(
      2,
      "BlockchainExpert",
      "What is the role of miners in the Bitcoin network?",
      "28/11/2021",
      70,
      20,
      ["Informative post!", "Everybody knows this!"]
    ),
    messageCreate(
      3,
      "SatoshiFanatic",
      "What are the advantages of using Bitcoin over traditional currencies?",
      "22/11/2021",
      85,
      12,
      ["Interesting question!", "I've been wondering about this too!"]
    ),
    messageCreate(
      4,
      "EthereumEnthusiast",
      "Why did the cryptocurrency cross the road? To reach the digital wallet on the other side!",
      "29/11/2021",
      60,
      25,
      ["Hilarious!", "Not as good as the first one!", "Made me smile!"]
    ),
    messageCreate(
      5,
      "NFTEnthusiast",
      "What are some popular NFT marketplaces?",
      "24/11/2021",
      75,
      18,
      ["I've been looking for this too!"]
    ),
    messageCreate(
      6,
      "CryptoNinja",
      "Why was the Bitcoin miner arrested at the airport? Because he was caught in a hashing baggage check!",
      "01/12/2021",
      70,
      15,
      ["LOL!", "That's a clever one!", "Made my day!"]
    ),
    messageCreate(
      7,
      "StablecoinFan",
      "Why was the crypto investor always calm? Because he had a lot of stablecoins.",
      "30/11/2021",
      95,
      5,
      ["Good one!", "Keep 'em coming!"]
    ),
    messageCreate(
      8,
      "DecentralizedDuke",
      "How does a Bitcoin propose to its partner? With a blockchain ring!",
      "02/12/2021",
      60,
      30,
      ["Brilliant!", "Keep the jokes rolling!"]
    ),
    messageCreate(
      9,
      "CryptoMemeLord",
      "Why did the Ethereum developer break up with his girlfriend? Because he wanted smart contracts, not commitments!",
      "03/12/2021",
      80,
      20,
      ["Funny and creative!", "Made me laugh out loud!"]
    ),
    messageCreate(
      10,
      "NFTNutter",
      "What do you call a group of NFTs? A non-fungible token-ring circus!",
      "04/12/2021",
      85,
      15,
      ["Nice one!", "Keep the humor flowing!"]
    ),
    messageCreate(
      11,
      "CryptoHumorist",
      "Why did the cryptocurrency get a job as a waiter? Because it had a good blockchain service!",
      "05/12/2021",
      90,
      10,
      ["Helpful post!", "Thanks for sharing!"]
    ),
    messageCreate(
      12,
      "CryptoConnoisseur",
      "How do I securely store my private keys?",
      "06/12/2021",
      40,
      5,
      ["Good analogy!", "Interesting take!"]
    ),
    messageCreate(
      13,
      "BlockchainBanter",
      "Why did the blockchain refuse to fight? It didn't want to end up in a block collision!",
      "07/12/2021",
      55,
      20,
      ["Clear explanation!", "Well done!"]
    ),
    messageCreate(
      14,
      "CryptoCurious",
      "What is the difference between a public and a private blockchain?",
      "08/12/2021",
      70,
      8,
      ["Haha, clever twist!", "Nice joke!"]
    ),
    messageCreate(
      15,
      "CryptoChuckles",
      "Why did the Bitcoin go to therapy? To deal with its Bit-coinage!",
      "09/12/2021",
      75,
      15,
      ["Great insights!", "Good analysis!"]
    ),
    messageCreate(
      16,
      "DecentralizedDreamer",
      "What are the major challenges facing blockchain adoption?",
      "10/12/2021",
      60,
      10,
      ["Clever pun!", "Haha, encrypted jokes!"]
    ),
    messageCreate(
      17,
      "CryptoJester",
      "Why did the blockchain comedian get arrested? Because his jokes were too encrypted!",
      "25/11/2021",
      50,
      5,
      ["Welcome to crypto!", "Sure, I'll recommend one!"]
    ),
    messageCreate(
      18,
      "CryptoNoob",
      "I'm new to crypto, can someone recommend a reliable wallet?",
      "26/11/2021",
      70,
      10,
      ["Repetitive question!", "Search for the answer first!"]
    ),
    messageCreate(
      19,
      "CryptoLover123",
      "Can someone explain how blockchain consensus works?",
      "21/11/2021",
      85,
      12,
      ["Interesting question!", "I've been wondering about this too!"]
    ),
  ]);
}
