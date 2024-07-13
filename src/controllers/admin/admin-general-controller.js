const { sendError, sendSuccess } = require('../../utils/helpers');
const Donation = require('../../models/Donation');
const Contact = require('../../models/Contact');

const fetchAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().limit(req.query.limit);
    return sendSuccess(res, 'Successfully fetched the all donations', donations);
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to fetch all donations. Error - ${err}`);
  }
};

const fetchSingleDonation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findById(id);
    if (!donation) {
      return sendError(res, 'Ad post data does not exist');
    }
    return sendSuccess(res, 'Successfully fetched the ad post', donation);
  } catch (err) {
    return sendError(res, `Unable to fetch ad post. Error - ${err}`);
  }
};

const deleteDonation = async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    return sendSuccess(res, 'Successfully deleted the ad post');
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to delete the ad post. Error - ${err}`);
  }
};

const fetchAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().limit(req.query.limit);
    return sendSuccess(res, 'Successfully fetched the all contact messages', contacts);
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to fetch all contact messages. Error - ${err}`);
  }
};

const fetchSingleContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return sendError(res, 'Ad post data does not exist');
    }
    return sendSuccess(res, 'Successfully fetched the ad post', contact);
  } catch (err) {
    return sendError(res, `Unable to fetch ad post. Error - ${err}`);
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    return sendSuccess(res, 'Successfully deleted the contact post');
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to delete the contact post. Error - ${err}`);
  }
};

module.exports = {
  fetchAllDonations,
  fetchSingleDonation,
  deleteDonation,
  fetchAllContacts,
  fetchSingleContact,
  deleteContact,
};
