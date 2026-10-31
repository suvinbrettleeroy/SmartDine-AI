import React from "react";
import { User, Utensils, ClipboardList, HeartHandshake, ShieldCheck, Receipt } from "lucide-react";

interface RoleSelectorProps {
  currentRole: string;
  setRole: (role: string) => void;
}

export default function RoleSelector({ currentRole, setRole }: RoleSelectorProps) {
  const roles = [
    { id: "customer", label: "Customer Portal", icon: User, color: "bg-emerald-500", desc: "Digital Menu, AI Chat, Table Booking & Real-time Ordering" },
    { id: "kitchen", label: "Kitchen Chef", icon: Utensils, color: "bg-orange-500", desc: "Live Cooking status, order queues, and ingredient prep timers" },
    { id: "waiter", label: "Digital Waiter", icon: ClipboardList, color: "bg-blue-500", desc: "Digital Table assignment, order taking, split billing & feedback" },
    { id: "billing", label: "Billing & Payment", icon: Receipt, color: "bg-indigo-500", desc: "Settle orders, manage live tables bills, process payments in Rupees" },
    { id: "delivery", label: "Delivery Partner", icon: HeartHandshake, color: "bg-purple-500", desc: "GPS route optimization, order OTP validation & driver reviews" },
    { id: "admin", label: "System Admin", icon: ShieldCheck, color: "bg-slate-700", desc: "Manage menu items, staff lists, roles, and global parameters" },
  ];

  return (
    <div id="role-selector-container" className="bg-slate-900 text-white p-4 border-b border-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-lg animate-pulse">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              SmartDine AI
            </h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest uppercase">
              Intelligent Restaurant OS
            </p>
          </div>
        </div>

        {/* Roles Badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = currentRole === role.id;
            return (
              <button
                key={role.id}
                id={`role-btn-${role.id}`}
                onClick={() => setRole(role.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `${role.color} text-white shadow-md scale-105`
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
                title={role.desc}
              >
                <Icon className="w-4 h-4" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Current Perspective Hint */}
      <div className="bg-slate-950 px-4 py-1.5 -mx-4 -mb-4 mt-3 flex items-center justify-between border-t border-slate-800 text-[11px] text-slate-400 font-sans">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>
            Active Session: <strong>{roles.find(r => r.id === currentRole)?.label}</strong> View
          </span>
        </div>
        <div className="hidden sm:block text-slate-500 italic">
          {roles.find(r => r.id === currentRole)?.desc}
        </div>
      </div>
    </div>
  );
}
