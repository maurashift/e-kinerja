'use client'

import { useState } from "react"
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

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: {
    nama_pegawai: string
    jabatan: string
    email: string
  }) => void
}

export default function AddMasterPegawai({
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const [nama, setNama] = useState("")
  const [jabatan, setJabatan] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = () => {
    if (!nama || !jabatan || !email) return

    onSubmit({
      nama_pegawai: nama,
      jabatan,
      email,
    })

    setNama("")
    setJabatan("")
    setEmail("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Pegawai</DialogTitle>
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