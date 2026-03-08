"use client"

import * as React from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import type { LaporanKinerjaItem } from "./LaporanKinerjaClient"

interface Props {
  data: LaporanKinerjaItem[]
  onEdit: (item: LaporanKinerjaItem) => void
  onDelete: (id: string) => void
}

export default function LaporanKinerjaTable({
  data,
  onEdit,
  onDelete,
}: Props) {

  const columns: ColumnDef<LaporanKinerjaItem>[] = [

    {
      id: "no",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },

    {
      accessorKey: "permintaan",
      header: "Permintaan",
    },

    {
      accessorKey: "programmer",
      header: "Programmer",
    },

    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }) => (
        <div className="max-w-sm whitespace-normal wrap-break-word">
          {row.original.progress}
        </div>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {

        const value = row.original.status

        const colorMap: Record<number,string> = {
          0:"bg-gray-400",
          25:"bg-red-500",
          50:"bg-orange-500",
          75:"bg-yellow-400",
          100:"bg-green-500",
        }

        return (
          <span className={`px-3 py-1 rounded-full text-white text-xs ${colorMap[value]}`}>
            {value}%
          </span>
        )
      }
    },

    {
      accessorKey: "created_at",
      header: "Created At",
    },

    {
      accessorKey: "updated_at",
      header: "Updated At",
    },

    {
      id:"aksi",
      header:"Aksi",
      cell: ({row}) => (

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
            onClick={() => onDelete(row.original.id)}
          >
            Hapus
          </Button>

        </div>

      )
    }

  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (

    <div className="rounded-md border">

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

  )
}