// controllers/authController.js
const User = require('../models/User');

const usersDatabase = [
    // 1. Platform Super Admin (Aap / SaaS Owner)
    {
        id: 'USR-ADMIN',
        fullName: 'Purshottam Kumar (Platform Owner)',
        email: 'admin@quickbite.com',
        password: 'admin123',
        role: 'admin',
        portalTitle: 'QuickBite SaaS Headquarters',
        phone: '+91 99999 11111'
    },
    // 2. Tenant Partner / Cloud Kitchen Manager
    {
        id: 'USR-MGR-01',
        fullName: 'Wadia Kitchen Operations Manager',
        email: 'manager@quickbite.com',
        password: 'manager123',
        role: 'manager',
        restaurantName: 'Express Cloud Kitchen #101',
        phone: '+91 88888 22222'
    },
    // 3. Customer
    {
        id: 'USR-CUST-01',
        fullName: 'Purshottam Kumar',
        email: 'customer@quickbite.com',
        password: 'customer123',
        role: 'customer',
        phone: '+91 98765 43210'
    }
];

exports.login = (req, res, next) => {
    try {
        const { email, password, portalRole } = req.body;
        const user = usersDatabase.find(u => u.email === email && u.password === password);

        if (!user) {
            const err = new Error('Invalid email or password.');
            err.statusCode = 401;
            err.errorCode = 'INVALID_CREDENTIALS';
            return next(err);
        }

        if (portalRole && user.role !== portalRole) {
            const err = new Error(`Access Denied: This account is registered as '${user.role}', cannot access '${portalRole}' portal.`);
            err.statusCode = 403;
            err.errorCode = 'PORTAL_ROLE_MISMATCH';
            return next(err);
        }

        res.status(200).json({
            success: true,
            message: `Authenticated as ${user.role}`,
            user: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                role: user.role,
                restaurantName: user.restaurantName || null,
                portalTitle: user.portalTitle || null,
                phone: user.phone
            }
        });
    } catch (e) {
        next(e);
    }
};