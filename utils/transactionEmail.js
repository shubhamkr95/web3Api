const nodemailer = require('nodemailer');
const nodemailerMailgun = require('nodemailer-mailgun-transport');

const txnMail = async (email, transDetails) => {
  const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerMailgun(auth));

  const sendFrom = 'noreply@demowallet.com';
  let userEmail = email;

  const mailOptions = {
    from: sendFrom,
    to: userEmail,
    subject: 'Transaction alert',
    html: `<h1>Transaction Details</h1>
    <h2>Find the transactions details below </h2>
    <h4><strong>${transDetails}</strong></h4>
    `,
  };

  await transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log('message Sent: ', data);
    }
  });
};

module.exports = txnMail;
