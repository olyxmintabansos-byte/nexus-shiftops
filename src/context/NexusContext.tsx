"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Employee,
  ShiftType,
  ShiftAssignment,
  LeaveRequest,
  PayrollRecord,
  FleetAsset,
  Department,
} from "@/types/nexus";

const SEED_EMPLOYEES: Employee[] = [
  { id: "emp-1", nik: "NX-801", name: "Reyhan Mahardika", role: "Lead Systems Architect", department: "Teknologi & Server", baseSalary: 18500000, hourlyOvertimeRate: 120000, avatar: "👨‍💻", status: "AKTIF", phone: "0812-9844-0101", email: "reyhan.m@nexus.corp", joinDate: "2023-01-15" },
  { id: "emp-2", nik: "NX-802", name: "Dinda Salsabila", role: "DevOps & Cloud Specialist", department: "Teknologi & Server", baseSalary: 14000000, hourlyOvertimeRate: 95000, avatar: "👩‍💻", status: "AKTIF", phone: "0813-8822-1920", email: "dinda.s@nexus.corp", joinDate: "2023-05-10" },
  { id: "emp-3", nik: "NX-803", name: "Bambang Sudrajat", role: "Field Operations Supervisor", department: "Operasional Lapangan", baseSalary: 9500000, hourlyOvertimeRate: 65000, avatar: "👨‍🔧", status: "AKTIF", phone: "0815-7761-9921", email: "bambang.s@nexus.corp", joinDate: "2022-11-01" },
  { id: "emp-4", nik: "NX-804", name: "Siti Rahmawati", role: "Logistics Hub Dispatcher", department: "Logistik & Gudang", baseSalary: 8200000, hourlyOvertimeRate: 55000, avatar: "👩‍💼", status: "AKTIF", phone: "0818-4490-2211", email: "siti.r@nexus.corp", joinDate: "2024-02-20" },
  { id: "emp-5", nik: "NX-805", name: "Kurniawan Pratama", role: "Senior Patrol Officer", department: "Keamanan & Patroli", baseSalary: 7500000, hourlyOvertimeRate: 50000, avatar: "👮‍♂️", status: "AKTIF", phone: "0812-3321-4455", email: "kurniawan.p@nexus.corp", joinDate: "2023-08-14" },
  { id: "emp-6", nik: "NX-806", name: "Agus Setiawan", role: "Warehouse Inventory Handler", department: "Logistik & Gudang", baseSalary: 6800000, hourlyOvertimeRate: 45000, avatar: "📦", status: "AKTIF", phone: "0819-0128-7733", email: "agus.s@nexus.corp", joinDate: "2024-04-01" },
  { id: "emp-7", nik: "NX-807", name: "Clarissa Natalie", role: "24/7 Enterprise Tier-2 Support", department: "Customer Support", baseSalary: 7800000, hourlyOvertimeRate: 52000, avatar: "👩‍💼", status: "AKTIF", phone: "0811-2299-8800", email: "clarissa.n@nexus.corp", joinDate: "2023-12-05" },
  { id: "emp-8", nik: "NX-808", name: "Hendro Wibowo", role: "Patrol Security Night Specialist", department: "Keamanan & Patroli", baseSalary: 7500000, hourlyOvertimeRate: 50000, avatar: "👮", status: "AKTIF", phone: "0813-4411-9988", email: "hendro.w@nexus.corp", joinDate: "2024-01-10" },
];

const SEED_SHIFT_TYPES: ShiftType[] = [
  { id: "sh-1", name: "PAGI", startTime: "07:00", endTime: "15:00", allowance: 0 },
  { id: "sh-2", name: "SIANG", startTime: "15:00", endTime: "23:00", allowance: 25000 },
  { id: "sh-3", name: "MALAM", startTime: "23:00", endTime: "07:00", allowance: 60000 },
  { id: "sh-4", name: "LIBUR", startTime: "-", endTime: "-", allowance: 0 },
];

const SEED_ASSIGNMENTS: ShiftAssignment[] = [
  { id: "asg-1", employeeId: "emp-1", employeeName: "Reyhan Mahardika", department: "Teknologi & Server", day: "Senin", shiftTypeId: "sh-1", shiftName: "PAGI", date: "2026-09-28", isOvertime: false },
  { id: "asg-2", employeeId: "emp-2", employeeName: "Dinda Salsabila", department: "Teknologi & Server", day: "Senin", shiftTypeId: "sh-2", shiftName: "SIANG", date: "2026-09-28", isOvertime: false },
  { id: "asg-3", employeeId: "emp-3", employeeName: "Bambang Sudrajat", department: "Operasional Lapangan", day: "Senin", shiftTypeId: "sh-1", shiftName: "PAGI", date: "2026-09-28", isOvertime: true },
  { id: "asg-4", employeeId: "emp-4", employeeName: "Siti Rahmawati", department: "Logistik & Gudang", day: "Senin", shiftTypeId: "sh-1", shiftName: "PAGI", date: "2026-09-28", isOvertime: false },
  { id: "asg-5", employeeId: "emp-5", employeeName: "Kurniawan Pratama", department: "Keamanan & Patroli", day: "Senin", shiftTypeId: "sh-2", shiftName: "SIANG", date: "2026-09-28", isOvertime: false },
  { id: "asg-6", employeeId: "emp-8", employeeName: "Hendro Wibowo", department: "Keamanan & Patroli", day: "Senin", shiftTypeId: "sh-3", shiftName: "MALAM", date: "2026-09-28", isOvertime: true },
  { id: "asg-7", employeeId: "emp-7", employeeName: "Clarissa Natalie", department: "Customer Support", day: "Senin", shiftTypeId: "sh-3", shiftName: "MALAM", date: "2026-09-28", isOvertime: false },
  { id: "asg-8", employeeId: "emp-1", employeeName: "Reyhan Mahardika", department: "Teknologi & Server", day: "Selasa", shiftTypeId: "sh-1", shiftName: "PAGI", date: "2026-09-29", isOvertime: false },
  { id: "asg-9", employeeId: "emp-2", employeeName: "Dinda Salsabila", department: "Teknologi & Server", day: "Selasa", shiftTypeId: "sh-2", shiftName: "SIANG", date: "2026-09-29", isOvertime: false },
  { id: "asg-10", employeeId: "emp-5", employeeName: "Kurniawan Pratama", department: "Keamanan & Patroli", day: "Selasa", shiftTypeId: "sh-3", shiftName: "MALAM", date: "2026-09-29", isOvertime: false },
  { id: "asg-11", employeeId: "emp-8", employeeName: "Hendro Wibowo", department: "Keamanan & Patroli", day: "Selasa", shiftTypeId: "sh-4", shiftName: "LIBUR", date: "2026-09-29", isOvertime: false },
];

const SEED_LEAVES: LeaveRequest[] = [
  { id: "lv-1", employeeId: "emp-4", employeeName: "Siti Rahmawati", department: "Logistik & Gudang", type: "TAHUNAN", startDate: "2026-10-02", endDate: "2026-10-05", totalDays: 3, reason: "Acara keluarga tahunan", status: "DISETUJUI" },
  { id: "lv-2", employeeId: "emp-6", employeeName: "Agus Setiawan", department: "Logistik & Gudang", type: "SAKIT", startDate: "2026-09-25", endDate: "2026-09-26", totalDays: 2, reason: "Demam berdarah - rawat jalan", status: "PENDING" },
];

const SEED_PAYROLL: PayrollRecord[] = [
  { id: "pay-1", employeeId: "emp-1", employeeName: "Reyhan Mahardika", department: "Teknologi & Server", month: "September 2026", baseSalary: 18500000, overtimeHours: 8, overtimePay: 960000, allowances: 500000, taxDeductions: 1250000, netSalary: 18710000, status: "PAID", paymentDate: "2026-09-25" },
  { id: "pay-2", employeeId: "emp-3", employeeName: "Bambang Sudrajat", department: "Operasional Lapangan", month: "September 2026", baseSalary: 9500000, overtimeHours: 14, overtimePay: 910000, allowances: 400000, taxDeductions: 650000, netSalary: 10160000, status: "PAID", paymentDate: "2026-09-25" },
  { id: "pay-3", employeeId: "emp-5", employeeName: "Kurniawan Pratama", department: "Keamanan & Patroli", month: "September 2026", baseSalary: 7500000, overtimeHours: 12, overtimePay: 600000, allowances: 480000, taxDeductions: 450000, netSalary: 8130000, status: "DRAFT" },
];

const SEED_FLEET: FleetAsset[] = [
  { id: "flt-1", code: "FLT-OPS-01", name: "Toyota Hilux 4x4 Double Cabin", type: "MOBIL_OPERASIONAL", plateNumber: "B 1042 NXA", assignedDriver: "Bambang Sudrajat", mileageKm: 42150, fuelLevelPercent: 85, status: "SEDANG_TUGAS" },
  { id: "flt-2", code: "FLT-LOG-02", name: "Isuzu Elf Blind Van Heavy Duty", type: "VAN_LOGISTIK", plateNumber: "B 9921 NXC", assignedDriver: "Agus Setiawan", mileageKm: 78900, fuelLevelPercent: 60, status: "TERSEDIA" },
  { id: "flt-3", code: "FLT-SEC-03", name: "Kawasaki KLX 250 Patrol Edition", type: "MOTOR_PATROLI", plateNumber: "B 4410 NXP", assignedDriver: "Hendro Wibowo", mileageKm: 18200, fuelLevelPercent: 95, status: "SEDANG_TUGAS" },
  { id: "flt-4", code: "FLT-LOG-04", name: "Komatsu Electric Heavy Forklift 3-Ton", type: "FORKLIFT", plateNumber: "WH-FL-04", assignedDriver: "Siti Rahmawati", mileageKm: 3400, fuelLevelPercent: 100, status: "TERSEDIA" },
];

interface NexusContextType {
  employees: Employee[];
  shiftTypes: ShiftType[];
  assignments: ShiftAssignment[];
  leaves: LeaveRequest[];
  payroll: PayrollRecord[];
  fleet: FleetAsset[];
  addEmployee: (emp: Omit<Employee, "id">) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  assignShift: (asg: Omit<ShiftAssignment, "id">) => void;
  deleteShiftAssignment: (id: string) => void;
  approveLeave: (leaveId: string) => void;
  rejectLeave: (leaveId: string) => void;
  createLeaveRequest: (data: Omit<LeaveRequest, "id" | "status">) => void;
  generatePayrollSlip: (empId: string, overtimeHours: number) => void;
  payPayroll: (id: string) => void;
  updateFleetStatus: (id: string, status: "TERSEDIA" | "SEDANG_TUGAS" | "MAINTENANCE") => void;
  refuelFleet: (id: string) => void;
  addFleetAsset: (asset: Omit<FleetAsset, "id">) => void;
  resetAllData: () => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export function NexusProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(SEED_EMPLOYEES);
  const [shiftTypes] = useState<ShiftType[]>(SEED_SHIFT_TYPES);
  const [assignments, setAssignments] = useState<ShiftAssignment[]>(SEED_ASSIGNMENTS);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(SEED_LEAVES);
  const [payroll, setPayroll] = useState<PayrollRecord[]>(SEED_PAYROLL);
  const [fleet, setFleet] = useState<FleetAsset[]>(SEED_FLEET);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load LocalStorage
  useEffect(() => {
    try {
      const sEmp = localStorage.getItem("nexus_employees");
      const sAsg = localStorage.getItem("nexus_assignments");
      const sLev = localStorage.getItem("nexus_leaves");
      const sPay = localStorage.getItem("nexus_payroll");
      const sFlt = localStorage.getItem("nexus_fleet");

      if (sEmp) setEmployees(JSON.parse(sEmp));
      if (sAsg) setAssignments(JSON.parse(sAsg));
      if (sLev) setLeaves(JSON.parse(sLev));
      if (sPay) setPayroll(JSON.parse(sPay));
      if (sFlt) setFleet(JSON.parse(sFlt));
    } catch (e) {
      console.error("Failed to load Nexus storage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("nexus_employees", JSON.stringify(employees));
    localStorage.setItem("nexus_assignments", JSON.stringify(assignments));
    localStorage.setItem("nexus_leaves", JSON.stringify(leaves));
    localStorage.setItem("nexus_payroll", JSON.stringify(payroll));
    localStorage.setItem("nexus_fleet", JSON.stringify(fleet));
  }, [employees, assignments, leaves, payroll, fleet, isLoaded]);

  const addEmployee = (data: Omit<Employee, "id">) => {
    const newEmp: Employee = { ...data, id: `emp-${Date.now()}` };
    setEmployees((prev) => [newEmp, ...prev]);
  };

  const updateEmployee = (id: string, data: Partial<Employee>) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...data } : e))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const assignShift = (data: Omit<ShiftAssignment, "id">) => {
    const filtered = assignments.filter(
      (a) => !(a.employeeId === data.employeeId && a.day === data.day)
    );
    const newAsg: ShiftAssignment = {
      ...data,
      id: `asg-${Date.now()}`,
    };
    setAssignments([...filtered, newAsg]);
  };

  const deleteShiftAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const approveLeave = (leaveId: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, status: "DISETUJUI" } : l))
    );
  };

  const rejectLeave = (leaveId: string) => {
    setLeaves((prev) =>
      prev.map((l) => (l.id === leaveId ? { ...l, status: "DITOLAK" } : l))
    );
  };

  const createLeaveRequest = (data: Omit<LeaveRequest, "id" | "status">) => {
    const newLeave: LeaveRequest = {
      ...data,
      id: `lv-${Date.now()}`,
      status: "PENDING",
    };
    setLeaves((prev) => [newLeave, ...prev]);
  };

  const generatePayrollSlip = (empId: string, overtimeHours: number) => {
    const emp = employees.find((e) => e.id === empId);
    if (!emp) return;

    const otPay = overtimeHours * emp.hourlyOvertimeRate;
    const allowances = 500000;
    const tax = Math.round((emp.baseSalary + otPay) * 0.05);
    const net = emp.baseSalary + otPay + allowances - tax;

    const newPay: PayrollRecord = {
      id: `pay-${Date.now()}`,
      employeeId: emp.id,
      employeeName: emp.name,
      department: emp.department,
      month: "Oktober 2026",
      baseSalary: emp.baseSalary,
      overtimeHours,
      overtimePay: otPay,
      allowances,
      taxDeductions: tax,
      netSalary: net,
      status: "DRAFT",
    };

    setPayroll((prev) => [newPay, ...prev]);
  };

  const payPayroll = (id: string) => {
    setPayroll((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: "PAID", paymentDate: new Date().toISOString().split("T")[0] }
          : p
      )
    );
  };

  const updateFleetStatus = (id: string, status: "TERSEDIA" | "SEDANG_TUGAS" | "MAINTENANCE") => {
    setFleet((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f))
    );
  };

  const refuelFleet = (id: string) => {
    setFleet((prev) =>
      prev.map((f) => (f.id === id ? { ...f, fuelLevelPercent: 100 } : f))
    );
  };

  const addFleetAsset = (data: Omit<FleetAsset, "id">) => {
    const newAsset: FleetAsset = {
      ...data,
      id: `flt-${Date.now()}`,
    };
    setFleet((prev) => [newAsset, ...prev]);
  };

  const resetAllData = () => {
    localStorage.clear();
    setEmployees(SEED_EMPLOYEES);
    setAssignments(SEED_ASSIGNMENTS);
    setLeaves(SEED_LEAVES);
    setPayroll(SEED_PAYROLL);
    setFleet(SEED_FLEET);
    window.location.reload();
  };

  return (
    <NexusContext.Provider
      value={{
        employees,
        shiftTypes,
        assignments,
        leaves,
        payroll,
        fleet,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        assignShift,
        deleteShiftAssignment,
        approveLeave,
        rejectLeave,
        createLeaveRequest,
        generatePayrollSlip,
        payPayroll,
        updateFleetStatus,
        refuelFleet,
        addFleetAsset,
        resetAllData,
      }}
    >
      {children}
    </NexusContext.Provider>
  );
}

export function useNexus() {
  const context = useContext(NexusContext);
  if (!context) throw new Error("useNexus must be used within NexusProvider");
  return context;
}
