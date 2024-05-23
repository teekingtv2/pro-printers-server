const express = require('express');
const {
  isAdminPasswordResetTokenValid,
  validateAdminLoginType,
} = require('../../middlewares/admin');
const {
  forgotPassword,
  resetPassword,
  isAdminLogin,
  logoutAdmin,
  loginAdmin,
  verifyAdminLoginToken,
  getAdmin,
} = require('../../controllers/admin/admin-auth-controller');
const {
  emailVerifiedEmail,
  resetPasswordEmail,
  passwordUpdatedEmail,
} = require('../../services/emailServices');

const router = express.Router();

router.post('/forgot-password', forgotPassword, resetPasswordEmail);
router.post('/reset-password', isAdminPasswordResetTokenValid, resetPassword, passwordUpdatedEmail);
router.post('/login', validateAdminLoginType, loginAdmin);

router.get('/get-admin', verifyAdminLoginToken, getAdmin);

router.get('/check-session', isAdminLogin);
router.post('/logout', logoutAdmin);

module.exports = router;
