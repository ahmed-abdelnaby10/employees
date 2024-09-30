"use client"

import { Badge } from "../../components/ui/badge"
import { Calendar } from "lucide-react"
import { extractDateTimeInfo } from "@/utils/DateAndTimeInfo"

export default function DatesInformation({ employee }: { employee: Employee }) {
    const createdAt = employee?.created_at;
    const updatedAt = employee?.updated_at;
    
    let createMonthName = '--', createYear = '--';
    let updateMonthName = '--', updateYear = '--';
    if (createdAt) {
        const createDateInfo = extractDateTimeInfo(createdAt);
        createMonthName = createDateInfo.monthName;
        createYear = createDateInfo.year;

        const updateDateInfo = extractDateTimeInfo(updatedAt);
        updateMonthName = updateDateInfo.monthName;
        updateYear = updateDateInfo.year;
    }
    return (
        <div className="w-full flex items-center justify-start sm:gap-8 gap-4 max-sm:flex-col max-sm:items-start row-start-1 row-end-2 col-start-1 col-end-3">
            <div className="flex items-center gap-2">
                <Calendar className="mr-1"/>
                Since:
                <Badge variant="secondary">
                    {createMonthName.slice(0, 3)} {createYear}
                </Badge>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="mr-1"/>
                Last update:
                <Badge variant="secondary">
                    {updateMonthName.slice(0, 3)} {updateYear}
                </Badge>
            </div>
        </div>
    )
}
