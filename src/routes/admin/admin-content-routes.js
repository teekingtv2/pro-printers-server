const express = require('express');
const { verifyAdminLoginToken } = require('../../controllers/admin/admin-auth-controller');
const { validateAddPost } = require('../../middlewares/validator');
const {
  addPost,
  editPost,
  deletePost,
} = require('../../controllers/admin/admin-content-controller');
const { postImageUpload } = require('../../utils/helpers/files');

const router = express.Router();

router.post('/add-new-post', verifyAdminLoginToken, validateAddPost, postImageUpload, addPost);
router.put('/edit-post/:id', verifyAdminLoginToken, editPost);
router.delete('/delete-post/:id', verifyAdminLoginToken, deletePost);

module.exports = router;
