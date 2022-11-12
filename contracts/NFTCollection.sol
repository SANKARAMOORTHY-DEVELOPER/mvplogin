// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTCollection is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;

  mapping(uint => address[]) _itemTrack;

  constructor() 
    ERC721("CeloPunk Auction", "CPNFT") 
  {
  }

  function safeMint(string memory uri) public {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    setTrack(msg.sender, tokenId);
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, uri);
  }

  function setTrack(address _address, uint _id) public returns(bool){
      _itemTrack[_id].push(_address);
      return true;
  }

  function getTrack(uint _id) public view returns(address[] memory){
      address[] memory users;
      users = _itemTrack[_id];
      return users;
  }

  function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

  function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

  function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }
}