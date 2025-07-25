"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
}: OnboardingModalProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    ssn: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignIn = () => {
    // Handle sign in logic here
    console.log("Sign in with:", formData);
    onClose();
    // Redirect to the Employee Onboarding page
    router.push("/employee-onboarding");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Employee Onboarding
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Instructions */}
          <p className="text-sm text-gray-700 leading-relaxed">
            To access your onboarding and sign your contract, sign in with your
            first name, last name and last four digits of your social security
            number.
          </p>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Legal First Name */}
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                <span className="text-red-500">*</span> Legal First Name:
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full"
                placeholder=""
              />
            </div>

            {/* Legal Last Name */}
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                <span className="text-red-500">*</span> Legal Last Name:
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full"
                placeholder=""
              />
            </div>

            {/* Last 4 digits of SSN */}
            <div className="space-y-2">
              <Label
                htmlFor="ssn"
                className="text-sm font-medium text-gray-700"
              >
                <span className="text-red-500">*</span> Last 4 digits of SSN:
              </Label>
              <Input
                id="ssn"
                type="text"
                maxLength={4}
                value={formData.ssn}
                onChange={(e) => handleInputChange("ssn", e.target.value)}
                className="w-full"
                placeholder=""
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSignIn}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          >
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
