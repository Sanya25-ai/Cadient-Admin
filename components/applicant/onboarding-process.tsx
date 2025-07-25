"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface OnboardingProcessProps {
  isOpen?: boolean;
  onClose?: () => void;
}

interface FormData {
  // Personal Information
  legalFirstName: string;
  middleName: string;
  legalLastName: string;
  address: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  primaryPhone: string;
  primaryPhoneType: string;
  secondaryPhone: string;
  secondaryPhoneType: string;
  email: string;
  ssn: string;
  reTypeSsn: string;
  dateOfBirth: { month: string; day: string; year: string };

  // EEO Questions
  gender: string;
  hispanic: string;
  race: string;

  // Veteran Status
  veteranStatus: string;

  // Disability
  disability: string;

  // Disability and Veteran Status Reporting
  accommodationRequest: string;
  veteranOfArmedForces: string;

  // Emergency Contacts
  emergencyContact1: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    country: string;
  };
  emergencyContact2: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    phone: string;
    country: string;
  };

  // Direct Deposit
  bankName: string;
  nameOnAccount: string;
  accountNumber: string;
  routingNumber: string;
  reTypeAccountNumber: string;
  accountType: string;
  depositPreference: string;

  // E-Signature
  eSignatureAgreement: boolean;
  fullNameSignature: string;
}

export default function OnboardingProcess({
  isOpen,
  onClose,
}: OnboardingProcessProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [electronicConsent, setElectronicConsent] = useState(false);
  const [isProgressExpanded, setIsProgressExpanded] = useState(false);
  const [isEditingSSN, setIsEditingSSN] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    legalFirstName: "",
    middleName: "",
    legalLastName: "",
    address: "",
    country: "United States of America",
    city: "",
    state: "",
    zipCode: "",
    primaryPhone: "",
    primaryPhoneType: "mobile",
    secondaryPhone: "",
    secondaryPhoneType: "mobile",
    email: "",
    ssn: "",
    reTypeSsn: "",
    dateOfBirth: { month: "", day: "", year: "" },
    gender: "",
    hispanic: "",
    race: "",
    veteranStatus: "",
    disability: "",
    accommodationRequest: "",
    veteranOfArmedForces: "",
    emergencyContact1: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      country: "United States of America",
    },
    emergencyContact2: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      phone: "",
      country: "United States of America",
    },
    bankName: "",
    nameOnAccount: "",
    accountNumber: "",
    routingNumber: "",
    reTypeAccountNumber: "",
    accountType: "",
    depositPreference: "",
    eSignatureAgreement: false,
    fullNameSignature: "",
  });

  const steps = [
    { id: "welcome", label: "Welcome!", active: true },
    { id: "personal", label: "Personal Information", active: false },
    { id: "eeo", label: "EEO Questions", active: false },
    { id: "veteran", label: "Veteran Status Questions", active: false },
    { id: "disability", label: "Disability-OFCCP", active: false },
    {
      id: "reporting",
      label: "Disability and Veteran Status Reporting",
      active: false,
    },
    { id: "emergency", label: "Emergency Contacts", active: false },
    { id: "state", label: "State Form", active: false },
    { id: "exempt", label: "Exempt Notice - Please Read", active: false },
    { id: "w4", label: "Form W-4", active: false },
    { id: "deposit", label: "Direct Deposit", active: false },
    { id: "esign", label: "e-Sign Forms", active: false },
    { id: "complete", label: "Onboarding Complete", active: false },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedFormData = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof FormData] as any),
        [field]: value,
      },
    }));
  };

  // For page mode, always show the component
  const isPageMode = !isOpen && !onClose;

  if (!isPageMode && !isOpen) return null;

  return (
    <div
      className={
        isPageMode
          ? "min-h-screen bg-white flex flex-col"
          : "fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      }
    >
      <div
        className={
          isPageMode
            ? "w-full flex flex-col h-screen"
            : "bg-white w-full max-w-7xl h-full max-h-[calc(100vh-2rem)] rounded-lg shadow-xl flex flex-col"
        }
      >
        {/* Header - Only show for modal mode */}
        {!isPageMode && (
          <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                ← Back
              </Button>
              <h1 className="text-lg font-semibold text-gray-900">
                Onboarding Process
              </h1>
            </div>
          </div>
        )}

        {/* Page Header - Only show for page mode */}
        {isPageMode && (
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-400/[0.08] rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  Employee Onboarding
                </h1>
              </div>
              <button
                onClick={() => window.history.back()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors"
              >
                Exit Onboarding Process
              </button>
            </div>
          </div>
        )}

        {/* Fixed Navigation Bar */}
        <div className="border-b bg-white">
          {/* Fixed Navigation Steps */}
          <div className="bg-white p-3">
            <div className="flex items-center justify-between overflow-x-auto">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center flex-1 min-w-0 cursor-pointer"
                  onClick={() => setCurrentStep(index)}
                >
                  {/* Step Circle */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                      index === currentStep
                        ? "bg-orange-500 text-white"
                        : index < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Step Label */}
                  <div
                    className={`text-xs text-center px-1 py-0.5 rounded max-w-20 ${
                      index === currentStep
                        ? "bg-orange-100 text-orange-800 font-medium"
                        : index < currentStep
                        ? "bg-green-100 text-green-800"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div
          className={
            isPageMode
              ? "flex-1 overflow-y-auto px-6 py-6"
              : "flex-1 overflow-y-auto p-6"
          }
        >
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="w-full space-y-6">
              {/* Employee Onboarding Header */}
              <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
                <h2 className="text-lg font-semibold text-orange-500 text-left">
                  Employee Onboarding
                </h2>
              </div>

              {/* Welcome Message */}
              <div className="px-6 pb-6 rounded-lg">
                <p className="text-gray-700 mb-6">
                  Congratulations! We are excited to have you join our team. To
                  get you on board, we need you to fill out some paperwork. To
                  get started, continue to the next step.
                </p>

                {/* Electronic Consent Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    ELECTRONIC CONSENT:
                  </h3>

                  <p className="text-gray-700">
                    In order to complete this Onboarding module, you will need
                    to give consent to receive and respond to information in
                    electronic form. If you do not wish to consent to electronic
                    transactions, please close this browser window to cancel the
                    Onboarding process.
                  </p>

                  <h4 className="font-semibold text-gray-900">
                    Electronic Consent Authorization
                  </h4>

                  <div className="text-gray-700 space-y-4">
                    <p>
                      This Onboarding process contains a number of disclosures
                      and consent forms which usually are provided in written
                      form. If I do consent to engage in electronic
                      transactions, I understand that I have the right to
                      withdraw my consent, and can do so by notifying the hiring
                      manager or person in charge at this location. I can also
                      use this procedure to update information needed to contact
                      me. If I decide at any point during this process to
                      withdraw my consent to engage in electronic transactions,
                      I understand that I will have to sign corresponding paper
                      authorization or consent form as needed if I wish to
                      continue with the process. I understand that any consent
                      given here applies only to the electronic transactions
                      related to these new hire forms, and that I can access the
                      electronic records by contacting Trident Seafoods. I
                      further understand that I may request a paper copy of any
                      consent or authorization I give electronically. I may
                      receive such paper copies at no cost within the next 60
                      days by contacting Cadient Talent at{" "}
                      <span className="text-orange-500">
                        applicantsupport@cadienttalent.com
                      </span>
                      .
                    </p>

                    {/* Consent Checkbox */}
                    <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-white">
                      <Checkbox
                        id="electronic-consent"
                        checked={electronicConsent}
                        onCheckedChange={(checked) =>
                          setElectronicConsent(checked as boolean)
                        }
                        className="mt-1"
                      />
                      <label
                        htmlFor="electronic-consent"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        <span className="text-red-500">*</span> I consent to
                        receive and respond to notices in electronic form:
                      </label>
                    </div>
                  </div>
                </div>

                {/* Next Button */}
                <div className="flex justify-start mt-8">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      Next:
                    </span>
                    <Button
                      onClick={handleNext}
                      disabled={!electronicConsent}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Personal Information
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="w-full space-y-6">
              {/* Personal Information Header - Same style as Welcome */}
              <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
                <h2 className="text-lg font-semibold text-orange-500 text-left">
                  Personal Information
                </h2>
              </div>

              <div className="bg-white px-6 pb-6 rounded-lg">
                <p className="text-gray-700 mb-6">
                  Please verify that your personal information is correct.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  <div>
                    <Label
                      htmlFor="legalFirstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> Legal First Name:
                    </Label>
                    <Input
                      id="legalFirstName"
                      value={formData.legalFirstName}
                      onChange={(e) =>
                        updateFormData("legalFirstName", e.target.value)
                      }
                      placeholder="JM"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="middleName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Middle Name:
                    </Label>
                    <Input
                      id="middleName"
                      value={formData.middleName}
                      onChange={(e) =>
                        updateFormData("middleName", e.target.value)
                      }
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="legalLastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> Legal Last Name:
                    </Label>
                    <Input
                      id="legalLastName"
                      value={formData.legalLastName}
                      onChange={(e) =>
                        updateFormData("legalLastName", e.target.value)
                      }
                      placeholder="TestUser"
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> Address:
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        updateFormData("address", e.target.value)
                      }
                      placeholder="6301 Bothania Ave NW"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="country"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> Country:
                    </Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        updateFormData("country", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United States of America">
                          United States of America
                        </SelectItem>
                        <SelectItem value="Afghanistan">Afghanistan</SelectItem>
                        <SelectItem value="Åland Islands">
                          Åland Islands
                        </SelectItem>
                        <SelectItem value="Albania">Albania</SelectItem>
                        <SelectItem value="Algeria">Algeria</SelectItem>
                        <SelectItem value="American Samoa">
                          American Samoa
                        </SelectItem>
                        <SelectItem value="Andorra">Andorra</SelectItem>
                        <SelectItem value="Angola">Angola</SelectItem>
                        <SelectItem value="Anguilla">Anguilla</SelectItem>
                        <SelectItem value="Antigua and Barbuda">
                          Antigua and Barbuda
                        </SelectItem>
                        <SelectItem value="Argentina">Argentina</SelectItem>
                        <SelectItem value="Armenia">Armenia</SelectItem>
                        <SelectItem value="Aruba">Aruba</SelectItem>
                        <SelectItem value="Australia">Australia</SelectItem>
                        <SelectItem value="Austria">Austria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="city"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> City:
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      placeholder="Seattle"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="state"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> State:
                    </Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => updateFormData("state", value)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Washington" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Alabama">Alabama</SelectItem>
                        <SelectItem value="Alaska">Alaska</SelectItem>
                        <SelectItem value="Arizona">Arizona</SelectItem>
                        <SelectItem value="Arkansas">Arkansas</SelectItem>
                        <SelectItem value="California">California</SelectItem>
                        <SelectItem value="Colorado">Colorado</SelectItem>
                        <SelectItem value="Connecticut">Connecticut</SelectItem>
                        <SelectItem value="Delaware">Delaware</SelectItem>
                        <SelectItem value="District of Columbia">
                          District of Columbia
                        </SelectItem>
                        <SelectItem value="Florida">Florida</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Hawaii">Hawaii</SelectItem>
                        <SelectItem value="Idaho">Idaho</SelectItem>
                        <SelectItem value="Illinois">Illinois</SelectItem>
                        <SelectItem value="Indiana">Indiana</SelectItem>
                        <SelectItem value="Iowa">Iowa</SelectItem>
                        <SelectItem value="Kansas">Kansas</SelectItem>
                        <SelectItem value="Kentucky">Kentucky</SelectItem>
                        <SelectItem value="Louisiana">Louisiana</SelectItem>
                        <SelectItem value="Maine">Maine</SelectItem>
                        <SelectItem value="Maryland">Maryland</SelectItem>
                        <SelectItem value="Massachusetts">
                          Massachusetts
                        </SelectItem>
                        <SelectItem value="Michigan">Michigan</SelectItem>
                        <SelectItem value="Minnesota">Minnesota</SelectItem>
                        <SelectItem value="Mississippi">Mississippi</SelectItem>
                        <SelectItem value="Missouri">Missouri</SelectItem>
                        <SelectItem value="Montana">Montana</SelectItem>
                        <SelectItem value="Nebraska">Nebraska</SelectItem>
                        <SelectItem value="Nevada">Nevada</SelectItem>
                        <SelectItem value="New Hampshire">
                          New Hampshire
                        </SelectItem>
                        <SelectItem value="New Jersey">New Jersey</SelectItem>
                        <SelectItem value="New Mexico">New Mexico</SelectItem>
                        <SelectItem value="New York">New York</SelectItem>
                        <SelectItem value="North Carolina">
                          North Carolina
                        </SelectItem>
                        <SelectItem value="North Dakota">
                          North Dakota
                        </SelectItem>
                        <SelectItem value="Northern Mariana Islands">
                          Northern Mariana Islands
                        </SelectItem>
                        <SelectItem value="Ohio">Ohio</SelectItem>
                        <SelectItem value="Oklahoma">Oklahoma</SelectItem>
                        <SelectItem value="Oregon">Oregon</SelectItem>
                        <SelectItem value="Pennsylvania">
                          Pennsylvania
                        </SelectItem>
                        <SelectItem value="Puerto Rico">Puerto Rico</SelectItem>
                        <SelectItem value="Rhode Island">
                          Rhode Island
                        </SelectItem>
                        <SelectItem value="South Carolina">
                          South Carolina
                        </SelectItem>
                        <SelectItem value="South Dakota">
                          South Dakota
                        </SelectItem>
                        <SelectItem value="Tennessee">Tennessee</SelectItem>
                        <SelectItem value="Texas">Texas</SelectItem>
                        <SelectItem value="US Minor Outlying Islands">
                          US Minor Outlying Islands
                        </SelectItem>
                        <SelectItem value="Utah">Utah</SelectItem>
                        <SelectItem value="Vermont">Vermont</SelectItem>
                        <SelectItem value="Virgin Islands">
                          Virgin Islands
                        </SelectItem>
                        <SelectItem value="Virginia">Virginia</SelectItem>
                        <SelectItem value="Washington">Washington</SelectItem>
                        <SelectItem value="West Virginia">
                          West Virginia
                        </SelectItem>
                        <SelectItem value="Wisconsin">Wisconsin</SelectItem>
                        <SelectItem value="Wyoming">Wyoming</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="zipCode"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> Zip/Postal Code:
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) =>
                        updateFormData("zipCode", e.target.value)
                      }
                      placeholder="98107"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="primaryPhone"
                      className="text-sm font-medium text-gray-700"
                    >
                      <span className="text-red-500">*</span> Primary Phone:
                    </Label>
                    <Input
                      id="primaryPhone"
                      value={formData.primaryPhone}
                      onChange={(e) =>
                        updateFormData("primaryPhone", e.target.value)
                      }
                      placeholder="123-456-7890"
                      className="mt-1"
                    />
                    <div className="flex items-center mt-2">
                      <Checkbox
                        id="primaryMobile"
                        checked={formData.primaryPhoneType === "mobile"}
                        onCheckedChange={(checked) =>
                          updateFormData(
                            "primaryPhoneType",
                            checked ? "mobile" : ""
                          )
                        }
                      />
                      <Label
                        htmlFor="primaryMobile"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Mobile Number
                      </Label>
                    </div>
                  </div>

                  <div>
                    <Label
                      htmlFor="secondaryPhone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Secondary Phone:
                    </Label>
                    <Input
                      id="secondaryPhone"
                      value={formData.secondaryPhone}
                      onChange={(e) =>
                        updateFormData("secondaryPhone", e.target.value)
                      }
                      placeholder="888-555-6666"
                      className="mt-1"
                    />
                    <div className="flex items-center mt-2">
                      <Checkbox
                        id="secondaryMobile"
                        checked={formData.secondaryPhoneType === "mobile"}
                        onCheckedChange={(checked) =>
                          updateFormData(
                            "secondaryPhoneType",
                            checked ? "mobile" : ""
                          )
                        }
                      />
                      <Label
                        htmlFor="secondaryMobile"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Mobile Number
                      </Label>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-700 mb-2">
                      Email Address: Each applicant must have their own unique
                      email. If you do not have an email address, please visit{" "}
                      <span className="text-red-500">Google Mail</span> to
                      create a free email account.
                    </p>
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Enter email address below:
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      placeholder="testuser@gmail.com"
                      className="mt-1"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm font-medium text-gray-700">
                        SSN: ***-**-2222{" "}
                        <button
                          onClick={() => setIsEditingSSN(!isEditingSSN)}
                          className="text-red-500 hover:text-red-700 cursor-pointer"
                        >
                          edit SSN
                        </button>
                      </Label>
                      <button
                        onClick={() => setIsEditingSSN(!isEditingSSN)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isEditingSSN ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </div>

                    {isEditingSSN && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Social Security Number
                          </h3>
                          <p className="text-sm text-gray-700 mb-4">
                            Required for all applicants except those in the
                            process of applying for an appropriate visa (i.e.
                            H2B visa, etc.):
                          </p>
                        </div>
                        <div>
                          <Label
                            htmlFor="ssn"
                            className="text-sm font-medium text-gray-700"
                          >
                            <span className="text-red-500">*</span> Social
                            Security Number:
                          </Label>
                          <Input
                            id="ssn"
                            value={formData.ssn}
                            onChange={(e) =>
                              updateFormData("ssn", e.target.value)
                            }
                            placeholder="123-45-6789"
                            className="mt-1 bg-gray-100"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="reTypeSsn"
                            className="text-sm font-medium text-gray-700"
                          >
                            <span className="text-red-500">*</span> Re-Type
                            Social Security Number:
                          </Label>
                          <Input
                            id="reTypeSsn"
                            value={formData.reTypeSsn}
                            onChange={(e) =>
                              updateFormData("reTypeSsn", e.target.value)
                            }
                            placeholder="123-45-6789"
                            className="mt-1 bg-gray-100"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700">
                      <span className="text-red-500">*</span> Date of Birth:
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Select
                        value={formData.dateOfBirth.month}
                        onValueChange={(value) =>
                          updateNestedFormData("dateOfBirth", "month", value)
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="January" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="January">January</SelectItem>
                          <SelectItem value="February">February</SelectItem>
                          <SelectItem value="March">March</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select
                        value={formData.dateOfBirth.day}
                        onValueChange={(value) =>
                          updateNestedFormData("dateOfBirth", "day", value)
                        }
                      >
                        <SelectTrigger className="w-16">
                          <SelectValue placeholder="1" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 31 }, (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={formData.dateOfBirth.year}
                        onValueChange={(value) =>
                          updateNestedFormData("dateOfBirth", "year", value)
                        }
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="2000" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 50 }, (_, i) => (
                            <SelectItem
                              key={2000 - i}
                              value={(2000 - i).toString()}
                            >
                              {2000 - i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      Next:
                    </span>
                    <Button
                      onClick={handleNext}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2"
                    >
                      EEO Questions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: EEO Questions */}
          {currentStep === 2 && (
            <div className="w-full space-y-6">
              <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
                <h2 className="text-lg font-semibold text-orange-500 text-left">
                  EEO Questions
                </h2>
              </div>

              <div className="bg-white px-6 pb-6 rounded-lg">
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Trident Seafoods Corp. is an Equal Opportunity Employer. We
                  are subject to certain federal equal employment record keeping
                  requirements.
                  <br />
                  <br />
                  In order to comply, we request applicants to voluntarily
                  self-identify their race and ethnicity. Submission of this
                  information is voluntary and refusal to provide it will not
                  subject you to any adverse treatment.
                </p>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-medium text-gray-700">
                        * Gender:
                      </Label>
                      {formData.gender && (
                        <button
                          onClick={() => updateFormData("gender", "")}
                          className="text-sm text-red-500 hover:text-red-700 underline"
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => updateFormData("gender", value)}
                    >
                      <div className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2 py-1">
                        <RadioGroupItem
                          value="decline-gender"
                          id="decline-gender"
                        />
                        <Label htmlFor="decline-gender">
                          I decline to provide this information
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-medium text-gray-700">
                        * Are You Hispanic or Latino?
                      </Label>
                      {formData.hispanic && (
                        <button
                          onClick={() => updateFormData("hispanic", "")}
                          className="text-sm text-red-500 hover:text-red-700 underline"
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>
                    <RadioGroup
                      value={formData.hispanic}
                      onValueChange={(value) =>
                        updateFormData("hispanic", value)
                      }
                    >
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="no"
                          id="not-hispanic"
                          className="mt-1"
                        />
                        <Label
                          htmlFor="not-hispanic"
                          className="leading-relaxed"
                        >
                          No, I am not Hispanic or Latino
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="yes"
                          id="hispanic"
                          className="mt-1"
                        />
                        <Label htmlFor="hispanic" className="leading-relaxed">
                          Yes, I am Hispanic or Latino. A person of Cuban,
                          Mexican, Puerto Rican, Central or South American or
                          other Spanish culture or origin, regardless of race.
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="decline-hispanic"
                          id="decline-hispanic"
                          className="mt-1"
                        />
                        <Label
                          htmlFor="decline-hispanic"
                          className="leading-relaxed"
                        >
                          I decline to provide this information
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Label className="text-sm font-medium text-gray-700">
                        * Race:
                      </Label>
                      {formData.race && (
                        <button
                          onClick={() => updateFormData("race", "")}
                          className="text-sm text-red-500 hover:text-red-700 underline"
                        >
                          Clear Selection
                        </button>
                      )}
                    </div>
                    <RadioGroup
                      value={formData.race}
                      onValueChange={(value) => updateFormData("race", value)}
                    >
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="white"
                          id="white"
                          className="mt-1"
                        />
                        <Label htmlFor="white" className="leading-relaxed">
                          White (Not Hispanic or Latino) - A person having
                          origins in any of the original peoples of Europe,
                          North Africa, or the Middle East.
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="black"
                          id="black"
                          className="mt-1"
                        />
                        <Label htmlFor="black" className="leading-relaxed">
                          Black or African American (Not Hispanic or Latino) - A
                          person having origins in any of the black racial
                          groups of Africa.
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="native"
                          id="native"
                          className="mt-1"
                        />
                        <Label htmlFor="native" className="leading-relaxed">
                          American Indian/Alaska Native (Not Hispanic or Latino)
                          - A person having origins in any of the original
                          peoples of North and South America (including Central
                          America), and who maintains tribal affiliation or
                          community attachment.
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="asian"
                          id="asian"
                          className="mt-1"
                        />
                        <Label htmlFor="asian" className="leading-relaxed">
                          Asian (Not Hispanic or Latino) - A person having
                          origins in any of the original peoples of the Far
                          East, Southeast Asia, or the Indian subcontinent
                          including, for example, Cambodia, China, India, Japan,
                          Korea, Malaysia, Pakistan, the Philippine Islands,
                          Thailand, and Vietnam.
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="pacific"
                          id="pacific"
                          className="mt-1"
                        />
                        <Label htmlFor="pacific" className="leading-relaxed">
                          Native Hawaiian or Other Pacific Islander (Not
                          Hispanic or Latino) - A person having origins in any
                          of the original peoples of Hawaii, Guam, Samoa, or
                          other Pacific Islands.
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="two-or-more"
                          id="two-or-more"
                          className="mt-1"
                        />
                        <Label
                          htmlFor="two-or-more"
                          className="leading-relaxed"
                        >
                          Two or More Races (Not Hispanic or Latino) - All
                          persons who identify with more than one of the above
                          five races.
                        </Label>
                      </div>
                      <div className="flex items-start space-x-2 py-1">
                        <RadioGroupItem
                          value="decline-race"
                          id="decline-race"
                          className="mt-1"
                        />
                        <Label
                          htmlFor="decline-race"
                          className="leading-relaxed"
                        >
                          I decline to provide this information
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      Next:
                    </span>
                    <Button
                      onClick={handleNext}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2"
                    >
                      Veteran Status Questions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Veteran Status Questions */}
          {currentStep === 3 && (
            <div className="w-full space-y-6">
              <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
                <h2 className="text-lg font-semibold text-orange-500 text-left">
                  Veteran Status Questions
                </h2>
              </div>

              <div className="bg-white px-6 pb-6 rounded-lg">
                <div className="space-y-6 text-sm text-gray-700">
                  <p className="leading-relaxed">
                    Government contractors subject to the Vietnam Era Veterans'
                    Readjustment Assistance Act of 1974, as amended by the Jobs
                    for Veterans Act of 2002,{" "}
                    <span className="text-blue-600 underline">
                      38 U.S.C. 4212 (VEVRAA)
                    </span>
                    , are required to take affirmative action to employ and
                    advance in employment: (1) disabled veterans; (2) recently
                    separated veterans; (3) active duty wartime or campaign
                    badge veterans; and (4) Armed Forces service medal veterans.
                    These classifications are defined as follows:
                  </p>

                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <p className="font-medium mb-2">
                        A "disabled veteran" is one of the following:
                      </p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>
                          a veteran of the U.S. military, ground, naval or air
                          service who is entitled to compensation (or who but
                          for the receipt of military retired pay would be
                          entitled to compensation) under laws administered by
                          the Secretary of Veterans Affairs; or
                        </li>
                        <li>
                          a person who was discharged or released from active
                          duty because of a service-connected disability.
                        </li>
                      </ul>
                    </li>

                    <li>
                      <p className="font-medium mb-2">
                        A "recently separated veteran" means any veteran during
                        the three-year period beginning on the date of such
                        veteran's discharge or release from active duty in the
                        U.S. military, ground, naval or air service.
                      </p>
                    </li>

                    <li>
                      <p className="font-medium mb-2">
                        An "active duty wartime or campaign badge veteran" means
                        a veteran who served on active duty in the U.S.
                        military, ground, naval or air service during a war, or
                        in a campaign or expedition for which a campaign badge
                        has been authorized under the laws administered by the
                        Department of Defense.
                      </p>
                    </li>

                    <li>
                      <p className="font-medium mb-2">
                        An "Armed Forces service medal veteran" means a veteran
                        who, while serving on active duty in the U.S. military,
                        ground, naval or air service, participated in a United
                        States military operation for which an Armed Forces
                        service medal was awarded pursuant to Executive Order
                        12985.
                      </p>
                    </li>
                  </ul>

                  <p className="leading-relaxed">
                    Protected veterans may have additional rights under
                    USERRA—the Uniformed Services Employment and Reemployment
                    Rights Act. In particular, if you were absent from
                    employment in order to perform service in the uniformed
                    service, you may be entitled to be reemployed by your
                    employer in the position you would have obtained with
                    reasonable certainty if not for the absence due to service.
                    For more information, call the U.S. Department of Labor's
                    Veterans Employment and Training Service (VETS), toll-free,
                    at 1-866-4-USA-DOL.
                  </p>

                  <p className="leading-relaxed">
                    As a Government contractor subject to VEVRAA, we are
                    required to submit a report to the United States Department
                    of Labor each year identifying the number of our employees
                    belonging to each specified "protected veteran" category. If
                    you believe you belong to any of the categories of protected
                    veterans listed above, please indicate by checking the
                    appropriate box below.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium mb-4 text-gray-900">
                      I BELONG TO THE FOLLOWING CLASSIFICATIONS OF PROTECTED
                      VETERANS (CHOOSE ALL THAT APPLY):
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="disabled-veteran"
                          checked={formData.veteranStatus.includes("disabled")}
                          onCheckedChange={(checked) => {
                            const current = formData.veteranStatus
                              .split(",")
                              .filter(Boolean);
                            if (checked) {
                              updateFormData(
                                "veteranStatus",
                                [...current, "disabled"].join(",")
                              );
                            } else {
                              updateFormData(
                                "veteranStatus",
                                current
                                  .filter((v) => v !== "disabled")
                                  .join(",")
                              );
                            }
                          }}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor="disabled-veteran"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          DISABLED VETERAN
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="recently-separated"
                          checked={formData.veteranStatus.includes(
                            "recently-separated"
                          )}
                          onCheckedChange={(checked) => {
                            const current = formData.veteranStatus
                              .split(",")
                              .filter(Boolean);
                            if (checked) {
                              updateFormData(
                                "veteranStatus",
                                [...current, "recently-separated"].join(",")
                              );
                            } else {
                              updateFormData(
                                "veteranStatus",
                                current
                                  .filter((v) => v !== "recently-separated")
                                  .join(",")
                              );
                            }
                          }}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor="recently-separated"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          RECENTLY SEPARATED VETERAN
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="active-wartime"
                          checked={formData.veteranStatus.includes(
                            "active-wartime"
                          )}
                          onCheckedChange={(checked) => {
                            const current = formData.veteranStatus
                              .split(",")
                              .filter(Boolean);
                            if (checked) {
                              updateFormData(
                                "veteranStatus",
                                [...current, "active-wartime"].join(",")
                              );
                            } else {
                              updateFormData(
                                "veteranStatus",
                                current
                                  .filter((v) => v !== "active-wartime")
                                  .join(",")
                              );
                            }
                          }}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor="active-wartime"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          ACTIVE WARTIME OR CAMPAIGN BADGE VETERAN
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="armed-forces"
                          checked={formData.veteranStatus.includes(
                            "armed-forces"
                          )}
                          onCheckedChange={(checked) => {
                            const current = formData.veteranStatus
                              .split(",")
                              .filter(Boolean);
                            if (checked) {
                              updateFormData(
                                "veteranStatus",
                                [...current, "armed-forces"].join(",")
                              );
                            } else {
                              updateFormData(
                                "veteranStatus",
                                current
                                  .filter((v) => v !== "armed-forces")
                                  .join(",")
                              );
                            }
                          }}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor="armed-forces"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          ARMED FORCES SERVICE MEDAL VETERAN
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="not-protected"
                          checked={formData.veteranStatus.includes(
                            "not-protected"
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData("veteranStatus", "not-protected");
                            } else {
                              updateFormData("veteranStatus", "");
                            }
                          }}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor="not-protected"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          I AM A PROTECTED VETERAN BUT I CHOOSE NOT TO
                          SELF-IDENTIFY THE CLASSIFICATIONS TO WHICH I BELONG
                        </Label>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="not-veteran"
                          checked={formData.veteranStatus.includes(
                            "not-veteran"
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateFormData("veteranStatus", "not-veteran");
                            } else {
                              updateFormData("veteranStatus", "");
                            }
                          }}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor="not-veteran"
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          I AM NOT A PROTECTED VETERAN
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="leading-relaxed">
                      If you are a disabled veteran it would assist us if you
                      tell us whether there are accommodations we could make
                      that would enable you to perform the essential functions
                      of the job, including special equipment, changes in the
                      physical layout of the job, changes in the way the job is
                      customarily performed, provision of personal assistance
                      services or other accommodations. This information will
                      assist us in making reasonable accommodations for your
                      disability.
                    </p>

                    <p className="leading-relaxed">
                      Submission of this information is voluntary and refusal to
                      provide it will not subject you to any adverse treatment.
                      The information provided will be used only in ways that
                      are not inconsistent with the Vietnam Era Veterans'
                      Readjustment Assistance Act of 1974, as amended.
                    </p>

                    <p className="leading-relaxed">
                      The information you submit will be kept confidential,
                      except that (i) supervisors and managers may be informed
                      regarding restrictions on the work or duties of disabled
                      veterans, and regarding necessary accommodations; (ii)
                      first aid and safety personnel may be informed, when and
                      to the extent appropriate, if you have a condition that
                      might require emergency treatment; and (iii) Government
                      officials engaged in enforcing laws administered by the
                      Office of Federal Contract Compliance Programs, or
                      enforcing the Americans with Disabilities Act, may be
                      informed.
                    </p>

                    <p className="leading-relaxed">
                      Trident Seafoods Corporation, an equal opportunity
                      employer, pledges that it is and has been our policy to
                      take affirmative action to employ and advance in
                      employment qualified disabled Veterans, recently separated
                      Veterans, other protected Veterans, and Armed Forces
                      Service Medal Veterans (Veterans), and not to discriminate
                      against any employee or applicant for employment because
                      of his or her status as a Veteran.
                    </p>

                    <p className="leading-relaxed">
                      Trident has implemented an audit and reporting system to
                      assist our organization in measuring the effectiveness of
                      this Program. We are committed to personal practices that
                      recruit, hire, train, and promote qualified individuals
                      without regard to an individual's status as a Veteran, and
                      that our employment decisions are based only on valid job
                      requirements.
                    </p>

                    <p className="leading-relaxed">
                      Employees and applicants will not be subjected to
                      harassment, intimidation, threats, coercion, or
                      discrimination for any of the following activities: filing
                      a complaint; assisting or participating in an
                      investigation, compliance evaluation, hearing, or any
                      other activity related to the administration of the
                      affirmative action provisions of the Vietnam Era Veterans'
                      Readjustment Assistance Act (VEVRAA) of 1974, as amended,
                      or any federal, state, or local law requiring equal
                      opportunity for Veterans; opposing any act or practice
                      made unlawful by VEVRAA or its implementing regulations;
                      or exercising any other right protected by VEVRAA or its
                      implementing regulations.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      Next:
                    </span>
                    <Button
                      onClick={handleNext}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2"
                    >
                      Disability-OFCCP
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Disability-OFCCP */}
          {currentStep === 4 && (
            <div className="w-full space-y-6">
              <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
                <h2 className="text-lg font-semibold text-orange-500 text-left">
                  Voluntary Self-Identification of Disability
                </h2>
              </div>

              <div className="bg-white px-6 pb-6 rounded-lg">
                <div className="space-y-6 text-sm text-gray-700">
                  {/* Form Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-600">Form CC-305</p>
                      <p className="text-xs text-gray-600">Page 1 of 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600">
                        OMB Control Number 1250-0005
                      </p>
                      <p className="text-xs text-gray-600">
                        Expires 04/30/2026
                      </p>
                    </div>
                  </div>

                  {/* Name and Date Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="disability-name"
                        className="text-sm font-medium text-gray-700"
                      >
                        Name:
                      </Label>
                      <Input
                        id="disability-name"
                        placeholder="JM TestUser"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="disability-date"
                        className="text-sm font-medium text-gray-700"
                      >
                        Date:
                      </Label>
                      <Input
                        id="disability-date"
                        placeholder="6/28/2025"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Employee ID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="employee-id"
                        className="text-sm font-medium text-gray-700"
                      >
                        Employee ID:{" "}
                        <span className="text-xs text-gray-500">
                          (if applicable)
                        </span>
                      </Label>
                      <Input id="employee-id" className="mt-1 bg-gray-100" />
                    </div>
                  </div>

                  {/* Why are you being asked section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">
                      Why are you being asked to complete this form?
                    </h3>
                    <p className="leading-relaxed">
                      We are a federal contractor or subcontractor. The law
                      requires us to provide equal employment opportunity to
                      qualified people with disabilities. We have a goal of
                      having at least 7% of our workers as people with
                      disabilities. The law says we must measure our progress
                      towards this goal. To do this, we must ask applicants and
                      employees if they have a disability or have ever had one.
                      People can become disabled, so we need to ask this
                      question at least every five years.
                    </p>
                    <p className="leading-relaxed">
                      Completing this form is voluntary, and we hope that you
                      will choose to do so. Your answer is confidential. No one
                      who makes hiring decisions will see it. Your decision to
                      complete the form and your answer will not harm you in any
                      way. If you want to learn more about the law or this form,
                      visit the U.S. Department of Labor's Office of Federal
                      Contract Compliance Programs (OFCCP) website at{" "}
                      <span className="text-blue-600 underline">
                        www.dol.gov/ofccp
                      </span>
                      .
                    </p>
                  </div>

                  {/* How do you know section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">
                      How do you know if you have a disability?
                    </h3>
                    <p className="leading-relaxed">
                      A disability is a condition that substantially limits one
                      or more of your "major life activities." If you have or
                      have ever had such a condition, you are a person with a
                      disability.{" "}
                      <strong>
                        Disabilities include, but are not limited to:
                      </strong>
                    </p>

                    {/* Disability list in columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>
                          Alcohol or other substance use disorder (not currently
                          using drugs illegally)
                        </li>
                        <li>
                          Autoimmune disorder, for example, lupus, fibromyalgia,
                          rheumatoid arthritis, HIV/AIDS
                        </li>
                        <li>Blind or low vision</li>
                        <li>Cancer (past or present)</li>
                        <li>Cardiovascular or heart disease</li>
                        <li>Celiac disease</li>
                        <li>Cerebral palsy</li>
                        <li>Deaf or serious difficulty hearing</li>
                        <li>Diabetes</li>
                      </ul>
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>
                          Disfigurement, for example, disfigurement caused by
                          burns, wounds, accidents, or congenital disorders
                        </li>
                        <li>Epilepsy or other seizure disorder</li>
                        <li>
                          Gastrointestinal disorders, for example, Crohn's
                          Disease, irritable bowel syndrome
                        </li>
                        <li>Intellectual or developmental disability</li>
                        <li>
                          Mental health conditions, for example, depression,
                          bipolar disorder, anxiety disorder, schizophrenia,
                          PTSD
                        </li>
                        <li>Missing limbs or partially missing limbs</li>
                        <li>
                          Mobility impairment, benefiting from the use of a
                          wheelchair, scooter, walker, leg brace(s) and/or other
                          supports
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="list-disc pl-6 space-y-1 text-sm">
                        <li>
                          Nervous system condition, for example, migraine
                          headaches, Parkinson's disease, multiple sclerosis
                          (MS)
                        </li>
                        <li>
                          Neurodivergence, for example,
                          attention-deficit/hyperactivity disorder (ADHD),
                          autism spectrum disorder, dyslexia, other learning
                          disabilities
                        </li>
                        <li>Partial or complete paralysis (any cause)</li>
                        <li>
                          Pulmonary or respiratory conditions, for example,
                          tuberculosis, asthma, emphysema
                        </li>
                        <li>Short stature (dwarfism)</li>
                        <li>Traumatic brain injury</li>
                      </ul>
                    </div>
                  </div>

                  {/* Radio button section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 text-center">
                      Please check one of the boxes below:
                    </h3>

                    <RadioGroup
                      value={formData.disability}
                      onValueChange={(value) =>
                        updateFormData("disability", value)
                      }
                      className="space-y-3"
                    >
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem
                          value="yes"
                          id="disability-yes"
                          className="mt-1"
                        />
                        <Label
                          htmlFor="disability-yes"
                          className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                        >
                          <strong>Yes, I have a disability</strong>, or have had
                          one in the past
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem
                          value="no"
                          id="disability-no"
                          className="mt-1"
                        />
                        <Label
                          htmlFor="disability-no"
                          className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                        >
                          <strong>No, I do not have a disability</strong> and
                          have not had one in the past
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <RadioGroupItem
                          value="prefer-not"
                          id="disability-prefer-not"
                          className="mt-1"
                        />
                        <Label
                          htmlFor="disability-prefer-not"
                          className="text-sm text-gray-700 cursor-pointer leading-relaxed"
                        >
                          <strong>I do not want to answer</strong>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Public Burden Statement */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      <strong>PUBLIC BURDEN STATEMENT:</strong> According to the
                      Paperwork Reduction Act of 1995 no persons are required to
                      respond to a collection of information unless such
                      collection displays a valid OMB control number. This
                      survey should take about 5 minutes to complete.
                    </p>
                  </div>

                  {/* Next Section Indicator */}
                  <div className="bg-orange-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        Next:
                      </span>
                      <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded text-sm font-medium">
                        Disability and Veteran Status Reporting
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      Next:
                    </span>
                    <Button
                      onClick={handleNext}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2"
                    >
                      Disability and Veteran Status Reporting
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other steps */}
          {currentStep > 4 && currentStep < 12 && (
            <div className="w-full space-y-6">
              <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
                <h2 className="text-lg font-semibold text-orange-500 text-left">
                  {steps[currentStep].label}
                </h2>
              </div>

              <div className="bg-white p-6 rounded-lg">
                <p className="text-gray-700 mb-6">
                  {steps[currentStep].label} content will be implemented here...
                </p>

                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="px-6 py-2"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700">
                      Next:
                    </span>
                    <Button
                      onClick={handleNext}
                      className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2"
                    >
                      {currentStep < steps.length - 1
                        ? steps[currentStep + 1].label
                        : "Complete"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 12: Onboarding Complete */}
          {currentStep === 12 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-gray-100 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  Onboarding Complete
                </h2>
                <p className="text-gray-700 mb-6">
                  You have completed the Trident Seafoods Corporation Employee
                  Onboarding process. Please see your manager for additional
                  information regarding next steps to beginning your first day
                  of work with us here at Trident Seafoods Corporation!
                </p>
                <p className="text-sm text-gray-600">
                  Please click here to close this window.
                </p>
                <Button
                  onClick={onClose}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 mt-4"
                >
                  Close Window
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
