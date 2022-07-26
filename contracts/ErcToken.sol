// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "./interfaces/IERC20.sol";
// Import this file to use console.log
import "hardhat/console.sol";

contract MyERCToken is ERC20, Pausable, Ownable {
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor(
        uint256 initialSupply,
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _balances[msg.sender] = initialSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        virtual
        override
        returns (bool)
    {
        require(_to != address(0), "ERC20: to address is not valid");
        require(_value <= _balances[msg.sender], "ERC20: insufficient balance");
        _balances[msg.sender] = _balances[msg.sender] - _value;
        _balances[_to] = _balances[_to] + _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function balanceOf(address account)
        public
        view
        virtual
        override
        returns (uint256)
    {
        return _balances[account];
    }

    function approve(address spender, uint256 amount)
        public
        virtual
        override
        returns (bool)
    {
        address owner = _msgSender();
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public virtual override returns (bool) {
        require(_from != address(0), "ERC20: from address is not valid");
        require(_to != address(0), "ERC20: to address is not valid");
        require(_value <= _balances[_from], "ERC20: insufficient balance");
        require(
            _value <= _allowances[_from][msg.sender],
            "ERC20: transfer from value not allowed"
        );

        _allowances[_from][msg.sender] =
            _allowances[_from][msg.sender] -
            _value;
        _balances[_from] = _balances[_from] - _value;
        _balances[_to] = _balances[_to] + _value;
        emit Transfer(_from, _to, _value);

        return true;
    }
}
