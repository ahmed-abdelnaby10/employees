"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function NotAllowed() {
    const router = useRouter()
    return (
        <div className="flex items-center justify-center w-full h-screen p-5">
            <Card className="p-5 flex flex-col items-center">
                <CardHeader>
                    <CardTitle>You aren&apos;t authorized!</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col w-full items-start justify-start gap-5">
                    <p>Please, ask your manager to give you an authorization to access this content.</p>
                    <Button
                        className="self-center"
                        onClick={()=>{router.push("/")}}
                    >
                        Return home
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
