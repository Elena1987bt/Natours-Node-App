const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');
const { getAllTours, createTour, getTour, updateTour, deleteTour, middleware } =
  tourController;
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
router.route('/').get(getAllTours).post(middleware, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
