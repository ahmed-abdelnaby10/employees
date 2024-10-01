"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { UsersPagination } from "./user-pagination"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import ResourceState from "../resource stats/resourceState"
import useMediaQuery from "@/hooks/useMediaQuery"
import { UsersToolbar } from "./user-toolbar"

interface UsersTableProps<UserInterface, TValue> {
  columns: ColumnDef<UserInterface, TValue>[]
  data: UserInterface[]
  isError: boolean
  isLoading: boolean
  limit: number
  page: number
  totalUsers: number
  totalPages: number
  setPagination: Dispatch<SetStateAction<PaginationState>>
  pagination: PaginationState
  setPage: Dispatch<SetStateAction<number>>
  setNameFilter: Dispatch<SetStateAction<string | undefined>>
  setSorting: Dispatch<SetStateAction<SortingState>>
  sorting: SortingState
}

export function UsersDataTable<UserInterface, TValue>({ 
  columns, 
  data, 
  isError, 
  isLoading, 
  page, 
  totalPages, 
  pagination, 
  setPagination, 
  setPage,
  setNameFilter,
  setSorting,
  sorting
}: UsersTableProps<UserInterface, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const isLessThan1024px = useMediaQuery("(max-width: 1024px)")
  const isLessThan768px = useMediaQuery("(max-width: 768px)")
  const isLessThan640px = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    if (isLessThan640px) {
      // Show only "Name" column
      setColumnVisibility({
        name: true,
        email: false,
        media: false,
        role: false,
        actions: true, 
      })
    } else if (isLessThan768px) {
      // Show only "ID" and "Name" columns
      setColumnVisibility({
        name: true,
        media: true,
        email: false,
        role: false,
        actions: true,
      })
    } else if (isLessThan1024px) {
      // Show all columns except "Email" and "Role"
      setColumnVisibility({
        name: true,
        media: true,
        email: false,
        role: false,
        actions: true,
      })
    } else {
      // Show all columns
      setColumnVisibility({
        name: true,
        media: true,
        email: true,
        role: true,
        actions: true,
      })
    }
  }, [isLessThan640px, isLessThan768px, isLessThan1024px])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })
  
  return (
    <div className="space-y-4">
      <UsersToolbar
        table={table} 
        setNameFilter={setNameFilter}
      />
      <div className="rounded-md border custom-scrollbar">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <TableRow key={headerGroup.id + index}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead key={header.id + index} colSpan={header.colSpan} className="">
                      {
                        header.isPlaceholder ? null :
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              isError ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <ResourceState message="There is something went happen. Please try again." isLoading={false} />
                  </TableCell>
                </TableRow>
              ) : isLoading ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    <ResourceState message="Please wait data is loading" isLoading={true} />
                  </TableCell>
                </TableRow>
              ) :
              Object.keys(table.getRowModel().rowsById).length ? (
                Object.values(table.getRowModel().rowsById).map((row, index) => (
                  <TableRow
                    key={row.id + index}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id + index} className="whitespace-nowrap max-sm:py-4">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
      </div>
      <UsersPagination 
        table={table} 
        pageCount={totalPages} 
        page={page} 
        setPage={setPage}
      />
    </div>
  )
}