const express = require('express');

const router = express.Router();
const tourController = require('../controllers/toursController');
const authController = require('../controllers/authController');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  middleware
} = tourController;
// ROUTES

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.post('/api/v1/tours', createTour);

router.param('id', (req, res, next, val) => {
  console.log(`The id of the tour is ${val}`);
  next();
});

router.route('/top-5-tours').get(aliasTopTours, getAllTours);
router.route('/tours-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, getAllTours)
  .post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour
  );

module.exports = router;
