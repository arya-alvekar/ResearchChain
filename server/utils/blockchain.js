const { ethers } = require("ethers");
const contractJson = require("../contracts/ResearchRegistry.json");

const provider = new ethers.JsonRpcProvider(
  "http://127.0.0.1:8545"
);

const wallet = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider
);

const contract = new ethers.Contract(
  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
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
    console.log("Searching blockchain for:", fileHash);
  
    const record = await contract.getRecord(fileHash);
  
    console.log("Blockchain record:", record);
  
    return {
      fileHash: record[0],
      ipfsCID: record[1],
      owner: record[2],
      timestamp: Number(record[3]),
    };
}

module.exports = {
  registerPaperOnChain,
  getRecordByHash,
};