"use client"

import { getEmployeeById } from "@/_api/queries/employees.query"
import { useQuery } from "react-query"
import DatesInformation from "./DatesInformation"
import GeneralDetails from "./GeneralDetails"
import PersonalDetails from "./PersonalDetails"

export default function EmployeePreview({ employeeId }: { employeeId: string }) {
    const { data } = useQuery({
        queryKey: ['employeeById'],
        queryFn: () => getEmployeeById(employeeId),
    })
        
    const employee: Employee = data?.data?.data?.employee
    
    return (
        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <DatesInformation employee={employee} />
            <GeneralDetails employee={employee} />
            <PersonalDetails employee={employee} />
        </div>
    )
}