'use client'

import { useState } from "react"
import { Plus } from "lucide-react"
import MasterAplikasiTable from "./MasterAplikasiTable"
import AddMasterAplikasi from "./modals/AddMasterAplikasi"
import EditMasterAplikasi from "./modals/EditMasterAplikasi"

export interface MasterAplikasiItem {
  id: string
  nama_aplikasi: string
  versi: string
  deskripsi: string
}

export default function MasterAplikasiClient() {

  const [data, setData] = useState<MasterAplikasiItem[]>([
    { id: "1", nama_aplikasi: "E-Kinerja", versi: "1.0.0", deskripsi: "Sistem monitoring kinerja pegawai" },
    { id: "2", nama_aplikasi: "E-Planning", versi: "2.1.3", deskripsi: "Perencanaan program & kegiatan" },
    { id: "3", nama_aplikasi: "E-Budgeting", versi: "1.4.2", deskripsi: "Pengelolaan anggaran daerah" },
    { id: "4", nama_aplikasi: "E-Absensi", versi: "3.0.1", deskripsi: "Sistem absensi digital pegawai" },
    { id: "5", nama_aplikasi: "E-Office", versi: "2.0.0", deskripsi: "Manajemen surat & dokumen" },
  ])

  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id))
  }

  const handleAdd = (newItem: Omit<MasterAplikasiItem, "id">) => {
    const newData = {
      id: Date.now().toString(),
      ...newItem,
    }
    setData(prev => [...prev, newData])
  }

  const handleEdit = (updated: MasterAplikasiItem) => {
    setData(prev =>
      prev.map(item => item.id === updated.id ? updated : item)
    )
  }

  const selectedData = data.find(item => item.id === editId)

  return (
    <div className="px-4 space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Master Aplikasi</h2>

        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold"
        >
          <Plus className="h-4 w-4" />
          Tambah Aplikasi
        </button>
      </div>

      <MasterAplikasiTable
        data={data}
        onEdit={setEditId}
        onDelete={handleDelete}
      />

      {showAdd && (
        <AddMasterAplikasi
          onClose={() => setShowAdd(false)}
          onSave={(data) => {
            handleAdd(data)
            setShowAdd(false)
          }}
        />
      )}

      {editId && selectedData && (
        <EditMasterAplikasi
          data={selectedData}
          onClose={() => setEditId(null)}
          onSave={(updated) => {
            handleEdit(updated)
            setEditId(null)
          }}
        />
      )}

    </div>
  )
}