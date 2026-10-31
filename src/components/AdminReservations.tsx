import React, { useState } from "react";
import { Calendar, Plus, Edit, Trash2 } from "lucide-react";
import { Reservation } from "../types";

interface AdminReservationsProps {
  state: {
    reservations: Reservation[];
  };
  fetchState: () => Promise<void>;
}

export default function AdminReservations({
  state,
  fetchState
}: AdminReservationsProps) {
  const [editingResId, setEditingResId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(true);

  // Form states (shared by Add and Edit)
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [date, setDate] = useState("2026-06-30");
  const [time, setTime] = useState("18:30");
  const [partySize, setPartySize] = useState("2");
  const [dietaryPreference, setDietaryPreference] = useState("None");
  const [status, setStatus] = useState<"confirmed" | "attended" | "cancelled">("confirmed");

  const startEditing = (r: Reservation) => {
    setEditingResId(r.id);
    setCustomerName(r.customerName);
    setCustomerPhone(r.customerPhone || "");
    setCustomerEmail(r.customerEmail || "");
    setDate(r.date);
    setTime(r.time);
    setPartySize(String(r.partySize));
    setDietaryPreference(r.dietaryPreference || "None");
    setStatus(r.status);
  };

  const cancelEditing = () => {
    setEditingResId(null);
    resetForm();
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setDate("2026-06-30");
    setTime("18:30");
    setPartySize("2");
    setDietaryPreference("None");
    setStatus("confirmed");
  };

  const handleCreateReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          date,
          time,
          partySize: parseInt(partySize) || 2,
          dietaryPreference
        })
      });
      if (res.ok) {
        alert("📅 Table reservation added persistently!");
        resetForm();
        await fetchState();
      } else {
        alert("Failed to add table reservation.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUpdateReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResId) return;

    try {
      const res = await fetch(`/api/reservations/${editingResId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          date,
          time,
          partySize: parseInt(partySize) || 2,
          dietaryPreference,
          status
        })
      });
      if (res.ok) {
        alert("✏️ Reservation updated successfully!");
        setEditingResId(null);
        resetForm();
        await fetchState();
      } else {
        alert("Failed to update reservation details.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteReservation = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this reservation record?")) return;
    try {
      const res = await fetch(`/api/reservations/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("🗑️ Reservation deleted successfully!");
        await fetchState();
      } else {
        alert("Failed to delete reservation record.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="admin-reservations-ledger" className="grid grid-cols-1 xl:grid-cols-12 gap-4 font-sans text-xs">
      {/* Left Column: List of Reservations */}
      <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white font-sans">
              Guest Table Booking & Reservations Ledger
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {state.reservations.length} total bookings
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Confirmed Bookings</span>
            <span className="text-lg font-mono font-bold text-emerald-400 mt-1 block">
              {state.reservations.filter(r => r.status === "confirmed").length} tables
            </span>
          </div>
          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Attended Today</span>
            <span className="text-lg font-mono font-bold text-indigo-400 mt-1 block">
              {state.reservations.filter(r => r.status === "attended").length} guests
            </span>
          </div>
          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Cancelled / Reallocated</span>
            <span className="text-lg font-mono font-bold text-rose-500 mt-1 block">
              {state.reservations.filter(r => r.status === "cancelled").length} tables
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-1">ID</th>
                <th className="py-2 px-1">Guest</th>
                <th className="py-2 px-1">Contact</th>
                <th className="py-2 px-1">Time & Date</th>
                <th className="py-2 px-1">Seats</th>
                <th className="py-2 px-1 text-center">Status</th>
                <th className="py-2 px-1 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.reservations.map((r) => (
                <tr key={r.id} className="border-b border-slate-850 hover:bg-slate-950/40 text-slate-300">
                  <td className="py-2.5 px-1 font-mono text-slate-500 text-[10px]">{r.id}</td>
                  <td className="py-2.5 px-1 font-sans font-bold text-white">{r.customerName}</td>
                  <td className="py-2.5 px-1 font-mono text-[10px] text-slate-400">{r.customerPhone}</td>
                  <td className="py-2.5 px-1 text-indigo-400">{r.date} @ {r.time}</td>
                  <td className="py-2.5 px-1 font-bold font-sans">{r.partySize} Pax</td>
                  <td className="py-2.5 px-1 text-center">
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                      r.status === "confirmed" ? "bg-emerald-950 text-emerald-400 border-emerald-900/40" :
                      r.status === "attended" ? "bg-indigo-950 text-indigo-400 border-indigo-900/40" :
                      "bg-rose-950 text-rose-400 border-rose-900/40"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-1 text-right font-sans">
                    <div className="flex gap-1.5 justify-end">
                      <button
                        onClick={() => startEditing(r)}
                        className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/25 p-1 rounded font-bold transition-all text-[10px] flex items-center gap-0.5 cursor-pointer"
                      >
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReservation(r.id)}
                        className="text-rose-400 hover:text-rose-300 hover:bg-rose-950/25 p-1 rounded font-bold transition-all text-[10px] flex items-center gap-0.5 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: Dynamic Form to Add/Edit Reservation */}
      <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md text-slate-300">
        <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-tight text-white flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-400" />
            {editingResId ? "Edit Reservation Record" : "Add New Booking"}
          </h3>
          {editingResId && (
            <button
              onClick={cancelEditing}
              className="text-[10px] font-mono text-rose-400 hover:underline uppercase font-bold cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={editingResId ? handleUpdateReservationSubmit : handleCreateReservation} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Guest Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Liam Sterling"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Phone No</label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Email Address</label>
              <input
                type="email"
                placeholder="guest@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono text-[10px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1 col-span-2">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Time *</label>
              <input
                type="text"
                required
                placeholder="19:30"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Party Size *</label>
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="6">6 People</option>
                <option value="8">8 People</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Status</label>
              <select
                value={status}
                disabled={!editingResId}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none disabled:opacity-50"
              >
                <option value="confirmed">Confirmed</option>
                <option value="attended">Attended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Dietary Preferences / Notes</label>
            <input
              type="text"
              placeholder="e.g., Dairy Allergy, Gluten-free"
              value={dietaryPreference}
              onChange={(e) => setDietaryPreference(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase transition-all tracking-wide cursor-pointer font-sans"
          >
            {editingResId ? "Update Reservation Details" : "Record Booking persistently"}
          </button>
        </form>
      </div>
    </div>
  );
}
