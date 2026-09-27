const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['x-user-role'];

        if (!userRole) {
            const err = new Error('Access Denied: Missing user authentication role.');
            err.statusCode = 401;
            err.errorCode = 'UNAUTHORIZED';
            return next(err);
        }

        if (!allowedRoles.includes(userRole)) {
            const err = new Error(`Forbidden: Role '${userRole}' is not authorized to access this resource.`);
            err.statusCode = 403;
            err.errorCode = 'FORBIDDEN_ROLE';
            return next(err);
        }

        next();
    };
};

module.exports = { authorizeRoles };