import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import { Global } from '@emotion/react';
import { Fonts } from '../../styles/font-face';

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Global styles={Fonts} />
      <ColorModeProvider
        options={{
          initialColorMode: 'dark',
          useSystemColorMode: false
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
