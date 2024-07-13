const { sendError, sendSuccess } = require('../../utils/helpers');
const Member = require('../../models/Member');
const Donation = require('../../models/Donation');
const Contact = require('../../models/Contact');

const register = async (req, res, next) => {
  const {
    title,
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    state,
    zip_code,
    country,
    info,
  } = req.body;

  const newMember = new Member({
    title,
    first_name,
    last_name,
    email,
    phone,
    address,
    city,
    state,
    zip_code,
    country,
    info,
  });
  try {
    await newMember.save();
    req.body = { newMember };
    next();
  } catch (err) {
    return sendError(
      res,
      `Unable to create the membr record onto our database. Please try again. Error - ${err}`
    );
  }
};

const donate = async (req, res) => {
  const { first_name, last_name, email, phone, address, amount } = req.body;

  const newDonation = new Donation({
    first_name,
    last_name,
    email,
    phone,
    address,
    amount,
  });
  try {
    await newDonation.save();
    return sendSuccess(
      res,
      'Your donation has been successfuy received with masive thanks. We will get in touch soon',
      newDonation
    );
  } catch (err) {
    return sendError(
      res,
      `Unable to store the donation record on the database, but it has been successfully receive with thanks. Error - ${err}`
    );
  }
};

const contactUs = async (req, res) => {
  const { first_name, last_name, email, phone, address, question } = req.body;

  const newContact = new Contact({
    first_name,
    last_name,
    email,
    phone,
    address,
    question,
  });
  try {
    await newContact.save();
    return sendSuccess(
      res,
      'Your query has been successfuy received. We will get in touch soon',
      newContact
    );
  } catch (err) {
    return sendError(res, `Unable to send your query. Please try again. Error - ${err}`);
  }
};

module.exports = {
  register,
  donate,
  contactUs,
};
