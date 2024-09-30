"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from "@/lib/rtk"
import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"
import { useMutation } from "react-query"
import { updateUser } from "@/_api/mutations/updateUser.mutation"
import toast, { Toaster } from "react-hot-toast"
import { AxiosError, AxiosResponse } from "axios"
import { convertMediaToFile } from "@/utils/convertMediaToFile"
import { Label } from "../../components/ui/label"
import Image from "next/image"
import { Loader, Trash2 } from "lucide-react"
import { updateUserData } from "@/lib/rtk/slices/user.slice"
import userPlaceholder from "../../../public/images/male-user.png"
import React from "react"

const accountFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required!",
    })
    .min(3, {
      message: "Name must be at least 3 characters!",
    }),
  media: z
    .any()
    .optional()
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function AccountForm() {
  const { _id, name, media } = useSelector(state => state.user)
  const { theme } = useTheme()
  const [previewImage, setPreviewImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  
  const { mutate, isLoading } = useMutation(
    {
      mutationFn: (data: FormData) => updateUser(data, _id as string),
      onSuccess: async (res: AxiosResponse) => {
        toast.success("Your account updated successfully!");
        const updatedName = await res.data?.data?.user?.name; 
        const updatedMedia = await res.data?.data?.user?.media; 
        dispatch(updateUserData({
          name: updatedName,
          media: updatedMedia
        }))        
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMessage);
        console.error('Error:', errorMessage);
      }
    }
  );

  const defaultValues: Partial<AccountFormValues> = {
    name: name,
    media: media
  }

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  })

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    try {
      const validatedData = accountFormSchema.parse(values);
      const formDataToSend = new FormData();
      formDataToSend.append("name", validatedData.name)
      if (previewImage) formDataToSend.append("media", previewImage);
      mutate(formDataToSend);
      
    } catch (error) {
      toast.error("Please fix the form errors.");
    }
  }
  useEffect(()=> {
    if (media) {
      convertMediaToFile(media).then((file)=> {
        setPreviewImage(file)
      })
    }
  }, [media, setPreviewImage])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPreviewImage(file)
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} type="text"/>
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-3">
          <Label>Upload Image</Label>
          <Label
            htmlFor="image"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer text-center"
          >
            {previewImage ? "Change Image" : "Choose Image"}
          </Label>
          <Input
            id="image"
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewImage ? (
            <div className="relative w-fit group hover:cursor-pointer">
              <Image
                src={URL.createObjectURL(previewImage)}
                alt="Selected Image"
                className="w-32 h-32 object-cover rounded-md"
                width={1000}
                height={1000}
              />
              <Button
                onClick={handleRemoveImage}
                variant="ghost"
                className="absolute top-0 right-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50 hover:text-red-500"
              >
                <Trash2 className="w-7 h-7" />
              </Button>
            </div>
          ): (
            <Image
              src={userPlaceholder.src}
              alt="Selected Image"
              className="w-32 h-32 object-cover rounded-md"
              width={1000}
              height={1000}
            />
          )}
        </div>
        <Button type="submit" className="" disabled={isLoading}>
          {isLoading ? (
              <>
                  updating
                  <Loader className="animate-spin h-5 w-5 ml-2 text-white dark:text-black" />
              </>
          ) : (
              "Update account"
          )}
        </Button>
      </form>
    </Form>
  )
}