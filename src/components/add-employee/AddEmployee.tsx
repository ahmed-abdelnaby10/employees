"use client"

import { useState } from "react";
import { z } from "zod";
import { useMutation } from "react-query";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GeneralInformation from "../reusable-components/GeneralInformation";
import EmployeePositionAndImage from "../reusable-components/EmployeePositionAndImage";
import { addEmployee } from "@/_api/mutations/addEmployee.mutation";
import Contact from "../reusable-components/Contact";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes"
import { Loader } from "lucide-react";

const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  secondName: z.string().min(1, "Second name is required"),
  thirdName: z.string().min(1, "Third name is required"),
  phone: z.string().min(1, "Phone number is required").regex(/^\+?\d{10,14}$/, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email"),
  salary: z.number().min(1, "Salary must be a positive number"),
  gender: z.string().min(1, "Gender is required"),
  position: z.string().min(1, "Position is required"),
  birthDate: z.any().optional(),
  media: z.any().optional(),
});

export default function AddEmployee() {
  const { theme } = useTheme()
  const router = useRouter()
  const [validationErrors, setValidationErrors] = useState<EmployeeValidationErrors>({});
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [birthDate, setBirthDate] = useState<any>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    thirdName: "",
    phone: "",
    address: "",
    email: "",
    salary: "",
    gender: "",
    position: "",
    birthDate: null,
    media: null,
  });

  const { mutate, isLoading } = useMutation(
    {
      mutationFn: (data: FormData) => addEmployee(data),
      onSuccess: () => {
        toast.success("Employee added successfully!");
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        const errorMessage = error?.response?.data?.message || 'Something went wrong. Please try again.';
        toast.error(errorMessage);
        console.error('Error:', errorMessage);
      },
      onSettled(data, error) {
        if (error === null) {
          router.push("/")
        }
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatedData = employeeSchema.parse(formData);
      const formDataToSend = new FormData();
      formDataToSend.append("contact[first_name]", validatedData.firstName)
      formDataToSend.append("contact[second_name]", validatedData.secondName)
      formDataToSend.append("contact[third_name]", validatedData.thirdName)
      formDataToSend.append("contact[email]", validatedData.email)
      formDataToSend.append("contact[address]", validatedData.address)
      formDataToSend.append("contact[phone]", validatedData.phone)
      formDataToSend.append("position", validatedData.position)
      formDataToSend.append("fixed_salary", `${validatedData.salary}`)
      formDataToSend.append("gender", validatedData.gender)
      formDataToSend.append("birth_date", birthDate)

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

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full sm:p-8 py-8 px-5"
    >
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
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:row-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contact Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Contact 
                formData={formData} 
                setFormData={setFormData} 
                validationErrors={validationErrors}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
            </CardHeader>
            <CardContent>
              <GeneralInformation 
                formData={formData} 
                setFormData={setFormData} 
                validationErrors={validationErrors}
                date={birthDate}
                setDate={setBirthDate}
              />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Employee Position</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeePositionAndImage 
                formData={formData} 
                setFormData={setFormData} 
                validationErrors={validationErrors}
                setPreviewImage={setPreviewImage}
                previewImage={previewImage}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <footer className="mt-4 flex w-full items-center justify-between">
        <Button type="submit" className="" disabled={isLoading}>
          {isLoading ? (
              <>
                  Adding
                  <Loader className="animate-spin h-5 w-5 ml-2 text-white dark:text-black" />
              </>
          ) : (
              "Add employee"
          )}
        </Button>
      </footer>
    </form>
  );
}
