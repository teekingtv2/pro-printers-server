const express = require('express');
const {
  fetchAllDonations,
  fetchSingleDonation,
  deleteDonation,
  fetchAllContacts,
  fetchSingleContact,
  deleteContact,
} = require('../../controllers/admin/admin-general-controller');
const { verifyAdminLoginToken } = require('../../controllers/admin/admin-auth-controller');

const router = express.Router();

router.get('/all-donations', verifyAdminLoginToken, fetchAllDonations);
router.get('/single-donation/:id', verifyAdminLoginToken, fetchSingleDonation);
router.delete('/delete-donation/:id', verifyAdminLoginToken, deleteDonation);
router.get('/all-contacts', verifyAdminLoginToken, fetchAllContacts);
router.get('/single-contact/:id', verifyAdminLoginToken, fetchSingleContact);
router.delete('/delete-contact/:id', verifyAdminLoginToken, deleteContact);

module.exports = router;
