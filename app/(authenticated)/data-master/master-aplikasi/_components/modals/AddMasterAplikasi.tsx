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
  onClose: () => void
  onSave: (data: {
    nama_aplikasi: string
    versi: string
    deskripsi: string
  }) => void
}

export default function AddMasterAplikasi({ onClose, onSave }: Props) {

  const [nama, setNama] = useState("")
  const [versi, setVersi] = useState("")
  const [deskripsi, setDeskripsi] = useState("")

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Aplikasi</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Nama Aplikasi</Label>
            <Input value={nama} onChange={e => setNama(e.target.value)} />
          </div>
          <div>
            <Label>Versi</Label>
            <Input value={versi} onChange={e => setVersi(e.target.value)} />
          </div>
          <div>
            <Label>Deskripsi</Label>
            <Input value={deskripsi} onChange={e => setDeskripsi(e.target.value)} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={() => onSave({ nama_aplikasi: nama, versi, deskripsi })}>
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}