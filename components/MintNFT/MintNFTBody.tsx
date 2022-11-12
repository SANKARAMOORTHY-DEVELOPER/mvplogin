import { useState, useRef, useContext } from 'react';
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  VStack,
  Textarea,
  Select,
  Image,
  Center,
  Button,
  useToast,
} from '@chakra-ui/react';
import { AiFillPicture } from 'react-icons/ai';
import { useRouter } from 'next/router';

import AppContext from '@components/AppContext';
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export const MintNFTBody = () => {
  const router = useRouter();
  const { account, safeMint } = useContext(AppContext);
  const [cost, setCost] = useState(0);

  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [metaData, setMetaData] = useState({
    name: '',
    title: '',
    category: '',
    description: '',
    image: '',
    file: '',
  });
  const today = new Date();

  const handleInputChange = (field, value) => {
    const newMetaData = { ...metaData };
    newMetaData[field] = value;
    setMetaData(newMetaData);
  };

  const inputFileRef = useRef(null);

  const [previewImage, setPreviewImage] = useState('');

  const onCreate = async () => {
    if (!metaData.name || !metaData.file) {
      toast({
        status: 'error',
        description: 'Please fill in all the required fields.',
      });
      return;
    }
    setIsLoading(true);
    const fileAdded = await ipfs.add(metaData.file);

    if (!fileAdded) {
      console.error('Something went wrong when updloading the file');
      return;
  }

    const metadata = {
        title: 'Asset Metadata',
        type: 'object',
        properties: {
            name: metaData.name,
            description: metaData.description,
            image: fileAdded.path,
            category: metaData.category,
            dateCreated: today,
        },
    };

    const metadataAdded = await ipfs.add(JSON.stringify(metadata));
    if (!metadataAdded) {
        console.error('Something went wrong when updloading the file');
        return;
    }
    // IPFS url for uploaded metadata
    const url = `https://ipfs.infura.io/ipfs/${metadataAdded.path}`;
    const txn = await safeMint(url);
    console.log(txn);
    setIsLoading(false);
    setTimeout(() => {
      router.push('/assets');
    }, 1000);
  };

  return (
    <Flex justifyContent='center' width='100vw'>
      <VStack alignItems='flex-start' spacing='8' my='16'>
        <Heading>Mint an NFT</Heading>
        <FormControl isRequired>
          <FormLabel htmlFor='image'>Upload Image</FormLabel>
          <Flex
            border={previewImage ? 'none' : 'dotted'}
            borderColor='gray.300'
            width='600px'
            height='400px'
            onClick={() => inputFileRef.current.click()}
            cursor='pointer'
            _hover={{
              bgColor: 'gray.100',
            }}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                width='600px'
                height='400px'
                objectPosition='center'
                objectFit='contain'
                borderRadius='lg'
                alt='Banner image'
              />
            ) : (
              <Center flex={1}>
                <AiFillPicture fontSize='60px' color='gray' />
              </Center>
            )}
            <input
              id='image'
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              ref={inputFileRef}
              onChange={(e) => {
                const selectedImage = e.target.files[0];
                if (selectedImage) {
                  handleInputChange('file', selectedImage);
                  setPreviewImage(URL.createObjectURL(selectedImage));
                  setFile(selectedImage);
                }
              }}
            />
          </Flex>
          <FormHelperText>
            This image will be used for your NFT assets. You can offer, 
            set price, tracking creator/owner from NFT.
            Square dimensions recommend. (400x400, 768x768, 1000x1000)
          </FormHelperText>
          <FormHelperText>
            File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG,
            GLB, GLTF. Max size: 100 MB
          </FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor='name'>Title</FormLabel>
          <Input
            id='name'
            type='text'
            placeholder='e.g. Celo Punk'
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <FormHelperText>
            e.g. Celo Punk
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='description'>Description</FormLabel>
          <Textarea
            id='description'
            placeholder='Provide a detailed description of your NFT'
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
          <FormHelperText>
            The description some good description about your NFT assets
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='category'>Category</FormLabel>
          <Select
            placeholder='Select category'
            onChange={(e) => handleInputChange('category', e.target.value)}
          >
            <option value='art'>Art</option>
            <option value='collectibles'>Collectibles</option>
            <option value='music'>Music</option>
            <option value='photography'>Photography</option>
            <option value='sports'>Sports</option>
            <option value='trading cards'>Trading Cards</option>
            <option value='utility'>Utility</option>
          </Select>
          <FormHelperText>
            Adding a category will help make your item discoverable on CeloPunk Auction.
          </FormHelperText>
        </FormControl>
        <Button
          variant='solid'
          size='lg'
          onClick={onCreate}
          isLoading={isLoading}
          colorScheme='messenger'
        >
          Create
        </Button>
      </VStack>
    </Flex>
  );
};
