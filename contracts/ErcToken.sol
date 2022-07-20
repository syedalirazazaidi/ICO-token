// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract MyERCToken is ERC20, Pausable, Ownable {
    // mapping(address => uint256) internal _balances;

    constructor(
        // uint8 _decimals,
        uint256 initialSupply,
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {
        // _mint(msg.sender, initialSupply);
        _mint(msg.sender, initialSupply * (10**decimals()));
    }
}
