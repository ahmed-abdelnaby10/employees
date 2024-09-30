"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/sections/employees/data-table-view-options"
import { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  setNameFilter: Dispatch<SetStateAction<string | undefined>>
}
export function DataTableToolbar<TData>({ table, setNameFilter }: DataTableToolbarProps<TData>) {
  const router = useRouter()
  const isFiltered = table.getState().columnFilters.length > 0

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
  };
  return (
    <div className="flex items-center justify-between sm:flex-row flex-col w-full max-sm:gap-4">
      <div className="flex flex-1 items-center space-x-2 max-sm:w-full">
        <Input
          placeholder="Filter employees..."
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
        <DataTableViewOptions table={table} />
        <Button
          onClick={()=>{router.push("/add-new-employee")}}
          className="h-8 flex items-center sm:justify-between sm:gap-1 gap-0"
        >
        <PlusCircle className="w-4"/>
        <span className="text-xs sm:block hidden">Add Employee</span>
      </Button>
      </div>
    </div>
  )
}
