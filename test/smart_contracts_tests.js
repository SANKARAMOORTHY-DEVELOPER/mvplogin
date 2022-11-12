const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

describe("NFTCollection", function () {
  this.timeout(50000);

  let NFT;
  let owner;
  let acc1;
  let acc2;

  this.beforeEach(async function () {
    // This is executed before each test
    // Deploying the smart contract
    const NFT = await ethers.getContractFactory("NFTCollection");
    [owner, acc1, acc2] = await ethers.getSigners();

    nft = await NFT.deploy();
  });

  it("Should set the right owner", async function () {
    expect(await nft.owner()).to.equal(owner.address);
  });

  it("Should mint one NFT", async function () {
    expect(await nft.balanceOf(acc1.address)).to.equal(0);

    const tokenURI = "https://example.com/1";
    const tx = await nft.connect(acc1).safeMint(tokenURI);
    await tx.wait();

    expect(await nft.balanceOf(acc1.address)).to.equal(1);
  });

  it("Should set the correct tokenURI", async function () {
    const tokenURI_1 = "https://example.com/1";
    const tokenURI_2 = "https://example.com/2";

    const tx1 = await nft.connect(owner).safeMint(tokenURI_1);
    await tx1.wait();
    const tx2 = await nft.connect(acc2).safeMint(tokenURI_2);
    await tx2.wait();

    expect(await nft.tokenURI(0)).to.equal(tokenURI_1);
    expect(await nft.tokenURI(1)).to.equal(tokenURI_2);
  });

  it("Should return the right addresses in a track", async function () {
    const tokenURI_1 = "https://example.com/1";
    const tokenURI_2 = "https://example.com/2";

    const tx1 = await nft.connect(acc1).safeMint(tokenURI_1);
    await tx1.wait();
    const tx2 = await nft.connect(acc2).safeMint(tokenURI_2);
    await tx2.wait();

    expect((await nft.getTrack(0)).length).to.equal(1);

  });
});

describe("NFTMarketplace", function () {
  this.timeout(50000);
  let MarketPlace
  let owner;
  let acc1;
  let acc2;
  let provider

  this.beforeEach(async function () {
    // This is executed before each test
    // Deploying the smart contract
    const NFT = await ethers.getContractFactory("NFTCollection");

    nft = await NFT.deploy();
    

    MarketPlace = await ethers.getContractFactory("NFTMarketplace");
    [owner, acc1, acc2] = await ethers.getSigners();

    provider = waffle.provider;    

    market = await MarketPlace.deploy(nft.address);

  });

  it("Offer Created Correctly", async function () {
    // mint an nft
    const tx1 = await nft.connect(acc1).safeMint("URI");
    await tx1.wait();
    
    // approve the smart contract to transfer the nft 
    const id = 0
    const price = 50
    nft.connect(acc1).approve(market.address, id)

    // test that an offer was created
    const tx2 = await market.connect(acc1).makeOffer(id, price)
    await tx2.wait();

    expect(await market.offerCount()).equal(1)
    
    
  });

  it("Offer Reverts if a non nft owner tries to make an offer", async function () {
    // mint an nft
    const tx1 = await nft.connect(acc1).safeMint("URI");
    await tx1.wait();
    
    // approve the smart contract to transfer the nft 
    const id = 0
    const price = 50
    nft.connect(acc2).approve(market.address, id)

    // test you cannot create an offer if you do not own the nft
    expect(market.connect(acc2).makeOffer(id, price)).to.be.revertedWith('you do not own the nft you are trying to offer')
    
  });

  it("Offer is fulfilled correctly", async function () {
    const tx1 = await nft.connect(acc1).safeMint("URI");
    await tx1.wait();

    // console.log((await nft.ownerOf(0)))
    
    // approve the smart contract to transfer the nft 
    const id = 0
    const price = 50
    nft.connect(acc1).approve(market.address, id)
    // console.log(acc1)
    const tx2 = await market.connect(acc1).makeOffer(id, price)
    
    await tx2.wait();

    const tx3 = await market.connect(acc2).fillOffer(id + 1, {
      value: price
    })
    await tx3.wait();

    const offer = await market.offers(id + 1)
    expect(offer["fulfilled"]).equal(true)
    expect(await nft.ownerOf(id)).equals(acc2.address)
  })

  it("Offer is cancelled successfully", async function () {
    const tx1 = await nft.connect(acc1).safeMint("URI");
    await tx1.wait();

    
    // approve the smart contract to transfer the nft 
    const id = 0
    const price = 50
    nft.connect(acc1).approve(market.address, id)

    const tx2 = await market.connect(acc1).makeOffer(id, price)
    await tx2.wait();

    const tx3 = await market.connect(acc1).cancelOffer(id + 1)
    await tx3.wait();

    const offer = await market.offers(id + 1)
    expect(offer["cancelled"]).equal(true)
   });

   it("Claim funds works as expected", async function(){
    const tx1 = await nft.connect(acc1).safeMint("URI");
    await tx1.wait();

    
    // approve the smart contract to transfer the nft 
    const id = 0
    const price = 1000000
    nft.connect(acc1).approve(market.address, id)

    const tx2 = await market.connect(acc1).makeOffer(id, price)
    await tx2.wait();

    const tx3 = await market.connect(acc2).fillOffer(id + 1, {
      value: price
    })
    await tx3.wait();

    expect(await market.connect(acc1).claimFunds())
    .to.changeEtherBalance(acc1, price);
   })

});