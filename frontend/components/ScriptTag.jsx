import Script from "next/script";
import React from "react";

const ScriptTag = () => {
  return (
    <div>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-0DY63F5P0Q" />
      <Script id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];

          const gtag = () => {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());

          gtag('config', 'G-0DY63F5P0Q');`}
      </Script>
    </div>
  );
};

export default ScriptTag;
