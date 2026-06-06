// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ResearchRegistry {

    struct Record {
        string fileHash;
        string ipfsCID;
        address owner;
        uint256 timestamp;
    }

    mapping(string => Record) public records;

    function registerPaper(
        string memory _fileHash,
        string memory _ipfsCID
    ) public {

        records[_fileHash] = Record({
            fileHash: _fileHash,
            ipfsCID: _ipfsCID,
            owner: msg.sender,
            timestamp: block.timestamp
        });
    }

    function getRecord(
        string memory _fileHash
    )
        public
        view
        returns (
            string memory,
            string memory,
            address,
            uint256
        )
    {
        Record memory record = records[_fileHash];

        return (
            record.fileHash,
            record.ipfsCID,
            record.owner,
            record.timestamp
        );
    }
}