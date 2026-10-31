import React from "react";
import {
  LayoutDashboard,
  User,
  ShoppingBag,
  Calendar,
  Utensils,
  ChefHat,
  ClipboardList,
  Receipt,
  Truck,
  Users,
  Package,
  BarChart3,
  Contact,
  Megaphone,
  Bot,
  Settings,
  ShieldCheck,
  LogOut
} from "lucide-react";

interface AdminSidebarProps {
  currentRole: string;
  setRole: (role: string) => void;
  adminTab?: string;
  setAdminTab?: (tab: string) => void;
}

export default function AdminSidebar({
  currentRole,
  setRole,
  adminTab = "Dashboard",
  setAdminTab
}: AdminSidebarProps) {
  
  // Custom navigation structure that maps directly to the sidebar in Image 2
  const menuItems = [
    { name: "Dashboard", role: "admin", tab: "Dashboard", icon: LayoutDashboard },
    { name: "Orders", role: "kitchen", tab: "Orders", icon: ShoppingBag },
    { name: "Reservations", role: "admin", tab: "Reservations", icon: Calendar },
    { name: "Menu Management", role: "admin", tab: "Menu", icon: Utensils },
    { name: "Kitchen Chef", role: "kitchen", tab: "Chef", icon: ChefHat },
    { name: "Digital Waiter", role: "waiter", tab: "Waiter", icon: ClipboardList },
    { name: "Billing & Payment", role: "billing", tab: "Billing", icon: Receipt },
    { name: "Delivery Partner", role: "delivery", tab: "Delivery", icon: Truck },
    { name: "Inventory", role: "admin", tab: "Inventory", icon: Package },
    { name: "Reports & Analytics", role: "admin", tab: "Reports", icon: BarChart3 },
    { name: "Staff Management", role: "admin", tab: "Staff", icon: Contact },
    { name: "AI Assistant", role: "admin", tab: "AI_Assistant", icon: Bot },
    { name: "Settings", role: "admin", tab: "Settings", icon: Settings },
    { name: "System Admin", role: "admin", tab: "SystemAdmin", icon: ShieldCheck },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    setRole(item.role);
    if (setAdminTab) {
      setAdminTab(item.tab);
    }
  };

  return (
    <aside id="admin-sidebar" className="w-64 bg-[#090d16] border-r border-slate-800/80 flex flex-col h-full text-slate-300 shrink-0 select-none overflow-y-auto font-sans">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/40">
        <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-orange-600/20">
          <ChefHat className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-white tracking-tight leading-none font-display flex items-center gap-1.5">
            SmartDine <span className="text-orange-500 font-mono text-[10px] px-1 py-0.5 bg-orange-950/40 rounded border border-orange-800/30">AI</span>
          </h2>
          <span className="text-[9px] text-slate-400 font-medium block mt-0.5">Restaurant Management Platform</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          
          // Determine if active: active means role matches AND either (adminTab matches or item is role-switch)
          const isRoleMatch = currentRole === item.role;
          const isTabMatch = adminTab === item.tab;
          const isActive = (currentRole === "customer" && item.role === "customer") ||
                           (currentRole !== "customer" && isRoleMatch && isTabMatch);

          return (
            <button
              key={item.name}
              id={`admin-sidebar-item-${item.name.toLowerCase().replace(" ", "-")}`}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                isActive
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/15 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.name}</span>
            </button>
          );
        })}

        {/* Static Log Out Button */}
        <button
          onClick={() => setRole("customer")}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-semibold tracking-wide text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 transition-all cursor-pointer mt-4"
        >
          <LogOut className="w-3.5 h-3.5 shrink-0" />
          <span>Log Out</span>
        </button>
      </nav>

      {/* Footer info matching screenshot 2 */}
      <div className="p-4 mt-auto border-t border-slate-800/40 text-[7.5px] text-slate-500 text-center font-mono leading-relaxed px-1">
        © 2025 SmartDine AI. All rights reserved.<br />
        Made with ❤️ for Restaurant Business
      </div>
    </aside>
  );
}
