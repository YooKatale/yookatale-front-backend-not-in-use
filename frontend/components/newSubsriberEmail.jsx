import React from 'react';

const EmailTemplate = () => {
  return (
    <html lang="en">
      <head>
        {/* Head content here */}
      </head>
      <body style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f4f4f4' }}>

        {/* Header */}
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style={{ maxWidth: '600px', margin: 'auto', backgroundColor: '#ffffff' }}>
          <tr>
            <td style={{ padding: '20px' }}>
              <h1 style={{ fontSize: '24px', color: '#333333', textAlign: 'center' }}>Welcome to Yookatale</h1>
              <p style={{ fontSize: '16px', color: '#777777', textAlign: 'center' }}>Your Digital Mobile Food Market</p>
            </td>
          </tr>
        </table>

        {/* Content */}
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style={{ maxWidth: '600px', margin: 'auto', backgroundColor: '#ffffff' }}>
          <tr>
            <td style={{ padding: '20px' }}>
              <p style={{ fontSize: '18px', color: '#333333' }}>Thank you for subscribing to the Yookatale newsletter.</p>
              <a href="[Link to Article]" style={{ display: 'block', marginTop: '20px', textDecoration: 'none', color: '#007bff' }}>[ Decoding 4000 years of the pamagmante fruit]</a>
              {/* Insert image here */}
              <img src="[Image URL]" alt="Article Image" style={{ maxWidth: '100%', marginTop: '20px' }} />
              <p style={{ fontSize: '18px', color: '#333333' }}>Forget About Going to the Market</p>
              <a href="[Link to YooKatale Premium]" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#007bff', color: '#ffffff', textDecoration: 'none', borderRadius: '5px' }}>Get YooKatale Premium</a>
            </td>
          </tr>
        </table>

        {/* Standard Template Info */}
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style={{ maxWidth: '600px', margin: 'auto', backgroundColor: '#ffffff' }}>
          <tr>
            <td style={{ padding: '20px' }}>
                <img src="../WhatsApp12.jpg" alt="Avert Poster" style={{maxWidth: '100%'}}/>
            </td>
          </tr>
        </table>

        {/* Footer */}
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style={{ maxWidth: '600px', margin: 'auto', backgroundColor: '#f4f4f4' }}>
          <tr>
            <td style={{ padding: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#777777' }}>&copy; [Current Year] Yookatale. All rights reserved.</p>
            </td>
          </tr>
        </table>

      </body>
    </html>
  );
};

export default EmailTemplate;
