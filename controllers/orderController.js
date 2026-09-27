const ordersStore = [];

exports.createOrder = (req, res, next) => {
    try {
        const { customerName, phone, addressDetails, items, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            const err = new Error('Cart cannot be empty.');
            err.statusCode = 400;
            return next(err);
        }

        const subtotal = items.reduce((sum, item) => sum + (item.itemTotal || item.unitPrice || 200), 0);
        const gst = Math.round(subtotal * 0.05);
        const totalAmount = subtotal + gst;
        const orderId = `QB-${Math.floor(1000 + Math.random() * 9000)}`;

        const newOrder = {
            orderId,
            customerName: customerName || 'Purshottam Kumar',
            phone: phone || '+91 98765 43210',
            address: addressDetails || 'Nowrosjee Wadia College Hostel, Room 42, Pune',
            items,
            totalAmount,
            paymentMethod: paymentMethod || 'UPI',
            orderStatus: 'placed',
            createdAt: new Date().toISOString()
        };

        ordersStore.unshift(newOrder);
        res.status(201).json({ success: true, order: newOrder });
    } catch (e) {
        next(e);
    }
};

exports.getAllOrders = (req, res, next) => {
    try {
        res.status(200).json({ success: true, data: ordersStore });
    } catch (e) {
        next(e);
    }
};

exports.ordersStore = ordersStore;