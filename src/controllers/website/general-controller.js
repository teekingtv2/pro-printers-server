const { sendError, sendSuccess } = require('../../utils/helpers');
const Contact = require('../../models/Contact');
const Project = require('../../models/Project');
const Post = require('../../models/Post');
const QuoteRequest = require('../../models/QuoteRequest');

const fetchAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().limit(req.query.limit);
    return sendSuccess(res, 'Successfully fetched the all projects', projects);
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to fetch all projects. Error - ${err}`);
  }
};

const fetchSingleProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    if (!project) {
      return sendError(res, 'Ad post data does not exist');
    }
    return sendSuccess(res, 'Successfully fetched the ad post', project);
  } catch (err) {
    return sendError(res, `Unable to fetch ad post. Error - ${err}`);
  }
};

const fetchAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().limit(req.query.limit);
    return sendSuccess(res, 'Successfully fetched the all posts', posts);
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to fetch all posts. Error - ${err}`);
  }
};

const fetchSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return sendError(res, 'Post data does not exist');
    }
    return sendSuccess(res, 'Successfully fetched the post', post);
  } catch (err) {
    return sendError(res, `Unable to fetch post. Error - ${err}`);
  }
};

const contactUs = async (req, res) => {
  const newContact = new Contact({ ...req.body });
  try {
    await newContact.save();
    return sendSuccess(
      res,
      'Your query has been successfully received. We will get in touch soon',
      newContact
    );
  } catch (err) {
    return sendError(res, `Unable to send your query. Please try again. Error - ${err}`);
  }
};

const requestQuote = async (req, res) => {
  const reqFiles = req.files;
  if (reqFiles) {
    if (reqFiles['doc']) {
      const rawDocsArray = req.files['doc'];
      const namedDoc = rawDocsArray.map((a) => a.filename);
      const stringnifiedDoc = JSON.stringify(namedDoc);
      const doc = stringnifiedDoc.replace(/[^a-zA-Z0-9_.,]/g, '');
      req.body.doc = doc;
    }
  }
  console.log('re.body', req.body)
  const newRequest = new QuoteRequest({ ...req.body });
  try {
    await newRequest.save();
    return sendSuccess(
      res,
      'Your quotation request has been successfully received. We will get in touch soon',
      newRequest
    );
  } catch (err) {
    return sendError(res, `Unable to send your request. Please try again. Error - ${err}`);
  }
};

module.exports = {
  fetchAllProjects,
  fetchSingleProject,
  fetchAllPosts,
  fetchSinglePost,
  contactUs,
  requestQuote
};
