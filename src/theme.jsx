// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Montserrat', sans-serif`, // Voor headings zoals <Heading />
    body: `'Roboto', sans-serif`, // Voor de rest van de body text
  },
});

export default theme;
