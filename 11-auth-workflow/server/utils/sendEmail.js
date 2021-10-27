const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  // create a test account
  const testAccount = await nodemailer.createTestAccount();

  // connect to transport service [ethereal]
  // ! Since we're using ethereal it doesnt matter much but if you're using a PROD service, make sure to set up the following values as `env varibles`
  const transporter = nodemailer.createTransport(nodemailerConfig);

  // send mail with the specified transport
  return transporter.sendMail({
    from: `"Yodkwtf Academy" <yodkwtf@gmail.com>`, // sender address
    to, // reciever address
    subject, // subject of email
    html, // email body
  });
};

module.exports = sendEmail;
