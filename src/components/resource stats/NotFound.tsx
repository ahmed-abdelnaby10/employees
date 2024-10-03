"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function NotFound() {
    const router = useRouter()
    return (
        <div className="flex items-center justify-center w-full h-screen p-5">
            <Card className="p-5 flex flex-col items-center">
                <CardHeader className="flex flex-col items-center">
                    <CardTitle className="text-5xl">404</CardTitle>
                    <CardDescription>Sorry this page not found!</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col w-full items-start justify-start gap-5">
                    <p>Please, check the page name you want to navigate.</p>
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