import React, { useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Calendar,
  Users,
  Sparkles,
  Bot,
  AlertCircle,
  ArrowUpRight,
  Clock,
  ArrowRight,
  CheckCircle,
  Receipt,
  UserCheck,
  Smartphone,
  ChevronRight,
  Check
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock weekly, monthly, and yearly sales data
const salesWeeklyData = [
  { name: "Mon", sales: 18000 },
  { name: "Tue", sales: 27000 },
  { name: "Wed", sales: 32000 },
  { name: "Thu", sales: 45000 },
  { name: "Fri", sales: 36000 },
  { name: "Sat", sales: 38000 },
  { name: "Sun", sales: 29000 },
];

const salesMonthlyData = [
  { name: "Week 1", sales: 110000 },
  { name: "Week 2", sales: 145000 },
  { name: "Week 3", sales: 132000 },
  { name: "Week 4", sales: 168000 },
];

const salesYearlyData = [
  { name: "Jan", sales: 480000 },
  { name: "Feb", sales: 520000 },
  { name: "Mar", sales: 610000 },
  { name: "Apr", sales: 580000 },
  { name: "May", sales: 690000 },
  { name: "Jun", sales: 720000 },
  { name: "Jul", sales: 650000 },
  { name: "Aug", sales: 710000 },
  { name: "Sep", sales: 800000 },
  { name: "Oct", sales: 850000 },
  { name: "Nov", sales: 920000 },
  { name: "Dec", sales: 1100000 },
];

const pieData = [
  { name: "Dine-In", value: 60, color: "#10b981" },
  { name: "Takeaway", value: 25, color: "#3b82f6" },
  { name: "Delivery", value: 15, color: "#f59e0b" },
];

interface AdminDashboardProps {
  state: any;
  setRole: (role: string) => void;
  setAdminTab: (tab: string) => void;
  onAskAi: (msg: string) => void;
  aiLoading: boolean;
}

export default function AdminDashboard({
  state,
  setRole,
  setAdminTab,
  onAskAi,
  aiLoading
}: AdminDashboardProps) {
  const [promptInput, setPromptInput] = useState("");
  const [timeframe, setTimeframe] = useState<"week" | "month" | "year">("week");

  const currentChartData = timeframe === "week"
    ? salesWeeklyData
    : timeframe === "month"
    ? salesMonthlyData
    : salesYearlyData;

  const handleAskSara = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    onAskAi(promptInput);
    setAdminTab("AI_Assistant");
    setPromptInput("");
  };

  // Safe metrics aggregates
  const rawRevenue = state?.orders?.reduce((sum: number, o: any) => sum + o.totalPrice, 0) || 0;
  const displayRevenue = rawRevenue > 0 ? rawRevenue + 54320 : 54320;
  const displayOrdersCount = (state?.orders?.length || 0) + 236;
  const displayReservationsCount = (state?.reservations?.length || 0) + 48;

  // Recent 4 orders
  const recentOrders = state?.orders?.slice(0, 4) || [];

  return (
    <div id="admin-dashboard-container" className="space-y-6 font-sans">
      
      {/* Welcome & Banner Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Welcome Block & Sara AI companion */}
        <div className="lg:col-span-8 bg-gradient-to-r from-slate-900 via-[#0d1527] to-[#141029] border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-indigo-950/20">
          <div className="space-y-4 max-w-md z-10">
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2 font-display">
                Welcome back, Admin! 👋
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-sans">
                Here's what's happening in your restaurant today.
              </p>
            </div>

            {/* Quick Stats Grid inside greeting */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[9px] text-slate-400 font-mono block">Total Sales</span>
                <span className="text-xs font-extrabold text-white font-mono mt-0.5 block">₹{displayRevenue.toLocaleString()}</span>
                <span className="text-[8px] text-emerald-400 font-mono font-bold">▲ 18.6%</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[9px] text-slate-400 font-mono block">Total Orders</span>
                <span className="text-xs font-extrabold text-white font-mono mt-0.5 block">{displayOrdersCount}</span>
                <span className="text-[8px] text-emerald-400 font-mono font-bold">▲ 12.4%</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[9px] text-slate-400 font-mono block">Reservations</span>
                <span className="text-xs font-extrabold text-white font-mono mt-0.5 block">{displayReservationsCount}</span>
                <span className="text-[8px] text-emerald-400 font-mono font-bold">▲ 8.7%</span>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl text-center">
                <span className="text-[9px] text-slate-400 font-mono block">New Guests</span>
                <span className="text-xs font-extrabold text-white font-mono mt-0.5 block">32</span>
                <span className="text-[8px] text-emerald-400 font-mono font-bold">▲ 15.3%</span>
              </div>
            </div>
          </div>

          {/* Sara AI Companion Chatbox card */}
          <div className="bg-[#0e1425] border border-indigo-900/40 rounded-2xl p-4 w-full md:w-80 shadow-md relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center gap-2.5 border-b border-indigo-950 pb-2.5">
              <div className="w-10 h-10 bg-indigo-600/10 border border-indigo-500/20 rounded-full flex items-center justify-center relative shrink-0">
                <span className="text-2xl animate-pulse">🤖</span>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0e1425] rounded-full"></span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-white font-display">Sara AI Assistant</h3>
                <p className="text-[9px] text-slate-400 mt-0.5">Your smart dining companion</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-300 italic my-3 bg-slate-900/50 p-2 rounded-lg border border-slate-850/30">
              "Hi Admin! How can I help you today?"
            </p>

            <form onSubmit={handleAskSara} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask Sara anything..."
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-[10px] text-white px-2 py-1.5 rounded-lg flex-1 focus:outline-none focus:border-indigo-500 placeholder-slate-500"
              />
              <button
                type="submit"
                disabled={aiLoading}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[9px] font-bold uppercase rounded-lg flex items-center justify-center cursor-pointer whitespace-nowrap"
              >
                {aiLoading ? "Thinking..." : "Chat"}
              </button>
            </form>
          </div>

          {/* Abstract glowing background effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none z-0"></div>
        </div>

        {/* Live Status right block */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white font-display">Live Status</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-400">Everything is running smoothly</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950 border border-slate-850/60 p-3 rounded-xl flex items-center justify-between hover:border-emerald-500/20 transition-all cursor-pointer" onClick={() => { setRole("kitchen"); setAdminTab("Chef"); }}>
              <div>
                <span className="text-[9px] text-slate-500 font-mono font-bold block uppercase">New Orders</span>
                <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">12</span>
              </div>
              <span className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs">🆕</span>
            </div>

            <div className="bg-slate-950 border border-slate-850/60 p-3 rounded-xl flex items-center justify-between hover:border-orange-500/20 transition-all cursor-pointer" onClick={() => { setRole("kitchen"); setAdminTab("Chef"); }}>
              <div>
                <span className="text-[9px] text-slate-500 font-mono font-bold block uppercase">Preparing</span>
                <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">7</span>
              </div>
              <span className="p-1.5 bg-orange-500/10 text-orange-400 rounded-lg text-xs">🔥</span>
            </div>

            <div className="bg-slate-950 border border-slate-850/60 p-3 rounded-xl flex items-center justify-between hover:border-blue-500/20 transition-all cursor-pointer" onClick={() => { setRole("waiter"); setAdminTab("Waiter"); }}>
              <div>
                <span className="text-[9px] text-slate-500 font-mono font-bold block uppercase">Ready</span>
                <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">4</span>
              </div>
              <span className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-xs">🛎️</span>
            </div>

            <div className="bg-slate-950 border border-slate-850/60 p-3 rounded-xl flex items-center justify-between hover:border-purple-500/20 transition-all cursor-pointer" onClick={() => { setRole("delivery"); setAdminTab("Delivery"); }}>
              <div>
                <span className="text-[9px] text-slate-500 font-mono font-bold block uppercase">In Delivery</span>
                <span className="text-xl font-extrabold text-white font-mono mt-0.5 block">5</span>
              </div>
              <span className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg text-xs">🛵</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Charts & Insights Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
        
        {/* Sales Overview chart */}
        <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-xs font-extrabold uppercase text-white tracking-wider font-display flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span>Sales Overview</span>
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {/* Clickable pill tabs */}
              <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 gap-1">
                <button
                  onClick={() => setTimeframe("week")}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded transition-all cursor-pointer ${
                    timeframe === "week"
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeframe("month")}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded transition-all cursor-pointer ${
                    timeframe === "month"
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimeframe("year")}
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded transition-all cursor-pointer ${
                    timeframe === "year"
                      ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} fontStyle="italic" />
                <YAxis stroke="#64748b" fontSize={10} fontStyle="italic" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }}
                  labelStyle={{ color: "#fff", fontFamily: "monospace" }}
                  itemStyle={{ color: "#f97316" }}
                />
                <Area type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Financial Pie & Upcoming Reservations column */}
        <div className="xl:col-span-4 grid grid-cols-1 gap-5">
          
          {/* Financial Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-extrabold uppercase text-white tracking-wider font-display">Financial Summary</h3>
              <span className="text-[9px] font-mono text-slate-400">This Month</span>
            </div>

            <div className="flex items-center justify-around h-36">
              <div className="relative w-28 h-28">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={30}
                      outerRadius={45}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[8px] text-slate-400 font-mono">Revenue</span>
                  <span className="text-[11px] font-extrabold text-white font-mono">₹54,320</span>
                </div>
              </div>

              {/* Legends */}
              <div className="space-y-1 text-[10px] font-mono">
                {pieData.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-300">{item.name}</span>
                    <strong className="text-white ml-auto font-bold">{item.value}%</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Low bento row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Top Selling Items */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow shadow-slate-950/40">
          <div className="flex items-center justify-between border-b border-slate-850 pb-2">
            <h3 className="text-xs font-extrabold uppercase text-white tracking-wider font-display">Top Selling Items</h3>
            <span className="text-[8px] text-indigo-400 font-mono cursor-pointer hover:underline" onClick={() => setAdminTab("Menu")}>View All</span>
          </div>
          <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
            <div className="flex items-center justify-between text-xs font-mono bg-slate-950/40 p-1.5 rounded-lg border border-slate-850/50">
              <span className="text-slate-300">🍛 Butter Chicken</span>
              <span className="text-emerald-400 font-bold">125 Orders</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono bg-slate-950/40 p-1.5 rounded-lg border border-slate-850/50">
              <span className="text-slate-300">🍕 Paneer Tikka</span>
              <span className="text-emerald-400 font-bold font-semibold">98 Orders</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono bg-slate-950/40 p-1.5 rounded-lg border border-slate-850/50">
              <span className="text-slate-300">🍚 Veg Biryani</span>
              <span className="text-emerald-400 font-bold font-semibold">87 Orders</span>
            </div>
            <div className="flex items-center justify-between text-xs font-mono bg-slate-950/40 p-1.5 rounded-lg border border-slate-850/50">
              <span className="text-slate-300">🥤 Mango Lassi</span>
              <span className="text-emerald-400 font-bold font-semibold">65 Orders</span>
            </div>
          </div>
        </div>

        {/* AI Insights box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow shadow-slate-950/40">
          <div className="flex items-center justify-between border-b border-slate-850 pb-2">
            <h3 className="text-xs font-extrabold uppercase text-white tracking-wider font-display flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Insights</span>
            </h3>
            <span className="px-1.5 py-0.5 bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 rounded text-[8px] font-mono">Live</span>
          </div>
          <div className="space-y-2 max-h-52 overflow-y-auto">
            <div className="p-2 bg-indigo-950/10 border border-indigo-900/10 rounded-lg flex items-start gap-2">
              <span className="text-xs">📈</span>
              <p className="text-[10px] text-slate-300 leading-snug">
                Butter Chicken is your top selling item this week. Recommend highlighting on menu.
              </p>
            </div>
            <div className="p-2 bg-indigo-950/10 border border-indigo-900/10 rounded-lg flex items-start gap-2">
              <span className="text-xs">🗓️</span>
              <p className="text-[10px] text-slate-300 leading-snug">
                Friday & Saturday are your peak hours. Schedule extra wait staff for dinner.
              </p>
            </div>
          </div>
        </div>

        {/* Unpaid Receivables */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow shadow-slate-950/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <h3 className="text-xs font-extrabold uppercase text-white tracking-wider font-display flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-amber-500" />
                <span>Unpaid Receivables</span>
              </h3>
            </div>
            <div className="py-4 text-center">
              <div className="text-2xl font-extrabold font-mono text-amber-400">₹18,760</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">8 Active Table Bills Pending Settle</div>
            </div>
          </div>
          <button
            onClick={() => { setRole("billing"); setAdminTab("Billing"); }}
            className="w-full py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-800/30 text-indigo-400 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <span>View All Bills</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Delivery Partners status */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3 shadow shadow-slate-950/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-850 pb-2">
              <h3 className="text-xs font-extrabold uppercase text-white tracking-wider font-display flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Delivery Partners</span>
              </h3>
            </div>
            <div className="py-4 text-center">
              <div className="text-2xl font-extrabold font-mono text-purple-400">5</div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">Active Drivers • 12 Deliveries Today</div>
            </div>
          </div>
          <button
            onClick={() => { setRole("delivery"); setAdminTab("Delivery"); }}
            className="w-full py-1.5 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-800/30 text-purple-400 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
          >
            <span>View Deliveries</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

    </div>
  );
}
