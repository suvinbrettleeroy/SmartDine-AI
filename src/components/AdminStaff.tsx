import React, { useState } from "react";
import { Users, Plus, ShieldCheck, Mail, Phone, MapPin, ChevronDown, ChevronUp, Star, Award, TrendingUp, AlertCircle } from "lucide-react";
import { Staff } from "../types";

interface AdminStaffProps {
  state: {
    staff: Staff[];
  };
  handleLogAttendance: (staffId: string, attendanceStatus: string) => Promise<void>;
  onStaffAdded: () => Promise<void>;
}

export default function AdminStaff({
  state,
  handleLogAttendance,
  onStaffAdded
}: AdminStaffProps) {
  // State for onboarding form
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState<"Chef" | "Waiter" | "Delivery" | "Manager" | "Admin">("Waiter");
  const [salary, setSalary] = useState("3000");
  const [shift, setShift] = useState<"Morning" | "Evening" | "Night">("Morning");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [details, setDetails] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Expandable row state
  const [expandedStaffId, setExpandedStaffId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedStaffId(expandedStaffId === id ? null : id);
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please fill in the staff member's name.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const url = editingStaffId ? `/api/staff/${editingStaffId}` : "/api/staff";
      const method = editingStaffId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          salary: parseFloat(salary) || 2500,
          shift,
          details: details || `Highly professional ${role} of the SmartDine crew.`,
          phone: phone || "+91 90022 11002",
          vehicle: role === "Delivery" ? (vehicle || "Electric Scooter (KA-03-HA-4202)") : "Standard Commute",
          profileImage: profileImage || `https://images.unsplash.com/photo-${role === "Chef" ? "1577219491135-ce391730fb2c" : "1534528741775-53994a69daeb"}?w=150&auto=format&fit=crop&q=60`
        })
      });

      if (res.ok) {
        // Clear form
        setName("");
        setRole("Waiter");
        setSalary("3000");
        setShift("Morning");
        setPhone("");
        setVehicle("");
        setDetails("");
        setProfileImage("");
        setShowAddForm(false);
        setEditingStaffId(null);
        await onStaffAdded();
      } else {
        setError(`Failed to register staff. Please try again.`);
      }
    } catch (err) {
      console.error("Error saving staff:", err);
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="admin-staff-ledgers" className="space-y-4 font-sans">
      {/* Overview stats header */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Total Force</span>
          <span className="text-xl font-mono font-bold text-white block mt-0.5">{state.staff.length} Members</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Attendance Rate</span>
          <span className="text-xl font-mono font-bold text-emerald-400 block mt-0.5">
            {Math.round((state.staff.filter(s => s.attendance === "Present").length / Math.max(state.staff.length, 1)) * 100)}%
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Est. Monthly Payroll</span>
          <span className="text-xl font-mono font-bold text-orange-400 block mt-0.5">
            ₹{state.staff.reduce((sum, s) => sum + (s.salary || 0), 0).toLocaleString()}
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 shadow-sm">
          <span className="text-[10px] font-mono text-slate-400 block uppercase">Avg Rating</span>
          <span className="text-xl font-mono font-bold text-yellow-400 block mt-0.5">4.8 ★</span>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white font-sans">
              SmartDine Crew, Performance & Payroll
            </h3>
          </div>
          <button
            onClick={() => {
              if (showAddForm) {
                // reset edit state
                setEditingStaffId(null);
                setName("");
                setRole("Waiter");
                setSalary("3000");
                setShift("Morning");
                setPhone("");
                setVehicle("");
                setDetails("");
                setProfileImage("");
              }
              setShowAddForm(!showAddForm);
            }}
            className="flex items-center gap-1 text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2.5 py-1 rounded cursor-pointer transition-all font-sans font-bold uppercase"
          >
            <Plus className="w-3.5 h-3.5" />
            {showAddForm ? (editingStaffId ? "Cancel Edit" : "Cancel Onboarding") : "Onboard New Staff"}
          </button>
        </div>

        {/* ONBOARDING FORM */}
        {showAddForm && (
          <form onSubmit={handleCreateStaff} className="bg-slate-950 p-4 rounded-xl border border-indigo-900/30 space-y-3">
            <div className="flex items-center gap-1.5 text-indigo-400 text-[11px] font-mono font-bold uppercase">
              <ShieldCheck className="w-4 h-4" /> {editingStaffId ? "Edit Crew Member Profile Details" : "Waiter / Chef / Courier Registration Station"}
            </div>

            {error && (
              <div className="bg-rose-950/40 text-rose-400 border border-rose-900/30 p-2.5 rounded-lg text-xs flex items-center gap-1.5 font-mono">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-mono block">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Liam Sterling"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-mono block">Job Role / Job Type *</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Waiter">Waiter</option>
                  <option value="Chef">Chef</option>
                  <option value="Delivery">Delivery Partner / Rider</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-mono block">Monthly Salary (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="Salary in ₹"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-mono block">Assigned Shift</label>
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Morning">Morning Shift (06:00 AM - 02:00 PM)</option>
                  <option value="Evening">Evening Shift (02:00 PM - 10:00 PM)</option>
                  <option value="Night">Night Shift (10:00 PM - 06:00 AM)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-mono block">Contact Phone No</label>
                <input
                  type="text"
                  placeholder="+91 99887 66554"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-mono block">Profile Picture URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={profileImage}
                  onChange={(e) => setProfileImage(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 text-[10px]"
                />
              </div>
            </div>

            {role === "Delivery" && (
              <div className="space-y-1">
                <label className="text-[10px] text-purple-400 uppercase font-mono block font-bold">Rider Commute / Vehicle Assignment details</label>
                <input
                  type="text"
                  placeholder="e.g. Electric Scooter (KA-03-EX-8822) or Royal Enfield (MH-12-PQ-9182)"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 uppercase font-mono block">Employee Profile Details, Notes & Background</label>
              <textarea
                placeholder="Write professional culinary credentials, background checks or specialized kitchen responsibilities..."
                rows={2}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded text-[10px] font-bold uppercase transition-all cursor-pointer shadow-lg active:scale-95 disabled:opacity-50"
              >
                {loading ? "Saving Employee Details..." : (editingStaffId ? "Update Employee Profile" : "Add to Operational Roster")}
              </button>
            </div>
          </form>
        )}

        {/* STAFF LIST TABLE */}
        <div className="overflow-x-auto font-mono text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-1">ID</th>
                <th className="py-2 px-1">Name</th>
                <th className="py-2 px-1">Role / Job</th>
                <th className="py-2 px-1">Shift Time</th>
                <th className="py-2 px-1">Base Salary (₹)</th>
                <th className="py-2 px-1 text-center">Perf Rating</th>
                <th className="py-2 px-1 text-right">Attendance / Action</th>
              </tr>
            </thead>
            <tbody>
              {state.staff.map((s) => {
                const isExpanded = expandedStaffId === s.id;
                const displayName = s.name || s.nameWaiter || "Staff worker";
                return (
                  <React.Fragment key={s.id}>
                    <tr
                      onClick={() => toggleExpand(s.id)}
                      className="border-b border-slate-850 hover:bg-slate-950/40 text-slate-300 cursor-pointer transition-all"
                    >
                      <td className="py-2.5 px-1 font-mono text-slate-500 text-[10px]">
                        <div className="flex items-center gap-1">
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
                          {s.id}
                        </div>
                      </td>
                      <td className="py-2.5 px-1 font-sans">
                        <div className="flex items-center gap-2">
                          <img
                            src={s.profileImage || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60`}
                            alt={displayName}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full border border-slate-800 object-cover shrink-0"
                          />
                          <span className="font-bold text-white block hover:text-indigo-400 transition-colors">
                            {displayName}
                          </span>
                        </div>
                      </td>
                      <td className="py-2.5 px-1 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          s.role === "Chef" ? "bg-amber-950 text-amber-400 border border-amber-900/40" :
                          s.role === "Waiter" ? "bg-indigo-950 text-indigo-400 border border-indigo-900/40" :
                          s.role === "Delivery" ? "bg-purple-950 text-purple-400 border border-purple-900/40" :
                          "bg-emerald-950 text-emerald-400 border border-emerald-900/40"
                        }`}>
                          {s.role}
                        </span>
                      </td>
                      <td className="py-2.5 px-1 text-slate-400 font-sans">{s.shift} Shift</td>
                      <td className="py-2.5 px-1 font-mono font-bold">₹{s.salary}/m</td>
                      <td className="py-2.5 px-1 text-center">
                        <div className="flex items-center justify-center gap-0.5 text-yellow-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="font-bold font-mono text-[11px]">{s.performanceRating || "5.0"}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-1 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <span className={`text-[10px] font-bold uppercase ${s.attendance === 'Present' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            ● {s.attendance}
                          </span>
                          <button
                            onClick={() => handleLogAttendance(s.id, s.attendance === 'Present' ? 'Absent' : 'Present')}
                            className="text-[9px] bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 px-2.5 py-1 rounded cursor-pointer transition-all font-sans font-bold"
                          >
                            Toggle
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* EXPANDED PROFILE CARD */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={7} className="bg-slate-950/80 p-3 border-b border-slate-850">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                            {/* Profile Photo */}
                            <div className="md:col-span-2 flex flex-col items-center justify-center space-y-1">
                              <img
                                src={s.profileImage || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60`}
                                alt={displayName}
                                referrerPolicy="no-referrer"
                                className="w-16 h-16 rounded-xl border border-slate-800 object-cover shadow"
                              />
                              <span className="text-[9px] text-slate-500 font-mono">UID: {s.id}</span>
                            </div>

                            {/* Main Background & Details */}
                            <div className="md:col-span-6 space-y-2 text-xs font-sans">
                              <div className="flex items-center gap-1.5">
                                <Award className="w-4 h-4 text-amber-400" />
                                <span className="text-[11px] font-bold uppercase tracking-wider text-white">Culinary Crew Background File</span>
                              </div>
                              <p className="text-slate-300 italic text-[11px] leading-relaxed bg-slate-900/40 p-2.5 rounded border border-slate-850">
                                "{s.details || "Highly competent employee registered under the SmartDine operational framework. Selected for outstanding hospitality credentials."}"
                              </p>
                              {s.role === "Delivery" && s.vehicle && (
                                <div className="text-[10px] bg-purple-950/20 text-purple-400 border border-purple-900/30 px-2 py-1 rounded flex items-center gap-1.5 font-mono">
                                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                                  <span>Assigned Driver Vehicle: <strong>{s.vehicle}</strong></span>
                                </div>
                              )}
                            </div>

                            {/* Stats & Actions */}
                            <div className="md:col-span-4 space-y-2 text-[11px] font-mono border-t md:border-t-0 md:border-l border-slate-850 md:pl-4">
                              <div className="text-slate-400 uppercase font-bold text-[9px] tracking-wider mb-1 flex items-center gap-1">
                                <TrendingUp className="w-3.5 h-3.5 text-indigo-400" /> Metrics & Salary updates
                              </div>
                              <div className="flex justify-between border-b border-slate-850 pb-1">
                                <span className="text-slate-500">Contract Rate:</span>
                                <strong className="text-white">₹{s.salary} / month</strong>
                              </div>
                              <div className="flex justify-between border-b border-slate-850 pb-1">
                                <span className="text-slate-500">Contact Phone:</span>
                                <strong className="text-slate-300">{s.phone || "+91 99887 76655"}</strong>
                              </div>
                              <div className="flex justify-between border-b border-slate-850 pb-1">
                                <span className="text-slate-500">Shift Target:</span>
                                <strong className="text-white">{s.shift}</strong>
                              </div>
                              <div className="flex justify-between pb-1">
                                <span className="text-slate-500">Staff rating:</span>
                                <strong className="text-yellow-400">{s.performanceRating || "5.0"} / 5.0 ★</strong>
                              </div>

                              <div className="grid grid-cols-2 gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                                <button
                                  onClick={() => {
                                    setEditingStaffId(s.id);
                                    setName(s.name || s.nameWaiter || "");
                                    setRole(s.role as any);
                                    setSalary(String(s.salary));
                                    setShift(s.shift as any);
                                    setPhone(s.phone || "");
                                    setVehicle(s.vehicle || "");
                                    setDetails(s.details || "");
                                    setProfileImage(s.profileImage || "");
                                    setShowAddForm(true);
                                    // scroll to top
                                    document.getElementById("admin-staff-ledgers")?.scrollIntoView({ behavior: "smooth" });
                                  }}
                                  className="py-1 px-2 bg-indigo-600/35 hover:bg-indigo-600 text-indigo-300 hover:text-white rounded text-[9px] uppercase font-bold transition-all text-center cursor-pointer font-sans"
                                >
                                  Edit Profile
                                </button>
                                <button
                                  onClick={async () => {
                                    if (confirm(`Are you sure you want to delete ${displayName}? This will permanently remove them from the roster.`)) {
                                      try {
                                        const res = await fetch(`/api/staff/${s.id}`, { method: "DELETE" });
                                        if (res.ok) {
                                          alert("🗑️ Staff record successfully deleted!");
                                          await onStaffAdded();
                                        } else {
                                          alert("Failed to delete staff.");
                                        }
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }
                                  }}
                                  className="py-1 px-2 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white rounded text-[9px] uppercase font-bold transition-all text-center cursor-pointer font-sans"
                                >
                                  Delete Staff
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
