import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { Address } from "cluster";
// import { MyToken, MyToken__factory } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { BigNumber } from "@ethersproject/bignumber";
import { Funding__factory } from "../typechain-types";
describe("Funding  ", function () {
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const totalAmount = 1000000000;

    const deadTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    // const deadTime = await time.latest();

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    // const Lock = await ethers.getContractFactory("Lock");
    // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

    //
    const Funding: Funding__factory = await ethers.getContractFactory(
      "Funding"
    );
    const funding = await Funding.deploy(totalAmount, ONE_YEAR_IN_SECS);
    ///

    return {
      funding,
      deadTime,
      lockedAmount,
      owner,
      otherAccount,
      totalAmount,
    };
  }
  describe("Deployment", function () {
    it("Should set the amount target for funding  and time", async function () {
      const { funding, totalAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      expect(await funding.target()).to.equal(totalAmount);
    });
    // it("Should set the deadline", async function () {
    //   const { funding, owner, deadTime } = await loadFixture(
    //     deployOneYearLockFixture
    //   );

    //   expect(await funding.deadline()).to.equal(deadTime);
    // });

    it("Should set the right owner", async function () {
      const { funding, owner } = await loadFixture(deployOneYearLockFixture);

      expect(await funding.manager()).to.equal(owner.address);
    });
  });
  //   describe("Send Ether", function () {
  //     it("Should send the ether", async function () {
  //       const { funding, totalAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );
  //       await expect(funding.sendEth()).to.be.revertedWith("Deadline has passed");
  //     });
  //   });
  //   it("Should set the  amount target  and time", async function () {
  //     const [owner, addr1]: SignerWithAddress[] = await ethers.getSigners();

  //     const FirstCoin = await ethers.getContractFactory("Funding");
  //     const firstCoin = await FirstCoin.deploy("10000", 36000);
  //     await firstCoin.deployed();
  //   });
});
