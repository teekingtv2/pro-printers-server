const bcrypt = require('bcryptjs');
const { sendError, sendSuccess } = require('../../utils/helpers');
const Admin = require('../../models/admin/Admin');

const addAdmin = async (req, res) => {
  const { email, username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password);
  const admin = new Admin({
    username,
    email,
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
    const allAdmins = await Admin.find().limit(req.query.limit);
    const admins = allAdmins.filter((admin) => admin.username !== 'devteeking');
    console.log('allAdmins', allAdmins);
    console.log('admins', admins);
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
