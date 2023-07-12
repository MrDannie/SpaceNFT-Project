const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const base_uri =
    "https://ipfs.io/ipfs/QmevRYTuGcK2GhskRo9jKuG8ETKZX3AvqZrB6ANti5o1CR/";
  const SpaceNFTtoken = await ethers.getContractFactory("SpaceNFT");
  // const contract = await Contract.deploy('Adulam NFT', 'ADM', base_uri)
  const spaceNFTtoken = await SpaceNFTtoken.deploy("SpaceNFT", "SPC", base_uri);

  await spaceNFTtoken.deployed();

  const address = JSON.stringify({ address: spaceNFTtoken.address }, null, 4);
  fs.writeFile("./src/abis/contractAddress.json", address, "utf8", (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Deployed contract address", spaceNFTtoken.address);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
