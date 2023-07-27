"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "@store";
import Script from "next/script";

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider toastOptions={{ defaultOptions: { position: "bottom" } }}>
        <Provider store={store}>{children}</Provider>
      </ChakraProvider>
    </CacheProvider>
  );
}
