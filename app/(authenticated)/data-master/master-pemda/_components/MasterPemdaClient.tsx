'use client'

import { useState } from "react"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import MasterPemdaTable from "./MasterPemdaTable"
import AddMasterPemda from "./modals/AddMasterPemda"
import EditMasterPemda from "./modals/EditMasterPemda"

export interface MasterPemdaItem {
  id: string
  nama_pemda: string
  alamat: string
}

export default function MasterPemdaClient() {
  const [data, setData] = useState<MasterPemdaItem[]>([
    { id: "1", nama_pemda: "Pemda Kota Bandung", alamat: "Jl. Wastukencana No.2" },
  { id: "2", nama_pemda: "Pemda Kabupaten Bandung", alamat: "Jl. Soreang No.17" },
  { id: "3", nama_pemda: "Pemda Kota Surabaya", alamat: "Jl. Jimerto No.25" },
  { id: "4", nama_pemda: "Pemda Kabupaten Sidoarjo", alamat: "Jl. Ahmad Yani No.1" },
  { id: "5", nama_pemda: "Pemda Kota Palembang", alamat: "Jl. Merdeka No.1" },
  { id: "6", nama_pemda: "Pemda Kabupaten Banyuasin", alamat: "Jl. KH Azhari No.12" },
  { id: "7", nama_pemda: "Pemda Kota Medan", alamat: "Jl. Kapten Maulana Lubis" },
  { id: "8", nama_pemda: "Pemda Kabupaten Deli Serdang", alamat: "Jl. Negara No.3" },
  { id: "9", nama_pemda: "Pemda Kota Yogyakarta", alamat: "Jl. Kenari No.56" },
  { id: "10", nama_pemda: "Pemda Kabupaten Sleman", alamat: "Jl. Parasamya No.1" },
  { id: "11", nama_pemda: "Pemda Kota Semarang", alamat: "Jl. Pemuda No.148" },
  { id: "12", nama_pemda: "Pemda Kabupaten Kendal", alamat: "Jl. Soekarno-Hatta No.193" },
  { id: "13", nama_pemda: "Pemda Kota Makassar", alamat: "Jl. Jend. Sudirman No.1" },
  { id: "14", nama_pemda: "Pemda Kabupaten Gowa", alamat: "Jl. Mesjid Raya No.30" },
  { id: "15", nama_pemda: "Pemda Kota Denpasar", alamat: "Jl. Raya Puputan No.7" },
  { id: "16", nama_pemda: "Pemda Kabupaten Badung", alamat: "Jl. Raya Sempidi No.1" },
  { id: "17", nama_pemda: "Pemda Kota Malang", alamat: "Jl. Tugu No.1" },
  { id: "18", nama_pemda: "Pemda Kabupaten Malang", alamat: "Jl. Panji No.158" },
  { id: "19", nama_pemda: "Pemda Kota Bogor", alamat: "Jl. Ir. H. Juanda No.10" },
  { id: "20", nama_pemda: "Pemda Kabupaten Bogor", alamat: "Jl. Tegar Beriman No.1" },
  ])

  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id))
    toast.success("Data berhasil dihapus")
  }

  const handleAdd = (item: Omit<MasterPemdaItem, "id">) => {
    setData(prev => [
      ...prev,
      { id: Date.now().toString(), ...item }
    ])
    toast.success("Pemda berhasil ditambahkan")
  }

  const handleEdit = (updated: MasterPemdaItem) => {
    setData(prev =>
      prev.map(item =>
        item.id === updated.id ? updated : item
      )
    )
    toast.success("Data berhasil diperbarui")
  }

  return (
    <div className="px-4">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Master Pemda
        </h2>

        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-bold text-sm transition"
        >
          <Plus className="size-4" />
          Tambah Pemda
        </button>
      </div>

      <MasterPemdaTable
        data={data}
        onEdit={setEditId}
        onDelete={handleDelete}
      />

      <AddMasterPemda
        open={showAdd}
        onOpenChange={setShowAdd}
        onSubmit={handleAdd}
      />

      <EditMasterPemda
        open={!!editId}
        idPemda={editId}
        data={data}
        onOpenChange={(open) => {
          if (!open) setEditId(null)
        }}
        onSubmit={handleEdit}
      />
    </div>
  )
}