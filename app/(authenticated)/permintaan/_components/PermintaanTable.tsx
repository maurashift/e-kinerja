"use client"

import * as React from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  ArrowUp,
  ArrowDown,
  Filter,
  EyeOff,
  Settings2,
  MoreVertical,
} from "lucide-react"

import type { PermintaanItem } from "./PermintaanClient"

interface Props {
  data: PermintaanItem[]
  onEdit: (item: PermintaanItem) => void
  onDelete: (id: string) => void
}

export default function PermintaanTable({
  data,
  onEdit,
  onDelete,
}: Props) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns: ColumnDef<PermintaanItem>[] = [

    {
      id: "no",
      header: "No",
      cell: ({ row }) => row.index + 1,
      enableSorting: false,
    },

    { accessorKey: "pemda", header: "Pemda" },

    { accessorKey: "nama_aplikasi", header: "Aplikasi" },

    { accessorKey: "menu", header: "Menu" },

    { accessorKey: "kondisi_awal", header: "Kondisi Awal" },

    { accessorKey: "kondisi_diharapkan", header: "Kondisi Diharapkan" },

    { accessorKey: "tanggal_pesanan", header: "Tanggal Pesanan" },

    { accessorKey: "tanggal_deadline", header: "Deadline" },

    { accessorKey: "dibuat_oleh", header: "Dibuat Oleh" },

    { accessorKey: "created_at", header: "Created At" },

    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => (

        <div className="flex gap-2 justify-center">

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

      ),
      enableSorting: false,
    },

  ]

  const table = useReactTable({

    data,
    columns,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

  })

  return (

    <div className="w-full min-w-0 space-y-4">

      <div className="rounded-md border bg-background w-full overflow-hidden flex flex-col">

        <div className="w-full overflow-auto max-h-[60vh]">

          <Table>

            <TableHeader className="bg-muted">

              {table.getHeaderGroups().map(headerGroup => (

                <TableRow key={headerGroup.id}>

                  {headerGroup.headers.map(header => (

                    <TableHead key={header.id} className="whitespace-nowrap">

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

              {table.getRowModel().rows.map(row => (

                <TableRow key={row.id}>

                  {row.getVisibleCells().map(cell => (

                    <TableCell key={cell.id} className="whitespace-nowrap">

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

      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">

        <div>
          Halaman {table.getState().pagination.pageIndex + 1} dari{" "}
          {table.getPageCount() || 1}
        </div>

        <div className="flex space-x-2">

          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Sebelumnya
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Selanjutnya
          </Button>

        </div>

      </div>

    </div>

  )

}