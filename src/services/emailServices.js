require('dotenv').config();
const sendEmail = require('../utils/email/sendEmail.util');

const {
  passwordUpdatedTemp,
} = require('../../public/email-templates/auth/password/passwordUpdated.template');
const {
  resetPasswordTemp,
} = require('../../public/email-templates/auth/password/resetPassword.template');
const {
  verifyEmailCodeTemp,
} = require('../../public/email-templates/auth/signup/verifyEmailCode.template');
const { sendSuccess } = require('../utils/helpers');

// General
const registeredEmail = async (req, res) => {
  const { newMember } = req.body;
  const email = newMember.email;
  const first_name = newMember.first_name;
  const subject = `Welcome on board - ${process.env.APP_NAME}`;
  const email_body = verifyEmailCodeTemp(first_name);

  try {
    sendEmail(subject, email_body, email);
  } catch (error) {
    res.status(500).json(error.message);
  }
  return sendSuccess(
    res,
    'You have successfully registered with us. Kindly check your email address to get our welcome mail. We will reach out soon'
  );
};
const resetPasswordEmail = async (req, res) => {
  const { user, token } = req.body;
  const email = user.email;
  const firstName = user.name.split(' ')[0];
  const link = `${process.env.USER_APP_URL}/reset-password?token=${token}&id=${user._id}`;

  const subject = `Reset Your Password - ${process.env.APP_NAME}`;
  const email_body = resetPasswordTemp(firstName, link);
  try {
    sendEmail(subject, email_body, email);
  } catch (error) {
    res.status(500).json(error.message);
  }
  return res.status(200).json({
    success: true,
    email,
    userId: user._id,
    message: `Password reset link has been sent to your email - ${email}`,
  });
};
const passwordUpdatedEmail = async (req, res) => {
  const { user } = req.body;
  const email = user.email;
  const firstName = user.name.split(' ')[0];
  const subject = `Your Password Has Been Updated - ${process.env.APP_NAME}`;
  const email_body = passwordUpdatedTemp(firstName);
  try {
    sendEmail(subject, email_body, email);
  } catch (error) {
    res.status(500).json(error.message);
  }
  return res.status(200).json({
    success: true,
    message: 'Your password has been successfully updated',
  });
};

module.exports = {
  registeredEmail,
  resetPasswordEmail,
  passwordUpdatedEmail,
};
