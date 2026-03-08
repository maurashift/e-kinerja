"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

import type { PermintaanItem } from "../PermintaanClient"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Calendar } from "@/components/ui/calendar"

interface Props {
  initialData?: PermintaanItem
  onClose: () => void
  onSave: (val: PermintaanItem) => void
}

export default function AddPermintaan({
  initialData,
  onClose,
  onSave,
}: Props) {

  const [form, setForm] = useState({
    pemda: initialData?.pemda || "",
    nama_aplikasi: initialData?.nama_aplikasi || "",
    menu: initialData?.menu || "",
    kondisi_awal: initialData?.kondisi_awal || "",
    kondisi_diharapkan: initialData?.kondisi_diharapkan || "",
    dibuat_oleh: initialData?.dibuat_oleh || "",
  })

  const [tanggalPesanan, setTanggalPesanan] = useState<Date | undefined>(
    initialData?.tanggal_pesanan
      ? new Date(initialData.tanggal_pesanan)
      : undefined
  )

  const [tanggalDeadline, setTanggalDeadline] = useState<Date | undefined>(
    initialData?.tanggal_deadline
      ? new Date(initialData.tanggal_deadline)
      : undefined
  )

  const FieldNote = ({ label }: { label: string }) => (
    <p className="text-xs text-muted-foreground mt-1">
      * {label} harus diisi
    </p>
  )

  const handleSubmit = () => {

    if (!form.pemda) return toast.error("Pemda harus diisi")
    if (!form.nama_aplikasi) return toast.error("Aplikasi harus diisi")
    if (!form.menu) return toast.error("Menu harus diisi")
    if (!form.kondisi_awal) return toast.error("Kondisi awal harus diisi")
    if (!form.kondisi_diharapkan) return toast.error("Kondisi yang diharapkan harus diisi")
    if (!tanggalPesanan) return toast.error("Tanggal pesanan harus diisi")
    if (!tanggalDeadline) return toast.error("Deadline harus diisi")
    if (!form.dibuat_oleh) return toast.error("Dibuat oleh harus diisi")

    onSave({
      id: initialData?.id || crypto.randomUUID(),
      ...form,
      tanggal_pesanan: format(tanggalPesanan, "yyyy-MM-dd"),
      tanggal_deadline: format(tanggalDeadline, "yyyy-MM-dd"),
      created_at: new Date().toISOString().slice(0,10),
    })

  }

  return (

    <Dialog open onOpenChange={onClose}>

      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Permintaan" : "Tambah Permintaan"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">

          {/* PEMDA */}
          <div>
            <Label className="uppercase text-xs font-semibold">Pemda :</Label>
            <div className="mt-2">
              <Input
                value={form.pemda}
                onChange={e =>
                  setForm({ ...form, pemda: e.target.value })
                }
              />
            </div>
            <FieldNote label="Pemda" />
          </div>

          {/* APLIKASI */}
          <div>
            <Label className="uppercase text-xs font-semibold">Aplikasi :</Label>
            <div className="mt-2">
              <Input
                value={form.nama_aplikasi}
                onChange={e =>
                  setForm({
                    ...form,
                    nama_aplikasi: e.target.value,
                  })
                }
              />
            </div>
            <FieldNote label="Aplikasi" />
          </div>

          {/* MENU */}
          <div>
            <Label className="uppercase text-xs font-semibold">Menu :</Label>
            <div className="mt-2">
              <Input
                value={form.menu}
                onChange={e =>
                  setForm({ ...form, menu: e.target.value })
                }
              />
            </div>
            <FieldNote label="Menu" />
          </div>

          {/* KONDISI AWAL */}
          <div>
            <Label className="uppercase text-xs font-semibold">Kondisi Awal :</Label>
            <div className="mt-2">
              <Textarea
                value={form.kondisi_awal}
                onChange={e =>
                  setForm({
                    ...form,
                    kondisi_awal: e.target.value,
                  })
                }
              />
            </div>
            <FieldNote label="Kondisi awal" />
          </div>

          {/* KONDISI DIHARAPKAN */}
          <div>
            <Label className="uppercase text-xs font-semibold">Kondisi Diharapkan :</Label>
            <div className="mt-2">
              <Textarea
                value={form.kondisi_diharapkan}
                onChange={e =>
                  setForm({
                    ...form,
                    kondisi_diharapkan: e.target.value,
                  })
                }
              />
            </div>
            <FieldNote label="Kondisi yang diharapkan" />
          </div>

          {/* TANGGAL PESANAN */}
          <div>
            <Label className="uppercase text-xs font-semibold">Tanggal Pesanan :</Label>

            <div className="mt-2">

              <Popover>
                <PopoverTrigger asChild>

                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tanggalPesanan && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {tanggalPesanan
                      ? format(tanggalPesanan, "PPP")
                      : "Pilih tanggal"}

                  </Button>

                </PopoverTrigger>

                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={tanggalPesanan}
                    onSelect={setTanggalPesanan}
                  />
                </PopoverContent>

              </Popover>

            </div>

            <FieldNote label="Tanggal pesanan" />

          </div>

          {/* DEADLINE */}
          <div>
            <Label className="uppercase text-xs font-semibold">Deadline :</Label>

            <div className="mt-2">

              <Popover>
                <PopoverTrigger asChild>

                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tanggalDeadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />

                    {tanggalDeadline
                      ? format(tanggalDeadline, "PPP")
                      : "Pilih tanggal"}

                  </Button>

                </PopoverTrigger>

                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={tanggalDeadline}
                    onSelect={setTanggalDeadline}
                  />
                </PopoverContent>

              </Popover>

            </div>

            <FieldNote label="Deadline" />

          </div>

          {/* DIBUAT OLEH */}
          <div>
            <Label className="uppercase text-xs font-semibold">Dibuat Oleh :</Label>

            <div className="mt-2">
              <Input
                value={form.dibuat_oleh}
                onChange={e =>
                  setForm({
                    ...form,
                    dibuat_oleh: e.target.value,
                  })
                }
              />
            </div>

            <FieldNote label="Dibuat oleh" />
          </div>

        </div>

        <DialogFooter className="pt-4">

          <Button variant="outline" onClick={onClose}>
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