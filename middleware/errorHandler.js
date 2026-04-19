'use strict';

/**
 * Global error handler middleware
 * @param {Object} err - Error object
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: 'Something went wrong!',
        error: err.message,
    });
};

module.exports = errorHandler;
