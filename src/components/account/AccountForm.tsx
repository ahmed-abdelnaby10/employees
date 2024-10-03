"use client"

import { z } from "zod"
import { Button } from "@/components/ui/button"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const accountFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name is required!",
    })
    .min(3, {
      message: "Name must be at least 3 characters!",
    }),
  phone: z
    .string()
    .regex(/^\+?\d{10,14}$/, "Invalid phone number")
    .optional(),
  gender: z
    .string()
    .optional(),
  media: z
    .any()
    .optional()
})

export function AccountForm() {
  const { _id, name, media, gender, phone } = useSelector(state => state.user)
  const { theme } = useTheme()
  const [previewImage, setPreviewImage] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: name,
    gender: gender || "",
    phone: phone || "",
    media: media || null,
  });
  useEffect(() => {
    setFormData({
      name: name,
      gender: gender,
      phone: phone,
      media: media,
    })
  }, [gender, media, name, phone])
  const [validationErrors, setValidationErrors] = useState<UserValidationErrors>({});

  const { mutate, isLoading } = useMutation(
    {
      mutationFn: (data: FormData) => updateUser(data, _id as string),
      onSuccess: async (res: AxiosResponse) => {
        toast.success("Your account updated successfully!");
        const updatedName: string = await res.data?.data?.user?.name; 
        const updatedMedia: Media = await res.data?.data?.user?.media; 
        const updatedGender: string = await res.data?.data?.user?.gender; 
        dispatch(updateUserData({
          name: updatedName,
          media: updatedMedia,
          gender: updatedGender,
        }))        
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMessage);
        console.error('Error:', errorMessage);
      }
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = accountFormSchema.parse(formData);
      const formDataToSend = new FormData();

      formDataToSend.append("name", validatedData.name)
      if (validatedData.gender) formDataToSend.append("gender", validatedData.gender);
      if (validatedData.phone) formDataToSend.append("phone", validatedData.phone);
      if (previewImage) formDataToSend.append("media", previewImage);

      mutate(formDataToSend);
      setValidationErrors({});
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationErrors(
          error.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          }, {})
        );
        toast.error("Please fix the form errors.");
      }
    }
  };
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
    <>
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
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type="text"
            placeholder="max"
          />
          {validationErrors.name && (
            <p className="text-red-500 text-xs -mt-2">{validationErrors.name}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            type="text"
            placeholder="+20 1100100200"
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-xs -mt-2">{validationErrors.phone}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => setFormData({ ...formData, gender: value })}
          >
              <SelectTrigger aria-label="Select gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
          </Select>
          {validationErrors.gender && (
            <p className="text-red-500 text-xs -mt-2">{validationErrors.gender}</p>
          )}
        </div>
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
              priority
              className="w-32 h-32 object-cover rounded-md"
              width={1000}
              height={1000}
            />
          )}
          {validationErrors.media && (
            <p className="text-red-500 text-xs -mt-2">{validationErrors.media}</p>
          )}
        </div>
        <Button type="submit" disabled={isLoading}>
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
    </>
  )
}