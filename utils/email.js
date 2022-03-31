const nodemailer = require('nodemailer');
const nodemailerMailgun = require('nodemailer-mailgun-transport');

const sendEmail = async (email, url) => {
  // mailgun config

  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };

  const trasnporter = nodemailer.createTransport(nodemailerMailgun(auth));

  const sendFrom = 'noreply@demowallet.com';
  let userEmail = email;
  const confirmUrl = url;

  const mailOptions = {
    from: sendFrom,
    to: userEmail,
    subject: 'apiWallet- Verify your email',
    html: `<h1>Hi There</h1>
            <p>Thanks for signing up on our api wallet . Click the address to verify your account</p>
            <a href=${confirmUrl}>Verify your account</a>
            `,
  };

  await trasnporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('message Sent: ', data);
    }
  });
};

module.exports = sendEmail;
