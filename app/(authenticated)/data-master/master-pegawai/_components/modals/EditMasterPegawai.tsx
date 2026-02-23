'use client'

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { MasterPegawaiItem } from "../MasterPegawaiClient"

interface Props {
  open: boolean
  idPegawai: string | null
  data: MasterPegawaiItem[]
  onOpenChange: (open: boolean) => void
  onSubmit: (data: MasterPegawaiItem) => void
}

export default function EditMasterPegawai({
  open,
  idPegawai,
  data,
  onOpenChange,
  onSubmit,
}: Props) {
  const [nama, setNama] = useState("")
  const [jabatan, setJabatan] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (!idPegawai) return

    const selected = data.find(item => item.id === idPegawai)
    if (selected) {
      setNama(selected.nama_pegawai)
      setJabatan(selected.jabatan)
      setEmail(selected.email)
    }
  }, [idPegawai, data])

  const handleSubmit = () => {
    if (!idPegawai) return

    onSubmit({
      id: idPegawai,
      nama_pegawai: nama,
      jabatan,
      email,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Pegawai</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nama Pegawai</Label>
            <Input
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div>
            <Label>Jabatan</Label>
            <Input
              value={jabatan}
              onChange={(e) => setJabatan(e.target.value)}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
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