const express = require('express');
const userController = require('./../controllers/userController');

const router = express.Router();

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
} = userController;
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
