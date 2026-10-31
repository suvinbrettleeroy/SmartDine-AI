import React, { useState } from "react";
import { ShieldCheck, Plus, Edit } from "lucide-react";
import { MenuItem } from "../types";

interface AdminMenuProps {
  state: {
    menu: MenuItem[];
  };
  handleDeleteDish: (id: string) => Promise<void>;
  handleAddDish: (e: React.FormEvent) => Promise<void>;
  newDish: {
    name: string;
    category: string;
    price: number;
    description: string;
    isVeg: boolean;
    isBestSeller: boolean;
    nutrition: string;
    allergens: string;
  };
  setNewDish: React.Dispatch<React.SetStateAction<{
    name: string;
    category: string;
    price: number;
    description: string;
    isVeg: boolean;
    isBestSeller: boolean;
    nutrition: string;
    allergens: string;
  }>>;
  fetchState: () => Promise<void>;
}

export default function AdminMenu({
  state,
  handleDeleteDish,
  handleAddDish,
  newDish,
  setNewDish,
  fetchState
}: AdminMenuProps) {
  const [editingDishId, setEditingDishId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    category: string;
    price: number;
    description: string;
    isVeg: boolean;
    isBestSeller: boolean;
    nutrition: string;
    allergens: string;
  }>({
    name: "",
    category: "Breakfast",
    price: 100,
    description: "",
    isVeg: true,
    isBestSeller: false,
    nutrition: "",
    allergens: ""
  });

  const startEditing = (dish: MenuItem) => {
    setEditingDishId(dish.id);
    setEditForm({
      name: dish.name,
      category: dish.category,
      price: dish.price,
      description: dish.description,
      isVeg: dish.isVeg,
      isBestSeller: dish.isBestSeller || false,
      nutrition: dish.nutrition || "",
      allergens: dish.allergens || ""
    });
  };

  const cancelEditing = () => {
    setEditingDishId(null);
  };

  const handleUpdateDishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDishId) return;

    try {
      const res = await fetch(`/api/menu/${editingDishId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm)
      });
      if (res.ok) {
        setEditingDishId(null);
        alert(`✏️ Successfully updated dish details!`);
        await fetchState();
      } else {
        alert("Failed to update dish on the server database.");
      }
    } catch (err) {
      console.error("Error updating dish:", err);
    }
  };

  return (
    <div id="admin-menu-section" className="grid grid-cols-1 xl:grid-cols-12 gap-4 font-sans">
      {/* Left Column: Manage Digital Menu Catalog */}
      <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-slate-300" />
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white font-sans">
              Global Digital Menu Catalog Configuration
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {state.menu.length} Items Listed
          </span>
        </div>

        {/* Table-based high density list of all menu items */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-1">ID</th>
                <th className="py-2 px-1">Name</th>
                <th className="py-2 px-1">Category</th>
                <th className="py-2 px-1">Price</th>
                <th className="py-2 px-1 text-center">Type</th>
                <th className="py-2 px-1 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.menu.map((dish) => (
                <tr key={dish.id} className="border-b border-slate-850 hover:bg-slate-950/40 text-slate-300">
                  <td className="py-2.5 px-1 font-mono text-slate-500 text-[10px]">{dish.id}</td>
                  <td className="py-2.5 px-1 font-sans font-bold text-white">{dish.name}</td>
                  <td className="py-2.5 px-1 font-sans">
                    <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-400">
                      {dish.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-1 font-mono text-emerald-400 font-bold">₹{dish.price}</td>
                  <td className="py-2.5 px-1 text-center font-sans">
                    {dish.isVeg ? (
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/40 px-1.5 py-0.5 rounded font-bold">VEG</span>
                    ) : (
                      <span className="text-[9px] bg-rose-950 text-rose-400 border border-rose-800/40 px-1.5 py-0.5 rounded font-bold">NON-VEG</span>
                    )}
                  </td>
                  <td className="py-2.5 px-1 text-right font-sans">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => startEditing(dish)}
                        className="text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer hover:bg-indigo-950/25 px-2 py-1 rounded text-[10px] transition-all flex items-center gap-0.5"
                      >
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDish(dish.id)}
                        className="text-rose-400 hover:text-rose-300 font-bold cursor-pointer hover:bg-rose-950/25 px-2 py-1 rounded text-[10px] transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: Publish/Edit Dish Form */}
      <div className="xl:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md text-xs">
        <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-tight text-white flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-emerald-400" />
            {editingDishId ? "Edit Digital Menu Item" : "Add Dish to Menu"}
          </h3>
          {editingDishId && (
            <button
              onClick={cancelEditing}
              className="text-[10px] font-mono text-rose-400 hover:underline uppercase font-bold"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={editingDishId ? handleUpdateDishSubmit : handleAddDish} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Dish Name *</label>
            <input
              type="text"
              required
              placeholder="e.g., Paneer Butter Masala"
              value={editingDishId ? editForm.name : newDish.name}
              onChange={(e) => {
                if (editingDishId) {
                  setEditForm({ ...editForm, name: e.target.value });
                } else {
                  setNewDish({ ...newDish, name: e.target.value });
                }
              }}
              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Category</label>
              <select
                value={editingDishId ? editForm.category : newDish.category}
                onChange={(e) => {
                  if (editingDishId) {
                    setEditForm({ ...editForm, category: e.target.value });
                  } else {
                    setNewDish({ ...newDish, category: e.target.value });
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Beverages">Beverages</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Price (₹) *</label>
              <input
                type="number"
                required
                min={1}
                value={editingDishId ? editForm.price : newDish.price}
                onChange={(e) => {
                  const val = parseFloat(e.target.value) || 0;
                  if (editingDishId) {
                    setEditForm({ ...editForm, price: val });
                  } else {
                    setNewDish({ ...newDish, price: val });
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 py-1">
            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 border border-slate-800 p-2 rounded hover:bg-slate-900 text-[10px] text-slate-300">
              <input
                type="checkbox"
                checked={editingDishId ? editForm.isVeg : newDish.isVeg}
                onChange={(e) => {
                  const val = e.target.checked;
                  if (editingDishId) {
                    setEditForm({ ...editForm, isVeg: val });
                  } else {
                    setNewDish({ ...newDish, isVeg: val });
                  }
                }}
                className="rounded text-emerald-600 focus:ring-0 bg-slate-900 border-slate-700"
              />
              <span>100% Vegetarian</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer bg-slate-950 border border-slate-800 p-2 rounded hover:bg-slate-900 text-[10px] text-slate-300">
              <input
                type="checkbox"
                checked={editingDishId ? editForm.isBestSeller : newDish.isBestSeller}
                onChange={(e) => {
                  const val = e.target.checked;
                  if (editingDishId) {
                    setEditForm({ ...editForm, isBestSeller: val });
                  } else {
                    setNewDish({ ...newDish, isBestSeller: val });
                  }
                }}
                className="rounded text-orange-600 focus:ring-0 bg-slate-900 border-slate-700"
              />
              <span>Best Seller Badge</span>
            </label>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Nutrition Facts</label>
            <input
              type="text"
              placeholder="e.g., Cal: 310, Protein: 12g, Fat: 8g"
              value={editingDishId ? editForm.nutrition : newDish.nutrition}
              onChange={(e) => {
                const val = e.target.value;
                if (editingDishId) {
                  setEditForm({ ...editForm, nutrition: val });
                } else {
                  setNewDish({ ...newDish, nutrition: val });
                }
              }}
              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Allergens</label>
            <input
              type="text"
              placeholder="e.g., Dairy, Wheat, Nuts, None"
              value={editingDishId ? editForm.allergens : newDish.allergens}
              onChange={(e) => {
                const val = e.target.value;
                if (editingDishId) {
                  setEditForm({ ...editForm, allergens: val });
                } else {
                  setNewDish({ ...newDish, allergens: val });
                }
              }}
              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Short Description *</label>
            <textarea
              required
              placeholder="Organic grain combinations, low-sodium soy sauce glazed with garlic."
              rows={2}
              value={editingDishId ? editForm.description : newDish.description}
              onChange={(e) => {
                const val = e.target.value;
                if (editingDishId) {
                  setEditForm({ ...editForm, description: val });
                } else {
                  setNewDish({ ...newDish, description: val });
                }
              }}
              className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] resize-none focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase transition-all tracking-wide cursor-pointer font-sans"
          >
            {editingDishId ? "Update Dish Details" : "Publish to Digital Menu"}
          </button>
        </form>
      </div>
    </div>
  );
}
