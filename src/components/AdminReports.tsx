import React from "react";
import { TrendingUp, Utensils, CreditCard, AlertTriangle, FileText, Sparkles, Download, Calendar } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { MenuItem, Order, InventoryItem } from "../types";

interface AdminReportsProps {
  state: {
    menu: MenuItem[];
    orders: Order[];
    inventory: InventoryItem[];
    bills: { id: string; orderId: string; tableNumber: number | null; customerName?: string; subtotal: number; gst: number; amount: number; status: string; paymentMethod?: string; timestamp?: string; date?: string; time?: string }[];
    staff: any[];
    archivedDays?: any[];
  };
  liveRevenue: number;
  biReport: string | null;
  biLoading: boolean;
  generateBusinessReport: () => Promise<void>;
}

export default function AdminReports({
  state,
  liveRevenue,
  biReport,
  biLoading,
  generateBusinessReport
}: AdminReportsProps) {

  // Universal CSV generator & download handler (opens natively in Excel)
  const downloadCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvString = [
      headers.join(","),
      ...rows.map(row => 
        row.map(val => {
          const str = String(val === null || val === undefined ? "" : val);
          // Escape quotes inside fields and wrap in quotes to ensure CSV compliance
          return `"${str.replace(/"/g, '""')}"`;
        }).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    const dateStamp = new Date().toISOString().split('T')[0];
    link.setAttribute("download", `SmartDine_${filename}_${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 1. Sales Report download (Active + Archived)
  const handleExportSales = () => {
    const headers = ["Order ID", "Customer Name", "Table Number", "Type", "Order Status", "Cooking Status", "Payment Method", "Grand Total (₹)", "GST (₹)", "Date & Time", "Items Summary"];
    const rows: any[] = [];

    // Append active orders
    state.orders.forEach(o => {
      const itemsStr = o.items.map((i: any) => `${i.name} (x${i.quantity})`).join(" | ");
      rows.push([
        o.id,
        o.customerName,
        o.tableNumber || "N/A",
        o.type,
        o.status,
        o.cookingStatus,
        o.paymentMethod || "UPI",
        o.totalPrice,
        o.gst,
        o.timestamp ? new Date(o.timestamp).toLocaleString() : "N/A",
        itemsStr
      ]);
    });

    // Append archived historical orders
    if (state.archivedDays) {
      state.archivedDays.forEach((day: any) => {
        if (day.ordersSnapshot) {
          day.ordersSnapshot.forEach((o: any) => {
            const itemsStr = o.items.map((i: any) => `${i.name} (x${i.quantity})`).join(" | ");
            rows.push([
              o.id,
              o.customerName,
              o.tableNumber || "N/A",
              o.type,
              o.status,
              o.cookingStatus,
              o.paymentMethod || "UPI",
              o.totalPrice,
              o.gst,
              o.timestamp ? new Date(o.timestamp).toLocaleString() : `Archived Day ${day.date}`,
              itemsStr
            ]);
          });
        }
      });
    }

    downloadCSV("Sales_Report", headers, rows);
  };

  // 2. Inventory & Stock levels download
  const handleExportInventory = () => {
    const headers = ["Inventory ID", "Material Name", "Current Stock Level", "Measurement Unit", "Low Stock Alert limit", "Cost Per Unit (₹)", "Spillage / Waste (kg)", "Total Asset Value (₹)"];
    
    const rows = state.inventory.map(i => [
      i.id,
      i.name,
      i.stock,
      i.unit,
      i.lowStockAlertLimit,
      i.costPerUnit || 0,
      i.waste || 0,
      (i.stock * (i.costPerUnit || 0))
    ]);

    downloadCSV("Inventory_Stock_Report", headers, rows);
  };

  // 3. Bills & Payments download
  const handleExportBills = () => {
    const headers = ["Bill ID", "Order Reference ID", "Table Number", "Customer Name", "Subtotal (₹)", "GST (₹)", "Grand Total (₹)", "Payment Method", "Settle Status", "Settle Date & Time"];
    const rows: any[] = [];

    // Active bills
    state.bills.forEach(b => {
      rows.push([
        b.id,
        b.orderId,
        b.tableNumber || "Takeaway/Delivery",
        b.customerName || "Customer",
        b.subtotal || (b.amount - b.gst),
        b.gst,
        b.amount,
        b.paymentMethod || "UPI",
        b.status,
        b.timestamp ? new Date(b.timestamp).toLocaleString() : `${b.date || ""} ${b.time || ""}`
      ]);
    });

    // Historical bills
    if (state.archivedDays) {
      state.archivedDays.forEach((day: any) => {
        if (day.billsSnapshot) {
          day.billsSnapshot.forEach((b: any) => {
            rows.push([
              b.id,
              b.orderId,
              b.tableNumber || "Takeaway/Delivery",
              b.customerName || "Customer",
              b.subtotal || (b.amount - b.gst),
              b.gst,
              b.amount,
              b.paymentMethod || "UPI",
              b.status,
              b.timestamp ? new Date(b.timestamp).toLocaleString() : `Archived Day ${day.date} ${day.time}`
            ]);
          });
        }
      });
    }

    downloadCSV("Bills_and_Payments_Report", headers, rows);
  };

  // 4. Staff Attendance & Salary Payroll download
  const handleExportStaff = () => {
    const headers = ["Employee ID", "Employee Name", "Job Role / Job Type", "Assigned Shift", "Monthly Base Salary (₹)", "Today's Attendance Status", "Performance Score Rating"];
    
    const rows = state.staff.map(s => [
      s.id,
      s.name || s.nameWaiter || "Staff Worker",
      s.role,
      s.shift,
      s.salary,
      s.attendance,
      `${s.performanceRating || "5.0"} ★`
    ]);

    downloadCSV("Staff_Attendance_and_Payroll", headers, rows);
  };

  // 5. Itemized Dishes Sales Chronological Log (Dishes sales name with date & time!)
  const handleExportDishesSales = () => {
    const headers = ["Dish Name", "Price (₹)", "Quantity Sold", "Total Item Revenue (₹)", "Customer Name", "Order ID", "Ordered Date & Time"];
    const rows: any[] = [];

    // Extract from active orders
    state.orders.forEach(o => {
      o.items.forEach((item: any) => {
        rows.push([
          item.name,
          item.price,
          item.quantity,
          (item.price * item.quantity),
          o.customerName,
          o.id,
          o.timestamp ? new Date(o.timestamp).toLocaleString() : "N/A"
        ]);
      });
    });

    // Extract from archived snapshots
    if (state.archivedDays) {
      state.archivedDays.forEach((day: any) => {
        if (day.ordersSnapshot) {
          day.ordersSnapshot.forEach((o: any) => {
            o.items.forEach((item: any) => {
              rows.push([
                item.name,
                item.price,
                item.quantity,
                (item.price * item.quantity),
                o.customerName,
                o.id,
                o.timestamp ? new Date(o.timestamp).toLocaleString() : `Archived Day ${day.date}`
              ]);
            });
          });
        }
      });
    }

    downloadCSV("Dishes_Sales_Detailed_Log", headers, rows);
  };

  return (
    <div id="admin-reports-analytics-section" className="space-y-4">
      {/* Financial KPI stats overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">Gross Revenue (Live)</span>
          <span className="text-xl font-mono font-extrabold text-emerald-400 mt-1 block">₹{liveRevenue.toLocaleString()}</span>
          <span className="text-[9px] text-slate-500 block mt-0.5">Based on {state.orders.length} operational orders</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">Est. Food raw costs</span>
          <span className="text-xl font-mono font-extrabold text-indigo-400 mt-1 block">₹{(liveRevenue * 0.28).toLocaleString()}</span>
          <span className="text-[9px] text-slate-500 block mt-0.5">Industry standard 28% model</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">Estimated Net Profit</span>
          <span className="text-xl font-mono font-extrabold text-orange-400 mt-1 block">₹{(liveRevenue * 0.72 - 12000).toLocaleString()}</span>
          <span className="text-[9px] text-slate-500 block mt-0.5">Overheads & Salaries subtracted</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow text-center">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold block">Active Bills Settled</span>
          <span className="text-xl font-mono font-extrabold text-purple-400 mt-1 block">
            {state.bills.filter(b => b.status === "paid").length} / {state.bills.length} Bills
          </span>
          <span className="text-[9px] text-slate-500 block mt-0.5 font-mono">₹{state.bills.filter(b => b.status === "paid").reduce((sum, b) => sum + (b.amount || 0), 0)} collected</span>
        </div>
      </div>

      {/* NEW EXPORT COMPONENT: EXECUTIVE CSV/EXCEL DOWNLOAD PLATFORM */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3.5 shadow-md">
        <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white font-sans">
              Operational Reports Export Station (Excel / CSV)
            </h3>
          </div>
          <span className="text-[9px] bg-indigo-950/60 border border-indigo-800/30 text-indigo-400 px-2 py-0.5 rounded font-mono">
            Fully compatible with Excel, Sheets & Numbers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <button
            onClick={handleExportSales}
            className="flex flex-col items-center justify-center p-3 bg-slate-950 hover:bg-indigo-950/30 border border-slate-850 hover:border-indigo-800/40 rounded-xl text-center transition-all cursor-pointer group space-y-1"
          >
            <TrendingUp className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-white font-sans">Sales Report</span>
            <span className="text-[8px] text-slate-500 font-mono">Orders & Revenue</span>
          </button>

          <button
            onClick={handleExportInventory}
            className="flex flex-col items-center justify-center p-3 bg-slate-950 hover:bg-indigo-950/30 border border-slate-850 hover:border-indigo-800/40 rounded-xl text-center transition-all cursor-pointer group space-y-1"
          >
            <AlertTriangle className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-white font-sans">Stocks & Inventory</span>
            <span className="text-[8px] text-slate-500 font-mono">Raw stock & Waste</span>
          </button>

          <button
            onClick={handleExportBills}
            className="flex flex-col items-center justify-center p-3 bg-slate-950 hover:bg-indigo-950/30 border border-slate-850 hover:border-indigo-800/40 rounded-xl text-center transition-all cursor-pointer group space-y-1"
          >
            <CreditCard className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-white font-sans">Bills & Payments</span>
            <span className="text-[8px] text-slate-500 font-mono">GST & Payment Modes</span>
          </button>

          <button
            onClick={handleExportStaff}
            className="flex flex-col items-center justify-center p-3 bg-slate-950 hover:bg-indigo-950/30 border border-slate-850 hover:border-indigo-800/40 rounded-xl text-center transition-all cursor-pointer group space-y-1"
          >
            <FileText className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-white font-sans">Staff & Salaries</span>
            <span className="text-[8px] text-slate-500 font-mono">Attendance & Payroll</span>
          </button>

          <button
            onClick={handleExportDishesSales}
            className="flex flex-col items-center justify-center p-3 bg-slate-950 hover:bg-indigo-950/30 border border-slate-850 hover:border-indigo-800/40 rounded-xl text-center transition-all cursor-pointer group space-y-1"
          >
            <Utensils className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-white font-sans">Dishes Sales Log</span>
            <span className="text-[8px] text-slate-500 font-mono">Itemized date & time</span>
          </button>
        </div>
      </div>

      {/* Interactive visual analytical charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* CHART A: Sales Trend */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wide text-white font-mono flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Live Hourly/Daily Sales Revenue Trend (₹)
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={state.orders.map((o, idx) => ({
                  time: `Order #${idx + 1}`,
                  revenue: o.totalPrice,
                  vat: o.gst
                }))}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" style={{ fontSize: '9px', fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '9px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', fontFamily: 'monospace', fontSize: '10px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART B: Top Dishes sold */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wide text-white font-mono flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-indigo-400" />
            Dish Sales Popularity & Quantity Sold
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={(() => {
                  const dishCount: Record<string, number> = {};
                  state.orders.forEach(o => {
                    o.items.forEach(item => {
                      dishCount[item.name] = (dishCount[item.name] || 0) + item.quantity;
                    });
                  });
                  return Object.entries(dishCount).map(([name, count]) => ({
                    name: name.substring(0, 15),
                    count
                  })).slice(0, 7);
                })()}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '8px', fontFamily: 'sans-serif' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '9px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', fontFamily: 'monospace', fontSize: '10px' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART C: Payment modes distribution */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wide text-white font-mono flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-purple-400" />
            Settle Billing Payment Modes Proportion (%)
          </h4>
          <div className="h-64 flex items-center justify-between">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={(() => {
                      const payModes: Record<string, number> = {};
                      state.orders.forEach(o => {
                        payModes[o.paymentMethod] = (payModes[o.paymentMethod] || 0) + o.totalPrice;
                      });
                      return Object.entries(payModes).map(([name, value]) => ({ name, value }));
                    })()}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {["#10b981", "#6366f1", "#f59e0b", "#3b82f6"].map((color, i) => (
                      <Cell key={`cell-${i}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-2 text-[10px] font-mono">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-emerald-500 rounded"></span> UPI / Instant GPay</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-indigo-500 rounded"></span> Credit Card / POS</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-orange-500 rounded"></span> Cash on Desk</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-blue-500 rounded"></span> Gift Card coupon</div>
            </div>
          </div>
        </div>

        {/* CHART D: Spoilage & waste analysis */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
          <h4 className="text-xs font-extrabold uppercase tracking-wide text-white font-mono flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            Kitchen Raw Ingredient Spoilage impact (kg)
          </h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={state.inventory.map(i => ({
                  name: i.name.substring(0, 10),
                  waste: i.waste || 0
                }))}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" style={{ fontSize: '8px', fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" style={{ fontSize: '9px', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc', fontFamily: 'monospace', fontSize: '10px' }} />
                <Bar dataKey="waste" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* EXECUTIVE AI BI PREDICTIVE BUSINESS REPORT ENGINE */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-xs font-extrabold uppercase tracking-tight text-white flex items-center gap-1.5 font-sans">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            Sara AI BI Predictive Business Report
          </h3>
          <button
            onClick={generateBusinessReport}
            disabled={biLoading}
            className="text-[9px] bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold uppercase tracking-wider px-3 py-1.5 rounded cursor-pointer transition-all font-mono"
          >
            {biLoading ? "Generating..." : "▶ RUN BI REPORT ENGINE"}
          </button>
        </div>

        {biReport ? (
          <div className="bg-slate-950 border border-slate-850 p-4 rounded-xl max-h-96 overflow-y-auto whitespace-pre-line text-[11px] font-mono leading-relaxed text-slate-300">
            {biReport}
          </div>
        ) : (
          <div className="p-10 text-center text-slate-500 text-xs italic font-sans">
            No report compiled. Click "RUN BI REPORT ENGINE" to trigger predictive AI intelligence.
          </div>
        )}
      </div>

      {/* Detailed overall sales and billing log list */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-indigo-400" />
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white font-sans">
              Unified Billings Log (Active)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {state.bills.length} bills generated today
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-1">Bill ID</th>
                <th className="py-2 px-1">Order Ref</th>
                <th className="py-2 px-1">Table</th>
                <th className="py-2 px-1">Subtotal</th>
                <th className="py-2 px-1">GST (5%)</th>
                <th className="py-2 px-1">Gross Total</th>
                <th className="py-2 px-1">Status</th>
              </tr>
            </thead>
            <tbody>
              {state.bills.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 italic">No active bills in ledger. Press daily reset to start fresh or process orders.</td>
                </tr>
              ) : (
                state.bills.map((b) => (
                  <tr key={b.id} className="border-b border-slate-850 hover:bg-slate-950/40 text-slate-300">
                    <td className="py-2.5 px-1 text-slate-500 text-[10px]">{b.id}</td>
                    <td className="py-2.5 px-1 font-bold">{b.orderId}</td>
                    <td className="py-2.5 px-1">Table #{b.tableNumber || "Deli"}</td>
                    <td className="py-2.5 px-1">₹{b.subtotal}</td>
                    <td className="py-2.5 px-1 text-slate-400">₹{b.gst}</td>
                    <td className="py-2.5 px-1 text-emerald-400 font-bold font-mono">₹{b.amount}</td>
                    <td className="py-2.5 px-1">
                      {b.status === "paid" ? (
                        <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.5 rounded font-bold uppercase font-sans">Settled</span>
                      ) : (
                        <span className="text-[9px] bg-amber-950 text-amber-400 border border-amber-800/40 px-1.5 py-0.5 rounded font-bold uppercase font-sans">Pending</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
