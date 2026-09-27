// controllers/adminController.js
const { ordersStore } = require('./orderController');

// Standard Restaurant & Kitchen Lifecycle
const VALID_FSM = {
    'placed': ['preparing', 'cancelled'],
    'preparing': ['dispatched', 'cancelled'],
    'dispatched': ['delivered'],
    'delivered': [],
    'cancelled': []
};

exports.updateStatus = (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { targetStatus } = req.body;

        const order = ordersStore.find(o => o.orderId === orderId);
        if (!order) {
            const err = new Error(`Order ${orderId} not found.`);
            err.statusCode = 404;
            return next(err);
        }

        const allowedNextStates = VALID_FSM[order.orderStatus] || [];
        if (!allowedNextStates.includes(targetStatus)) {
            const err = new Error(`Cannot jump directly from '${order.orderStatus}' to '${targetStatus}'.`);
            err.statusCode = 422;
            err.errorCode = 'ILLEGAL_STATE_TRANSITION';
            return next(err);
        }

        order.orderStatus = targetStatus;
        if (targetStatus === 'delivered') {
            order.deliveredAt = new Date().toLocaleTimeString();
        }

        res.status(200).json({ 
            success: true, 
            message: `Order transitioned to ${targetStatus}`,
            order 
        });
    } catch (e) {
        next(e);
    }
};