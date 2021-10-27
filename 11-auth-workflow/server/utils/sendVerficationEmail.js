const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  // construct email verification frontend url
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  // email body
  const message = `<p>Please confirm your email by clicking on the following link: 
  <a href="${verifyEmail}">Verify Email</a> 
  </p>`;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation',
    html: `Hello ${name},
    <br/>
    ${message}
    `,
  });
};

module.exports = sendVerificationEmail;
