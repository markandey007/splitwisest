import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import theme from "../utils/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Toaster />
    </ChakraProvider>
  );
}
