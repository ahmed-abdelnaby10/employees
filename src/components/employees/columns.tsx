"use client"

import { ColumnDef } from "@tanstack/react-table"

import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"
import { Avatar, AvatarImage } from "../ui/avatar"
import { PREVIEW_URL } from "@/utils/constants"
import maleUserPlaceholder from "../../../public/images/male-user.png"

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "media",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const media: Media = row.getValue("media")

      if (!media) {
        return(
          <Avatar>
            <AvatarImage 
              src={`${maleUserPlaceholder.src}`}
            /> 
          </Avatar>
        )
      }

      return (
        <Avatar>
          <AvatarImage 
            src={`${PREVIEW_URL}${media.original_url}`}
          /> 
        </Avatar>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "contact",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const contact: Contact = row.getValue("contact")

      if (!contact) {
        return null
      }

      return (
        <div className="capitalize font-medium max-sm:text-[13px] text-base">{contact.first_name} {contact.second_name} {contact.third_name}</div>
      )
    },
    filterFn: (row, id, filterValue) => {
      const contact: Contact = row.getValue("contact")
      return contact?.first_name.toLowerCase().includes(filterValue.toLowerCase())
    },
  },
  {
    accessorKey: "contact.email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const contact: Contact = row.getValue("contact")

      if (!contact) {
        return null
      }

      return (
        <div className="capitalize font-medium text-base">{contact.email}</div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "fixed_salary",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Salary" />
    ),
    cell: ({ row }) => {
      const salary: number = row.getValue("fixed_salary")

      if (!salary) {
        return null
      }

      return (
        <div className="capitalize font-medium text-base">{salary}</div>
      )
    },
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => {
      const position: string = row.getValue("position")

      if (!position) {
        return null
      }

      return (
        <div className="capitalize font-medium text-base">{position}</div>
      )
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
