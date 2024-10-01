"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useRouter } from "next/navigation"
import { Separator } from "../ui/separator"
import { format } from "date-fns"
import { calculateAge } from "@/utils/calulateAge"

export default function PersonalDetails({ employee }: { employee: Employee }) {
    const router = useRouter()
    return (
        <Card className="md:row-start-2 md:col-start-2 col-start-1 col-end-3 lg:col-start-3">
            <CardHeader className="flex items-center justify-between w-full flex-row px-6 py-4">
                <CardTitle>Personal Details</CardTitle>
                <Button 
                    onClick={()=>{router.push(`/update-employee/${employee?._id}`)}}
                    variant="outline"
                    size="sm"
                >
                    Edit
                </Button>
            </CardHeader>
            <Separator />
            <CardContent>
                <div className="flex flex-col items-start gap-5 pt-4">
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label>Gender</Label>
                            <p className="capitalize">{employee?.gender}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Date of birth</Label>
                            <p className="capitalize">{employee?.birth_date ? `${format(employee?.birth_date, "dd/MM/yyyy")} (${calculateAge(employee?.birth_date)})` : "Unknown!"}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Position</Label>
                            <p className="">{employee?.position}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Salary</Label>
                            <p className="">{employee?.fixed_salary}$</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Rewards</Label>
                            <p className="">{employee?.rewards}$</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Deductions</Label>
                            <p className="">{employee?.deductions}$</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Net Salary</Label>
                            <p className="">{employee?.final_salary}$</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
