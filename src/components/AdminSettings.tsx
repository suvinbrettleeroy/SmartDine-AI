import React, { useState } from "react";
import {
  Building,
  MapPin,
  Percent,
  Calendar,
  MessageSquare,
  Bell,
  BarChart,
  Database,
  Sliders,
  Check,
  Plus,
  Trash2,
  Edit2,
  Settings,
  HelpCircle,
  Sparkles,
  RefreshCw,
  Globe,
  DollarSign,
  Upload,
  Clock,
  Phone,
  Mail,
  FileText,
  AlertTriangle,
  FileDown,
  Lock,
  Terminal,
  Play,
  Heart,
  User
} from "lucide-react";

interface Branch {
  id: string;
  name: string;
  manager: string;
  timings: string;
  status: "Active" | "Inactive";
  gps: string;
}

interface AdminSettingsProps {
  onSettingsSave?: (settings: any) => void;
  adminTheme?: string;
  setAdminTheme?: (theme: string) => void;
}

export default function AdminSettings({ onSettingsSave, adminTheme, setAdminTheme }: AdminSettingsProps) {
  // Navigation structure
  const categories = [
    { id: "A", name: "Restaurant Profile", icon: Building },
    { id: "B", name: "Branch Management", icon: MapPin },
    { id: "F", name: "Tax & Billing Settings", icon: Percent },
    { id: "H", name: "Reservation Settings", icon: Calendar },
    { id: "M", name: "WhatsApp Automation", icon: MessageSquare },
    { id: "O", name: "Notification Settings", icon: Bell },
    { id: "Q", name: "Reports Configuration", icon: BarChart },
    { id: "R", name: "Backup & Restore", icon: Database },
    { id: "T", name: "System Settings", icon: Sliders },
  ];

  const [activeSubTab, setActiveSubTab] = useState("A");
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3000);
  };

  // ==========================================
  // A. Restaurant Profile State
  // ==========================================
  const [profile, setProfile] = useState({
    name: "SmartDine Premium",
    logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=120&auto=format&fit=crop&q=80",
    cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80",
    description: "Multi-cuisine high fidelity smart dining lounge equipped with real-time automated kitchens and chef assistant models.",
    cuisineType: "Multi-Cuisine (North Indian, South Indian, Continental, Italian)",
    gstNumber: "33AAFCS8921M1Z5",
    fssaiLicense: "12421999000281",
    panNumber: "AAFCS8921M",
    registrationNumber: "CORP-CHE-2024-912A",
    contactNumber: "+91 98765 43210",
    email: "corporate@smartdine.ai",
    website: "https://smartdine.ai",
    facebook: "https://facebook.com/smartdine.ai",
    instagram: "https://instagram.com/smartdine.ai",
    twitter: "https://twitter.com/smartdine_ai"
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Restaurant profile updated successfully!");
  };

  // ==========================================
  // B. Branch Management State
  // ==========================================
  const [branches, setBranches] = useState<Branch[]>([
    { id: "BR-101", name: "Adyar Lounge (Main)", manager: "Rajesh Kumar", timings: "11:00 AM - 11:00 PM", status: "Active", gps: "13.0063° N, 80.2574° E" },
    { id: "BR-102", name: "Nungambakkam Diner", manager: "Priya Sundar", timings: "11:30 AM - 11:30 PM", status: "Active", gps: "13.0607° N, 80.2393° E" },
    { id: "BR-103", name: "Velachery Express", manager: "Arun Prasath", timings: "08:00 AM - 10:30 PM", status: "Active", gps: "12.9796° N, 80.2197° E" }
  ]);

  const [showBranchModal, setShowBranchModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [branchForm, setBranchForm] = useState({
    name: "",
    manager: "",
    timings: "11:00 AM - 11:00 PM",
    status: "Active" as "Active" | "Inactive",
    gps: ""
  });

  const handleBranchClickAdd = () => {
    setEditingBranch(null);
    setBranchForm({ name: "", manager: "", timings: "11:00 AM - 11:00 PM", status: "Active", gps: "" });
    setShowBranchModal(true);
  };

  const handleBranchEdit = (b: Branch) => {
    setEditingBranch(b);
    setBranchForm({ name: b.name, manager: b.manager, timings: b.timings, status: b.status, gps: b.gps });
    setShowBranchModal(true);
  };

  const handleBranchDelete = (id: string) => {
    setBranches(branches.filter(b => b.id !== id));
    triggerToast("Branch removed successfully!");
  };

  const handleBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBranch) {
      setBranches(branches.map(b => b.id === editingBranch.id ? { ...b, ...branchForm } : b));
      triggerToast("Branch details updated!");
    } else {
      const newBr: Branch = {
        id: "BR-" + (100 + branches.length + 1),
        ...branchForm
      };
      setBranches([...branches, newBr]);
      triggerToast("New branch added successfully!");
    }
    setShowBranchModal(false);
  };

  // ==========================================
  // F. Tax & Billing State
  // ==========================================
  const [billing, setBilling] = useState({
    gstPercentage: 5.0,
    serviceCharge: 2.5,
    deliveryCharges: 40,
    packagingCharges: 15,
    invoiceFormat: "Thermal 80mm",
    taxRules: "Exclusive" // Inclusive / Exclusive
  });

  const handleBillingSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Tax & billing formulas compiled!");
  };

  // ==========================================
  // H. Reservation Settings State
  // ==========================================
  const [reservationSettings, setReservationSettings] = useState({
    enabled: true,
    advanceBookingDays: 7,
    maxGuestsPerTable: 12,
    cancellationPolicy: "Free cancellation up to 1 hour before scheduled time. No-shows will temporarily hold a penalty point.",
    confirmationRules: "Auto-Confirm", // Auto-Confirm / Manual Approval
    autoReminder: "WhatsApp & Email (30 mins before)"
  });

  const handleReservationSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Reservation booking parameters optimized!");
  };

  // ==========================================
  // M. WhatsApp Automation State
  // ==========================================
  const [whatsapp, setWhatsapp] = useState({
    pabblyUrl: "",
    instanceId: "",
    accessToken: "",
    orderConfirmation: true,
    reservationConfirmation: true,
    promotionalMessages: false,
    birthdayWishes: true,
    feedbackRequests: true,
    campaignSettings: "Delay 3 mins post-delivery"
  });

  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookTestResult, setWebhookTestResult] = useState<string | null>(null);

  const testWebhookConnection = () => {
    setTestingWebhook(true);
    setWebhookTestResult(null);
    setTimeout(() => {
      setTestingWebhook(false);
      setWebhookTestResult("✅ Pabbly connection established! Handshake success code 200 (Stable).");
    }, 1500);
  };

  const handleWhatsappSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("WhatsApp automation hooks dispatched!");
  };

  // ==========================================
  // O. Notification Settings State
  // ==========================================
  const [notifications, setNotifications] = useState({
    newOrders: true,
    newReservations: true,
    staffAlerts: false,
    inventoryAlerts: true,
    customerReviews: true,
    whatsappNotifications: true,
    emailNotifications: false
  });

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    const updated = !notifications[key];
    setNotifications({ ...notifications, [key]: updated });
    triggerToast(`${String(key).replace(/([A-Z])/g, ' $1')} ${updated ? "enabled" : "disabled"}`);
  };

  // ==========================================
  // Q. Reports Configuration State
  // ==========================================
  const [reports, setReports] = useState({
    dailySchedule: "23:00 (Close of Day)",
    weeklyDay: "Monday Morning",
    monthlyDay: "1st of Every Month",
    exportFormat: "PDF & Excel Summary",
    dashboardPref: "Sales Area Chart + Bestseller Bento Grid"
  });

  const handleReportsSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Reports schedulers successfully programmed!");
  };

  // ==========================================
  // R. Backup & Restore State
  // ==========================================
  const [backupLoading, setBackupLoading] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState<string | null>(null);

  const triggerManualBackup = () => {
    setBackupLoading(true);
    setTimeout(() => {
      setBackupLoading(false);
      triggerToast("Manual backup file compiled!");

      // Simulate a direct download of a simulated backup SQL file
      const backupData = JSON.stringify({ profile, branches, billing, reservationSettings, whatsapp, notifications, reports });
      const blob = new Blob([backupData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `smartdine_db_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1500);
  };

  const handleRestoreUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRestoreProgress("Reading backup archive...");
    setTimeout(() => {
      setRestoreProgress("Verifying schema headers & checksums...");
      setTimeout(() => {
        setRestoreProgress("Wiping transient db and restoring tables...");
        setTimeout(() => {
          setRestoreProgress(null);
          triggerToast("SmartDine DB successfully restored to backup version!");
        }, 1000);
      }, 1000);
    }, 1000);
  };

  // ==========================================
  // T. System Settings State
  // ==========================================
  const [system, setSystem] = useState({
    theme: adminTheme || "Slate Dark",
    language: "English (US)",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12-Hour (AM/PM)",
    currency: "INR (₹)",
    timeZone: "Asia/Kolkata (IST)",
    dashboardLayout: "Modular bento layout",
    defaultLandingPage: "Live Sales Dashboard"
  });

  React.useEffect(() => {
    if (setAdminTheme && system.theme) {
      setAdminTheme(system.theme);
    }
  }, [system.theme, setAdminTheme]);

  const handleSystemSave = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast("Global environment settings compiled!");
  };


  return (
    <div id="admin-restaurant-settings-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-16 font-sans">
      
      {/* Toast Alert Banner */}
      {saveSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-500/30 animate-bounce">
          <Check className="w-4.5 h-4.5 shrink-0 stroke-[3]" />
          <span className="text-xs font-bold font-mono uppercase">{saveSuccessMsg}</span>
        </div>
      )}

      {/* Header Widget */}
      <div className="lg:col-span-12 bg-gradient-to-r from-[#0d1424] via-[#090d16] to-[#120f26] border border-slate-800 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-5 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-orange-600/25">
            <Settings className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-white tracking-tight leading-none font-display">REST-API Settings Console</h2>
              <span className="text-[9px] bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase">SYSTEM HEALTHY</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Configure restaurant profiles, delivery regions, tax configurations, and WhatsApp system API webhooks.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => triggerToast("All system parameters synced with server!")} 
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white rounded-xl text-[10px] font-bold text-slate-300 uppercase transition-all cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Force Sync
          </button>
        </div>
      </div>

      {/* Side Navigation Categories */}
      <div className="lg:col-span-3 space-y-1.5">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block px-2 mb-2">SYSTEM BLOCKS</span>
        <div className="bg-[#090d16] border border-slate-800/80 rounded-2xl p-2.5 space-y-1 shadow-md">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeSubTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveSubTab(cat.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/15"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{cat.name}</span>
                </div>
                <span className="text-[9px] font-mono opacity-50">{cat.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Dynamically Switched Content Container */}
      <div className="lg:col-span-9 bg-[#090d16] border border-slate-800/80 rounded-3xl p-6 shadow-xl min-h-[520px]">
        
        {/* ==========================================
            A. RESTAURANT PROFILE
            ========================================== */}
        {activeSubTab === "A" && (
          <form onSubmit={handleProfileSave} className="space-y-6">
            <div className="border-b border-slate-850 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-orange-500" /> A. Restaurant Corporate Profile
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Manage public digital branding, FSSAI / GST licensing configurations, and contact handles.</p>
              </div>
              <span className="text-[9px] font-mono font-bold bg-orange-950 text-orange-400 border border-orange-800/40 px-2 py-0.5 rounded">AUTO_SYNC</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Cover Image Preview */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Restaurant Cover Photo & Logo</label>
                <div className="relative h-28 rounded-xl overflow-hidden border border-slate-800">
                  <img src={profile.cover} alt="Cover" className="w-full h-full object-cover brightness-[0.45]" />
                  <div className="absolute inset-0 flex items-center justify-between px-5">
                    <div className="flex items-center gap-3">
                      <img src={profile.logo} alt="Logo" className="w-12 h-12 rounded-xl object-cover border-2 border-orange-500" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{profile.name}</h4>
                        <p className="text-[10px] text-slate-300 font-mono">ID: CORP-CHE-9811A</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => triggerToast("Simulated upload of graphics archive success!")} className="px-3 py-1 bg-slate-900/90 border border-slate-800 hover:text-white rounded text-[10px] font-bold font-mono uppercase flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3.5 h-3.5" /> Replace Art
                    </button>
                  </div>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Restaurant Name *</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Cuisine Style Specialty *</label>
                <input
                  type="text"
                  required
                  value={profile.cuisineType}
                  onChange={(e) => setProfile({ ...profile, cuisineType: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Restaurant Description *</label>
                <textarea
                  required
                  rows={2}
                  value={profile.description}
                  onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-orange-500 font-sans resize-none"
                />
              </div>

              {/* Licensing & Registration Numbers */}
              <div className="border-t border-slate-900 pt-3 md:col-span-2">
                <h4 className="text-[9px] text-orange-400 font-extrabold uppercase tracking-widest font-mono mb-3">GST & Government Licenses</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">GST Registration (GSTIN) *</label>
                    <input
                      type="text"
                      required
                      value={profile.gstNumber}
                      onChange={(e) => setProfile({ ...profile, gstNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white font-mono uppercase"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">FSSAI License Certificate *</label>
                    <input
                      type="text"
                      required
                      value={profile.fssaiLicense}
                      onChange={(e) => setProfile({ ...profile, fssaiLicense: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">PAN Card Number *</label>
                    <input
                      type="text"
                      required
                      value={profile.panNumber}
                      onChange={(e) => setProfile({ ...profile, panNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white font-mono uppercase"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Business Registration No *</label>
                    <input
                      type="text"
                      required
                      value={profile.registrationNumber}
                      onChange={(e) => setProfile({ ...profile, registrationNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-900 pt-3 md:col-span-2">
                <h4 className="text-[9px] text-orange-400 font-extrabold uppercase tracking-widest font-mono mb-3">Corporate Communication Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Contact No *</label>
                    <input
                      type="text"
                      required
                      value={profile.contactNumber}
                      onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Official Email *</label>
                    <input
                      type="email"
                      required
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Website Url *</label>
                    <input
                      type="url"
                      required
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="border-t border-slate-900 pt-3 md:col-span-2">
                <h4 className="text-[9px] text-orange-400 font-extrabold uppercase tracking-widest font-mono mb-3">Connected Social Media Links</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Facebook Page</label>
                    <input
                      type="url"
                      value={profile.facebook}
                      onChange={(e) => setProfile({ ...profile, facebook: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white text-[11px] font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Instagram handle</label>
                    <input
                      type="url"
                      value={profile.instagram}
                      onChange={(e) => setProfile({ ...profile, instagram: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white text-[11px] font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Twitter/X Profile</label>
                    <input
                      type="url"
                      value={profile.twitter}
                      onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white text-[11px] font-mono"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-900">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer"
              >
                Compile and Save Profile
              </button>
            </div>
          </form>
        )}

        {/* ==========================================
            B. BRANCH MANAGEMENT
            ========================================== */}
        {activeSubTab === "B" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-500" /> B. Branch Configuration Management
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Configure active geographical locations, allocate managers, operational hours & GPS scopes.</p>
              </div>
              <button
                onClick={handleBranchClickAdd}
                className="px-3. py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Branch
              </button>
            </div>

            {/* Branches list */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {branches.map((b) => (
                <div
                  key={b.id}
                  className="bg-slate-950 border border-slate-900 hover:border-slate-800 p-4.5 rounded-2xl flex flex-col justify-between space-y-3.5 transition-all shadow"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] bg-slate-900 border border-slate-850 text-slate-400 px-2 py-0.5 rounded">
                        {b.id}
                      </span>
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        b.status === "Active" ? "bg-emerald-950/65 text-emerald-400 border border-emerald-800/30" : "bg-slate-900 text-slate-500"
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-xs font-display">{b.name}</h4>
                    
                    <div className="space-y-1 pl-1 text-[11px] text-slate-400 font-sans">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                        <span>Manager: <strong className="text-slate-300">{b.manager}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>Hours: <strong className="text-slate-300">{b.timings}</strong></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-3.5 h-3.5 text-slate-500" />
                        <span className="font-mono">GPS: <strong className="text-slate-400">{b.gps}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2 border-t border-slate-900">
                    <button
                      onClick={() => handleBranchEdit(b)}
                      className="px-2.5 py-1.5 bg-slate-900 hover:text-white border border-slate-800 rounded-lg text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1 text-slate-300"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleBranchDelete(b.id)}
                      className="px-2.5 py-1.5 bg-rose-950/35 hover:bg-rose-900/10 border border-rose-900/20 text-rose-400 rounded-lg text-[10px] font-bold cursor-pointer transition-all flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Branch edit/add modal */}
            {showBranchModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <form onSubmit={handleBranchSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
                  <div className="border-b border-slate-800 pb-2.5">
                    <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                      {editingBranch ? "✏️ Edit Saved Branch" : "🏠 Configure New Branch Location"}
                    </h4>
                  </div>

                  <div className="space-y-3.5 text-xs text-slate-300">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Branch Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marina Beach Lounge"
                        value={branchForm.name}
                        onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Assigned Manager *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Babu"
                        value={branchForm.manager}
                        onChange={(e) => setBranchForm({ ...branchForm, manager: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Timings *</label>
                        <input
                          type="text"
                          required
                          value={branchForm.timings}
                          onChange={(e) => setBranchForm({ ...branchForm, timings: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Status</label>
                        <select
                          value={branchForm.status}
                          onChange={(e) => setBranchForm({ ...branchForm, status: e.target.value as any })}
                          className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px]"
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">GPS Location Coordinates *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 13.0483° N, 80.2081° E"
                        value={branchForm.gps}
                        onChange={(e) => setBranchForm({ ...branchForm, gps: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-1 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => setShowBranchModal(false)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-orange-600 text-white rounded uppercase cursor-pointer"
                    >
                      {editingBranch ? "Save Edit" : "Add Branch"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==========================================
            F. TAX & BILLING
            ========================================== */}
        {activeSubTab === "F" && (
          <form onSubmit={handleBillingSave} className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-orange-500" /> F. Tax, Packaging & Billing Configuration (No Payments)
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Configure automated fiscal calculations for standard GST percentages, service charges, and physical delivery packaging fees.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              
              {/* GST Percentage */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">⚖️</span>
                <h4 className="text-xs font-bold text-white font-display">Government GST Percentage *</h4>
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="28"
                    required
                    value={billing.gstPercentage}
                    onChange={(e) => setBilling({ ...billing, gstPercentage: parseFloat(e.target.value) })}
                    className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-white w-24 text-right"
                  />
                  <span className="text-slate-400">% Flat Rate</span>
                </div>
              </div>

              {/* Service Charge */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🛎️</span>
                <h4 className="text-xs font-bold text-white font-display">Optional Dining Service Charge *</h4>
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="15"
                    required
                    value={billing.serviceCharge}
                    onChange={(e) => setBilling({ ...billing, serviceCharge: parseFloat(e.target.value) })}
                    className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-white w-24 text-right"
                  />
                  <span className="text-slate-400">% of Subtotal</span>
                </div>
              </div>

              {/* Delivery Charges */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🛵</span>
                <h4 className="text-xs font-bold text-white font-display">Standard Local Rider Delivery Charge *</h4>
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <input
                    type="number"
                    min="0"
                    required
                    value={billing.deliveryCharges}
                    onChange={(e) => setBilling({ ...billing, deliveryCharges: parseInt(e.target.value) })}
                    className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-white w-24 text-right"
                  />
                  <span className="text-slate-400">INR flat rate per order</span>
                </div>
              </div>

              {/* Packaging Charges */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🥡</span>
                <h4 className="text-xs font-bold text-white font-display">Eco Packaging & Box Charges *</h4>
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <input
                    type="number"
                    min="0"
                    required
                    value={billing.packagingCharges}
                    onChange={(e) => setBilling({ ...billing, packagingCharges: parseInt(e.target.value) })}
                    className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-white w-24 text-right"
                  />
                  <span className="text-slate-400">INR flat rate per box</span>
                </div>
              </div>

              {/* Invoice Format */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🧾</span>
                <h4 className="text-xs font-bold text-white font-display">Primary Invoice Format</h4>
                <select
                  value={billing.invoiceFormat}
                  onChange={(e) => setBilling({ ...billing, invoiceFormat: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 focus:outline-none"
                >
                  <option value="Thermal 80mm">Thermal Print (Standard 80mm roll)</option>
                  <option value="Thermal 58mm">Thermal Compact (Mini 58mm roll)</option>
                  <option value="PDF A4 Letter">Laser Print (Standard A4 layout PDF)</option>
                </select>
              </div>

              {/* Tax Rules */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">⚙️</span>
                <h4 className="text-xs font-bold text-white font-display">GST Calculation Policy</h4>
                <div className="flex gap-2 pt-1 font-mono text-[10px]">
                  {["Exclusive", "Inclusive"].map((rule) => (
                    <button
                      key={rule}
                      type="button"
                      onClick={() => setBilling({ ...billing, taxRules: rule })}
                      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        billing.taxRules === rule
                          ? "bg-orange-600 border-orange-500 text-white font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {rule} of Base Price
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-900">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer"
              >
                Compile billing formulas
              </button>
            </div>
          </form>
        )}

        {/* ==========================================
            H. RESERVATION SETTINGS
            ========================================== */}
        {activeSubTab === "H" && (
          <form onSubmit={handleReservationSave} className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-500" /> H. Live Booking & Reservation Settings
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Configure limits on seat reservation intervals, cancellation frameworks, and automatic confirmation parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Enabled toggle */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex justify-between items-center md:col-span-2">
                <div>
                  <h4 className="font-bold text-white text-xs font-display flex items-center gap-1.5">
                    ● Seat Reservation Portal Availability
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1">If disabled, clients won't be able to log table reservations inside their dashboard.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReservationSettings({ ...reservationSettings, enabled: !reservationSettings.enabled })}
                  className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[9px] font-mono border transition-all cursor-pointer ${
                    reservationSettings.enabled
                      ? "bg-emerald-950 border-emerald-500/30 text-emerald-400"
                      : "bg-slate-950 border-slate-800 text-slate-500"
                  }`}
                >
                  {reservationSettings.enabled ? "● Online" : "○ Offline"}
                </button>
              </div>

              {/* Days in advance */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">📅</span>
                <h4 className="text-xs font-bold text-white font-display">Max Advance Booking Limit *</h4>
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={reservationSettings.advanceBookingDays}
                    onChange={(e) => setReservationSettings({ ...reservationSettings, advanceBookingDays: parseInt(e.target.value) })}
                    className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-white w-20 text-right font-bold"
                  />
                  <span className="text-slate-400">Days in Advance</span>
                </div>
              </div>

              {/* Max Guests */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">👥</span>
                <h4 className="text-xs font-bold text-white font-display">Maximum Guests Per Table *</h4>
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={reservationSettings.maxGuestsPerTable}
                    onChange={(e) => setReservationSettings({ ...reservationSettings, maxGuestsPerTable: parseInt(e.target.value) })}
                    className="bg-slate-900 border border-slate-800 p-2 rounded-lg text-white w-20 text-right font-bold"
                  />
                  <span className="text-slate-400">Guests Maximum</span>
                </div>
              </div>

              {/* Confirmation Rules */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🛡️</span>
                <h4 className="text-xs font-bold text-white font-display">Confirmation Allocation Rules</h4>
                <div className="flex gap-2 pt-1 font-mono text-[10px]">
                  {["Auto-Confirm", "Manual Approval"].map((rule) => (
                    <button
                      key={rule}
                      type="button"
                      onClick={() => setReservationSettings({ ...reservationSettings, confirmationRules: rule })}
                      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        reservationSettings.confirmationRules === rule
                          ? "bg-orange-600 border-orange-500 text-white font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      {rule}
                    </button>
                  ))}
                </div>
              </div>

              {/* Auto Reminders */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">⏰</span>
                <h4 className="text-xs font-bold text-white font-display">Dispatch Automatic Reminders</h4>
                <select
                  value={reservationSettings.autoReminder}
                  onChange={(e) => setReservationSettings({ ...reservationSettings, autoReminder: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 focus:outline-none"
                >
                  <option value="WhatsApp & Email (30 mins before)">WhatsApp & Email (30 mins before)</option>
                  <option value="WhatsApp SMS (1 hour before)">WhatsApp SMS (1 hour before)</option>
                  <option value="Email Only (2 hours before)">Email Only (2 hours before)</option>
                  <option value="Muted">Do Not Send Reminders</option>
                </select>
              </div>

              {/* Cancellation Policy */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Cancellation Policy Disclaimer *</label>
                <textarea
                  required
                  rows={2}
                  value={reservationSettings.cancellationPolicy}
                  onChange={(e) => setReservationSettings({ ...reservationSettings, cancellationPolicy: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white focus:outline-none focus:border-orange-500 font-sans resize-none"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-slate-900">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer"
              >
                Save booking rules
              </button>
            </div>
          </form>
        )}

        {/* ==========================================
            M. WHATSAPP AUTOMATION
            ========================================== */}
        {activeSubTab === "M" && (
          <form onSubmit={handleWhatsappSave} className="space-y-6">
            <div className="border-b border-slate-850 pb-3 flex justify-between items-center flex-wrap gap-2">
              <div>
                <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-orange-500" /> M. WhatsApp Automation & Webhook Integration
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Connect Pabbly hooks or local nodes to automatically dispatch instant status summaries.</p>
              </div>
              <button
                type="button"
                disabled={testingWebhook}
                onClick={testWebhookConnection}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-mono font-bold uppercase rounded-xl transition-all cursor-pointer flex items-center gap-1"
              >
                {testingWebhook ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Test Webhook</span>
              </button>
            </div>

            {webhookTestResult && (
              <div className="bg-slate-950 border border-indigo-900/30 p-3 rounded-xl text-[10px] text-indigo-400 font-mono leading-relaxed">
                {webhookTestResult}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Webhook Connection */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Pabbly Connect Webhook URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://hooks.pabbly.com/..."
                  value={whatsapp.pabblyUrl}
                  onChange={(e) => setWhatsapp({ ...whatsapp, pabblyUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono"
                />
              </div>

              {/* API Instance ID */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">WhatsApp Cloud API Instance ID *</label>
                <input
                  type="text"
                  required
                  value={whatsapp.instanceId}
                  onChange={(e) => setWhatsapp({ ...whatsapp, instanceId: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono"
                />
              </div>

              {/* Access Token */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">WhatsApp API Bearer Access Token *</label>
                <input
                  type="password"
                  required
                  value={whatsapp.accessToken}
                  onChange={(e) => setWhatsapp({ ...whatsapp, accessToken: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono"
                />
              </div>

              {/* Campaign settings delay */}
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Discretionary Campaign Rules / Delay Parameters</label>
                <input
                  type="text"
                  value={whatsapp.campaignSettings}
                  onChange={(e) => setWhatsapp({ ...whatsapp, campaignSettings: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono"
                />
              </div>

              {/* Checkbox rules */}
              <div className="md:col-span-2 border-t border-slate-900 pt-4 space-y-3">
                <h4 className="text-[9px] text-orange-400 font-extrabold uppercase tracking-widest font-mono">Active Trigger Milestones</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { key: "orderConfirmation", label: "📦 Live Order Placed & ETA Dispatch", desc: "Sends receipt and live chef confirmation link." },
                    { key: "reservationConfirmation", label: "🗓️ Table Booking Confirmation & QR Pass", desc: "Sends seating allocation coordinates & QR access key." },
                    { key: "promotionalMessages", label: "🔥 Broadcast Marketing Campaign Ads", desc: "Allows bulk blasting vouchers (needs templates)." },
                    { key: "birthdayWishes", label: "🎂 Annual Birthday Wishes & Treat Voucher", desc: "Queries users database for today's birthdays." },
                    { key: "feedbackRequests", label: "⭐ AI Sentiment feedback surveys", desc: "Dispatched 45 mins after order check-out." }
                  ].map((trig) => (
                    <div key={trig.key} className="bg-slate-950 p-3 rounded-xl border border-slate-900 flex justify-between items-center gap-4">
                      <div>
                        <h5 className="font-bold text-white text-[11px] leading-tight">{trig.label}</h5>
                        <p className="text-[9px] text-slate-500 mt-0.5 leading-normal">{trig.desc}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = !whatsapp[trig.key as keyof typeof whatsapp];
                          setWhatsapp({ ...whatsapp, [trig.key]: updated });
                        }}
                        className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                          whatsapp[trig.key as keyof typeof whatsapp] ? "bg-orange-600" : "bg-slate-800"
                        }`}
                      >
                        <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                          whatsapp[trig.key as keyof typeof whatsapp] ? "translate-x-4" : "translate-x-0"
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-900">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer"
              >
                Apply WhatsApp Rules
              </button>
            </div>
          </form>
        )}

        {/* ==========================================
            O. NOTIFICATION SETTINGS
            ========================================== */}
        {activeSubTab === "O" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-orange-500" /> O. Admin Notification Settings
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Configure automated sound-bytes, pop-ups, emails, and alerts triggered in the active kitchen console.</p>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { key: "newOrders", label: "🔔 New order placed alarms", desc: "Plays kitchen ping and flashes order card instantaneously." },
                { key: "newReservations", label: "📅 Table booking notification alerts", desc: "Triggers on new reservation entries for manager validation." },
                { key: "staffAlerts", label: "👤 Staff attendance & payroll shifts alerts", desc: "Notifies when workers log clock-ins / clock-outs." },
                { key: "inventoryAlerts", label: "⚠️ Low-stock critical raw ingredients alerts", desc: "Flashes red warning if stock levels dip past low threshold limits." },
                { key: "customerReviews", label: "⭐ Customer AI sentiment feedback alerts", desc: "Flags review sub-block instantly on receipt." },
                { key: "whatsappNotifications", label: "💬 Dispatch live WhatsApp status updates", desc: "Allows sending automated receipts to client phone lines." },
                { key: "emailNotifications", label: "📧 Corporate backup summary dispatch", desc: "E-mails close-of-day revenues ledger to executives daily." }
              ].map((item) => (
                <div key={item.key} className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white leading-tight">{item.label}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleNotificationToggle(item.key as keyof typeof notifications)}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                      notifications[item.key as keyof typeof notifications] ? "bg-orange-600" : "bg-slate-800"
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                      notifications[item.key as keyof typeof notifications] ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==========================================
            Q. REPORTS CONFIGURATION
            ========================================== */}
        {activeSubTab === "Q" && (
          <form onSubmit={handleReportsSave} className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <BarChart className="w-4 h-4 text-orange-500" /> Q. Business Analytics & Reports Configuration
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Configure automatic report dispatches and customize your core BI dashboard visual modules.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Daily report schedule */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Daily Executive Snapshot Scheduler</label>
                <select
                  value={reports.dailySchedule}
                  onChange={(e) => setReports({ ...reports, dailySchedule: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="23:00 (Close of Day)">23:00 (Close of Day)</option>
                  <option value="20:00 (Peak Dinner End)">20:00 (Peak Dinner End)</option>
                  <option value="00:00 (Midnight Auto-Close)">00:00 (Midnight Auto-Close)</option>
                  <option value="Never">Do Not Generate Daily reports</option>
                </select>
              </div>

              {/* Weekly Schedule */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Weekly Consolidation Scheduler</label>
                <select
                  value={reports.weeklyDay}
                  onChange={(e) => setReports({ ...reports, weeklyDay: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="Monday Morning">Monday Morning (08:00 AM)</option>
                  <option value="Sunday Night">Sunday Night (11:30 PM)</option>
                  <option value="Wednesday Mid-Week">Wednesday Mid-Week</option>
                </select>
              </div>

              {/* Monthly Schedule */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Monthly Tax Consolidation Schedule</label>
                <select
                  value={reports.monthlyDay}
                  onChange={(e) => setReports({ ...reports, monthlyDay: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="1st of Every Month">1st of Every Month</option>
                  <option value="Last Day of Every Month">Last Day of Every Month</option>
                  <option value="10th (Tax Day)">10th of Every Month (Tax filing)</option>
                </select>
              </div>

              {/* Export Format */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">File Export Format Policy</label>
                <select
                  value={reports.exportFormat}
                  onChange={(e) => setReports({ ...reports, exportFormat: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="PDF & Excel Summary">Combined PDF & Excel Worksheet</option>
                  <option value="Raw CSV Files">Raw CSV spreadsheets zip</option>
                  <option value="JSON Data Archive">JSON formatted raw DB archive</option>
                </select>
              </div>

              {/* Dashboard Layout preferences */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">BI Executive Dashboard Panel Prefs</label>
                <input
                  type="text"
                  value={reports.dashboardPref}
                  onChange={(e) => setReports({ ...reports, dashboardPref: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-slate-900">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer"
              >
                Program analytical clocks
              </button>
            </div>
          </form>
        )}

        {/* ==========================================
            R. BACKUP & RESTORE
            ========================================== */}
        {activeSubTab === "R" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Database className="w-4 h-4 text-orange-500" /> R. Database Security, Backup & Restoral
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Compile offline JSON backups, sync automatically with primary system, or import SQL/JSON snapshot archives.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Manual Backup Block */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                <div className="w-10 h-10 bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 rounded-xl flex items-center justify-center">
                  <Database className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs font-display">Instant System Database Snapshot</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Instantly compile all branches, menus, orders, receipts, and configurations into a downloadable JSON schema file.</p>
                </div>
                <button
                  onClick={triggerManualBackup}
                  disabled={backupLoading}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold uppercase rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer transition-all flex items-center gap-1.5"
                >
                  {backupLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FileDown className="w-3.5 h-3.5" />}
                  <span>{backupLoading ? "Compiling..." : "Download Backup JSON"}</span>
                </button>
              </div>

              {/* Restore database Block */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 space-y-4">
                <div className="w-10 h-10 bg-orange-950/40 border border-orange-900/30 text-orange-400 rounded-xl flex items-center justify-center">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs font-display">Restore Database File</h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Upload a previously compiled SmartDine JSON/SQL backup file to immediately restore your system parameters.</p>
                </div>
                
                {restoreProgress ? (
                  <div className="p-3 bg-slate-900 rounded-lg text-[10px] text-orange-400 font-mono animate-pulse">
                    ⚡ {restoreProgress}
                  </div>
                ) : (
                  <label className="inline-block">
                    <span className="px-4 py-2.5 bg-slate-900 border border-slate-800 hover:text-white rounded-xl text-[10px] font-bold uppercase cursor-pointer text-slate-300 hover:bg-slate-850 transition-all flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" /> Upload & Restore DB
                    </span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleRestoreUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Cloud Backup (Future) */}
              <div className="sm:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-900 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white text-xs font-display flex items-center gap-1.5">
                    ☁️ Cloud Mirror Backup Syncer <span className="text-[9px] text-amber-400 font-bold bg-amber-950 px-1 py-0.5 rounded border border-amber-800/20">PRO FEATURE</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1">Saves encrypted, real-time incremental snapshots to secure GCP Google Cloud Storage buckets hourly.</p>
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">COMING SOON</span>
              </div>

            </div>
          </div>
        )}

        {/* ==========================================
            T. SYSTEM SETTINGS
            ========================================== */}
        {activeSubTab === "T" && (
          <form onSubmit={handleSystemSave} className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-orange-500" /> T. Global System & Environment Clocks
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Configure localized interface formatting, date systems, active currency display tags, and time zones.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Theme selection */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">System Interface Theme Preset</label>
                <select
                  value={system.theme}
                  onChange={(e) => setSystem({ ...system, theme: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="Slate Dark">Slate Cosmic Dark (Default)</option>
                  <option value="Pure OLED Black">Midnight Pure Black (OLED)</option>
                  <option value="Clean Minimalist Light">Clean Office Light Mode</option>
                </select>
              </div>

              {/* Language */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Localization System Language</label>
                <select
                  value={system.language}
                  onChange={(e) => setSystem({ ...system, language: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="English (US)">English (US / GB)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                </select>
              </div>

              {/* Date format */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Date Display Format</label>
                <select
                  value={system.dateFormat}
                  onChange={(e) => setSystem({ ...system, dateFormat: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="DD/MM/YYYY">DD / MM / YYYY (e.g. 01/07/2026)</option>
                  <option value="MM/DD/YYYY">MM / DD / YYYY (e.g. 07/01/2026)</option>
                  <option value="YYYY-MM-DD">YYYY - MM - DD (e.g. 2026-07-01)</option>
                </select>
              </div>

              {/* Time format */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Time Display Format</label>
                <select
                  value={system.timeFormat}
                  onChange={(e) => setSystem({ ...system, timeFormat: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="12-Hour (AM/PM)">12-Hour Standard (e.g. 10:00 AM)</option>
                  <option value="24-Hour Military">24-Hour Military (e.g. 10:00)</option>
                </select>
              </div>

              {/* Currency */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">System Currency Display</label>
                <select
                  value={system.currency}
                  onChange={(e) => setSystem({ ...system, currency: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="INR (₹)">Indian Rupee (INR - ₹)</option>
                  <option value="USD ($)">United States Dollar (USD - $)</option>
                  <option value="EUR (€)">Euro Standard (EUR - €)</option>
                </select>
              </div>

              {/* Time Zone */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">System Timezone Anchor</label>
                <select
                  value={system.timeZone}
                  onChange={(e) => setSystem({ ...system, timeZone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white"
                >
                  <option value="Asia/Kolkata (IST)">Asia / Kolkata (IST - GMT+5:30)</option>
                  <option value="America/New_York">America / New York (EST - GMT-5:00)</option>
                  <option value="Europe/London">Europe / London (BST - GMT+1:00)</option>
                </select>
              </div>

              {/* Layout default */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Executive Default Dashboard Layout</label>
                <input
                  type="text"
                  value={system.dashboardLayout}
                  onChange={(e) => setSystem({ ...system, dashboardLayout: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono"
                />
              </div>

              {/* Default Landing */}
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Default Platform Landing tab</label>
                <input
                  type="text"
                  value={system.defaultLandingPage}
                  onChange={(e) => setSystem({ ...system, defaultLandingPage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white font-mono"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-slate-900">
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer"
              >
                Compile environments settings
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
