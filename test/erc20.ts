import { ethers } from "hardhat";
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC 20 token Constructor ", function () {
  const tokenName = "ERCtoken";
  const tokenSymbol = "TKN";
  const tokenTotalSupply = 1000000;
  it.only("total supply of the token ,name of the token,symbol", async function () {
    const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();

    const ErcToken = await ethers.getContractFactory("MyERCToken");
    const ercToken = await ErcToken.deploy(
      tokenTotalSupply,
      tokenName,
      tokenSymbol
    );
    await ercToken.deployed();
    let totalSupply = await ercToken.totalSupply();
    expect(await totalSupply).to.equal(1000000);
    let totalName = await ercToken.name();
    expect(await totalName).to.equal(tokenName);
    let totalSymbol = await ercToken.symbol();
    expect(await totalSymbol).to.equal(tokenSymbol);
  });

  it("Should transfer coins correctly", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const FirstCoin = await ethers.getContractFactory("MyToken");
    const firstCoin = await FirstCoin.deploy();
    await firstCoin.deployed();

    await firstCoin.mint(owner.address, 1000);

    await firstCoin.transfer(await addr1.getAddress(), 10);

    expect(await firstCoin.balanceOf(await owner.getAddress())).to.equal(990);

    expect(await firstCoin.balanceOf(await addr1.getAddress())).to.equal(10);
  });
});
