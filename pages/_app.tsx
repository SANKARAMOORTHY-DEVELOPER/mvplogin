import { ChakraProvider } from '@chakra-ui/react';

import { HeaderBody } from '@components/Header/HeaderBody';
import { FooterBody } from '@components/Footer/FooterBody';
import { AppProvider } from '@components/AppContext';
import {
  ContractKitProvider,
  Alfajores,
  NetworkNames,
} from "@celo-tools/use-contractkit";

import customTheme from '@styles/theme';
import '@styles/styles.css';

function MyApp({ Component, pageProps }) {
  return (
    <ContractKitProvider
      networks={[Alfajores]}
      network={{
        name: NetworkNames.Alfajores,
        rpcUrl: "https://alfajores-forno.celo-testnet.org",
        graphQl: "https://alfajores-blockscout.celo-testnet.org/graphiql",
        explorer: "https://alfajores-blockscout.celo-testnet.org",
        chainId: 44787,
      }}
      dapp={{
        name: "CeloPunk Auction",
        description: "CeloPunk Auction",
        url: "https://example.com",
        icon: "1"
      }}
    >
    <ChakraProvider theme={customTheme} resetCSS>
      <AppProvider>
        <HeaderBody />
        <Component {...pageProps} />
        <FooterBody />
      </AppProvider>
    </ChakraProvider>
    </ContractKitProvider>
  );
}

export default MyApp;
