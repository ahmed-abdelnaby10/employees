'use client'

import { DataTable } from "@/sections/employees/data-table"
import { columns } from "@/sections/employees/columns"
import { useQuery } from "react-query"
import { getAllEmployees } from "@/_api/queries/employees.query"
import { useEffect, useState } from "react"
import { PaginationState, SortingState } from "@tanstack/react-table"
import useTablePagination from "@/hooks/usePagination"

export default function Page() {
  const { page, setPage } = useTablePagination()
  const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
  const [sorting, setSorting] = useState<SortingState>([{
    id: "",
    desc: false
  }])
  
  const sortBy = sorting[0].id === "contact" ? "contact.first_name" : sorting[0].id 
  const order = sorting[0].desc ? "desc" : "asc" as unknown as "asc" | "desc" | undefined

  const { data, isError, isLoading } = useQuery({
    queryKey: ['employees', page, nameFilter, sortBy, order ],
    queryFn: () => getAllEmployees({
      page: pagination.pageIndex + 1, 
      name: nameFilter, 
      sortBy, 
      order
    }),
    keepPreviousData: true,
  })
  
  const employeesResponse: EmployeesData = data?.data?.data
  const employees: Employee[] = employeesResponse?.employees
  
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: employees?.length
  })

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [sortBy, order]);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your employees.
          </p>
        </div>
      </div>
      <DataTable 
        isError={isError}
        isLoading={isLoading}
        data={employees || []}
        page={employeesResponse?.page}
        setPagination={setPagination}
        limit={employeesResponse?.limit}
        totalEmployees={employeesResponse?.total_employees}
        totalPages={employeesResponse?.total_pages}
        columns={columns} 
        pagination={pagination}
        setPage={setPage}
        setNameFilter={setNameFilter}
        setSorting={setSorting}
        sorting={sorting}
      />
    </div>
  )
}
