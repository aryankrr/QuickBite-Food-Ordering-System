// controllers/menuController.js

const catalog = [
    // ================= BIRYANI & BOWLS =================
    {
        itemId: 1,
        name: "Hyderabadi Chicken Dum Biryani",
        category: "biryani",
        price: 279,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Spiced Salan / Gravy", price: 30 },
            { name: "Boiled Egg (2 pcs)", price: 40 },
            { name: "Special Raita Bowl", price: 25 }
        ]
    },
    {
        itemId: 2,
        name: "Royal Paneer Tikka Biryani",
        category: "biryani",
        price: 249,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Char-grilled Paneer Tikka", price: 60 },
            { name: "Special Raita & Mint Dip", price: 25 },
            { name: "Crispy Fried Onion Topping", price: 20 }
        ]
    },
    {
        itemId: 3,
        name: "Awadhi Mutton Dum Biryani",
        category: "biryani",
        price: 369,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Mutton Gravy", price: 50 },
            { name: "Mirchi Ka Salan", price: 35 },
            { name: "Boiled Egg", price: 20 }
        ]
    },
    {
        itemId: 4,
        name: "Schezwan Chicken Fried Rice Bowl",
        category: "biryani",
        price: 229,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Schezwan Sauce", price: 25 },
            { name: "Crispy Fried Noodles", price: 20 },
            { name: "Chicken Manchurian Gravy", price: 60 }
        ]
    },
    {
        itemId: 5,
        name: "Veg Manchurian Bowl with Burnt Garlic Rice",
        category: "biryani",
        price: 199,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Manchurian Balls (3 pcs)", price: 40 },
            { name: "Extra Hot Garlic Dip", price: 20 }
        ]
    },

    // ================= PIZZAS =================
    {
        itemId: 6,
        name: "Farmhouse Delight Pizza",
        category: "pizzas",
        price: 349,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Mozzarella Cheese Burst", price: 60 },
            { name: "Pickled Jalapenos & Black Olives", price: 35 },
            { name: "Creamy Garlic Dip", price: 30 }
        ]
    },
    {
        itemId: 7,
        name: "Fiery Chicken Peri-Peri Pizza",
        category: "pizzas",
        price: 399,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Smoked Chicken Chunks Topping", price: 70 },
            { name: "Cheese Dip & Peri Peri Seasoning", price: 35 },
            { name: "Extra Spicy Red Paprika", price: 25 }
        ]
    },
    {
        itemId: 8,
        name: "Classic Margherita Double Cheese",
        category: "pizzas",
        price: 299,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Cheese Crust Upgrade", price: 50 },
            { name: "Oregano & Chilli Flakes Dips", price: 20 }
        ]
    },
    {
        itemId: 9,
        name: "BBQ Smoked Chicken Feast Pizza",
        category: "pizzas",
        price: 429,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra BBQ Chicken Shreds", price: 65 },
            { name: "Liquid Cheese Lava Dip", price: 40 }
        ]
    },

    // ================= BURGERS =================
    {
        itemId: 10,
        name: "Crispy Peri Peri Veg Burger",
        category: "burgers",
        price: 149,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Melted Cheddar Slice", price: 30 },
            { name: "Crispy Salted Fries (Small)", price: 49 },
            { name: "Chipotle Mayo Dip", price: 25 }
        ]
    },
    {
        itemId: 11,
        name: "Smoky Grilled Chicken Burger",
        category: "burgers",
        price: 189,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Double Patty Upgrade", price: 80 },
            { name: "Cheese Slice & Peri Fries", price: 65 },
            { name: "Smoky BBQ Dip", price: 25 }
        ]
    },
    {
        itemId: 12,
        name: "Double Cheese Aloo Tikki Supreme",
        category: "burgers",
        price: 129,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Cheese Slice", price: 25 },
            { name: "Mexican Salsa Dip", price: 25 }
        ]
    },
    {
        itemId: 13,
        name: "Crispy Zinger Chicken Burger",
        category: "burgers",
        price: 199,
        isVeg: false,
        image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Spicy Mayo", price: 20 },
            { name: "Large Peri-Peri Fries", price: 79 }
        ]
    },

    // ================= CHAI & DRINKS =================
    {
        itemId: 14,
        name: "Special Masala Chai (Kulhad)",
        category: "chai",
        price: 45,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Fresh Bun Maska (2 Slices)", price: 35 },
            { name: "Osmania Biscuits (4 pcs)", price: 20 },
            { name: "Extra Adrak & Elaichi Shot", price: 10 }
        ]
    },
    {
        itemId: 15,
        name: "Authentic South Filter Coffee",
        category: "chai",
        price: 55,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Butter Cookies (3 pcs)", price: 25 },
            { name: "Strong Decoction Double Shot", price: 15 }
        ]
    },
    {
        itemId: 16,
        name: "Thick Chocolate Cold Coffee",
        category: "chai",
        price: 119,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Vanilla Ice Cream Scoop", price: 35 },
            { name: "Whipped Cream & Choco Chips", price: 30 }
        ]
    },
    {
        itemId: 17,
        name: "Fresh Mint Mojito (Chilled)",
        category: "chai",
        price: 99,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Extra Lemon & Mint Punch", price: 15 },
            { name: "Chia Seeds Boost", price: 20 }
        ]
    },

    // ================= SIDES & DESSERTS =================
    {
        itemId: 18,
        name: "Molten Choco Lava Cake",
        category: "desserts",
        price: 99,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Vanilla Ice Cream Scoop", price: 40 },
            { name: "Hot Chocolate Fudge Drizzle", price: 30 }
        ]
    },
    {
        itemId: 19,
        name: "Crispy Peri-Peri French Fries",
        category: "desserts",
        price: 109,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Cheese Melt Dip", price: 35 },
            { name: "Chilli Garlic Sauce", price: 20 }
        ]
    },
    {
        itemId: 20,
        name: "Warm Gulab Jamun (3 pcs)",
        category: "desserts",
        price: 79,
        isVeg: true,
        image: "https://images.unsplash.com/photo-1593701461250-d7b22dfd3a77?auto=format&fit=crop&w=800&q=80",
        addons: [
            { name: "Vanilla Ice Cream Scoop", price: 35 },
            { name: "Crushed Pistachio Topping", price: 20 }
        ]
    }
];

exports.getMenu = (req, res, next) => {
    try {
        let result = [...catalog];
        const { category, vegOnly } = req.query;

        if (category && category !== 'all') {
            result = result.filter(item => item.category === category);
        }

        if (vegOnly === 'true') {
            result = result.filter(item => item.isVeg === true);
        }

        res.status(200).json({
            success: true,
            totalItems: result.length,
            data: result
        });
    } catch (e) {
        next(e);
    }
};