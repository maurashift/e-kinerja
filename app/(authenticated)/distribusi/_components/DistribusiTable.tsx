"use client"

import * as React from "react"
import { useState } from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { toast } from "sonner"

import type { DistribusiItem } from "./DistribusiClient"

interface Props {
  data: DistribusiItem[]
  onEdit: (item: DistribusiItem) => void
  onDelete: (id: string) => void
}

export default function DistribusiTable({
  data,
  onEdit,
  onDelete,
}: Props) {

  const [openDelete, setOpenDelete] = useState(false)
  const [selectedRow, setSelectedRow] =
    useState<DistribusiItem | null>(null)

  const handleDeleteClick = (row: DistribusiItem) => {
    setSelectedRow(row)
    setOpenDelete(true)
  }

  const confirmDelete = () => {

    if (!selectedRow) return

    onDelete(selectedRow.id)

    toast.success("Distribusi berhasil dihapus")

    setOpenDelete(false)
    setSelectedRow(null)
  }

const columns: ColumnDef<DistribusiItem>[] = [

  {
    header: "No",
    cell: ({ row }) => (
      <div className="text-center">
        {row.index + 1}
      </div>
    ),
  },

  {
    accessorKey: "permintaan",
    header: "Permintaan",
  },

  {
    accessorKey: "admin",
    header: "Admin",
  },

    {
      header: "Programmer",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-2">
          {row.original.programmer.map((p, i) => (
            <span
              key={i}
              className="bg-muted px-2 py-1 rounded text-xs"
            >
              {p}
            </span>
          ))}
        </div>
      ),
    },

    {
      accessorKey: "komentar_admin",
      header: "Komentar",
    },

    {
      accessorKey: "created_at",
      header: "Created At",
    },

    {
      header: "Aksi",
      cell: ({ row }) => (
        <div className="flex gap-2">

          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(row.original)}
          >
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDeleteClick(row.original)}
          >
            Hapus
          </Button>

        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (

    <>

      <div className="border rounded-md">

        <Table>

          <TableHeader className="bg-muted">

            {table.getHeaderGroups().map((headerGroup) => (

              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map((header) => (

                  <TableHead key={header.id}>

                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                  </TableHead>

                ))}

              </TableRow>

            ))}

          </TableHeader>

          <TableBody>

            {table.getRowModel().rows.map((row) => (

              <TableRow key={row.id}>

                {row.getVisibleCells().map((cell) => (

                  <TableCell key={cell.id}>

                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}

                  </TableCell>

                ))}

              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>

      {/* DELETE MODAL */}

      <AlertDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
      >

        <AlertDialogContent>

          <AlertDialogHeader>

            <AlertDialogTitle>
              Hapus data distribusi?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Data yang sudah dihapus tidak dapat dikembalikan.
            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel>
              Batal
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white"
            >
              Hapus
            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </>
  )
}