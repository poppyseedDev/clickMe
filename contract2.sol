// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PotatoToken is ERC20 {
    // The cost of one potato in tokens
    uint256 public constant POTATO_PRICE = 1000;

    // Mapping of address to number of potatoes bought
    mapping(address => uint256) private potatoesBought;

    uint256 private lastMintBlockNumber;

    constructor() ERC20("PotatoToken", "PTT") {
        lastMintBlockNumber = block.number;
    }

    // Function to mint tokens to a user address
    // TODO Change the function so you can mint only once every 5 blocks.
    function mint() public {
        // Ensure that at least 5 blocks have passed since the last mint
        require(block.number >= lastMintBlockNumber + 5, "Minting not allowed yet");

        uint256 amount = 10;
        _mint(msg.sender, amount);

        // Update the last mint block number
        lastMintBlockNumber = block.number;
    }

    // Function to buy potatoes using tokens
    function buyPotato() public {
        // Check if the user has enough tokens to buy a potato
        require(balanceOf(msg.sender) >= POTATO_PRICE, "Not enough tokens to buy a potato");

        // Burn the tokens used to buy the potato
        _burn(msg.sender, POTATO_PRICE);

        // Increment the potato counter for the user
        potatoesBought[msg.sender]++;
    }

    // Function to get the number of potatoes bought by an address
    function getPotatoesBought(address user) public view returns (uint256) {
        return potatoesBought[user];
    }
}
