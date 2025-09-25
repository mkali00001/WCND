/**
 * Avnish Kumar's Custom Error Class
 * I built this because JavaScript's default Error class wasn't giving me enough control.
 * Now I can throw errors with proper HTTP status codes and better debugging info!
 */

const STATUS = require('../constant/statusCodes');

class AppError extends Error {
  constructor(message, statusCode = STATUS.INTERNAL_ERROR) {
    super(message); // Call the parent Error class with my message
    this.statusCode = statusCode; // Store the HTTP status code for proper API responses
    Error.captureStackTrace(this, this.constructor); // Capture where this error originated
  }
}

module.exports = AppError;

// This AppError class extends JavaScript's built-in Error class
// I use this throughout my app to throw meaningful errors with proper HTTP status codes
// Much better than generic "Error" messages!
