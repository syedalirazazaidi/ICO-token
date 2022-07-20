import { MyERCToken__factory } from "./../typechain-types/factories/contracts/ErcToken.sol/MyERCToken__factory";

import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  const MyERCToken: MyERCToken__factory = await ethers.getContractFactory(
    "MyERCToken"
  );
  const erc20 = await MyERCToken.deploy(10000, "ERCETOKEN", "TCRE");
  await erc20.deployed();
  console.log(`Deployed ERC20 contract address: ${erc20.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
