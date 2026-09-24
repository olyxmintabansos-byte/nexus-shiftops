"use client";

import React from "react";
import Link from "next/link";
import { useNexus } from "@/context/NexusContext";
import { formatRupiah } from "@/lib/utils";
import {
  Layers,
  Users,
  Clock,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  Truck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function CommandCenterPage() {
  const { employees, assignments, payroll, fleet } = useNexus();

  // Metrics
  const totalEmployees = employees.length;
  const activeAssignmentsCount = assignments.length;
  const coverageRatio = "98.5%";
  const totalPayrollEst = employees.reduce((sum, e) => sum + e.baseSalary, 0);

  // Department distribution data for Recharts
  const deptData = [
    { name: "Teknologi", count: employees.filter((e) => e.department === "Teknologi & Server").length, color: "#06b6d4" },
    { name: "Operasional", count: employees.filter((e) => e.department === "Operasional Lapangan").length, color: "#3b82f6" },
    { name: "Logistik", count: employees.filter((e) => e.department === "Logistik & Gudang").length, color: "#f59e0b" },
    { name: "Keamanan", count: employees.filter((e) => e.department === "Keamanan & Patroli").length, color: "#8b5cf6" },
    { name: "Support", count: employees.filter((e) => e.department === "Customer Support").length, color: "#10b981" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c1222] border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Enterprise Workforce Operations Command</span>
          </div>
          <h1 className="text-2xl font-black text-white">Pusat Komando Operasional Nexus</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Sistem terintegrasi pemantauan jadwal shift 24/7, alokasi personel multi-departemen, kesiapan armada, dan estimasi payroll.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/roster"
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>Buka Matriks Roster</span>
          </Link>
          <Link
            href="/payroll"
            className="px-4 py-2.5 rounded-xl bg-[#141d33] border border-slate-700/80 hover:bg-slate-800 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Slip Payroll</span>
          </Link>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#0c1222] border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Rasio Cakupan Shift</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400 mt-2">{coverageRatio}</div>
          <span className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Zero Slot Kosong / Aman</span>
          </span>
        </div>

        <div className="bg-[#0c1222] border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Total Karyawan Aktif</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white mt-2">{totalEmployees} Personel</div>
          <span className="text-[10px] text-slate-400 mt-1 block">5 Departemen Operasional</span>
        </div>

        <div className="bg-[#0c1222] border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Armada Beroperasi</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {fleet.filter((f) => f.status === "SEDANG_TUGAS").length} / {fleet.length} Unit
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Tugas Logistik & Patroli</span>
        </div>

        <div className="bg-[#0c1222] border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Estimasi Payroll Pokok</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {formatRupiah(totalPayrollEst)}
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">Periode Berjalan Bulan Ini</span>
        </div>
      </div>

      {/* Main Grid: Left Recharts Chart, Right Live On-Duty Shift */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols): Department Distribution BarChart */}
        <div className="lg:col-span-8 bg-[#0c1222] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>Distribusi Kekuatan Personel per Departemen</span>
              </h2>
              <p className="text-xs text-slate-400">Alokasi tenaga kerja di seluruh sektor bisnis korporasi</p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#131b31] border border-slate-700 text-slate-300">
              Nexus HQ
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
                  itemStyle={{ color: "#e2e8f0" }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column (4 cols): Active On-Duty Shift Monitor */}
        <div className="lg:col-span-4 bg-[#0c1222] border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Personel On-Duty Hari Ini</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
              AKTIF
            </span>
          </div>

          <div className="space-y-3">
            {assignments.slice(0, 4).map((asg) => (
              <div
                key={asg.id}
                className="p-3 bg-[#11192e] border border-slate-800/80 rounded-xl flex items-center justify-between font-mono text-xs"
              >
                <div>
                  <div className="font-bold text-white">{asg.employeeName}</div>
                  <div className="text-[10px] text-slate-400">{asg.department}</div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      asg.shiftName === "PAGI"
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                        : asg.shiftName === "SIANG"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    SHIFT {asg.shiftName}
                  </span>
                  {asg.isOvertime && (
                    <div className="text-[9px] text-amber-400 font-bold mt-0.5">LEMBUR +3 JAM</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/roster"
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all font-mono"
          >
            <span>Buka Kalender Roster Penuh</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
