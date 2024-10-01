'use client'

import { useMutation } from "react-query"
import { registerAuth } from "@/_api/auth/register.query"
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
import { Loader } from 'lucide-react';
import React from "react"

const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required." })
        .min(3, { message: "Name must be at least 3 characters." })
        .max(30),
    email: z
        .string()
        .email({ message: "Invalid email format." })
        .min(1, { message: "Email is required." }),
    password: z
        .string()
        .min(1, { message: "Password is required." })
        .min(7, { message: "Password must be at least 7 characters." })
        .max(50),
    c_password: z
        .string()
        .min(1, { message: "Confirm password is required." })
}).refine((data) => data.password === data.c_password, {
    message: "Passwords must match.",
    path: ["c_password"],
});

export function SignupForm() {
    const { theme } = useTheme()
    const router = useRouter()

    const { mutate, isLoading } = useMutation({
        mutationFn: (data: z.infer<typeof formSchema>) => {
            return registerAuth(data)
        },
        onSuccess: () => {
            toast.success('Account created successfully.');
            router.push("/auth/login")
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
            name: "",
            email: "",
            password: "",
            c_password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutate(values)
    }

    return (
        <Card className="w-full max-w-sm">
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
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    Enter your information to create an account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start justify-start gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Max" {...field} />
                                    </FormControl>
                                    <FormMessage style={{ marginTop: "0", marginBottom: "0" }} />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="m@example.com" {...field} />
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
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="c_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    Submitting
                                    <Loader className="animate-spin h-5 w-5 ml-2 text-white dark:text-black" />
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                        <div className="text-center text-sm self-center -mt-3">
                            already have an account?{" "}
                            <Link href="/auth/login" className="underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}