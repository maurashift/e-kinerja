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
import type { MasterPemdaItem } from "../MasterPemdaClient"

interface Props {
  open: boolean
  idPemda: string | null
  data: MasterPemdaItem[]
  onOpenChange: (open: boolean) => void
  onSubmit: (data: MasterPemdaItem) => void
}

export default function EditMasterPemda({
  open,
  idPemda,
  data,
  onOpenChange,
  onSubmit,
}: Props) {

  const [nama, setNama] = useState("")
  const [alamat, setAlamat] = useState("")

  useEffect(() => {
    if (!idPemda) return
    const selected = data.find(item => item.id === idPemda)
    if (selected) {
      setNama(selected.nama_pemda)
      setAlamat(selected.alamat)
    }
  }, [idPemda, data])

  const handleSubmit = () => {
    if (!idPemda) return
    onSubmit({
      id: idPemda,
      nama_pemda: nama,
      alamat,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Pemda</DialogTitle>
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