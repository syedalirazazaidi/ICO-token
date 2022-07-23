import { Address } from "cluster";
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
  it("Should transfer tokens between accounts", async function () {
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
    await expect(
      ercToken.transfer("0x0000000000000000000000000000000000000000", 1000)
    ).to.be.revertedWith("ERC20: to address is not valid");

    await expect(
      ercToken.connect(addr1).transfer(addr2.address, "10000000")
    ).to.be.revertedWith("ERC20: insufficient balance");
  });
});
describe("balanceOf.test", function () {
  const tokenName = "ERCtoken";
  const tokenSymbol = "TKN";
  const tokenTotalSupply = 10000;
  it("balanceOf success", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();
    const ErcToken = await ethers.getContractFactory("MyERCToken");
    const ercToken = await ErcToken.deploy(
      tokenTotalSupply,
      tokenName,
      tokenSymbol
    );
    await ercToken.deployed();
    const initialOwnerBalance = await ercToken.balanceOf(owner.address);
    const finalOwnerBalance = await ercToken.balanceOf(owner.address);
    expect(finalOwnerBalance).to.equal(10000);
  });
});
describe.only("Approval Function.test", function () {
  const tokenName = "ERCtoken";
  const tokenSymbol = "TKN";
  const tokenTotalSupply = 10000;
  it("owner approve ethe amount to addr1 to spend", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();
    const ErcToken = await ethers.getContractFactory("MyERCToken");
    const ercToken = await ErcToken.deploy(
      tokenTotalSupply,
      tokenName,
      tokenSymbol
    );
    await ercToken.deployed();

    // await ercToken.approve(addr1.address, 1000);
    expect(await ercToken.approve(addr1.address, 15))
      .to.emit(ercToken, "Approv-al")
      .withArgs(owner.address, addr1.address, 30);
  });
});
