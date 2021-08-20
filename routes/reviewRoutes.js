const express = require('express');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  getReview
} = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

// GET /tours/234fad4/reviews
// POST /tours/234fad4/reviews
// POST /reviews
const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router
  .route('/')
  .get(getAllReviews)
  .post(authController.restrictTo('user'), createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(authController.restrictTo('user', 'admin'), updateReview)
  .delete(authController.restrictTo('user', 'admin'), deleteReview);

module.exports = router;
