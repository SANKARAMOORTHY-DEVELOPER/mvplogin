const hre = require('hardhat');
const fs = require("fs");
const contractABI = __dirname + "/../abi";

async function main() {
  const NFTCollection = await hre.ethers.getContractFactory('NFTCollection');
  const nftCollection = await NFTCollection.deploy();
  await nftCollection.deployed();
  const nftCollectionAddress = await nftCollection.address

  console.log('NFTCollection deployed to:', nftCollectionAddress);

  await fs.writeFileSync(
      contractABI + "/NFTCollection-address.json",
    JSON.stringify({ NFTCollection: nftCollectionAddress }, undefined, 2)
  );

  const NFTMarketplace = await hre.ethers.getContractFactory(
    'NFTMarketplace'
  );
  const nftMarketplace = await NFTMarketplace.deploy(nftCollectionAddress);
  await nftMarketplace.deployed();
  const nftMarketplaceAddress = await nftMarketplace.address
  console.log('NFTMarketplace deployed to:', nftMarketplaceAddress);

  await fs.writeFileSync(
      contractABI + "/NFTMarketplace-address.json",
    JSON.stringify({ NFTMarketplace: nftMarketplaceAddress }, undefined, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
