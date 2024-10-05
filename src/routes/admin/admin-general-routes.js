const express = require('express');
const {
  addPost,
  addProject,
  updatePost,
  updateProject,
  deletePost,
  deleteProject,
  fetchAllContacts,
  fetchSingleContact,
  deleteContact,
  deleteQuoteRequest,
  fetchSingleQuoteRequest,
  fetchQuoteRequests,
} = require('../../controllers/admin/admin-general-controller');
const { verifyAdminLoginToken } = require('../../controllers/admin/admin-auth-controller');
const {
  validateAddPostParams,
  validate,
  validateAddProjectParams,
} = require('../../middlewares/validator');
const {
  fetchAllProjects,
  fetchSingleProject,
  fetchAllPosts,
  fetchSinglePost,
} = require('../../controllers/website/general-controller');
const { projectImageUpload, postImageUpload } = require('../../utils/helpers/files');

const router = express.Router();

router.post('/add-post', verifyAdminLoginToken, postImageUpload, addPost);
router.put('/update-post/:id', verifyAdminLoginToken, postImageUpload, updatePost);
router.delete('/delete-post/:id', verifyAdminLoginToken, deletePost);
router.get('/all-posts', verifyAdminLoginToken, fetchAllPosts);
router.get('/single-post/:id', verifyAdminLoginToken, fetchSinglePost);

router.post(
  '/add-project',
  verifyAdminLoginToken,
  validateAddProjectParams,
  validate,
  projectImageUpload,
  addProject
);
router.put('/update-project/:id', verifyAdminLoginToken, projectImageUpload, updateProject);
router.delete('/delete-project/:id', verifyAdminLoginToken, deleteProject);
router.get('/all-projects', verifyAdminLoginToken, fetchAllProjects);
router.get('/single-project/:id', verifyAdminLoginToken, fetchSingleProject);

router.get('/all-contacts', verifyAdminLoginToken, fetchAllContacts);
router.get('/single-contact/:id', verifyAdminLoginToken, fetchSingleContact);
router.delete('/delete-contact/:id', verifyAdminLoginToken, deleteContact);

router.get('/quote-requests', verifyAdminLoginToken, fetchQuoteRequests);
router.get('/single-request/:id', verifyAdminLoginToken, fetchSingleQuoteRequest);
router.delete('/delete-request/:id', verifyAdminLoginToken, deleteQuoteRequest);

module.exports = router;
