const { check, validationResult } = require('express-validator');

//
// Website
//
exports.validateFlightOfferSearch = [
  check('origin').trim().not().isEmpty().withMessage('Where are you flying from?'),
  check('destination').trim().not().isEmpty().withMessage('Where are you flying to?'),
  check('departure_date').trim().not().isEmpty().withMessage('Provide the travel date'),
  check('adults').trim().not().isEmpty().withMessage('How many adults are flying?'),
  check('children').trim().not().isEmpty().withMessage('How many children are flying?'),
  check('infants').trim().not().isEmpty().withMessage('How many infants are flying?'),
  check('cabin').trim().not().isEmpty().withMessage('Select flight class. E.g: economy'),
];

exports.validateContactUsParams = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is missing!')
    .isLength({ min: 3, max: 30 })
    .withMessage('Valid name can only be between 3 and 30 characters long'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('subject')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Subject is missing. Why are you messaging us?'),
  check('company')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Company/Brand is missing. Tell us your Brand or Company name'),
  check('message').trim().not().isEmpty().withMessage('Message content is missing.'),
];

exports.validateSubscriptionParams = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is missing!')
    .isLength({ min: 3, max: 30 })
    .withMessage('Valid name can only be between 3 and 30 characters long'),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Your email address is missing!')
    .isEmail()
    .withMessage('Invalid email address provided'),
  check('phone').trim().not().isEmpty().withMessage('Phone number is missing.'),
  check('country').trim().not().isEmpty().withMessage('Where are you from?'),
];

// User
exports.validateUserSignupParams = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Your full name is missing!')
    .isLength({ min: 6, max: 40 })
    .withMessage('Name must be between 6 and 40 characters'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('wallet').trim().not().isEmpty().withMessage('Wallet address is missing!'),
  check('network').trim().not().isEmpty().withMessage('Chain network is missing!'),
  check('country').trim().not().isEmpty().withMessage('Where are you located?'),
  check('phone').trim().not().isEmpty().withMessage('Phone number is missing!'),
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty'),
];
exports.validateUpdateProfileUserParams = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Your full name is missing!')
    .isLength({ min: 6, max: 40 })
    .withMessage('Name must be between 6 and 40 characters'),
  check('wallet').trim().not().isEmpty().withMessage('Wallet address is missing!'),
  check('network').trim().not().isEmpty().withMessage('Chain network is missing!'),
  check('country').trim().not().isEmpty().withMessage('Where are you located?'),
  check('phone').trim().not().isEmpty().withMessage('Phone number is missing!'),
];
exports.validateUpdateEmailAlertUserParams = [
  check('priceAlert').trim().not().isEmpty().withMessage('Price Alert value is missing!'),
  check('travelAlert').trim().not().isEmpty().withMessage('Travel Alert value is missing!'),
];

// Admin Dashboard
exports.validateAdmin = [
  check('first_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First Name is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('First Name must be between 3 and 20 characters'),
  check('last_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last Name is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Last Name must be between 3 and 20 characters'),
  check('email').isEmail().withMessage('Email is invalid'),
  check('phone').trim().not().isEmpty().withMessage('Phone Number is missing!'),
  check('role').trim().not().isEmpty().withMessage('Admin Role is missing!'),
  check('username').trim().not().isEmpty().withMessage('Admin Username is missing!'),
];

exports.validateAddJob = [
  check('title').trim().not().isEmpty().withMessage('Job title is missing!'),
  check('location').trim().not().isEmpty().withMessage('Job location is missing!'),
  check('type').trim().not().isEmpty().withMessage('Employment type is missing!'),
  check('title').trim().not().isEmpty().withMessage('Job title is missing!'),
  check('description').trim().not().isEmpty().withMessage('Job description is missing!'),
  check('requirements').trim().not().isEmpty().withMessage('Job requirements is missing!'),
  check('salary').trim().not().isEmpty().withMessage('Job base salary is missing!'),
];

exports.validateAddPost = [
  check('title').trim().not().isEmpty().withMessage('Post title is missing!'),
  check('content').trim().not().isEmpty().withMessage('Post content is missing!'),
  check('author').trim().not().isEmpty().withMessage('Post author is missing!'),
  check('category').trim().not().isEmpty().withMessage('Post category is missing!'),
  check('post_status').trim().not().isEmpty().withMessage('Post status is missing!'),
];

// Host dashboard
exports.validateAddPropertyParams = [
  check('hotel_name').trim().not().isEmpty().withMessage('Kindly provide your hotel name!'),
  check('country').trim().not().isEmpty().withMessage('Where is your hotel located?'),
  check('state').trim().not().isEmpty().withMessage('Which state is your hotel located?'),
  check('city').trim().not().isEmpty().withMessage('In which city is your hotel located?'),
  check('lga')
    .trim()
    .not()
    .isEmpty()
    .withMessage('In which local government area is your hotel located?'),
  check('postal_code')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Kindly provide the location postal code?'),
  check('hotel_address')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Kindly provide the full address of the hotel'),
  check('hotel_email').isEmail().withMessage('Hotel Email is invalid'),
  check('hotel_phone').trim().not().isEmpty().withMessage('Hotel Phone Number is missing!'),
  check('contact_first_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First Name is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('First Name must be between 3 and 20 characters'),
  check('contact_last_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last Name is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Last Name must be between 3 and 20 characters'),
  check('contact_email').isEmail().withMessage('Contact Email is invalid'),
  check('contact_phone').trim().not().isEmpty().withMessage('Contact Phone Number is missing!'),
  check('password').trim().not().isEmpty().withMessage('Password cannot be empty'),
];
exports.validateHostUpdateProfileParams = [
  check('first_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('First Name is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('First Name must be between 3 and 20 characters'),
  check('last_name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Last Name is missing!')
    .isLength({ min: 3, max: 20 })
    .withMessage('Last Name must be between 3 and 20 characters'),
  check('phone').trim().not().isEmpty().withMessage('Contact Phone Number is missing!'),
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
  res.status(400).json({ success: false, error: error[0].msg });
};
