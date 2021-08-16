const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

// UPDATE ME
exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2.  Filtered out unwanted fields names that are not allowed to be updated
  const filterBody = filterObj(req.body, 'name', 'email');
  // 3. Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({ status: 'success', data: { user: updatedUser } });
});

// DELETE ME
exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({ status: 'success', data: null });
});

exports.getUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not handled yet!' });
};

exports.updateUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not handled yet!' });
};
exports.deleteUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not handled yet!' });
};
exports.createUser = (req, res) => {
  res
    .status(500)
    .json({ status: 'err', message: 'This route is not handled yet!' });
};
