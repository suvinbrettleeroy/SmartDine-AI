import React from "react";
import { Sparkles, Send } from "lucide-react";

interface AdminAIProps {
  aiHistory: { role: string; text: string }[];
  aiLoading: boolean;
  aiMessage: string;
  setAiMessage: React.Dispatch<React.SetStateAction<string>>;
  askAIAssistant: (presetMsg?: string) => Promise<void>;
}

export default function AdminAI({
  aiHistory,
  aiLoading,
  aiMessage,
  setAiMessage,
  askAIAssistant
}: AdminAIProps) {
  return (
    <div id="admin-ai-chatbot-desk" className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col h-[520px] shadow-md font-sans">
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 shrink-0">
        <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
        <div>
          <h3 className="text-xs font-extrabold uppercase tracking-tight text-white leading-none">
            Sara AI Restaurant Intelligence Desk
          </h3>
          <span className="text-[8px] text-slate-500 font-mono block mt-1">OPERATIONAL CONTROLLER MODEL ACTIVE</span>
        </div>
      </div>

      {/* AI History messages box */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 font-sans text-xs bg-slate-950/65 rounded-xl border border-slate-850 my-3">
        {aiHistory.map((h, i) => (
          <div key={i} className={`flex gap-2.5 ${h.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
              h.role === "user" ? "bg-slate-700 text-white font-sans" : "bg-gradient-to-tr from-emerald-500 to-indigo-600 text-white font-mono"
            }`}>
              {h.role === "user" ? "U" : "AI"}
            </div>
            <div className={`p-3 rounded-xl border max-w-[85%] whitespace-pre-line leading-relaxed ${
              h.role === "user"
                ? "bg-slate-800 border-slate-700 text-slate-100 rounded-tr-none"
                : "bg-slate-950 border-slate-850 text-slate-200 rounded-tl-none font-mono"
            }`}>
              {h.text}
            </div>
          </div>
        ))}
        {aiLoading && (
          <div className="flex items-center gap-2 text-slate-500 italic text-[10px] animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
            <span>Sara AI is compiling restaurant data metrics...</span>
          </div>
        )}
      </div>

      {/* Template prompt injection blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 shrink-0 mb-3">
        <button
          onClick={() => askAIAssistant("How can we optimize fresh vegetables usage with recipes to minimize waste cost?")}
          className="px-2 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[9px] text-indigo-300 rounded font-mono truncate text-left cursor-pointer"
        >
          🥗 "Optimize vegetable waste"
        </button>
        <button
          onClick={() => askAIAssistant("Which dishes are currently under-linked to the kitchen inventory, and how can we map paneer or rice recipes?")}
          className="px-2 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[9px] text-indigo-300 rounded font-mono truncate text-left cursor-pointer"
        >
          🔗 "Check recipe linkage gaps"
        </button>
        <button
          onClick={() => askAIAssistant("Analyze our staff roster and shifts to suggest if labor expenses are aligned with our daily revenue trend.")}
          className="px-2 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[9px] text-indigo-300 rounded font-mono truncate text-left cursor-pointer"
        >
          💰 "Analyze labor vs revenue"
        </button>
        <button
          onClick={() => askAIAssistant("Generate an automated checklist to prevent low-stock item shortages before dinner peak rush hour.")}
          className="px-2 py-1.5 bg-slate-950 hover:bg-slate-850 border border-slate-850 text-[9px] text-indigo-300 rounded font-mono truncate text-left cursor-pointer"
        >
          ⚡ "Prevent dinner shortages"
        </button>
      </div>

      {/* Interactive query field */}
      <div className="flex gap-2 shrink-0">
        <input
          type="text"
          placeholder="Ask Sara AI anything about your dishes, ingredients, sales, billing, or staff..."
          value={aiMessage}
          onChange={(e) => setAiMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") askAIAssistant(); }}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
        />
        <button
          onClick={() => askAIAssistant()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
        >
          <Send className="w-3.5 h-3.5" />
          <span>SEND</span>
        </button>
      </div>
    </div>
  );
}
