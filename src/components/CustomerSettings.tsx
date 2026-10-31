import React, { useState } from "react";
import {
  User,
  Key,
  ShieldCheck,
  Eye,
  Globe,
  Sliders,
  MapPin,
  Bell,
  Lock,
  Sparkles,
  Accessibility,
  Crown,
  Gift,
  HelpCircle,
  Info,
  LogOut,
  Trash2,
  Plus,
  Edit2,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  Download,
  AlertTriangle,
  Heart,
  MessageSquare,
  ShieldAlert,
  Terminal,
  Activity,
  Cpu,
  Bookmark
} from "lucide-react";

interface Address {
  id: string;
  tag: string;
  title: string;
  text: string;
}

interface CustomerSettingsProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    location: string;
    address: string;
    additionalAddresses: Address[];
  };
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  setCustomerName: (name: string) => void;
  points: number;
  setRole: (role: string) => void;
  setActiveTab: (tab: string) => void;
  customerTheme?: "dark" | "light";
  setCustomerTheme?: (theme: "dark" | "light") => void;
}

export default function CustomerSettings({
  profile,
  setProfile,
  setCustomerName,
  points,
  setRole,
  setActiveTab,
  customerTheme,
  setCustomerTheme
}: CustomerSettingsProps) {
  // Navigation categories
  const categories = [
    { id: "A", name: "Account Settings", icon: User },
    { id: "B", name: "Personal Preferences", icon: Sliders },
    { id: "C", name: "Address Management", icon: MapPin },
    { id: "D", name: "Notification Settings", icon: Bell },
    { id: "E", name: "Privacy & Security", icon: Lock },
    { id: "F", name: "AI Preferences", icon: Sparkles },
    { id: "G", name: "Accessibility", icon: Accessibility },
    { id: "H", name: "Loyalty & Rewards", icon: Crown },
    { id: "I", name: "Support & Bugs", icon: HelpCircle },
    { id: "J", name: "About & Legal", icon: Info }
  ];

  const [activeSubTab, setActiveSubTab] = useState("A");

  // Local/Temporary States for Interactive Settings
  // A. Account
  const [tempName, setTempName] = useState(profile.name);
  const [tempEmail, setTempEmail] = useState(profile.email);
  const [tempPhone, setTempPhone] = useState(profile.phone);
  const [tempPic, setTempPic] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // B. Preferences
  const [language, setLanguage] = useState("English");
  const [themeModeLocal, setThemeModeLocal] = useState<"dark" | "light">(customerTheme || "dark");
  const themeMode = customerTheme || themeModeLocal;
  const setThemeMode = (mode: "dark" | "light") => {
    setThemeModeLocal(mode);
    if (setCustomerTheme) {
      setCustomerTheme(mode);
    }
  };
  const [fontSize, setFontSize] = useState("Default");
  const [defaultHomeLoc, setDefaultHomeLoc] = useState(profile.location);
  const [defaultRestView, setDefaultRestView] = useState("List View");
  const [prefCategories, setPrefCategories] = useState<string[]>(["Breakfast", "Dinner"]);
  const [favCuisine, setFavCuisine] = useState("South Indian");
  const [dietaryPref, setDietaryPref] = useState("Non-Vegetarian");

  // C. Address Manager Modal / States
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [newAddressTag, setNewAddressTag] = useState("HOME");
  const [newAddressTitle, setNewAddressTitle] = useState("");
  const [newAddressText, setNewAddressText] = useState("");

  // D. Notification States
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    reservationUpdates: true,
    promotionalOffers: false,
    aiRecommendations: true,
    birthdayWishes: true,
    feedbackRequests: true
  });

  // E. Privacy & Security
  const [devices, setDevices] = useState([
    { id: 1, name: "Chrome on macOS (Current Device)", location: "Chennai, India", ip: "192.168.1.101", active: true },
    { id: 2, name: "SmartDine Mobile App (iPhone 15)", location: "Adyar, India", ip: "103.45.2.89", active: false }
  ]);
  const [loginHistory, setLoginHistory] = useState([
    { id: 1, date: "2026-07-01 09:12", device: "Chrome (macOS)", status: "Successful Session" },
    { id: 2, date: "2026-06-30 18:44", device: "Mobile App (iOS)", status: "Successful Session" },
    { id: 3, date: "2026-06-29 11:20", device: "Safari (macOS)", status: "Completed Log out" }
  ]);
  const [cookiePref, setCookiePref] = useState({ essential: true, analytical: true, marketing: false });

  // F. AI Preferences
  const [aiPrefs, setAiPrefs] = useState({
    enableAssistant: true,
    voiceAssistant: false,
    personalizedRecs: true,
    allergyAlerts: true,
    nutritionSuggestions: true,
    saveHistory: true
  });

  // G. Accessibility
  const [accessibility, setAccessibility] = useState({
    highContrast: false,
    largeText: false,
    voiceNavigation: false,
    screenReader: false,
    reduceAnimations: false
  });

  // H. Loyalty
  const [copiedReferral, setCopiedReferral] = useState(false);
  const referralCode = "SMARTDINE77GOLD";
  const rewardHistory = [
    { id: "tx-101", task: "Dine-in Order #SD920", points: "+150 Pts", date: "2026-06-30" },
    { id: "tx-102", task: "Table Reservation #RES49", points: "+50 Pts", date: "2026-06-28" },
    { id: "tx-103", task: "Referral Bonus (Aravind)", points: "+500 Pts", date: "2026-06-25" }
  ];

  // I. Support
  const [complaintText, setComplaintText] = useState("");
  const [bugText, setBugText] = useState("");
  const [supportMessage, setSupportMessage] = useState<string | null>(null);
  const [faqSearch, setFaqSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    { q: "How are loyalty points calculated?", a: "You earn 10 points for every ₹100 spent on Dine-In or Delivery. Table reservations earn a flat 50 points." },
    { q: "Can I cancel a pending table reservation?", a: "Yes, you can cancel any reservation up to 1 hour before the scheduled time through the Reservations portal." },
    { q: "Does the AI assistant analyze food allergies?", a: "Absolutely! Our SmartDine AI analyzes ingredients, allergens, and nutritional profiles based on your inputs." },
    { q: "How can I top up my digital wallet?", a: "Go to the Wallet tab, click Top Up, and complete the instant secure UPI or card payment." }
  ];

  // Handler functions
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile((prev: any) => ({
      ...prev,
      name: tempName,
      email: tempEmail,
      phone: tempPhone
    }));
    setCustomerName(tempName);
    showSuccessToast("Profile settings updated successfully!");
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      showErrorToast("Please fill all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      showErrorToast("New passwords do not match.");
      return;
    }
    showSuccessToast("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const showSuccessToast = (msg: string) => {
    setSupportMessage(msg);
    setTimeout(() => setSupportMessage(null), 4000);
  };

  const showErrorToast = (msg: string) => {
    alert("⚠️ " + msg);
  };

  // Address CRUD
  const handleAddOrEditAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddressTitle || !newAddressText) return;

    if (editingAddressId) {
      // Edit mode
      setProfile((prev: any) => ({
        ...prev,
        additionalAddresses: prev.additionalAddresses.map((addr: Address) =>
          addr.id === editingAddressId
            ? { ...addr, tag: newAddressTag, title: newAddressTitle, text: newAddressText }
            : addr
        )
      }));
      showSuccessToast("Address updated successfully!");
    } else {
      // Create mode
      const newAddr: Address = {
        id: "addr-" + Date.now(),
        tag: newAddressTag,
        title: newAddressTitle,
        text: newAddressText
      };
      setProfile((prev: any) => ({
        ...prev,
        additionalAddresses: [...prev.additionalAddresses, newAddr]
      }));
      showSuccessToast("New address added successfully!");
    }

    // Reset Address inputs
    setShowAddressModal(false);
    setEditingAddressId(null);
    setNewAddressTitle("");
    setNewAddressText("");
  };

  const handleDeleteAddress = (id: string) => {
    setProfile((prev: any) => ({
      ...prev,
      additionalAddresses: prev.additionalAddresses.filter((addr: Address) => addr.id !== id)
    }));
    showSuccessToast("Address deleted successfully!");
  };

  const handleSetDefaultAddress = (text: string) => {
    setProfile((prev: any) => ({
      ...prev,
      address: text
    }));
    showSuccessToast("Default delivery address updated!");
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleDownloadData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ profile, notifications, aiPrefs, accessibility, points }));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `smartdine_personal_data_${profile.name.replace(/\s+/g, "_")}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showSuccessToast("Personal raw data archive dispatched for download!");
  };

  const handleRaiseComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintText.trim()) return;
    showSuccessToast(`Ticket raised: Complaint logged into our support queue. We'll reply within 2 hours.`);
    setComplaintText("");
  };

  const handleReportBug = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bugText.trim()) return;
    showSuccessToast(`Bug report submitted successfully! Developers have received the diagnostic telemetry.`);
    setBugText("");
  };

  return (
    <div id="customer-settings-container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-16 font-sans">
      
      {/* Toast Alert Banner */}
      {supportMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-emerald-500/30 animate-bounce">
          <Check className="w-4 h-4 shrink-0" />
          <span className="text-xs font-bold font-mono">{supportMessage}</span>
        </div>
      )}

      {/* Profile/Welcome Widget Header */}
      <div className="lg:col-span-12 bg-gradient-to-r from-[#0d1424] via-[#090d16] to-[#120f26] border border-slate-800 p-5 rounded-3xl flex flex-wrap items-center justify-between gap-5 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer">
            <img
              src={tempPic}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-orange-500 object-cover shadow-lg"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-[9px] text-white font-bold font-mono uppercase text-center leading-tight">Change<br/>Pic</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-white tracking-tight leading-none font-display">{profile.name}</h2>
              <span className="text-[9px] bg-amber-950/60 border border-amber-800/40 text-amber-500 px-1.5 py-0.5 rounded font-mono font-bold uppercase">GOLD TIER</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">{profile.email} • {profile.phone}</p>
            <span className="text-[10px] text-slate-500 font-mono block mt-1">🌍 Current Area: <strong className="text-slate-300">{profile.location}</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3 text-right">
            <span className="text-[9px] text-slate-400 uppercase tracking-wider font-mono block">Loyalty Reward points</span>
            <span className="text-lg font-black font-mono text-amber-400">{points.toLocaleString()} <span className="text-xs font-normal text-slate-500">Pts</span></span>
          </div>
          <button 
            onClick={() => setRole("admin")} 
            className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white rounded-xl text-[10px] font-bold text-slate-300 uppercase transition-all cursor-pointer"
          >
            Switch to Admin
          </button>
        </div>
      </div>

      {/* Categories Left Navigation */}
      <div className="lg:col-span-3 space-y-1.5">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold block px-2 mb-2">Settings Sections</span>
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

      {/* Main Settings Dynamic Pane */}
      <div className="lg:col-span-9 bg-[#090d16] border border-slate-800/80 rounded-3xl p-6 shadow-xl min-h-[500px]">

        {/* =======================================================
            SECTION A: ACCOUNT SETTINGS
            ======================================================= */}
        {activeSubTab === "A" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-500" /> A. Profile & Account Settings
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Configure your primary contact information, change avatars, password, and manage account lifetime.</p>
            </div>

            {/* Profile Information Subform */}
            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Profile Avatar Image Selection</label>
                <div className="flex gap-3 items-center flex-wrap pt-1">
                  {[
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80",
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&auto=format&fit=crop&q=80"
                  ].map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTempPic(url)}
                      className={`w-11 h-11 rounded-full border-2 overflow-hidden transition-all relative cursor-pointer ${
                        tempPic === url ? "border-orange-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={url} alt="Option" className="w-full h-full object-cover" />
                      {tempPic === url && (
                        <div className="absolute inset-0 bg-orange-600/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white stroke-[4]" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Full Name *</label>
                <input
                  type="text"
                  required
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Email Address *</label>
                <input
                  type="email"
                  required
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="space-y-1 md:col-span-2">
                <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={tempPhone}
                  onChange={(e) => setTempPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-white text-xs focus:outline-none focus:border-orange-500 font-semibold"
                />
              </div>

              <div className="md:col-span-2 pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white text-xs font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>

            {/* Change Password Form */}
            <div className="pt-6 border-t border-slate-900 space-y-4">
              <h4 className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest font-mono">Change Account Password</h4>
              <form onSubmit={handleUpdatePassword} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-bold font-mono">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-bold font-mono">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 uppercase font-bold font-mono">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-2 rounded-lg text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="sm:col-span-3 pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white rounded-xl text-[10px] font-bold text-slate-300 uppercase transition-all cursor-pointer"
                  >
                    Change Security Password
                  </button>
                </div>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="pt-6 border-t border-slate-900 flex justify-between items-center gap-4">
              <div>
                <h4 className="text-[10px] text-white font-extrabold uppercase font-mono flex items-center gap-1">
                  🔒 Two-Factor Authentication <span className="text-[9px] text-indigo-400 font-bold bg-indigo-950 px-1 py-0.5 rounded border border-indigo-800/20">FUTURE</span>
                </h4>
                <p className="text-[10px] text-slate-400 mt-1">Enhance safety: authenticate with a secure OTP code on your registered device upon logging in.</p>
              </div>
              <button
                onClick={() => {
                  setTwoFactor(!twoFactor);
                  showSuccessToast(twoFactor ? "Two-factor protection disabled" : "Secure two-factor validation mock activated!");
                }}
                className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[9px] font-mono border transition-all cursor-pointer ${
                  twoFactor
                    ? "bg-indigo-950 border-indigo-500/30 text-indigo-400"
                    : "bg-slate-950 border-slate-800 text-slate-500"
                }`}
              >
                {twoFactor ? "● Enabled" : "○ Disabled"}
              </button>
            </div>

            {/* LifeCycle & Destruction buttons */}
            <div className="pt-6 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Deactivate */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 space-y-3">
                <span className="text-xl">⏸️</span>
                <h4 className="text-xs font-bold text-white font-display">Deactivate Account</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">Temporary sleep. Your profile, wallet balance, and favorites will be locked and hidden safely until you return and log in again.</p>
                <button
                  onClick={() => setShowDeactivateConfirm(true)}
                  className="px-3 py-1.5 bg-yellow-950/40 text-yellow-500 border border-yellow-900/30 hover:bg-yellow-900/10 rounded-xl text-[9px] font-bold uppercase cursor-pointer"
                >
                  Deactivate Temporarily
                </button>
              </div>

              {/* Delete */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 space-y-3">
                <span className="text-xl">🛑</span>
                <h4 className="text-xs font-bold text-rose-400 font-display">Delete Account Permanent</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed">Irreversible action. Wipes out your order histories, logs, loyalty milestones, unclaimed vouchers, and deletes your registration from SmartDine AI.</p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-3 py-1.5 bg-rose-950/40 text-rose-500 border border-rose-900/30 hover:bg-rose-900/10 rounded-xl text-[9px] font-bold uppercase cursor-pointer"
                >
                  Permanently Delete My Data
                </button>
              </div>
            </div>

            {/* Deactivate confirmation modal */}
            {showDeactivateConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4">
                  <h4 className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                    ⚠️ Deactivate Your Account?
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">Your data will remain safely cached but dormant. Your sessions will expire instantly. Re-log in anytime to auto-wake.</p>
                  <div className="flex justify-end gap-2 text-[10px] font-mono">
                    <button onClick={() => setShowDeactivateConfirm(false)} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded uppercase">Cancel</button>
                    <button onClick={() => { setShowDeactivateConfirm(false); alert("Account deactivated successfully!"); setRole("admin"); }} className="px-3 py-1.5 bg-yellow-600 text-white rounded uppercase">Yes, Deactivate</button>
                  </div>
                </div>
              </div>
            )}

            {/* Delete confirmation modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4">
                  <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                    🚨 CRITICAL: Destroy Your Account?
                  </h4>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">All active cashback, points, histories, and receipts will be instantly purged. This cannot be undone.</p>
                  <div className="flex justify-end gap-2 text-[10px] font-mono">
                    <button onClick={() => setShowDeleteConfirm(false)} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded uppercase">Cancel</button>
                    <button onClick={() => { setShowDeleteConfirm(false); alert("Your account has been deleted."); setRole("admin"); }} className="px-3 py-1.5 bg-rose-600 text-white rounded uppercase">Yes, Purge Everything</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            SECTION B: PERSONAL PREFERENCES
            ======================================================= */}
        {activeSubTab === "B" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-orange-500" /> B. Personal Preferences
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Fine-tune your browsing system interface languages, UI contrast, dietary tags, and primary search modes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
              
              {/* Preferred Language */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🌐</span>
                <h4 className="text-xs font-bold text-white font-display">Preferred Language</h4>
                <div className="flex gap-2 pt-1 font-mono text-[10px]">
                  {["English", "Tamil"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        language === lang
                          ? "bg-orange-600 border-orange-500 text-white font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Settings */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🌓</span>
                <h4 className="text-xs font-bold text-white font-display">Dark / Light Mode</h4>
                <div className="flex gap-2 pt-1 font-mono text-[10px]">
                  {(["dark", "light"] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setThemeMode(mode);
                        showSuccessToast(`Switched interface to ${mode} mode!`);
                      }}
                      className={`px-3 py-1.5 rounded-lg border uppercase transition-all cursor-pointer ${
                        themeMode === mode
                          ? "bg-orange-600 border-orange-500 text-white font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🔤</span>
                <h4 className="text-xs font-bold text-white font-display">App Font Size</h4>
                <div className="flex gap-2 pt-1 font-mono text-[10px]">
                  {["Small", "Default", "Large"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFontSize(size)}
                      className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        fontSize === size
                          ? "bg-orange-600 border-orange-500 text-white font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Default Location Area */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🏡</span>
                <h4 className="text-xs font-bold text-white font-display">Default Home Location</h4>
                <input
                  type="text"
                  value={defaultHomeLoc}
                  onChange={(e) => {
                    setDefaultHomeLoc(e.target.value);
                    setProfile(prev => ({ ...prev, location: e.target.value }));
                  }}
                  className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Restaurant View Preference */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🗺️</span>
                <h4 className="text-xs font-bold text-white font-display">Default Restaurant View</h4>
                <div className="flex gap-2 pt-1 font-mono text-[10px]">
                  {["List View", "Bento Grid View", "Map Locations"].map((view) => (
                    <button
                      key={view}
                      onClick={() => setDefaultRestView(view)}
                      className={`px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        defaultRestView === view
                          ? "bg-orange-600 border-orange-500 text-white font-bold"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fav Cuisine */}
              <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-900">
                <span className="text-lg">🍲</span>
                <h4 className="text-xs font-bold text-white font-display">Favorite Cuisine</h4>
                <select
                  value={favCuisine}
                  onChange={(e) => setFavCuisine(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-200 focus:outline-none"
                >
                  <option value="South Indian">South Indian Delicacies</option>
                  <option value="North Indian">North Indian Tandoor</option>
                  <option value="Continental">Continental Gourmet</option>
                  <option value="Italian Pizza">Italian Wood-fire</option>
                </select>
              </div>

              {/* Dietary Preferences Checkboxes */}
              <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-900 md:col-span-2">
                <span className="text-lg">🥗</span>
                <h4 className="text-xs font-bold text-white font-display">Dietary Preference Profile</h4>
                <p className="text-[10px] text-slate-400 leading-none">SmartDine AI filters out potential dishes based on this safety tag.</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Vegetarian", "Non-Vegetarian", "Vegan", "Jain", "Gluten-Free"].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setDietaryPref(tag)}
                      className={`px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer flex items-center gap-1.5 ${
                        dietaryPref === tag
                          ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white border-emerald-500"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span>{tag}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =======================================================
            SECTION C: ADDRESS MANAGEMENT
            ======================================================= */}
        {activeSubTab === "C" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-850 pb-3 flex-wrap gap-2">
              <div>
                <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-500" /> C. Address Management
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Add, update, or remove coordinates to lock-in rapid courier shipping routes.</p>
              </div>
              <button
                onClick={() => {
                  setEditingAddressId(null);
                  setNewAddressTag("HOME");
                  setNewAddressTitle("");
                  setNewAddressText("");
                  setShowAddressModal(true);
                }}
                className="px-3 py-1.5 bg-orange-600 hover:bg-orange-500 text-white text-[10px] font-bold uppercase rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Address
              </button>
            </div>

            {/* Default Primary Target Row */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-orange-500/20 shadow-md space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="inline-flex items-center gap-1 text-[9px] bg-orange-950/80 text-orange-400 border border-orange-800/40 px-2 py-0.5 rounded font-mono font-bold uppercase">
                  🎯 Default Delivery Target Address
                </span>
              </div>
              <p className="text-xs text-white font-semibold pt-1 font-mono">
                {profile.address || "No primary target address configured."}
              </p>
              <span className="text-[9px] text-slate-500 block leading-none">This address receives active checkout delivery orders by default.</span>
            </div>

            {/* Saved Sub Addresses Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.additionalAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-slate-950 border border-slate-900 rounded-2xl p-4.5 space-y-3.5 relative flex flex-col justify-between hover:border-slate-800 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-mono font-black border px-2 py-0.5 rounded ${
                        addr.tag === "HOME" ? "bg-emerald-950/40 border-emerald-900/30 text-emerald-400" :
                        addr.tag === "WORK" ? "bg-indigo-950/40 border-indigo-900/30 text-indigo-400" :
                        "bg-slate-900 border-slate-800 text-slate-400"
                      }`}>
                        {addr.tag}
                      </span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => {
                            setEditingAddressId(addr.id);
                            setNewAddressTag(addr.tag);
                            setNewAddressTitle(addr.title);
                            setNewAddressText(addr.text);
                            setShowAddressModal(true);
                          }}
                          className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
                          title="Edit Address"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete Address"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-white mt-2 font-display">{addr.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed pt-1 font-mono">{addr.text}</p>
                  </div>

                  <button
                    onClick={() => handleSetDefaultAddress(addr.text)}
                    className={`w-full py-1.5 rounded-xl text-[9px] font-bold uppercase transition-all cursor-pointer font-mono border ${
                      profile.address === addr.text
                        ? "bg-slate-900 border-slate-800 text-slate-500 cursor-default"
                        : "bg-orange-600/10 border-orange-500/20 text-orange-400 hover:bg-orange-600/20"
                    }`}
                    disabled={profile.address === addr.text}
                  >
                    {profile.address === addr.text ? "✓ Current Default" : "Set As Default"}
                  </button>
                </div>
              ))}
            </div>

            {/* Address Edit/Add Modal Overlay */}
            {showAddressModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <form onSubmit={handleAddOrEditAddress} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
                  <div className="border-b border-slate-800 pb-2.5">
                    <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                      {editingAddressId ? "✏️ Edit Saved Address" : "🏠 Add New saved Address"}
                    </h4>
                  </div>

                  <div className="space-y-3.5 text-xs text-slate-300">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Location Tag</label>
                      <div className="grid grid-cols-3 gap-1">
                        {["HOME", "WORK", "OTHER"].map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setNewAddressTag(t)}
                            className={`py-1.5 rounded font-bold text-[9px] font-mono uppercase cursor-pointer ${
                              newAddressTag === t ? "bg-orange-600 text-white" : "bg-slate-950 border border-slate-800 text-slate-500"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Address Label/Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. My Beach House"
                        value={newAddressTitle}
                        onChange={(e) => setNewAddressTitle(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-bold font-mono">Full Postal Street Address *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Plot No, Street, Landmark, Area, PinCode..."
                        value={newAddressText}
                        onChange={(e) => setNewAddressText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-1 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(false)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-orange-600 text-white rounded uppercase cursor-pointer"
                    >
                      {editingAddressId ? "Save Edit" : "Add Address"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* =======================================================
            SECTION D: NOTIFICATION SETTINGS
            ======================================================= */}
        {activeSubTab === "D" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-orange-500" /> D. Notification Settings
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Opt-in or mute alerts, emails, push triggers, and promotional newsletter feeds.</p>
            </div>

            <div className="space-y-3">
              {[
                { key: "orderUpdates", label: "📦 Live Order tracking updates", desc: "Sms and Push alarms regarding chef progress, rider pickups, delivery ETA." },
                { key: "reservationUpdates", label: "🗓️ Reservation confirmations", desc: "Confirmations, reminders 1hr prior, and QR code access codes." },
                { key: "promotionalOffers", label: "🔥 Exclusive promotional deals & vouchers", desc: "Flash sales, weekend discounts, and limited food coupons." },
                { key: "aiRecommendations", label: "🤖 AI Smart Diet suggestions & updates", desc: "Alerts when dishes matching your custom macros/allergens are published." },
                { key: "birthdayWishes", label: "🎂 Annual Birthday exclusive gifts", desc: "Get specialized discount codes and free desserts on your birthday." },
                { key: "feedbackRequests", label: "⭐ Service Feedback Surveys", desc: "Empower us to grow: review surveys and local dine-in reviews." }
              ].map((item) => (
                <div key={item.key} className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex items-center justify-between gap-4">
                  <div className="max-w-md">
                    <h4 className="text-xs font-bold text-white leading-tight">{item.label}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      const updated = !notifications[item.key as keyof typeof notifications];
                      setNotifications({ ...notifications, [item.key]: updated });
                      showSuccessToast(`${updated ? "Enabled" : "Muted"} notification category!`);
                    }}
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

        {/* =======================================================
            SECTION E: PRIVACY & SECURITY
            ======================================================= */}
        {activeSubTab === "E" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-orange-500" /> E. Privacy & Security
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Review active logged-in containers, audit historical sessions, customize cookies, and export raw data.</p>
            </div>

            {/* Active Devices */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest font-mono">Active Login Devices</h4>
                <button
                  onClick={() => {
                    setDevices(devices.filter(d => d.active));
                    showSuccessToast("Terminated all secondary sessions successfully.");
                  }}
                  className="text-[9px] font-mono font-bold text-rose-500 border border-rose-950 bg-rose-950/10 px-2 py-1 rounded-md hover:bg-rose-900/10 cursor-pointer"
                >
                  Logout from All Devices
                </button>
              </div>

              <div className="space-y-2">
                {devices.map((dev) => (
                  <div key={dev.id} className="bg-slate-950 p-3.5 rounded-2xl border border-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{dev.active ? "💻" : "📱"}</span>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white leading-none">
                          <span>{dev.name}</span>
                          {dev.active && <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-1 py-0.5 rounded font-mono">CURRENT</span>}
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-1">{dev.location} • IP: {dev.ip}</span>
                      </div>
                    </div>
                    {!dev.active && (
                      <button
                        onClick={() => {
                          setDevices(devices.filter(d => d.id !== dev.id));
                          showSuccessToast(`Device ${dev.name} disconnected!`);
                        }}
                        className="text-[9px] font-mono text-slate-400 hover:text-rose-400 cursor-pointer"
                      >
                        Disconnect
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Login History */}
            <div className="pt-6 border-t border-slate-900 space-y-3">
              <h4 className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest font-mono">Recent Login History Logs</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500">
                      <th className="py-2">Timestamp</th>
                      <th className="py-2">Client Device</th>
                      <th className="py-2 text-right">Result status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loginHistory.map((hist) => (
                      <tr key={hist.id} className="border-b border-slate-900/60 text-slate-400">
                        <td className="py-2 font-bold text-slate-300">{hist.date}</td>
                        <td className="py-2">{hist.device}</td>
                        <td className="py-2 text-right text-emerald-500 font-bold">{hist.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Data Portability */}
            <div className="pt-6 border-t border-slate-900 space-y-3.5">
              <h4 className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest font-mono">GDPR Data Portability & Rights</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">Under GDPR regulation, you have the right to request a download file of all personal telemetry, ordering stats, and settings we store, or command an instant scrub of your details.</p>
              
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-[9px] font-bold">
                <button
                  onClick={handleDownloadData}
                  className="px-3.5 py-2 bg-[#0e1423] hover:bg-slate-900 border border-slate-800 text-indigo-400 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download Personal JSON Archive
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you absolutely sure you want to request complete personal data erasure? All history will be purged.")) {
                      alert("PURGE ACTION FILED. Our staff will scrub your data within 24 hours.");
                    }
                  }}
                  className="px-3.5 py-2 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-900/30 text-rose-400 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Wipe Personal Data History
                </button>
              </div>
            </div>

            {/* Cookie Preferences */}
            <div className="pt-6 border-t border-slate-900 space-y-3">
              <h4 className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest font-mono">Cookie Preferences</h4>
              <div className="space-y-2.5">
                {[
                  { key: "essential", label: "Essential Session Cookies", desc: "Required to hold active cart lists, table bills, and authentication.", critical: true },
                  { key: "analytical", label: "Performance & Analytics Cookies", desc: "Aggregated performance metrics that feed our AI peak occupancy projections.", critical: false },
                  { key: "marketing", label: "Smart Marketing Vouchers Tracking", desc: "Cookies which customize display banners and push personalized meals.", critical: false }
                ].map((cookie) => (
                  <div key={cookie.key} className="bg-[#03050a] p-3 rounded-xl border border-slate-900 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{cookie.label}</span>
                        {cookie.critical && <span className="text-[8px] bg-indigo-950/85 text-indigo-400 border border-indigo-900/30 px-1 py-0.5 rounded font-bold uppercase font-mono">MANDATORY</span>}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">{cookie.desc}</p>
                    </div>
                    {!cookie.critical ? (
                      <button
                        onClick={() => {
                          const updated = !cookiePref[cookie.key as keyof typeof cookiePref];
                          setCookiePref({ ...cookiePref, [cookie.key]: updated });
                          showSuccessToast(`Saved cookie choice: ${cookie.label}`);
                        }}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                          cookiePref[cookie.key as keyof typeof cookiePref] ? "bg-orange-600" : "bg-slate-800"
                        }`}
                      >
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                          cookiePref[cookie.key as keyof typeof cookiePref] ? "translate-x-5" : "translate-x-0"
                        }`} />
                      </button>
                    ) : (
                      <span className="text-slate-400 font-mono text-[10px] pr-2 font-bold">✓ Active</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            SECTION F: AI PREFERENCES
            ======================================================= */}
        {activeSubTab === "F" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" /> F. SmartDine AI Preferences
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Configure parameters that shape the personality, responses, and constraints of your AI Dining Assistant.</p>
            </div>

            <div className="space-y-3">
              {[
                { key: "enableAssistant", label: "Enable SmartDine AI Assistant (Sara)", desc: "Activate local chatbot panels and recommendations engines." },
                { key: "voiceAssistant", label: "AI Voice Assistant Synthesis", desc: "Allow Sara to synthesize oral text-to-speech feedback (Future)." },
                { key: "personalizedRecs", label: "Smart Personalized Recommendations", desc: "Allow AI to analyze previous orders and push dishes tailored to taste." },
                { key: "allergyAlerts", label: "Automated Ingredient Allergy Alerts", desc: "Triggers loud warnings if a meal matches chosen allergen metrics." },
                { key: "nutritionSuggestions", label: "Active Calories / Macronutrients suggestions", desc: "AI logs total daily fat/protein intake directly on checkout screen." },
                { key: "saveHistory", label: "Save Chat Conversation History", desc: "Saves chat logs to secure cloud servers to retain context across logins." }
              ].map((item) => (
                <div key={item.key} className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex items-center justify-between gap-4">
                  <div className="max-w-md">
                    <h4 className="text-xs font-bold text-white leading-tight">{item.label}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      const updated = !aiPrefs[item.key as keyof typeof aiPrefs];
                      setAiPrefs({ ...aiPrefs, [item.key]: updated });
                      showSuccessToast(`${updated ? "Enabled" : "Disabled"} AI feature parameter!`);
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                      aiPrefs[item.key as keyof typeof aiPrefs] ? "bg-indigo-600" : "bg-slate-800"
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                      aiPrefs[item.key as keyof typeof aiPrefs] ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================
            SECTION G: ACCESSIBILITY
            ======================================================= */}
        {activeSubTab === "G" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Accessibility className="w-4 h-4 text-orange-500" /> G. Accessibility Controls
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Make our food menus and ordering panels navigable for users with distinct sensory needs.</p>
            </div>

            <div className="space-y-3">
              {[
                { key: "highContrast", label: "Contrast booster (High Contrast Mode)", desc: "Switches slate backgrounds to pitch solid blacks for supreme visibility." },
                { key: "largeText", label: "Enlarged Text Layout", desc: "Forces UI heading scales upward by 25% for high-density reading." },
                { key: "voiceNavigation", label: "Interactive Voice Navigation", desc: "Navigate menu items, select tables, and checkout via custom speech prompts." },
                { key: "screenReader", label: "Optimized Screen Reader Support", desc: "Expose rich aria-labels and descriptive text for assistive technology." },
                { key: "reduceAnimations", label: "Reduce CSS/Framer Animations", desc: "Stops sliding sheets and bouncy badges to aid vestibular processing." }
              ].map((item) => (
                <div key={item.key} className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex items-center justify-between gap-4">
                  <div className="max-w-md">
                    <h4 className="text-xs font-bold text-white leading-tight">{item.label}</h4>
                    <p className="text-[10px] text-slate-500 leading-normal mt-0.5">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      const updated = !accessibility[item.key as keyof typeof accessibility];
                      setAccessibility({ ...accessibility, [item.key]: updated });
                      showSuccessToast(`${updated ? "Activated" : "Deactivated"} accessibility parameter!`);
                    }}
                    className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer shrink-0 ${
                      accessibility[item.key as keyof typeof accessibility] ? "bg-orange-600" : "bg-slate-800"
                    }`}
                  >
                    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                      accessibility[item.key as keyof typeof accessibility] ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================
            SECTION H: LOYALTY & REWARDS
            ======================================================= */}
        {activeSubTab === "H" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-500 fill-amber-500/20" /> H. Loyalty & Rewards Panel
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Audit active loyalty tiers, referral bonuses, points ledger, and claim cashback codes.</p>
            </div>

            {/* Membership Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="bg-gradient-to-br from-amber-950/80 to-slate-950 border border-amber-800/20 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between h-44">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-amber-500 bg-amber-950 px-2 py-0.5 rounded font-extrabold">MEMBERSHIP STATUS</span>
                    <Crown className="w-6 h-6 text-amber-400 fill-amber-400/20" />
                  </div>
                  <h4 className="text-sm font-black text-white font-display mt-2">Gold Club Member</h4>
                  <p className="text-[10px] text-slate-300 mt-1">Enjoy flat 15% discount on all table bookings & free unlimited delivery.</p>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  Total Active Balance: <strong className="text-amber-400">{points} Pts</strong>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>
              </div>

              {/* Referral details */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-900 flex flex-col justify-between h-44">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5 font-display">
                    <Gift className="w-4 h-4 text-orange-500" /> Share & Earn ₹500
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Send your code to a friend. Once they complete their first ₹500 dining bill, you both get 500 Loyalty points!</p>
                </div>
                
                {/* Copy box */}
                <div className="flex gap-2 items-center bg-slate-900 border border-slate-850 p-2 rounded-xl mt-2 font-mono text-xs">
                  <span className="text-white font-bold flex-1">{referralCode}</span>
                  <button
                    onClick={handleCopyReferral}
                    className="px-2.5 py-1 bg-orange-600 hover:bg-orange-500 text-white rounded text-[10px] font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    {copiedReferral ? "Copied" : "Copy"}
                  </button>
                </div>
                <span className="text-[9px] text-emerald-400 font-mono font-semibold text-right block leading-none">Total Earned: ₹5,400</span>
              </div>

            </div>

            {/* Reward Points ledger */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest font-mono">Rewards Transaction Ledger</h4>
              <div className="overflow-x-auto bg-[#03050a] rounded-xl border border-slate-900">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="border-b border-slate-850 text-slate-500">
                      <th className="py-2.5 px-3">Transaction ID</th>
                      <th className="py-2 px-3">Completed Task</th>
                      <th className="py-2 px-3">Points Gained</th>
                      <th className="py-2.5 px-3 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rewardHistory.map((tx) => (
                      <tr key={tx.id} className="border-b border-slate-900 text-slate-300">
                        <td className="py-2 px-3 font-bold text-slate-400">{tx.id}</td>
                        <td className="py-2 px-3">{tx.task}</td>
                        <td className="py-2 px-3 text-amber-400 font-extrabold">{tx.points}</td>
                        <td className="py-2 px-3 text-right text-slate-500">{tx.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* =======================================================
            SECTION I: SUPPORT
            ======================================================= */}
        {activeSubTab === "I" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-orange-500" /> I. Help Center & Support Logs
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Get immediate answers, submit feedback tickets, or file diagnostic bug files directly to development.</p>
            </div>

            {/* Frequently Asked Questions */}
            <div className="space-y-3 bg-slate-950 p-4.5 rounded-2xl border border-slate-900">
              <div className="flex items-center justify-between border-b border-slate-900 pb-2 flex-wrap gap-2">
                <h4 className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest font-mono">SmartDine Knowledge Base FAQ</h4>
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="bg-slate-900 border border-slate-850 rounded px-2.5 py-1 text-[10px] text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-2">
                {faqs
                  .filter(faq => faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || faq.a.toLowerCase().includes(faqSearch.toLowerCase()))
                  .map((faq, index) => (
                    <div key={index} className="border-b border-slate-900/60 pb-2 last:border-0 last:pb-0">
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full flex justify-between items-center text-xs font-bold text-white text-left cursor-pointer hover:text-orange-400 pt-1"
                      >
                        <span>{faq.q}</span>
                        {expandedFaq === index ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
                      </button>
                      {expandedFaq === index && (
                        <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5 pl-1 pr-4">{faq.a}</p>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Raise Complaint Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <form onSubmit={handleRaiseComplaint} className="bg-slate-950 p-4.5 rounded-2xl border border-slate-900 space-y-3">
                <span className="text-xl">🎫</span>
                <h4 className="text-xs font-bold text-white font-display">Raise Support Complaint</h4>
                <p className="text-[10px] text-slate-400">Order issues, double billing or food delay? File a direct complaint ticket.</p>
                <textarea
                  required
                  rows={3}
                  value={complaintText}
                  onChange={(e) => setComplaintText(e.target.value)}
                  placeholder="Describe your issue in detail (e.g., Order #SD123 had cold food)..."
                  className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs text-white resize-none focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[10px] font-bold uppercase transition-all cursor-pointer"
                >
                  Submit Complaint Ticket
                </button>
              </form>

              {/* Bug Tracker Form */}
              <form onSubmit={handleReportBug} className="bg-slate-950 p-4.5 rounded-2xl border border-slate-900 space-y-3">
                <span className="text-xl">🐞</span>
                <h4 className="text-xs font-bold text-white font-display">Submit Bug Report</h4>
                <p className="text-[10px] text-slate-400">Encountered an interface lag or a rendering error? Send diagnostics to our engineering branch.</p>
                <textarea
                  required
                  rows={3}
                  value={bugText}
                  onChange={(e) => setBugText(e.target.value)}
                  placeholder="e.g. Tab lag on Addresses subpage inside Chrome macOS..."
                  className="w-full bg-slate-900 border border-slate-850 p-2.5 rounded-xl text-xs text-white resize-none focus:outline-none focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-850 hover:text-white rounded-xl text-[10px] font-bold text-slate-300 uppercase transition-all cursor-pointer"
                >
                  File Tech Bug Report
                </button>
              </form>

            </div>
          </div>
        )}

        {/* =======================================================
            SECTION J: ABOUT & LEGAL
            ======================================================= */}
        {activeSubTab === "J" && (
          <div className="space-y-6">
            <div className="border-b border-slate-850 pb-3">
              <h3 className="text-xs font-extrabold uppercase text-white font-display flex items-center gap-1.5">
                <Info className="w-4 h-4 text-orange-500" /> J. About & App Version Info
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Review legal terms, refund agreements, version telemetry, and safely sign out of active session.</p>
            </div>

            {/* Version Telemetry */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 flex justify-between items-center font-mono text-[10px] text-slate-400">
              <div className="space-y-1">
                <div>Environment: <strong className="text-indigo-400">Cloud Sandbox Dev</strong></div>
                <div>Engine: <strong className="text-white">React 18 + Vite SPA</strong></div>
              </div>
              <div className="text-right space-y-1">
                <div>Client Build: <strong className="text-white">v2.4.1-Stable</strong></div>
                <div>Latest Update: <strong className="text-emerald-400">2026-07-01</strong></div>
              </div>
            </div>

            {/* Accordion Documents */}
            <div className="space-y-2 bg-slate-950 p-4.5 rounded-2xl border border-slate-900 text-xs">
              {[
                { title: "📄 Terms & Conditions Agreement", text: "By dining with SmartDine AI, you agree that your telemetry, table reservations, and dietary filters are managed by server proxies to ensure chef metrics are optimized. Coupon codes are subject to seat availability." },
                { title: "🔒 Privacy & Cookies Policy", text: "We prioritize user privacy. All data, passwords, and billing logs are fully sandboxed. No credit details are permanently cached inside standard cookie headers. GDPR portability is fully operational." },
                { title: "💸 Settle Refund & Cancellation Policy", text: "Prepaid wallet balances can be fully refunded upon written demand within 7 business days. Delivery orders cannot be cancelled once cooking status transitions to 'Preparing' on the Chef Console." }
              ].map((doc, idx) => (
                <div key={idx} className="border-b border-slate-900 last:border-0 pb-2 pt-1">
                  <h4 className="font-bold text-white flex items-center gap-2 mb-1">
                    {doc.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-sans">{doc.text}</p>
                </div>
              ))}
            </div>

            {/* Log Out Button */}
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => {
                  if (confirm("Sign out of current active Customer Portal session?")) {
                    alert("Logged out successfully.");
                    setRole("admin");
                  }
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-mono text-[10px] font-bold uppercase rounded-xl shadow-lg shadow-rose-600/10 cursor-pointer flex items-center gap-1.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Safely Sign Out of Session</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
