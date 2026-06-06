const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const uploadToPinata = async (filePath, fileName) => {
  const formData = new FormData();

  formData.append("file", fs.createReadStream(filePath), fileName);

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      }
    );
  
    return response.data.IpfsHash;
  } catch (error) {
    console.log("PINATA ERROR:", error.response?.data || error.message);
    throw error;
  }

  return response.data.IpfsHash;
};

module.exports = uploadToPinata;