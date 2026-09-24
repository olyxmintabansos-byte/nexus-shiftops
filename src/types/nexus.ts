export type Department =
  | "Teknologi & Server"
  | "Operasional Lapangan"
  | "Logistik & Gudang"
  | "Keamanan & Patroli"
  | "Customer Support";

export interface Employee {
  id: string;
  nik: string;
  name: string;
  role: string;
  department: Department;
  baseSalary: number;
  hourlyOvertimeRate: number;
  avatar: string;
  status: "AKTIF" | "CUTI" | "RESIGNED";
  phone: string;
  email: string;
  joinDate: string;
}

export interface ShiftType {
  id: string;
  name: "PAGI" | "SIANG" | "MALAM" | "LIBUR";
  startTime: string;
  endTime: string;
  allowance: number;
}

export interface ShiftAssignment {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  day: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu" | "Minggu";
  shiftTypeId: string;
  shiftName: "PAGI" | "SIANG" | "MALAM" | "LIBUR";
  date: string;
  isOvertime: boolean;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  type: "TAHUNAN" | "SAKIT" | "MELAHIRKAN" | "DARURAT";
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: "PENDING" | "DISETUJUI" | "DITOLAK";
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: Department;
  month: string;
  baseSalary: number;
  overtimeHours: number;
  overtimePay: number;
  allowances: number;
  taxDeductions: number;
  netSalary: number;
  status: "DRAFT" | "PAID";
  paymentDate?: string;
}

export interface FleetAsset {
  id: string;
  code: string;
  name: string;
  type: "MOBIL_OPERASIONAL" | "VAN_LOGISTIK" | "MOTOR_PATROLI" | "FORKLIFT";
  plateNumber: string;
  assignedDriver: string;
  mileageKm: number;
  fuelLevelPercent: number;
  status: "TERSEDIA" | "SEDANG_TUGAS" | "MAINTENANCE";
}
