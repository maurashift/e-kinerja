"use client"

import { useState } from "react"
import { toast } from "sonner"

import DistribusiTable from "./DistribusiTable"
import AssignDistribusiModal from "./modals/AssignDistribusiModal"

export interface DistribusiItem {
  id: string
  permintaan: string
  admin: string
  programmer: string[]
  komentar_admin: string
  created_at: string
}

export interface MasterPegawaiItem {
  id: string
  nama_pegawai: string
  jabatan: string
}

export default function DistribusiClient() {

  const masterPegawai: MasterPegawaiItem[] = [
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

  const [permintaan, setPermintaan] = useState([
    {
      id: "p1",
      pemda: "Pemda Kota Bandung",
      aplikasi: "E-Kinerja",
      menu: "Dashboard",
      deadline: "2025-06-15",
    },
    {
      id: "p2",
      pemda: "Pemda Kota Surabaya",
      aplikasi: "E-Kinerja",
      menu: "Laporan",
      deadline: "2025-06-20",
    },
  ])

  const [dataDistribusi, setDataDistribusi] =
    useState<DistribusiItem[]>([
      {
        id: "1",
        permintaan: "Pemda Kota Bandung - Dashboard",
        admin: "Maura",
        programmer: ["ASEP SURYANA"],
        komentar_admin: "Prioritas tinggi",
        created_at: "2025-03-05",
      },
      {
        id: "2",
        permintaan: "Pemda Kota Bandung - Dashboard",
        admin: "Maura",
        programmer: ["RIZKY MAULANA", "LINA WULANDARI"],
        komentar_admin: "Deadline ketat",
        created_at: "2025-03-06",
      },
    ])

  const [modalData, setModalData] = useState<any>(null)
  const [mode, setMode] =
    useState<"assign" | "edit">("assign")

  const handleAssign = (item: any) => {
    setMode("assign")
    setModalData(item)
  }

  const handleEdit = (item: DistribusiItem) => {
    setMode("edit")
    setModalData(item)
  }

  const handleSaveDistribusi = (val: {
    permintaan_id: string
    programmer: string[]
    komentar_admin: string
  }) => {

    const programmerNames = val.programmer.map(id => {
      const pegawai =
        masterPegawai.find(p => p.id === id)
      return pegawai?.nama_pegawai || ""
    })

    const permintaanSelected =
      permintaan.find(p => p.id === val.permintaan_id)

    if (!permintaanSelected) return

    if (mode === "assign") {

      const newItem: DistribusiItem = {
        id: crypto.randomUUID(),
        permintaan: `${permintaanSelected.pemda} - ${permintaanSelected.menu}`,
        admin: "Maura",
        programmer: programmerNames,
        komentar_admin: val.komentar_admin,
        created_at: new Date().toISOString().slice(0,10),
      }

      setDataDistribusi(prev => [...prev, newItem])

      setPermintaan(prev =>
        prev.filter(p => p.id !== permintaanSelected.id)
      )

      toast.success("Distribusi berhasil dibuat")

    } else {

      setDataDistribusi(prev =>
        prev.map(item =>
          item.id === modalData.id
            ? {
                ...item,
                permintaan: `${permintaanSelected.pemda} - ${permintaanSelected.menu}`,
                programmer: programmerNames,
                komentar_admin: val.komentar_admin,
              }
            : item
        )
      )

      toast.success("Distribusi berhasil diperbarui")
    }

    setModalData(null)
  }

  const handleDelete = (id: string) => {

    setDataDistribusi(prev =>
      prev.filter(item => item.id !== id)
    )

    toast.success("Distribusi berhasil dihapus")
  }

  return (

    <div className="space-y-6">

      <h2 className="text-xl font-semibold">
        Distribusi Pekerjaan
      </h2>

      <div className="space-y-4">

        {permintaan.map(item => (

          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg p-4"
          >

            <div>

              <div className="font-medium">
                {item.pemda}
              </div>

              <div className="text-muted-foreground text-sm">
                {item.aplikasi} - {item.menu}
              </div>

              <div className="text-sm">
                Deadline: {item.deadline}
              </div>

            </div>

            <button
              className="bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => handleAssign(item)}
            >
              Distribusikan
            </button>

          </div>

        ))}

      </div>

      <DistribusiTable
        data={dataDistribusi}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {modalData && (

        <AssignDistribusiModal
          data={modalData}
          masterPegawai={masterPegawai}
          permintaanList={permintaan}
          mode={mode}
          onClose={() => setModalData(null)}
          onSave={handleSaveDistribusi}
        />

      )}

    </div>

  )
}