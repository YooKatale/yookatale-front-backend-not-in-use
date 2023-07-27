import Header from "@components/Header";
import Footer from "@components/Footer";
import { Providers } from "./providers";
import "@styles/globals.css";
import Head from "next/head";
import { Images } from "@constants/constants";
import CookiePolicy from "@components/CookiePolicy";
import ScriptTag from "@components/ScriptTag";

// import store from "@store";
// import { Provider } from "react-redux";

export const metadata = {
  title: "yookatale",
  description:
    "Digital Mobile Food Market | Food insights, Health Lifestyle & industry News | Promotions | Discount coupons & Offers. Reliable, convenient home food bank with YooCard. Publishing weekly",
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
            <CookiePolicy />
          </Providers>
          <ScriptTag />
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
