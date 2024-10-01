'use client'

import NotAllowed from "@/components/resource stats/NotAllowed"
import { useSelector } from "@/lib/rtk";
import { useQuery } from "react-query"
import { useEffect, useState } from "react"
import { PaginationState, SortingState } from "@tanstack/react-table"
import useTablePagination from "@/hooks/usePagination"
import { UsersDataTable } from "./users-data-table";
import { usersColumns } from "./user-columns";
import { getAllUsers } from "@/_api/queries/users.query";

export default function Users() {
	const { name: currentUsername, role: currentUserRole } = useSelector(state => state.user);

	const { page, setPage } = useTablePagination()
	const [nameFilter, setNameFilter] = useState<string | undefined>(undefined);
	const [sorting, setSorting] = useState<SortingState>([{
		id: "",
		desc: false
	}])
	
	const sortBy = sorting[0].id === "name" ? "name" : sorting[0].id 
	const order = sorting[0].desc ? "desc" : "asc" as unknown as "asc" | "desc" | undefined

	const { data, isError, isLoading } = useQuery({
		queryKey: ['users', page, nameFilter, sortBy, order ],
		queryFn: () => getAllUsers({
		page: pagination.pageIndex + 1, 
		name: nameFilter, 
		sortBy, 
		order
		}),
		keepPreviousData: true,
	})
	
	const usersResponse: UsersData = data?.data?.data
	const users: UserInterface[] = usersResponse?.users
	
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: page - 1,
		pageSize: users?.length
	})

	useEffect(() => {
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
	}, [sortBy, order]);

	if (currentUserRole === "admin") {
		return (
			<NotAllowed />
		)
	}else {
		return (
			<div className="h-full flex-1 flex-col space-y-8 px-5 sm:px-8 py-8 flex">
				<div className="flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Welcome back, {currentUsername.slice(0, currentUsername.indexOf(" "))}!</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your users.
						</p>
					</div>
				</div>
				<UsersDataTable 
					isError={isError}
					isLoading={isLoading}
					data={users || []}
					page={usersResponse?.page}
					setPagination={setPagination}
					limit={usersResponse?.limit}
					totalUsers={usersResponse?.total_users}
					totalPages={usersResponse?.total_pages}
					columns={usersColumns} 
					pagination={pagination}
					setPage={setPage}
					setNameFilter={setNameFilter}
					setSorting={setSorting}
					sorting={sorting}
				/>
			</div>
		)
	}
}