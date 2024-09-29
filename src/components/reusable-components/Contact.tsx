"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactDetailsProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  validationErrors: EmployeeValidationErrors
}

const Contact: React.FC<ContactDetailsProps> = ({ formData, setFormData, validationErrors }) => {
  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          value={formData.firstName}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          type="text"
          placeholder="Ahmed"
        />
        {validationErrors.firstName && (
          <p className="text-red-500 text-xs -mt-2">{validationErrors.firstName}</p>
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="second_name">Second Name</Label>
        <Input
          id="second_name"
          value={formData.secondName}
          onChange={(e) => setFormData({ ...formData, secondName: e.target.value })}
          type="text"
          placeholder="Mohamed"
        />
        {validationErrors.secondName && (
          <p className="text-red-500 text-xs -mt-2">{validationErrors.secondName}</p>
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="third_name">Third Name</Label>
        <Input
          id="third_name"
          value={formData.thirdName}
          onChange={(e) => setFormData({ ...formData, thirdName: e.target.value })}
          type="text"
          placeholder="Abdelnaby"
        />
        {validationErrors.thirdName && (
          <p className="text-red-500 text-xs -mt-2">{validationErrors.thirdName}</p>
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
      <div className="grid gap-3">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          type="text"
          placeholder="Tanta, Gharbia, Egypt"
        />
        {validationErrors.address && (
          <p className="text-red-500 text-xs -mt-2">{validationErrors.address}</p>
        )}
      </div>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          type="email"
          placeholder="m@example.com"
        />
        {validationErrors.email && (
          <p className="text-red-500 text-xs -mt-2">{validationErrors.email}</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
