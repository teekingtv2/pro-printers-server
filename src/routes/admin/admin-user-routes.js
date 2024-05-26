const express = require('express');
const { verifyAdminLoginToken } = require('../../controllers/admin/admin-auth-controller');
const {
  updateUserProfile,
  deleteUser,
  fetchAllUsers,
  fetchSingleUser,
  blockUser,
  unblockUser,
  addTransactionRecord,
  updateTransactionRecord,
  deleteTransactionRecord,
  updateUserBalance,
  fetchAllUserTransactions,
  fetchSingleTransaction,
} = require('../../controllers/admin/admin-user-controller');
const {
  validateAddTransaction,
  validate,
  validateUpdateUserBalance,
} = require('../../middlewares/validator');

const router = express.Router();

router.put('/update-user-profile/:id', verifyAdminLoginToken, updateUserProfile);
router.put('/block-user/:id', verifyAdminLoginToken, blockUser);
router.put('/unblock-user/:id', verifyAdminLoginToken, unblockUser);

router.delete('/delete-user/:id', verifyAdminLoginToken, deleteUser);
router.get('/fetch-all-users', verifyAdminLoginToken, fetchAllUsers);
router.get('/fetch-single-user/:id', verifyAdminLoginToken, fetchSingleUser);

router.post(
  '/add-transaction/:id',
  verifyAdminLoginToken,
  validateAddTransaction,
  validate,
  addTransactionRecord
);
router.put('/edit-transaction/:id', verifyAdminLoginToken, updateTransactionRecord);
router.delete('/delete-transaction/:id', verifyAdminLoginToken, deleteTransactionRecord);
router.put(
  '/edit-user-balance/:id',
  verifyAdminLoginToken,
  validateUpdateUserBalance,
  validate,
  updateUserBalance
);
router.get('/fetch-all-transactions', verifyAdminLoginToken, fetchAllUserTransactions);
router.get('/fetch-single-transaction/:id', verifyAdminLoginToken, fetchSingleTransaction);

module.exports = router;
