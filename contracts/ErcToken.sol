// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Import this file to use console.log
import "hardhat/console.sol";

contract MyERCToken is ERC20, Pausable, Ownable {
    constructor(
        uint256 initialSupply,
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _balances[msg.sender] = initialSupply;
    }

    function _transfer(address to, uint256 value)
        internal
        virtual
        returns (bool)
    {
        require(to != address(0), "ERC20: to address is not valid");
        require(value <= _balances[msg.sender], "ERC20: insufficient balance");
        _balances[msg.sender] = _balances[msg.sender] - value;
        _balances[to] = _balances[to] + value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
}
