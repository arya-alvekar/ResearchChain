# ResearchChain

ResearchChain is a decentralized research paper management platform that uses blockchain technology to ensure the integrity and authenticity of research publications. The system stores research metadata in MongoDB, research documents on IPFS, and immutable proof of ownership and integrity on an Ethereum blockchain.

---

## Features

- User authentication using JWT
- Create and manage research papers
- Upload multiple paper versions
- Store PDFs on IPFS
- Generate SHA-256 hash for every uploaded paper
- Register paper hash and IPFS CID on Ethereum
- Verify document integrity using blockchain records
- Browse published research papers

---

## Architecture

```
                    +------------------+
                    |     React UI     |
                    +--------+---------+
                             |
                             |
                    REST API (Express)
                             |
        +--------------------+-------------------+
        |                    |                   |
        |                    |                   |
     MongoDB               IPFS            Ethereum
   (Paper Metadata)      (PDF Files)    (Hash + CID +
                                           Owner +
                                         Timestamp)
```

---

## Technology Stack

### Frontend

- React
- Vite
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer

### Blockchain

- Solidity
- Hardhat
- Ethers.js
- Hardhat Ignition

### Storage

- IPFS

---

## Project Structure

```
ResearchChain
│
├── client/          # React frontend
├── server/          # Express backend
├── blockchain/      # Solidity smart contracts
└── README.md
```

---

## Smart Contract

The `ResearchRegistry` contract stores immutable records for every uploaded paper.

Each record contains:

- SHA-256 file hash
- IPFS CID
- Owner wallet address
- Upload timestamp

## Installation

### Clone the repository

```bash
git clone https://github.com/<username>/ResearchChain.git
cd ResearchChain
```

---

### Blockchain

```bash
cd blockchain
npm install
```

Start a local blockchain

```bash
npx hardhat node
```

Deploy the contract

```bash
npx hardhat ignition deploy ignition/modules/ResearchRegistry.js --network localhost
```

---

### Backend

```bash
cd server
npm install
```

Create a `.env` file containing:

```env
PORT=<port_no>
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_secret>
PINATA_JWT=<your_pinata_jwt>
PRIVATE_KEY=<wallet_private_key>
CONTRACT_ADDRESS=<deployed_contract_address>
```

Run the backend

```bash
npm run dev
```

---

### Frontend

```bash
cd client
npm install
npm run dev
```

---

## Future Improvements

- MetaMask integration
- Deployment to Sepolia/Mainnet
- Research similarity detection
- Citation tracking

---

## License

This project is intended for educational and research purposes.