const { sendError, sendSuccess, badRequestError } = require('../../utils/helpers');
const { log } = require('console');
const Member = require('../../models/Member');

const activateMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return badRequestError(res, 'Unable to verify user details');
    }
    if (member.status === 'Blocked') {
      return badRequestError(
        res,
        `${member.first_name} ${member.last_name} is already an active member`
      );
    }
    member.status = 'Active';
    await member.save();
    return sendSuccess(
      res,
      `${member.first_name} ${member.last_name} has been set as an active member`
    );
  } catch (err) {
    log(err);
    return sendError(res, 'Unable to set the user as active');
  }
};

const pendMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return badRequestError(res, 'Unable to verify member details');
    }
    if (member.status === 'Pending') {
      return badRequestError(
        res,
        `${member.first_name} ${member.last_name}'s account is not active`
      );
    }
    member.status = 'Pending';
    await member.save();
    return sendSuccess(res, `${member.first_name} ${member.last_name} is no more active`);
  } catch (err) {
    log(err);
    return sendError(res, 'Unable to block the user account');
  }
};

const deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Successfully deleted the member profile',
    });
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to delete the member profile');
  }
};

const fetchAllMembers = async (req, res) => {
  try {
    const members = await Member.find().limit(req.query.limit);
    return res.status(200).json({ success: true, data: members });
  } catch (error) {
    return sendError(res, 'Unable to fetch the members data');
  }
};

const fetchSingleMember = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findById(id);
    if (!member) {
      return sendError(res, 'User profile does not exist');
    }
    return res.status(200).json({ success: true, data: member });
  } catch (error) {
    return sendError(res, 'Unable to fetch the user profile data');
  }
};

const updateMember = async (req, res) => {
  try {
    const savedMember = await Member.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return sendSuccess(res, 'Successfully updated the member profile', savedMember);
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to update the member profile. Error - ${err}`);
  }
};

module.exports = {
  activateMember,
  pendMember,
  deleteMember,
  fetchAllMembers,
  fetchSingleMember,
  updateMember,
};
