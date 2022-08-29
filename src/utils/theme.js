import { extendTheme } from "@chakra-ui/react";

const colors = {
  danger: {
    600: "#FA6B37",
    800: "#F0531A",
  },
  brand: {
    600: "#5BC5A7",
    800: "#43BF9C",
  },
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ colors, config });

export default theme;
