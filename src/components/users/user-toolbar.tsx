"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dispatch, SetStateAction } from "react"
import { UsersViewOptions } from "./user-view-options"

interface UsersToolbarProps<TData> {
  table: Table<TData>
  setNameFilter: Dispatch<SetStateAction<string | undefined>>
}
export function UsersToolbar<TData>({ table, setNameFilter }: UsersToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };
  return (
    <div className="flex items-center justify-between sm:flex-row flex-col w-full max-sm:gap-4">
      <div className="flex flex-1 items-center space-x-2 max-sm:w-full">
        <Input
          placeholder="Filter users..."
          onChange={handleSearch}
          className="h-8 w-[150px] lg:w-[250px] max-sm:w-full"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center sm:justify-start justify-between sm:gap-5 gap-2 max-sm:w-full">
        <UsersViewOptions table={table} />
      </div>
    </div>
  )
}
