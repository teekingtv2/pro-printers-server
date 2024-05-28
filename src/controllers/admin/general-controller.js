const { sendError, sendSuccess, generateSlug } = require('../../utils/helpers');
const Ad = require('../../models/admin/Ad');

const createdAd = async (req, res) => {
  const { whatsapp, telegram, title, content } = req.body;
  const slug = generateSlug(title);

  const newAd = new Ad({
    title,
    whatsapp,
    telegram,
    slug,
    content,
  });
  try {
    await newAd.save();
    return sendSuccess(res, 'Successfully posted a new add', newAd);
  } catch (err) {
    return sendError(res, `Unable to create the ad post data. Error - ${err}`);
  }
};

const updateAdPost = async (req, res) => {
  try {
    const savedAdPost = await Ad.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return sendSuccess(res, 'Successfully updated the ad apost', savedAdPost);
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to update the ad post. Error - ${err}`);
  }
};

const deleteAdPost = async (req, res) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    return sendSuccess(res, 'Successfully deleted the ad post');
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to delete the ad post. Error - ${err}`);
  }
};

const fetchAllAdposts = async (req, res) => {
  try {
    const adPosts = await Ad.find().limit(req.query.limit);
    return sendSuccess(res, 'Successfully fetched the ad posts', adPosts);
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to fetch ad posts. Error - ${err}`);
  }
};

const fetchSingleAdPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const adPost = await Ad.findById(id);
    if (!adPost) {
      return sendError(res, 'Ad post data does not exist');
    }
    return sendSuccess(res, 'Successfully fetched the ad post', adPost);
  } catch (err) {
    return sendError(res, `Unable to fetch ad post. Error - ${err}`);
  }
};

const fetchAdPostBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const adPost = await Ad.findOne({ slug: slug });
    if (!adPost) {
      return sendError(res, 'Ad post data does not exist');
    }
    return sendSuccess(res, 'Successfully fetched the ad post', adPost);
  } catch (err) {
    return sendError(res, `Unable to fetch ad post. Error - ${err}`);
  }
};

module.exports = {
  createdAd,
  updateAdPost,
  fetchSingleAdPost,
  fetchAllAdposts,
  deleteAdPost,
  fetchAdPostBySlug,
};
