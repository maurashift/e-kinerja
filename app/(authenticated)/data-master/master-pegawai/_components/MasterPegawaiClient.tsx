'use client'

import { useState } from "react"
import { Loader2, Plus } from "lucide-react"
import { toast } from "sonner"
import MasterPegawaiTable from "./MasterPegawaiTable"
import AddMasterPegawai from "./modals/AddMasterPegawai"
import EditMasterPegawai from "./modals/EditMasterPegawai"

export interface MasterPegawaiItem {
  id: string
  nama_pegawai: string
  jabatan: string
  email: string
}

export default function MasterPegawaiClient() {
  const [data, setData] = useState<MasterPegawaiItem[]>([
     { id: "1", nama_pegawai: "AGUNG LASIYANTO", jabatan: "Super Admin", email: "agung.lasiyanto@pemda.go.id" },
  { id: "2", nama_pegawai: "RATIH AMALIA", jabatan: "Admin", email: "ratih.amalia@pemda.go.id" },
  { id: "3", nama_pegawai: "ASEP SURYANA", jabatan: "Programmer - Level 1", email: "asep.suryana@pemda.go.id" },
  { id: "4", nama_pegawai: "BUDI SANTOSO", jabatan: "Verifikator - Level 2", email: "budi.santoso@pemda.go.id" },

  { id: "5", nama_pegawai: "SITI NURHALIZA", jabatan: "Admin", email: "siti.nurhaliza@pemda.go.id" },
  { id: "6", nama_pegawai: "DEDI SAPUTRA", jabatan: "Programmer - Level 1", email: "dedi.saputra@pemda.go.id" },
  { id: "7", nama_pegawai: "LINA WULANDARI", jabatan: "Verifikator - Level 2", email: "lina.wulandari@pemda.go.id" },
  { id: "8", nama_pegawai: "YOGA PRATAMA", jabatan: "Programmer - Level 1", email: "yoga.pratama@pemda.go.id" },

  { id: "9", nama_pegawai: "ANDI WIJAYA", jabatan: "Admin", email: "andi.wijaya@pemda.go.id" },
  { id: "10", nama_pegawai: "FITRI HANDAYANI", jabatan: "Verifikator - Level 2", email: "fitri.handayani@pemda.go.id" },
  { id: "11", nama_pegawai: "RIZKY MAULANA", jabatan: "Programmer - Level 1", email: "rizky.maulana@pemda.go.id" },
  { id: "12", nama_pegawai: "NURUL AISYAH", jabatan: "Admin", email: "nurul.aisyah@pemda.go.id" },

  { id: "13", nama_pegawai: "HENDRA GUNAWAN", jabatan: "Programmer - Level 1", email: "hendra.gunawan@pemda.go.id" },
  { id: "14", nama_pegawai: "MAYA PUTRI", jabatan: "Verifikator - Level 2", email: "maya.putri@pemda.go.id" },
  { id: "15", nama_pegawai: "ILHAM FAUZI", jabatan: "Admin", email: "ilham.fauzi@pemda.go.id" },
  { id: "16", nama_pegawai: "RINA KARTIKA", jabatan: "Programmer - Level 1", email: "rina.kartika@pemda.go.id" },

  { id: "17", nama_pegawai: "FARHAN RAMADHAN", jabatan: "Verifikator - Level 2", email: "farhan.ramadhan@pemda.go.id" },
  { id: "18", nama_pegawai: "PUTRI MAHARANI", jabatan: "Admin", email: "putri.maharani@pemda.go.id" },
  { id: "19", nama_pegawai: "AHMAD SYAHPUTRA", jabatan: "Programmer - Level 1", email: "ahmad.syahputra@pemda.go.id" },
  { id: "20", nama_pegawai: "INTAN PERMATASARI", jabatan: "Verifikator - Level 2", email: "intan.permatasari@pemda.go.id" },
  ])

  const [loading] = useState(false)
  const [showAdd, setShowAdd] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(item => item.id !== id))
    toast.success("Data berhasil dihapus")
  }

  const handleAdd = (newItem: Omit<MasterPegawaiItem, "id">) => {
    const newData: MasterPegawaiItem = {
      id: Date.now().toString(),
      ...newItem,
    }

    setData(prev => [...prev, newData])
    toast.success("Pegawai berhasil ditambahkan")
  }

  const handleEdit = (updatedItem: MasterPegawaiItem) => {
    setData(prev =>
      prev.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    )
    toast.success("Data berhasil diperbarui")
  }

  return (
    <div className="px-4">

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold tracking-tight">
          Master Pegawai
        </h2>

        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md font-bold text-sm transition"
        >
          <Plus className="size-4" />
          Tambah Pegawai
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <MasterPegawaiTable
          data={data}
          onEdit={setEditId}
          onDelete={handleDelete}
        />
      )}

      <AddMasterPegawai
        open={showAdd}
        onOpenChange={setShowAdd}
        onSubmit={handleAdd}
      />

      <EditMasterPegawai
        open={!!editId}
        idPegawai={editId}
        data={data}
        onOpenChange={(open) => {
          if (!open) setEditId(null)
        }}
        onSubmit={handleEdit}
      />

    </div>
  )
}