"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import LaporanKinerjaTable from "./LaporanKinerjaTable"
import AddLaporanKinerja from "./modals/AddLaporanKinerja"
import EditLaporanKinerja from "./modals/EditLaporanKinerja"

export interface LaporanKinerjaItem {
  id: string
  permintaan: string
  programmer: string
  progress: string
  status: number
  created_at: string
  updated_at: string
}

/* ======================
   MASTER PEGAWAI
====================== */

const masterPegawai = [
  {
    id: "1",
    nama_pegawai: "ASEP SURYANA",
    jabatan: "Programmer - Level 1",
  },
  {
    id: "2",
    nama_pegawai: "RIZKY MAULANA",
    jabatan: "Programmer - Level 1",
  },
  {
    id: "3",
    nama_pegawai: "LINA WULANDARI",
    jabatan: "Programmer - Level 1",
  },
]

/* ======================
   PERMINTAAN (DUMMY)
====================== */

const permintaanList = [
  {
    id: "p1",
    pemda: "Pemda Kota Bandung",
    menu: "Dashboard",
  },
  {
    id: "p2",
    pemda: "Pemda Kota Surabaya",
    menu: "Laporan",
  },
]

export default function LaporanKinerjaClient() {

  /* ======================
     DATA DUMMY LAPORAN
  ====================== */

  const [data, setData] = useState<LaporanKinerjaItem[]>([
    {
      id: "1",
      permintaan: "Pemda Kota Bandung - Dashboard",
      programmer: "ASEP SURYANA",
      progress: "Optimasi query database untuk mempercepat loading dashboard.",
      status: 50,
      created_at: "2025-03-05",
      updated_at: "2025-03-05",
    },
    {
      id: "2",
      permintaan: "Pemda Kota Surabaya - Laporan",
      programmer: "LINA WULANDARI",
      progress: "Fitur laporan hampir selesai, sedang tahap testing.",
      status: 75,
      created_at: "2025-03-06",
      updated_at: "2025-03-06",
    },
  ])

  const [showAdd, setShowAdd] = useState(false)

  const [editItem, setEditItem] =
    useState<LaporanKinerjaItem | null>(null)

  /* ======================
     ADD
  ====================== */

  const handleAdd = (item: LaporanKinerjaItem) => {

    setData((prev) => [...prev, item])

    toast.success("Laporan kinerja berhasil ditambahkan")
  }

  /* ======================
     EDIT
  ====================== */

  const handleEdit = (item: LaporanKinerjaItem) => {

    setData((prev) =>
      prev.map((d) =>
        d.id === item.id ? item : d
      )
    )

    toast.success("Laporan kinerja berhasil diperbarui")
  }

  /* ======================
     DELETE
  ====================== */

  const handleDelete = (id: string) => {

    setData((prev) =>
      prev.filter((d) => d.id !== id)
    )

    toast.success("Laporan kinerja berhasil dihapus")
  }

  return (

    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Laporan Kinerja
        </h2>

        <Button
          onClick={() => setShowAdd(true)}
        >
          + Tambah Laporan
        </Button>

      </div>

      {/* TABLE */}

      <LaporanKinerjaTable
        data={data}
        onEdit={setEditItem}
        onDelete={handleDelete}
      />

      {/* MODAL ADD */}

      <AddLaporanKinerja
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onSave={handleAdd}
        permintaanList={permintaanList}
        masterPegawai={masterPegawai}
      />

      {/* MODAL EDIT */}

      <EditLaporanKinerja
        open={!!editItem}
        data={editItem}
        onClose={() => setEditItem(null)}
        onSave={handleEdit}
        permintaanList={permintaanList}
        masterPegawai={masterPegawai}
      />

    </div>

  )
}