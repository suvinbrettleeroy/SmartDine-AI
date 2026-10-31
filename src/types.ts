export interface MenuItem {
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

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: "available" | "occupied" | "reserved";
  assignedWaiterId: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customerName: string;
  tableNumber: number | null;
  type: "dine-in" | "delivery" | "pickup";
  status: "pending" | "preparing" | "ready-for-pickup" | "out-of-delivery" | "delivered";
  cookingStatus: "queued" | "cooking" | "completed";
  waiterId: string | null;
  deliveryPartnerId: string | null;
  deliveryOtp: string | null;
  totalPrice: number;
  gst: number;
  deliveryCharge: number;
  paymentMethod: string;
  couponCode: string | null;
  timestamp: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  partySize: number;
  tableId: string;
  status: "confirmed" | "cancelled" | "attended";
  qrCode: string;
  dietaryPreference: string;
  loyaltyPointsEarned: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  lowStockAlertLimit: number;
  expiryDate?: string;
  supplier?: string;
  waste: number;
  costPerUnit?: number;
  unit?: string;
}

export interface Staff {
  id: string;
  name?: string;
  nameWaiter?: string;
  role: "Chef" | "Waiter" | "Delivery" | "Manager" | "Admin";
  attendance: "Present" | "Absent";
  salary: number;
  shift: "Morning" | "Evening" | "Night";
  performanceRating: number;
  profileImage?: string;
  phone?: string;
  details?: string;
  vehicle?: string;
}

export interface Feedback {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  sentiment: "positive" | "neutral" | "negative";
  aiResponse: string;
}

export interface AutomationLog {
  id: string;
  type: "WhatsApp" | "Email";
  trigger: string;
  target: string;
  message: string;
  status: string;
  timestamp: string;
}

export interface WaiterAssignment {
  id: string;
  name: string;
  tableIds: string[];
}
