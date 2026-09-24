"use client";

import React, { useState } from "react";
import { useNexus } from "@/context/NexusContext";
import { formatRupiah } from "@/lib/utils";
import { PayrollRecord } from "@/types/nexus";
import {
  CreditCard,
  DollarSign,
  Printer,
  PlusCircle,
  CheckCircle2,
  Clock,
  Building,
  UserCheck,
  X,
  FileText,
  BadgePercent,
} from "lucide-react";

export default function PayrollPage() {
  const { employees, payroll, generatePayrollSlip, payPayroll } = useNexus();

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(employees[0]?.id || "emp-1");
  const [overtimeHoursInput, setOvertimeHoursInput] = useState<number>(10);
  const [payslipToPrint, setPayslipToPrint] = useState<PayrollRecord | null>(null);

  // Metrics
  const totalPaid = payroll
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.netSalary, 0);
  const totalPending = payroll
    .filter((p) => p.status === "DRAFT")
    .reduce((sum, p) => sum + p.netSalary, 0);
  const totalOvertimeHours = payroll.reduce((sum, p) => sum + p.overtimeHours, 0);

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePayrollSlip(selectedEmpId, Number(overtimeHoursInput));
    setIsGenerateModalOpen(false);
  };

  const handlePrintPayslip = (p: PayrollRecord) => {
    setPayslipToPrint(p);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner (No Print) */}
      <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c1222] border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
            <CreditCard className="w-4 h-4" />
            <span>Automated Payroll & Overtime Engine</span>
          </div>
          <h1 className="text-2xl font-black text-white">Sistem Penggajian & Rekapitulasi Lembur</h1>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Kalkulasi otomatis take-home pay, insentif lembur, potongan pajak PPh 21 dan BPJS, serta pencetakan slip gaji resmi A4.
          </p>
        </div>

        <button
          onClick={() => setIsGenerateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer font-mono self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Generate Slip Baru</span>
        </button>
      </div>

      {/* 4 Financial KPI Cards (No Print) */}
      <div className="no-print grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#0c1222] border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Total Gaji Dibayarkan</span>
          <div className="text-2xl font-black text-emerald-400 mt-2">{formatRupiah(totalPaid)}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Status Sukses Disbursed</span>
        </div>

        <div className="bg-[#0c1222] border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Pending Draft Penggajian</span>
          <div className="text-2xl font-black text-amber-400 mt-2">{formatRupiah(totalPending)}</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Menunggu Approval Direksi</span>
        </div>

        <div className="bg-[#0c1222] border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Akumulasi Jam Lembur</span>
          <div className="text-2xl font-black text-cyan-400 mt-2">{totalOvertimeHours} Jam</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Tercatat di Sistem ShiftOps</span>
        </div>

        <div className="bg-[#0c1222] border border-slate-800 p-5 rounded-2xl">
          <span className="text-xs text-slate-400">Slip Gaji Terbit</span>
          <div className="text-2xl font-black text-white mt-2">{payroll.length} Slip</div>
          <span className="text-[10px] text-slate-500 mt-1 block">Arsip Penggajian Bulan Ini</span>
        </div>
      </div>

      {/* Main Payroll Table (No Print) */}
      <div className="no-print bg-[#0c1222] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#10172b] text-slate-400 uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-6">Nama Personel</th>
                <th className="py-4 px-6">Bulan</th>
                <th className="py-4 px-6 text-right">Gaji Pokok</th>
                <th className="py-4 px-6 text-right">Lembur</th>
                <th className="py-4 px-6 text-right">Tunjangan</th>
                <th className="py-4 px-6 text-right">Potongan (Pajak)</th>
                <th className="py-4 px-6 text-right">Take-Home Pay</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {payroll.map((pay) => (
                <tr key={pay.id} className="hover:bg-[#12192c]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-white text-sm">{pay.employeeName}</div>
                    <div className="text-[10px] text-slate-400">{pay.department}</div>
                  </td>

                  <td className="py-4 px-6 text-slate-300 font-bold">{pay.month}</td>

                  <td className="py-4 px-6 text-right text-slate-200">
                    {formatRupiah(pay.baseSalary)}
                  </td>

                  <td className="py-4 px-6 text-right text-amber-400 font-bold">
                    +{formatRupiah(pay.overtimePay)}
                    <span className="block text-[9px] text-slate-400">{pay.overtimeHours} Jam</span>
                  </td>

                  <td className="py-4 px-6 text-right text-cyan-400">
                    +{formatRupiah(pay.allowances)}
                  </td>

                  <td className="py-4 px-6 text-right text-red-400">
                    -{formatRupiah(pay.taxDeductions)}
                  </td>

                  <td className="py-4 px-6 text-right font-black text-emerald-400 text-sm">
                    {formatRupiah(pay.netSalary)}
                  </td>

                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        pay.status === "PAID"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {pay.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {pay.status === "DRAFT" && (
                        <button
                          onClick={() => payPayroll(pay.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-[10px] transition-all cursor-pointer"
                        >
                          Bayar
                        </button>
                      )}
                      <button
                        onClick={() => handlePrintPayslip(pay)}
                        className="p-1.5 rounded-lg bg-[#162038] hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
                        title="Cetak Slip Gaji Resmi A4"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formal Printable Payslip Component (Print View Only) */}
      {payslipToPrint && (
        <div className="print-area hidden print:block bg-white text-black p-8 font-serif border border-black space-y-6">
          <div className="text-center border-b-2 border-black pb-4">
            <h2 className="text-xl font-bold uppercase tracking-wider">
              NEXUS CORP ENTERPRISE WORKFORCE & OPERATIONS
            </h2>
            <p className="text-xs text-slate-700 font-mono">
              Nexus Tower Apex, 42nd Floor • Human Capital & Financial Payroll Division
            </p>
            <div className="mt-2 text-xs font-mono font-bold uppercase border-y border-black py-1 inline-block">
              SLIP GAJI KARYAWAN (PAYSLIP) — BULAN {payslipToPrint.month.toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-slate-600 block">Nama Karyawan:</span>
              <strong className="text-sm">{payslipToPrint.employeeName}</strong>
              <div className="text-[11px] text-slate-600">Departemen: {payslipToPrint.department}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-600 block">Status Pembayaran:</span>
              <strong className="text-emerald-700 uppercase">
                {payslipToPrint.status === "PAID" ? "LUNAS / TELAH DITRANSFER" : "DRAFT"}
              </strong>
              <div className="text-[11px] text-slate-600">
                Tanggal: {payslipToPrint.paymentDate || "25 September 2026"}
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="grid grid-cols-2 gap-6 text-xs font-mono border border-black p-4 rounded">
            {/* Earnings */}
            <div className="space-y-2">
              <h4 className="font-bold border-b border-black pb-1">KOMPONEN PENERIMAAN</h4>
              <div className="flex justify-between">
                <span>Gaji Pokok:</span>
                <span>{formatRupiah(payslipToPrint.baseSalary)}</span>
              </div>
              <div className="flex justify-between">
                <span>Upah Lembur ({payslipToPrint.overtimeHours} Jam):</span>
                <span>+{formatRupiah(payslipToPrint.overtimePay)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tunjangan Operasional:</span>
                <span>+{formatRupiah(payslipToPrint.allowances)}</span>
              </div>
              <div className="flex justify-between border-t border-black/40 pt-1 font-bold">
                <span>Total Penghasilan Kotor:</span>
                <span>
                  {formatRupiah(
                    payslipToPrint.baseSalary +
                      payslipToPrint.overtimePay +
                      payslipToPrint.allowances
                  )}
                </span>
              </div>
            </div>

            {/* Deductions */}
            <div className="space-y-2">
              <h4 className="font-bold border-b border-black pb-1">POTONGAN RESMI</h4>
              <div className="flex justify-between">
                <span>PPh 21 & BPJS:</span>
                <span>-{formatRupiah(payslipToPrint.taxDeductions)}</span>
              </div>
              <div className="flex justify-between border-t border-black/40 pt-1 font-bold">
                <span>Total Potongan:</span>
                <span>-{formatRupiah(payslipToPrint.taxDeductions)}</span>
              </div>
            </div>
          </div>

          {/* Total Net */}
          <div className="border-2 border-black p-4 text-center font-mono bg-slate-50">
            <span className="text-xs text-slate-600 block">TOTAL GAJI BERSIH (TAKE-HOME PAY):</span>
            <div className="text-2xl font-black">{formatRupiah(payslipToPrint.netSalary)}</div>
          </div>

          {/* Signatures */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-xs font-mono text-center">
            <div>
              <p>Penerima / Karyawan</p>
              <div className="h-16" />
              <p className="border-t border-black font-bold pt-1">{payslipToPrint.employeeName}</p>
            </div>
            <div>
              <p>Direktur Keuangan & HRD Nexus</p>
              <div className="h-16 flex items-center justify-center">
                <span className="px-3 py-1 border-2 border-emerald-700 text-emerald-800 font-bold uppercase rounded transform -rotate-3">
                  ★ DIBAYARKAN ★
                </span>
              </div>
              <p className="border-t border-black font-bold pt-1">Dinda Salsabila, S.T, M.M</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Generate Slip Baru */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white text-base flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Generate Slip Gaji Periode Baru</span>
              </h2>
              <button
                onClick={() => setIsGenerateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleGenerateSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="text-slate-400 block mb-1">Pilih Karyawan</label>
                <select
                  value={selectedEmpId}
                  onChange={(e) => setSelectedEmpId(e.target.value)}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
                  {employees.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name} ({e.department} - {formatRupiah(e.baseSalary)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Total Jam Lembur Terverifikasi (Jam)</label>
                <input
                  type="number"
                  min={0}
                  max={80}
                  required
                  value={overtimeHoursInput}
                  onChange={(e) => setOvertimeHoursInput(Number(e.target.value))}
                  className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500 font-bold"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-600/20"
                >
                  Terbitkan Slip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
