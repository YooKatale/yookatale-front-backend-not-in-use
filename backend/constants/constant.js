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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 c<title>Welcome to YooKatale</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #333; /* Dark Background Color */
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .footer {
      text-align: center;
      margin-top: 20px;
      color: #888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <table border="0" width="100%" cellspacing="0" cellpadding="0" >
        <tbody>
          <tr>
            <td style="padding: 20px 0; text-align: center;">
              <h1 style="color: #ffffff;">Welcome to YooKatale</h1>
              <p style="color: #ffff; font-size: 25px;">Hi, ${name}</p>
            </td>
          </tr>
        </tbody>
      </table>
    <table border="0" width="100%" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td style="padding: 20px;text-align:center;">
                    <p style="color: #fff; font-size: 20px;margin-bottom:40px">Thank you for signing up with YooKatale!</p>
                    <p style="color: #fff; font-size: 20px;margin-bottom:40px">Are you excited to derive through your source for delicious meals?</p>
                    <p style="color: #fff; font-size: 20px;margin-bottom:40px">Get started today and explore@</p>
                    <a href="https://www.yookatale.com" style="display: inline-block;margin-top: 20px;padding: 10px 20px;background-color: #3d5ca3;color: #fff;text-decoration: none;border-radius: 5px;">Explore Now</a>
                </td>
            </tr>
        </tbody>
      </table>
    <div class="footer">
        <table border="0" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td style="padding: 20px; text-align: center;">
                    <p style="color: #fff; font-size: 12px;">&copy; YooKatale</p>
                    <p style="color: #fff; font-size: 12px;">P.o Box 74940, Clock-Tower</p>
                    <p style="color: #fff; font-size: 12px;">Kampala, Uganda</p>
                    <p style="color: #fff; font-size: 12px;">Plot 6, 27 Naguru, Entebbe</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: center;"><a style="color: #3d5ca3; font-size: 14px; text-decoration: none; margin-right: 20px;" href="https://www.yookatale.com/about">About us</a> <a style="color: #3d5ca3; font-size: 14px; text-decoration: none; margin-right: 20px;" href="https://www.yookatale.com/privacy">Privacy Policy</a> <a style="color: #3d5ca3; font-size: 14px; text-decoration: none;" href="https://www.yookatale.com/usage">Terms &amp; Conditions</a></td>
              </tr>
            </tbody>
          </table>
          <table border="0" width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td style="padding: 20px; text-align: center;"><a style="text-decoration: none; margin-right: 10px;" href="https://www.facebook.com/profile.php?id=100094194942669"><img src="https://xvgncv.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png" alt="Facebook" width="32" height="32" /></a> <a style="text-decoration: none; margin-right: 10px;" href="https://twitter.com/YooKatale"><img src="https://xvgncv.stripocdn.email/content/assets/img/social-icons/rounded-gray/twitter-rounded-gray.png" alt="Twitter" width="32" height="32" /></a> <a style="text-decoration: none; margin-right: 10px;" href="https://www.instagram.com/p/CuHdaksN5UW"><img src="https://xvgncv.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png" alt="Instagram" width="32" height="32" /></a> <a style="text-decoration: none;" href="https://www.linkedin.com/company/yookatale"><img src="https://xvgncv.stripocdn.email/content/assets/img/social-icons/circle-colored/linkedin-circle-colored.png" alt="LinkedIn" width="32" height="32" /></a></td>
              </tr>
              <tr>
                <td style="padding: 20px; text-align: center;"><img id="e7948cb7-1107-4048-8093-95cde751cc2e" class="aspect-ratio" style="max-width: 100%;" src="./Whit DMM.png" alt="" /></td>
              </tr>
            </tbody>

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
};
