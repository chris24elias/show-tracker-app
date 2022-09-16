import React from "react";
import { extendTheme, Factory, IBoxProps, View, Box } from "native-base";

export const Colors = {
  // Add new color
  primary: {
    300: "#898ed5",
    400: "#7b80d0",
    500: "#6c72cb",
  },
  secondary: {
    500: "#cb69c1",
  },

  mainBg: {
    300: "#45464c",
    400: "#2e2f35",
    500: "#17181f",
  },
  white: "#eeedf0",
};

export default extendTheme({
  colors: Colors,
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
  components: {},
});

// export const Page = Factory(View, {
//   baseStyle: {
//     bg: "mainBg.500",
//     flex: 1,
//   },
// });

export const Page = (props: IBoxProps) => {
  return <Box flex={1} bg="mainBg.500" {...props} />;
};
