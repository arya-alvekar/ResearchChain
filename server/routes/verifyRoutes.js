const express = require("express");
const router = express.Router();

const {
  verifyPaper,
} = require("../controllers/verifyController");

router.get("/:versionId", verifyPaper);

module.exports = router;