import UpdateEmployee from "@/components/update-employee/UpdateEmployee";
import { Metadata } from "next";


export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
    const id = params.id.slice(0, 11)
    return {
        title: `Update ${id}`
    }
}

export default async function page({ params }: { params: { id: string } }) {
    const id = params.id;
    return (
        <div className="h-full flex-1 flex-col flex">
            <div className="flex items-center justify-between space-y-2">
                <div className="px-5 sm:px-8 pt-8">
                    <h2 className="text-2xl font-bold tracking-tight">Update Employee&apos;s Information!</h2>
                    <p className="text-muted-foreground">
                        Update the data of employee below.
                    </p>
                </div>
            </div>
            <UpdateEmployee
                employeeId={id}
            />
        </div>
    )
}
