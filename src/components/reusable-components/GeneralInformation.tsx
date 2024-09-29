"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "../ui/calendar";
import { Dispatch, FC, SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";

interface GeneralInformationProps {
    formData: any;
    setFormData: Dispatch<SetStateAction<any>>;
    validationErrors: EmployeeValidationErrors;
    date: any;
    setDate: Dispatch<SetStateAction<any>>;
}

const GeneralInformation: FC<GeneralInformationProps> = ({ formData, setFormData, validationErrors, date, setDate }) => {
    const formattedDate = date ? format(date, "dd/MM/yyyy") : "Pick a date"
    return (
        <div className="grid gap-6 sm:grid-cols-2">
            <div className="grid gap-3">
                <Label htmlFor="gender">Gender</Label>
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
                    <p className="text-red-500 text-xs">{validationErrors.gender}</p>
                )}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="salary">Salary</Label>
                <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
                    type="number"
                    placeholder="10000"
                />
                {validationErrors.salary && (
                    <p className="text-red-500 text-xs -mt-2">{validationErrors.salary}</p>
                )}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="birthDate">Date of birth</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <div>
                            <Input
                                id="birthDate"
                                value={formattedDate}
                                type="text"
                                readOnly
                                // onClick={(e) => e.preventDefault()}
                                className="cursor-pointer"
                            />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md shadow w-full h-full"
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default GeneralInformation;
