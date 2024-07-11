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

exports.validateUpdateWallet = [
  check('erc20').trim().not().isEmpty().withMessage('erc20 address is missing!'),
  check('bitcoin').trim().not().isEmpty().withMessage('bitcoin address is missing!'),
];

exports.validateAddTransaction = [
  check('transaction_amount').trim().not().isEmpty().withMessage('transaction amount is missing!'),
  check('wallet_balance').trim().not().isEmpty().withMessage('wallet balance amount is missing!'),
  check('type').trim().not().isEmpty().withMessage('transaction type is missing!'),
];
exports.validateUpdateUserBalance = [
  check('deposite_balance').trim().not().isEmpty().withMessage('deposit balance is missing!'),
  check('profit_balance').trim().not().isEmpty().withMessage('profit balance amount is missing!'),
  check('total_balance').trim().not().isEmpty().withMessage('total balance type is missing!'),
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

exports.validateAddAdPost = [
  check('whatsapp').trim().not().isEmpty().withMessage('Whatsapp channel link is missing!'),
  check('telegram').trim().not().isEmpty().withMessage('Telegram channel link is missing!'),
  check('title').trim().not().isEmpty().withMessage('Ad title is missing!'),
  check('content').trim().not().isEmpty().withMessage('Ad content is missing!'),
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();
  res.status(206).json({ success: false, error: error[0].msg });
};
