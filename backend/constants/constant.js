export const htmlEmails = {
  orderTemplate: (params) => {
    return `
    <!DOCTYPE html PUBLIC “-//W3C//DTD XHTML 1.0 Transitional//EN” “https://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd”>
    <html xmlns=“https://www.w3.org/1999/xhtml”>
    <head>
    <title>Test Email Sample</title>
    <meta http–equiv=“Content-Type” content=“text/html; charset=UTF-8” />
    <meta http–equiv=“X-UA-Compatible” content=“IE=edge” />
    <meta name=“viewport” content=“width=device-width, initial-scale=1.0 “ />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
          rel="stylesheet"
        />
      
          <style type="text/css">
          * {
            padding: 0;
            margin: 0;
            font-family: "Cabin", sans-serif;
          }
          a {
            text-decoration: none;
          }
          .light-color {
            color: #fff;
          }
          body {
            background: #cecece;
          }
          main {
            display: flex;
          }
          main .content {
            margin: auto;
            width: 65%;
            padding: 1rem 0;
          }
          main .content header {
            height: 130px;
            padding: 2rem 0;
            background: #222020;
          }
          main .content header div.center {
            display: flex;
            justify-content: center;
            height: 100%;
          }
      
          main .content header .center .center-image {
            width: 70%;
            height: 100%;
            margin: auto;
            text-align: center;
          }
      
          main .content header .center .center-image img {
            height: 100%;
          }
      
          main .content .main {
            background: #fff;
            padding: 2rem;
          }
      
          .p-2-0 {
            padding: 2rem 0;
          }
      
          .p-1-0 {
            padding: 1rem 0;
          }
      
          .p-0-5 {
            padding: 0.5rem 0;
          }
      
          .f-size-1-5 {
            font-size: 1.5rem;
          }
          .f-size-2 {
            font-size: 2rem;
          }
      
          .f-size-1 {
            font-size: 1rem;
          }
      
          .center-align {
            text-align: center;
          }
      
          .grid {
            display: grid !important;
            grid-gap: "1rem";
          }
      
          .grid.cl-3 {
            grid-template-columns: "repeat(3, 1fr)" !important;
          }
      
          .flx {
            display: flex;
          }
      
          .jc-btn {
            justify-content: space-between;
          }
      
          .m-0-1 {
            margin: 0 1rem;
          }
      
          .p-0-2 {
            padding: 0 2rem;
          }
      
          .p-0-1 {
            padding: 0 1rem;
          }
      
          .w-50 {
            width: 50%;
          }
      
          footer {
            background: #525050;
            padding: 1rem;
          }
      
          .jc-center {
            justify-content: center;
          }
      
          @media screen and (max-width: 600px) {
            .f-size-2 {
              font-size: 1.5rem;
            }
            .f-size-1-5 {
              font-size: 1rem;
            }
            main .content {
              margin: auto;
              width: 80%;
              padding: 1rem 0;
            }
            main .content header {
              height: 100px;
              padding: 1rem 0;
            }
      
            main .content header .center .center-image img {
              height: auto;
              width: 50%;
            }
      
            .m-column {
              flex-direction: column;
            }
      
            main .content .main {
              padding: 2rem 0;
            }
      
            .w-50 {
              width: 100%;
            }
          }
        </style>
        </head>
        
        <body>
          <main>
            <div class="content">
              <header>
                <div class="center">
                  <div class="center-image">
                    <img src="https://yookatale-server-app.onrender.com/logo1.png" alt="logo" srcset="" />
                  </div>
                </div>
              </header>
              <div class="main">
                <div class="flx center-align jc-center">
                  <img
                    src="https://www.pngitem.com/pimgs/b/508-5084634_check-icon-png-transparent.png"
                    alt=""
                    srcset=""
                    width="100"
                  />
                </div>
                <div class="p-1-0">
                  <p class="f-size-2 center-align">Order has been received</p>
                </div>
                <div class="p-1-0">
                    <h2>Order summary</h2>
                    <div class="p-1-0">
                      <div class="flx m-column">
                        <div class="w-50">
                          <div class="p-0-5">
                            <div class="flx">
                              <h4>Order ID:</h4>
                              <p class="m-0-1">${params?.orderID}</p>
                            </div>
                          </div>
                          <div class="p-0-5">
                            <div class="flx">
                              <h4>Order Item:</h4>
                              <p class="m-0-1">${params?.orderFor}</p>
                            </div>
                          </div>
                          <div class="p-0-5">
                            <div class="flx">
                              <h4>Order Total:</h4>
                              <p class="m-0-1">UGX ${params?.orderTotal}</p>
                            </div>
                          </div>
                        </div>
                        <div class="w-50">
                          <div class="p-0-5">
                            <h4>Delivery Address</h4>
                            ${
                              params?.deliveryAddress?.address1
                                ? `
                            <div class="flx p-0-5">
                                <h4>Address 1:</h4>
                                <p class="m-0-1">${params?.deliveryAddress?.address1}</p>
                            </div>
                            `
                                : ``
                            }

                            ${
                              params?.deliveryAddress?.address2
                                ? `
                            <div class="flx p-0-5">
                                <h4>Address 2:</h4>
                                <p class="m-0-1">${params?.deliveryAddress?.address2}</p>
                            </div>
                            `
                                : ``
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              <footer>
                <div class="p-0-5">
                  <h4 class="center-align">
                    <a href="https://yookatale.com" class="light-color">yookatale</a>
                  </h4>
                </div>
                <div class="p-0-5">
                  <div class="p-0-1">
                    <p class="center-align light-color">
                      <a href="https://yookatale.com/dignin" class="light-color"
                        >Log In to your account to track your order</a
                      >
                    </p>
                  </div>
                </div>
                <div class="p-1-0">
                  <div class="flx jc-center">
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/company/yookatale/"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png?filename=linkedin_3536505.png&fd=1"
                        alt=""
                        srcset=""
                        width="30"
                      />
                    </a>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        </body>
      </html>
      
        `;
  },
  welcomeTemplate: (name) => {
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
          rel="stylesheet"
        />
        <style>
          * {
            padding: 0;
            margin: 0;
            font-family: "Cabin", sans-serif;
          }
          a {
            text-decoration: none;
          }
          .light-color {
            color: #fff;
          }
          body {
            background: #cecece;
          }
          main {
            display: flex;
          }
          main .content {
            margin: auto;
            width: 65%;
            padding: 1rem 0;
          }
          main .content header {
            height: 130px;
            padding: 2rem 0;
            background: #222020;
          }
          main .content header div.center {
            display: flex;
            justify-content: center;
            height: 100%;
          }
    
          main .content header .center .center-image {
            width: 70%;
            height: 100%;
            margin: auto;
            text-align: center;
          }
    
          main .content header .center .center-image img {
            height: 100%;
          }
    
          main .content .main {
            background: #fff;
            padding: 2rem;
          }
    
          .p-2-0 {
            padding: 2rem 0;
          }
    
          .p-1-0 {
            padding: 1rem 0;
          }
    
          .p-0-5 {
            padding: 0.5rem 0;
          }
    
          .f-size-1-5 {
            font-size: 1.5rem;
          }
          .f-size-2 {
            font-size: 2rem;
          }
    
          .f-size-1 {
            font-size: 1rem;
          }
    
          .center-align {
            text-align: center;
          }
    
          .grid {
            display: grid !important;
            grid-gap: "1rem";
          }
    
          .grid.cl-3 {
            grid-template-columns: "repeat(3, 1fr)" !important;
          }
    
          .flx {
            display: flex;
          }
    
          .jc-btn {
            justify-content: space-between;
          }
    
          .m-0-1 {
            margin: 0 1rem;
          }
    
          .p-0-2 {
            padding: 0 2rem;
          }
    
          .p-0-1 {
            padding: 0 1rem;
          }
    
          .w-50 {
            width: 50%;
          }
    
          footer {
            background: #525050;
            padding: 1rem;
          }
    
          .jc-center {
            justify-content: center;
          }
    
          @media screen and (max-width: 500px) {
            .f-size-2 {
              font-size: 1.5rem;
            }
            .f-size-1-5 {
              font-size: 1rem;
            }
            main .content {
              margin: auto;
              width: 80%;
              padding: 1rem 0;
            }
            main .content header {
              height: 100px;
              padding: 1rem 0;
            }
    
            main .content header .center .center-image img {
              height: auto;
              width: 50%;
            }
    
            .m-column {
              flex-direction: column;
            }
    
            main .content .main {
              padding: 2rem 0;
            }
    
            .w-50 {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <main>
          <div class="content">
            <header>
              <div class="center">
                <div class="center-image">
                <img src="https://yookatale-server-app.onrender.com/logo1.png" alt="logo" srcset="" />
                </div>
              </div>
            </header>
            <div class="main">
              <div class="p-2-0">
                <div class="p-1-0">
                  <p class="f-size-2 center-align">Welcome to YooKatale, ${name}.</p>
                </div>
                <div class="p-1-0">
                  <p class="center-align f-size-1-5">
                    Welcome to your Reliable market partner that Conveniently
                    delivers 24/7 with Quality assured.
                  </p>
                </div>
              </div>
            </div>
            <footer>
              <div class="p-0-5">
                <h4 class="center-align">
                  <a href="https://yookatale.com" class="light-color">yookatale</a>
                </h4>
              </div>
              <div class="p-0-5">
                <div class="p-0-1">
                  <p class="center-align f-size-1 light-color">
                    &copy; Copyright yokatale. All rights reserved
                  </p>
                </div>
              </div>
              <div class="p-1-0">
                <div class="flx jc-center">
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/company/yookatale/"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png?filename=linkedin_3536505.png&fd=1"
                      alt=""
                      srcset=""
                      width="30"
                    />
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </body>
    </html>
    
    `;
  },
  messageTemplate: (param) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
      rel="stylesheet"
    />
  </head>
  <style>
    * {
      padding: 0;
      margin: 0;
      font-family: "Cabin", sans-serif;
    }
    a {
      text-decoration: none;
      color: #000;
    }
  </style>
  <body>
    <main style="max-width: 100%; padding: 2rem 3rem; background: #d9f0f1">
      <div style="border-radius: 1rem; background: #fff">
        <header style="padding: 2rem 0; border-bottom: 1.7px solid #e6e9e9">
          <div>
            <h3 style="text-align: center; font-size: 2rem">New Message</h3>
            <p style="text-align: center; font-size: 1.2rem; margin: 0.5rem 0">
              ${param?.email}
            </p>
          </div>
        </header>
        <div style="padding: 3rem 0">
          <div style="display: flex; justify-content: center">
            <div style="margin: auto; width: 70%">
              <div style="padding: 1rem 0">
                <h3 style="font-size: 1.2rem">Message From: ${param?.name}</h3>
              </div>
              <div style="padding: 1rem 0">
                <p style="font-size: 1rem !important">
                ${param?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
        <footer
          style="
            align-items: center;
            border-top: 1.7px solid #d9f0f1;
            padding: 2rem 3rem;
          "
        >
          <div style="padding: 0.5rem 0">
            <h4 style="text-align: center">
              <a href="https://yookatale.com" style="font-size: 1.2rem"
                >yookatale</a
              >
            </h4>
          </div>
          <div style="padding: 0.5rem 0">
            <div>
              <p style="text-align: center">
                &copy; Copyright yokatale. All rights reserved
              </p>
            </div>
          </div>
          <div style="padding: 1rem 0">
            <div style="display: flex; justify-content: center">
              <a
                target="_blank"
                href="https://www.linkedin.com/company/yookatale/"
                style="margin: 0 0.5rem"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png?filename=linkedin_3536505.png&fd=1"
                  alt=""
                  srcset=""
                  width="30"
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>

  `,
  loginDetailsTemplate: ({ email, firstname, username, password }) => `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cabin&display=swap"
      rel="stylesheet"
    />
  </head>
  <style>
    * {
      padding: 0;
      margin: 0;
      font-family: "Cabin", sans-serif;
    }
    a {
      text-decoration: none;
      color: #000;
    }

    @media screen and (max-width: 500px) {
      .w-full {
        width: 90% !important;
      }
    }
  </style>
  <body>
    <main style="max-width: 100%; padding: 2rem 3rem; background: #d9f0f1">
      <div style="border-radius: 1rem; background: #fff">
        <header style="padding: 2rem 0; border-bottom: 1.7px solid #e6e9e9">
          <div>
            <h3 style="text-align: center; font-size: 2rem">
              Account Creation
            </h3>
            <p style="text-align: center; font-size: 1.2rem; margin: 0.5rem 0">
              ${email}
            </p>
          </div>
        </header>
        <div style="padding: 3rem 0">
          <div style="display: flex; justify-content: center">
            <div style="margin: auto; width: 65%" class="w-full">
              <div style="padding: 1rem 0">
                <h3 style="font-size: 1.5rem; text-align: center">
                  Welcome ${firstname}, your account has been created successfully
                </h3>
              </div>
              <div style="padding: 1rem 0">
                <p
                  style="
                    font-size: 1.2rem;
                    text-align: center;
                    margin: 0.5rem 0;
                  "
                >
                  Username: ${username}
                </p>
                <p
                  style="
                    font-size: 1.2rem;
                    text-align: center;
                    margin: 0.5rem 0;
                  "
                >
                  Password: ${password}
                </p>
              </div>
              <div
                style="padding: 1rem 0; display: flex; justify-content: center"
              >
                <div>
                  <button
                    style="
                      outline: none;
                      border: none;
                      background: #135f11;
                      border-radius: 0.3rem;
                      padding: 0.4rem 1rem;
                      font-size: 1.2rem;
                      cursor: pointer;
                    "
                  >
                    <a
                      href="https://admin.yookatale.com/signin"
                      style="color: #fff"
                      >Login</a
                    >
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer
          style="
            align-items: center;
            border-top: 1.7px solid #d9f0f1;
            padding: 2rem 3rem;
          "
        >
          <div style="padding: 0.5rem 0">
            <h4 style="text-align: center">
              <a href="https://yookatale.com" style="font-size: 1.2rem"
                >yookatale</a
              >
            </h4>
          </div>
          <div style="padding: 0.5rem 0">
            <div>
              <p style="text-align: center">
                &copy; Copyright yokatale. All rights reserved
              </p>
            </div>
          </div>
          <div style="padding: 1rem 0">
            <div style="display: flex; justify-content: center">
              <a
                target="_blank"
                href="https://www.linkedin.com/company/yookatale/"
                style="margin: 0 0.5rem"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png?filename=linkedin_3536505.png&fd=1"
                  alt=""
                  srcset=""
                  width="30"
                />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  </body>
</html>

  `,
  welcomeTemplate2: () => `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta charset="UTF-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta content="telephone=no" name="format-detection" />
      <title>New message</title>
      <!--[if (mso 16)]>
        <style type="text/css">
          a {
            text-decoration: none;
          }
        </style>
      <![endif]-->
      <!--[if gte mso 9
        ]><style>
          sup {
            font-size: 100% !important;
          }
        </style><!
      [endif]-->
      <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <!--[if !mso]><!-- -->
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel&display=swap"
        rel="stylesheet"
      />
      <!--<![endif]-->
      <style type="text/css">
        .rollover:hover .rollover-first {
          max-height: 0px !important;
          display: none !important;
        }
        .rollover:hover .rollover-second {
          max-height: none !important;
          display: inline-block !important;
        }
        .rollover div {
          font-size: 0px;
        }
        u ~ div img + div > div {
          display: none;
        }
        #outlook a {
          padding: 0;
        }
        span.MsoHyperlink,
        span.MsoHyperlinkFollowed {
          color: inherit;
          mso-style-priority: 99;
        }
        a.es-button {
          mso-style-priority: 100 !important;
          text-decoration: none !important;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
        }
        .es-desk-hidden {
          display: none;
          float: left;
          overflow: hidden;
          width: 0;
          max-height: 0;
          line-height: 0;
          mso-hide: all;
        }
        .es-header-body a:hover {
          color: #1376c8 !important;
        }
        .es-content-body a:hover {
          color: #2cb543 !important;
        }
        .es-footer-body a:hover {
          color: #ffffff !important;
        }
        .es-infoblock a:hover {
          color: #cccccc !important;
        }
        .es-button-border:hover > a.es-button {
          color: #ffffff !important;
        }
        td .es-button-border:hover a.es-button-2877 {
          color: #f1c232 !important;
        }
        @media only screen and (max-width: 600px) {
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p0r {
            padding-right: 0px !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-m-p20b {
            padding-bottom: 20px !important;
          }
          .es-m-p0r {
            padding-right: 0px !important;
          }
          *[class="gmail-fix"] {
            display: none !important;
          }
          p,
          a {
            line-height: 150% !important;
          }
          h1,
          h1 a {
            line-height: 120% !important;
          }
          h2,
          h2 a {
            line-height: 120% !important;
          }
          h3,
          h3 a {
            line-height: 120% !important;
          }
          h4,
          h4 a {
            line-height: 120% !important;
          }
          h5,
          h5 a {
            line-height: 120% !important;
          }
          h6,
          h6 a {
            line-height: 120% !important;
          }
          h1 {
            font-size: 40px !important;
            text-align: center;
            line-height: 120%;
          }
          h2 {
            font-size: 24px !important;
            text-align: center;
            line-height: 120%;
          }
          h3 {
            font-size: 20px !important;
            text-align: center;
            line-height: 120%;
          }
          h4 {
            font-size: 24px !important;
            text-align: left;
          }
          h5 {
            font-size: 20px !important;
            text-align: left;
          }
          h6 {
            font-size: 16px !important;
            text-align: left;
          }
          .es-header-body h1 a,
          .es-content-body h1 a,
          .es-footer-body h1 a {
            font-size: 40px !important;
          }
          .es-header-body h2 a,
          .es-content-body h2 a,
          .es-footer-body h2 a {
            font-size: 24px !important;
          }
          .es-header-body h3 a,
          .es-content-body h3 a,
          .es-footer-body h3 a {
            font-size: 20px !important;
          }
          .es-header-body h4 a,
          .es-content-body h4 a,
          .es-footer-body h4 a {
            font-size: 24px !important;
          }
          .es-header-body h5 a,
          .es-content-body h5 a,
          .es-footer-body h5 a {
            font-size: 20px !important;
          }
          .es-header-body h6 a,
          .es-content-body h6 a,
          .es-footer-body h6 a {
            font-size: 16px !important;
          }
          .es-menu td a {
            font-size: 16px !important;
          }
          .es-header-body p,
          .es-header-body a {
            font-size: 16px !important;
          }
          .es-content-body p,
          .es-content-body a {
            font-size: 16px !important;
          }
          .es-footer-body p,
          .es-footer-body a {
            font-size: 16px !important;
          }
          .es-infoblock p,
          .es-infoblock a {
            font-size: 12px !important;
          }
          .es-m-txt-c,
          .es-m-txt-c h1,
          .es-m-txt-c h2,
          .es-m-txt-c h3,
          .es-m-txt-c h4,
          .es-m-txt-c h5,
          .es-m-txt-c h6 {
            text-align: center !important;
          }
          .es-m-txt-r,
          .es-m-txt-r h1,
          .es-m-txt-r h2,
          .es-m-txt-r h3,
          .es-m-txt-r h4,
          .es-m-txt-r h5,
          .es-m-txt-r h6 {
            text-align: right !important;
          }
          .es-m-txt-j,
          .es-m-txt-j h1,
          .es-m-txt-j h2,
          .es-m-txt-j h3,
          .es-m-txt-j h4,
          .es-m-txt-j h5,
          .es-m-txt-j h6 {
            text-align: justify !important;
          }
          .es-m-txt-l,
          .es-m-txt-l h1,
          .es-m-txt-l h2,
          .es-m-txt-l h3,
          .es-m-txt-l h4,
          .es-m-txt-l h5,
          .es-m-txt-l h6 {
            text-align: left !important;
          }
          .es-m-txt-r img,
          .es-m-txt-c img,
          .es-m-txt-l img {
            display: inline !important;
          }
          .es-m-txt-r .rollover:hover .rollover-second,
          .es-m-txt-c .rollover:hover .rollover-second,
          .es-m-txt-l .rollover:hover .rollover-second {
            display: inline !important;
          }
          .es-m-txt-r .rollover div,
          .es-m-txt-c .rollover div,
          .es-m-txt-l .rollover div {
            line-height: 0 !important;
            font-size: 0 !important;
          }
          .es-spacer {
            display: inline-table;
          }
          a.es-button,
          button.es-button {
            font-size: 20px !important;
          }
          a.es-button,
          button.es-button {
            display: inline-block !important;
          }
          .es-button-border {
            display: inline-block !important;
          }
          .es-m-fw,
          .es-m-fw.es-fw,
          .es-m-fw .es-button {
            display: block !important;
          }
          .es-m-il,
          .es-m-il .es-button,
          .es-social,
          .es-social td,
          .es-menu {
            display: inline-block !important;
          }
          .es-adaptive table,
          .es-left,
          .es-right {
            width: 100% !important;
          }
          .es-content table,
          .es-header table,
          .es-footer table,
          .es-content,
          .es-footer,
          .es-header {
            width: 100% !important;
            max-width: 600px !important;
          }
          .adapt-img {
            width: 100% !important;
            height: auto !important;
          }
          .es-mobile-hidden,
          .es-hidden {
            display: none !important;
          }
          .es-desk-hidden {
            width: auto !important;
            overflow: visible !important;
            float: none !important;
            max-height: inherit !important;
            line-height: inherit !important;
          }
          tr.es-desk-hidden {
            display: table-row !important;
          }
          table.es-desk-hidden {
            display: table !important;
          }
          td.es-desk-menu-hidden {
            display: table-cell !important;
          }
          .es-menu td {
            width: 1% !important;
          }
          table.es-table-not-adapt,
          .esd-block-html table {
            width: auto !important;
          }
          .es-social td {
            padding-bottom: 10px;
          }
          .h-auto {
            height: auto !important;
          }
        }
      </style>
    </head>
    <body style="width: 100%; height: 100%; padding: 0; margin: 0">
      <div class="es-wrapper-color" style="background-color: #161616">
        <!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill
              type="tile"
              src="images/70111619104409447.png"
              color="#161616"
              origin="0.5, 0"
              position="0.5, 0"
            ></v:fill>
          </v:background>
        <![endif]-->
        <table
          class="es-wrapper"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          background="https://xwffyj.stripocdn.email/content/guids/CABINET_f1e2788bcf75cbeedf430e62b520c69f/images/70111619104409447.png"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            padding: 0;
            margin: 0;
            width: 100%;
            height: 100%;
            background-image: url(https://xwffyj.stripocdn.email/content/guids/CABINET_f1e2788bcf75cbeedf430e62b520c69f/images/70111619104409447.png);
            background-repeat: repeat;
            background-position: center top;
            background-color: #161616;
          "
        >
          <tr>
            <td valign="top" style="padding: 0; margin: 0">
              <table
                cellpadding="0"
                cellspacing="0"
                class="es-header"
                align="center"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  width: 100%;
                  table-layout: fixed !important;
                  background-color: transparent;
                  background-repeat: repeat;
                  background-position: center top;
                "
              >
                <tr>
                  <td
                    align="center"
                    bgcolor="#fcfafa"
                    style="padding: 0; margin: 0; background-color: #fcfafa"
                  >
                    <table
                      class="es-header-body"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: transparent;
                        width: 700px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          style="
                            padding: 0;
                            margin: 0;
                            padding-top: 20px;
                            padding-right: 20px;
                            padding-left: 20px;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                class="es-m-p0r"
                                valign="top"
                                align="center"
                                style="padding: 0; margin: 0; width: 660px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 20px;
                                        padding-bottom: 10px;
                                        font-size: 0px;
                                        margin-bottom: -100px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://www.yookatale.com/"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #1376c8;
                                          font-size: 14px;
                                        "
                                        ><img
                                          src="https://yookatale-server-app.onrender.com/images/email/image.png"
                                          alt="Logo"
                                          style="
                                            display: block;
                                            font-size: 14px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                          title="Logo"
                                          height="135"
                                          width="220"
                                      /></a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 10px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 21px;
                                          letter-spacing: 0;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                      >
                                        <strong
                                          style="
                                            color: #333333;
                                            font-size: 26px !important;
                                          "
                                          >Here For You</strong
                                        ><br />
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        margin: 0;
                                        padding-right: 20px;
                                        padding-left: 20px;
                                        padding-bottom: 10px;
                                        padding-top: 10px;
                                        font-size: 0;
                                      "
                                      bgcolor="#185F2D"
                                    >
                                      <table
                                        border="0"
                                        width="100%"
                                        height="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="es-spacer"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          border-collapse: collapse;
                                          border-spacing: 0px;
                                        "
                                      >
                                        <tr>
                                          <td
                                            style="
                                              padding: 0;
                                              margin: 0;
                                              border-bottom: 1px solid #efefef;
                                              background: none;
                                              height: 1px;
                                              width: 100%;
                                              margin: 0;
                                            "
                                          ></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                class="es-m-p0r"
                                valign="top"
                                align="center"
                                style="padding: 0; margin: 0; width: 660px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                ></table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <table
                class="es-content"
                cellspacing="0"
                cellpadding="0"
                align="center"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  width: 100%;
                  table-layout: fixed !important;
                "
              >
                <tr>
                  <td
                    align="center"
                    bgcolor="#fcfafa"
                    style="padding: 0; margin: 0; background-color: #fcfafa"
                  >
                    <table
                      class="es-content-body"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        background-color: transparent;
                        width: 700px;
                      "
                      cellspacing="0"
                      cellpadding="0"
                      align="center"
                    >
                      <tr>
                        <td
                          align="left"
                          style="
                            margin: 0;
                            padding-right: 20px;
                            padding-left: 20px;
                            padding-top: 5px;
                            padding-bottom: 5px;
                          "
                        >
                          <table
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                class="es-m-p0r es-m-p20b"
                                valign="top"
                                align="center"
                                style="padding: 0; margin: 0; width: 660px"
                              >
                                <table
                                  width="100%"
                                  cellspacing="0"
                                  cellpadding="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 20px;
                                      "
                                    >
                                      <h1
                                        style="
                                          margin: 0;
                                          font-family: Cinzel, serif;
                                          mso-line-height-rule: exactly;
                                          letter-spacing: 0;
                                          font-size: 44px;
                                          font-style: normal;
                                          font-weight: bold;
                                          line-height: 53px;
                                          color: #e3d18a;
                                        "
                                      >
                                        <span style="color: #333333"
                                          >Welcome To YooKatale</span
                                        ><br />
                                      </h1>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 5px;
                                        padding-bottom: 40px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 27px;
                                          letter-spacing: 0;
                                          color: #333333;
                                          font-size: 18px;
                                        "
                                      >
                                        We are a digital mobile market providing
                                        food delivery services through our mobile
                                        platform so our customers don’t have to go
                                        to the market.
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 27px;
                                          letter-spacing: 0;
                                          color: #333333;
                                          font-size: 18px;
                                        "
                                      >
                                        &nbsp;
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 27px;
                                          letter-spacing: 0;
                                          color: #333333;
                                          font-size: 18px;
                                        "
                                      >
                                        We offer our services to homes and
                                        commercial clients.
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      align="center"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 5px;
                                      "
                                    >
                                      <h2
                                        style="
                                          margin: 0;
                                          font-family: Cinzel, serif;
                                          mso-line-height-rule: exactly;
                                          letter-spacing: 0;
                                          font-size: 28px;
                                          font-style: normal;
                                          font-weight: bold;
                                          line-height: 34px;
                                          color: #333333;
                                        "
                                      >
                                        WHY US?
                                      </h2>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="padding: 20px; margin: 0">
                          <!--[if mso]><table style="width:660px" cellpadding="0" cellspacing="0"><tr><td style="width:223px" valign="top"><![endif]-->
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            class="es-left"
                            align="left"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                              float: left;
                            "
                          >
                            <tr>
                              <td
                                class="es-m-p0r es-m-p20b"
                                align="center"
                                style="padding: 0; margin: 0; width: 213px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 5px;
                                      "
                                    >
                                      <ul>
                                        <li>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            All foods delivered to your doorstep.
                                          </p>
                                        </li>
                                        <li>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            Discover a variety of food items.
                                          </p>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td
                                class="es-hidden"
                                style="padding: 0; margin: 0; width: 10px"
                              ></td>
                            </tr>
                          </table>
                          <!--[if mso]></td><td style="width:213px" valign="top"><![endif]-->
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            class="es-left"
                            align="left"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                              float: left;
                            "
                          >
                            <tr>
                              <td
                                class="es-m-p0r es-m-p20b"
                                align="center"
                                style="padding: 0; margin: 0; width: 213px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      height="77"
                                      valign="bottom"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 5px;
                                      "
                                    >
                                      <ul>
                                        <li>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            Access to nutrition insights.
                                          </p>
                                        </li>
                                        <li>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            Access to credit, Never miss a meal
                                          </p>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]></td><td style="width:10px"></td><td style="width:214px" valign="top"><![endif]-->
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            class="es-right"
                            align="right"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                              float: right;
                            "
                          >
                            <tr>
                              <td
                                class="es-m-p0r"
                                align="center"
                                style="padding: 0; margin: 0; width: 214px"
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 5px;
                                      "
                                    >
                                      <ul>
                                        <li>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            Access to professional chef services.
                                          </p>
                                        </li>
                                        <li>
                                          <p
                                            style="
                                              margin: 0;
                                              mso-line-height-rule: exactly;
                                              font-family: arial, 'helvetica neue',
                                                helvetica, sans-serif;
                                              line-height: 21px;
                                              letter-spacing: 0;
                                              color: #333333;
                                              font-size: 14px;
                                            "
                                          >
                                            Affordable foods at low prices
                                          </p>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                          <!--[if mso]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="padding: 20px; margin: 0">
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          ></table>
                          <table
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                class="es-m-p0r es-m-p20b"
                                align="center"
                                style="padding: 0; margin: 0; width: 660px"
                              >
                                <table
                                  width="100%"
                                  cellspacing="0"
                                  cellpadding="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      style="padding: 0; margin: 0"
                                    >
                                      <a
                                        target="_blank"
                                        href="https://newsblog.yookatale.com/blog/64d3c36593fbf66fd640f1e2"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #2cb543;
                                          font-size: 14px;
                                        "
                                        ><img
                                          class="adapt-img"
                                          src="https://yookatale-server-app.onrender.com/images/email/84c40d405d4d455cb4864802e2be78f6.jpg"
                                          alt=""
                                          style="
                                            display: block;
                                            font-size: 14px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                          data-src="https://cdn-images-1.medium.com/max/1600/1*Qdv1B3hXOQQd8a1mhMVgxA.jpeg"
                                          height="180"
                                          width="283"
                                      /></a>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="es-m-txt-c"
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 10px;
                                        padding-bottom: 5px;
                                      "
                                    >
                                      <h3
                                        class="name"
                                        style="
                                          margin: 0;
                                          font-family: Cinzel, serif;
                                          mso-line-height-rule: exactly;
                                          letter-spacing: 0;
                                          font-size: 20px;
                                          font-style: normal;
                                          font-weight: bold;
                                          line-height: 24px;
                                          color: #333333;
                                        "
                                      >
                                        <b
                                          >Decoding 4000 Years BC of pomegranate
                                          fruit.</b
                                        >
                                      </h3>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="es-m-txt-c"
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 5px;
                                        padding-bottom: 20px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 21px;
                                          letter-spacing: 0;
                                          color: #979797;
                                          font-size: 14px;
                                        "
                                      >
                                        <strong
                                          >Secrets of the most ancient
                                          fruits</strong
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="es-m-txt-c"
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-bottom: 20px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 20px;
                                          letter-spacing: 0;
                                          color: #979797;
                                          font-size: 13px;
                                        "
                                        class="description"
                                      >
                                        The pomegranate is one of the world's most
                                        ancient fruits. It's one out of the seven
                                        food species mentioned in the Bible.
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td
                                      class="es-m-txt-c"
                                      bgcolor="#ffffff"
                                      align="left"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-top: 10px;
                                        padding-bottom: 20px;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          mso-line-height-rule: exactly;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          line-height: 21px;
                                          letter-spacing: 0;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                      >
                                        <a
                                          target="_blank"
                                          style="
                                            mso-line-height-rule: exactly;
                                            text-decoration: none;
                                            color: #2cb543;
                                            font-size: 14px;
                                          "
                                          href="https://newsblog.yookatale.com/blog/64d3c36593fbf66fd640f1e2"
                                          >Read More</a
                                        >
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td
                    style="
                      margin: 0;
                      padding-top: 20px;
                      padding-right: 20px;
                      padding-left: 20px;
                      padding-bottom: 20px;
                      background-color: #edfee6;
                    "
                    align="left"
                    bgcolor="#edfee6"
                  >
                    <!--[if mso]><table style="width:660px" cellpadding="0" cellspacing="0"><tr><td style="width:275px" valign="top"><![endif]-->
                    <table
                      cellspacing="0"
                      cellpadding="0"
                      align="left"
                      class="es-left"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        float: left;
                      "
                    >
                      <tr>
                        <td
                          class="es-m-p20b"
                          align="left"
                          style="padding: 0; margin: 0; width: 275px"
                        >
                          <table
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td align="center" style="padding: 10px; margin: 0">
                                <h1
                                  class="b_title"
                                  style="
                                    margin: 0;
                                    font-family: Cinzel, serif;
                                    mso-line-height-rule: exactly;
                                    letter-spacing: 0;
                                    font-size: 44px;
                                    font-style: normal;
                                    font-weight: bold;
                                    line-height: 66px;
                                    color: #ffffff;
                                  "
                                >
                                  <span style="color: #333333"
                                    >SUMMER DISCOUNT OFFER&nbsp;</span
                                  ><br />
                                </h1>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!--[if mso]></td><td style="width:20px"></td><td style="width:365px" valign="top"><![endif]-->
                    <table
                      class="es-right"
                      cellspacing="0"
                      cellpadding="0"
                      align="right"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        float: right;
                      "
                    >
                      <tr>
                        <td
                          class="es-m-p0r"
                          valign="top"
                          align="center"
                          style="padding: 0; margin: 0; width: 365px"
                        >
                          <table
                            width="100%"
                            cellspacing="0"
                            cellpadding="0"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td align="center" style="padding: 0; margin: 0">
                                <h5
                                  style="
                                    margin: 0;
                                    font-family: Cinzel, serif;
                                    mso-line-height-rule: exactly;
                                    letter-spacing: 0;
                                    font-size: 20px;
                                    font-style: normal;
                                    font-weight: normal;
                                    line-height: 40px !important;
                                    color: #333333;
                                  "
                                >
                                  Get 25% on YooKatale premium
                                </h5>
                                <h5
                                  style="
                                    margin: 0;
                                    font-family: Cinzel, serif;
                                    mso-line-height-rule: exactly;
                                    letter-spacing: 0;
                                    font-size: 20px;
                                    font-style: normal;
                                    font-weight: normal;
                                    line-height: 40px !important;
                                    color: #333333;
                                  "
                                >
                                  Subscription, Get 9 days free delivery
                                </h5>
                                <h5
                                  style="
                                    margin: 0;
                                    font-family: Cinzel, serif;
                                    mso-line-height-rule: exactly;
                                    letter-spacing: 0;
                                    font-size: 20px;
                                    font-style: normal;
                                    font-weight: normal;
                                    line-height: 40px !important;
                                    color: #333333;
                                  "
                                >
                                  Forget Going to the Market
                                </h5>
                                <h5
                                  style="
                                    margin: 0;
                                    font-family: Cinzel, serif;
                                    mso-line-height-rule: exactly;
                                    letter-spacing: 0;
                                    font-size: 20px;
                                    font-style: normal;
                                    font-weight: normal;
                                    line-height: 40px !important;
                                    color: #333333;
                                  "
                                >
                                  Never miss a meal, Save money &amp; live better
                                </h5>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!--[if mso]></td></tr></table><![endif]-->
                  </td>
                </tr>
                <tr>
                  <td align="left" style="padding: 20px; margin: 0">
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          valign="top"
                          style="padding: 0; margin: 0; width: 660px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td align="center" style="padding: 0; margin: 0">
                                <span
                                  class="es-button-border"
                                  style="
                                    border-style: solid;
                                    border-color: #2cb543;
                                    background: #185f2d;
                                    border-width: 0px;
                                    display: inline-block;
                                    border-radius: 30px;
                                    width: auto;
                                  "
                                  ><a
                                    href="https://www.yookatale.com/contact"
                                    class="es-button"
                                    target="_blank"
                                    style="
                                      mso-style-priority: 100 !important;
                                      text-decoration: none !important;
                                      mso-line-height-rule: exactly;
                                      padding: 15px 30px 15px 30px;
                                      display: inline-block;
                                      background: #185f2d;
                                      border-radius: 30px;
                                      font-size: 18px;
                                      font-family: arial, 'helvetica neue',
                                        helvetica, sans-serif;
                                      font-weight: normal;
                                      font-style: normal;
                                      line-height: 22px !important;
                                      color: #ffffff;
                                      width: auto;
                                      text-align: center;
                                      letter-spacing: 0;
                                      mso-padding-alt: 0;
                                      mso-border-alt: 10px solid #185f2d;
                                    "
                                    >Subscribe Here</a
                                  ></span
                                >
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="left" style="padding: 20px; margin: 0">
                    <!--[if mso]><table style="width:660px" cellpadding="0" cellspacing="0"><tr><td style="width:320px" valign="top"><![endif]-->
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      class="es-left"
                      align="left"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        float: left;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          style="padding: 0; margin: 0; width: 320px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td align="center" style="padding: 0; margin: 0">
                                <span
                                  class="es-button-border"
                                  style="
                                    border-style: solid;
                                    border-color: #2cb543;
                                    background: #185f2d;
                                    border-width: 0px;
                                    display: inline-block;
                                    border-radius: 30px;
                                    width: auto;
                                  "
                                  ><a
                                    href="https://calendar.google.com/calendar"
                                    class="es-button"
                                    target="_blank"
                                    style="
                                      mso-style-priority: 100 !important;
                                      text-decoration: none !important;
                                      mso-line-height-rule: exactly;
                                      padding: 5px 10px;
                                      display: inline-block;
                                      background: #185f2d;
                                      border-radius: 30px;
                                      font-size: 12px;
                                      font-family: arial, 'helvetica neue',
                                        helvetica, sans-serif;
                                      font-weight: normal;
                                      font-style: normal;
                                      line-height: 14px !important;
                                      color: #ffffff;
                                      width: auto;
                                      text-align: center;
                                      letter-spacing: 0;
                                      mso-padding-alt: 0;
                                      mso-border-alt: 10px solid #185f2d;
                                    "
                                    ><!--[if !mso]><!-- --><img
                                      src="https://yookatale-server-app.onrender.com/images/email/1869397.png"
                                      alt="icon"
                                      width="30"
                                      style="
                                        display: inline-block;
                                        font-size: 14px;
                                        border: 0;
                                        outline: none;
                                        text-decoration: none;
                                        vertical-align: middle;
                                        margin-right: 6px;
                                      "
                                      align="absmiddle"
                                      height="30"
                                    /><!--<![endif]-->Remind me</a
                                  ></span
                                >
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!--[if mso]></td><td style="width:20px"></td><td style="width:320px" valign="top"><![endif]-->
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      class="es-right"
                      align="right"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                        float: right;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          style="padding: 0; margin: 0; width: 320px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td align="center" style="padding: 0; margin: 0">
                                <span
                                  class="es-button-border"
                                  style="
                                    border-style: solid;
                                    border-color: #2cb543;
                                    background: #185f2d;
                                    border-width: 0px;
                                    display: inline-block;
                                    border-radius: 30px;
                                    width: auto;
                                  "
                                  ><a
                                    href="https://www.yookatale.com/"
                                    class="es-button es-button-2877"
                                    target="_blank"
                                    style="
                                      mso-style-priority: 100 !important;
                                      text-decoration: none !important;
                                      mso-line-height-rule: exactly;
                                      padding: 5px;
                                      display: inline-block;
                                      background: #185f2d;
                                      border-radius: 30px;
                                      font-size: 12px;
                                      font-family: arial, 'helvetica neue',
                                        helvetica, sans-serif;
                                      font-weight: normal;
                                      font-style: normal;
                                      line-height: 14px !important;
                                      color: #f1c232;
                                      width: auto;
                                      text-align: center;
                                      letter-spacing: 0;
                                      mso-padding-alt: 0;
                                      mso-border-alt: 10px solid #185f2d;
                                    "
                                    ><!--[if !mso]><!-- --><img
                                      src="https://yookatale-server-app.onrender.com/images/email/untitled_design_1.png"
                                      alt="icon"
                                      width="35"
                                      align="absmiddle"
                                      height="35"
                                      style="
                                        display: inline-block;
                                        font-size: 14px;
                                        border: 0;
                                        outline: none;
                                        text-decoration: none;
                                        vertical-align: middle;
                                      "
                                    /><!--<![endif]-->Shop</a
                                  ></span
                                >
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!--[if mso]></td></tr></table><![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table
          cellpadding="0"
          cellspacing="0"
          class="es-footer"
          align="center"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            width: 100%;
            table-layout: fixed !important;
            background-color: transparent;
            background-repeat: repeat;
            background-position: center top;
          "
        >
          <tr>
            <td align="center" style="padding: 0; margin: 0">
              <table
                class="es-footer-body"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  background-color: transparent;
                  width: 700px;
                "
                bgcolor="transparent"
              >
                <tr>
                  <td
                    align="left"
                    style="
                      margin: 0;
                      padding-top: 20px;
                      padding-right: 20px;
                      padding-left: 20px;
                      padding-bottom: 20px;
                    "
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="left"
                          style="padding: 0; margin: 0; width: 660px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="center"
                                style="
                                  margin: 0;
                                  padding-right: 20px;
                                  padding-left: 20px;
                                  padding-bottom: 10px;
                                  padding-top: 10px;
                                  font-size: 0;
                                "
                              >
                                <table
                                  border="0"
                                  width="100%"
                                  height="100%"
                                  cellpadding="0"
                                  cellspacing="0"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        border-bottom: 1px solid #efefef;
                                        background: none;
                                        height: 1px;
                                        width: 100%;
                                        margin: 0px;
                                      "
                                    ></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="
                                  padding: 0;
                                  margin: 0;
                                  padding-top: 20px;
                                  padding-bottom: 20px;
                                  font-size: 0;
                                "
                              >
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="es-table-not-adapt es-social"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr>
                                    <td
                                      align="center"
                                      valign="top"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-right: 30px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://www.facebook.com/profile.php?id=100094194942669&mibextid=LQQJ4d"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        ><img
                                          title="Facebook"
                                          src="https://yookatale-server-app.onrender.com/images/email/facebook-logo-white.png"
                                          alt="Fb"
                                          width="32"
                                          height="32"
                                          style="
                                            display: block;
                                            font-size: 14px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                      /></a>
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-right: 30px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://viewstripo.email."
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        ><img
                                          title="Twitter"
                                          src="https://yookatale-server-app.onrender.com/images/email/twitter-logo-white.png"
                                          alt="Tw"
                                          width="32"
                                          height="32"
                                          style="
                                            display: block;
                                            font-size: 14px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                      /></a>
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-right: 30px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://www.instagram.com/p/CuHdaksN5UW/?igshid=NTc4MTIwNjQ2YQ=="
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        ><img
                                          title="Instagram"
                                          src="https://yookatale-server-app.onrender.com/images/email/instagram-logo-white.png"
                                          alt="Inst"
                                          width="32"
                                          height="32"
                                          style="
                                            display: block;
                                            font-size: 14px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                      /></a>
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      style="
                                        padding: 0;
                                        margin: 0;
                                        padding-right: 30px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://www.linkedin.com/company/96071915/admin/feed/posts/"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        ><img
                                          title="Linkedin"
                                          src="https://yookatale-server-app.onrender.com/images/email/linkedin-logo-white.png"
                                          alt="In"
                                          width="32"
                                          height="32"
                                          style="
                                            display: block;
                                            font-size: 14px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                      /></a>
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      style="padding: 0; margin: 0"
                                    >
                                      <a
                                        target="_blank"
                                        href="https://wa.me/256754615840"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: underline;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        ><img
                                          title="Whatsapp"
                                          src="https://yookatale-server-app.onrender.com/images/email/whatsapp-logo-white.png"
                                          alt="Whatsapp"
                                          width="32"
                                          height="32"
                                          style="
                                            display: block;
                                            font-size: 14px;
                                            border: 0;
                                            outline: none;
                                            text-decoration: none;
                                          "
                                      /></a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0; margin: 0">
                                <table
                                  cellpadding="0"
                                  cellspacing="0"
                                  width="100%"
                                  class="es-menu"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    border-collapse: collapse;
                                    border-spacing: 0px;
                                  "
                                >
                                  <tr class="links">
                                    <td
                                      align="center"
                                      valign="top"
                                      width="25%"
                                      id="esd-menu-id-0"
                                      style="
                                        margin: 0;
                                        border: 0;
                                        padding-bottom: 10px;
                                        padding-top: 10px;
                                        padding-right: 5px;
                                        padding-left: 5px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://www.yookatale.com/about"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: none;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          display: block;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        >About us</a
                                      >
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      width="25%"
                                      id="esd-menu-id-1"
                                      style="
                                        margin: 0;
                                        border: 0;
                                        padding-bottom: 10px;
                                        padding-top: 10px;
                                        padding-right: 5px;
                                        padding-left: 5px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://newsblog.yookatale.com/"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: none;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          display: block;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        >Blogs</a
                                      >
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      width="25%"
                                      id="esd-menu-id-2"
                                      style="
                                        margin: 0;
                                        border: 0;
                                        padding-bottom: 10px;
                                        padding-top: 10px;
                                        padding-right: 5px;
                                        padding-left: 5px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://newsblog.yookatale.com/careers"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: none;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          display: block;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        >Careers</a
                                      >
                                    </td>
                                    <td
                                      align="center"
                                      valign="top"
                                      width="25%"
                                      id="esd-menu-id-2"
                                      style="
                                        margin: 0;
                                        border: 0;
                                        padding-bottom: 10px;
                                        padding-top: 10px;
                                        padding-right: 5px;
                                        padding-left: 5px;
                                      "
                                    >
                                      <a
                                        target="_blank"
                                        href="https://www.yookatale.com/usage"
                                        style="
                                          mso-line-height-rule: exactly;
                                          text-decoration: none;
                                          font-family: arial, 'helvetica neue',
                                            helvetica, sans-serif;
                                          display: block;
                                          color: #ffffff;
                                          font-size: 14px;
                                        "
                                        >Terms and Conditions</a
                                      >
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td
                                align="center"
                                style="
                                  padding: 0;
                                  margin: 0;
                                  padding-bottom: 10px;
                                  padding-top: 10px;
                                "
                              >
                                <p
                                  style="
                                    margin: 0;
                                    mso-line-height-rule: exactly;
                                    font-family: arial, 'helvetica neue',
                                      helvetica, sans-serif;
                                    line-height: 18px;
                                    letter-spacing: 0;
                                    color: #ffffff;
                                    font-size: 12px;
                                  "
                                >
                                  P.O. Box 74940
                                </p>
                                <p
                                  style="
                                    margin: 0;
                                    mso-line-height-rule: exactly;
                                    font-family: arial, 'helvetica neue',
                                      helvetica, sans-serif;
                                    line-height: 18px;
                                    letter-spacing: 0;
                                    color: #ffffff;
                                    font-size: 12px;
                                  "
                                >
                                  Clock-Tower Plot 6, 27 Kampala
                                </p>
                                <p
                                  style="
                                    margin: 0;
                                    mso-line-height-rule: exactly;
                                    font-family: arial, 'helvetica neue',
                                      helvetica, sans-serif;
                                    line-height: 18px;
                                    letter-spacing: 0;
                                    color: #ffffff;
                                    font-size: 12px;
                                  "
                                >
                                  Entebbe, Uganda
                                </p>
                                <p
                                  style="
                                    margin: 0;
                                    mso-line-height-rule: exactly;
                                    font-family: arial, 'helvetica neue',
                                      helvetica, sans-serif;
                                    line-height: 18px;
                                    letter-spacing: 0;
                                    color: #ffffff;
                                    font-size: 12px;
                                  "
                                >
                                  Copyright © YooKatale
                                </p>
                                <p
                                  style="
                                    margin: 0;
                                    mso-line-height-rule: exactly;
                                    font-family: arial, 'helvetica neue',
                                      helvetica, sans-serif;
                                    line-height: 18px;
                                    letter-spacing: 0;
                                    color: #ffffff;
                                    font-size: 12px;
                                  "
                                >
                                  &nbsp;<a
                                    target="_blank"
                                    style="
                                      mso-line-height-rule: exactly;
                                      text-decoration: underline;
                                      color: #ffffff;
                                      font-size: 12px;
                                    "
                                    href="https://www.yookatale.com/privacy"
                                    >Privacy policy</a
                                  >
                                  |
                                  <a
                                    target="_blank"
                                    style="
                                      mso-line-height-rule: exactly;
                                      text-decoration: underline;
                                      color: #ffffff;
                                      font-size: 12px;
                                    "
                                    href="https://www.yookatale.com/"
                                    >Unsubscribe</a
                                  >
                                </p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table
          cellpadding="0"
          cellspacing="0"
          class="es-content"
          align="center"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            border-collapse: collapse;
            border-spacing: 0px;
            width: 100%;
            table-layout: fixed !important;
          "
        >
          <tr>
            <td align="center" style="padding: 0; margin: 0">
              <table
                bgcolor="#ffffff"
                class="es-content-body"
                align="center"
                cellpadding="0"
                cellspacing="0"
                style="
                  mso-table-lspace: 0pt;
                  mso-table-rspace: 0pt;
                  border-collapse: collapse;
                  border-spacing: 0px;
                  background-color: #161616;
                  width: 700px;
                "
              >
                <tr>
                  <td align="left" style="padding: 20px; margin: 0">
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        border-collapse: collapse;
                        border-spacing: 0px;
                      "
                    >
                      <tr>
                        <td
                          align="center"
                          valign="top"
                          style="padding: 0; margin: 0; width: 660px"
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            role="presentation"
                            style="
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                              border-collapse: collapse;
                              border-spacing: 0px;
                            "
                          >
                            <tr>
                              <td
                                align="center"
                                class="es-infoblock made_with"
                                style="padding: 0; margin: 0; font-size: 0"
                              >
                                <a
                                  target="_blank"
                                  href="https://www.yookatale.com/"
                                  style="
                                    mso-line-height-rule: exactly;
                                    text-decoration: underline;
                                    color: #cccccc;
                                    font-size: 12px;
                                  "
                                  ><img
                                    src="https://yookatale-server-app.onrender.com/images/email/image.png"
                                    alt="Logo"
                                    width="125"
                                    style="
                                      display: block;
                                      font-size: 14px;
                                      border: 0;
                                      outline: none;
                                      text-decoration: none;
                                    "
                                    title="Logo"
                                    height="77"
                                /></a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  
  `,
};
