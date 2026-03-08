"use client"

import { useState } from "react"
import { toast } from "sonner"

import VerifikasiTable from "./VerifikasiTable"
import VerifikasiModal from "./modals/VerifikasiModal"

export interface VerifikasiItem {
  id: string
  laporan: string
  verifikator: string
  komentar_verifikator?: string
  status: "disetujui" | "revisi" | "menunggu"
  created_at: string
}

export default function VerifikasiClient() {

  const [data, setData] = useState<VerifikasiItem[]>([
    {
      id: "1",
      laporan: "Pemda Bandung - Dashboard",
      verifikator: "Admin Bappeda",
      komentar_verifikator: "",
      status: "menunggu",
      created_at: "2025-03-06",
    },
  ])

  const [selected, setSelected] =
    useState<VerifikasiItem | null>(null)

  const handleSave = (updated: VerifikasiItem) => {

    setData(prev =>
      prev.map(d =>
        d.id === updated.id ? updated : d
      )
    )

    toast.success("Verifikasi laporan berhasil disimpan")
  }

  return (

    <div className="space-y-6">

      <h2 className="text-2xl font-bold">
        Verifikasi Laporan
      </h2>

      <VerifikasiTable
        data={data}
        onVerify={(item) => setSelected(item)}
      />

      {selected && (

        <VerifikasiModal
          data={selected}
          onClose={() => setSelected(null)}
          onSave={handleSave}
        />

      )}

    </div>

  )
}