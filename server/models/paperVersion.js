const mongoose = require("mongoose");

const paperVersionSchema = new mongoose.Schema(
  {
    paper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paper",
      required: true,
    },

    versionNumber: {
      type: Number,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    author: {
      type: String,
      default: "",
    },

    fileName: {
      type: String,
      default: "",
    },

    filePath: {
        type: String,
        default: "",
      },

    ipfsCID: {
      type: String,
      default: "",
    },

    fileHash: {
      type: String,
      default: "",
    },

    txHash: {
      type: String,
      default: "",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "PaperVersion",
  paperVersionSchema
);