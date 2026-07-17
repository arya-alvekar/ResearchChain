const Paper = require("../models/Paper");
const PaperVersion = require("../models/PaperVersion");
const fs = require("fs");
const crypto = require("crypto");
const uploadToPinata = require("../utils/pinata");
const { registerPaperOnChain } = require("../utils/blockchain");

const createVersion = async (req, res) => {
  try {
    const paperId = req.params.paperId;
    const { notes } = req.body;

    const paper = await Paper.findById(paperId);

    if (!paper) {
      return res.status(404).json({
        message: "Paper not found",
      });
    }

    const latestVersion = await PaperVersion.findOne({
      paper: paperId,
    }).sort({
      versionNumber: -1,
    });

    const nextVersionNumber = latestVersion
      ? latestVersion.versionNumber + 1
      : 1;

    const version = await PaperVersion.create({
      paper: paperId,
      versionNumber: nextVersionNumber,
      notes,
    });

    res.status(201).json(version);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const uploadPaperFile = async (req, res) => {
  try {
    const version = await PaperVersion.findById(req.params.versionId);

    if (!version) {
      return res.status(404).json({
        message: "Version not found",
      });
    }

    version.fileName = req.file.filename;
    version.filePath = req.file.path;

    const fileBuffer = fs.readFileSync(req.file.path);

    const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");

    version.fileHash = hash;

    const cid = await uploadToPinata(
      req.file.path,
      req.file.filename
    );
    
    version.ipfsCID = cid;
    
    const txHash = await registerPaperOnChain(
      hash,
      cid
    );
    
    version.txHash = txHash;
    await version.save();

    res.status(200).json(version);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVersionsByPaper = async (req, res) => {
  try {
    const versions = await PaperVersion.find({
      paper: req.params.paperId,
    }).sort({
      versionNumber: -1,
    });

    res.status(200).json(versions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVersion,
  uploadPaperFile,
  getVersionsByPaper,
};
