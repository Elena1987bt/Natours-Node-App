const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// EXAMPLE FOR MIDDLEWARE
// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next();
// });

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  // Solution number 1
  // res.status(404).json({
  //   status: 'fail',
  //   message: `The requested url ${req.originalUrl} was not found`
  // });
  //Solution number 2
  // const err = new Error(`Can't find this url ${req.originalUrl} on the server`);
  // err.statusCode = 404;
  // err.status = 'fail';
  // next(err);
  // Best practice
  next(
    new AppError(`Can't find this url ${req.originalUrl} on the server`, 404)
  );
});

app.use(globalErrorHandler);
module.exports = app;
