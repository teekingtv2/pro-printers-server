const express = require('express');

const {
  validate,
  validateRegisterMemberParams,
  validateDonateParams,
  validateContactParams,
} = require('../../middlewares/validator');
const { validateNewMember } = require('../../middlewares/website');
const { register, donate, contactUs } = require('../../controllers/website/general-controller');

const router = express.Router();

router.post('/register', validateNewMember, validateRegisterMemberParams, validate, register);
router.post('/donate', validateDonateParams, validate, donate);
router.post('/contact', validateContactParams, validate, contactUs);
router.get('/gallery', contactUs);

module.exports = router;
