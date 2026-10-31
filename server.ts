import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { initialMenu } from "./src/menu_data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Robust helper to handle generateContent calls with fallback models and retry logic to avoid 503/429 transient errors
async function generateContentWithFallback(params: {
  contents: any;
  config?: any;
}) {
  if (!ai) {
    throw new Error("Gemini AI client is not initialized.");
  }

  // List of models to try in sequence
  const models = ["gemini-3.5-flash", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (const model of models) {
    try {
      console.log(`[SmartDine AI] Attempting generateContent with model: ${model}`);
      const response = await ai.models.generateContent({
        ...params,
        model: model,
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      console.warn(`[SmartDine AI] Model ${model} failed:`, err?.message || err);
      lastError = err;
      // If there's a 503 or transient error, proceed to the next model
    }
  }

  // If both models in sequence fail, do a final retry after a short delay
  try {
    console.log("[SmartDine AI] Retrying with gemini-3.1-flash-lite after delay...");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await ai.models.generateContent({
      ...params,
      model: "gemini-3.1-flash-lite",
    });
    if (response && response.text) {
      return response;
    }
  } catch (err: any) {
    console.error("[SmartDine AI] Delayed retry failed:", err);
    lastError = err;
  }

  throw lastError || new Error("Failed to generate content from any available Gemini models.");
}

// ==========================================
// MOCK STATE / DATABASE FOR SMARTDINE AI
// ==========================================

// Deduplicate initialMenu by name to prevent duplicate fake data
const uniqueMenuMap = new Map<string, any>();
for (const item of initialMenu) {
  const norm = item.name.trim().toLowerCase();
  if (!uniqueMenuMap.has(norm)) {
    uniqueMenuMap.set(norm, item);
  }
}
let menu: any[] = Array.from(uniqueMenuMap.values());

let tables = [
  { id: "T1", number: 1, capacity: 2, status: "available", assignedWaiterId: "" },
  { id: "T2", number: 2, capacity: 4, status: "available", assignedWaiterId: "" },
  { id: "T3", number: 3, capacity: 4, status: "available", assignedWaiterId: "" },
  { id: "T4", number: 4, capacity: 6, status: "available", assignedWaiterId: "" },
  { id: "T5", number: 5, capacity: 8, status: "available", assignedWaiterId: "" },
];

let orders: any[] = [];

let bills: any[] = [];

let reservations: any[] = [];

let inventory = [
  { id: "inv-1", name: "Basmati Rice", stock: 150, unit: "kg", lowStockAlertLimit: 20, waste: 0, costPerUnit: 80 },
  { id: "inv-2", name: "Paneer (Cottage Cheese)", stock: 45, unit: "kg", lowStockAlertLimit: 10, waste: 0, costPerUnit: 350 },
  { id: "inv-3", name: "Fresh Vegetables", stock: 120, unit: "kg", lowStockAlertLimit: 25, waste: 0, costPerUnit: 60 },
  { id: "inv-4", name: "Pure Cow Ghee", stock: 35, unit: "Litre", lowStockAlertLimit: 8, waste: 0, costPerUnit: 650 },
  { id: "inv-5", name: "Butter", stock: 40, unit: "kg", lowStockAlertLimit: 10, waste: 0, costPerUnit: 420 },
  { id: "inv-6", name: "Idli/Dosa Batter", stock: 80, unit: "kg", lowStockAlertLimit: 15, waste: 0, costPerUnit: 50 },
  { id: "inv-7", name: "Filter Coffee Decoction", stock: 25, unit: "Litre", lowStockAlertLimit: 5, waste: 0, costPerUnit: 150 },
  { id: "inv-8", name: "Milk", stock: 110, unit: "Litre", lowStockAlertLimit: 20, waste: 0, costPerUnit: 60 },
  { id: "inv-9", name: "Semolina (Rava)", stock: 60, unit: "kg", lowStockAlertLimit: 12, waste: 0, costPerUnit: 45 },
  { id: "inv-10", name: "Whole Wheat Flour (Atta)", stock: 180, unit: "kg", lowStockAlertLimit: 30, waste: 0, costPerUnit: 40 },
  { id: "inv-11", name: "Refined Wheat Flour (Maida)", stock: 90, unit: "kg", lowStockAlertLimit: 15, waste: 0, costPerUnit: 35 },
  { id: "inv-12", name: "Chickpeas (Chole)", stock: 70, unit: "kg", lowStockAlertLimit: 15, waste: 0, costPerUnit: 90 },
  { id: "inv-13", name: "Fresh Mushrooms", stock: 50, unit: "kg", lowStockAlertLimit: 12, waste: 0, costPerUnit: 120 },
];

const dishRecipes: Record<string, { inventoryId: string; quantity: number }[]> = {
  // South Indian Breakfast
  "Idli (2 pcs)": [{ inventoryId: "inv-6", quantity: 0.2 }], // 200g batter
  "Mini Idli": [{ inventoryId: "inv-6", quantity: 0.25 }, { inventoryId: "inv-4", quantity: 0.02 }], // 250g batter + 20g ghee
  "Ghee Idli": [{ inventoryId: "inv-6", quantity: 0.2 }, { inventoryId: "inv-4", quantity: 0.03 }], // 200g batter + 30g ghee
  "Sambar Idli": [{ inventoryId: "inv-6", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.1 }], // 200g batter + 100g veggies for sambar
  "Rava Idli": [{ inventoryId: "inv-9", quantity: 0.15 }, { inventoryId: "inv-8", quantity: 0.1 }], // 150g rava + 100ml milk
  "Plain Dosa": [{ inventoryId: "inv-6", quantity: 0.15 }], // 150g batter
  "Masala Dosa": [{ inventoryId: "inv-6", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.1 }], // 150g batter + 100g potato masala
  "Ghee Roast": [{ inventoryId: "inv-6", quantity: 0.15 }, { inventoryId: "inv-4", quantity: 0.03 }], // 150g batter + 30g ghee
  "Paper Roast": [{ inventoryId: "inv-6", quantity: 0.12 }], 
  "Onion Dosa": [{ inventoryId: "inv-6", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.05 }], 
  "Onion Uttapam": [{ inventoryId: "inv-6", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.08 }], 
  "Vegetable Uttapam": [{ inventoryId: "inv-6", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.12 }], 
  "Set Dosa": [{ inventoryId: "inv-6", quantity: 0.2 }], 
  "Podi Dosa": [{ inventoryId: "inv-6", quantity: 0.15 }, { inventoryId: "inv-4", quantity: 0.02 }], 
  "Mysore Masala Dosa": [{ inventoryId: "inv-6", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.1 }, { inventoryId: "inv-5", quantity: 0.015 }], 
  "Pongal": [{ inventoryId: "inv-1", quantity: 0.1 }, { inventoryId: "inv-4", quantity: 0.02 }], 
  "Ven Pongal": [{ inventoryId: "inv-1", quantity: 0.1 }, { inventoryId: "inv-4", quantity: 0.03 }], 
  "Upma": [{ inventoryId: "inv-9", quantity: 0.12 }, { inventoryId: "inv-3", quantity: 0.05 }], 
  "Rava Upma": [{ inventoryId: "inv-9", quantity: 0.12 }, { inventoryId: "inv-3", quantity: 0.08 }], 
  "Poori Masala": [{ inventoryId: "inv-10", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.1 }], 
  "Vada (2 pcs)": [{ inventoryId: "inv-3", quantity: 0.02 }], 
  "Medu Vada": [{ inventoryId: "inv-3", quantity: 0.02 }], 
  "Kesari": [{ inventoryId: "inv-9", quantity: 0.1 }, { inventoryId: "inv-4", quantity: 0.04 }, { inventoryId: "inv-8", quantity: 0.1 }], 
  
  // North Indian Breakfast
  "Aloo Paratha": [{ inventoryId: "inv-10", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.1 }, { inventoryId: "inv-5", quantity: 0.02 }], 
  "Gobi Paratha": [{ inventoryId: "inv-10", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.1 }, { inventoryId: "inv-5", quantity: 0.02 }], 
  "Paneer Paratha": [{ inventoryId: "inv-10", quantity: 0.15 }, { inventoryId: "inv-2", quantity: 0.08 }, { inventoryId: "inv-5", quantity: 0.02 }], 
  "Mooli Paratha": [{ inventoryId: "inv-10", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.1 }], 
  "Mix Veg Paratha": [{ inventoryId: "inv-10", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.12 }, { inventoryId: "inv-5", quantity: 0.02 }], 
  "Chole Bhature": [{ inventoryId: "inv-11", quantity: 0.18 }, { inventoryId: "inv-12", quantity: 0.1 }], 
  "Puri Bhaji": [{ inventoryId: "inv-10", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.1 }], 
  "Stuffed Kulcha": [{ inventoryId: "inv-11", quantity: 0.15 }, { inventoryId: "inv-2", quantity: 0.06 }, { inventoryId: "inv-3", quantity: 0.05 }], 
  "Bread Omelette (Egg)": [{ inventoryId: "inv-10", quantity: 0.05 }, { inventoryId: "inv-3", quantity: 0.02 }], 
  "Bread Butter": [{ inventoryId: "inv-10", quantity: 0.05 }, { inventoryId: "inv-5", quantity: 0.025 }], 
  "Sandwich Veg": [{ inventoryId: "inv-10", quantity: 0.05 }, { inventoryId: "inv-3", quantity: 0.08 }], 
  "Cheese Sandwich": [{ inventoryId: "inv-10", quantity: 0.05 }, { inventoryId: "inv-5", quantity: 0.015 }], 
  "Poha": [{ inventoryId: "inv-3", quantity: 0.05 }], 
  "Sabudana Khichdi": [{ inventoryId: "inv-3", quantity: 0.05 }], 
  "Dahi Paratha": [{ inventoryId: "inv-10", quantity: 0.15 }], 

  // Lunch South Indian Meals
  "Mini Meals": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.15 }], 
  "South Indian Meals": [{ inventoryId: "inv-1", quantity: 0.25 }, { inventoryId: "inv-3", quantity: 0.25 }, { inventoryId: "inv-8", quantity: 0.15 }], 
  "Special Meals": [{ inventoryId: "inv-1", quantity: 0.3 }, { inventoryId: "inv-3", quantity: 0.3 }, { inventoryId: "inv-8", quantity: 0.2 }], 
  "Lemon Rice": [{ inventoryId: "inv-1", quantity: 0.18 }], 
  "Tamarind Rice": [{ inventoryId: "inv-1", quantity: 0.18 }], 
  "Coconut Rice": [{ inventoryId: "inv-1", quantity: 0.18 }], 
  "Tomato Rice": [{ inventoryId: "inv-1", quantity: 0.18 }, { inventoryId: "inv-3", quantity: 0.08 }], 
  "Curd Rice": [{ inventoryId: "inv-1", quantity: 0.15 }, { inventoryId: "inv-8", quantity: 0.15 }], 
  "Bisibele Bath": [{ inventoryId: "inv-1", quantity: 0.12 }, { inventoryId: "inv-3", quantity: 0.12 }, { inventoryId: "inv-4", quantity: 0.02 }], 
  "Vegetable Biryani": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.15 }], 
  "Mushroom Biryani": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.1 }], 
  "Paneer Biryani": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-2", quantity: 0.1 }], 
  "Veg Fried Rice": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.1 }], 
  "Gobi Fried Rice": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.12 }], 
  "Paneer Fried Rice": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-2", quantity: 0.08 }, { inventoryId: "inv-3", quantity: 0.05 }], 
  "Mushroom Fried Rice": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.08 }], 
  "Veg Noodles": [{ inventoryId: "inv-11", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.1 }], 
  "Gobi Noodles": [{ inventoryId: "inv-11", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.12 }], 
  "Paneer Noodles": [{ inventoryId: "inv-11", quantity: 0.15 }, { inventoryId: "inv-2", quantity: 0.08 }], 

  // North Indian Lunch
  "Veg Thali": [{ inventoryId: "inv-1", quantity: 0.15 }, { inventoryId: "inv-10", quantity: 0.12 }, { inventoryId: "inv-3", quantity: 0.12 }], 
  "Deluxe Thali": [{ inventoryId: "inv-1", quantity: 0.15 }, { inventoryId: "inv-11", quantity: 0.12 }, { inventoryId: "inv-2", quantity: 0.08 }, { inventoryId: "inv-5", quantity: 0.02 }], 
  "Dal Tadka": [{ inventoryId: "inv-3", quantity: 0.04 }], 
  "Dal Fry": [{ inventoryId: "inv-3", quantity: 0.05 }], 
  "Dal Makhani": [{ inventoryId: "inv-5", quantity: 0.04 }, { inventoryId: "inv-8", quantity: 0.05 }], 
  "Jeera Rice": [{ inventoryId: "inv-1", quantity: 0.18 }, { inventoryId: "inv-4", quantity: 0.015 }], 
  "Veg Pulao": [{ inventoryId: "inv-1", quantity: 0.18 }, { inventoryId: "inv-3", quantity: 0.08 }], 
  "Paneer Pulao": [{ inventoryId: "inv-1", quantity: 0.18 }, { inventoryId: "inv-2", quantity: 0.08 }], 
  "Veg Biryani (Lunch)": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-3", quantity: 0.12 }], 
  "Paneer Biryani (Lunch)": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-2", quantity: 0.1 }], 
  "Butter Naan": [{ inventoryId: "inv-11", quantity: 0.15 }, { inventoryId: "inv-5", quantity: 0.02 }], 
  "Garlic Naan": [{ inventoryId: "inv-11", quantity: 0.15 }, { inventoryId: "inv-5", quantity: 0.01 }], 
  "Plain Naan": [{ inventoryId: "inv-11", quantity: 0.15 }], 
  "Tandoori Roti": [{ inventoryId: "inv-10", quantity: 0.12 }], 
  "Butter Roti": [{ inventoryId: "inv-10", quantity: 0.12 }, { inventoryId: "inv-5", quantity: 0.01 }], 
  "Lachha Paratha": [{ inventoryId: "inv-10", quantity: 0.15 }, { inventoryId: "inv-4", quantity: 0.02 }], 
  "Paneer Butter Masala": [{ inventoryId: "inv-2", quantity: 0.15 }, { inventoryId: "inv-5", quantity: 0.03 }, { inventoryId: "inv-8", quantity: 0.05 }], 
  "Kadai Paneer": [{ inventoryId: "inv-2", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.08 }], 
  "Shahi Paneer": [{ inventoryId: "inv-2", quantity: 0.15 }, { inventoryId: "inv-8", quantity: 0.08 }], 
  "Palak Paneer": [{ inventoryId: "inv-2", quantity: 0.15 }, { inventoryId: "inv-3", quantity: 0.15 }], 
  "Chole Masala": [{ inventoryId: "inv-12", quantity: 0.12 }, { inventoryId: "inv-3", quantity: 0.05 }], 
  "Rajma Masala": [{ inventoryId: "inv-3", quantity: 0.05 }], 
  "Mixed Veg Curry": [{ inventoryId: "inv-3", quantity: 0.18 }], 
  "Veg Kofta": [{ inventoryId: "inv-3", quantity: 0.15 }, { inventoryId: "inv-11", quantity: 0.03 }], 
  "Hyderabadi Chicken Biryani": [{ inventoryId: "inv-1", quantity: 0.2 }, { inventoryId: "inv-13", quantity: 0.15 }],
  "Egg Dosa": [{ inventoryId: "inv-6", quantity: 0.15 }],
  "South Indian Filter Coffee": [{ inventoryId: "inv-7", quantity: 0.05 }, { inventoryId: "inv-8", quantity: 0.15 }],
};

let staff: any[] = [];

// Helper to update Waiter assignment representation
let waitersList: any[] = [];

let feedbacks: any[] = [];

// Operational logs simulating webhook, mail, and notification systems (such as WhatsApp/Email automation logs)
let automationLogs: any[] = [];

let waiterNotifications: any[] = [];

// ==========================================
// REST API ENDPOINTS
// ==========================================

// Archive storage for end-of-day billing resets
let archivedDays: any[] = [];

// 1. Fetch entire operational state
app.get("/api/state", (req, res) => {
  res.json({
    menu,
    tables,
    orders,
    reservations,
    inventory,
    staff,
    waitersList,
    feedbacks,
    automationLogs,
    waiterNotifications,
    bills,
    dishRecipes,
    archivedDays
  });
});

// 1a. Link or Update Recipe ingredients for a dish
app.post("/api/recipes", (req, res) => {
  const { dishName, ingredients } = req.body;
  if (!dishName || !ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Dish name and ingredients array are required." });
  }
  dishRecipes[dishName] = ingredients;
  res.json({ success: true, dishRecipes });
});

// 1a2. Create a new raw kitchen ingredient
app.post("/api/inventory", (req, res) => {
  const { name, stock, unit, lowStockAlertLimit, costPerUnit } = req.body;
  if (!name || stock === undefined || !unit) {
    return res.status(400).json({ error: "Name, stock, and unit are required." });
  }
  const newItem = {
    id: `inv-${Date.now()}`,
    name,
    stock: parseFloat(String(stock)),
    unit,
    lowStockAlertLimit: parseFloat(String(lowStockAlertLimit || 10)),
    waste: 0,
    costPerUnit: parseFloat(String(costPerUnit || 50))
  };
  inventory.push(newItem);
  res.status(201).json({ success: true, item: newItem });
});

// 1b. Add custom menu item dynamically
app.post("/api/menu", (req, res) => {
  const { name, category, price, isVeg, isBestSeller, nutrition, allergens, description, image } = req.body;
  if (!name || !description || price === undefined) {
    return res.status(400).json({ error: "Name, price, and description are required to add a dish." });
  }

  const newItem = {
    id: `m-${Date.now()}`,
    name,
    category: category || "Mains",
    price: parseFloat(String(price)),
    isVeg: !!isVeg,
    isBestSeller: !!isBestSeller,
    nutrition: nutrition || "None",
    allergens: allergens || "None",
    description,
    image: image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"
  };

  menu.push(newItem);
  res.status(201).json({ success: true, item: newItem });
});

// 1c. Delete a menu item dynamically
app.delete("/api/menu/:id", (req, res) => {
  const { id } = req.params;
  const index = menu.findIndex(item => item.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Dish not found" });
  }
  const deletedItem = menu.splice(index, 1)[0];
  res.json({ success: true, item: deletedItem });
});

// 1d. Edit a menu item dynamically
app.put("/api/menu/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, price, isVeg, isBestSeller, nutrition, allergens, description, image } = req.body;
  const dish = menu.find(item => item.id === id);
  if (!dish) {
    return res.status(404).json({ error: "Dish not found" });
  }
  if (name !== undefined) dish.name = name;
  if (category !== undefined) dish.category = category;
  if (price !== undefined) dish.price = parseFloat(String(price));
  if (isVeg !== undefined) dish.isVeg = !!isVeg;
  if (isBestSeller !== undefined) dish.isBestSeller = !!isBestSeller;
  if (nutrition !== undefined) dish.nutrition = nutrition;
  if (allergens !== undefined) dish.allergens = allergens;
  if (description !== undefined) dish.description = description;
  if (image !== undefined) dish.image = image;
  res.json({ success: true, item: dish });
});

// 1e. Edit a staff member dynamically
app.put("/api/staff/:id", (req, res) => {
  const { id } = req.params;
  const { name, role, salary, shift, details, phone, vehicle, profileImage, attendance } = req.body;
  const employee = staff.find(s => s.id === id);
  if (!employee) {
    return res.status(404).json({ error: "Staff not found" });
  }
  if (name !== undefined) employee.name = name;
  if (role !== undefined) {
    employee.role = role;
    if (role === "Waiter") {
      employee.nameWaiter = name || employee.name;
    } else {
      delete employee.nameWaiter;
    }
  }
  if (salary !== undefined) employee.salary = parseFloat(salary) || 2500;
  if (shift !== undefined) employee.shift = shift;
  if (details !== undefined) employee.details = details;
  if (phone !== undefined) employee.phone = phone;
  if (vehicle !== undefined) employee.vehicle = vehicle;
  if (profileImage !== undefined) employee.profileImage = profileImage;
  if (attendance !== undefined) employee.attendance = attendance;

  // Sync waiter name if role remains or becomes Waiter
  if (employee.role === "Waiter") {
    const waiterIdx = waitersList.findIndex(w => w.id === id || w.name === employee.name);
    if (waiterIdx !== -1) {
      waitersList[waiterIdx].name = employee.name;
    } else {
      waitersList.push({ id: id, name: employee.name, tableIds: [] });
    }
  } else {
    // Remove from waitersList if no longer a Waiter
    waitersList = waitersList.filter(w => w.name !== employee.name && w.id !== id);
  }

  res.json({ success: true, staff, waitersList });
});

// 1f. Delete a staff member dynamically
app.delete("/api/staff/:id", (req, res) => {
  const { id } = req.params;
  const index = staff.findIndex(s => s.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Staff not found" });
  }
  const deletedStaff = staff.splice(index, 1)[0];
  waitersList = waitersList.filter(w => w.name !== deletedStaff.name && w.id !== id);
  res.json({ success: true, staff, waitersList });
});

// 1g. Edit an inventory item dynamically
app.put("/api/inventory/:id", (req, res) => {
  const { id } = req.params;
  const { name, stock, unit, lowStockAlertLimit, costPerUnit } = req.body;
  const item = inventory.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: "Inventory item not found" });
  }
  if (name !== undefined) item.name = name;
  if (stock !== undefined) item.stock = parseFloat(String(stock));
  if (unit !== undefined) item.unit = unit;
  if (lowStockAlertLimit !== undefined) item.lowStockAlertLimit = parseFloat(String(lowStockAlertLimit));
  if (costPerUnit !== undefined) item.costPerUnit = parseFloat(String(costPerUnit));
  res.json({ success: true, item });
});

// 1h. Delete an inventory item dynamically
app.delete("/api/inventory/:id", (req, res) => {
  const { id } = req.params;
  const index = inventory.findIndex(i => i.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Inventory item not found" });
  }
  const deletedItem = inventory.splice(index, 1)[0];
  res.json({ success: true, item: deletedItem });
});

// 1i. Edit a reservation dynamically
app.put("/api/reservations/:id", (req, res) => {
  const { id } = req.params;
  const { customerName, customerEmail, customerPhone, date, time, partySize, dietaryPreference, status, tableId } = req.body;
  const rObj = reservations.find(r => r.id === id);
  if (!rObj) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  if (customerName !== undefined) rObj.customerName = customerName;
  if (customerEmail !== undefined) rObj.customerEmail = customerEmail;
  if (customerPhone !== undefined) rObj.customerPhone = customerPhone;
  if (date !== undefined) rObj.date = date;
  if (time !== undefined) rObj.time = time;
  if (partySize !== undefined) rObj.partySize = parseInt(String(partySize));
  if (dietaryPreference !== undefined) rObj.dietaryPreference = dietaryPreference;
  if (status !== undefined) rObj.status = status;
  if (tableId !== undefined) {
    // If table changes, free the old one and mark the new one occupied if status is confirmed
    if (rObj.tableId && rObj.tableId !== tableId) {
      const oldTable = tables.find(t => t.id === rObj.tableId);
      if (oldTable) oldTable.status = "available";
    }
    rObj.tableId = tableId;
    const newTable = tables.find(t => t.id === tableId);
    if (newTable && rObj.status === "confirmed") {
      newTable.status = "occupied";
    }
  }
  res.json({ success: true, reservation: rObj });
});

// 1j. Delete a reservation dynamically
app.delete("/api/reservations/:id", (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Reservation not found" });
  }
  const deletedRes = reservations.splice(index, 1)[0];
  const table = tables.find(t => t.id === deletedRes.tableId);
  if (table) table.status = "available";
  res.json({ success: true, reservation: deletedRes });
});

// 1k. Edit an order dynamically
app.put("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { customerName, tableNumber, type, status, cookingStatus, items, totalPrice } = req.body;
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  if (customerName !== undefined) order.customerName = customerName;
  if (tableNumber !== undefined) order.tableNumber = tableNumber;
  if (type !== undefined) order.type = type;
  if (status !== undefined) order.status = status;
  if (cookingStatus !== undefined) order.cookingStatus = cookingStatus;
  if (items !== undefined) order.items = items;
  if (totalPrice !== undefined) order.totalPrice = parseFloat(String(totalPrice));
  res.json({ success: true, order });
});

// 1l. Delete an order dynamically
app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const index = orders.findIndex(o => o.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Order not found" });
  }
  const deletedOrder = orders.splice(index, 1)[0];
  // Also remove corresponding bill if any
  const billIndex = bills.findIndex(b => b.orderId === id);
  if (billIndex !== -1) {
    bills.splice(billIndex, 1);
  }
  res.json({ success: true, order: deletedOrder });
});

// 1m. Edit a bill dynamically
app.put("/api/bills/:id", (req, res) => {
  const { id } = req.params;
  const { customerName, tableNumber, amount, status, paymentMethod } = req.body;
  const bill = bills.find(b => b.id === id);
  if (!bill) {
    return res.status(404).json({ error: "Bill not found" });
  }
  if (customerName !== undefined) bill.customerName = customerName;
  if (tableNumber !== undefined) bill.tableNumber = parseInt(String(tableNumber));
  if (amount !== undefined) bill.amount = parseFloat(String(amount));
  if (status !== undefined) bill.status = status;
  if (paymentMethod !== undefined) bill.paymentMethod = paymentMethod;
  res.json({ success: true, bill });
});

// 1n. Delete a bill dynamically
app.delete("/api/bills/:id", (req, res) => {
  const { id } = req.params;
  const index = bills.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Bill not found" });
  }
  const deletedBill = bills.splice(index, 1)[0];
  res.json({ success: true, bill: deletedBill });
});

// 2. Submit order from Customer Portal
app.post("/api/orders", (req, res) => {
  const { customerName, tableNumber, type, items, totalPrice, paymentMethod, couponCode } = req.body;
  
  if (!items || items.length === 0) {
    return res.status(400).json({ error: "No items in cart" });
  }

  const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  const gst = parseFloat((totalPrice * 0.05).toFixed(2));
  const deliveryCharge = type === "delivery" ? 40.00 : 0.00;
  
  const newOrder = {
    id: orderId,
    items,
    customerName: customerName || "Guest",
    tableNumber: type === "dine-in" ? (tableNumber || 1) : null,
    type,
    status: "pending",
    cookingStatus: "queued",
    waiterId: type === "dine-in" ? "W1" : null,
    deliveryPartnerId: null,
    deliveryOtp: type === "delivery" ? String(Math.floor(1000 + Math.random() * 9000)) : null,
    totalPrice: parseFloat((totalPrice + gst + deliveryCharge).toFixed(2)),
    gst,
    deliveryCharge,
    paymentMethod: paymentMethod || "Cash Payment",
    couponCode: couponCode || null,
    timestamp: new Date().toISOString()
  };

  orders.unshift(newOrder);

  if (type === "dine-in") {
    bills.unshift({
      id: `BILL-${Math.floor(10000 + Math.random() * 90000)}`,
      orderId: orderId,
      tableNumber: parseInt(String(tableNumber || 1)),
      customerName: customerName || "Guest",
      items: items.map((i: any) => ({ name: i.name, price: i.price, quantity: i.quantity })),
      amount: parseFloat((totalPrice + gst).toFixed(2)),
      status: "unpaid",
      paymentMethod: paymentMethod || "UPI",
      date: new Date().toLocaleDateString('en-IN'),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date().toISOString()
    });
  }

  // Trigger automated logs (WhatsApp & Email confirmation simulating Pabbly / Webhook automation)
  automationLogs.unshift({
    id: `log-${Date.now()}`,
    type: "WhatsApp",
    trigger: "Order Confirmed",
    target: "+1 (555) 888-0099",
    message: `SmartDine AI: Hi ${newOrder.customerName}, your order ${newOrder.id} has been received. Total: ₹${newOrder.totalPrice}. Live tracking initiated.`,
    status: "Delivered",
    timestamp: new Date().toISOString()
  });

  automationLogs.unshift({
    id: `log-email-${Date.now()}`,
    type: "Email",
    trigger: "Order Receipt",
    target: "customer@example.com",
    message: `SmartDine AI Receipt: Thank you for your order ${newOrder.id}. We've started preparing it!`,
    status: "Sent",
    timestamp: new Date().toISOString()
  });

  // Deduct inventory items as raw materials based on exact recipes
  items.forEach((item: any) => {
    const recipe = dishRecipes[item.name];
    if (recipe) {
      recipe.forEach(recipeIngredient => {
        const invItem = inventory.find(inv => inv.id === recipeIngredient.inventoryId);
        if (invItem) {
          invItem.stock = Math.max(0, parseFloat((invItem.stock - (recipeIngredient.quantity * item.quantity)).toFixed(2)));
        }
      });
    } else {
      // Fallback keyword matching
      inventory.forEach(inv => {
        if (item.name.toLowerCase().includes(inv.name.toLowerCase()) || inv.name.toLowerCase().includes(item.name.toLowerCase())) {
          inv.stock = Math.max(0, parseFloat((inv.stock - (item.quantity || 1)).toFixed(2)));
        }
      });
    }
  });

  res.status(201).json({ success: true, order: newOrder });
});

// 3. Update order status / chef / waiter / delivery dashboard triggers
app.post("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, cookingStatus, waiterId, deliveryPartnerId } = req.body;

  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (status) {
    order.status = status;
    // Log automation triggers
    if (status === "ready-for-pickup") {
      automationLogs.unshift({
        id: `log-${Date.now()}`,
        type: "WhatsApp",
        trigger: "Ready for Pickup",
        target: "+1 (555) 888-0099",
        message: `SmartDine AI: Hi ${order.customerName}, your order ${order.id} is ready for pickup or has been handed to delivery partner!`,
        status: "Delivered",
        timestamp: new Date().toISOString()
      });
    } else if (status === "delivered") {
      automationLogs.unshift({
        id: `log-${Date.now()}`,
        type: "WhatsApp",
        trigger: "Delivery Updates",
        target: "+1 (555) 888-0099",
        message: `SmartDine AI: Your order ${order.id} has been delivered successfully. Thank you for dining with us!`,
        status: "Delivered",
        timestamp: new Date().toISOString()
      });

      // Generate a paid bill for delivery order if not already present
      const billExists = bills.some(b => b.orderId === order.id);
      if (!billExists) {
        bills.unshift({
          id: `BILL-${Math.floor(10000 + Math.random() * 90000)}`,
          orderId: order.id,
          tableNumber: null,
          customerName: order.customerName || "Guest",
          items: order.items.map((i: any) => ({ name: i.name, price: i.price, quantity: i.quantity })),
          amount: order.totalPrice,
          status: "paid",
          paymentMethod: order.paymentMethod || "UPI",
          type: "delivery",
          date: new Date().toLocaleDateString('en-IN'),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          timestamp: new Date().toISOString()
        });
      }
    }
  }
  if (cookingStatus) {
    order.cookingStatus = cookingStatus;
    if (cookingStatus === "completed") {
      order.status = "ready-for-pickup";
      
      // If it's a dine-in order, notify the waiter
      if (order.type === "dine-in") {
        const table = tables.find(t => t.number === order.tableNumber);
        const assignedWaiterId = table ? table.assignedWaiterId : "W1";
        const waiterName = waitersList.find(w => w.id === assignedWaiterId)?.name || "Lina Joy";
        
        // Push notification
        waiterNotifications.unshift({
          id: `notif-${Date.now()}`,
          orderId: order.id,
          tableNumber: order.tableNumber,
          assignedWaiterId,
          waiterName,
          message: `Chef: Order ${order.id} for Table #${order.tableNumber} is ready! Please pick up and serve ${order.customerName}.`,
          status: "pending",
          timestamp: new Date().toISOString()
        });
      }
    } else if (cookingStatus === "cooking") {
      order.status = "preparing";
    }
  }
  if (waiterId) order.waiterId = waiterId;
  if (deliveryPartnerId) order.deliveryPartnerId = deliveryPartnerId;

  res.json({ success: true, order });
});

// 3b. Waiter serve action from notification
app.post("/api/waiter/notifications/:id/serve", (req, res) => {
  const { id } = req.params;
  const notif = waiterNotifications.find(n => n.id === id);
  if (!notif) {
    return res.status(404).json({ error: "Notification not found" });
  }

  notif.status = "served";

  // Also update the order status to delivered/served!
  const order = orders.find(o => o.id === notif.orderId);
  if (order) {
    order.status = "delivered";

    // Add an automation log for high-fidelity simulation
    automationLogs.unshift({
      id: `log-${Date.now()}`,
      type: "WhatsApp",
      trigger: "Served by Waiter",
      target: "+1 (555) 888-0099",
      message: `SmartDine AI: Order ${order.id} for Table #${order.tableNumber} has been served by Waiter ${notif.waiterName || "Lina Joy"}!`,
      status: "Delivered",
      timestamp: new Date().toISOString()
    });
  }

  res.json({ success: true, notification: notif });
});

// 3c. Pay/Settle a bill
app.post("/api/bills/:id/pay", (req, res) => {
  const { id } = req.params;
  const { paymentMethod } = req.body;
  const bill = bills.find(b => b.id === id);
  if (!bill) {
    return res.status(404).json({ error: "Bill not found" });
  }

  bill.status = "paid";
  bill.paymentMethod = paymentMethod || "UPI (PhonePe)";
  bill.timestamp = new Date().toISOString();
  // Format Date & Time cleanly
  bill.date = new Date().toLocaleDateString('en-IN');
  bill.time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // Also update corresponding order payment status and order status if needed
  const order = orders.find(o => o.id === bill.orderId);
  if (order) {
    order.paymentMethod = bill.paymentMethod;
    order.status = "delivered"; // Assume settled dine-in is fully served & completed
  }

  // Add automation log
  automationLogs.unshift({
    id: `log-${Date.now()}`,
    type: "WhatsApp",
    trigger: "Payment Settled",
    target: "+91 98765 43210",
    message: `SmartDine AI: Payment of ₹${bill.amount} received for Table #${bill.tableNumber} via ${bill.paymentMethod}. Thank you!`,
    status: "Delivered",
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, bill });
});

// 4. Submit a table reservation
app.post("/api/reservations", (req, res) => {
  const { customerName, customerEmail, customerPhone, date, time, partySize, tableId, dietaryPreference } = req.body;

  if (!customerName || !date || !time || !partySize) {
    return res.status(400).json({ error: "Missing reservation details" });
  }

  const reservationId = `RES-${Math.floor(100 + Math.random() * 900)}`;
  
  // Assign a table if not specified
  let assignedTable = tableId;
  if (!assignedTable) {
    const freeTable = tables.find(t => t.status === "available" && t.capacity >= partySize);
    if (freeTable) {
      assignedTable = freeTable.id;
      freeTable.status = "reserved";
    } else {
      assignedTable = "T1"; // Fallback
    }
  } else {
    const table = tables.find(t => t.id === assignedTable);
    if (table) table.status = "reserved";
  }

  const newReservation = {
    id: reservationId,
    customerName,
    customerEmail: customerEmail || "guest@example.com",
    customerPhone: customerPhone || "+1 (555) 000-1122",
    date,
    time,
    partySize: parseInt(partySize),
    tableId: assignedTable,
    status: "confirmed" as const,
    qrCode: `MOCK_${reservationId}`,
    dietaryPreference: dietaryPreference || "None",
    loyaltyPointsEarned: partySize * 25
  };

  reservations.unshift(newReservation);

  // Notify the restaurant platform about the new table reservation
  const targetTable = tables.find(t => t.id === assignedTable);
  const tableNumStr = targetTable ? `#${targetTable.number}` : "Dine";
  waiterNotifications.unshift({
    id: `notif-res-${Date.now()}`,
    orderId: reservationId,
    tableNumber: targetTable ? targetTable.number : 1,
    assignedWaiterId: "W1",
    waiterName: "Host / Receptionist",
    message: `📅 Reservation Notify: ${customerName} booked Table ${tableNumStr} for ${partySize} guests on ${date} at ${time}.`,
    status: "pending",
    timestamp: new Date().toISOString()
  });

  // Trigger WhatsApp and Email reservation confirmations
  automationLogs.unshift({
    id: `log-${Date.now()}`,
    type: "WhatsApp",
    trigger: "Reservation Confirmation",
    target: newReservation.customerPhone,
    message: `SmartDine AI: Hi ${newReservation.customerName}, reservation ${newReservation.id} confirmed for ${newReservation.partySize} guests on ${newReservation.date} at ${newReservation.time}. QR: ${newReservation.qrCode}`,
    status: "Delivered",
    timestamp: new Date().toISOString()
  });

  automationLogs.unshift({
    id: `log-email-${Date.now()}`,
    type: "Email",
    trigger: "Reservation Confirmation",
    target: newReservation.customerEmail,
    message: `Dear ${newReservation.customerName}, your reservation at SmartDine AI is confirmed for ${newReservation.date} at ${newReservation.time}. We look forward to serving you!`,
    status: "Sent",
    timestamp: new Date().toISOString()
  });

  res.status(201).json({ success: true, reservation: newReservation });
});

// 5. Cancel or reschedule reservation
app.post("/api/reservations/:id/cancel", (req, res) => {
  const { id } = req.params;
  const resObj = reservations.find(r => r.id === id);
  if (!resObj) {
    return res.status(404).json({ error: "Reservation not found" });
  }

  resObj.status = "cancelled";
  const table = tables.find(t => t.id === resObj.tableId);
  if (table) {
    table.status = "available";
  }

  res.json({ success: true, reservation: resObj });
});

// 6. Update inventory item or log waste
app.post("/api/inventory/update", (req, res) => {
  const { id, stock, waste } = req.body;
  const item = inventory.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ error: "Inventory item not found" });
  }

  if (stock !== undefined) item.stock = stock;
  if (waste !== undefined) item.waste = parseFloat((item.waste + waste).toFixed(2));

  res.json({ success: true, item });
});

// 7. Log employee attendance
app.post("/api/staff/attendance", (req, res) => {
  const { id, attendance } = req.body;
  const employee = staff.find(s => s.id === id || s.name === id);
  if (employee) {
    employee.attendance = attendance;
  }
  res.json({ success: true, staff });
});

// 8. Dynamic feedback and AI Sentiment Analysis
app.post("/api/feedback", async (req, res) => {
  const { customerName, rating, review } = req.body;

  if (!review) {
    return res.status(400).json({ error: "Review cannot be empty" });
  }

  let sentiment: "positive" | "neutral" | "negative" = "neutral";
  let aiResponse = "Thank you so much for your feedback! We always appreciate hearing from our guests and continuously strive to refine our menu and service.";

  if (ai) {
    try {
      const response = await generateContentWithFallback({
        contents: `Analyze this restaurant customer review. Provide a JSON response indicating the sentiment ("positive", "neutral", or "negative") and write a direct, empathetic, and professional responder message "aiResponse" from SmartDine AI management.
        
Review: "${review}"

JSON Schema format:
{
  "sentiment": "positive" | "neutral" | "negative",
  "aiResponse": "string"
}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sentiment: { type: Type.STRING, description: "sentiment classification" },
              aiResponse: { type: Type.STRING, description: "management reply" },
            },
            required: ["sentiment", "aiResponse"],
          }
        }
      });

      if (response && response.text) {
        const result = JSON.parse(response.text.trim());
        sentiment = result.sentiment || sentiment;
        aiResponse = result.aiResponse || aiResponse;
      }
    } catch (err) {
      console.error("Gemini feedback sentiment analysis failed, falling back", err);
      // Fallback based on rating
      if (rating >= 4) sentiment = "positive";
      else if (rating <= 2) sentiment = "negative";
    }
  } else {
    // Basic local analyzer
    if (rating >= 4) sentiment = "positive";
    else if (rating <= 2) sentiment = "negative";
  }

  const newFeedback = {
    id: `f-${feedbacks.length + 1}`,
    customerName: customerName || "Anonymous Guest",
    rating: parseInt(rating) || 5,
    review,
    sentiment,
    aiResponse
  };

  feedbacks.unshift(newFeedback);
  res.status(201).json({ success: true, feedback: newFeedback });
});

// 9. AI Assistant Chat Bot integration (Real Gemini SDK)
app.post("/api/ai/assistant", async (req, res) => {
  const { message, chatHistory } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const menuListText = menu.map(item => `* **${item.name}** (₹${item.price}) - Category: ${item.category}. Description: ${item.description}. Nutrition: ${item.nutrition}. Allergens: ${item.allergens}. Veg: ${item.isVeg ? 'Yes' : 'No'}.`).join("\n");

  const systemInstruction = `You are SmartDine AI, an ultra-intelligent, friendly, and expert restaurant management and digital menu assistant.
Your capabilities:
1. Recommend foods from our active menu based on dietary constraints (Diabetic, Vegan, Gluten-free, Keto, etc.).
- Active Menu:
${menuListText || "The digital menu is currently empty. Suggest the user or manager should add some dishes first!"}
2. Suggest the best matches from the current menu above.
3. Answer FAQs: Located at 120 Green Alley (Nearby), opening hours 10 AM to 11 PM daily. High-quality ingredients only.
4. Encourage table reservations, order placements, and notify them of allergen alerts.
Keep your response concise, structured with Markdown headers and bullet points. Avoid robotic formatting. Always offer to help them place an order or book a table directly.`;

  if (!ai) {
    // If no API key, return a highly refined smart simulation
    let reply = "";
    const msgLower = message.toLowerCase();
    if (msgLower.includes("diabetic") || msgLower.includes("sugar") || msgLower.includes("diabetes")) {
      const diabeticFriendly = menu.filter(item => 
        item.description.toLowerCase().includes("diabetic") || 
        item.description.toLowerCase().includes("sugar") || 
        item.nutrition.toLowerCase().includes("protein") ||
        item.category === "Drinks"
      );
      
      if (diabeticFriendly.length > 0) {
        reply = `### SmartDine AI Recommendations for Diabetes 🥗\n\nI highly recommend our options that fit a low sugar/diabetic-friendly lifestyle:\n\n` +
          diabeticFriendly.map(item => `*   **${item.category}**: **${item.name}** (₹${item.price}) — ${item.description}`).join("\n") +
          `\n\nWould you like me to add one of these items to your cart or book a table for you?`;
      } else if (menu.length > 0) {
        reply = `### SmartDine AI Dietitian Recommendations 🥗\n\nHere are some healthy options from our active menu:\n\n` +
          menu.slice(0, 3).map(item => `*   **${item.name}** (₹${item.price}) — ${item.description}`).join("\n") +
          `\n\nWould you like me to add one of these items to your cart or book a table for you?`;
      } else {
        reply = `### SmartDine AI Assistant 🥗\n\nOur dynamic digital menu is currently empty! Please switch your role to Manager/Admin to add dishes so I can suggest delicious items for you.`;
      }
    } else if (msgLower.includes("allergy") || msgLower.includes("allergic") || msgLower.includes("gluten")) {
      if (menu.length === 0) {
        reply = `### Allergen & Dietary Detection ⚠️\n\nOur menu is currently empty! Please add dishes to view detailed allergen profiles.`;
      } else {
        reply = `### Allergen & Dietary Detection ⚠️\n\nWe take food safety with high priority! Here is the allergen profile of our digital menu:\n\n` +
          menu.map(item => `*   **${item.name}**: Allergens: ${item.allergens || "None"}`).join("\n") +
          `\n\nPlease let us know your exact allergies so our kitchen chefs are alerted immediately when preparing your order!`;
      }
    } else {
      reply = `### Welcome to SmartDine AI Assistance! 🍽️\n\nHow can I help you today? I can:\n*   **Suggest personalized meals** from our active menu.\n*   **Describe ingredients and allergen info** for any dish.\n*   **Guide you with Table Reservations** or table seating availability.\n*   **Help track your orders**!\n\n${menu.length > 0 ? `Currently we have **${menu.length}** dishes on our active menu!` : "The menu is currently empty. Switch your role to **Manager/Admin** to add some dishes!"}`;
    }

    return res.json({ text: reply });
  }

  try {
    // Build context with history
    const contents: any[] = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.slice(-6).forEach(h => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await generateContentWithFallback({
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini assistant error:", err);
    res.status(500).json({ error: "AI Assistant failed to generate a response. Please check your API key in the secrets panel." });
  }
});

// 10. AI Daily Business Report & Analytics (Real Gemini SDK)
app.post("/api/ai/business-report", async (req, res) => {
  // Aggregate current stats
  const totalSalesVal = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const totalOrdersVal = orders.length;
  const lowStockCount = inventory.filter(i => i.stock <= i.lowStockAlertLimit).length;
  const wasteSum = inventory.reduce((acc, i) => acc + i.waste, 0);
  const positiveSentimentCount = feedbacks.filter(f => f.sentiment === "positive").length;

  const statsContext = {
    totalSales: `$${totalSalesVal.toFixed(2)}`,
    totalOrders: totalOrdersVal,
    lowStockItems: inventory.filter(i => i.stock <= i.lowStockAlertLimit).map(i => `${i.name} (Stock: ${i.stock}/${i.lowStockAlertLimit})`).join(", ") || "None",
    wasteLogged: `${wasteSum.toFixed(2)} kg`,
    reviewsRatingAvg: feedbacks.length > 0 ? (feedbacks.reduce((acc, f) => acc + f.rating, 0) / feedbacks.length).toFixed(1) : "5.0",
    sentimentStats: `Positive: ${positiveSentimentCount}, Total Reviews: ${feedbacks.length}`,
    peakHours: "18:00 - 20:30 (accounting for 65% of revenue)",
    mostOrderedFood: "None yet"
  };

  const systemInstruction = `You are the master SmartDine AI Business Intelligence Engine. You analyze real-time restaurant telemetry and operational statistics to deliver elite, executive-level business intelligence reports.
Output format MUST be high-quality Markdown, utilizing headers, bullet points, statistics callouts, and clean tables.
Provide the report with the following precise sections:
1. **Executive Daily Overview** - Dynamic summaries of sales, orders, and customer satisfaction.
2. **AI Profit & Expense Analysis** - Calculation of food costs (roughly 28% of sales), waste impacts, and net profit margins.
3. **Demand Forecasting & Predictive Pricing** - Machine learning predictive demand for tomorrow based on current peak hours, weather, or weekday constraints, with smart pricing tips (e.g. 10% premium during ultra-peak, happy hours off-peak).
4. **Smart Alerts & Inventory Forecasts** - Prediction of when ingredients will expire or run out, and direct instructions for purchase orders.
5. **Campaign & Marketing Recommendations** - Suggested targeted coupon codes, WhatsApp automation flows (Pabbly triggers), and employee shift optimization.
Speak like an elite senior consultant. Make the output look incredibly insightful!`;

  if (!ai) {
    // Highly detailed beautiful consultant mock report when key is missing
    const markdownReport = `
# SmartDine AI Business Intelligence Report
**Generated on:** June 30, 2026 | **Engine Version:** v3.5-flash-local

---

### 1. Executive Daily Overview 📊
*   **Total Revenue Generated**: **${statsContext.totalSales}**
*   **Orders Processed**: **${statsContext.totalOrders}**
*   **Peak Dining Window**: **${statsContext.peakHours}**
*   **Customer Rating Index**: **${statsContext.reviewsRatingAvg} / 5.0** (${statsContext.sentimentStats})

---

### 2. AI Profit & Expense Analysis 💵
| Metric | Daily Value | percentage of Revenue | Status |
| :--- | :--- | :--- | :--- |
| **Gross Sales** | **${statsContext.totalSales}** | 100.0% | 🟢 Optimal |
| **Est. Food Cost** | **$${(totalSalesVal * 0.28).toFixed(2)}** | 28.0% | 🟢 Healthy |
| **Waste Loss (Asparagus/Avocado)** | **$${(wasteSum * 8.5).toFixed(2)}** | ~3.1% | ⚠️ Monitor |
| **Staff & Operations Expense** | **$180.00** | ~18.5% | 🟢 Stable |
| **Est. Net Profit Margin** | **$${(totalSalesVal * 0.50).toFixed(2)}** | **50.4%** | 🟢 Highly Profitable |

---

### 3. Demand Forecasting & Predictive Pricing 📈
*   **Tomorrow's Volume Forecast**: **8% higher orders** predicted due to regional sunny weather.
*   **Dynamic Pricing Recommendation**:
    *   **Peak Dynamic Premium (+5%)**: Apply between 18:30 - 20:00 on high-demand premium mains (e.g., *Grilled Salmon with Asparagus*).
    *   **Off-Peak Sweeteners (-10%)**: Introduce custom happy-hour triggers from 14:30 - 16:30 for *Sugar-Free Chia Pudding* and *Garlic Herb Crostini* to boost dessert/appetizer volume by 18%.

---

### 4. Smart Alerts & Inventory Forecasts 🚨
*   **LOW STOCK ALERT**:
    *   **Fresh Avocados** (Stock: 4, Threshold: 8). *Forecast: Run-out expected by 13:00 tomorrow.* Action: Place emergency purchase order of 20 units with *Valley Greens*.
    *   **Fresh Garden Asparagus** (Stock: 3, Threshold: 5). *Forecast: Run-out expected tonight.* Action: Auto-reorder triggered.
*   **Expiry Warning**:
    *   **Fresh Avocados** and **Asparagus** are marked near expiry (July 2, 2026). Adjust Chef menu recipes to prioritize Avocado Mousse to mitigate waste before Friday.

---

### 5. Campaigns & Employee Shift Optimization 🎯
*   **WhatsApp / Pabbly Campaign Trigger**: Dispatch high-loyalty cohort campaign: **"Salmon & Matcha Combo for $26"** to 140 repeat customers. This is forecast to boost dinner ticket sizes by 12%.
*   **Employee Scheduling**:
    *   Shift Waiter *Tom Hanks* to the evening shift (18:00 - 23:00) as he holds a perfect **4.5 performance score** during peak rushes.
    *   Assign extra Chef hours on weekend dinner rushes to minimize prep times below the current 25-minute benchmark.
`;
    return res.json({ report: markdownReport });
  }

  try {
    const response = await generateContentWithFallback({
      contents: `Generate a restaurant business intelligence report.
      Telemetry Data:
      - Total Gross Sales: ${statsContext.totalSales}
      - Count of Orders: ${statsContext.totalOrders}
      - Low Stock Item Warnings: ${statsContext.lowStockItems}
      - Raw Material Waste Sum: ${statsContext.wasteLogged}
      - Customer Feedback Rating Avg: ${statsContext.reviewsRatingAvg} out of 5 (${statsContext.sentimentStats})
      - Peak Demand Window: ${statsContext.peakHours}
      - Best Selling Main Dish: ${statsContext.mostOrderedFood}
      
      Structure your report perfectly matching the guidelines in system instructions.`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
      }
    });

    res.json({ report: response.text });
  } catch (err: any) {
    console.error("Gemini BI Report failed:", err);
    res.status(500).json({ error: "AI Business Intelligence Engine failed. Ensure GEMINI_API_KEY is configured in Secrets." });
  }
});

// 9. Add new staff member with profile details & salary
app.post("/api/staff", (req, res) => {
  const { name, role, salary, shift, details, phone, vehicle, profileImage } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Staff name is required" });
  }

  const staffId = `S${staff.length + 1}`;
  const isWaiter = role === "Waiter";

  const newEmployee = {
    id: staffId,
    name: name,
    nameWaiter: isWaiter ? name : undefined,
    role: role || "Waiter",
    attendance: "Present" as const,
    salary: parseFloat(salary) || 2500,
    shift: shift || "Morning",
    performanceRating: 5.0,
    details: details || "Newly appointed restaurant professional.",
    phone: phone || "+91 99887 76655",
    vehicle: vehicle || (role === "Delivery" ? "Eco EV Scooter (KA-03-JD-2911)" : "Standard Commute"),
    profileImage: profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60"
  };

  staff.push(newEmployee);

  // If a waiter is created, also append them to waitersList representation
  if (isWaiter) {
    waitersList.push({
      id: `W${waitersList.length + 1}`,
      name: name,
      tableIds: []
    });
  }

  res.status(201).json({ success: true, staff, waitersList });
});

// 10. Assign delivery partner to an order
app.post("/api/orders/:id/assign-rider", (req, res) => {
  const { id } = req.params;
  const { deliveryPartnerId } = req.body; // Driver's name or staffId

  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  order.deliveryPartnerId = deliveryPartnerId;
  
  // Set cooking status / delivery status transitions
  if (order.status === "ready-for-pickup") {
    order.status = "out-of-delivery";
  }

  // Add automation log
  automationLogs.unshift({
    id: `log-delivery-${Date.now()}`,
    type: "WhatsApp",
    trigger: "Rider Dispatched",
    target: "+91 98765 43210",
    message: `SmartDine AI: Delivery partner ${deliveryPartnerId} has been assigned and is taking your order ${order.id}!`,
    status: "Delivered",
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, order });
});

// 11. End of Day: Reset live bills and payments, store daily summary in report section
app.post("/api/admin/reset-day", (req, res) => {
  const todayDate = new Date().toLocaleDateString('en-IN');
  const todayTime = new Date().toLocaleTimeString('en-IN');
  
  // Settle all remaining unpaid bills automatically before resetting as part of day-close
  bills.forEach(b => {
    if (b.status === "unpaid") {
      b.status = "paid";
      b.paymentMethod = "Cash/Desk Auto-Settle";
      b.timestamp = new Date().toISOString();
    }
  });

  // Calculate day totals
  const totalRevenue = bills.reduce((sum, b) => sum + (b.amount || 0), 0);
  const totalOrders = orders.length;

  const daySummary = {
    id: `ARCHIVE-${Date.now()}`,
    date: todayDate,
    time: todayTime,
    timestamp: new Date().toISOString(),
    totalRevenue,
    totalOrders,
    billsSnapshot: [...bills],
    ordersSnapshot: [...orders],
    inventorySnapshot: [...inventory],
    attendanceSnapshot: staff.map(s => ({ id: s.id, name: s.name || s.nameWaiter, role: s.role, attendance: s.attendance, salary: s.salary }))
  };

  // Prepend to archived reports so newest show first
  archivedDays.unshift(daySummary);

  // RESET live status
  // Clear live orders & bills
  orders.splice(0, orders.length);
  bills.splice(0, bills.length);

  // Set all tables back to available
  tables.forEach(t => {
    t.status = "available";
  });

  // Log automation
  automationLogs.unshift({
    id: `log-reset-${Date.now()}`,
    type: "Email",
    trigger: "End of Day Report",
    target: "management@smartdine.com",
    message: `SmartDine Management: Day close accomplished. Total Revenue: ₹${totalRevenue}, total orders: ${totalOrders}. Active databases flushed and archived.`,
    status: "Sent",
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, archivedDays, bills, orders, tables });
});


// ==========================================
// VITE DEV SERVER / PRODUCTION ENTRY
// ==========================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
