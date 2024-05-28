const express = require('express');
const {
  fetchAllAdposts,
  fetchSingleAdPost,
  createdAd,
  updateAdPost,
  deleteAdPost,
  fetchAdPostBySlug,
} = require('../../controllers/admin/general-controller');
const { verifyAdminLoginToken } = require('../../controllers/admin/admin-auth-controller');
const { validateAddAdPost, validate } = require('../../middlewares/validator');

const router = express.Router();

router.post('/create-ad-post', verifyAdminLoginToken, validateAddAdPost, validate, createdAd);
router.put('/update-ad-post/:id', verifyAdminLoginToken, updateAdPost);
router.delete('/delete-ad-post/:id', verifyAdminLoginToken, deleteAdPost);
router.get('/all-ad-posts', fetchAllAdposts);
router.get('/single-ad-post/:id', fetchSingleAdPost);
router.get('/fetch-ad-post/:slug', fetchAdPostBySlug);

module.exports = router;
