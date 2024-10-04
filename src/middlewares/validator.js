const { check, validationResult } = require('express-validator');

// User
exports.validateAddPostParams = [
  check('title').trim().not().isEmpty().withMessage('Post title is missing!'),
  check('category').trim().not().isEmpty().withMessage('Post category is missing!'),
  check('content').trim().not().isEmpty().withMessage('Post content is missing!'),
];

exports.validateAddProjectParams = [
  check('title').trim().not().isEmpty().withMessage('Project title is missing!'),
  check('description').trim().not().isEmpty().withMessage('Project description is missing!'),
];

exports.validateContactParams = [
  check('first_name').trim().not().isEmpty().withMessage('First name is missing!'),
  check('last_name').trim().not().isEmpty().withMessage('last name is missing!'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('phone').trim().not().isEmpty().withMessage('Phone number is missing!'),
  check('message').trim().not().isEmpty().withMessage('what is this query about?'),
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
