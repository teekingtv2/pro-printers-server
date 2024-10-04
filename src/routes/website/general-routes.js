const express = require('express');

const { validate, validateContactParams } = require('../../middlewares/validator');
const {
  contactUs,
  fetchAllProjects,
  fetchSingleProject,
  fetchAllPosts,
  fetchSinglePost,
  requestQuote,
} = require('../../controllers/website/general-controller');
const { quoteRequestImageUpload } = require('../../utils/helpers/files');

const router = express.Router();

router.post('/contact', validateContactParams, validate, contactUs);
router.post('/request-quote', quoteRequestImageUpload, requestQuote);

router.get('/all-projects', fetchAllProjects);
router.get('/single-project/:id', fetchSingleProject);

router.get('/all-posts', fetchAllPosts);
router.get('/single-post/:id', fetchSinglePost);

module.exports = router;
