'use client'

import { useMutation } from "react-query"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import toast, { Toaster } from 'react-hot-toast';
import { AxiosError } from "axios"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
import { loginAuth } from "@/_api/auth/login.query"
import Cookies from "js-cookie"
import { ACCESS_TOKEN } from "@/utils/constants"
import { Loader } from "lucide-react"
import { useDispatch } from "@/lib/rtk"
import { setUser } from "@/lib/rtk/slices/user.slice"
import React from "react"

const formSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email format." })
        .min(1, { message: "Email is required." }),
    password: z
        .string()
        .min(1, { message: "Password is required." })
})

export function LoginForm() {
    const { theme } = useTheme()
    const dispatch = useDispatch()
    const router = useRouter()

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
            return loginAuth(data)
        },
        onSuccess: (response) => {
            const token =  response?.data?.data?.token
            const user: User =  response?.data?.data?.user
            if (token) {
                Cookies.set(ACCESS_TOKEN, token)  
                dispatch(setUser(user))
                toast.success('Logined successfully.');
                router.push("/")
            }
        },
        onError: (error: AxiosError<ErrorResponse>) => {
            const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again.';
            toast.error(errorMessage);
            console.error('Error:', errorMessage);
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values)
    }

    return (
        <Card className="max-w-sm">
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
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start justify-start gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="m@example.com" {...field} disabled={isLoading}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} disabled={isLoading}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    Logging
                                    <Loader className="animate-spin h-5 w-5 ml-2 text-white dark:text-black" />
                                </>
                            ) : (
                                "Login"
                            )}
                        </Button>
                        <div className="-mt-2 text-center text-sm self-center">
                            Don&apos;t have an account?{" "}
                            <Link href="/auth/signup" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}