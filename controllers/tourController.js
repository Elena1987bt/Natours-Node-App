const fs = require('fs');

const dataJson = fs.readFileSync(
  `${__dirname}/../dev-data/data/tours-simple.json`,
  'utf-8'
);

exports.middleware = (req, res, next) => {
  if (req.body.name || req.body.price) {
    console.log(
      `The name id ${req.body.name} and the price is ${req.body.price}`
    );
    next();
  } else {
    return res
      .status(400)
      .json({ status: 'fail', message: 'no price and name' });
  }
};
// GET ALL TOURS
const tours = JSON.parse(dataJson);
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
//GET A TOUR
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((tour) => tour.id === id);
  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
//POST A TOUR
exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};
// UPDATE A TOUR
exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour...>',
    },
  });
};
// DELETE A TOUR
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }
  res.status(204).json({
    status: 'null',
    data: {
      tour: '<Deleted Tour...>',
    },
  });
};
