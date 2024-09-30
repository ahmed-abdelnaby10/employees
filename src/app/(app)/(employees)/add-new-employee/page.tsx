import AddEmployee from "@/components/add-employee/AddEmployee";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add new employee"
}

export default function AddNewEmployee() {
    return (
        <div className="h-full flex-1 flex-col flex">
            <div className="flex items-center justify-between space-y-2">
                <div className="pt-8 px-8">
                    <h2 className="text-2xl font-bold tracking-tight">Add New Employee!</h2>
                    <p className="text-muted-foreground">
                        Enter the data of employee below.
                    </p>
                </div>
            </div>
            <AddEmployee />
        </div>
    )
}
