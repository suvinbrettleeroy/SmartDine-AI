import React, { useMemo } from "react";
import {
  Search,
  MapPin,
  Bell,
  ShoppingBag,
  Heart,
  ChevronRight,
  Sparkles,
  Percent,
  Compass,
  UtensilsCrossed,
  Clock,
  ArrowRight,
  Flame,
  Minus,
  Plus
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isVeg: boolean;
  isBestSeller: boolean;
  nutrition: string;
  allergens: string;
  description: string;
  image: string;
}

interface CustomerHomeProps {
  state: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: { item: MenuItem; quantity: number }[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  customerSearch: string;
  setCustomerSearch: (s: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  tableSelection: number;
  setTableSelection: (t: number) => void;
  orderType: string;
  setOrderType: (t: "dine-in" | "delivery" | "pickup") => void;
  onCheckout: () => void;
}

// Emojis for categories to make them look like beautiful bubble badges in Image 1
const categories = [
  { name: "All", emoji: "🎛️" },
  { name: "Breakfast", emoji: "🥞" },
  { name: "Lunch", emoji: "🍛" },
  { name: "Snacks", emoji: "🍔" },
  { name: "Dinner", emoji: "🍗" },
  { name: "Desserts", emoji: "🍰" },
  { name: "Beverages", emoji: "🥤" },
];

export default function CustomerHome({
  state,
  activeTab,
  setActiveTab,
  cart,
  onAddToCart,
  onRemoveFromCart,
  customerSearch,
  setCustomerSearch,
  selectedCategory,
  setSelectedCategory,
  tableSelection,
  setTableSelection,
  orderType,
  setOrderType,
  onCheckout
}: CustomerHomeProps) {
  
  // Filtered menu logic
  const filteredMenu = useMemo(() => {
    if (!state) return [];
    return state.menu.filter((item: MenuItem) => {
      const matchSearch =
        item.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(customerSearch.toLowerCase());
      const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [state, customerSearch, selectedCategory]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div id="customer-home-layout" className="grid grid-cols-1 xl:grid-cols-12 gap-5 font-sans pb-16">
      
      {/* Left 8 Columns: Dynamic Customer Content */}
      <div className="xl:col-span-8 space-y-6">
        
        {/* Immersive Good Food Hero Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0a1222] to-[#120f26] border border-slate-800 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl shadow-indigo-950/20">
          <div className="md:max-w-md space-y-4 z-10 relative">
            <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
              🍕 Delicious food, delivered fast
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
              Good Food,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">Great Experience!</span>
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Order from your favorite restaurants or book a table in advance. Satisfy your cravings in minutes.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("customer-menu-anchor");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-600/15 flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>Order Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab("Reservations")}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer transition-all"
              >
                Reserve a Table
              </button>
            </div>
          </div>

          {/* Banner Biryani Image mimicking the screenshot */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 md:w-1/2 hidden md:block opacity-85 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-[#0a1222]/80 to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80"
              alt="Delicious biryani banner"
              className="w-full h-full object-cover rounded-r-3xl"
              referrerPolicy="no-referrer"
            />
          </div>
          
          {/* Slider pagination indicators at the bottom */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            <span className="w-4 h-1 rounded-full bg-orange-500"></span>
            <span className="w-1.5 h-1 bg-slate-700 rounded-full"></span>
            <span className="w-1.5 h-1 bg-slate-700 rounded-full"></span>
            <span className="w-1.5 h-1 bg-slate-700 rounded-full"></span>
          </div>
        </div>

        {/* Categories horizontal list */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-display">Food Categories</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold font-sans tracking-wide shrink-0 transition-all cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white border-orange-500 shadow-md shadow-orange-600/10"
                      : "bg-slate-900 text-slate-400 border-slate-800/60 hover:text-white hover:bg-slate-850"
                  }`}
                >
                  <span className="text-base">{cat.emoji}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recommended for You list anchor */}
        <div id="customer-menu-anchor" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 font-display">Recommended for You</h3>
            <span className="text-[10px] text-orange-500 font-mono font-bold hover:underline cursor-pointer">View All</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMenu.map((item) => {
              const inCart = cart.find((i) => i.item.id === item.id);
              return (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md hover:border-slate-700 transition-all relative flex flex-col justify-between">
                  <div>
                    {/* veg indicator */}
                    <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                      <span className={`w-3.5 h-3.5 border-2 rounded flex items-center justify-center ${item.isVeg ? "border-emerald-600 bg-emerald-950/40" : "border-rose-600 bg-rose-950/40"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                      </span>
                      {item.isBestSeller && (
                        <span className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[8px] font-bold uppercase rounded-md tracking-wider">
                          Best Seller
                        </span>
                      )}
                    </div>

                    <div className="h-32 w-full relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    </div>

                    <div className="p-3.5 space-y-1">
                      <h4 className="text-xs font-bold text-white tracking-tight font-display">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2 h-7">{item.description}</p>
                      
                      <div className="text-[9px] text-slate-500 font-mono mt-1">
                        🌾 {item.nutrition}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 pt-0 border-t border-slate-850/60 flex items-center justify-between mt-1">
                    <span className="text-xs font-extrabold text-orange-500 font-mono">₹{item.price}</span>
                    
                    {inCart ? (
                      <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg overflow-hidden shrink-0">
                        <button
                          onClick={() => onRemoveFromCart(item)}
                          className="p-1 px-2 hover:bg-slate-900 text-rose-400 text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2.5 text-[10px] font-extrabold text-white font-mono">{inCart.quantity}</span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="p-1 px-2 hover:bg-slate-900 text-emerald-400 text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-3 py-1 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-extrabold uppercase rounded shadow cursor-pointer transition-all flex items-center gap-1"
                      >
                        <Plus className="w-2.5 h-2.5" />
                        <span>Add</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right 4 Columns: Dynamic Sticky Checkout / Orders Status Pane */}
      <div className="xl:col-span-4 space-y-5">
        
        {/* Order Again Component */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow-md">
          <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white font-display">Order Again</h3>
            <span className="text-[10px] text-slate-500 font-mono cursor-pointer hover:underline">View All</span>
          </div>

          <div className="space-y-3">
            {[
              { name: "Butter Chicken Combo", desc: "Paradise Biryani", price: 349, img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&auto=format&fit=crop&q=80" },
              { name: "Paneer Tikka Pizza", desc: "Pizza Hut", price: 299, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80" },
              { name: "Veg Biryani", desc: "Hotel Saravana Bhavan", price: 195, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&auto=format&fit=crop&q=80" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-slate-950/60 p-2 border border-slate-850/50 rounded-xl hover:border-slate-800 transition-all">
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-[11px] font-bold text-white truncate font-display">{item.name}</h4>
                  <p className="text-[9px] text-slate-500 truncate">{item.desc}</p>
                  <span className="text-[10px] font-bold font-mono text-orange-500 block mt-0.5">₹{item.price}</span>
                </div>
                <button
                  onClick={() => {
                    const found = state?.menu?.find((m: any) => m.name.toLowerCase().includes(item.name.split(" ")[0].toLowerCase()));
                    if (found) onAddToCart(found);
                  }}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-[9px] font-bold text-orange-500 rounded-lg cursor-pointer shrink-0 transition-all"
                >
                  Order
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* My Order Status Box with bike rider illustration */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3.5 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-center border-b border-slate-850 pb-2.5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-white font-display">My Order Status</h3>
            <span className="px-1.5 py-0.5 bg-orange-950/60 border border-orange-800/40 text-orange-500 rounded text-[8px] font-mono font-bold animate-pulse">Preparing</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-mono block">Order #SD12034</span>
              <h4 className="text-xs font-extrabold text-white font-display">Copper Kitchen</h4>
              <p className="text-[10px] text-slate-400">2 x Butter Chicken, 1 x Naan</p>
              <div className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1">
                <span>⏱️ Expected:</span>
                <strong className="text-white">35 mins</strong>
              </div>
            </div>
            
            {/* Scooty Rider animation */}
            <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-3xl shrink-0 relative">
              🛵
              <span className="absolute bottom-1 right-1 text-xs">💨</span>
            </div>
          </div>
        </div>

        {/* Active Cart Checkout Drawer widget */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-850 pb-2.5">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-orange-500" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white font-display">My Cart</h3>
            </div>
            <span className="px-2 py-0.5 bg-orange-950/80 text-orange-400 border border-orange-800/40 rounded text-[9px] font-mono font-bold">
              {totalCartCount} ITEMS
            </span>
          </div>

          {cart.length === 0 ? (
            <div className="py-8 text-center text-slate-500 font-mono text-xs">
              Your cart is empty. Add delicious items to get started!
            </div>
          ) : (
            <div className="space-y-3">
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {cart.map((cartItem) => (
                  <div key={cartItem.item.id} className="flex justify-between items-center text-xs font-mono bg-slate-950/40 p-2 rounded-lg border border-slate-850/50">
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="text-white font-semibold block truncate">{cartItem.item.name}</span>
                      <span className="text-[9px] text-slate-500">₹{cartItem.item.price} each</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">x{cartItem.quantity}</span>
                      <strong className="text-orange-500">₹{cartItem.item.price * cartItem.quantity}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Options */}
              <div className="space-y-2 pt-2 border-t border-slate-850">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>GST (5%)</span>
                  <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between text-xs font-mono text-slate-400">
                    <span>Delivery Fee</span>
                    <span>₹40.00</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-white font-mono border-t border-slate-850/60 pt-2">
                  <span>Grand Total</span>
                  <span className="text-orange-500">₹{(cartTotal * 1.05 + (orderType === "delivery" ? 40 : 0)).toFixed(2)}</span>
                </div>
              </div>

              {/* Type Switcher */}
              <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-950 rounded-xl border border-slate-850">
                {(["dine-in", "delivery", "pickup"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`py-1 text-[9px] font-extrabold uppercase rounded-lg transition-all cursor-pointer ${
                      orderType === type
                        ? "bg-orange-600 text-white font-bold"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Table selector for dine-in */}
              {orderType === "dine-in" && (
                <div className="flex items-center justify-between text-xs font-mono bg-slate-950/60 p-2 rounded-xl border border-slate-850/50">
                  <span className="text-slate-400">Select Table</span>
                  <select
                    value={tableSelection}
                    onChange={(e) => setTableSelection(parseInt(e.target.value))}
                    className="bg-slate-900 border border-slate-800 rounded p-1 text-[11px] text-white focus:outline-none focus:border-orange-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        Table #{num}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={onCheckout}
                className="w-full py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-mono text-[10px] font-extrabold uppercase rounded-xl shadow-lg shadow-orange-600/10 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Settle & Order Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Promo Exclusive Offers card */}
        <div className="bg-gradient-to-br from-indigo-950/80 to-purple-950/80 border border-indigo-800/20 rounded-2xl p-4 shadow text-center relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <div className="flex justify-center">
              <Sparkles className="w-6 h-6 text-indigo-400 fill-indigo-400/20" />
            </div>
            <h4 className="text-xs font-extrabold text-white font-display">Unlock Exclusive Offers! 🌟</h4>
            <p className="text-[10px] text-slate-300 leading-relaxed">
              Get access to exclusive daily deals, free food vouchers, & early table access.
            </p>
            <button className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-[9px] font-extrabold uppercase rounded-xl shadow-md tracking-wider cursor-pointer">
              Explore Offers
            </button>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

      </div>

    </div>
  );
}
