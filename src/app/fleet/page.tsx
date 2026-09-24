"use client";

import React, { useState } from "react";
import { useNexus } from "@/context/NexusContext";
import { FleetAsset } from "@/types/nexus";
import {
  Truck,
  Gauge,
  Fuel,
  Wrench,
  MapPin,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function FleetPage() {
  const {
    fleet,
    updateFleetStatus,
    refuelFleet,
    addFleetAsset,
  } = useNexus();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newAsset, setNewAsset] = useState({
    code: "",
    name: "",
    type: "MOBIL_OPERASIONAL" as FleetAsset["type"],
    plateNumber: "",
    assignedDriver: "",
    mileageKm: 0,
    fuelLevelPercent: 100,
    status: "TERSEDIA" as FleetAsset["status"],
  });

  const handleAddAsset = () => {
    if (!newAsset.code || !newAsset.name || !newAsset.plateNumber) {
      alert("Kode, nama, dan plat nomor wajib diisi!");
      return;
    }
    addFleetAsset(newAsset);
    setShowAddModal(false);
    setNewAsset({
      code: "",
      name: "",
      type: "MOBIL_OPERASIONAL",
      plateNumber: "",
      assignedDriver: "",
      mileageKm: 0,
      fuelLevelPercent: 100,
      status: "TERSEDIA",
    });
  };

  const getStatusBadge = (status: FleetAsset["status"]) => {
    if (status === "TERSEDIA")
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <CheckCircle2 size={14} />
          TERSEDIA
        </span>
      );
    if (status === "SEDANG_TUGAS")
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
          <MapPin size={14} />
          SEDANG TUGAS
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
        <Wrench size={14} />
        MAINTENANCE
      </span>
    );
  };

  const getTypeBadge = (type: FleetAsset["type"]) => {
    const map: Record<FleetAsset["type"], string> = {
      MOBIL_OPERASIONAL: "🚙 Mobil Ops",
      VAN_LOGISTIK: "🚚 Van Logistik",
      MOTOR_PATROLI: "🏍️ Motor Patroli",
      FORKLIFT: "🏗️ Forklift",
    };
    return (
      <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-700/50 text-slate-300 border border-slate-600">
        {map[type]}
      </span>
    );
  };

  const getFuelColor = (percent: number) => {
    if (percent >= 70) return "text-emerald-400";
    if (percent >= 40) return "text-amber-400";
    return "text-red-400";
  };

  const tersedia = fleet.filter((f) => f.status === "TERSEDIA").length;
  const sedangTugas = fleet.filter((f) => f.status === "SEDANG_TUGAS").length;
  const maintenance = fleet.filter((f) => f.status === "MAINTENANCE").length;
  const lowFuel = fleet.filter((f) => f.fuelLevelPercent < 30).length;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Truck className="text-cyan-400" size={36} />
              Fleet Management & Logistics
            </h1>
            <p className="text-slate-400 mt-1">
              Manajemen Armada, Maintenance, dan Logistik Real-Time
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={20} />
            Tambah Aset
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <CheckCircle2 className="text-emerald-400" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Tersedia</p>
                <p className="text-2xl font-bold text-white">{tersedia}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <MapPin className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Sedang Tugas</p>
                <p className="text-2xl font-bold text-white">{sedangTugas}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/20 rounded-lg">
                <Wrench className="text-amber-400" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Maintenance</p>
                <p className="text-2xl font-bold text-white">{maintenance}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertTriangle className="text-red-400" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm">BBM Rendah</p>
                <p className="text-2xl font-bold text-white">{lowFuel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fleet.map((asset) => (
            <div
              key={asset.id}
              className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur border border-slate-700/50 rounded-xl p-5 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-slate-500 font-mono">{asset.code}</p>
                  <h3 className="text-lg font-bold text-white mt-1">{asset.name}</h3>
                </div>
                {getTypeBadge(asset.type)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">Plat:</span>
                  <span className="font-mono text-white bg-slate-700/50 px-2 py-0.5 rounded">
                    {asset.plateNumber}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">Driver:</span>
                  <span className="text-white">{asset.assignedDriver}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gauge size={16} className="text-slate-400" />
                  <span className="text-white">{asset.mileageKm.toLocaleString()} km</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Fuel size={16} className={getFuelColor(asset.fuelLevelPercent)} />
                  <span className={getFuelColor(asset.fuelLevelPercent)}>
                    {asset.fuelLevelPercent}% BBM
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {getStatusBadge(asset.status)}
              </div>

              <div className="flex gap-2">
                <select
                  value={asset.status}
                  onChange={(e) =>
                    updateFleetStatus(
                      asset.id,
                      e.target.value as "TERSEDIA" | "SEDANG_TUGAS" | "MAINTENANCE"
                    )
                  }
                  className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="TERSEDIA">Tersedia</option>
                  <option value="SEDANG_TUGAS">Sedang Tugas</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>

                <button
                  onClick={() => refuelFleet(asset.id)}
                  disabled={asset.fuelLevelPercent === 100}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <Fuel size={16} />
                  Isi BBM
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Asset Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Plus size={24} className="text-cyan-400" />
                Tambah Aset Fleet Baru
              </h2>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Kode Aset</label>
                  <input
                    type="text"
                    value={newAsset.code}
                    onChange={(e) => setNewAsset({ ...newAsset, code: e.target.value })}
                    placeholder="FLT-OPS-05"
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Nama Aset</label>
                  <input
                    type="text"
                    value={newAsset.name}
                    onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                    placeholder="Toyota Avanza 2024"
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Tipe</label>
                  <select
                    value={newAsset.type}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, type: e.target.value as FleetAsset["type"] })
                    }
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="MOBIL_OPERASIONAL">Mobil Operasional</option>
                    <option value="VAN_LOGISTIK">Van Logistik</option>
                    <option value="MOTOR_PATROLI">Motor Patroli</option>
                    <option value="FORKLIFT">Forklift</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Plat Nomor</label>
                  <input
                    type="text"
                    value={newAsset.plateNumber}
                    onChange={(e) => setNewAsset({ ...newAsset, plateNumber: e.target.value })}
                    placeholder="B 1234 XYZ"
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Driver Ditugaskan</label>
                  <input
                    type="text"
                    value={newAsset.assignedDriver}
                    onChange={(e) => setNewAsset({ ...newAsset, assignedDriver: e.target.value })}
                    placeholder="Nama Driver"
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Odometer (km)</label>
                  <input
                    type="number"
                    value={newAsset.mileageKm}
                    onChange={(e) =>
                      setNewAsset({ ...newAsset, mileageKm: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Level BBM (%)</label>
                  <input
                    type="number"
                    value={newAsset.fuelLevelPercent}
                    onChange={(e) =>
                      setNewAsset({
                        ...newAsset,
                        fuelLevelPercent: Math.min(100, parseInt(e.target.value) || 0),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddAsset}
                  className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors"
                >
                  Tambah Aset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
