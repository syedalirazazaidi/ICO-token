import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC 20 token Constructor ", function () {
  const tokenName = "ERCtoken";
  const tokenSymbol = "TKN";
  const tokenTotalSupply = 10000;
  it("total supply of the token ,name of the token and symbol", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();
    const ErcToken = await ethers.getContractFactory("MyERCToken");
    const ercToken = await ErcToken.deploy(
      tokenTotalSupply,
      tokenName,
      tokenSymbol
    );
    await ercToken.deployed();
    let totalSupply = await ercToken.totalSupply();
    expect(await totalSupply).to.equal(10000);
    let totalName = await ercToken.name();
    expect(await totalName).to.equal(tokenName);
    let totalSymbol = await ercToken.symbol();
    expect(await totalSymbol).to.equal(tokenSymbol);
  });
});
describe("Transfer token", function () {
  const tokenName = "ERCtoken";
  const tokenSymbol = "TKN";
  const tokenTotalSupply = 10000;
  it.only("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2]: SignerWithAddress[] =
      await ethers.getSigners();
    const ErcToken = await ethers.getContractFactory("MyERCToken");
    const ercToken = await ErcToken.deploy(
      tokenTotalSupply,
      tokenName,
      tokenSymbol
    );
    await ercToken.deployed();
    await ercToken.transfer(addr1.address, 50);
    const addr1Balance = await ercToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(50);
    await ercToken.connect(addr1).transfer(addr2.address, 50);
    const addr2Balance = await ercToken.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);

    // const initialOwnerBalance = await ercToken.balanceOf(owner.address);
    // console.log(initialOwnerBalance);
    await expect(ercToken.transfer(owner.address, 1)).to.be.revertedWith(
      "ERC20: to address is not valid"
    );
  });
});
