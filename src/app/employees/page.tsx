"use client";

import React, { useState } from "react";
import { useNexus } from "@/context/NexusContext";
import { Department, Employee } from "@/types/nexus";
import { formatRupiah } from "@/lib/utils";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Phone,
  Mail,
  X,
  FileText,
  BadgeAlert,
} from "lucide-react";

export default function EmployeesPage() {
  const {
    employees,
    leaves,
    addEmployee,
    deleteEmployee,
    approveLeave,
    rejectLeave,
    createLeaveRequest,
  } = useNexus();

  const [activeTab, setActiveTab] = useState<"DIRECTORY" | "LEAVES">("DIRECTORY");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // New Employee Form
  const [empForm, setEmpForm] = useState({
    nik: "",
    name: "",
    role: "",
    department: "Teknologi & Server" as Department,
    baseSalary: 8500000,
    hourlyOvertimeRate: 60000,
    phone: "",
    email: "",
  });

  // New Leave Form
  const [leaveForm, setLeaveForm] = useState({
    employeeId: employees[0]?.id || "emp-1",
    type: "TAHUNAN" as "TAHUNAN" | "SAKIT" | "MELAHIRKAN" | "DARURAT",
    startDate: "2026-10-01",
    endDate: "2026-10-03",
    totalDays: 3,
    reason: "",
  });

  const filteredEmployees = employees.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.nik.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === "ALL" || e.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empForm.name || !empForm.nik) return;

    addEmployee({
      ...empForm,
      avatar: "🧑‍💼",
      status: "AKTIF",
      joinDate: new Date().toISOString().split("T")[0],
    });

    setIsAddModalOpen(false);
    setEmpForm({
      nik: "",
      name: "",
      role: "",
      department: "Teknologi & Server",
      baseSalary: 8500000,
      hourlyOvertimeRate: 60000,
      phone: "",
      email: "",
    });
  };

  const handleCreateLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === leaveForm.employeeId);
    if (!emp) return;

    createLeaveRequest({
      employeeId: emp.id,
      employeeName: emp.name,
      department: emp.department,
      type: leaveForm.type,
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      totalDays: Number(leaveForm.totalDays),
      reason: leaveForm.reason || "Keperluan mendesak",
    });

    setIsLeaveModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c1222] border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Human Capital & Workforce Management</span>
          </div>
          <h1 className="text-2xl font-black text-white">Direktori Karyawan & Alur Pengajuan Cuti</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Basis data personel operasional, standar upah pokok, tarif lembur per jam, dan verifikasi permohonan cuti tahunan & darurat.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 bg-[#101726] border border-slate-800 p-1 rounded-xl text-xs font-mono">
          <button
            onClick={() => setActiveTab("DIRECTORY")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === "DIRECTORY"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Direktori ({employees.length})
          </button>
          <button
            onClick={() => setActiveTab("LEAVES")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === "LEAVES"
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Pengajuan Cuti ({leaves.length})
          </button>
        </div>
      </div>

      {/* TAB 1: DIRECTORY */}
      {activeTab === "DIRECTORY" && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-[#0c1222] border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari nama, NIK, atau jabatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#12192c] border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="bg-[#12192c] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono cursor-pointer"
              >
                <option value="ALL">Semua Departemen</option>
                <option value="Teknologi & Server">Teknologi & Server</option>
                <option value="Operasional Lapangan">Operasional Lapangan</option>
                <option value="Logistik & Gudang">Logistik & Gudang</option>
                <option value="Keamanan & Patroli">Keamanan & Patroli</option>
                <option value="Customer Support">Customer Support</option>
              </select>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0 font-mono"
              >
                <UserPlus className="w-4 h-4" />
                <span>Tambah Personel</span>
              </button>
            </div>
          </div>

          {/* Employee Table */}
          <div className="bg-[#0c1222] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#10172b] text-slate-400 uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Personel / NIK</th>
                    <th className="py-4 px-6">Jabatan & Departemen</th>
                    <th className="py-4 px-6 text-right">Gaji Pokok</th>
                    <th className="py-4 px-6 text-right">Rate Lembur/Jam</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-[#12192c]/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#162038] border border-slate-700 flex items-center justify-center text-xl shadow-inner">
                            {emp.avatar}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm">{emp.name}</div>
                            <div className="text-[11px] text-slate-400">NIK: {emp.nik}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-200">{emp.role}</div>
                        <div className="text-[11px] text-slate-400">{emp.department}</div>
                      </td>

                      <td className="py-4 px-6 text-right font-black text-emerald-400 text-sm">
                        {formatRupiah(emp.baseSalary)}
                      </td>

                      <td className="py-4 px-6 text-right text-amber-400 font-bold">
                        {formatRupiah(emp.hourlyOvertimeRate)}/jam
                      </td>

                      <td className="py-4 px-6 text-center">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                          {emp.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => deleteEmployee(emp.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-all cursor-pointer"
                          title="Hapus Karyawan"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LEAVE REQUESTS APPROVAL */}
      {activeTab === "LEAVES" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-mono flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Daftar Permohonan Cuti Personel</span>
            </h2>

            <button
              onClick={() => setIsLeaveModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono flex items-center gap-1.5 cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <Calendar className="w-4 h-4" />
              <span>Ajukan Cuti Baru</span>
            </button>
          </div>

          <div className="bg-[#0c1222] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#10172b] text-slate-400 uppercase text-[11px] border-b border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Nama Personel</th>
                    <th className="py-4 px-6">Tipe Cuti</th>
                    <th className="py-4 px-6">Rentang Waktu</th>
                    <th className="py-4 px-6">Alasan</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-right">Keputusan HRD</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {leaves.map((lv) => (
                    <tr key={lv.id} className="hover:bg-[#12192c]/50">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-sm">{lv.employeeName}</div>
                        <div className="text-[10px] text-slate-400">{lv.department}</div>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold">
                          CUTI {lv.type}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-slate-300">
                        <div>{lv.startDate} s/d {lv.endDate}</div>
                        <div className="text-[10px] text-slate-500 font-bold">Total: {lv.totalDays} Hari Kerja</div>
                      </td>

                      <td className="py-4 px-6 text-slate-400">{lv.reason}</td>

                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            lv.status === "DISETUJUI"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : lv.status === "DITOLAK"
                              ? "bg-red-500/10 text-red-400 border border-red-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {lv.status}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-right">
                        {lv.status === "PENDING" ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => approveLeave(lv.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Setujui</span>
                            </button>
                            <button
                              onClick={() => rejectLeave(lv.id)}
                              className="px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Tolak</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px]">Terkonfirmasi</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Employee */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white text-base flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-cyan-400" />
                <span>Form Pendaftaran Personel Baru</span>
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">NIK Personel</label>
                  <input
                    type="text"
                    required
                    placeholder="NX-809"
                    value={empForm.nik}
                    onChange={(e) => setEmpForm({ ...empForm, nik: e.target.value })}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Lengkap"
                    value={empForm.name}
                    onChange={(e) => setEmpForm({ ...empForm, name: e.target.value })}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Jabatan / Role</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Cloud Engineer"
                    value={empForm.role}
                    onChange={(e) => setEmpForm({ ...empForm, role: e.target.value })}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Departemen</label>
                  <select
                    value={empForm.department}
                    onChange={(e) =>
                      setEmpForm({ ...empForm, department: e.target.value as Department })
                    }
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Teknologi & Server">Teknologi & Server</option>
                    <option value="Operasional Lapangan">Operasional Lapangan</option>
                    <option value="Logistik & Gudang">Logistik & Gudang</option>
                    <option value="Keamanan & Patroli">Keamanan & Patroli</option>
                    <option value="Customer Support">Customer Support</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Gaji Pokok (Rp)</label>
                  <input
                    type="number"
                    required
                    value={empForm.baseSalary}
                    onChange={(e) =>
                      setEmpForm({ ...empForm, baseSalary: Number(e.target.value) })
                    }
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Rate Lembur/Jam (Rp)</label>
                  <input
                    type="number"
                    required
                    value={empForm.hourlyOvertimeRate}
                    onChange={(e) =>
                      setEmpForm({ ...empForm, hourlyOvertimeRate: Number(e.target.value) })
                    }
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 font-bold"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                >
                  Simpan Personel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Add Leave Request */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white text-base flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Form Pengajuan Cuti Karyawan</span>
              </h2>
              <button
                onClick={() => setIsLeaveModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLeave} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Pilih Karyawan</label>
                <select
                  value={leaveForm.employeeId}
                  onChange={(e) => setLeaveForm({ ...leaveForm, employeeId: e.target.value })}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tipe Cuti</label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) =>
                      setLeaveForm({
                        ...leaveForm,
                        type: e.target.value as "TAHUNAN" | "SAKIT" | "MELAHIRKAN" | "DARURAT",
                      })
                    }
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="TAHUNAN">Cuti Tahunan</option>
                    <option value="SAKIT">Cuti Sakit</option>
                    <option value="DARURAT">Cuti Darurat</option>
                    <option value="MELAHIRKAN">Cuti Melahirkan</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Total Hari Kerja</label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    required
                    value={leaveForm.totalDays}
                    onChange={(e) => setLeaveForm({ ...leaveForm, totalDays: Number(e.target.value) })}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Alasan Pengajuan</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jelaskan alasan permohonan cuti..."
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/20"
                >
                  Ajukan Cuti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
