const { ethers } = require("ethers");
const contractJson = require("../contracts/ResearchRegistry.json");

const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
);

const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  contractJson.abi,
  wallet
);

async function registerPaperOnChain(fileHash, ipfsCID) {
  const tx = await contract.registerPaper(
    fileHash,
    ipfsCID
  );

  await tx.wait();

  return tx.hash;
}

async function getRecordByHash(fileHash) {
  try {
    const hash = fileHash.startsWith("0x")
      ? fileHash
      : "0x" + fileHash;

    console.log("Searching blockchain for:", hash);

    const record = await contract.getRecord(hash);

    console.log("Blockchain record:", record);

    return {
      fileHash: record[0],
      ipfsCID: record[1],
      owner: record[2],
      timestamp: Number(record[3]),
    };
  } catch (error) {
    console.error("BLOCKCHAIN LOOKUP ERROR:", error);
    throw error;
  }
}

module.exports = {
  registerPaperOnChain,
  getRecordByHash,
};