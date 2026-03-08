"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import { toast } from "sonner"

import type { VerifikasiItem } from "../VerifikasiClient"

interface Props {
  data: VerifikasiItem
  onClose: () => void
  onSave: (item: VerifikasiItem) => void
}

export default function VerifikasiModal({
  data,
  onClose,
  onSave,
}: Props) {

  const [komentar, setKomentar] =
    useState(data.komentar_verifikator || "")

  const [status, setStatus] =
    useState<VerifikasiItem["status"]>(
      data.status
    )

  const handleSubmit = () => {

    if (!komentar) {

      toast.error(
        "Komentar verifikator harus diisi"
      )

      return
    }

    const updated: VerifikasiItem = {

      ...data,

      komentar_verifikator: komentar,

      status,
    }

    onSave(updated)

    toast.success(
      "Verifikasi laporan berhasil"
    )

    onClose()
  }

  return (

    <Dialog open onOpenChange={onClose}>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Verifikasi Laporan
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-4">

          {/* KOMENTAR */}

          <div>

            <Label>
              Komentar Verifikator
            </Label>

            <Textarea
              value={komentar}
              onChange={(e) =>
                setKomentar(e.target.value)
              }
              placeholder="Tuliskan komentar hasil verifikasi..."
            />

            <p className="text-xs text-muted-foreground mt-1">
              Berikan catatan atau evaluasi
              terhadap laporan kinerja
            </p>

          </div>

          {/* STATUS */}

          <div>

            <Label>Status Verifikasi</Label>

            <select
              className="w-full border rounded-md p-2"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as VerifikasiItem["status"]
                )
              }
            >

              <option value="menunggu">
                Menunggu
              </option>

              <option value="disetujui">
                Disetujui
              </option>

              <option value="revisi">
                Perlu Revisi
              </option>

            </select>

            <p className="text-xs text-muted-foreground mt-1">
              Pilih hasil verifikasi laporan
            </p>

          </div>

          <div className="flex justify-end gap-2">

            <Button
              variant="outline"
              onClick={onClose}
            >
              Batal
            </Button>

            <Button onClick={handleSubmit}>
              Simpan
            </Button>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  )
}