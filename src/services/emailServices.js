require('dotenv').config();
const sendEmail = require('../utils/email/sendEmail.util');
const {
  emailVerifiedTemp,
} = require('../../public/email-templates/auth/signup/emailVerified.template');
const {
  passwordUpdatedTemp,
} = require('../../public/email-templates/auth/password/passwordUpdated.template');
const {
  resetPasswordTemp,
} = require('../../public/email-templates/auth/password/resetPassword.template');
const {
  verifyEmailCodeTemp,
} = require('../../public/email-templates/auth/signup/verifyEmailCode.template');
const {
  profileUpdatedTemp,
} = require('../../public/email-templates/profile/profileUpdated.template');

// General
const registeredEmail = async (req, res) => {
  const { newMember } = req.body;
  const email = newMember.email;
  const first_name = newMember.first_name;

  try {
    const send_to = email;
    const reply_to = process.env.APP_EMAIL;
    const send_from = process.env.APP_EMAIL;
    const subject = `Welcome on board - ${process.env.APP_NAME}`;

    const email_body = verifyEmailCodeTemp(first_name);

    sendEmail(subject, email_body, send_to, send_from, reply_to);
    return res.status(200).json({
      success: true,
      message: `You have successfully registered with us. Kindly check your email address to get our welcome mail. We will reach out soon`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const resetPasswordEmail = async (req, res) => {
  const { user, token } = req.body;
  const email = user.email;
  const firstName = user.name.split(' ')[0];

  const link = `${process.env.USER_APP_URL}/reset-password?token=${token}&id=${user._id}`;

  try {
    const send_to = email;
    const reply_to = process.env.APP_EMAIL;
    const send_from = process.env.APP_EMAIL;
    const subject = `Reset Your Password - ${process.env.APP_NAME}`;

    const email_body = resetPasswordTemp(firstName, link);

    await sendEmail(subject, email_body, send_to, send_from, reply_to);
    return res.status(200).json({
      success: true,
      email,
      userId: user._id,
      message: `Password reset link has been sent to your email - ${email}`,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const passwordUpdatedEmail = async (req, res) => {
  const { user } = req.body;
  const email = user.email;
  const firstName = user.name.split(' ')[0];
  try {
    const send_to = email;
    const reply_to = process.env.APP_EMAIL;
    const send_from = process.env.APP_EMAIL;
    const subject = `Your Password Has Been Updated - ${process.env.APP_NAME}`;

    const email_body = passwordUpdatedTemp(firstName);

    await sendEmail(subject, email_body, send_to, send_from, reply_to);
    return res.status(200).json({
      success: true,
      message: 'Your password has been successfully updated',
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  registeredEmail,
  resetPasswordEmail,
  passwordUpdatedEmail,
};
