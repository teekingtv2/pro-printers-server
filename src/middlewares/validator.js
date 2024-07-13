const { check, validationResult } = require('express-validator');

// User
exports.validateRegisterMemberParams = [
  check('title').trim().not().isEmpty().withMessage('Title is missing!'),
  check('first_name').trim().not().isEmpty().withMessage('First name is missing!'),
  check('last_name').trim().not().isEmpty().withMessage('last name is missing!'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('phone').trim().not().isEmpty().withMessage('Phone number is missing!'),
  check('address').trim().not().isEmpty().withMessage('address is missing!'),
  check('city').trim().not().isEmpty().withMessage('city is missing!'),
  check('state').trim().not().isEmpty().withMessage('state is missing!'),
  check('zip_code').trim().not().isEmpty().withMessage('zip code is missing!'),
  check('country').trim().not().isEmpty().withMessage('Where are you located?'),
  check('info').trim().not().isEmpty().withMessage('Tell us something about yourself'),
];

exports.validateDonateParams = [
  check('first_name').trim().not().isEmpty().withMessage('First name is missing!'),
  check('last_name').trim().not().isEmpty().withMessage('last name is missing!'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('phone').trim().not().isEmpty().withMessage('Phone number is missing!'),
  check('address').trim().not().isEmpty().withMessage('address is missing!'),
  check('amount').trim().not().isEmpty().withMessage('amount is missing!'),
];
exports.validateContactParams = [
  check('first_name').trim().not().isEmpty().withMessage('First name is missing!'),
  check('last_name').trim().not().isEmpty().withMessage('last name is missing!'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('phone').trim().not().isEmpty().withMessage('Phone number is missing!'),
  check('address').trim().not().isEmpty().withMessage('address is missing!'),
  check('question').trim().not().isEmpty().withMessage('what is this query about?'),
];

// Admin Dashboard
exports.validateAdmin = [
  check('email').isEmail().withMessage('Email is invalid'),
  check('username').trim().not().isEmpty().withMessage('Admin username is missing!'),
  check('password').trim().not().isEmpty().withMessage('Admin password is missing!'),
];

exports.validateUpdatePasswordParams = [
  check('oldPassword').trim().not().isEmpty().withMessage('Old Password is missing!'),
  check('newPassword')
    .trim()
    .not()
    .isEmpty()
    .withMessage('New Password is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Password must be between 8 and 20 characters long'),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();
  res.status(206).json({ success: false, error: error[0].msg });
};
