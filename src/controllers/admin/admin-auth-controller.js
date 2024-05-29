const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendError, createRandomBytes, sendSuccess } = require('../../utils/helpers');
const ResetPasswordToken = require('../../models/user/ResetPasswordToken');
const Admin = require('../../models/admin/Admin');
const Wallet = require('../../models/admin/Wallet');

const getWalletAddress = async (req, res) => {
  try {
    const wallet = await Wallet.find().limit(1);
    if (!wallet) {
      return sendError(res, 'Wallet data not found');
    }
    return sendSuccess(res, 'Successfully fetched', wallet);
  } catch (err) {
    return sendError(res, err.message);
  }
};

const updateWalletAddress = async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.params.id);
    if (!wallet) {
      return sendError(res, 'You do not have a valid profile');
    }
    const currentWallet = await Wallet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return sendSuccess(res, 'Wallet address has been successfully updated', currentWallet);
  } catch (error) {
    console.log(error);
    return sendError(res, 'Unable to update Wallet address');
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return sendError(res, 'Please provide account email');

  const admin = await Admin.findOne({ email });
  if (!admin) return sendError(res, 'Sorry, user not found. Invalid request');

  if (!admin.email_verified) {
    return res.status(401).json({
      success: true,
      message: 'Unverified email',
      userId: admin._id,
    });
  }

  const checkToken = await ResetPasswordToken.findOne({ owner: admin._id });
  if (checkToken) return sendError(res, 'You can only request a new token after an hour');

  // Generate token
  const token = await createRandomBytes();

  const resetToken = new ResetPasswordToken({ owner: admin._id, token });
  await resetToken.save();
  req.body = {
    user: admin,
    token,
  };
  next();
};

const resetPassword = async (req, res, next) => {
  const { admin, password } = req.body;
  const isPasswordSame = bcrypt.compareSync(password, admin.password);
  if (isPasswordSame) return sendError(res, 'New password must be different from the old password');
  if (password.trim().length < 8 || password.trim().length > 20)
    return sendError(res, 'Password must be between 8 and 20 charcaters long');

  const hashedPassword = bcrypt.hashSync(password);

  admin.password = hashedPassword;
  await admin.save();
  await ResetPasswordToken.findOneAndDelete({ owner: admin._id });

  req.body = {
    user: admin,
  };
  next();
};

const adminUpdateProfile = async (req, res) => {
  const adminId = req.id;
  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return sendError(res, 'You do not have a valid profile');
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    } else {
      req.body.password = admin.password;
    }
    const currentAdmin = await Admin.findByIdAndUpdate(adminId, { $set: req.body }, { new: true });
    return sendSuccess(res, 'Your profile data has been successfully updated', currentAdmin);
  } catch (error) {
    console.log(err);
    return sendError(res, 'Unable to update your profile data');
  }
};

// LOGIN
const loginAdmin = async (req, res, next) => {
  const { existingAdmin, password } = req.body;

  const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
  if (!isPasswordCorrect) {
    return sendError(res, 'Invalid email or password');
  }

  const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_ADMIN_SECRET_KEY, {
    expiresIn: '5d',
  });
  res.cookie(String(existingAdmin._id), token, {
    path: '/',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    // sameSite: 'lax',
  });
  return res.status(200).json({
    success: true,
    message: 'Successfully logged in',
    id: existingAdmin._id,
    token,
  });
};

const isAdminLogin = async (req, res) => {
  const cookies = req.headers.cookie;
  if (cookies) {
    return res.status(200).json({ success: true, message: 'You are logged in' });
  } else if (!cookies) {
    return sendError(res, 'No session found. You are not logged in', 401);
  }
};

const verifyAdminLoginToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return sendError(res, 'You are not authenticated or authorised to perform this operation', 400);
  }
  const token = cookies.split('=')[1];
  if (!token) {
    return sendError(res, 'You are not authenticated or authorised to perform this operation', 400);
  }
  jwt.verify(String(token), process.env.JWT_ADMIN_SECRET_KEY, (err, admin) => {
    if (err) {
      return sendError(res, 'Invalid authorisation token', 400);
    }
    req.id = admin.id;
  });
  next();
};

const getAdmin = async (req, res) => {
  const adminId = req.id;
  let admin;
  try {
    admin = await Admin.findById(adminId, '-password');
    if (!admin) {
      return sendError(res, 'Admin data not found');
    }
    return sendSuccess(res, 'successfully fetched admin data', admin);
  } catch (err) {
    return sendError(res, err.message);
  }
};

const logoutAdmin = (req, res, next) => {
  console.log('Logout api called');
  const cookies = req.headers.cookie;
  if (!cookies) {
    return sendError(res, 'No cookie found', 205);
  }
  const token = cookies.split('=')[1];
  if (!token) {
    return sendError(res, 'No token found', 205);
  }
  jwt.verify(String(token), process.env.JWT_ADMIN_SECRET_KEY, (err, admin) => {
    if (err) {
      return sendError(res, 'Invalid Token', 400);
      // return res.status(400).json({ message: "Invalid Token" })
    }
    res.clearCookie(`${admin.id}`);
    req.cookies[`${admin.id}`] = '';
    return res.status(200).json({ success: true, message: 'Successfully logged out' });
  });
};

module.exports = {
  getWalletAddress,
  updateWalletAddress,

  forgotPassword,
  resetPassword,

  loginAdmin,

  isAdminLogin,
  verifyAdminLoginToken,

  getAdmin,
  adminUpdateProfile,

  logoutAdmin,
};
