

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
