// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ReliefStablecoin (RELIEF)
 * @dev 1:1 pegged stablecoin for disaster relief demo.
 * Managed by the Relief Authority (Admin).
 */
contract ReliefStablecoin is ERC20, Ownable {
    address public programManager;

    event ProgramManagerUpdated(address indexed newManager);

    constructor() ERC20("Relief Stablecoin", "RELIEF") Ownable(msg.sender) {}

    /**
     * @dev Sets the ProgramManager contract address allowed to move tokens.
     */
    function setProgramManager(address _programManager) external onlyOwner {
        require(_programManager != address(0), "Invalid address");
        programManager = _programManager;
        emit ProgramManagerUpdated(_programManager);
    }

    /**
     * @dev Mints tokens to a specific address. Only owner (Admin) can mint.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Burns tokens from a specific address. Only owner (Admin) can burn.
     */
    function burn(address from, uint256 amount) external onlyOwner {
        _burn(from, amount);
    }

    /**
     * @dev Custom transfer logic to allow ProgramManager to move tokens for payments.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public override returns (bool) {
        if (msg.sender == programManager) {
            _transfer(sender, recipient, amount);
            return true;
        }
        return super.transferFrom(sender, recipient, amount);
    }
}
