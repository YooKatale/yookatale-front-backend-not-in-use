import Header from "@components/Header";
import Footer from "@components/Footer";
import { Providers } from "./providers";
import "@styles/globals.css";
import Head from "next/head";
import { Images } from "@constants/constants";
// import store from "@store";
// import { Provider } from "react-redux";

export const metadata = {
  title: "yookatale",
  description: "Fresh Food Products Supplier in Kampala and surrounding areas",
  icons: {
    icon: Images.logo.src,
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
