/**
 * ============================================================================
 * QUICKBITE ENTERPRISE FOOD ENGINE - REST API GATEWAY
 * Architecture: Object-Oriented Domain Layer + RESTful Controller
 * Aligned with: UML Class Diagrams, ERD Schemas & State Transition Models
 * ============================================================================
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// 1. OBJECT & CLASS MODELS (DOMAIN ENTITIES)
// ==========================================

class FoodItem {
  constructor(id, name, category, price, isVeg, description) {
    this.itemId = id;
    this.name = name;
    this.category = category; // Enum: 'biryani', 'pizza', 'burger', 'beverages', 'sides'
    this.price = Number(price);
    this.isVeg = Boolean(isVeg);
    this.description = description;
    this.isAvailable = true;
  }
}

class OrderItem {
  constructor(foodItem, quantity = 1, variant = "Regular", addons = []) {
    this.itemId = foodItem.itemId;
    this.itemName = foodItem.name;
    this.unitPrice = foodItem.price;
    this.quantity = quantity;
    this.variant = variant; // Regular, Medium, Large
    this.addons = addons;   // e.g. ["Extra Cheese", "Raita"]
    this.itemTotal = this.calculateSubtotal();
  }

  calculateSubtotal() {
    let extra = 0;
    if (this.variant === "Medium") extra += 80;
    if (this.variant === "Large") extra += 150;
    extra += this.addons.length * 35;
    return (this.unitPrice + extra) * this.quantity;
  }
}

class Order {
  // Behavioral State Machine: PLACED -> PREPARING -> DISPATCHED -> DELIVERED (or CANCELLED)
  static VALID_TRANSITIONS = {
    'placed': ['preparing', 'cancelled'],
    'preparing': ['dispatched', 'cancelled'],
    'dispatched': ['delivered'],
    'delivered': [],
    'cancelled': []
  };

  constructor(customerName, phone, address, items = [], paymentMethod = "UPI") {
    this.orderId = `QB-${Math.floor(1000 + Math.random() * 9000)}`;
    this.customerName = customerName;
    this.phone = phone;
    this.deliveryAddress = address;
    this.items = items; // Array of OrderItem instances
    this.paymentMethod = paymentMethod; // 'UPI', 'CARD', 'COD'
    this.paymentStatus = (paymentMethod === "COD") ? "PENDING" : "SUCCESS";
    this.orderStatus = "placed";
    this.createdAt = new Date().toISOString();
    this.totalAmount = this.calculateFinalBill();
  }

  calculateFinalBill() {
    const subtotal = this.items.reduce((acc, curr) => acc + (curr.itemTotal || curr.price || 0), 0);
    const tax = Math.round(subtotal * 0.05); // 5% GST
    return subtotal + tax;
  }

  transitionTo(newStatus) {
    const allowed = Order.VALID_TRANSITIONS[this.orderStatus];
    if (!allowed || !allowed.includes(newStatus)) {
      throw new Error(`Illegal State Exception: Cannot transition from '${this.orderStatus}' to '${newStatus}'`);
    }
    this.orderStatus = newStatus;
    this.updatedAt = new Date().toISOString();
    return this;
  }
}

// ==========================================
// 2. IN-MEMORY REPOSITORY (POSTGRES / SUPABASE ADAPTER MOCK)
// ==========================================

const MenuCatalog = [
  new FoodItem(1, "Hyderabadi Chicken Dum Biryani", "biryani", 279, false, "Slow-cooked saffron basmati rice with marinated chicken"),
  new FoodItem(2, "Royal Paneer Tikka Biryani", "biryani", 249, true, "Charcoal grilled paneer layered with mint and basmati rice"),
  new FoodItem(3, "Awadhi Mutton Biryani", "biryani", 369, false, "Lucknowi slow-dum cooked succulent mutton with saffron rice"),
  new FoodItem(4, "Special Masala Chai", "beverages", 30, true, "Kadak freshly brewed tea with hand-crushed ginger & cardamom"),
  new FoodItem(5, "Filter Coffee", "beverages", 45, true, "South Indian decoction brew with thick frothy milk"),
  new FoodItem(6, "Crispy Paneer Burger", "burger", 149, true, "Golden cottage cheese patty with spicy mayo and lettuce"),
  new FoodItem(7, "Smoky Chicken Burger", "burger", 189, false, "Grilled chicken fillet with BBQ hickory glaze and gherkins"),
  new FoodItem(8, "Farmhouse Delight Pizza", "pizza", 299, true, "Bell peppers, button mushrooms, onions and mozzarella"),
  new FoodItem(9, "Double Cheese Margherita", "pizza", 249, true, "Herbed san marzano tomato concasse with double string cheese"),
  new FoodItem(10, "Garlic Breadsticks", "sides", 129, true, "Baked artisan sticks with melted cheddar dip"),
  new FoodItem(11, "Choco Lava Cake", "sides", 99, true, "Molten Belgian hot chocolate core inside warm sponge cake")
];

const OrderDatabase = [
  new Order(
    "Purshottam Kumar",
    "+91 98765 43210",
    "Hostel Room 402, Wadia College Campus, Pune",
    [new OrderItem(MenuCatalog[0], 1, "Regular", ["Extra Gravy"])],
    "UPI"
  )
];

// Seed initial state
OrderDatabase[0].orderStatus = "preparing";

// ==========================================
// 3. REST API ENDPOINTS (CONTROLLER LAYER)
// ==========================================

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'HEALTHY',
    service: 'QuickBite Core Engine',
    timestamp: new Date().toISOString()
  });
});

// GET /api/menu (Read Catalog)
app.get('/api/menu', (req, res) => {
  const { category, vegOnly } = req.query;
  let items = [...MenuCatalog];

  if (category && category !== 'all') {
    items = items.filter(i => i.category.toLowerCase() === category.toLowerCase());
  }
  if (vegOnly === 'true') {
    items = items.filter(i => i.isVeg === true);
  }

  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

// POST /api/orders (Create Order - Behavioral Trigger)
app.post('/api/orders', (req, res) => {
  try {
    const { customerName, phone, address, items, paymentMethod } = req.body;

    if (!customerName || !address || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        errorCode: "INVALID_PAYLOAD",
        message: "Customer name, delivery address, and food items are strictly mandatory."
      });
    }

    const newOrder = new Order(customerName, phone, address, items, paymentMethod);
    OrderDatabase.unshift(newOrder);

    res.status(201).json({
      success: true,
      message: "Order placed and state machine initialized",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/orders (Admin Live View)
app.get('/api/admin/orders', (req, res) => {
  res.status(200).json({
    success: true,
    totalLiveOrders: OrderDatabase.length,
    data: OrderDatabase
  });
});

// PATCH /api/admin/orders/:orderId/state (State Machine Transition Handler)
app.patch('/api/admin/orders/:orderId/state', (req, res) => {
  const { orderId } = req.params;
  const { targetStatus } = req.body;

  const targetOrder = OrderDatabase.find(o => o.orderId === orderId);
  if (!targetOrder) {
    return res.status(404).json({ success: false, message: `Order #${orderId} not found.` });
  }

  try {
    targetOrder.transitionTo(targetStatus);
    res.status(200).json({
      success: true,
      message: `State updated successfully to '${targetStatus}'`,
      order: targetOrder
    });
  } catch (err) {
    // Catches Illegal State Transitions (e.g. Delivered -> Placed)
    res.status(422).json({
      success: false,
      errorCode: "ILLEGAL_STATE_TRANSITION",
      message: err.message
    });
  }
});

// ==========================================
// 4. SERVER BOOTSTRAP
// ==========================================
app.listen(PORT, () => {
  console.log(`==============================================`);
  console.log(` QuickBite Core API Server is Live`);
  console.log(` Port: http://localhost:${PORT}`);
  console.log(` UML Domain Classes & State Transitions Mounted`);
  console.log(`==============================================`);
});