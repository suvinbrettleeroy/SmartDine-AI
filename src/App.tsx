import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Compass,
  Utensils,
  User,
  ClipboardList,
  Briefcase,
  HeartHandshake,
  ShieldCheck,
  Search,
  Truck,
  Sparkles,
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  Calendar,
  Clock,
  Users,
  CheckCircle,
  MessageSquare,
  Send,
  Volume2,
  Split,
  RefreshCw,
  Sliders,
  UserPlus,
  Settings,
  Activity,
  TrendingUp,
  Coins,
  MapPin,
  Mail,
  QrCode,
  FileText,
  Check,
  X,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Info,
  Lock,
  DollarSign,
  Bell,
  Receipt,
  CreditCard,
  Percent,
  ShoppingBag
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import RoleSelector from "./components/RoleSelector";
import CustomerSidebar from "./components/CustomerSidebar";
import AdminSidebar from "./components/AdminSidebar";
import AdminDashboard from "./components/AdminDashboard";
import AdminInventory from "./components/AdminInventory";
import AdminReports from "./components/AdminReports";
import AdminReservations from "./components/AdminReservations";
import AdminStaff from "./components/AdminStaff";
import AdminAI from "./components/AdminAI";
import AdminMenu from "./components/AdminMenu";
import CustomerHome from "./components/CustomerHome";
import CustomerSettings from "./components/CustomerSettings";
import AdminSettings from "./components/AdminSettings";
import { MenuItem, Table, Order, Reservation, InventoryItem, Staff, Feedback, AutomationLog, WaiterAssignment } from "./types";

export default function App() {
  // State
  const [role, setRole] = useState<string>("customer");
  const [customerTab, setCustomerTab] = useState<string>("Home");
  const [adminTab, setAdminTab] = useState<string>("Dashboard");
  const [state, setState] = useState<{
    menu: MenuItem[];
    tables: Table[];
    orders: Order[];
    reservations: Reservation[];
    inventory: InventoryItem[];
    staff: Staff[];
    waitersList: WaiterAssignment[];
    feedbacks: Feedback[];
    automationLogs: AutomationLog[];
    waiterNotifications: any[];
    bills: any[];
    dishRecipes?: Record<string, { inventoryId: string; quantity: number }[]>;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Customer Portal Specific State
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [vegFilter, setVegFilter] = useState<"All" | "Veg" | "Non-Veg">("All");
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("Suvin Brett Lee");
  const [profile, setProfile] = useState({
    name: "Suvin Brett Lee",
    email: "suvinbrettleeroy@gmail.com",
    phone: "+91 98765 43210",
    location: "Adyar, Chennai",
    address: "Plot No. 42, Green Alley, Adyar, Chennai - 600020",
    additionalAddresses: [
      { id: "addr-1", tag: "HOME", title: "Home Address", text: "Plot No. 42, Green Alley, Adyar, Chennai - 600020" },
      { id: "addr-2", tag: "WORK", title: "Office Headquarters", text: "Tidel Park, Phase 2, Tharamani, Chennai - 600113" }
    ]
  });
  const [tableSelection, setTableSelection] = useState<number>(1);
  const [orderType, setOrderType] = useState<"dine-in" | "delivery" | "pickup">("dine-in");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [billingPayMethods, setBillingPayMethods] = useState<Record<string, string>>({});

  // Booking Table Form State
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("2026-06-30");
  const [bookingTime, setBookingTime] = useState("18:30");
  const [bookingParty, setBookingParty] = useState(2);
  const [bookingDiet, setBookingDiet] = useState("None");
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  // AI Assistant Specific State
  const [aiMessage, setAiMessage] = useState("");
  const [aiHistory, setAiHistory] = useState<{ role: "user" | "model"; text: string }[]>([
    {
      role: "model",
      text: "### Welcome to SmartDine AI Assist! 🍽️\n\nI can recommend meals, check ingredients/allergens, explain nutritional facts, or answer FAQs (Opening hours: 10AM - 11PM, Address: 120 Green Alley).\n\n*Try saying:* **\"I'm diabetic\"** or **\"Show vegan protein-rich options\"**."
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  // AI Business Report State
  const [biReport, setBiReport] = useState<string | null>(null);
  const [biLoading, setBiLoading] = useState(false);

  // Admin Login Verification State
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [customerTheme, setCustomerTheme] = useState<"dark" | "light">("dark");
  const [adminTheme, setAdminTheme] = useState<string>("Slate Dark");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Admin / State modification helper states
  const [newDish, setNewDish] = useState({
    name: "",
    category: "Breakfast",
    price: 50,
    isVeg: true,
    isBestSeller: false,
    nutrition: "Cal: 250, Protein: 10g",
    allergens: "None",
    description: "",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"
  });

  // Waiter Feedback Collection State
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackName, setFeedbackName] = useState("");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Split bill calculator state
  const [splitBillAmount, setSplitBillAmount] = useState<number>(0);
  const [splitCount, setSplitCount] = useState<number>(2);

  // Dish-Based Inventory & Recipe Link states
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    stock: 50,
    unit: "kg",
    lowStockAlertLimit: 10,
    costPerUnit: 100
  });
  const [recipeDishName, setRecipeDishName] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState<{ inventoryId: string; quantity: number }[]>([]);
  const [currentLinkIng, setCurrentLinkIng] = useState("");
  const [currentLinkQty, setCurrentLinkQty] = useState(0.1);
  const [inventoryRestockQty, setInventoryRestockQty] = useState<Record<string, number>>({});
  const [inventoryWasteQty, setInventoryWasteQty] = useState<Record<string, number>>({});

  const handleCreateIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIngredient.name || !newIngredient.unit) return;
    try {
      const res = await fetch("/api/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIngredient)
      });
      if (res.ok) {
        setNewIngredient({ name: "", stock: 50, unit: "kg", lowStockAlertLimit: 10, costPerUnit: 100 });
        alert(`🥬 Created ingredient "${newIngredient.name}" persistently!`);
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveRecipeLink = async (dishName: string, ingredients: { inventoryId: string; quantity: number }[]) => {
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dishName, ingredients })
      });
      if (res.ok) {
        alert(`🔗 Saved recipe ingredient mappings for "${dishName}"!`);
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Fetch Entire Operating State
  const fetchState = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/state");
      if (!res.ok) throw new Error("Failed to fetch state telemetry");
      const data = await res.json();
      setState(data);
    } catch (err: any) {
      setError(err.message || "Unknown state sync error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  // Post new order
  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    try {
      const itemsPayload = cart.map(c => ({
        id: c.item.id,
        name: c.item.name,
        quantity: c.quantity,
        price: c.item.price
      }));

      const subtotal = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
      let discountedSubtotal = subtotal;
      if (appliedCoupon === "WELCOME10") {
        discountedSubtotal = subtotal * 0.9;
      } else if (appliedCoupon === "HEALTHY") {
        discountedSubtotal = subtotal * 0.85;
      }

      const payload = {
        customerName,
        tableNumber: orderType === "dine-in" ? tableSelection : null,
        type: orderType,
        items: itemsPayload,
        totalPrice: parseFloat(discountedSubtotal.toFixed(2)),
        paymentMethod,
        couponCode: appliedCoupon
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setCart([]);
        setAppliedCoupon(null);
        setCoupon("");
        await fetchState();
        // Switch view perspective to tracked orders or pop up a subtle notification
        alert("🎉 Order placed successfully! The SmartDine AI Engine has synchronized your kitchen tickets & triggered automatic WhatsApp logs.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Submit Table Booking
  const handleBookTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingDate || !bookingTime) {
      alert("Please fill in required fields.");
      return;
    }

    try {
      const payload = {
        customerName: bookingName,
        customerEmail: bookingEmail,
        customerPhone: bookingPhone,
        date: bookingDate,
        time: bookingTime,
        partySize: bookingParty,
        dietaryPreference: bookingDiet
      };

      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setBookingSuccess(data.reservation);
        // Clear fields
        setBookingName("");
        setBookingEmail("");
        setBookingPhone("");
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Change cooking or order delivery status
  const handleUpdateOrderStatus = async (orderId: string, updates: { status?: string; cookingStatus?: string }) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Assign delivery rider to order
  const handleAssignRider = async (orderId: string, riderName: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/assign-rider`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryPartnerId: riderName })
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // State to trigger state-based reset confirmation dialog
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Trigger Daily Operations Reset and Permanent Archive
  const handleResetDay = async () => {
    try {
      const res = await fetch("/api/admin/reset-day", { method: "POST" });
      if (res.ok) {
        setShowResetConfirm(false);
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Waiter serve order from notification
  const handleWaiterServe = async (notifId: string) => {
    try {
      const res = await fetch(`/api/waiter/notifications/${notifId}/serve`, {
        method: "POST"
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Pay / Settle a table bill
  const handlePayBill = async (billId: string, paymentMethod: string) => {
    try {
      const res = await fetch(`/api/bills/${billId}/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod })
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Update Inventory Stock / Log Waste
  const handleUpdateInventory = async (id: string, stock?: number, waste?: number) => {
    try {
      const res = await fetch("/api/inventory/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, stock, waste })
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Log Staff Attendance
  const handleLogAttendance = async (id: string, status: "Present" | "Absent") => {
    try {
      const res = await fetch("/api/staff/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, attendance: status })
      });
      if (res.ok) {
        await fetchState();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Submit Feedback via Real Gemini AI Sentiment analysis
  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText) return;
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: feedbackName || "Anonymous Guest",
          rating: feedbackRating,
          review: feedbackText
        })
      });

      if (res.ok) {
        setFeedbackText("");
        setFeedbackName("");
        setFeedbackSuccess(true);
        setTimeout(() => setFeedbackSuccess(false), 3000);
        await fetchState();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Ask AI Assistant chatbot
  const askAIAssistant = async (customMessage?: string) => {
    const msgToSend = customMessage || aiMessage;
    if (!msgToSend.trim()) return;

    setAiHistory(prev => [...prev, { role: "user", text: msgToSend }]);
    if (!customMessage) setAiMessage("");
    setAiLoading(true);

    try {
      const res = await fetch("/api/ai/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgToSend,
          chatHistory: aiHistory
        })
      });

      if (res.ok) {
        const data = await res.json();
        setAiHistory(prev => [...prev, { role: "model", text: data.text }]);
      } else {
        const errorData = await res.json();
        setAiHistory(prev => [...prev, { role: "model", text: `⚠️ Error: ${errorData.error || "Failed to generate AI response."}` }]);
      }
    } catch (e) {
      setAiHistory(prev => [...prev, { role: "model", text: "⚠️ Network Error: Could not connect to Gemini Assistant." }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Load AI Business Intelligence executive report
  const generateBusinessReport = async () => {
    setBiLoading(true);
    setBiReport(null);
    try {
      const res = await fetch("/api/ai/business-report", { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        setBiReport(data.report);
      } else {
        setBiReport("Failed to generate real-time predictive BI report.");
      }
    } catch (e) {
      setBiReport("Error connecting to Gemini Business Intelligence Engine.");
    } finally {
      setBiLoading(false);
    }
  };

  // Add menu item in Admin Portal persistently
  const handleAddDish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDish.name || !newDish.description) return;
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDish)
      });
      if (res.ok) {
        const data = await res.json();
        if (state && data.item) {
          setState({
            ...state,
            menu: [...state.menu, data.item]
          });
        }
        setNewDish({
          name: "",
          category: "Breakfast",
          price: 50,
          isVeg: true,
          isBestSeller: false,
          nutrition: "Cal: 250, Protein: 10g",
          allergens: "None",
          description: "",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60"
        });
        alert(`🍽️ Published "${data.item.name}" persistently to digital menu!`);
      } else {
        alert("Failed to add dish to the server database.");
      }
    } catch (err) {
      console.error("Error adding dish:", err);
    }
  };

  // Delete menu item in Admin/Manager Portal persistently
  const handleDeleteDish = async (id: string) => {
    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (res.ok) {
        const data = await res.json();
        if (state) {
          setState({
            ...state,
            menu: state.menu.filter(m => m.id !== id)
          });
        }
        // Also remove from local cart
        setCart(prev => prev.filter(c => c.item.id !== id));
      } else {
        alert("Failed to delete dish from the server database.");
      }
    } catch (err) {
      console.error("Error deleting dish:", err);
    }
  };

  // Cart helper functions
  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const updateCartQty = (itemId: string, diff: number) => {
    setCart(prev => {
      return prev.map(c => {
        if (c.item.id === itemId) {
          const newQty = c.quantity + diff;
          return newQty <= 0 ? null : { ...c, quantity: newQty };
        }
        return c;
      }).filter(Boolean) as { item: MenuItem; quantity: number }[];
    });
  };

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === "WELCOME10") {
      setAppliedCoupon("WELCOME10");
    } else if (coupon.trim().toUpperCase() === "HEALTHY") {
      setAppliedCoupon("HEALTHY");
    } else {
      alert("Invalid coupon code! Try 'WELCOME10' (10% off) or 'HEALTHY' (15% off).");
    }
  };

  // Filtered menu logic
  const filteredMenu = useMemo(() => {
    if (!state) return [];
    return state.menu.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          item.description.toLowerCase().includes(customerSearch.toLowerCase()) ||
                          item.allergens.toLowerCase().includes(customerSearch.toLowerCase());
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchVeg = vegFilter === "All" || (vegFilter === "Veg" ? item.isVeg : !item.isVeg);
      return matchSearch && matchCategory && matchVeg;
    });
  }, [state, customerSearch, selectedCategory, vegFilter]);

  // Financial aggregates
  const liveRevenue = useMemo(() => {
    if (!state) return 0;
    return state.orders.reduce((sum, o) => sum + o.totalPrice, 0);
  }, [state]);

  const activeReservationsCount = useMemo(() => {
    if (!state) return 0;
    return state.reservations.filter(r => r.status === "confirmed").length;
  }, [state]);

  const criticalInventoryCount = useMemo(() => {
    if (!state) return 0;
    return state.inventory.filter(i => i.stock <= i.lowStockAlertLimit).length;
  }, [state]);

  const getThemeClass = () => {
    if (role === "customer") {
      return customerTheme === "light" ? "customer-theme-light" : "";
    } else {
      if (adminTheme === "Clean Minimalist Light") return "admin-theme-light";
      if (adminTheme === "Pure OLED Black") return "admin-theme-oled";
      return "";
    }
  };

  return (
    <div className={`flex h-screen w-screen bg-[#070b13] font-sans text-slate-200 overflow-hidden ${getThemeClass()}`}>
      {/* Dynamic Left Sidebar depending on view */}
      {role === "customer" ? (
        <CustomerSidebar
          activeTab={customerTab}
          setActiveTab={setCustomerTab}
          points={2450}
          setRole={setRole}
        />
      ) : (
        <AdminSidebar
          currentRole={role}
          setRole={setRole}
          adminTab={adminTab}
          setAdminTab={setAdminTab}
        />
      )}

      {/* Main layout frame */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Dynamic header depending on perspective */}
        {role === "customer" ? (
          <header className="h-16 border-b border-slate-800/80 flex items-center justify-between px-6 bg-[#090d16] shrink-0">
            {/* Location selector */}
            <div className="flex items-center gap-2 bg-slate-950/40 px-3.5 py-1.5 rounded-xl border border-slate-800/40 text-slate-300">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span className="text-xs font-semibold">{profile.location}</span>
            </div>

            {/* Global Search */}
            <div className="flex-1 max-w-md mx-6 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search for restaurants, cuisines, dishes..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full bg-[#04060b] border border-slate-800/60 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-orange-500 placeholder-slate-500"
              />
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-5">
              {/* Offers */}
              <button onClick={() => setCustomerTab("Loyalty Rewards")} className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer">
                <Percent className="w-4 h-4 text-orange-500" />
                <span>Offers</span>
              </button>

              {/* Notifications */}
              <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                <Bell className="w-4 h-4 text-slate-300" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-600 rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                  3
                </span>
              </div>

              {/* Cart */}
              <div className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => {
                const el = document.getElementById("customer-menu-anchor");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}>
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-slate-300" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-600 rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                      {cart.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-300">Cart</span>
              </div>

              {/* Restaurants Platform Switching Button */}
              <button 
                onClick={() => {
                  setRole("admin");
                  setAdminTab("Dashboard");
                }} 
                className="flex items-center gap-1.5 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-lg shadow-orange-600/10 cursor-pointer transition-all shrink-0"
                id="restaurant-platform-btn"
                title="Go to Restaurant Platform (Admin portal)"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Restaurant Platform</span>
              </button>

              {/* User profile */}
              <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-xs font-extrabold text-white">
                  👨‍🍳
                </div>
                <div className="text-left leading-tight hidden md:block">
                  <div className="text-xs font-bold text-white">Hi, {profile.name.split(" ")[0]} 🙋‍♂️</div>
                  <div className="text-[9px] text-amber-500 font-bold uppercase tracking-wider">Gold Member</div>
                </div>
              </div>
            </div>
          </header>
        ) : (
          <header className="h-16 border-b border-slate-800/80 flex items-center justify-between px-6 bg-[#090d16] shrink-0">
            {/* Search */}
            <div className="w-80 relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-slate-950 border border-slate-800/60 rounded-xl py-2 pl-9 pr-4 text-[11px] text-white focus:outline-none focus:border-orange-500 placeholder-slate-500"
              />
            </div>

            {/* Stats, quick toggle, profile */}
            <div className="flex items-center gap-5">
              {/* Language */}
              <span className="text-xs font-bold font-mono text-slate-400 border border-slate-800 px-2 py-0.5 rounded-md">
                EN 🌐
              </span>

              {/* Notifications */}
              <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                <Bell className="w-4 h-4 text-slate-300" />
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-orange-600 rounded-full text-[8px] font-bold text-white flex items-center justify-center">
                  8
                </span>
              </div>

              {/* Support Chat */}
              <div className="cursor-pointer hover:opacity-80 transition-opacity text-slate-400 hover:text-white" onClick={() => setAdminTab("AI_Assistant")}>
                💬
              </div>

              {/* Customer Portal Switching Button */}
              <button 
                onClick={() => setRole("customer")} 
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-lg shadow-emerald-600/10 cursor-pointer transition-all shrink-0 font-sans"
                id="customer-portal-btn"
                title="Go to Customer Portal"
              >
                <User className="w-3.5 h-3.5" />
                <span>Customer Portal</span>
              </button>

              {/* Admin Switcher/Auth button */}
              <button 
                onClick={() => {
                  if (isAdminAuthenticated) {
                    setIsAdminAuthenticated(false);
                    alert("Admin session signed out.");
                  } else {
                    setAdminUsername("");
                    setAdminPassword("");
                    setLoginError("");
                    setShowAdminLogin(true);
                  }
                }} 
                className={`flex items-center gap-1.5 font-extrabold text-[10px] uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-lg cursor-pointer transition-all shrink-0 font-sans ${
                  isAdminAuthenticated 
                    ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/10" 
                    : "bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-700"
                }`}
                id="admin-auth-btn"
                title={isAdminAuthenticated ? "You are authenticated as Admin. Click to log out." : "Click to authenticate as Admin"}
              >
                <Lock className={`w-3.5 h-3.5 ${isAdminAuthenticated ? "text-emerald-300 animate-pulse" : "text-slate-400"}`} />
                <span>{isAdminAuthenticated ? "Admin (Verified)" : "Admin"}</span>
              </button>

              {/* User profile */}
              <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-extrabold text-white">
                  👑
                </div>
                <div className="text-left leading-tight">
                  <div className="text-xs font-bold text-white">Hi, Admin 👋</div>
                  <div className="text-[9px] text-indigo-400 font-bold uppercase tracking-wider">Super Admin</div>
                </div>
              </div>

              <button 
                onClick={fetchState} 
                title="Force Sync Live Telemetry" 
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer border border-slate-800"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              </button>
            </div>
          </header>
        )}

        {/* Dynamic View container - High Density Layouts */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#070b13]">
          
          {loading && !state && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-3" />
              <p className="text-sm font-mono text-slate-400">Synchronizing SmartDine AI cloud database...</p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded-xl text-rose-300 text-xs mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Telemetry Sync Failed: {error}. Make sure server is online.</span>
            </div>
          )}

          {state && (
            <div className="space-y-6">
              {/* ==========================================
                  CUSTOMER PORTAL VIEW (HIGH FIDELITY)
                  ========================================== */}
              {role === "customer" && (
                <div id="customer-portal-view" className="space-y-6">
                  {/* Tab 1: Home */}
                  {customerTab === "Home" && (
                    <CustomerHome
                      state={state}
                      activeTab={customerTab}
                      setActiveTab={setCustomerTab}
                      cart={cart}
                      onAddToCart={(item) => {
                        const existing = cart.find(i => i.item.id === item.id);
                        if (existing) {
                          updateCartQty(item.id, 1);
                        } else {
                          setCart([...cart, { item, quantity: 1 }]);
                        }
                      }}
                      onRemoveFromCart={(item) => {
                        updateCartQty(item.id, -1);
                      }}
                      customerSearch={customerSearch}
                      setCustomerSearch={setCustomerSearch}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      tableSelection={tableSelection}
                      setTableSelection={setTableSelection}
                      orderType={orderType}
                      setOrderType={setOrderType as any}
                      onCheckout={handlePlaceOrder}
                    />
                  )}

                  {/* Tab 2: Restaurants */}
                  {customerTab === "Restaurants" && (
                    <div className="space-y-6">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center max-w-xl mx-auto space-y-3">
                        <span className="text-3xl">🧭</span>
                        <h3 className="text-sm font-bold text-white font-display">Explore Partner Restaurants</h3>
                        <p className="text-xs text-slate-400">
                          We are partnered with Chennai's absolute best dining spots to bring premium taste directly to your table or home.
                        </p>
                      </div>
                      <CustomerHome
                        state={state}
                        activeTab={customerTab}
                        setActiveTab={setCustomerTab}
                        cart={cart}
                        onAddToCart={(item) => {
                          const existing = cart.find(i => i.item.id === item.id);
                          if (existing) {
                            updateCartQty(item.id, 1);
                          } else {
                            setCart([...cart, { item, quantity: 1 }]);
                          }
                        }}
                        onRemoveFromCart={(item) => {
                          updateCartQty(item.id, -1);
                        }}
                        customerSearch={customerSearch}
                        setCustomerSearch={setCustomerSearch}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        tableSelection={tableSelection}
                        setTableSelection={setTableSelection}
                        orderType={orderType}
                        setOrderType={setOrderType as any}
                        onCheckout={handlePlaceOrder}
                      />
                    </div>
                  )}

                  {/* Tab 3: Orders */}
                  {customerTab === "Orders" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-display">My Orders tracking</h2>
                        <span className="text-[10px] font-mono text-slate-400">{state.orders.length} orders total</span>
                      </div>

                      {state.orders.length === 0 ? (
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 font-mono text-xs">
                          You have not placed any orders yet. Go to Home to start ordering!
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {state.orders.map((order) => (
                            <div key={order.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-sm hover:border-slate-700 transition-all">
                              <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                                <div>
                                  <span className="text-[10px] font-mono text-slate-500 block">ORDER ID</span>
                                  <span className="text-xs font-extrabold text-white font-mono">{order.id}</span>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase ${
                                  order.status === "pending" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                  order.status === "preparing" ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 animate-pulse" :
                                  order.status === "ready-for-pickup" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                                  order.status === "out-of-delivery" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                                  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                }`}>
                                  {order.status}
                                </span>
                              </div>

                              <div className="space-y-1.5">
                                {order.items.map((item, i) => (
                                  <div key={i} className="flex justify-between text-xs font-mono">
                                    <span className="text-slate-400">{item.name} x{item.quantity}</span>
                                    <span className="text-slate-300">₹{item.price * item.quantity}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-2 border-t border-slate-850 flex justify-between items-center">
                                <div className="text-[10px] font-mono text-slate-500">
                                  Type: <span className="text-white font-bold uppercase">{order.type}</span>
                                </div>
                                <div className="text-xs font-bold text-orange-500 font-mono">
                                  Total: ₹{order.totalPrice.toFixed(2)}
                                </div>
                              </div>

                               {order.type === "delivery" && order.status !== "delivered" && (
                                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-2.5 font-sans">
                                  <div className="text-slate-400 text-[10px] font-mono uppercase font-bold tracking-wider">🛵 Live Courier Tracking:</div>
                                  {order.deliveryPartnerId ? (
                                    (() => {
                                      const rider = state?.staff?.find(s => s.name === order.deliveryPartnerId || s.id === order.deliveryPartnerId);
                                      return (
                                        <div className="space-y-2">
                                          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                                            <div className="flex items-center gap-2.5">
                                              <img
                                                src={rider?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"}
                                                alt={order.deliveryPartnerId}
                                                referrerPolicy="no-referrer"
                                                className="w-9 h-9 rounded-full border border-slate-800 object-cover shrink-0"
                                              />
                                              <div>
                                                <div className="text-white font-bold text-xs">{order.deliveryPartnerId}</div>
                                                <div className="text-[9px] text-slate-400 font-mono">{rider?.vehicle || "Eco EV Scooter"}</div>
                                              </div>
                                            </div>
                                            <div className="text-right text-[10px] font-mono text-slate-400">
                                              <div>{rider?.phone || "+91 99887 66554"}</div>
                                              <div className="text-yellow-500 font-bold">★ {rider?.performanceRating || "5.0"} Rating</div>
                                            </div>
                                          </div>
                                          <p className="text-[10px] text-indigo-400 italic font-medium font-sans">
                                            "{rider?.name || "Rider"} has picked up your fresh hot food and is routing via GPS to your doorstep!"
                                          </p>
                                        </div>
                                      );
                                    })()
                                  ) : (
                                    <div className="text-white font-mono text-[10px] animate-pulse flex items-center gap-1.5">
                                      <span className="inline-block w-2 h-2 rounded-full bg-orange-500"></span>
                                      Locating nearest rider and dispatching...
                                    </div>
                                  )}
                                  {order.deliveryOtp && (
                                    <div className="text-[10px] font-mono bg-slate-900 px-2 py-1 border border-slate-800 text-orange-400 rounded flex justify-between items-center">
                                      <span>Security Handshake OTP:</span>
                                      <strong className="text-white text-xs">{order.deliveryOtp}</strong>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tab 4: Reservations */}
                  {customerTab === "Reservations" && (
                    <div className="max-w-2xl mx-auto space-y-6">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                          <h3 className="text-xs font-extrabold uppercase tracking-tight text-white font-display">
                            SmartDine Table Seat Booking Station
                          </h3>
                          <span className="text-[10px] font-mono bg-orange-950/40 text-orange-400 border border-orange-800/30 px-1.5 rounded">
                            Reserve instantly
                          </span>
                        </div>

                        {bookingSuccess ? (
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <span>✅ Table Seat Booking Confirmed!</span>
                            </h4>
                            <p className="text-slate-300 text-xs">
                              Seat secured for <strong>{bookingSuccess.partySize} guests</strong> on <strong>{bookingSuccess.date}</strong> at <strong>{bookingSuccess.time}</strong>.
                            </p>
                            <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg border border-slate-800">
                              <span className="text-3xl">🎫</span>
                              <div className="font-mono text-[9px] text-slate-400">
                                <div>Show QR code upon entrance:</div>
                                <div className="text-white font-bold tracking-widest">{bookingSuccess.qrCode}</div>
                                <div className="text-indigo-400 font-bold">Earned {bookingSuccess.loyaltyPointsEarned} Loyalty points!</div>
                              </div>
                            </div>
                            <button onClick={() => setBookingSuccess(null)} className="text-[9px] underline text-slate-400 hover:text-white cursor-pointer">
                              Book another table
                            </button>
                          </div>
                        ) : (
                          <form onSubmit={handleBookTable} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Your Name *</label>
                              <input
                                type="text"
                                required
                                placeholder="Suvin"
                                value={bookingName}
                                onChange={(e) => setBookingName(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 p-2 rounded focus:outline-none focus:border-orange-500 text-white text-[11px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Contact Phone *</label>
                              <input
                                type="tel"
                                required
                                placeholder="+91 98765 43210"
                                value={bookingPhone}
                                onChange={(e) => setBookingPhone(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 p-2 rounded focus:outline-none focus:border-orange-500 text-white text-[11px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Date *</label>
                              <input
                                type="date"
                                required
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 p-2 rounded focus:outline-none focus:border-orange-500 text-white text-[11px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Time *</label>
                              <input
                                type="time"
                                required
                                value={bookingTime}
                                onChange={(e) => setBookingTime(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 p-2 rounded focus:outline-none focus:border-orange-500 text-white text-[11px]"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Guests count</label>
                              <select
                                value={bookingParty}
                                onChange={(e) => setBookingParty(parseInt(e.target.value))}
                                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white focus:outline-none focus:border-orange-500"
                              >
                                {[1, 2, 3, 4, 5, 6, 8].map(num => (
                                  <option key={num} value={num} className="bg-slate-900">
                                    {num} People
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Dietary preferences</label>
                              <input
                                type="text"
                                placeholder="None / Vegetarian / Soy allergy..."
                                value={bookingDiet}
                                onChange={(e) => setBookingDiet(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 p-2 rounded focus:outline-none focus:border-orange-500 text-white text-[11px]"
                              />
                            </div>
                            <div className="sm:col-span-2 pt-2">
                              <button
                                type="submit"
                                className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded font-bold uppercase transition-all tracking-wider cursor-pointer text-xs shadow-md shadow-orange-600/10"
                              >
                                Secure My Table Seat
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab 5: Favorites */}
                  {customerTab === "Favorites" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-display">My Favorite food items</h2>
                        <span className="text-[10px] font-mono text-slate-400">Quick re-order</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {state.menu.filter((m: MenuItem) => m.isBestSeller).map((item: MenuItem) => (
                          <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4.5 space-y-3 shadow-md relative">
                            <span className="absolute top-2.5 right-2.5 text-rose-500">❤️</span>
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                              <div>
                                <h4 className="text-xs font-bold text-white font-display">{item.name}</h4>
                                <span className="text-[10px] font-mono text-orange-500 font-bold">₹{item.price}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                const inCart = cart.find(i => i.item.id === item.id);
                                if (inCart) {
                                  updateCartQty(item.id, 1);
                                } else {
                                  setCart([...cart, { item, quantity: 1 }]);
                                }
                              }}
                              className="w-full py-1 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-bold uppercase rounded-lg cursor-pointer transition-all"
                            >
                              Add to Bill Cart
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tab 6: Loyalty Rewards */}
                  {customerTab === "Loyalty Rewards" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                      {/* Left Block: Points Balance */}
                      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
                        <div className="border-b border-slate-850 pb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">Your Loyalty Points balance</h3>
                        </div>
                        <div className="py-6 text-center">
                          <div className="text-4xl font-extrabold font-mono text-amber-400">2,450</div>
                          <span className="text-xs text-slate-400 font-mono mt-1 block">Active Rewards Points</span>
                        </div>
                        <div className="space-y-2 text-[11px]">
                          <div className="flex justify-between p-2 bg-slate-950 border border-slate-850 rounded-lg">
                            <span className="text-slate-400">Free Starter Vouchers</span>
                            <strong className="text-emerald-400">Active (2)</strong>
                          </div>
                          <div className="flex justify-between p-2 bg-slate-950 border border-slate-850 rounded-lg">
                            <span className="text-slate-400">Membership Tier</span>
                            <strong className="text-amber-500">Gold Club member</strong>
                          </div>
                        </div>
                      </div>

                      {/* Right Block: AI dietitian assistant */}
                      <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col h-[400px] shadow-md">
                        <div className="flex items-center justify-between border-b border-slate-850 pb-2.5 mb-3">
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">AI Dietitian & Nutritionist Advisor</h3>
                          </div>
                          <span className="text-[9px] font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-800/40 px-1.5 rounded">
                            Gemini 3.5 Active
                          </span>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 text-[11px] font-sans scrollbar-thin">
                          {aiHistory.map((h, i) => (
                            <div key={i} className={`flex gap-2.5 ${h.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                h.role === "user" ? "bg-slate-700 text-white" : "bg-gradient-to-tr from-emerald-500 to-indigo-600 text-white"
                              }`}>
                                {h.role === "user" ? "U" : "AI"}
                              </div>
                              <div className={`p-2.5 rounded-xl border max-w-[85%] whitespace-pre-line leading-relaxed ${
                                h.role === "user"
                                  ? "bg-slate-800 border-slate-700 text-slate-100 rounded-tr-none"
                                  : "bg-slate-950 border-slate-850 text-slate-200 rounded-tl-none font-sans"
                              }`}>
                                {h.text}
                              </div>
                            </div>
                          ))}
                          {aiLoading && (
                            <div className="flex items-center gap-2 text-slate-500 italic text-[10px] animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                              <span>SmartDine AI dietitian is calculating facts...</span>
                            </div>
                          )}
                        </div>

                        {/* Quick Prompt Recommendations */}
                        <div className="grid grid-cols-3 gap-1.5 mt-3 border-t border-slate-850 pt-2.5 shrink-0">
                          <button
                            onClick={() => askAIAssistant("I'm diabetic. What do you recommend and why?")}
                            className="px-2 py-1 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[9px] text-indigo-300 rounded font-mono truncate text-left cursor-pointer"
                          >
                            🥗 "I'm diabetic"
                          </button>
                          <button
                            onClick={() => askAIAssistant("Show organic gluten-free options and allergens alerts.")}
                            className="px-2 py-1 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[9px] text-indigo-300 rounded font-mono truncate text-left cursor-pointer"
                          >
                            ⚠️ Gluten-free
                          </button>
                          <button
                            onClick={() => askAIAssistant("Are there calorie-free drinks or healthy vegan desserts?")}
                            className="px-2 py-1 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[9px] text-indigo-300 rounded font-mono truncate text-left cursor-pointer"
                          >
                            🌱 Vegan options
                          </button>
                        </div>

                        {/* Chat input box */}
                        <div className="flex gap-2 mt-3 shrink-0">
                          <input
                            type="text"
                            placeholder="Ask diet parameters (e.g. Soy allergy, low carb)..."
                            value={aiMessage}
                            onChange={(e) => setAiMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && askAIAssistant()}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                          />
                          <button
                            onClick={() => askAIAssistant()}
                            disabled={aiLoading}
                            className="p-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors cursor-pointer shrink-0"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 7: Wallet */}
                  {customerTab === "Wallet" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
                        <div className="border-b border-slate-850 pb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">SmartDine digital Wallet</h3>
                        </div>
                        <div className="bg-gradient-to-r from-orange-600 to-amber-500 p-5 rounded-xl text-white space-y-3 relative overflow-hidden">
                          <span className="text-[9px] font-mono tracking-widest block opacity-75">PREPAID LOYALTY CARD</span>
                          <div className="text-3xl font-extrabold font-mono">₹1,250.00</div>
                          <span className="text-[10px] block opacity-90">User: suvinbrettleeroy@gmail.com</span>
                          <span className="absolute right-4 bottom-4 text-3xl opacity-20 font-bold font-mono">GOLD</span>
                        </div>
                        <button className="w-full py-2 bg-slate-950 border border-slate-800 hover:bg-slate-850 text-[10px] text-white font-bold uppercase rounded-lg transition-all cursor-pointer">
                          + Top Up Balance
                        </button>
                      </div>

                      {/* Split Bill Calculator */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
                        <div className="border-b border-slate-850 pb-2">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">Split Bill calculator</h3>
                        </div>
                        <div className="space-y-3.5 text-xs">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-mono">Enter Bill Amount (₹)</label>
                            <input
                              type="number"
                              value={splitBillAmount}
                              onChange={(e) => setSplitBillAmount(parseFloat(e.target.value) || 0)}
                              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 font-mono">Number of Friends</label>
                            <input
                              type="number"
                              min={1}
                              value={splitCount}
                              onChange={(e) => setSplitCount(parseInt(e.target.value) || 1)}
                              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white"
                            />
                          </div>
                          <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl text-center">
                            <span className="text-[9px] text-slate-400 font-mono block">Each Friend Pays</span>
                            <strong className="text-xl font-mono text-orange-500 block mt-0.5">₹{(splitBillAmount / (splitCount || 1)).toFixed(2)}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 8: Addresses */}
                  {customerTab === "Addresses" && (
                    <div className="max-w-2xl mx-auto space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h2 className="text-sm font-extrabold uppercase tracking-wider text-white font-display">My Saved Delivery Addresses</h2>
                        <button className="text-[10px] bg-orange-600 hover:bg-orange-500 text-white font-bold px-2 py-1 rounded cursor-pointer transition-all">Add New Address</button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all relative">
                          <span className="text-xs absolute top-3 right-3 bg-slate-950 px-2 py-0.5 rounded text-orange-400 font-mono">HOME</span>
                          <span className="text-2xl">🏠</span>
                          <h4 className="text-xs font-bold text-white font-display mt-2">Home Address</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                            Plot No. 42, Green Alley, Adyar, Chennai - 600020
                          </p>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all relative">
                          <span className="text-xs absolute top-3 right-3 bg-slate-950 px-2 py-0.5 rounded text-indigo-400 font-mono">WORK</span>
                          <span className="text-2xl">🏢</span>
                          <h4 className="text-xs font-bold text-white font-display mt-2">Office Headquarters</h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                            Tidel Park, Phase 2, Tharamani, Chennai - 600113
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 9: Support */}
                  {customerTab === "Support" && (
                    <div className="max-w-lg mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-md">
                      <div className="border-b border-slate-850 pb-2.5">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-white font-display">Submit Direct Support feedback</h3>
                      </div>

                      {feedbackSuccess ? (
                        <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-emerald-400 text-xs text-center space-y-1">
                          <strong>🎉 Feedback Submitted Successfully!</strong>
                          <p className="text-slate-300">
                            Thank you, {feedbackName}! Your response has been logged into the Admin Staff metrics.
                          </p>
                          <button onClick={() => setFeedbackSuccess(false)} className="text-[9px] underline text-slate-400 hover:text-white mt-2">
                            Submit another response
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmitFeedback} className="space-y-4 text-xs">
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Your Name *</label>
                            <input
                              type="text"
                              required
                              value={feedbackName}
                              onChange={(e) => setFeedbackName(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 p-2 rounded focus:outline-none focus:border-indigo-500 text-white text-[11px]"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Rating Level (1-5 Stars)</label>
                            <select
                              value={feedbackRating}
                              onChange={(e) => setFeedbackRating(parseInt(e.target.value))}
                              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white focus:outline-none focus:border-indigo-500"
                            >
                              {[5, 4, 3, 2, 1].map(star => (
                                <option key={star} value={star} className="bg-slate-900">
                                  {"⭐".repeat(star)} ({star} Stars)
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Your Feedback comment *</label>
                            <textarea
                              required
                              rows={3}
                              placeholder="Describe your dining or delivery experience..."
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              className="w-full bg-slate-950 border border-slate-800 p-2 rounded focus:outline-none focus:border-indigo-500 text-white text-[11px] resize-none"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded font-bold uppercase tracking-wider cursor-pointer"
                          >
                            Submit Support Review
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {/* Tab 10: Settings / Profile Information */}
                  {customerTab === "Settings" && (
                    <CustomerSettings
                      profile={profile}
                      setProfile={setProfile}
                      setCustomerName={setCustomerName}
                      points={2450}
                      setRole={setRole}
                      setActiveTab={setCustomerTab}
                      customerTheme={customerTheme}
                      setCustomerTheme={setCustomerTheme}
                    />
                  )}

                </div>
              )}

              {/* ==========================================
                  KITCHEN CHEF VIEW
                  ========================================== */}
              {role === "kitchen" && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                  {/* Left Column: Core live cooking queue list */}
                  <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-orange-400" />
                        <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">
                          Live Chef Cooking Queue
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-slate-950 text-slate-400 px-2.5 py-0.5 rounded font-mono border border-slate-850">
                          Avg prep: <strong className="text-indigo-400">14m 22s</strong>
                        </span>
                        <span className="text-[9px] bg-orange-950/80 text-orange-400 border border-orange-800/40 px-2 py-0.5 rounded font-mono">
                          Queue: Optimal
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {state.orders.filter(o => o.status !== "delivered" && o.status !== "out-of-delivery").length === 0 ? (
                        <div className="py-12 text-center text-slate-500 font-mono text-xs">
                          No cooking orders currently in queue. All tables satisfied!
                        </div>
                      ) : (
                        state.orders.filter(o => o.status !== "delivered" && o.status !== "out-of-delivery").map(order => (
                          <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3 shadow-inner relative overflow-hidden">
                            {/* Accent highlight bar based on status */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                              order.cookingStatus === "completed" ? "bg-emerald-500" :
                              order.cookingStatus === "cooking" ? "bg-orange-500" : "bg-slate-600"
                            }`}></div>

                            <div className="flex items-center justify-between pl-2">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 border border-slate-800 rounded">
                                  {order.id}
                                </span>
                                <span className="text-[10px] text-slate-400 uppercase font-bold">
                                  {order.type === "dine-in" ? `🍽️ Table #${order.tableNumber}` : order.type === "pickup" ? "🛍️ Takeaway" : "🚚 Delivery"}
                                </span>
                                <span className="text-slate-600 text-[10px] font-mono">|</span>
                                <span className="text-slate-300 font-bold text-xs">{order.customerName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] text-slate-500 font-mono">
                                  Ordered {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                  order.cookingStatus === "completed" ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/40" :
                                  order.cookingStatus === "cooking" ? "bg-orange-950/80 text-orange-400 border border-orange-800/40" :
                                  "bg-slate-900 text-slate-400 border border-slate-800"
                                }`}>
                                  {order.cookingStatus}
                                </span>
                              </div>
                            </div>

                            {/* Order items lists */}
                            <div className="pl-2 space-y-1">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-xs bg-slate-900/60 p-1.5 rounded border border-slate-900">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-emerald-400 font-bold">x{item.quantity}</span>
                                    <span className="text-white font-medium">{item.name}</span>
                                  </div>
                                  <span className="text-[10px] font-mono text-slate-500">Est prep: 12 mins</span>
                                </div>
                              ))}
                            </div>

                            {/* Chef Quick Actions */}
                            <div className="pl-2 pt-2 border-t border-slate-900 flex justify-between items-center flex-wrap gap-2 text-xs">
                              <div className="text-[10px] text-slate-400 font-mono">
                                Payment: <strong className="text-emerald-400">{order.paymentMethod}</strong> {order.couponCode ? `(Promo: ${order.couponCode})` : ""}
                              </div>

                              <div className="flex gap-2">
                                {order.cookingStatus === "queued" && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(order.id, { cookingStatus: "cooking", status: "preparing" })}
                                    className="px-3 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded text-[10px] font-bold uppercase transition-all cursor-pointer"
                                  >
                                    Accept & Start Cooking
                                  </button>
                                )}
                                {order.cookingStatus === "cooking" && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(order.id, { cookingStatus: "completed", status: "ready-for-pickup" })}
                                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase transition-all cursor-pointer"
                                  >
                                    Mark Food Ready
                                  </button>
                                )}
                                {order.cookingStatus === "completed" && (
                                  <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" /> Ready for pickup/delivery!
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Delivery Partner Assignment Section */}
                            {order.type === "delivery" && (
                              <div className="pl-2 pt-2 mt-2 border-t border-slate-900 space-y-1.5 text-xs font-sans">
                                <div className="flex items-center gap-1.5 text-[10px] font-mono text-purple-400 font-bold">
                                  <span>🛵 Live Delivery Rider Profile:</span>
                                </div>
                                {order.deliveryPartnerId ? (
                                  (() => {
                                    const rider = state?.staff?.find(s => s.name === order.deliveryPartnerId || s.id === order.deliveryPartnerId);
                                    return (
                                      <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-850 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                          <img
                                            src={rider?.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60"}
                                            alt={order.deliveryPartnerId}
                                            referrerPolicy="no-referrer"
                                            className="w-7 h-7 rounded-full border border-slate-800 object-cover shrink-0"
                                          />
                                          <div>
                                            <div className="text-white font-bold text-xs">{order.deliveryPartnerId}</div>
                                            <div className="text-[9px] text-slate-400 font-mono">{rider?.vehicle || "Eco EV Scooter"}</div>
                                          </div>
                                        </div>
                                        <div className="text-right text-[10px] font-mono text-slate-400">
                                          <div>{rider?.phone || "+91 99887 66554"}</div>
                                          <div className="text-yellow-500 font-bold">★ {rider?.performanceRating || "5.0"}</div>
                                        </div>
                                      </div>
                                    );
                                  })()
                                ) : (
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <select
                                      onChange={async (e) => {
                                        const val = e.target.value;
                                        if (val) {
                                          await handleAssignRider(order.id, val);
                                        }
                                      }}
                                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] text-white focus:outline-none"
                                    >
                                      <option value="">-- Choose Rider --</option>
                                      {state?.staff?.filter(s => s.role === "Delivery").map(s => (
                                        <option key={s.id} value={s.name}>{s.name} ({s.shift} Shift)</option>
                                      ))}
                                    </select>
                                    <span className="text-[9px] text-slate-500 italic font-mono">Assign rider to dispatch</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Right Column: Inventory tracking, raw materials waste monitor, supplier orders */}
                  <div className="xl:col-span-4 space-y-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-1.5">
                          <Sliders className="w-4 h-4 text-orange-400" />
                          <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">Raw Materials Stock</h3>
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">6 Raw Items</span>
                      </div>

                      <div className="space-y-2.5">
                        {state.inventory.map(item => {
                          const isLowStock = item.stock <= item.lowStockAlertLimit;
                          return (
                            <div key={item.id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 space-y-1.5 text-xs">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-200">{item.name}</span>
                                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                  isLowStock ? "bg-rose-950 text-rose-400 font-bold" : "bg-slate-900 text-slate-400"
                                }`}>
                                  {item.stock} Units left
                                </span>
                              </div>

                              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                                <span>Expiry: <strong className="text-amber-400">{item.expiryDate}</strong></span>
                                <span>Supplier: {item.supplier}</span>
                              </div>

                              {/* Progress bar */}
                              <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${isLowStock ? "bg-rose-500" : "bg-emerald-500"}`}
                                  style={{ width: `${Math.min(100, (item.stock / 25) * 100)}%` }}
                                ></div>
                              </div>

                              {isLowStock && (
                                <p className="text-[9px] text-rose-400 italic">
                                  ⚠️ stock below critical threshold ({item.lowStockAlertLimit}). Auto purchase order generated!
                                </p>
                              )}

                              {/* Direct Chef Inventory Replenishment controls */}
                              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-900">
                                <span className="text-[9px] font-mono text-slate-500">Waste log: {item.waste} kg</span>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleUpdateInventory(item.id, item.stock + 5)}
                                    className="px-1.5 py-0.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[9px] font-bold text-indigo-400 cursor-pointer"
                                  >
                                    +5 Stock
                                  </button>
                                  <button
                                    onClick={() => handleUpdateInventory(item.id, undefined, 0.5)}
                                    className="px-1.5 py-0.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[9px] font-bold text-rose-400 cursor-pointer"
                                    title="Log 0.5kg Food Waste"
                                  >
                                    Log Waste
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==========================================
                  DIGITAL WAITER VIEW
                  ========================================== */}
              {role === "waiter" && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                  {/* Left Column: Digital Table assignments & Bill split stations */}
                  <div className="xl:col-span-8 space-y-4">
                    
                    {/* Live Pick-Up & Service Notifications */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 shadow-md">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Bell className="w-5 h-5 text-amber-400 animate-bounce" />
                          <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">
                            Dine-In Service & Pick-Up Alerts
                          </h3>
                        </div>
                        <span className="px-2 py-0.5 bg-amber-950/80 text-amber-400 border border-amber-800/40 rounded text-[9px] font-mono font-bold animate-pulse">
                          {state?.waiterNotifications?.filter(n => n.status === "pending").length || 0} PENDING ACTIONS
                        </span>
                      </div>

                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {!state?.waiterNotifications || state.waiterNotifications.filter(n => n.status === "pending").length === 0 ? (
                          <div className="py-6 text-center text-slate-500 font-mono text-xs flex flex-col items-center justify-center gap-2">
                            <span className="text-xl">🙌</span>
                            <span>All ready dine-in orders have been successfully served! Keep up the good work.</span>
                          </div>
                        ) : (
                          state.waiterNotifications.filter(n => n.status === "pending").map((notif) => (
                            <div key={notif.id} className="bg-slate-950 border border-slate-850 rounded-lg p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:border-amber-500/50 transition-all shadow">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[9px] font-mono font-extrabold uppercase">
                                    Ready for Table #{notif.tableNumber}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    Order: {notif.orderId}
                                  </span>
                                  <span className="text-slate-600 font-mono text-[9px]">•</span>
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-200 font-medium">
                                  {notif.message}
                                </p>
                                <div className="text-[10px] text-slate-400">
                                  Assigned Waiter: <strong className="text-white">{notif.waiterName || "Lina Joy"}</strong>
                                </div>
                              </div>

                              <button
                                onClick={() => handleWaiterServe(notif.id)}
                                className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-[10px] font-bold uppercase rounded-lg shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 transition-all"
                              >
                                <span>🏃‍♂️ Pick Up & Serve</span>
                              </button>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Served logs history toggle */}
                      {state?.waiterNotifications?.some(n => n.status === "served") && (
                        <div className="mt-2 pt-2 border-t border-slate-800">
                          <details className="group">
                            <summary className="text-[10px] font-mono text-slate-500 hover:text-slate-300 cursor-pointer select-none outline-none">
                              View recently served history ({state.waiterNotifications.filter(n => n.status === "served").length})
                            </summary>
                            <div className="mt-2 space-y-1.5 max-h-32 overflow-y-auto">
                              {state.waiterNotifications.filter(n => n.status === "served").map((notif) => (
                                <div key={notif.id} className="bg-slate-950 border border-slate-900 p-2 rounded text-[10px] flex justify-between items-center text-slate-400 font-mono">
                                  <div>
                                    <span className="text-emerald-500 font-bold mr-1.5">✓ SERVED</span>
                                    <span>Table #{notif.tableNumber} ({notif.orderId}) served by {notif.waiterName}</span>
                                  </div>
                                  <span className="text-[9px] text-slate-600">
                                    {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <ClipboardList className="w-4 h-4 text-blue-400" />
                        <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">Digital Table Grid Assignments</h3>
                      </div>
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase">
                        Real-time Occupancy
                      </span>
                    </div>

                    {/* Table assignments list */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {state.tables.map(table => (
                        <div key={table.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-between space-y-3 relative shadow-inner">
                          <div>
                            <div className="flex justify-between items-center">
                              <span className="font-mono text-xs font-bold text-white">T-{table.number}</span>
                              <span className={`w-2 h-2 rounded-full ${
                                table.status === "available" ? "bg-emerald-500 animate-pulse" :
                                table.status === "occupied" ? "bg-red-500" : "bg-indigo-500"
                              }`} title={`Status: ${table.status}`}></span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 mt-1">Cap: {table.capacity} Seaters</div>
                          </div>

                          <div className="bg-slate-900 p-1.5 rounded border border-slate-850 text-[9px] font-mono text-slate-400">
                            <div>Waiter assigned:</div>
                            <div className="text-white font-bold">
                              {state.waitersList.find(w => w.id === table.assignedWaiterId)?.name || "Lina Joy"}
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-500 italic">
                            Status: <strong className="text-slate-300 uppercase text-[9px]">{table.status}</strong>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Split Bill Calculator & Digital receipt generator */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-white font-bold uppercase tracking-tight">
                          <Split className="w-4 h-4 text-blue-400" />
                          <span>Digital Invoice & Split Bill station</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500">Calculator</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 uppercase font-bold">Total Bill amount (₹)</label>
                          <input
                            type="number"
                            placeholder="280.00"
                            value={splitBillAmount}
                            onChange={(e) => setSplitBillAmount(parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-900 border border-slate-800 p-2 rounded focus:outline-none focus:border-blue-500 text-white font-mono text-[11px]"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-mono text-slate-400 uppercase font-bold">Split Count (People)</label>
                          <select
                            value={splitCount}
                            onChange={(e) => setSplitCount(parseInt(e.target.value))}
                            className="w-full bg-slate-900 border border-slate-800 p-2 rounded focus:outline-none focus:border-blue-500 text-white text-[11px]"
                          >
                            {[2, 3, 4, 5, 6, 8, 10].map(p => (
                              <option key={p} value={p} className="bg-slate-900">{p} People</option>
                            ))}
                          </select>
                        </div>
                        <div className="bg-slate-900/80 p-2 rounded border border-slate-800 flex flex-col justify-center items-center text-center">
                          <div className="text-[9px] text-slate-400 font-mono">Each person pays</div>
                          <div className="text-sm font-extrabold font-mono text-emerald-400">
                            ₹{splitBillAmount > 0 ? (splitBillAmount / splitCount).toFixed(2) : "0.00"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                  {/* Right Column: Take Instant Orders using tablet & Customer Feedback collection */}
                  <div className="xl:col-span-4 space-y-4">
                    
                    {/* Tablet Instant Order Booking */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
                        <Smartphone className="w-4 h-4 text-blue-400" />
                        <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">Digital Tablet Order Station</h3>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-normal">
                        Waiters can quickly punch items directly from the table side. Select item to dispatch directly:
                      </p>

                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {state.menu.map(dish => (
                          <div key={dish.id} className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-850 text-xs hover:border-blue-500 transition-colors">
                            <div>
                              <div className="font-bold text-slate-200">{dish.name}</div>
                              <div className="text-[9px] text-slate-400 font-mono">₹{dish.price.toFixed(2)} | {dish.category}</div>
                            </div>
                            <button
                              onClick={() => addToCart(dish)}
                              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white font-mono text-[9px] rounded font-bold uppercase transition-all cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        ))}
                      </div>

                      {cart.length > 0 && (
                        <div className="bg-slate-950 p-2.5 rounded border border-slate-850 space-y-2">
                          <div className="text-[10px] font-mono text-slate-400 flex justify-between">
                            <span>Punch active cart:</span>
                            <span className="text-white font-bold">{cart.length} items</span>
                          </div>
                          <button
                            onClick={() => {
                              setCustomerName("Table Walk-In Guest");
                              setOrderType("dine-in");
                              handlePlaceOrder();
                            }}
                            className="w-full py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer"
                          >
                            Dispatch Order To Kitchen
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Customer feedback collector */}
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                      <div className="flex items-center gap-1.5 border-b border-slate-800 pb-2">
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                        <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">Record Customer Feedback</h3>
                      </div>

                      {feedbackSuccess && (
                        <div className="p-3 bg-emerald-950/60 border border-emerald-800/40 rounded-xl text-[11px] text-emerald-400 animate-fade-in font-bold flex items-center gap-1">
                          <CheckCircle className="w-4 h-4 animate-bounce" /> Recorded successfully with AI Sentiment analysis!
                        </div>
                      )}

                      <form onSubmit={handleSubmitFeedback} className="space-y-3 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Customer Name (Optional)</label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={feedbackName}
                            onChange={(e) => setFeedbackName(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Feedback Rating</label>
                          <select
                            value={feedbackRating}
                            onChange={(e) => setFeedbackRating(parseInt(e.target.value))}
                            className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white"
                          >
                            <option value="5" className="bg-slate-900">★★★★★ (Excellent Service)</option>
                            <option value="4" className="bg-slate-900">★★★★☆ (Very Good)</option>
                            <option value="3" className="bg-slate-900">★★★☆☆ (Average / Satisfactory)</option>
                            <option value="2" className="bg-slate-900">★★☆☆☆ (Disappointed / Delayed)</option>
                            <option value="1" className="bg-slate-900">★☆☆☆☆ (Extremely Unsatisfied)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Customer Review Text *</label>
                          <textarea
                            required
                            placeholder="Salmon was beautiful. Service was stellar but took a little bit long on Buddha bowl..."
                            rows={3}
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] resize-none focus:outline-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold uppercase transition-all tracking-wide cursor-pointer"
                        >
                          Run AI Sentiment Analyze & Save
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* ==========================================
                  BILLING & PAYMENT VIEW
                  ========================================== */}
              {role === "billing" && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                  {/* Daily Reset Operations Banner */}
                  <div className="xl:col-span-12 bg-slate-900 border border-slate-800/60 p-4 rounded-xl flex items-center justify-between flex-wrap gap-4 shadow shadow-slate-950/40 bg-gradient-to-r from-slate-900 via-slate-900 to-red-950/15">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase font-sans">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        Daily Operations Reset & Archival Console
                      </div>
                      <p className="text-[11px] text-slate-400 max-w-2xl font-sans">
                        Daily operational reset clears live unpaid table invoices, flushes active dine-in orders, frees table occupancies, and locks in daily revenue summaries to permanent historical archives.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="px-4 py-2 bg-gradient-to-r from-red-700 to-rose-700 hover:from-red-600 hover:to-rose-600 text-white rounded text-[11px] font-bold uppercase transition-all tracking-wide cursor-pointer shadow shadow-red-950/50"
                    >
                      ⚡ Close Day & Archive Ledger
                    </button>
                  </div>

                  {/* Operational Reset Confirmation Modal Overlay */}
                  {showResetConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-md w-full space-y-4 shadow-2xl relative">
                        <div className="border-b border-slate-800 pb-3">
                          <h4 className="text-sm font-extrabold text-red-400 uppercase tracking-wide flex items-center gap-1.5 font-sans">
                            ⚠️ Critical Operations Reset Confirmation
                          </h4>
                        </div>
                        <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed font-sans">
                          <p className="font-bold text-white">This high-consequence action will execute the following:</p>
                          <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px] font-mono">
                            <li>Automatically settle all active unpaid tables</li>
                            <li>Snapshot all transactions, sales, and employee rosters</li>
                            <li>Settle and archive daily operational revenue</li>
                            <li>Wipe current-day active orders and active bills</li>
                            <li>Free all physical tables (status = available)</li>
                            <li>Clear temporary waiter notifications</li>
                          </ul>
                          <p className="text-red-400 font-bold text-[10px] uppercase font-mono mt-2 bg-red-950/25 p-2 rounded border border-red-900/20">
                            Warning: Flushed live data cannot be reverted. Snapshot will be filed under reports.
                          </p>
                        </div>
                        <div className="flex gap-2 justify-end pt-1">
                          <button
                            onClick={() => setShowResetConfirm(false)}
                            className="px-3.5 py-1.5 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase transition-all cursor-pointer border border-slate-800"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleResetDay}
                            className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded text-[10px] font-bold uppercase transition-all cursor-pointer shadow shadow-red-950/40"
                          >
                            Yes, Execute Reset & Archive
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top Aggregates Stats Row */}
                  <div className="xl:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow shadow-slate-950/40">
                      <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Total Settled Revenue</div>
                      <div className="text-xl font-extrabold text-emerald-400 mt-1">
                        ₹{state?.bills?.filter(b => b.status === "paid").reduce((sum, b) => sum + b.amount, 0).toFixed(2) || "0.00"}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">From {state?.bills?.filter(b => b.status === "paid").length} settled bills</div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow shadow-slate-950/40">
                      <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Unpaid Receivables</div>
                      <div className="text-xl font-extrabold text-amber-400 mt-1">
                        ₹{state?.bills?.filter(b => b.status === "unpaid").reduce((sum, b) => sum + b.amount, 0).toFixed(2) || "0.00"}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">From {state?.bills?.filter(b => b.status === "unpaid").length} active tables</div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow shadow-slate-950/40">
                      <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Settled Transactions</div>
                      <div className="text-xl font-extrabold text-indigo-400 mt-1">
                        {state?.bills?.filter(b => b.status === "paid").length || 0}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">Completed payments</div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow shadow-slate-950/40">
                      <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Active Table Bills</div>
                      <div className="text-xl font-extrabold text-blue-400 mt-1">
                        {state?.bills?.filter(b => b.status === "unpaid").length || 0}
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 mt-0.5">Dining in progress</div>
                    </div>
                  </div>

                  {/* Left Column: Active / Unpaid Bills */}
                  <div className="xl:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-amber-400" />
                        <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">Active Dine-In Table Bills</h3>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-950/80 text-amber-400 border border-amber-800/40 rounded text-[9px] font-mono font-bold animate-pulse">
                        {state?.bills?.filter(b => b.status === "unpaid").length || 0} UNPAID
                      </span>
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                      {!state?.bills || state.bills.filter(b => b.status === "unpaid").length === 0 ? (
                        <div className="py-12 text-center text-slate-500 font-mono text-xs flex flex-col items-center justify-center gap-2">
                          <span className="text-2xl">🎉</span>
                          <span>No active unpaid bills. All dining tables are fully settled!</span>
                        </div>
                      ) : (
                        state.bills.filter(b => b.status === "unpaid").map((bill) => {
                          const currentPayMethod = billingPayMethods[bill.id] || "UPI (Google Pay)";
                          return (
                            <div key={bill.id} className="bg-slate-950 border border-slate-850 rounded-lg p-4 space-y-3 hover:border-slate-700 transition-all shadow">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-[9px] font-mono font-extrabold uppercase">
                                      Table #{bill.tableNumber}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-mono">
                                      {bill.id}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-300 mt-1 font-medium">
                                    Customer: <strong className="text-white">{bill.customerName || "Guest"}</strong>
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs font-mono text-slate-500">
                                    {bill.date} {bill.time}
                                  </div>
                                  <div className="text-sm font-bold text-amber-400 mt-0.5">
                                    ₹{bill.amount.toFixed(2)}
                                  </div>
                                </div>
                              </div>

                              {/* Dishes List */}
                              <div className="bg-slate-900/60 rounded p-2 border border-slate-850/50 space-y-1">
                                <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono block">Ordered Items:</span>
                                {bill.items.map((item: any, idx: number) => (
                                  <div key={idx} className="flex justify-between text-[11px] text-slate-300 font-mono">
                                    <span>{item.name} <strong className="text-slate-500">x{item.quantity}</strong></span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Settle Form Actions */}
                              <div className="flex flex-col sm:flex-row items-slate sm:items-center justify-between gap-3 pt-2 border-t border-slate-900">
                                <div className="flex items-center gap-1.5 flex-1">
                                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">Payment Mode:</span>
                                  <select
                                    value={currentPayMethod}
                                    onChange={(e) => setBillingPayMethods({ ...billingPayMethods, [bill.id]: e.target.value })}
                                    className="bg-slate-900 border border-slate-800 rounded p-1 text-[11px] text-slate-200 focus:outline-none focus:border-indigo-500 flex-1"
                                  >
                                    <option value="UPI (Google Pay)">UPI (Google Pay)</option>
                                    <option value="UPI (PhonePe)">UPI (PhonePe)</option>
                                    <option value="UPI (Paytm)">UPI (Paytm)</option>
                                    <option value="Credit Card">Credit Card</option>
                                    <option value="Debit Card">Debit Card</option>
                                    <option value="Cash Payment">Cash Payment</option>
                                  </select>
                                </div>

                                <button
                                  onClick={() => handlePayBill(bill.id, currentPayMethod)}
                                  className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono text-[10px] font-extrabold uppercase rounded shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
                                >
                                  <CreditCard className="w-3 h-3" />
                                  <span>Receive & Settle</span>
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Right Column: Settle History / Paid Bills */}
                  <div className="xl:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">Settle History / Paid Bills</h3>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 rounded text-[9px] font-mono font-bold">
                        {state?.bills?.filter(b => b.status === "paid").length || 0} SETTLED
                      </span>
                    </div>

                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                      {!state?.bills || state.bills.filter(b => b.status === "paid").length === 0 ? (
                        <div className="py-12 text-center text-slate-500 font-mono text-xs">
                          <span>No settled payments recorded yet.</span>
                        </div>
                      ) : (
                        state.bills.filter(b => b.status === "paid").map((bill) => (
                          <div key={bill.id} className="bg-slate-950 border border-slate-900 rounded-lg p-3 space-y-2 hover:border-emerald-900/40 transition-all">
                            <div className="flex justify-between items-start text-xs">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[8px] font-mono font-bold">
                                    Table #{bill.tableNumber}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    {bill.id}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-300 mt-1">
                                  Customer: <strong className="text-white">{bill.customerName || "Guest"}</strong>
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] font-mono text-slate-500 block">{bill.date} {bill.time}</span>
                                <span className="text-xs font-bold text-emerald-400">₹{bill.amount.toFixed(2)}</span>
                              </div>
                            </div>

                            {/* Dishes micro-list */}
                            <div className="text-[10px] text-slate-400 font-mono bg-slate-900/30 p-1.5 rounded border border-slate-900/60">
                              {bill.items.map((it: any, idx: number) => (
                                <div key={idx} className="flex justify-between">
                                  <span>• {it.name} <strong className="text-slate-500">x{it.quantity}</strong></span>
                                  <span>₹{(it.price * it.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>

                            {/* Payment details */}
                            <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono border-t border-slate-900/80 pt-1.5">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Paid via: <strong className="text-slate-300">{bill.paymentMethod}</strong>
                              </span>
                              <span className="text-emerald-500 font-extrabold uppercase text-[8px]">Paid & Settled</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Delivery Orders Completed Payments Table */}
                  <div className="xl:col-span-12 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-purple-400" />
                        <h3 className="text-xs font-extrabold uppercase tracking-tight text-white font-sans">
                          🛵 Completed Delivery Payments Ledger
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 bg-purple-950 text-purple-400 border border-purple-800/40 rounded text-[9px] font-mono font-bold">
                        {state?.orders?.filter((o: any) => o.type === "delivery" && o.status === "delivered").length || 0} DELIVERED & PAID
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-sans uppercase text-[10px] tracking-wider">
                            <th className="py-2.5 px-3">Order ID</th>
                            <th className="py-2.5 px-3">Customer Name</th>
                            <th className="py-2.5 px-3">Dishes Ordered List</th>
                            <th className="py-2.5 px-3 text-right">Price (Itemized)</th>
                            <th className="py-2.5 px-3 text-right">Total Price</th>
                            <th className="py-2.5 px-3 text-center">Payment Status</th>
                            <th className="py-2.5 px-3 text-center">Payment Mode</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state?.orders?.filter((o: any) => o.type === "delivery" && o.status === "delivered").length === 0 ? (
                            <tr>
                              <td colSpan={7} className="py-10 text-center text-slate-500 italic font-mono text-xs">
                                No completed delivery payments registered today.
                              </td>
                            </tr>
                          ) : (
                            state.orders.filter((o: any) => o.type === "delivery" && o.status === "delivered").map((order: any) => (
                              <tr key={order.id} className="border-b border-slate-850 hover:bg-slate-950/40 text-slate-300 transition-colors">
                                <td className="py-3 px-3 font-bold text-slate-400">{order.id}</td>
                                <td className="py-3 px-3 font-semibold text-white">{order.customerName}</td>
                                <td className="py-3 px-3 max-w-xs truncate">
                                  <div className="space-y-1">
                                    {order.items.map((item: any, idx: number) => (
                                      <div key={idx} className="text-[11px] text-slate-300">
                                        • {item.name} <span className="text-slate-500 font-mono">x{item.quantity}</span>
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-right">
                                  <div className="space-y-1 text-[10px] text-slate-400">
                                    {order.items.map((item: any, idx: number) => (
                                      <div key={idx}>
                                        ₹{item.price}
                                      </div>
                                    ))}
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-right font-extrabold text-emerald-400">
                                  ₹{order.totalPrice.toFixed(2)}
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded font-bold uppercase font-sans">
                                    <CheckCircle className="w-2.5 h-2.5" /> Successful
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-950/50 px-2 py-1 rounded border border-indigo-900/30">
                                    {order.paymentMethod || "UPI (Google Pay)"}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ==========================================
                  DELIVERY PARTNER VIEW
                  ========================================== */}
              {role === "delivery" && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
                  {/* Left Column: Active orders waiting for home delivery */}
                  <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <HeartHandshake className="w-4 h-4 text-purple-400" />
                        <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">Active Delivery Orders</h3>
                      </div>
                      <span className="text-[10px] font-mono text-purple-400">Driver Dashboard</span>
                    </div>

                    <div className="space-y-3">
                      {state.orders.filter(o => o.type === "delivery").length === 0 ? (
                        <div className="py-12 text-center text-slate-500 font-mono text-xs">
                          No delivery orders found.
                        </div>
                      ) : (
                        state.orders.filter(o => o.type === "delivery").map(order => (
                          <div key={order.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-3 shadow-inner">
                            <div className="flex justify-between items-center flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                  {order.id}
                                </span>
                                <span className="text-slate-300 font-bold text-xs">{order.customerName}</span>
                              </div>
                              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                                order.status === "delivered" ? "bg-emerald-950/85 text-emerald-400 border border-emerald-800/40" : "bg-purple-950/85 text-purple-400 border border-purple-800/40"
                              }`}>
                                {order.status}
                              </span>
                            </div>

                            <div className="bg-slate-900/60 p-2.5 rounded border border-slate-900 space-y-2 text-xs">
                              <div className="flex items-center gap-1 text-slate-300">
                                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                                <span>GPS Target Delivery: <strong>120 Green Alley, Unit #4B</strong></span>
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono pl-5">
                                Items: {order.items.map(i => `${i.name} (x${i.quantity})`).join(", ")}
                              </div>
                            </div>

                            <div className="flex justify-between items-center flex-wrap gap-2 pt-2 border-t border-slate-900 text-xs">
                              <div className="text-[10px] text-slate-400 font-mono">
                                Bill Amount: <strong className="text-emerald-400">₹{order.totalPrice.toFixed(2)}</strong> (Includes ₹40 delivery)
                              </div>

                              {order.status !== "delivered" && (
                                <div className="flex items-center gap-1.5">
                                  {/* Delivery OTP helper input simulating user security checks */}
                                  <span className="text-[10px] font-mono bg-slate-900 px-2 py-1 border border-slate-800 text-slate-400 rounded">
                                    OTP Required: <strong>{order.deliveryOtp || "4021"}</strong>
                                  </span>
                                  <button
                                    onClick={() => handleUpdateOrderStatus(order.id, { status: "delivered" })}
                                    className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-[10px] font-bold uppercase cursor-pointer"
                                  >
                                    Verify OTP & Deliver
                                  </button>
                                </div>
                              )}

                              {order.status === "delivered" && (
                                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px]">
                                  <CheckCircle2 className="w-4 h-4" /> Delivered & VIP Loyalty points dispatched!
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Right Column: GPS Tracking & Delivery Route Optimization */}
                  <div className="xl:col-span-4 space-y-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-purple-400" />
                          <h3 className="text-xs font-extrabold uppercase tracking-tight text-white">Route Optimization Map</h3>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                          GPS active
                        </span>
                      </div>

                      <div className="bg-slate-950 h-52 rounded-lg border border-slate-850 relative overflow-hidden flex flex-col justify-between p-3">
                        {/* Mock Delivery Map SVG */}
                        <svg className="absolute inset-0 w-full h-full text-slate-800/20" xmlns="http://www.w3.org/2000/svg">
                          <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                          <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                          <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="currentColor" strokeWidth="2" strokeDasharray="4" />
                          <circle cx="30%" cy="20%" r="5" fill="#10b981" /> {/* Restaurant Location */}
                          <circle cx="70%" cy="60%" r="5" fill="#ef4444" /> {/* Customer Location */}
                          <line x1="30%" y1="20%" x2="70%" y2="20%" stroke="#6366f1" strokeWidth="3" />
                          <line x1="70%" y1="20%" x2="70%" y2="60%" stroke="#6366f1" strokeWidth="3" />
                        </svg>

                        <div className="relative z-10 bg-slate-900/90 p-2 rounded border border-slate-800 text-[10px] font-mono leading-normal max-w-xs">
                          <div>📍 <strong>SmartDine Kitchen</strong> ➔ <strong>120 Green Alley</strong></div>
                          <div className="text-indigo-400 mt-0.5">Est. Driving: <strong>8 mins (3.1 miles)</strong></div>
                          <div className="text-emerald-400 font-bold">Route optimized avoiding evening highway rush.</div>
                        </div>

                        <div className="relative z-10 self-end text-[8px] font-mono text-slate-500">
                          Telemetry: VEO_PATH_ONLINE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* Business Owner Section Removed */}

              {/* ==========================================
                  SYSTEM ADMIN VIEW
                  ========================================== */}
              {role === "admin" && (
                <div className="space-y-4">
                  {/* TAB 1: Dashboard Overview */}
                  {adminTab === "Dashboard" && (
                    <AdminDashboard
                      state={state}
                      setRole={setRole}
                      setAdminTab={setAdminTab}
                      onAskAi={askAIAssistant}
                      aiLoading={aiLoading}
                    />
                  )}

                  {/* TAB 2: Menu catalog configuration */}
                  {adminTab === "Menu" && (
                    <AdminMenu
                      state={state}
                      handleDeleteDish={handleDeleteDish}
                      handleAddDish={handleAddDish}
                      newDish={newDish}
                      setNewDish={setNewDish}
                      fetchState={fetchState}
                    />
                  )}

                  {/* TAB 3: Kitchen Inventory with recipe linkage */}
                  {adminTab === "Inventory" && (
                    <AdminInventory
                      state={state}
                      handleUpdateInventory={handleUpdateInventory}
                      handleCreateIngredient={handleCreateIngredient}
                      handleSaveRecipeLink={handleSaveRecipeLink}
                      newIngredient={newIngredient}
                      setNewIngredient={setNewIngredient}
                      recipeDishName={recipeDishName}
                      setRecipeDishName={setRecipeDishName}
                      currentLinkIng={currentLinkIng}
                      setCurrentLinkIng={setCurrentLinkIng}
                      currentLinkQty={currentLinkQty}
                      setCurrentLinkQty={setCurrentLinkQty}
                      inventoryRestockQty={inventoryRestockQty}
                      setInventoryRestockQty={setInventoryRestockQty}
                      inventoryWasteQty={inventoryWasteQty}
                      setInventoryWasteQty={setInventoryWasteQty}
                      fetchState={fetchState}
                    />
                  )}

                  {/* TAB 4: Reports & Analytics */}
                  {adminTab === "Reports" && (
                    <AdminReports
                      state={state}
                      liveRevenue={liveRevenue}
                      biReport={biReport}
                      biLoading={biLoading}
                      generateBusinessReport={generateBusinessReport}
                    />
                  )}

                  {/* TAB 5: Reservations Manager */}
                  {adminTab === "Reservations" && (
                    <AdminReservations
                      state={state}
                      fetchState={fetchState}
                    />
                  )}

                  {/* TAB 6: Staff Management */}
                  {adminTab === "Staff" && (
                    <AdminStaff
                      state={state}
                      handleLogAttendance={handleLogAttendance}
                      onStaffAdded={fetchState}
                    />
                  )}

                  {/* TAB 7: Sara AI Assistant */}
                  {adminTab === "AI_Assistant" && (
                    <AdminAI
                      aiHistory={aiHistory}
                      aiLoading={aiLoading}
                      aiMessage={aiMessage}
                      setAiMessage={setAiMessage}
                      askAIAssistant={askAIAssistant}
                    />
                  )}

                  {/* TAB 8: Settings */}
                  {adminTab === "Settings" && (
                    <AdminSettings adminTheme={adminTheme} setAdminTheme={setAdminTheme} />
                  )}

                  {/* TAB 9: System Admin Status */}
                  {adminTab === "SystemAdmin" && (
                    <AdminSettings adminTheme={adminTheme} setAdminTheme={setAdminTheme} />
                  )}
                </div>
              )}

            </div>
          )}
        </div>

        {/* Command terminal inspired monospaced status footer matching "High Density" specs */}
        <footer className="h-10 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-between text-[10px] font-mono text-slate-500 shrink-0">
          <div className="flex gap-6">
            <span>MOD: {role.toUpperCase()}_PERSPECTIVE_ACTIVE</span>
            <span>SYS: STABLE_V3</span>
            <span className="hidden sm:inline">ENV: PRODUCTION_NODE_A1</span>
          </div>
          <div className="flex gap-4">
            <span>v4.22.0-AI</span>
            <span className="text-indigo-400">LAST REFRESH: {new Date().toLocaleTimeString()}</span>
          </div>
        </footer>

        {/* Secure Admin Login Modal Overlay */}
        {showAdminLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl relative font-sans text-xs">
              <div className="flex items-center gap-3 border-b border-slate-800/60 pb-3">
                <div className="w-10 h-10 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/25">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider font-display">
                    Admin Access Gateway
                  </h4>
                  <p className="text-[10px] text-slate-400">Verify identity to unlock system terminals</p>
                </div>
              </div>

              {loginError && (
                <div className="p-3 bg-rose-950/30 border border-rose-900/20 text-rose-400 rounded-xl font-mono text-[10px] leading-relaxed flex items-start gap-1.5 animate-shake">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
                  <span>{loginError}</span>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (adminUsername === "smartdine" && adminPassword === "AI") {
                    setIsAdminAuthenticated(true);
                    setRole("admin");
                    setAdminTab("Dashboard");
                    setShowAdminLogin(false);
                    setLoginError("");
                    alert("Admin verified successfully!");
                  } else {
                    setLoginError("Access Denied: Incorrect Username or Password.");
                  }
                }}
                className="space-y-3"
              >
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Username</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter admin username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-orange-500 font-mono"
                  />
                </div>

                {/* Sandbox Credentials Hint Box */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 text-[10px] font-mono text-slate-400 space-y-1">
                  <div className="text-amber-500 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Authorized Sandbox Keys:
                  </div>
                  <div className="flex justify-between">
                    <span>Username:</span>
                    <strong className="text-white select-all">smartdine</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Password:</span>
                    <strong className="text-white select-all">AI</strong>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 text-[10px] font-bold font-mono uppercase">
                  <button
                    type="button"
                    onClick={() => setShowAdminLogin(false)}
                    className="flex-1 py-2.5 bg-slate-850 hover:bg-slate-800 text-slate-300 rounded-xl transition-all cursor-pointer border border-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl shadow-lg shadow-orange-600/10 transition-all cursor-pointer"
                  >
                    Authenticate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
