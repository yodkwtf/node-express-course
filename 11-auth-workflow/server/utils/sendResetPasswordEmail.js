const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  // url for reseting email [frontend]
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;

  // email message
  const message = `
  <p>Please reset your password by clicking on the following link:
  <a href="${resetURL}">Reset Password</a>
  `;

  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html: `
    <h4>Hello ${name},</h4>,
    ${message}
    `,
  });
};

module.exports = sendResetPasswordEmail;
