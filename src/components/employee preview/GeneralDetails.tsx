"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { PREVIEW_URL } from "@/utils/constants"
import placeholderImage from "../../../public/images/male-user.png"

export default function GeneralDetails({ employee }: { employee: Employee }) {
    const router = useRouter()
    const imageUrl = employee?.media?.original_url 
        ? `${PREVIEW_URL}${employee?.media?.original_url}` 
        : placeholderImage;
    return (
        <Card className="w-full row-start-2 col-start-1 md:col-end-2 col-end-3 lg:col-end-3">
            <CardHeader className="flex items-center justify-between w-full flex-row px-6 py-4">
                <CardTitle>Contact Details</CardTitle>
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
                    <Image
                        src={imageUrl}
                        alt="Employee Image"
                        width={1000}
                        height={1000}
                        className="w-40 h-40 rounded-lg shadow-md"
                        placeholder="blur"
                        blurDataURL={placeholderImage.src}
                    />
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label>Name</Label>
                            <p className="capitalize">{employee?.contact?.first_name} {employee?.contact?.second_name} {employee?.contact?.third_name}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Email Address</Label>
                            <p className="">{employee?.contact?.email}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Phone</Label>
                            <p className="">{employee?.contact?.phone}</p>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label>Address</Label>
                            <p className="">{employee?.contact?.address}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
