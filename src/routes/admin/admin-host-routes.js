const express = require('express');
const { verifyAdminLoginToken } = require('../../controllers/admin/admin-auth-controller');
const {
  updateHostProfile,
  deleteHost,
  fetchAllHosts,
  fetchSingleHost,
  blockHost,
  unblockHost,
} = require('../../controllers/admin/admin-host-controller');

const router = express.Router();

router.put('/update-host-profile/:id', verifyAdminLoginToken, updateHostProfile);
router.put('/block-host/:id', verifyAdminLoginToken, blockHost);
router.put('/unblock-host/:id', verifyAdminLoginToken, unblockHost);
router.delete('/delete-host/:id', verifyAdminLoginToken, deleteHost);
router.get('/fetch-all-hosts', verifyAdminLoginToken, fetchAllHosts);
router.get('/fetch-single-host/:id', verifyAdminLoginToken, fetchSingleHost);

module.exports = router;
