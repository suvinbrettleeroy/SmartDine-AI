import React from "react";
import {
  Home,
  Compass,
  ClipboardList,
  Calendar,
  Heart,
  Sparkles,
  Wallet,
  MapPin,
  HelpCircle,
  Settings,
  Gift,
  Crown
} from "lucide-react";

interface CustomerSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  points: number;
  setRole: (role: string) => void;
}

export default function CustomerSidebar({
  activeTab,
  setActiveTab,
  points,
  setRole
}: CustomerSidebarProps) {
  const menuItems = [
    { name: "Home", icon: Home },
    { name: "Restaurants", icon: Compass },
    { name: "Orders", icon: ClipboardList },
    { name: "Reservations", icon: Calendar },
    { name: "Favorites", icon: Heart },
    { name: "Loyalty Rewards", icon: Sparkles },
    { name: "Wallet", icon: Wallet },
    { name: "Addresses", icon: MapPin },
    { name: "Support", icon: HelpCircle },
    { name: "Settings", icon: Settings },
  ];

  return (
    <aside id="customer-sidebar" className="w-64 bg-[#090d16] border-r border-slate-800/80 flex flex-col h-full text-slate-300 shrink-0 select-none overflow-y-auto">
      {/* Brand Header */}
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/40">
        <div className="w-10 h-10 bg-orange-600 rounded-xl flex flex-col items-center justify-center font-bold text-white text-xl shadow-lg shadow-orange-600/20">
          <span className="leading-none mt-1">U</span>
          <span className="text-[10px] leading-none -mt-1 font-extrabold">U</span>
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-white tracking-tight leading-none font-display flex items-center gap-1.5">
            SmartDine <span className="text-orange-500 font-mono text-[10px] px-1 py-0.5 bg-orange-950/40 rounded border border-orange-800/30">AI</span>
          </h2>
          <span className="text-[9px] text-slate-400 font-medium block mt-0.5 font-sans">Good Food, Great Experience</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;
          return (
            <button
              key={item.name}
              id={`sidebar-item-${item.name.toLowerCase().replace(" ", "-")}`}
              onClick={() => {
                setActiveTab(item.name);
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-md shadow-orange-600/10 font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-white"}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Sticky Cards (Loyalty & Refer) */}
      <div className="p-4 space-y-4 mt-auto border-t border-slate-800/40">
        {/* Loyalty Progress Card */}
        <div className="bg-[#0e1423] border border-slate-800 rounded-xl p-3.5 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 font-display">
                <Crown className="w-3.5 h-3.5 fill-amber-400/20" />
                <span>Your Loyalty</span>
              </div>
              <span className="text-[10px] text-amber-500 font-bold font-mono uppercase tracking-wider block mt-0.5">Gold Member</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between items-end text-white">
              <span className="text-lg font-extrabold font-mono tracking-tight">{points.toLocaleString()}</span>
              <span className="text-[9px] text-slate-400 font-mono">Points</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full rounded-full" style={{ width: "75%" }}></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-[9px] text-slate-500 font-mono">550 pts to reach Platinum</span>
              <button className="text-[9px] font-bold text-orange-500 border border-orange-500/20 hover:bg-orange-500/10 px-2 py-0.5 rounded transition-all cursor-pointer">
                View Rewards
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
