const bcrypt = require('bcryptjs');
const { sendError, sendSuccess, badRequestError } = require('../../utils/helpers');
const { log } = require('console');
const User = require('../../models/user/User');
const Transaction = require('../../models/user/Transaction');

const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendError(res, 'User profile does not exist');
    }
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password);
    } else {
      req.body.password = user.password;
    }

    const savedUserProfile = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'Successfully updated the user profile',
      data: savedUserProfile,
    });
  } catch (err) {
    log(err);
    return sendError(res, 'Unable to update the user profile');
  }
};

const blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return badRequestError(res, 'Unable to verify user details');
    }
    if (user.status === 'Blocked') {
      return badRequestError(
        res,
        `${user.first_name} ${user.last_name}'s account is already blocked`
      );
    }
    user.status = 'Blocked';
    await user.save();
    return sendSuccess(res, `User ${user.first_name} ${user.last_name} has been blocked`);
  } catch (err) {
    log(err);
    return sendError(res, 'Unable to block the user account');
  }
};

const unblockUser = async (req, res) => {
  let status;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return badRequestError(res, 'Unable to verify user details');
    }
    if (user.status === 'Pending' || user.status === 'Active') {
      return badRequestError(
        res,
        `User ${user.first_name} ${user.last_name}'s account was not blocked`
      );
    }
    if (user.email_verified) {
      status = 'Active';
    } else {
      status = 'Pending';
    }
    user.status = status;
    await user.save();
    return sendSuccess(res, `User ${user.first_name} ${user.last_name} is now active`);
  } catch (err) {
    log(err);
    return sendError(res, 'Unable to block the user account');
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Successfully deleted the user profile',
    });
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to delete the user profile');
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find().limit(req.query.limit);
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return sendError(res, 'Unable to fetch the users data');
  }
};

const fetchSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return sendError(res, 'User profile does not exist');
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return sendError(res, 'Unable to fetch the user profile data');
  }
};

const addTransactionRecord = async (req, res) => {
  let { transaction_amount, wallet_balance, type, profit_amount } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return sendError(re, 'User account does not exist');
    }

    if (!profit_amount) {
      profit_amount = 0;
    }
    const newTransaction = new Transaction({
      owner: id,
      transaction_amount,
      wallet_balance,
      type,
      profit_amount,
      email: user.email,
      name: user.name,
    });

    if (type === 'deposit') {
      user.deposite_balance = Number(user.deposite_balance) + Number(transaction_amount);
      user.total_balance = Number(wallet_balance);
      user.profit_balance = Number(user.profit_balance) + Number(profit_amount);
    } else {
      user.deposite_balance = Number(user.deposite_balance) - Number(transaction_amount);
      user.total_balance = Number(wallet_balance);
      user.profit_balance = Number(user.profit_balance) + Number(profit_amount);
    }

    await user.save();
    await newTransaction.save();
    return sendSuccess(res, 'New transaction record has been successfully added.', {
      newTransaction,
    });
  } catch (err) {
    console.log(err);
    return sendError(res, `Unable to record transaction. Error -${err}`);
  }
};

const updateTransactionRecord = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return sendError(res, 'Transaction record does not exist');
    }
    const savedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: 'Successfully updated the transaction record',
      data: savedTransaction,
    });
  } catch (err) {
    log(err);
    return sendError(res, 'Unable to update the transaction record');
  }
};

const deleteTransactionRecord = async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Successfully deleted the transaction record',
    });
  } catch (err) {
    console.log(err);
    return sendError(res, 'Unable to delete the transaction record');
  }
};

const updateUserBalance = async (req, res) => {
  const { deposite_balance, total_balance, profit_balance } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return sendError(res, 'User record does not exist');
    }
    user.deposite_balance = deposite_balance;
    user.total_balance = total_balance;
    user.profit_balance = profit_balance;
    await user.save();
    return sendSuccess(res, 'Successfully updated the User balance records');
  } catch (err) {
    log(err);
    return sendError(res, 'Unable to update the User balance records');
  }
};

const fetchAllUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().limit(req.query.limit);
    return res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    return sendError(res, `Unable to fetch the transactions data - ${error}`);
  }
};

const fetchSingleTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id);
    if (!transaction) {
      return sendError(res, 'Transaction record does not exist');
    }
    return res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    return sendError(res, `Unable to fetch the transaction record. Error - ${error}`);
  }
};

module.exports = {
  updateUserProfile,
  blockUser,
  unblockUser,
  deleteUser,
  fetchAllUsers,
  fetchSingleUser,

  addTransactionRecord,
  updateTransactionRecord,
  deleteTransactionRecord,
  updateUserBalance,
  fetchAllUserTransactions,
  fetchSingleTransaction,
};
