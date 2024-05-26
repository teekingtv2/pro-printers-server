const { isValidObjectId } = require('mongoose');
const Admin = require('../models/admin/Admin');
const ResetPasswordToken = require('../models/user/ResetPasswordToken');
const { sendError } = require('../utils/helpers');
const { log } = require('console');

const validateNewAdmin = async (req, res, next) => {
  const { email, username, password } = req.body;

  const refinedUsername = username.toLowerCase();
  const refinedEmail = email.toLowerCase();
  log('email', email);
  log('refinedEmail', refinedEmail);

  let existingAdmin;
  let existingUsername;
  let existingPhone;

  try {
    existingAdmin = await Admin.findOne({ email: refinedEmail });
  } catch (err) {
    console.log(err);
  }
  if (existingAdmin) {
    return sendError(
      res,
      `Email already used for another admin with name - ${existingAdmin.username}`
    );
  }

  try {
    existingUsername = await Admin.findOne({ username: refinedUsername });
  } catch (err) {
    console.log(err);
  }
  if (existingUsername) {
    return sendError(res, 'Username already taken');
  }

  try {
    existingPhone = await Admin.findOne({ phone });
  } catch (err) {
    console.log(err);
  }
  if (existingPhone) {
    return sendError(res, 'This phone number has already been registered');
  }

  req.body = {
    email: refinedEmail,
    username: refinedUsername,
    password,
  };

  next();
};

const isAdminPasswordResetTokenValid = async (req, res, next) => {
  const { token, id } = req.query;

  if (!token || !id) return sendError(res, 'Invalid request');

  if (!isValidObjectId(id)) return sendError(res, 'Invalid user');

  const admin = await Admin.findById(id);

  if (!admin) return sendError(res, 'Admin not found');

  const resToken = await ResetPasswordToken.findOne({ owner: admin._id });
  if (!resToken) return sendError(res, 'Reset token not found');

  const resetToken = resToken.token;

  if (token !== resetToken) {
    return sendError(res, 'Reset token is invalid');
  }

  req.body.admin = admin;
  next();
};

const validateAdminLoginType = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return sendError(res, 'email is missing', 1);
  }

  let existingAdmin;
  let adminIdentity;

  if (email.includes('@')) {
    adminIdentity = email.toLowerCase();
    try {
      existingAdmin = await Admin.findOne({ email: adminIdentity });
    } catch (err) {
      return sendError(res, err.message, 500);
    }
    if (!existingAdmin) {
      return sendError(res, 'Email not registered. Access denied.');
    }
  }

  req.body = {
    existingAdmin,
    password,
  };

  next();
};

module.exports = {
  validateNewAdmin,
  isAdminPasswordResetTokenValid,
  validateAdminLoginType,
};
