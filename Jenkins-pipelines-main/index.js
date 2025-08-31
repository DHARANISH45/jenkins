const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Page</title>
      <style>
        body {
          background: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
          color: #222;
          font-family: 'Segoe UI', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .welcome-box {
          background: #fff;
          border-radius: 16px;
          padding: 48px 64px;
          box-shadow: 0 8px 32px 0 rgba(102, 166, 255, 0.25);
          text-align: center;
        }
        h1 {
          font-size: 2.8rem;
          margin-bottom: 18px;
          color: #007cf0;
        }
        p {
          font-size: 1.3rem;
          margin-bottom: 0;
        }
        .extra {
          margin-top: 24px;
          font-size: 1.1rem;
          color: #555;
        }
      </style>
    </head>
    <body>
      <div class="welcome-box">
        <h1>Welcome You..</h1>
        <p>We're glad to see you here!<br>Enjoy exploring this simple Node.js web app.</p>
        <div class="extra">Need help? Contact support or check our <a href="#" style="color:#007cf0;text-decoration:underline;">FAQ</a>.</div>
      </div>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
