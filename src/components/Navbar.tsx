"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  LayoutDashboard,
  CalendarDays,
  Users,
  CreditCard,
  Truck,
  RotateCcw,
  Clock,
} from "lucide-react";
import { useNexus } from "@/context/NexusContext";

export function Navbar() {
  const pathname = usePathname();
  const { resetAllData } = useNexus();

  const navLinks = [
    { href: "/", label: "Command Center", icon: LayoutDashboard },
    { href: "/roster", label: "Roster Shift", icon: CalendarDays },
    { href: "/employees", label: "Karyawan & Cuti", icon: Users },
    { href: "/payroll", label: "Payroll & Lembur", icon: CreditCard },
    { href: "/fleet", label: "Armada & Aset", icon: Truck },
  ];

  return (
    <nav className="h-16 border-b border-slate-800/80 bg-[#080d19] px-6 flex items-center justify-between select-none sticky top-0 z-50">
      {/* Brand Identity */}
      <Link href="/" className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-black text-sm text-white tracking-wider font-mono">
              NEXUS <span className="text-cyan-400">SHIFTOPS</span>
            </h1>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono font-bold">
              ENTERPRISE ERP
            </span>
          </div>
          <p className="text-[10px] text-slate-400">Workforce Roster, Automated Payroll & Fleet OS</p>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden lg:flex items-center gap-1 bg-[#0f172a] border border-slate-800 p-1 rounded-xl text-xs">
        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                isActive
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Right Controls: Shift Indicator & Reset */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-[#10182b] border border-slate-800 px-3 py-1.5 rounded-xl font-mono text-xs">
          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span className="text-slate-300">Shift Aktif: <strong className="text-cyan-400">SIANG (15:00 - 23:00)</strong></span>
        </div>

        <button
          onClick={resetAllData}
          title="Reset Database Nexus ke Seed Awal"
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
