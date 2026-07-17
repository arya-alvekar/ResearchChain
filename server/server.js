const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

const authRoutes = require("./routes/authRoutes.js");
const paperRoutes = require("./routes/paperRoutes.js");
const versionRoutes = require("./routes/versionRoutes.js");
const verifyRoutes = require("./routes/verifyRoutes.js");

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/papers", paperRoutes);
app.use(
  "/api/versions",
  versionRoutes
);
app.use("/api/verify", verifyRoutes);

app.get("/", (req, res) => {
  res.send("ResearchChain Backend Running with MongoDB");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});