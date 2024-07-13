const express = require('express');
const { verifyAdminLoginToken } = require('../../controllers/admin/admin-auth-controller');
const {
  activateMember,
  pendMember,
  deleteMember,
  fetchAllMembers,
  fetchSingleMember,
  updateMember,
} = require('../../controllers/admin/admin-member-controller');

const router = express.Router();

router.put('/activate-member/:id', verifyAdminLoginToken, activateMember);
router.put('/pend-member/:id', verifyAdminLoginToken, pendMember);
router.put('/update-member/:id', verifyAdminLoginToken, updateMember);

router.delete('/delete-member/:id', verifyAdminLoginToken, deleteMember);
router.get('/fetch-all-members', verifyAdminLoginToken, fetchAllMembers);
router.get('/fetch-single-member/:id', verifyAdminLoginToken, fetchSingleMember);

module.exports = router;
