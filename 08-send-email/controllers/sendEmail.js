const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
  // create a test account
  const testAccount = await nodemailer.createTestAccount();

  // connect to transport service [ethereal]
  // ! Since we're using ethereal it doesnt matter much but if you're using a PROD service, make sure to set up the following values as `env varibles`
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'haven.olson28@ethereal.email',
      pass: 'kKVE4QM4Z93yanEmzF',
    },
  });

  // send mail with the specified transport
  let info = await transporter.sendMail({
    from: `"Yodkwtf Academy" <yodkwtf@gmail.com>`,
    to: '48durgesh.kumar@gmail.com',
    subject: 'Hello',
    text: "Welcome to Yodkwtf Academy! You'll be learning a lot from us.",
  });

  // send info as response just to see the result
  res.json({ info });
};

module.exports = sendEmail;
