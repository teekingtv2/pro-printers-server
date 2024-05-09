const express = require('express');

const { passwordUpdatedEmail, profileUpdatedEmail } = require('../../services/emailServices');
const { verifyHostLoginToken } = require('../../controllers/website/host-auth-controller');
const {
  getHost,
  updateHostProfile,
  updateHostPassword,
  logoutHost,
  isHostLogin,
  setHostProfileAvatar,
} = require('../../controllers/host/host-profile-controller');
const {
  validateHostUpdateProfileParams,
  validate,
  validateUpdatePasswordParams,
} = require('../../middlewares/validator');
const { hostImageUpload } = require('../../utils/helpers/files');

const router = express.Router();

// Profile
router.get('/profile', verifyHostLoginToken, getHost);
router.put(
  '/update-profile',
  verifyHostLoginToken,
  validateHostUpdateProfileParams,
  validate,
  updateHostProfile
);
router.put(
  '/update-profile-avatar/:id',
  verifyHostLoginToken,
  hostImageUpload,
  setHostProfileAvatar
);

router.put(
  '/update-password',
  verifyHostLoginToken,
  validateUpdatePasswordParams,
  validate,
  updateHostPassword,
  passwordUpdatedEmail
);

router.get('/check-session', isHostLogin);
router.post('/logout', logoutHost);

module.exports = router;
