const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getMe,
  deleteMe,
  updateMe,
  uploadUserPhoto,
  resizeUserPhoto
} = userController;

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protects all routes after this middleware
router.use(authController.protect);

router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);
router.patch('/updateMyPassword', authController.updatePassword);

// Restricts all routes after this middleware to the admin only
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
