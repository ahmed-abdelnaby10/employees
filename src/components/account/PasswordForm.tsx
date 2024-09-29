"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useMutation } from "react-query"
import { changePassword } from "@/_api/mutations/changePassword.mutation"
import { useSelector } from "@/lib/rtk"
import toast, { Toaster } from "react-hot-toast"
import { AxiosError } from "axios"
import { Loader } from "lucide-react"
import { useTheme } from "next-themes"

const PasswordFormSchema = z.object({
  oldPassword: z
    .string()
    .min(1, {
      message: "password is required!"
    })
    .min(7, {
      message: "Password must be at least 7 characters!"
    }),
  newPassword: z
    .string()
    .min(1, {
      message: "password is required!"
    })
    .min(7, {
      message: "Password must be at least 7 characters!"
    }),
  c_password: z
    .string()
    .min(1, {
      message: "password is required!"
    })
    .min(7, {
      message: "Password must be at least 7 characters!"
    }),
})
.refine((data) => data.newPassword === data.c_password, {
  message: "Passwords must match.",
  path: ["c_password"],
});

type PasswordFormValues = z.infer<typeof PasswordFormSchema>

const defaultValues: Partial<PasswordFormValues> = {
  oldPassword: "",
  newPassword: "",
  c_password: ""
}

export function PasswordForm() {
  const { theme } = useTheme()
  const { _id } = useSelector(state => state.user)

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: z.infer<typeof PasswordFormSchema>) => {
        return changePassword(data, _id)
    },
    onSuccess: () => {
        toast.success('Password changed successfully.');
        form.reset()
    },
    onError: (error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response?.data?.message;
        toast.error(errorMessage || "Something went wrong. Please try again!");
        console.error('Error:', errorMessage);
    }
  })

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues,
  })

  function onSubmit(data: PasswordFormValues) {
    console.log(data)
    mutate(data)
  }

  return (
    <Form {...form}>
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password"/>
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
                <Input placeholder="********" {...field} type="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="" disabled={isLoading}>
          {isLoading ? (
              <>
                  Wait
                  <Loader className="animate-spin h-5 w-5 ml-2 text-white dark:text-black" />
              </>
          ) : (
              "Change Password"
          )}
        </Button>
      </form>
    </Form>
  )
}
