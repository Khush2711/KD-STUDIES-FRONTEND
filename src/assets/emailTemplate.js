export const getContactFormEmailTemplate = ({
    firstName,
    lastName,
    email,
    countryCode,
    contactNumber,
    message,
  }) => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            color: #333;
          }
          .content {
            margin-top: 20px;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #555;
          }
          .value {
            margin-top: 5px;
            color: #333;
          }
          .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #aaa;
          }
          .signature {
            margin-top: 30px;
            font-size: 14px;
            color: #333;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 class="header">New Contact Form Submission</h2>
  
          <div class="content">
            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <div class="label">Email:</div>
              <div class="value">${email}</div>
            </div>
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${countryCode} ${contactNumber}</div>
            </div>
            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${message}</div>
            </div>
          </div>
  
          <div class="signature">
            <p>Thank you for reaching out to <strong>KD Studies</strong>!</p>
            <p>We will get back to you shortly.</p>
            <p>— Khush Desai, Founder of KD Studies</p>
          </div>
  
          <div class="footer">
            &copy; ${new Date().getFullYear()} KD Studies. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `;
  };
  