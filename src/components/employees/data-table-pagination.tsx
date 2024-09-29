"use client"

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { useQueryClient } from "react-query"
import { Dispatch, SetStateAction } from "react"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  pageCount: number
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

export function DataTablePagination<TData>({ table, pageCount, page, setPage }: DataTablePaginationProps<TData>) {
  const queryClient = useQueryClient()

  const handlePageChange = (newPage: number) => {
    table.setPageIndex(newPage)
    console.log(table.getState().pagination.pageIndex);
    setPage(newPage + 1)
    
    queryClient.invalidateQueries(['employees', newPage + 1])
  }

  return (
    <div className="flex sm:items-center items-start justify-between sm:px-2 sm:flex-row flex-col sm:gap-0 gap-2.5">
      <div className="flex items-center sm:space-x-6 space-x-2 lg:space-x-8">
        <div className="flex sm:w-[100px] w-fit items-center justify-center text-sm font-medium">
          Page {page} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(0)}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(page - 2)}
            disabled={page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(page)}
            disabled={page === pageCount}
          > 
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handlePageChange(pageCount - 1)}
            disabled={page === pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}