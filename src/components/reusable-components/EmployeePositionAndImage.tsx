"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRef, Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { convertMediaToFile } from "@/utils/convertMediaToFile";
import React from "react";

interface EmployeePositionAndImageProps {
  formData: any;
  setFormData: Dispatch<SetStateAction<any>>;
  validationErrors: any;
  previewImage: File | null;
  setPreviewImage: Dispatch<SetStateAction<File | null>>;
  currentImage?: Media
}

const EmployeePositionAndImage: React.FC<EmployeePositionAndImageProps> = ({ formData, setFormData, previewImage, setPreviewImage, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({ ...formData, meida: file });
      setPreviewImage(file)
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, media: null });
    setPreviewImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(()=> {
    if (currentImage) {
      convertMediaToFile(currentImage).then((file)=> {
        setPreviewImage(file)
      })
    }
  }, [currentImage, setPreviewImage])

  return (
    <>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="position">Position</Label>
          <Select 
            value={formData?.position}  
            onValueChange={(value) => setFormData({ ...formData, position: value })}
          >
            <SelectTrigger aria-label="Select position">
              <SelectValue placeholder="Select position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="HR Manager">HR Manager</SelectItem>
              <SelectItem value="Technical Recruiter">Technical Recruiter</SelectItem>
              <SelectItem value="Software Developer/Engineer">Software Developer/Engineer</SelectItem>
              <SelectItem value="Front-end Developer">Front-end Developer</SelectItem>
              <SelectItem value="Back-end Developer">Back-end Developer</SelectItem>
              <SelectItem value="Full-stack Developer">Full-stack Developer</SelectItem>
              <SelectItem value="Mobile App Developer">Mobile App Developer</SelectItem>
              <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
              <SelectItem value="Database Administrator">Database Administrator</SelectItem>
              <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
              <SelectItem value="Test Automation Engineer">Test Automation Engineer</SelectItem>
              <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
              <SelectItem value="CTO">CTO</SelectItem>
              <SelectItem value="Project Manager">Project Manager</SelectItem>
              <SelectItem value="Product Manager">Product Manager</SelectItem>
              <SelectItem value="Cybersecurity Analyst">Cybersecurity Analyst</SelectItem>
              <SelectItem value="IT Support Specialist">IT Support Specialist</SelectItem>
              <SelectItem value="Graphic Designer">Graphic Designer</SelectItem>
            </SelectContent>
          </Select>
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
          {previewImage && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default EmployeePositionAndImage;