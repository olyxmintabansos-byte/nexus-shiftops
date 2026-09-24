# ⚡ Nexus Corp & ShiftOps — Workforce ERP, Roster & Fleet OS

[![Live Demo](https://img.shields.io/badge/Live_Demo-Active-emerald?style=for-the-badge&logo=vercel)](https://olyxmintabansos-byte.github.io/nexus-shiftops/)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-cyan?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)

> **Live Demo:** [https://olyxmintabansos-byte.github.io/nexus-shiftops/](https://olyxmintabansos-byte.github.io/nexus-shiftops/)

Nexus ShiftOps adalah sistem ERP tenaga kerja komprehensif untuk operasi 24/7 yang mengintegrasikan matriks kalender shift mingguan Gantt, alur persetujuan cuti HRD, kalkulasi payroll & lembur otomatis (PPh 21/BPJS), serta monitoring armada kendaraan operasional real-time.

## 🚀 Fitur Utama
- **Weekly Shift Matrix (Gantt-Style):** Penjadwalan shift 24/7 (Pagi, Siang, Malam, Libur) dengan deteksi bentrok jadwal otomatis.
- **Manajemen Karyawan & Cuti:** Direktori karyawan, sisa jatah cuti, dan workflow persetujuan HRD interaktif.
- **Automated Payroll & Slip Gaji A4:** Perhitungan gaji pokok, tunjangan shift, lembur, potongan PPh 21, dan cetak slip gaji A4 siap tanda tangan.
- **Fleet & Vehicle Logistics (/fleet):** Monitoring aset armada operasional, status servis, kapasitas tangki, dan riwayat pengisian BBM.

## 🏗️ Diagram Arsitektur
```mermaid
graph TD
    A[Workforce Master Roster] --> B[Shift Rotation Engine]
    A --> C[Leave Approval Workflow]
    B --> D[Automated Payroll & A4 Payslip]
    A --> E[Fleet Asset & Fuel Telemetry]
```
