// File: OptimizePage.js
// This file contains the OptimizePage component code.

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import NextCache from "next-cache";
import { VercelEdge } from "@vercel/edge";
import { bundleLoader } from "next-transpile-modules";
import imageMinimizer from "image-minimizer";
import ReactLazyLoad from "react-lazy-load";

const cache = new NextCache();

export default cache(
  VercelEdge(
    bundleLoader(function OptimizePage() {
      // Optimize images on the page.
      const optimizedImages = await optimizeImages(images);

      return (
        <ChakraProvider>
          <ThemeProvider>
            {/* ... */}
          </ThemeProvider>
        </ChakraProvider>
      );
    })
  )
);

async function optimizeImages(images) {
  const promises = images.map(async (image) => {
    const optimizedImage = await imageMinimizer.optimize(image);
    return optimizedImage;
  });

  const optimizedImages = await Promise.all(promises);
  return optimizedImages;
}

