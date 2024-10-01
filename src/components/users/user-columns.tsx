"use client"

import { ColumnDef } from "@tanstack/react-table"

import { UsersColumnHeader } from "./user-column-header"
import { UsersRowActions } from "./user-row-actions"
import { Avatar, AvatarImage } from "../ui/avatar"
import maleUserPlaceholder from "../../../public/images/male-user.png"

export const usersColumns: ColumnDef<UserInterface>[] = [
  {
    accessorKey: "media",
    id: "media",
    header: ({ column }) => (
      <UsersColumnHeader column={column} title="ID" />
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
            src={`${media.preview_url}`}
          /> 
        </Avatar>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => (
      <UsersColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const name: string = row.getValue("name")

      if (!name) {
        return null
      }

      return (
        <div className="capitalize font-medium max-sm:text-[13px] text-base">{name}</div>
      )
    },
    filterFn: (row, id, filterValue) => {
      const name: string = row.getValue("name")
      return name.toLowerCase().includes(filterValue.toLowerCase())
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => (
      <UsersColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      const email: string = row.getValue("email")

      if (!email) {
        return null
      }

      return (
        <div className="font-medium text-base">{email}</div>
      )
    },
    enableSorting: false
  },
  {
    accessorKey: "role",
    id: "role",
    header: ({ column }) => (
      <UsersColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role: string = row.getValue("role")

      if (!role) {
        return null
      }

      return (
        <div className="capitalize font-medium text-base">{role}</div>
      )
    },
  },
  {
    accessorKey: "actions",
    id: "actions",
    cell: ({ row }) => <UsersRowActions id={row.original._id} />,
  },
]
