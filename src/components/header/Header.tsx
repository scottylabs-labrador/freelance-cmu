// src/components/header/Header.tsx

import { useContext } from "react";
import { authContext } from "../../AuthContext";

export default function Header() {
  const auth = useContext(authContext);

  if (!auth) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
          F
        </div>
        <span className="text-xl font-bold text-slate-900">FreelanceHub</span>
      </div>

      {/* Right: Icon buttons */}
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition">
          🔔
        </button>
        <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition">
          👤
        </button>
      </div>
    </header>
  );
}
