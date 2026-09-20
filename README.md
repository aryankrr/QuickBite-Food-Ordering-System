# QuickBite — Full-Stack Multi-Cuisine Food Delivery Engine

QuickBite is an end-to-end food ordering platform featuring a dynamic responsive frontend, an object-oriented RESTful Node.js/Express backend with state machine transitions, and a Supabase PostgreSQL relational database schema.

---

## Key Features
- **Multi-Cuisine Menu Catalog:** Dynamic filtering across Biryani & Rice Bowls, Pizzas, Burgers, Chai/Coffee, and Desserts with pure-veg toggle.
- **Customization Engine:** Item-level portion scaling (Regular, Medium, Large) and add-on modifiers with real-time bill recalculation.
- **Live Order Tracker:** Visual stage-by-stage order lifecycle tracking (`Placed` ➔ `Preparing` ➔ `Out for Delivery` ➔ `Delivered`).
- **Admin Kitchen & Dispatch Terminal:** Live administrative dashboard to transition order states and monitor fulfillment queues.
- **Enterprise Architecture:** Aligned with UML class hierarchies, ERD relational tables, and finite state validation.

---

## Tech Stack
- **Frontend:** HTML5, Tailwind CSS, JavaScript (ES6+), FontAwesome Icons
- **Backend:** Node.js, Express.js, CORS
- **Database:** Supabase (PostgreSQL 15)
- **Design & Architecture:** Mermaid UML (Class, State, Use Case, Sequence, ERD)

---

## Project Structure
```text
QuickBite/
├── index.html        # Interactive Frontend (Menu, Cart, Tracker, Admin Panel)
├── server.js         # Express REST API, OOP Domain Entities & State Engine
├── package.json      # Node.js dependencies & scripts
├── .gitignore        # Ignores node_modules
└── README.md         # Technical documentation
