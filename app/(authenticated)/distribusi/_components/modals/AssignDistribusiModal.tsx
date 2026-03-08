"use client"

import { useEffect, useMemo, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { toast } from "sonner"

export interface MasterPegawaiItem {
  id: string
  nama_pegawai: string
  jabatan: string
}

interface Props {
  data: any
  masterPegawai: MasterPegawaiItem[]
  permintaanList: any[]
  onClose: () => void
  onSave: (val: {
    permintaan_id: string
    programmer: string[]
    komentar_admin: string
  }) => void
  mode?: "assign" | "edit"
}

export default function AssignDistribusiModal({
  data,
  masterPegawai,
  permintaanList,
  onClose,
  onSave,
  mode = "assign",
}: Props) {

  const [selectedProgrammer, setSelectedProgrammer] =
    useState<string[]>([])

  const [komentar, setKomentar] = useState("")

  const [permintaanId, setPermintaanId] =
    useState(data?.id || "")

  const programmerOptions = useMemo(() => {
    return masterPegawai.filter(
      p => p.jabatan === "Programmer - Level 1"
    )
  }, [masterPegawai])

  useEffect(() => {

    if (mode === "edit") {

      const ids = programmerOptions
        .filter(p =>
          data.programmer?.includes(p.nama_pegawai)
        )
        .map(p => p.id)

      setSelectedProgrammer(ids)
      setKomentar(data.komentar_admin || "")
    }

  }, [data, mode, programmerOptions])

  const handleAddProgrammer = (id: string) => {

    if (!selectedProgrammer.includes(id)) {
      setSelectedProgrammer(prev => [...prev, id])
    }

  }

  const handleRemoveProgrammer = (id: string) => {
    setSelectedProgrammer(prev =>
      prev.filter(p => p !== id)
    )
  }

  const handleSubmit = () => {

    if (!permintaanId) {
      toast.error("Permintaan belum dipilih")
      return
    }

    if (selectedProgrammer.length === 0) {
      toast.error("Programmer belum dipilih")
      return
    }

    onSave({
      permintaan_id: permintaanId,
      programmer: selectedProgrammer,
      komentar_admin: komentar,
    })

  }

  return (

    <Dialog open onOpenChange={onClose}>

      <DialogContent className="sm:max-w-lg">

        <DialogHeader>

          <DialogTitle>

            {mode === "edit"
              ? "Edit Distribusi"
              : "Distribusi ke Programmer"}

          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          {/* PERMINTAAN */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Permintaan
            </label>

            <Select
              value={permintaanId}
              onValueChange={setPermintaanId}
            >

              <SelectTrigger>
                <SelectValue placeholder="Pilih permintaan..." />
              </SelectTrigger>

              <SelectContent>

                {permintaanList.map(p => (

                  <SelectItem
                    key={p.id}
                    value={p.id}
                  >
                    {p.pemda} - {p.menu}
                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>

          {/* PROGRAMMER */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Programmer
            </label>

            <Select onValueChange={handleAddProgrammer}>

              <SelectTrigger>
                <SelectValue placeholder="Pilih programmer..." />
              </SelectTrigger>

              <SelectContent>

                {programmerOptions.map(p => (

                  <SelectItem
                    key={p.id}
                    value={p.id}
                  >
                    {p.nama_pegawai}
                  </SelectItem>

                ))}

              </SelectContent>

            </Select>

          </div>

          {selectedProgrammer.length > 0 && (

            <div className="flex flex-wrap gap-2">

              {selectedProgrammer.map(id => {

                const programmer =
                  programmerOptions.find(
                    p => p.id === id
                  )

                if (!programmer) return null

                return (

                  <Badge
                    key={id}
                    variant="secondary"
                    className="flex items-center gap-2"
                  >

                    {programmer.nama_pegawai}

                    <button
                      onClick={() =>
                        handleRemoveProgrammer(id)
                      }
                    >
                      <X size={14} />
                    </button>

                  </Badge>

                )
              })}

            </div>

          )}

          {/* KOMENTAR */}

          <div className="space-y-2">

            <label className="text-sm font-medium">
              Komentar
            </label>

            <Textarea
              value={komentar}
              onChange={e =>
                setKomentar(e.target.value)
              }
              placeholder="Masukkan komentar..."
            />

          </div>

        </div>

        <DialogFooter>

          <Button
            variant="outline"
            onClick={onClose}
          >
            Batal
          </Button>

          <Button onClick={handleSubmit}>
            Simpan
          </Button>

        </DialogFooter>

      </DialogContent>

    </Dialog>
  )
}