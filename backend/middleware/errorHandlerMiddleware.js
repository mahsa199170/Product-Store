// ValidationError
// CastError
// const errorHandlingMiddleware = async (err, req, res, next) => {
//   console.log('this is error', err.name);

//   try {
//     let error = { ...err };
//     error.message = err.message;

//     if (err.name === 'ValidatorError') {
//       message = Object.values(err.errors).map((val) => val.message);
//       error = new Error(message.join(', '));
//       error.statusCode = 400;
//     }

//     if (err.name === 'CastError') {
//       error = new Error('Resource not found!');
//       error.statusCode = 404;
//     }

//     res.status(error.statusCode || 500).json({
//       success: false,
//       message: error.message || 'Server Error',
//     });
//     console.log(error);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// };

// module.exports = errorHandlingMiddleware;

const errorHandlingMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    statusCode = 400;
  }

  // Handle Mongoose invalid ObjectId
  if (err.name === 'CastError') {
    message = 'Resource not found!';
    statusCode = 404;
  }

  console.error('Error:', err);

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandlingMiddleware;
