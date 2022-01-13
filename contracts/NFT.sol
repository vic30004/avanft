//SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;

//openzepplin ERC721 NFT functionality
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/utils/Counters.sol';

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    // counters allow us to keep track of tokenIds
    // address of marketplace for NFTs to interact
    address contractAddress;

    // set up our address
    constructor(address marketplaceAddress) ERC721('AVANFT', 'AVANFT') {
        contractAddress = marketplaceAddress;
    }

    function mintToken(string memory tokenURI) public returns(uint) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        // set the token URI: id and url
        _setTokenURI(newItemId, tokenURI);
        // give marketplace approval to transact between users
        setApprovalForAll(contractAddress, true);
        // mint the token and set if for sale - return the id to do so
        return newItemId;
    } 
}