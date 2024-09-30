"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { Dispatch, SetStateAction } from "react";

interface CompensationAdjustmentsProps {
  formData: UpdateEmployeeValues;
  setFormData: Dispatch<SetStateAction<any>>;
  validationErrors: any;
}

const CompensationAdjustments: React.FC<CompensationAdjustmentsProps> = ({ formData, setFormData, validationErrors }) => {

  return (
    <>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="rewards">Rewards</Label>
          <Input
            id="rewards"
            value={formData.rewards}
            onChange={(e) => setFormData({ ...formData, rewards: Number(e.target.value) })}
            type="number"
            placeholder="10000"
          />
          {validationErrors.rewards && (
              <p className="text-red-500 text-xs -mt-2">{validationErrors.rewards}</p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="deductions">Deductions</Label>
          <Input
            id="deductions"
            value={formData.deductions}
            onChange={(e) => setFormData({ ...formData, deductions: Number(e.target.value) })}
            type="number"
            placeholder="10000"
          />
          {validationErrors.deductions && (
              <p className="text-red-500 text-xs -mt-2">{validationErrors.deductions}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CompensationAdjustments;