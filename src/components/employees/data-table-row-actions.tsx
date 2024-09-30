"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useQueryClient } from "react-query"
import { deleteEmployee } from "@/_api/mutations/deleteEmployee.mutation"
import toast, { Toaster } from "react-hot-toast"
import { useTheme } from "next-themes"

export function DataTableRowActions({ id }: { id: any }) {
  const router = useRouter()
  const { theme } = useTheme()
  const queryClient = useQueryClient();

  const handleDelete = async (employeeId: string) => {
    try {
      const { status } = await deleteEmployee(employeeId)
      queryClient.invalidateQueries({
        queryKey: ["employees"],
      });
      if (status === 200) {
        toast.success("Employee deleted successfully!")
      }
    } catch (error) {
      toast.error("There is something went wrong! try again.")
    }
  }

  return (
    <DropdownMenu>
      <Toaster 
        position="top-center"
        reverseOrder={true}
        toastOptions={{
            style: {
              background: theme === "dark" ? '#363636' : '#fff',
              color: theme === "dark" ? '#fff' : '#000',
            }
        }}
      />
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={()=>{router.push(`/employee/${id}`)}}
        >
          View
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={()=>{router.push(`/update-employee/${id}`)}}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="cursor-pointer"
          onClick={()=> {handleDelete(id)}}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
