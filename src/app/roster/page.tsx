"use client";

import React, { useState } from "react";
import { useNexus } from "@/context/NexusContext";
import { Department } from "@/types/nexus";
import { getShiftBadge } from "@/lib/utils";
import {
  CalendarDays,
  PlusCircle,
  Filter,
  Users,
  Clock,
  Trash2,
  X,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function RosterPage() {
  const { employees, assignments, assignShift, deleteShiftAssignment } = useNexus();

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"] as const;
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Form State
  const [formEmployeeId, setFormEmployeeId] = useState(employees[0]?.id || "emp-1");
  const [formDay, setFormDay] = useState<typeof days[number]>("Senin");
  const [formShiftName, setFormShiftName] = useState<"PAGI" | "SIANG" | "MALAM" | "LIBUR">("PAGI");
  const [formIsOvertime, setFormIsOvertime] = useState(false);

  const filteredEmployees = employees.filter(
    (e) => selectedDept === "ALL" || e.department === selectedDept
  );

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emp = employees.find((e) => e.id === formEmployeeId);
    if (!emp) return;

    assignShift({
      employeeId: emp.id,
      employeeName: emp.name,
      department: emp.department,
      day: formDay,
      shiftTypeId: formShiftName === "PAGI" ? "sh-1" : formShiftName === "SIANG" ? "sh-2" : formShiftName === "MALAM" ? "sh-3" : "sh-4",
      shiftName: formShiftName,
      date: "2026-09-28",
      isOvertime: formIsOvertime,
    });

    setIsAssignModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c1222] border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>Weekly Workforce Roster Matrix</span>
          </div>
          <h1 className="text-2xl font-black text-white">Matriks Roster Shift Mingguan</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Jadwalkan rotasi shift kerja (Pagi, Siang, Malam, Libur), pantau cakupan slot per divisi, dan atur penugasan lembur.
          </p>
        </div>

        <button
          onClick={() => setIsAssignModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer self-start md:self-auto font-mono"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Jadwalkan Shift Karyawan</span>
        </button>
      </div>

      {/* Filter and Legend Bar */}
      <div className="bg-[#0c1222] border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-mono">Departemen:</span>
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
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
            Pagi (07-15)
          </span>
          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
            Siang (15-23)
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold">
            Malam (23-07)
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-bold">
            Off / Libur
          </span>
        </div>
      </div>

      {/* Main Roster Matrix Table */}
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#10172b] text-slate-400 uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-4 min-w-[200px]">Personel Karyawan</th>
                {days.map((day) => (
                  <th key={day} className="py-4 px-3 text-center min-w-[120px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-[#12192c]/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#162038] border border-slate-700 flex items-center justify-center text-lg shadow-inner">
                        {emp.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{emp.name}</div>
                        <div className="text-[10px] text-slate-400">{emp.role}</div>
                      </div>
                    </div>
                  </td>

                  {days.map((day) => {
                    const asg = assignments.find(
                      (a) => a.employeeId === emp.id && a.day === day
                    );

                    if (!asg) {
                      return (
                        <td key={day} className="py-4 px-3 text-center">
                          <button
                            onClick={() => {
                              setFormEmployeeId(emp.id);
                              setFormDay(day);
                              setIsAssignModalOpen(true);
                            }}
                            className="p-1.5 rounded-lg border border-dashed border-slate-800 hover:border-slate-600 text-slate-600 hover:text-slate-400 transition-all text-[10px]"
                          >
                            + Jadwal
                          </button>
                        </td>
                      );
                    }

                    const { color } = getShiftBadge(asg.shiftName);

                    return (
                      <td key={day} className="py-4 px-3 text-center">
                        <div className="relative group inline-block">
                          <div
                            className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold ${color}`}
                          >
                            <span>{asg.shiftName}</span>
                            {asg.isOvertime && (
                              <span className="block text-[8px] text-amber-300 font-black">+OT</span>
                            )}
                          </div>
                          <button
                            onClick={() => deleteShiftAssignment(asg.id)}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Hapus Shift"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Assign Shift */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white text-base flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-cyan-400" />
                <span>Alokasi Jadwal Shift Kerja</span>
              </h2>
              <button
                onClick={() => setIsAssignModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Pilih Personel Karyawan</label>
                <select
                  value={formEmployeeId}
                  onChange={(e) => setFormEmployeeId(e.target.value)}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Hari Penugasan</label>
                  <select
                    value={formDay}
                    onChange={(e) => setFormDay(e.target.value as typeof days[number])}
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    {days.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Jenis Shift</label>
                  <select
                    value={formShiftName}
                    onChange={(e) =>
                      setFormShiftName(
                        e.target.value as "PAGI" | "SIANG" | "MALAM" | "LIBUR"
                      )
                    }
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="PAGI">Pagi (07:00 - 15:00)</option>
                    <option value="SIANG">Siang (15:00 - 23:00)</option>
                    <option value="MALAM">Malam (23:00 - 07:00)</option>
                    <option value="LIBUR">Off / Libur</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-[#141e33] border border-slate-800 rounded-xl">
                <input
                  type="checkbox"
                  id="overtime"
                  checked={formIsOvertime}
                  onChange={(e) => setFormIsOvertime(e.target.checked)}
                  className="rounded text-cyan-500 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="overtime" className="text-slate-300 cursor-pointer">
                  Tugaskan Sebagai Lembur (Overtime +Upah Jam)
                </label>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAssignModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black shadow-lg shadow-cyan-500/20"
                >
                  Simpan Shift
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
