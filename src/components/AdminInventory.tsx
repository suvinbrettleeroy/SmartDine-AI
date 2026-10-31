import React, { useState } from "react";
import { Activity, Sparkles, Plus, AlertTriangle, Edit, Trash2 } from "lucide-react";
import { MenuItem, InventoryItem } from "../types";

interface AdminInventoryProps {
  state: {
    menu: MenuItem[];
    inventory: InventoryItem[];
    dishRecipes?: Record<string, { inventoryId: string; quantity: number }[]>;
  };
  handleUpdateInventory: (id: string, stock?: number, waste?: number) => Promise<void>;
  handleCreateIngredient: (e: React.FormEvent) => Promise<void>;
  handleSaveRecipeLink: (dishName: string, ingredients: { inventoryId: string; quantity: number }[]) => Promise<void>;
  newIngredient: { name: string; stock: number; unit: string; lowStockAlertLimit: number; costPerUnit: number };
  setNewIngredient: React.Dispatch<React.SetStateAction<{ name: string; stock: number; unit: string; lowStockAlertLimit: number; costPerUnit: number }>>;
  recipeDishName: string;
  setRecipeDishName: React.Dispatch<React.SetStateAction<string>>;
  currentLinkIng: string;
  setCurrentLinkIng: React.Dispatch<React.SetStateAction<string>>;
  currentLinkQty: number;
  setCurrentLinkQty: React.Dispatch<React.SetStateAction<number>>;
  inventoryRestockQty: Record<string, number>;
  setInventoryRestockQty: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  inventoryWasteQty: Record<string, number>;
  setInventoryWasteQty: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  fetchState: () => Promise<void>;
}

export default function AdminInventory({
  state,
  handleUpdateInventory,
  handleCreateIngredient,
  handleSaveRecipeLink,
  newIngredient,
  setNewIngredient,
  recipeDishName,
  setRecipeDishName,
  currentLinkIng,
  setCurrentLinkIng,
  currentLinkQty,
  setCurrentLinkQty,
  inventoryRestockQty,
  setInventoryRestockQty,
  inventoryWasteQty,
  setInventoryWasteQty,
  fetchState
}: AdminInventoryProps) {
  const [editingIngId, setEditingIngId] = useState<string | null>(null);
  const [editIngForm, setEditIngForm] = useState<{
    name: string;
    stock: number;
    unit: string;
    lowStockAlertLimit: number;
    costPerUnit: number;
  }>({
    name: "",
    stock: 0,
    unit: "kg",
    lowStockAlertLimit: 10,
    costPerUnit: 100
  });

  const startEditing = (item: InventoryItem) => {
    setEditingIngId(item.id);
    setEditIngForm({
      name: item.name,
      stock: item.stock,
      unit: item.unit || "kg",
      lowStockAlertLimit: item.lowStockAlertLimit || 10,
      costPerUnit: item.costPerUnit || 50
    });
  };

  const cancelEditing = () => {
    setEditingIngId(null);
  };

  const handleUpdateIngredientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIngId) return;

    try {
      const res = await fetch(`/api/inventory/${editingIngId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editIngForm)
      });
      if (res.ok) {
        setEditingIngId(null);
        alert(`✏️ Successfully updated ingredient details!`);
        await fetchState();
      } else {
        alert("Failed to update ingredient on the server.");
      }
    } catch (err) {
      console.error("Error updating ingredient:", err);
    }
  };

  const handleDeleteIngredient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this ingredient? This will also unlink any recipes associated with it.")) return;
    try {
      const res = await fetch(`/api/inventory/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("🗑️ Ingredient successfully deleted!");
        await fetchState();
      } else {
        alert("Failed to delete ingredient.");
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div id="admin-inventory-section" className="grid grid-cols-1 xl:grid-cols-12 gap-4">
      {/* Left Column: Ingredients telemetry & list */}
      <div className="xl:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-400" />
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white font-sans">
              Kitchen Ingredients & Stock Telemetry
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {state.inventory.length} Raw Materials Tracked
          </span>
        </div>

        {/* Inventory cards metric summary bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Low Stock Alerts</span>
            <span className="text-lg font-mono font-bold text-rose-500 mt-1 block">
              {state.inventory.filter(i => i.stock <= i.lowStockAlertLimit).length} items
            </span>
          </div>
          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Total Valuation</span>
            <span className="text-lg font-mono font-bold text-emerald-400 mt-1 block">
              ₹{(state.inventory.reduce((sum, i) => sum + (i.stock * (i.costPerUnit || 50)), 0)).toLocaleString()}
            </span>
          </div>
          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Wastage Logged</span>
            <span className="text-lg font-mono font-bold text-orange-400 mt-1 block">
              {state.inventory.reduce((sum, i) => sum + (i.waste || 0), 0)} kg / L
            </span>
          </div>
          <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl text-center">
            <span className="text-[9px] text-slate-500 uppercase font-bold block">Active Recipes</span>
            <span className="text-lg font-mono font-bold text-indigo-400 mt-1 block">
              {Object.keys(state.dishRecipes || {}).length} Dishes Linked
            </span>
          </div>
        </div>

        {/* List of raw kitchen ingredients */}
        <div className="space-y-3">
          {state.inventory.map((item) => {
            const isLow = item.stock <= item.lowStockAlertLimit;
            const restockVal = inventoryRestockQty[item.id] !== undefined ? inventoryRestockQty[item.id] : 10;
            const wasteVal = inventoryWasteQty[item.id] !== undefined ? inventoryWasteQty[item.id] : 2;
            
            // Find which dishes use this ingredient in state.dishRecipes
            const linkedDishes = Object.entries(state.dishRecipes || {}).filter(([_, ingredients]) => {
              return ingredients.some(ing => ing.inventoryId === item.id);
            }).map(([dishName, ingredients]) => {
              const matchIng = ingredients.find(ing => ing.inventoryId === item.id);
              return { dishName, quantity: matchIng ? matchIng.quantity : 0 };
            });

            return (
              <div key={item.id} className="bg-slate-950/65 border border-slate-850 rounded-xl p-3.5 space-y-3 hover:border-slate-800 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                      <span className={isLow ? "text-rose-500 animate-pulse" : "text-emerald-500"}>●</span>
                      {item.name}
                      {isLow && (
                        <span className="text-[8px] uppercase font-mono px-1.5 py-0.5 bg-rose-950 text-rose-400 rounded border border-rose-800/40">
                          CRITICAL REORDER
                        </span>
                      )}
                    </h4>
                    <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
                      Cost: ₹{item.costPerUnit || 50}/{item.unit || "kg"} | Low threshold: {item.lowStockAlertLimit} {item.unit || "kg"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 block">Available Stock</span>
                      <strong className={`text-sm font-mono ${isLow ? "text-rose-400" : "text-emerald-400"}`}>
                        {item.stock} {item.unit || "kg"}
                      </strong>
                    </div>
                    <div className="text-right border-l border-slate-800 pl-3">
                      <span className="text-[9px] text-slate-400 block">Wastage Logged</span>
                      <strong className="text-sm font-mono text-orange-400 block">
                        {item.waste || 0} {item.unit || "kg"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Custom stock progress bar */}
                <div className="space-y-1">
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${isLow ? "bg-gradient-to-r from-red-600 to-orange-500" : "bg-gradient-to-r from-emerald-600 to-teal-500"}`}
                      style={{ width: `${Math.min(100, (item.stock / 150) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] font-mono text-slate-500">
                    <span>0 {item.unit || "kg"}</span>
                    <span>Target: 150 {item.unit || "kg"}</span>
                  </div>
                </div>

                {/* Linked Dishes Expand panel */}
                <div className="bg-slate-950/90 border border-slate-900 rounded-lg p-2.5 text-[10px] font-mono">
                  <span className="text-slate-400 font-bold block mb-1">🔗 Associated Dishes & Usage Recipes:</span>
                  {linkedDishes.length === 0 ? (
                    <span className="text-slate-500 italic block">No dishes linked to this ingredient. Use recipe linker!</span>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-300">
                      {linkedDishes.map((ld, index) => (
                        <div key={index} className="flex justify-between border-b border-slate-900 pb-0.5">
                          <span>{ld.dishName}</span>
                          <span className="text-indigo-400 font-bold">Uses {ld.quantity} {item.unit || "kg"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action bar for stock adjustments & editing */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  {/* Quick restock input */}
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={restockVal}
                      onChange={(e) => setInventoryRestockQty({ ...inventoryRestockQty, [item.id]: parseFloat(e.target.value) || 0 })}
                      className="w-14 bg-slate-950 border border-slate-800 p-1 rounded font-mono text-[10px] text-white focus:outline-none"
                    />
                    <button
                      onClick={async () => {
                        await handleUpdateInventory(item.id, item.stock + restockVal, undefined);
                        alert(`Restocked ${restockVal} ${item.unit || 'kg'} of ${item.name}!`);
                      }}
                      className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded text-[9px] font-bold font-mono transition-all cursor-pointer"
                    >
                      + RESTOCK
                    </button>
                  </div>

                  {/* Log spoilage / waste input */}
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={wasteVal}
                      onChange={(e) => setInventoryWasteQty({ ...inventoryWasteQty, [item.id]: parseFloat(e.target.value) || 0 })}
                      className="w-14 bg-slate-950 border border-slate-800 p-1 rounded font-mono text-[10px] text-white focus:outline-none"
                    />
                    <button
                      onClick={async () => {
                        await handleUpdateInventory(item.id, undefined, wasteVal);
                        alert(`Logged ${wasteVal} ${item.unit || 'kg'} of spoilage/waste for ${item.name}.`);
                      }}
                      className="px-2.5 py-1 bg-orange-600/30 hover:bg-orange-600 text-orange-300 hover:text-white rounded text-[9px] font-bold font-mono transition-all cursor-pointer"
                    >
                      ⚠️ LOG WASTE
                    </button>
                  </div>

                  {/* Edit / Delete actions */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => startEditing(item)}
                      className="p-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded transition-all cursor-pointer"
                      title="Edit ingredient properties"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteIngredient(item.id)}
                      className="p-1 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white rounded transition-all cursor-pointer"
                      title="Delete ingredient"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Recipe Link & New Ingredient publishing */}
      <div className="xl:col-span-4 space-y-4">
        {/* 1. Form to Link Ingredient to Dish */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
          <div className="border-b border-slate-800 pb-2">
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white flex items-center gap-1.5 font-sans">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Link Ingredient to Recipe
            </h3>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (!recipeDishName || !currentLinkIng) {
              alert("Please select dish and ingredient.");
              return;
            }
            const currentRecipe = state.dishRecipes?.[recipeDishName] || [];
            const existIndex = currentRecipe.findIndex(ing => ing.inventoryId === currentLinkIng);
            let updatedIngredients = [...currentRecipe];
            if (existIndex >= 0) {
              updatedIngredients[existIndex].quantity = currentLinkQty;
            } else {
              updatedIngredients.push({ inventoryId: currentLinkIng, quantity: currentLinkQty });
            }
            handleSaveRecipeLink(recipeDishName, updatedIngredients);
          }} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Select Dish *</label>
              <select
                value={recipeDishName}
                onChange={(e) => setRecipeDishName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none"
              >
                <option value="">-- Choose Menu Item --</option>
                {state.menu.map(m => (
                  <option key={m.id} value={m.name}>{m.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Raw Material *</label>
                <select
                  value={currentLinkIng}
                  onChange={(e) => setCurrentLinkIng(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none"
                >
                  <option value="">-- Choose Material --</option>
                  {state.inventory.map(i => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Qty (kg / L) *</label>
                <input
                  type="number"
                  step={0.001}
                  min={0.001}
                  value={currentLinkQty}
                  onChange={(e) => setCurrentLinkQty(parseFloat(e.target.value) || 0.1)}
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold uppercase transition-all tracking-wide cursor-pointer font-sans"
            >
              Save Recipe Link
            </button>
          </form>
        </div>

        {/* 2. Form to Create / Edit Raw Ingredient */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 shadow-md">
          <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-tight text-white flex items-center gap-1.5 font-sans">
              <Plus className="w-4 h-4 text-emerald-400" />
              {editingIngId ? "Edit Raw Ingredient" : "Add Raw Ingredient"}
            </h3>
            {editingIngId && (
              <button
                onClick={cancelEditing}
                className="text-[10px] font-mono text-rose-400 hover:underline uppercase font-bold"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={editingIngId ? handleUpdateIngredientSubmit : handleCreateIngredient} className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Ingredient Name *</label>
              <input
                type="text"
                required
                placeholder="e.g., Shredded Mozzarella"
                value={editingIngId ? editIngForm.name : newIngredient.name}
                onChange={(e) => {
                  if (editingIngId) {
                    setEditIngForm({ ...editIngForm, name: e.target.value });
                  } else {
                    setNewIngredient({ ...newIngredient, name: e.target.value });
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Stock Qty *</label>
                <input
                  type="number"
                  required
                  value={editingIngId ? editIngForm.stock : newIngredient.stock}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    if (editingIngId) {
                      setEditIngForm({ ...editIngForm, stock: val });
                    } else {
                      setNewIngredient({ ...newIngredient, stock: val });
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Unit *</label>
                <select
                  value={editingIngId ? editIngForm.unit : newIngredient.unit}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (editingIngId) {
                      setEditIngForm({ ...editIngForm, unit: val });
                    } else {
                      setNewIngredient({ ...newIngredient, unit: val });
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none"
                >
                  <option value="kg">kg</option>
                  <option value="Litre">Litre</option>
                  <option value="pcs">pcs</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Alert Limit *</label>
                <input
                  type="number"
                  required
                  value={editingIngId ? editIngForm.lowStockAlertLimit : newIngredient.lowStockAlertLimit}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    if (editingIngId) {
                      setEditIngForm({ ...editIngForm, lowStockAlertLimit: val });
                    } else {
                      setNewIngredient({ ...newIngredient, lowStockAlertLimit: val });
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Cost Per Unit *</label>
                <input
                  type="number"
                  required
                  value={editingIngId ? editIngForm.costPerUnit : newIngredient.costPerUnit}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    if (editingIngId) {
                      setEditIngForm({ ...editIngForm, costPerUnit: val });
                    } else {
                      setNewIngredient({ ...newIngredient, costPerUnit: val });
                    }
                  }}
                  className="w-full bg-slate-950 border border-slate-800 p-2 rounded text-white text-[11px] focus:outline-none font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold uppercase transition-all tracking-wide cursor-pointer font-sans"
            >
              {editingIngId ? "Update Ingredient" : "Add Ingredient"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
