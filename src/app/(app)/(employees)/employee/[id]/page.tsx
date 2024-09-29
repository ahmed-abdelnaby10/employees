import EmployeePreview from "@/components/employee preview/EmployeePreview";

export default async function page({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                    <p className="text-muted-foreground">
                        Here&apos;s the preview data of your employee.
                    </p>
                </div>
            </div>
            <EmployeePreview employeeId={id} /> 
        </div>
    )
}