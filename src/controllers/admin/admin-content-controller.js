const { sendError, sendSuccess } = require('../../utils/helpers');
const { log } = require('console');
const Content = require('../../models/content/Content');

const addPost = async (req, res) => {
  const adminId = req.id;
  const rawImagesArray = req.files['cover_image'];
  const namedImage = rawImagesArray.map((a) => a.filename);
  const stringnifiedImages = JSON.stringify(namedImage);
  const formmatedImages = stringnifiedImages.replace(/[^a-zA-Z0-9_.,]/g, '');
  const cover_image = formmatedImages.replace(/[,]/g, ', ');
  const { title, content, author, category, post_status } = req.body;
  console.log('cover_image: ', cover_image);

  const newPost = new Content({
    title,
    content,
    author,
    category,
    cover_image,
    post_status,
    published_by: adminId,
  });
  try {
    await newPost.save();
    return sendSuccess(res, 'The post has been successfully published', newPost);
  } catch (err) {
    return sendError(res, 'Unable to save the post to the databse', 500);
  }
};

const editPost = async (req, res) => {
  try {
    const savedPost = await Content.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return sendSuccess(res, 'Successfully updated the post', savedPost);
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to update the post');
  }
};

const deletePost = async (req, res) => {
  try {
    await Content.findByIdAndDelete(req.params.id);
    return sendSuccess(res, 'Successfully deleted the post');
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to delete the admin profile');
  }
};

module.exports = {
  addPost,
  editPost,
  deletePost,
};
