function errorHandler(err, req, res, next) {
  // Set the status code for the error response
  res.status(err.status || 500);

  // Send the error response to the client
  res.json({
    success: false,
    message: err.message,
  });
}

module.exports = errorHandler;
