const { sendError, sendSuccess, generateSlug } = require('../../utils/helpers');
const Project = require('../../models/Project');
const Post = require('../../models/Post');
const Admin = require('../../models/admin/Admin');
const Contact = require('../../models/Contact');

const addPost = async (req, res) => {
  const adminId = req.id;
  const slug = generateSlug(req.body.title);

  console.log('post req body', req.body);
  console.log('post req files', req.files);

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return sendError(res, `Cannot find logged in admin data.`);
    }
    console.log('admin', admin);
    const rawImagesArray = req.files['cover'];
    if (!rawImagesArray) {
      return sendError(res, 'Please add the cover photo for this post');
    }
    const namedImage = rawImagesArray.map((a) => a.filename);
    const stringnifiedCoverImage = JSON.stringify(namedImage);
    const cover = stringnifiedCoverImage.replace(/[^a-zA-Z0-9_.,]/g, '');
    const { title, category, content } = req.body;
    console.log('cover: ', cover);

    const newPost = new Post({
      title,
      slug,
      category,
      content,
      cover,
      published_by: admin.username,
    });
    try {
      await newPost.save();
      return sendSuccess(res, 'Your post has been successfuy published', newPost);
    } catch (err) {
      return sendError(res, `Unable to publish the new post. Error - ${err}`);
    }
  } catch (error) {
    return sendError(res, `Unable to verify logged in admin. Error - ${err}`);
  }
};

const updatePost = async (req, res) => {
  const reqFiles = req.files;
  if (reqFiles) {
    if (reqFiles['cover']) {
      const rawImagesArray = req.files['cover'];
      const namedImage = rawImagesArray.map((a) => a.filename);
      const stringnifiedCoverImage = JSON.stringify(namedImage);
      const cover = stringnifiedCoverImage.replace(/[^a-zA-Z0-9_.,]/g, '');
      req.body.cover = cover;
    }
  }
  try {
    const savedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return sendSuccess(res, 'Your post has been successfuy updated', savedPost);
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to update the post data');
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return sendSuccess(res, 'Successfully deleted the post');
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to delete the post. Error - ${err}`);
  }
};

const addProject = async (req, res) => {
  const rawCoverArray = req.files['cover'];
  if (!rawCoverArray) {
    return sendError(res, 'Please add the cover photo for this post');
  }
  const rawImagesArray = req.files['images'];
  if (!rawImagesArray) {
    return sendError(res, 'Please add the cover photo for this post');
  }
  const namedCover = rawCoverArray.map((a) => a.filename);
  const stringnifiedCoverCover = JSON.stringify(namedCover);
  const cover = stringnifiedCoverCover.replace(/[^a-zA-Z0-9_.,]/g, '');

  const namedImages = rawImagesArray.map((a) => a.filename);
  const stringnifiedImages = JSON.stringify(namedImages);
  const formmatedImages = stringnifiedImages.replace(/[^a-zA-Z0-9_.,]/g, '');
  const images = formmatedImages.replace(/[,]/g, ', ');
  const { title, description } = req.body;
  console.log('cover: ', cover);
  console.log('images: ', images);

  const newProject = new Project({
    title,
    description,
    cover,
    images,
  });
  try {
    await newProject.save();
    return sendSuccess(res, 'Your project has been successfuy published', newProject);
  } catch (err) {
    return sendError(res, `Unable to publish the new project. Error - ${err}`);
  }
};

const updateProject = async (req, res) => {
  if (req.files['cover']) {
    const namedImage = rawImagesArray.map((a) => a.filename);
    const stringnifiedCoverImage = JSON.stringify(namedImage);
    const cover = stringnifiedCoverImage.replace(/[^a-zA-Z0-9_.,]/g, '');
    req.body.cover = cover;
  }
  if (req.files['images']) {
    const namedImages = rawImagesArray.map((a) => a.filename);
    const stringnifiedImages = JSON.stringify(namedImages);
    const formmatedImages = stringnifiedImages.replace(/[^a-zA-Z0-9_.,]/g, '');
    const images = formmatedImages.replace(/[,]/g, ', ');
    req.body.images = images;
  }
  try {
    const savedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return sendSuccess(res, 'Your project has been successfuy updated', savedProject);
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to update the project data');
  }
};

const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    return sendSuccess(res, 'Successfully deleted the project data');
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to delete the project data. Error - ${err}`);
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
  addPost,
  updatePost,
  deletePost,

  addProject,
  updateProject,
  deleteProject,

  fetchAllContacts,
  fetchSingleContact,
  deleteContact,
};
