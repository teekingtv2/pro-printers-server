const User = require('../../models/user/User');
const { sendError, sendSuccess, badRequestError } = require('../../utils/helpers');
const UserReferral = require('../../models/user/UserReferral');
const bcrypt = require('bcryptjs');

const getUser = async (req, res) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, '-password');
  } catch (err) {
    return sendError(res, err.message);
  }
  if (!user) {
    return sendError(res, 'User not found');
  }
  return sendSuccess(res, null, user);
};

const updateUserProfile = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true });
    return sendSuccess(res, 'Your profile contact data has been successfully updated', user);
  } catch (error) {
    console.log(err);
    return sendError(res, 'Unable to update your profile data');
  }
};

const setUserProfileAvatar = async (req, res) => {
  const rawImagesArray = req.files['avatar'];
  if (!rawImagesArray) {
    return badRequestError(res, 'Please add the image avatar to be uploaded');
  }
  const namedImage = rawImagesArray.map((a) => a.filename);
  const stringnifiedImages = JSON.stringify(namedImage);
  const formmatedImages = stringnifiedImages.replace(/[^a-zA-Z0-9_.,]/g, '');
  const avatar = formmatedImages.replace(/[,]/g, ', ');
  console.log('avatar: ', avatar);

  try {
    const savedProfile = await User.findByIdAndUpdate(req.params.id, {
      avatar: avatar,
    });
    return sendSuccess(res, 'Successfully updated the profile avatar', savedProfile);
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to update the admin profile');
  }
};

const updateUserPassword = async (req, res, next) => {
  const userId = req.id;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'Invalid user profile');

  const isCurrentPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
  if (!isCurrentPasswordCorrect) return sendError(res, 'Incorrect current password provided');

  const isPasswordSame = bcrypt.compareSync(newPassword, user.password);
  if (isPasswordSame) return sendError(res, 'New password must be different from the old password');

  const hashedPassword = bcrypt.hashSync(newPassword);
  user.password = hashedPassword;

  try {
    await user.save();
    req.body = {
      user,
    };
    next();
  } catch (error) {
    console.log(err);
    return sendError(res, err);
  }
};

const updateUserEmailAlert = async (req, res) => {
  const userId = req.id;
  try {
    const user = await User.findByIdAndUpdate(userId, { $set: req.body });
    return sendSuccess(res, 'You have updated your alert settings', user);
  } catch (error) {
    console.log(err);
    return sendError(res, 'Unable to update your alert settings');
  }
};

const getReferralProfile = async (req, res) => {
  const userId = req.id;
  let userReferrals;
  try {
    userReferrals = await UserReferral.findOne({ userId });
  } catch (err) {
    return sendError(res, err.message);
  }
  if (!userReferrals) {
    return sendError(res, 'User not found');
  }
  return sendSuccess(res, null, userReferrals);
};

const withdrawReferralEarning = async (req, res, next) => {
  const userId = req.id;
  const { amount } = req.body;

  let referralData;
  let userBalance;

  const user = await User.findById(userId);
  if (!user) return sendError(res, 'Invalid user profile');

  try {
    referralData = await UserReferral.findOne({ userId });
  } catch (err) {
    console.log(err);
  }

  try {
    userBalance = await UserBalance.findOne({ owner: userId, ticker: 'NGN' });
  } catch (err) {
    console.log(err);
  }

  const pendingBalance = referralData.pendingBalance;
  const fiatBalance = userBalance.balance;
  if (pendingBalance <= amount) return sendError(res, 'Enter an amount lower than your balance');

  const newPendingBalance = pendingBalance - amount;
  const newfiatBalance = fiatBalance + amount;

  referralData.pendingBalance = newPendingBalance;
  userBalance.balance = newfiatBalance;
  try {
    await referralData.save();
    await userBalance.save();
    req.body = { user, amount };
    next();
  } catch (error) {
    console.log(err);
    return sendError(res, err);
  }
};

module.exports = {
  getUser,
  updateUserProfile,
  setUserProfileAvatar,
  updateUserPassword,
  updateUserEmailAlert,

  getReferralProfile,
  withdrawReferralEarning,
};
