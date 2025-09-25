const Payment = require('../models/paymentModel');
const RegisteredUser = require('../models/registeredUserModel');
const userModel = require('../models/userModel');
const PaymentCategory = require('../models/paymentCategoryModel');
const { sendResponse } = require('../utils/sendResponse');
const { STATUS } = require('../constant/statusCodes');

const users = async (req, res, next) => {
  try {
    // Pagination params
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // For total count (for pagination)
    const totalUsers = await userModel.countDocuments({ role: 'user' });

    // Paginated fetch
    const usersData = await userModel
      .find({ role: 'user' })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // For each user, look up their registrationData
    const merged = await Promise.all(
      usersData.map(async (user) => {
        const registrationData = await RegisteredUser.findOne({ user: user._id }).lean();
        return {
          ...user.toObject(),
          registrationData: registrationData || null,
        };
      })
    );

    // Respond with paginated format
    res.json({
      users: merged,
      pagination: {
        currentPage: page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return next(new AppError('User not found', STATUS.NOT_FOUND));
    }

    sendResponse(res, STATUS.OK, 'User deleted successfully');
  } catch (error) {
    next(error);
  }
};

const get_payment_status = async (req, res, next) => {
  try {
    let { page = 1, limit = 10, status, from, to, user } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (status) filter.status = status;
    if (user) filter.user = user;
    if (from || to) filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);

    // Count total payments matching the filter
    const totalPayments = await Payment.countDocuments(filter);

    // Get paginated payments
    const payments = await Payment.find(filter)
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      payments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPayments / limit),
        totalPayments,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new AppError('User not found', STATUS.NOT_FOUND));
    }

    sendResponse(res, STATUS.OK, 'User updated successfully', updatedUser);
  } catch (err) {
    next(err);
  }
};

const getPaymentCategories = async (req, res, next) => {
  try {
    const categories = await PaymentCategory.find().sort({ type: 1, name: 1 });
    sendResponse(res, STATUS.OK, 'Payment categories fetched successfully', { data: categories });
  } catch (error) {
    next(error);
  }
};

const createPaymentCategory = async (req, res, next) => {
  try {
    const { type, feeINR, feeUSD } = req.body;
    if (!type) {
      return next(new AppError('Type is required', STATUS.BAD_REQUEST));
    }
    const newCategory = new PaymentCategory({ type, feeINR, feeUSD });
    await newCategory.save();
    sendResponse(res, STATUS.CREATED, 'Category created successfully', newCategory);
  } catch (error) {
    next(error);
  }
};

const updatePaymentCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedCategory = await PaymentCategory.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedCategory) {
      return next(new AppError('Category not found', STATUS.NOT_FOUND));
    }
    sendResponse(res, STATUS.OK, 'Category updated successfully', updatedCategory);
  } catch (error) {
    next(error);
  }
};

const deletePaymentCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await PaymentCategory.findByIdAndDelete(id);
    if (!deletedCategory) {
      return next(new AppError('Category not found', STATUS.NOT_FOUND));
    }
    sendResponse(res, STATUS.OK, 'Category deleted successfully.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  users,
  deleteUser,
  get_payment_status,
  editUser,
  getPaymentCategories,
  createPaymentCategory,
  updatePaymentCategory,
  deletePaymentCategory,
};
