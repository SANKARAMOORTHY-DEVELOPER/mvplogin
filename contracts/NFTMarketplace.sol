// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTCollection.sol";

contract NFTMarketplace {
  uint count;
  uint public offerCount;
  mapping (uint => _Offer) public offers;
  mapping (address => uint) public userFunds;
  mapping(uint => Seller) public sellers;
  NFTCollection nftCollection;

  struct _Offer {
    uint offerId;
    uint id;
    address user;
    uint price;
    bool fulfilled;
    bool cancelled;
  }

  struct Seller {
       address userAddress;
       uint balance;
   }

  event Offer(
    uint offerId,
    uint id,
    address user,
    uint price,
    bool fulfilled,
    bool cancelled
  );

  event OfferFilled(uint offerId, uint id, address newOwner);
  event OfferCancelled(uint offerId, uint id, address owner);
  event ClaimFunds(address user, uint amount);

  constructor(address _nftCollection) {
    nftCollection = NFTCollection(_nftCollection);
  }

  function makeOffer(uint _id, uint _price) public returns (address){
    // ensures the caller has ownership of the nft
    require(nftCollection.ownerOf(_id) == msg.sender, "you do not own the nft you are trying to offer");
    nftCollection.transferFrom(msg.sender, address(this), _id);
    offerCount ++;
    offers[offerCount] = _Offer(offerCount, _id, msg.sender, _price, false, false);
    emit Offer(offerCount, _id, msg.sender, _price, false, false);

    return (msg.sender);
  }

  modifier offers_invariants(uint _offerId) {
    // modifier to assert that certain invariants concerning offers hold
    require(offers[_offerId].offerId == _offerId, "ensures an offer exists");
    require(offers[_offerId].fulfilled == false, "ensures that an offer has not yet been fulfiled");
    require(offers[_offerId].cancelled == false, "ensures that an offer has not been cancelled");
    _;  
  }

  function fillOffer(uint _offerId) offers_invariants(_offerId) public payable {
    _Offer storage _offer = offers[_offerId];
    require(_offer.user != msg.sender, 'The owner of the offer cannot fill it');
    require(msg.value == _offer.price, 'The Celo amount should match with the NFT Price');
    nftCollection.transferFrom(address(this), msg.sender, _offer.id);
    _offer.fulfilled = true;
    userFunds[_offer.user] += msg.value;
    sellers[count].userAddress = _offer.user;
    sellers[count].balance = msg.value;
    nftCollection.setTrack(msg.sender, _offer.id);
    count++;
    emit OfferFilled(_offerId, _offer.id, msg.sender);
  }

  function cancelOffer(uint _offerId) offers_invariants(_offerId) public {
    _Offer storage _offer = offers[_offerId];
    require(_offer.user == msg.sender, 'The offer can only be canceled by the owner');
    nftCollection.transferFrom(address(this), msg.sender, _offer.id);
    _offer.cancelled = true;
    emit OfferCancelled(_offerId, _offer.id, msg.sender);
  }

  function claimFunds() public {
    require(userFunds[msg.sender] > 0, 'This user has no funds to be claimed');
    payable(msg.sender).transfer(userFunds[msg.sender]);
    emit ClaimFunds(msg.sender, userFunds[msg.sender]);
    userFunds[msg.sender] = 0;
  }

  function getSellers() public view returns (address[] memory, uint[] memory){
       address[] memory userAddress = new address[](count);
       uint[] memory balances = new uint[](count);

       for(uint i = 0; i < count; i++){
           userAddress[i] = sellers[i].userAddress;
           balances[i] = sellers[i].balance;
       }
       return (userAddress, balances);
   }

  // Fallback: reverts if Celo is sent to this smart-contract by mistake
  fallback () external {
    revert();
  }
}
