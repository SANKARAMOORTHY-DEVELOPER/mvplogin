import React, { useState, createContext, useEffect, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";

import {
  NFTCollectionAddress,
  NFTMarketplaceAddress,
} from '../config/contractAddresses';
import NFTCollection from '@abi/NFTCollection.json';
import NFTMarketplace from '@abi/NFTMarketplace.json';
import { useContractKit } from "@celo-tools/use-contractkit";

const AppContext = createContext(null);

export const AppProvider = (props) => {
  const {address, destroy, connect, getConnectedKit} = useContractKit();

  const [account, setAccount] = useState('');
  const [ nftCollectionContract, setNftCollectionContract] = useState(null);
  const [ nftMarketplaceContract, setNftMarketplaceContract] = useState(null);

  const getContract = useCallback(async (a, b) => {
    const kit = await getConnectedKit();

    setNftCollectionContract(new kit.web3.eth.Contract(a, NFTCollectionAddress));
    setNftMarketplaceContract(new kit.web3.eth.Contract(b, NFTMarketplaceAddress));
  }, [getConnectedKit, NFTMarketplaceAddress, NFTCollectionAddress]);

  useEffect(() => {
    if (address) getContract(NFTCollection.abi, NFTMarketplace.abi);
  }, [address, getContract]);

  useEffect(() => {
    if (address) setAccount(address)
  }, [account])

  const functionsToExport = {
    connectWallet: () => {},
    disconnectWallet: () => {},
    totalBalance: () => {},
    totalSupplyNFT: () => {},
    getOwnerNFT: () => {},
    getTrack: (tokenId) => {},
    loadOfferAvailable: () => {},
    makeOffer: (tokenId, enteredPrice) => {}, 
    cancelOffer: (offerId) => {},
    fillOffer: (offerId, price) => {},
    marketplaceFindIndex: (tokenId) => {},
    userFund: () => {},
    claimFunds: () => {},
    safeMint: (uri: any) => {},
  };

  const toast = useToast();

  functionsToExport.connectWallet = async () => {
    try {
      await connect();
      setAccount(address)
      toast({
        title: 'Success',
        description: 'Wallet connected succesfully.',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Please try connecting your wallet again.',
        status: 'error',
      });
      console.log(error);
    }
  };

  functionsToExport.disconnectWallet = async () => {
    await destroy();
    location.reload();
  }

  functionsToExport.safeMint = async (uri) => {
      try {
        // mint the NFT and save the IPFS url to the blockchain
        return await nftCollectionContract.methods
            .safeMint(uri)
            .send({from: account})
            .on('transactionHash', (hash) => {
            })
            .on('error', (e) => {
              toast({
                title: 'Error',
                description: e.toString(),
                status: 'error',
              });
          })
          .on('receipt', () => {
            toast({
              title: 'Success',
              description: 'Mint NFT success.',
              status: 'success',
            });
          });
    } catch (error) {
        toast({
          title: 'Error',
          description: 'Error mint NFT: ' + error,
          status: 'error',
        });
        console.log(error);
    }
  };

  functionsToExport.totalSupplyNFT = async() => {
    return await nftCollectionContract.methods.totalSupply().call();
  }

  functionsToExport.totalBalance = async() => {
    const kit = await getConnectedKit();
    return await kit.getTotalBalance(address)
  }

  const fetchNftMeta = async (ipfsUrl) => {
    try {
        if (!ipfsUrl) return null;
        const meta = await axios.get(ipfsUrl);
        return meta;
    } catch (e) {
        console.log({e});
    }
  };

  functionsToExport.userFund = async() => {
    return await nftMarketplaceContract.methods.userFunds(address).call();
  }

  functionsToExport.claimFunds = async() => {
    await nftMarketplaceContract.methods.claimFunds()
            .send({ from: address })
            .on('transactionHash', (hash) => {
            })
            .on('error', (error) => {
              toast({
                title: 'Error',
                description: error.toString(),
                status: 'error',
              });
            })
            .on('receipt', () => {
              toast({
                title: 'Success',
                description: 'Claim fund success.',
                status: 'success',
              });
            });
  }

  functionsToExport.getTrack = async(tokenId) => {
    return await nftCollectionContract.methods.getTrack(tokenId).call();
  }

  functionsToExport.loadOfferAvailable = async() => {
    const offerCount = await nftMarketplaceContract.methods.offerCount().call();
    let offers = [];
      for (let i = 0; i < offerCount; i++) {
          const offer = await nftMarketplaceContract.methods.offers(i + 1).call();
          offers.push(offer);
      }
    offers = await offers
        .map((offer) => {
            offer.offerId = parseInt(offer.offerId);
            offer.id = parseInt(offer.id);
            offer.price = parseInt(offer.price);
            return offer;
        })
        .filter((offer) => offer.fulfilled === false && offer.cancelled === false);
    return offers;
  }

  functionsToExport.makeOffer = async(tokenId, enteredPrice) => {
    await nftCollectionContract.methods
      .approve(NFTMarketplaceAddress,tokenId)
      .send({ from: address })
      .on('transactionHash', (hash) => {
      })
      .on('receipt', async(receipt) => {
        await nftMarketplaceContract.methods
              .makeOffer(tokenId, enteredPrice)
              .send({ from: address })
              .on('error', (error) => {
                toast({
                  title: 'Error',
                  description: error.toString(),
                  status: 'error',
                });
              })
              .on('receipt', () => {
                toast({
                  title: 'Success',
                  description: 'Make offer success.',
                  status: 'success',
                });
              });
      });
  }
  // buy from explore NFT
  functionsToExport.fillOffer = async(offerId, price) => {
    await nftMarketplaceContract.methods
        .fillOffer(offerId)
        .send({ from: address, value: price })
        .on('transactionHash', (hash) => {
        })
        .on('error', (error) => {
          toast({
            title: 'Error',
            description: error.toString(),
            status: 'error',
          });
        })
        .on('receipt', () => {
          toast({
            title: 'Success',
            description: 'Buy NFT success.',
            status: 'success',
          });
        });
  }

  functionsToExport.cancelOffer = async(offerId) => {
    await nftMarketplaceContract.methods
          .cancelOffer(offerId)
          .send({ from: address })
          .on('transactionHash', (hash) => {
          })
          .on('error', (error) => {
            toast({
              title: 'Error',
              description: error.toString(),
              status: 'error',
            })
           })
           .on('receipt', () => {
            toast({
              title: 'Success',
              description: 'Cancel offer success.',
              status: 'success',
            });
          });
  }

  // get all with owner name
  functionsToExport.getOwnerNFT = async() => {
    try {
      var nftsLength = await nftCollectionContract.methods.totalSupply().call();
      const nfts = [];
      let loadOfferAvailable:any = await functionsToExport.loadOfferAvailable();
      for (let i = 0; i < Number(nftsLength); i++) {
        const nft = await new Promise(async (resolve) => {
          const res = await nftCollectionContract.methods.tokenURI(i).call();
          const owner = await nftCollectionContract.methods.ownerOf(i).call();
          const offer = await loadOfferAvailable.filter((offer) => offer.id === i)
          const meta = await fetchNftMeta(res);
          resolve({
            index: i,
            owner,
            offer: offer[0],
            name: meta.data.properties.name,
            image: meta.data.properties.image,
            description: meta.data.properties.description,
            category: meta.data.properties.category,
            dateCreated: meta.data.properties.dateCreated
          });
        });
        await nfts.push(nft);
      }
      return Promise.all(nfts);
    } catch (e) {
      toast({
        title: 'Error',
        description: e.toString(),
        status: 'error',
      });
      console.log({e});
    }
  }



  return (
    <AppContext.Provider value={{ account, NFTMarketplaceAddress,  ...functionsToExport }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
