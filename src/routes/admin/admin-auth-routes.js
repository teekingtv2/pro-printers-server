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
  adminUpdateProfile,
  getWalletAddress,
  updateWalletAddress,
} = require('../../controllers/admin/admin-auth-controller');
const { resetPasswordEmail, passwordUpdatedEmail } = require('../../services/emailServices');
const { validateUpdateWallet, validate } = require('../../middlewares/validator');

const router = express.Router();

router.get('/get-wallet-address', getWalletAddress);
router.put(
  '/update-wallet-address/:id',
  verifyAdminLoginToken,
  validateUpdateWallet,
  validate,
  updateWalletAddress
);

router.post('/forgot-password', forgotPassword, resetPasswordEmail);
router.post('/reset-password', isAdminPasswordResetTokenValid, resetPassword, passwordUpdatedEmail);
router.post('/login', validateAdminLoginType, loginAdmin);

router.get('/get-admin', verifyAdminLoginToken, getAdmin);
router.put('/edit-profile', verifyAdminLoginToken, adminUpdateProfile);

router.get('/check-session', isAdminLogin);
router.post('/logout', logoutAdmin);

module.exports = router;
