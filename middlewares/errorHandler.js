const errorHandler = (err, req, res, next) => {
    console.error(`[Central Error Guard] ${req.method} ${req.url} -> Error:`, err.message);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: {
            code: err.errorCode || 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Something went wrong on the server',
            timestamp: new Date().toISOString()
        }
    });
};

module.exports = errorHandler;