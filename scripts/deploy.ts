import { MyERCToken__factory } from "./../typechain-types/factories/contracts/ErcToken.sol/MyERCToken__factory";
import { CrowdSale } from "./../typechain-types/contracts/CrowdSale";
import { MyToken } from "./../typechain-types/contracts/MyToken";
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
// import { MyToken, CrowdSale, ERC20PresetMinterPauser } from "../typechain";

async function main() {
  const [deployer] = await ethers.getSigners();

  const MyERCToken = await ethers.getContractFactory("MyERCToken");
  const myercToken: MyERCToken__factory = await MyERCToken.deploy();

  // console.log("Token address:", token.address);

  // const CrowdSale = await ethers.getContractFactory("CrowdSale");
  // const crowdSale: CrowdSale = await CrowdSale.deploy(token.address);

  // console.log("Crowdsale Contract address:", crowdSale.address);

  // const grantRoleTx = await token.grantRole(
  //   await token.MINTER_ROLE(),
  //   crowdSale.address
  // );

  // // wait until the transaction is mined
  // await grantRoleTx.wait();

  // const buyTx = await crowdSale.buyToken({
  //   value: ethers.utils.parseEther("0.05"),
  // });

  // // wait until the transaction is mined
  // await buyTx.wait();

  // const bal = await token.balanceOf(deployer.address);

  // console.log("My MyToken Balance is:", bal);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
