/* eslint-disable react-hooks/rules-of-hooks */

import i18n from "@/util/i18n"
import { ColumnDef } from "@tanstack/react-table"
import { LuArrowUpDown, LuMoveHorizontal } from "react-icons/lu"  

export type Order = {
  _id: string
  name: string
  description: string
  set: (...args:any)=>void
}

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BsJournalBookmarkFill, BsJournalMedical, BsJournalText, BsJournalX } from "react-icons/bs"


export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {i18n.t('orders.code')}
          <LuArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: i18n.t('orders._status'),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <div className="flex mx-1">
            {
              row.getValue('status') === 'init' && <BsJournalMedical />
            }
            {
              row.getValue('status') === 'active' && <BsJournalText />
            }
            {
              row.getValue('status') === 'closed' && <BsJournalBookmarkFill />
            }
            {
              row.getValue('status') === 'error' && <BsJournalX />
            }
          </div>
          <div className="flex">
          {i18n.t(`orders.status.${row.getValue('status')}`)}
          </div>
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <div className="flex justify-end">
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <LuMoveHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order._id)}
              >
                Copiar codigo
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>{
                order.set(order)
              }} className="data-[highlighted]:text-teal-400">Ver orden</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]