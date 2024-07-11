const { sendError } = require('../utils/helpers');
const Member = require('../models/Member');

const validateNewMember = async (req, res, next) => {
  const {
    title,
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    state,
    zip_code,
    country,
    info,
  } = req.body;
  const refinedEmail = email.toLowerCase();
  let existingUser;

  try {
    existingUser = await Member.findOne({ email: refinedEmail });
  } catch (err) {
    console.log(err);
    return sendError(res, 'Could not verify that you are a new member.', 206);
  }
  if (existingUser) {
    return sendError(res, 'Email already exists. Please login instead.', 206);
  }
  req.body = {
    title,
    first_name,
    last_name,
    email: refinedEmail,
    phone,
    address,
    city,
    state,
    zip_code,
    country,
    info,
  };
  next();
};

module.exports = {
  validateNewMember,
};
