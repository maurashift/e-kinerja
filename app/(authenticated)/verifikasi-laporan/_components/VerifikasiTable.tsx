"use client"

import { Button } from "@/components/ui/button"
import type { VerifikasiItem } from "./VerifikasiClient"

interface Props {
  data: VerifikasiItem[]
  onVerify: (item: VerifikasiItem) => void
}

export default function VerifikasiTable({
  data,
  onVerify,
}: Props) {

  return (

    <div className="border rounded-md overflow-auto">

      <table className="w-full text-sm">

        <thead className="bg-muted">

          <tr>

            <th className="p-3 text-left">No</th>

            <th className="p-3 text-left">
              Laporan
            </th>

            <th className="p-3 text-left">
              Verifikator
            </th>

            <th className="p-3 text-left">
              Komentar
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Created At
            </th>

            <th className="p-3 text-center">
              Aksi
            </th>

          </tr>

        </thead>

        <tbody>

          {data.map((item, index) => (

            <tr key={item.id} className="border-t">

              <td className="p-3">
                {index + 1}
              </td>

              <td className="p-3">
                {item.laporan}
              </td>

              <td className="p-3">
                {item.verifikator}
              </td>

              <td className="p-3">
                {item.komentar_verifikator || "-"}
              </td>

              <td className="p-3 capitalize">
                {item.status}
              </td>

              <td className="p-3">
                {item.created_at}
              </td>

              <td className="p-3 text-center">

                <Button
                  size="sm"
                  onClick={() => onVerify(item)}
                >
                  Verifikasi
                </Button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )
}