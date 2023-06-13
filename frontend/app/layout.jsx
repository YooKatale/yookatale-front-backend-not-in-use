import Header from "@components/Header";
import Footer from "@components/Footer";
import { Providers } from "./providers";
import "@styles/globals.css";

export const metadata = {
  title: "tatli agri store",
  description: "Fresh Food Products Supplier in Kampala and surrounding areas",
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
