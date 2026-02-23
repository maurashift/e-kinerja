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
    nama_pemda: string
    alamat: string
  }) => void
}

export default function AddMasterPemda({
  open,
  onOpenChange,
  onSubmit,
}: Props) {

  const [nama, setNama] = useState("")
  const [alamat, setAlamat] = useState("")

  const handleSubmit = () => {
    if (!nama || !alamat) return
    onSubmit({ nama_pemda: nama, alamat })
    setNama("")
    setAlamat("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Pemda</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nama Pemda</Label>
            <Input value={nama} onChange={(e) => setNama(e.target.value)} />
          </div>

          <div>
            <Label>Alamat</Label>
            <Input value={alamat} onChange={(e) => setAlamat(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}