"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import PermintaanTable from "./PermintaanTable"
import AddPermintaan from "./modals/AddPermintaan"
import EditPermintaan from "./modals/EditPermintaan"

export interface PermintaanItem {
  id: string
  pemda: string
  nama_aplikasi: string
  menu: string
  kondisi_awal: string
  kondisi_diharapkan: string
  tanggal_pesanan: string
  tanggal_deadline: string
  dibuat_oleh: string
  created_at: string
}

export default function PermintaanClient() {

  const [data, setData] = useState<PermintaanItem[]>([
    {
      id: "1",
      pemda: "Pemda Kota Bandung",
      nama_aplikasi: "E-Kinerja",
      menu: "Dashboard",
      kondisi_awal: "Loading lama",
      kondisi_diharapkan: "Loading < 2 detik",
      tanggal_pesanan: "2025-06-01",
      tanggal_deadline: "2025-06-10",
      dibuat_oleh: "Agung",
      created_at: "2025-06-01",
    },
  ])

  const [showAdd, setShowAdd] = useState(false)
  const [editItem, setEditItem] = useState<PermintaanItem | null>(null)

  const handleAdd = (val: PermintaanItem) => {

    toast.success("Permintaan berhasil ditambahkan")

    setData(prev => [
      ...prev,
      { ...val, id: Date.now().toString() }
    ])

  }

  const handleEdit = (val: PermintaanItem) => {

    toast.success("Permintaan berhasil diperbarui")

    setData(prev =>
      prev.map(item =>
        item.id === val.id ? val : item
      )
    )

  }

  const handleDelete = (id: string) => {

    toast.success("Permintaan berhasil dihapus")

    setData(prev =>
      prev.filter(item => item.id !== id)
    )

  }

  return (

    <div className="px-4 space-y-6">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-semibold">
          Permintaan Klien
        </h2>

        <Button onClick={() => setShowAdd(true)}>
          + Tambah Permintaan
        </Button>

      </div>

      <PermintaanTable
        data={data}
        onEdit={setEditItem}
        onDelete={handleDelete}
      />

      {showAdd && (
        <AddPermintaan
          onClose={() => setShowAdd(false)}
          onSave={(val) => {
            handleAdd(val)
            setShowAdd(false)
          }}
        />
      )}

      {editItem && (
        <EditPermintaan
          data={editItem}
          onClose={() => setEditItem(null)}
          onSave={(val) => {
            handleEdit(val)
            setEditItem(null)
          }}
        />
      )}

    </div>

  )

}