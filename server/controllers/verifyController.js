const PaperVersion = require("../models/PaperVersion");
const { getRecordByHash } = require("../utils/blockchain");

const verifyPaper = async (req, res) => {
  try {
    const version = await PaperVersion.findById(
      req.params.versionId
    );

    if (!version) {
      return res.status(404).json({
        message: "Version not found",
      });
    }
    if (version.ipfsCID || version.fileHash || version.txHash) {
      return res.status(400).json({
          message: "This version already has an uploaded document."
      });
  }

    console.log("Version hash:", version.fileHash);

    const blockchainRecord =
      await getRecordByHash(version.fileHash);

    const verified =
      blockchainRecord.fileHash === version.fileHash;

    res.status(200).json({
      verified,
      mongoHash: version.fileHash,
      blockchainHash: blockchainRecord.fileHash,
      ipfsCID: blockchainRecord.ipfsCID,
      owner: blockchainRecord.owner,
      timestamp: blockchainRecord.timestamp,
      txHash: version.txHash,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  verifyPaper,
};