const VerificationToken = require('../../models/user/VerificationToken');
const bcrypt = require('bcryptjs');
const { sendError, generateOTP, sendSuccess, badRequestError } = require('../../utils/helpers');
const Admin = require('../../models/admin/Admin');
const { log } = require('console');

const addAdmin = async (req, res, next) => {
  const { first_name, last_name, email, phone, role, username } = req.body;

  const password = process.env.ADMIN_PASSWORD;
  log('password:', password);

  const hashedPassword = bcrypt.hashSync(password);
  const admin = new Admin({
    first_name,
    last_name,
    email,
    phone,
    role,
    username,
    password: hashedPassword,
  });

  try {
    await admin.save();
    console.log('Admin successfully added');
    return sendSuccess(res, 'New admin has been successfully added.', { admin });
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to sign up');
  }
};

const updateAdminProfile = async (req, res) => {
  if (req.body.password) {
    req.body.password = bcrypt.hashSync(req.body.password);
  }
  try {
    const savedAdminProfile = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'Successfully updated the admin profile',
      data: savedAdminProfile,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to update the admin profile');
  }
};

const deleteAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Successfully deleted the admin profile',
    });
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to delete the admin profile');
  }
};

const fetchAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().limit(req.query.limit);
    return res.status(200).json({ success: true, data: admins });
  } catch (error) {
    console.log(error);
    return sendError(res, 'Unable to fetch the admins data');
  }
};

const fetchSingleAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id, '-password');
    if (!admin) {
      return sendError(res, 'Admin data does not exist');
    }
    return res.status(200).json({ success: true, data: admin });
  } catch (error) {
    return sendError(res, 'Unable to fetch the admin profile data');
  }
};

module.exports = {
  addAdmin,
  updateAdminProfile,
  deleteAdmin,
  fetchAllAdmins,
  fetchSingleAdmin,
};
