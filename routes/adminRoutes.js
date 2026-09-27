const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authorizeRoles } = require('../middlewares/authMiddleware');

router.patch('/orders/:orderId/state', authorizeRoles('admin', 'manager'), adminController.updateStatus);

module.exports = router;