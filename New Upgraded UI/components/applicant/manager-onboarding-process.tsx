"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, FileText } from "lucide-react";
import { useState } from "react";

const STEPS = [
  { id: 1, name: "Welcome!", key: "welcome" },
  { id: 2, name: "Verify EEO Information", key: "verify-eeo" },
  { id: 3, name: "UKGPro Details", key: "ukgpro-details" },
  { id: 4, name: "New Hire Information", key: "new-hire" },
  { id: 5, name: "Form I-9", key: "form-i9" },
  { id: 6, name: "e-Sign Forms", key: "e-sign" },
  { id: 7, name: "Onboarding Complete", key: "complete" },
];

export default function ManagerOnboardingProcess() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    username: "",
    password: "",
    agreeToElectronicSignature: false,
    // UKGPro Details form data
    hireSource: "",
    project: "Western Hills Clinic",
    nationalUnion: "",
    localUnion: "Not Used",
    payGroup: "BiWeekly",
    earningGroup: "All",
    deductionBenefitGroup: "All",
    employeeType: "Regular Full Time",
    shiftGroup: "Not Used",
    shift: "Compressed",
    isAutoPaid: "No",
    payFrequency: "Biweekly",
    // New Hire Information form data
    positionNumber: "1234",
  });
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Vessel Personnel Handbook",
      signed: false,
      signedAt: null as string | null,
      viewRequired: true,
      viewed: false,
    },
    {
      id: 2,
      name: "Case Rate Employment Agreement (Catcher Processors)",
      signed: false,
      signedAt: null as string | null,
      viewRequired: true,
      viewed: false,
    },
    {
      id: 3,
      name: "Standard Offer of Employment",
      signed: false,
      signedAt: null as string | null,
      viewRequired: false,
      viewed: false,
      noSignRequired: true,
    },
  ]);
  const [showSignAllSuccess, setShowSignAllSuccess] = useState(false);
  const [showUnsignedWarning, setShowUnsignedWarning] = useState(false);
  const [viewedAll, setViewedAll] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleViewDocument = (docId: number) => {
    setDocuments((docs) =>
      docs.map((doc) => (doc.id === docId ? { ...doc, viewed: true } : doc))
    );
  };

  const handleViewAll = () => {
    setDocuments((docs) => docs.map((doc) => ({ ...doc, viewed: true })));
    setViewedAll(true);
  };

  const handleSignDocument = (docId: number) => {
    const now = new Date();
    const formattedDate = `${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")}/${now
      .getFullYear()
      .toString()
      .slice(-2)}`;
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const signedAt = `${formattedDate} (${formattedTime})`;

    setDocuments((docs) =>
      docs.map((doc) =>
        doc.id === docId ? { ...doc, signed: true, signedAt } : doc
      )
    );
  };

  const handleSignAll = () => {
    const now = new Date();
    const formattedDate = `${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getDate().toString().padStart(2, "0")}/${now
      .getFullYear()
      .toString()
      .slice(-2)}`;
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const signedAt = `${formattedDate} (${formattedTime})`;

    setDocuments((docs) =>
      docs.map((doc) => ({
        ...doc,
        signed: doc.noSignRequired ? doc.signed : true,
        signedAt: doc.noSignRequired ? doc.signedAt : doc.signedAt || signedAt,
      }))
    );
    setShowSignAllSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Page Header */}
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
              Manager Onboarding
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

      {/* Fixed Navigation Bar */}
      <div className="border-b bg-white">
        <div className="bg-white p-3">
          <div className="flex items-center justify-between overflow-x-auto">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className="flex flex-col items-center flex-1 min-w-0 cursor-pointer"
                onClick={() => setCurrentStep(index + 1)}
              >
                {/* Step Circle */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                    index + 1 === currentStep
                      ? "bg-orange-500 text-white"
                      : index + 1 < currentStep
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1 < currentStep ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step Label */}
                <div
                  className={`text-xs text-center px-1 py-0.5 rounded max-w-20 ${
                    index + 1 === currentStep
                      ? "bg-orange-100 text-orange-800 font-medium"
                      : index + 1 < currentStep
                      ? "bg-green-100 text-green-800"
                      : "text-gray-500"
                  }`}
                >
                  {step.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Step 1: Welcome */}
        {currentStep === 1 && (
          <div className="w-full space-y-6">
            {/* Manager Onboarding Header */}
            <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-500 text-left">
                Hiring Manager Onboarding
              </h2>
            </div>

            <div className="px-6 pb-6 rounded-lg">
              <p className="text-gray-700 mb-6">
                The manager onboarding wizard will ask you for information and
                verifications that are required as your new employee starts
                work. To start, continue to the next step.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0">
                    ⚠️
                  </div>
                  <div className="text-sm text-yellow-800">
                    <strong>ATTENTION MANAGER:</strong> You are about to begin a
                    section that has criminal penalties if information is not
                    completed correctly.
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Next:</span>
                <Button
                  onClick={handleNext}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium"
                >
                  Verify EEO Information
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Verify EEO Information */}
        {currentStep === 2 && (
          <div className="w-full space-y-6">
            <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-500 text-left">
                EEO Questions - Manager Visual Identification
              </h2>
            </div>

            <div className="bg-white px-6 pb-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Listed below is EEO information as provided by the applicant. If
                a specific EEO value was selected by the applicant, the
                applicant's selection will display but cannot be edited.
              </p>

              <p className="text-gray-700 mb-6">
                If the applicant declined to provide certain EEO information,
                please provide the missing data based on visual identification
                of the applicant.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-medium">Gender:</span> Male
                </div>
                <div>
                  <span className="font-medium">
                    Are You Hispanic or Latino?
                  </span>
                  <br />
                  No, I am not Hispanic or Latino.
                </div>
                <div>
                  <span className="font-medium">Race:</span>
                  <br />
                  White (Not Hispanic or Latino) - A person having origins in
                  any of the original peoples of Europe, North Africa, or the
                  Middle East.
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Next:</span>
                <Button
                  onClick={handleNext}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium"
                >
                  UKGPro Details
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: UKGPro Details */}
        {currentStep === 3 && (
          <div className="w-full space-y-6">
            <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-500 text-left">
                UKGPro Details
              </h2>
            </div>

            <div className="bg-white px-6 pb-6 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Hire Source:
                </label>
                <select
                  value={formData.hireSource}
                  onChange={(e) =>
                    setFormData({ ...formData, hireSource: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">None</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Project:
                </label>
                <select
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Western Hills Clinic">
                    Western Hills Clinic
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  National Union:
                </label>
                <select
                  value={formData.nationalUnion}
                  onChange={(e) =>
                    setFormData({ ...formData, nationalUnion: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">choose one...</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Local Union:
                </label>
                <select
                  value={formData.localUnion}
                  onChange={(e) =>
                    setFormData({ ...formData, localUnion: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Not Used">Not Used</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Pay Group:
                </label>
                <select
                  value={formData.payGroup}
                  onChange={(e) =>
                    setFormData({ ...formData, payGroup: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="BiWeekly">BiWeekly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Earning Group:
                </label>
                <select
                  value={formData.earningGroup}
                  onChange={(e) =>
                    setFormData({ ...formData, earningGroup: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="All">All</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Deduction/Benefit
                  Group:
                </label>
                <select
                  value={formData.deductionBenefitGroup}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deductionBenefitGroup: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="All">All</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Employee Type:
                </label>
                <select
                  value={formData.employeeType}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeType: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Regular Full Time">Regular Full Time</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Shift Group:
                </label>
                <select
                  value={formData.shiftGroup}
                  onChange={(e) =>
                    setFormData({ ...formData, shiftGroup: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Not Used">Not Used</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Shift:</label>
                <select
                  value={formData.shift}
                  onChange={(e) =>
                    setFormData({ ...formData, shift: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Compressed">Compressed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Is AutoPaid:
                </label>
                <select
                  value={formData.isAutoPaid}
                  onChange={(e) =>
                    setFormData({ ...formData, isAutoPaid: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-red-500">*</span> Pay Frequency:
                </label>
                <select
                  value={formData.payFrequency}
                  onChange={(e) =>
                    setFormData({ ...formData, payFrequency: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="Biweekly">Biweekly</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-4">
                <span className="text-sm font-medium">Next Step:</span>
                <Button
                  onClick={handleNext}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium"
                >
                  New Hire Information
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: New Hire Information */}
        {currentStep === 4 && (
          <div className="w-full space-y-6">
            <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-500 text-left">
                New Hire Information
              </h2>
            </div>

            <div className="bg-white px-6 pb-6 rounded-lg">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Position Number
                </label>
                <Input
                  value={formData.positionNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, positionNumber: e.target.value })
                  }
                  className="w-32"
                />
              </div>

              <Button
                onClick={handleNext}
                className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium"
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Form I-9 */}
        {currentStep === 5 && (
          <div className="w-full space-y-6">
            <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-500 text-left">
                Form I-9: Employment Eligibility Verification
              </h2>
            </div>

            <div className="bg-white px-6 pb-6 rounded-lg">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">
                    ANTI-DISCRIMINATION NOTICE:
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    All employees can choose which acceptable document(s) they
                    want to present for Form I-9. Employers cannot specify which
                    acceptable document(s) employees must present. Employers
                    cannot reject acceptable documents that reasonably appear to
                    be genuine and to relate to the person presenting them.
                  </p>
                  <p className="text-sm text-gray-700">
                    Refer to the Acceptable Receipts section of the M-274 for
                    more information about acceptable receipts.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">
                    For instructions on completing this form, including how to
                    complete this form, see the instructions.
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    The PDF version of this form is fillable. You may view the
                    fillable PDF version of this form at the links below.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-600" />
                      <a href="#" className="text-blue-600 underline text-sm">
                        Form I-9
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-600" />
                      <a href="#" className="text-blue-600 underline text-sm">
                        Form I-9 Instructions
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-600" />
                      <a href="#" className="text-blue-600 underline text-sm">
                        M-274
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">
                    Last Name (Family Name), First Name (Given Name), M.I.,
                    Citizenship/Immigration Status
                  </p>
                  <div className="text-sm text-gray-600">Co</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">
                    Section 2: Employer Review and Verification
                  </h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Employees or their authorized representative must complete
                    and sign Section 2 within three business days after the
                    employee's first day of employment. You must physically
                    examine, or examine consistent with the alternative
                    procedure authorized by the Secretary of DHS, documentation
                    from List A OR a combination of documentation from List B
                    and List C, as listed on the "Lists of Acceptable
                    Documents."
                  </p>
                  <p className="text-sm text-gray-700">
                    All documents containing an expiration date must be
                    unexpired. Documents submitted by the issuing authority are
                    considered unexpired. Documents submitted by the issuing
                    authority are considered unexpired if the expiration date
                    has not passed. List B and one selection from List C.
                    Examples of many of these documents appear in the Handbook
                    for Employers (M-274).
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                  <p className="text-sm">
                    ⚠️ The Employee has selected "A Citizen of the United
                    States" as part of Section 1 of Form I-9. The following List
                    A documents are valid for "A Citizen of the United States"
                    status:
                  </p>
                  <ul className="text-sm mt-2 ml-4">
                    <li>• U.S. Passport</li>
                    <li>• Driver's License or ID Card</li>
                  </ul>
                  <p className="text-sm mt-2">
                    All items in List B & C are still valid documents to select.
                  </p>
                </div>

                <div className="border border-gray-300 rounded-lg p-4">
                  <h3 className="font-semibold mb-3">List A</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Choose from the list of acceptable documents:
                  </p>

                  <select className="w-full p-2 border border-gray-300 rounded mb-3">
                    <option>U.S. Passport</option>
                  </select>

                  <div className="bg-gray-100 p-3 rounded mb-3">
                    <p className="text-sm font-medium">U.S. Passport</p>
                    <p className="text-sm text-gray-600">
                      * Issuing Authority (Please type the official name of the
                      organization that issued this document):
                    </p>
                    <input
                      type="text"
                      className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
                    />

                    <p className="text-sm text-gray-600 mt-2">* Passport #:</p>
                    <input
                      type="text"
                      className="w-full mt-1 p-1 border border-gray-300 rounded text-sm"
                      placeholder="xxxxxxxxx"
                    />

                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        Is the document a Receipt?
                      </p>
                      <div className="flex gap-4 mt-1">
                        <label className="flex items-center">
                          <input type="radio" name="receipt" className="mr-1" />
                          <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="receipt"
                            className="mr-1"
                            defaultChecked
                          />
                          <span className="text-sm">No</span>
                        </label>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-3">
                      Employees MUST record an expiration date if a document has
                      one.
                    </p>
                    <p className="text-sm text-gray-600">
                      Expiration Date (if any):
                    </p>
                    <input
                      type="date"
                      className="mt-1 p-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Additional Information</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Use this space to notate any additional information required
                    for the Form I-9. See instructions for examples. You may
                    leave this field blank if the instructions do not require
                    any additional notations.
                  </p>
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    rows={3}
                  ></textarea>
                </div>

                <div className="border border-gray-300 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-3">
                    Check here if you used an alternative procedure authorized
                    by DHS to examine documents.
                  </p>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Alternative procedure used</span>
                  </label>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">CERTIFICATION</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    I attest, under penalty of perjury, that (1) I have examined
                    the documentation presented by the above-named employee, (2)
                    the above-listed documentation appears to be genuine and to
                    relate to the employee named, and (3) to the best of my
                    knowledge, the employee is authorized to work in the United
                    States.
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    First Day of Employment (month/day/year):
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    Note: This is your authorized representative must complete
                    Section 2 by examining evidence of identity and employment
                    authorization within 3 business days of the employee's first
                    day of employment. See instructions for more information.
                  </p>
                  <input
                    type="date"
                    className="p-1 border border-gray-300 rounded text-sm"
                  />

                  <div className="mt-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">
                        Check here to agree that this information is accurate.
                        As the employer, you are responsible to review and
                        complete this information.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6">
                <span className="text-sm font-medium">Next Step:</span>
                <Button
                  onClick={handleNext}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium"
                >
                  HR Authorization
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 6: e-Sign Forms */}
        {currentStep === 6 && (
          <div className="w-full space-y-6">
            <div className="bg-orange-400/[0.08] py-4 px-6 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-500 text-left">
                e-Sign Forms
              </h2>
            </div>

            <div className="bg-white px-6 pb-6 rounded-lg">
              {/* Success Message */}
              {showSignAllSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-medium">Success!</span>
                  </div>
                  <p className="text-green-800 text-sm mt-1">
                    {documents.filter((doc) => doc.signed).length ===
                    documents.length
                      ? "All the documents were signed successfully."
                      : "Document Vessel Personnel Handbook has been signed successfully."}
                  </p>
                </div>
              )}

              {/* Warning Message */}
              {showUnsignedWarning && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-600">⚠️</span>
                    <span className="text-yellow-800 font-medium">
                      Some documents remain unsigned
                    </span>
                  </div>
                  <p className="text-yellow-800 text-sm mt-1">
                    Some documents cannot be signed until you view them. Please
                    open the appropriate documents for viewing and sign again.
                  </p>
                </div>
              )}

              <p className="text-gray-700 mb-4">
                The following forms require your electronic signature. The forms
                contain information provided by you and the recruiter.
              </p>

              <p className="text-gray-700 mb-4">
                All forms contain a certification stating you have read the
                form, and that all information contained in the form is truthful
                and accurate. You must read, verify, and sign each form.
              </p>

              <p className="text-gray-700 mb-4">
                You sign each form by clicking the "Sign" button below the form.
                Once you sign each form, you cannot correct any information that
                you have provided in the form.
              </p>

              <p className="text-gray-700 mb-6">
                By signing each form, you acknowledge that you have read the
                form, understand all statements associated with it, and that all
                information contained in the form is truthful and accurate.
              </p>

              <p className="text-gray-700 mb-6">
                If you have questions about the forms, please contact Trident
                Seafoods: hrops@tridentseafoods.com or (206) 789-8545.
              </p>

              {/* Info Boxes */}
              <div className="space-y-4 mb-6">
                <div className="bg-gray-100 border border-gray-300 rounded p-3">
                  <p className="text-sm text-gray-700">
                    Throughout these web pages on electronic signature you may
                    click on view links that are underlined and an Adobe PDF
                    file version of a document or form will open for your
                    review. You may also print these documents.
                  </p>
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded p-3">
                  <p className="text-sm text-gray-700">
                    <strong>PLEASE NOTE:</strong> If you view the document
                    before signing here, Employee signature is not visible.
                    Employee has signed during Employee Onboarding. However, you
                    need to sign here to complete the process. After you sign
                    here, Employee's and your signature is visible.
                  </p>
                </div>
              </div>

              {/* Documents List */}
              <div className="space-y-4 mb-6">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="border border-gray-300 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <div>
                          <span className="font-medium">{doc.name}</span>
                          {doc.noSignRequired && (
                            <span className="text-gray-500 text-sm ml-2">
                              *no sign required
                            </span>
                          )}
                          {!doc.signed &&
                            doc.viewRequired &&
                            !doc.viewed &&
                            !doc.noSignRequired && (
                              <span className="text-gray-500 text-sm ml-2">
                                (view required before signing)
                              </span>
                            )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-orange-600"
                          onClick={() => handleViewDocument(doc.id)}
                        >
                          View
                        </Button>
                        {!doc.signed &&
                          !doc.noSignRequired &&
                          (doc.viewed || viewedAll || !doc.viewRequired) && (
                            <Button
                              size="sm"
                              className="text-orange-600 border-orange-600"
                              variant="outline"
                              onClick={() => handleSignDocument(doc.id)}
                            >
                              Sign ✏️
                            </Button>
                          )}
                        {doc.signed && doc.signedAt && (
                          <span className="text-sm text-gray-600">
                            Signed on {doc.signedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant="outline"
                  className="bg-orange-100 text-orange-700 border-orange-300"
                  onClick={handleViewAll}
                >
                  👁️ View All
                </Button>
                <Button
                  className="bg-orange-500 text-white"
                  onClick={handleSignAll}
                >
                  ✏️ Sign All
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Next:</span>
                <Button
                  onClick={handleNext}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded font-medium"
                  disabled={documents.some(
                    (doc) => !doc.signed && !doc.noSignRequired
                  )}
                >
                  Complete Onboarding
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Onboarding Complete */}
        {currentStep === 7 && (
          <div className="w-full">
            <div className="bg-orange-400/[0.08] p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Onboarding Complete
              </h2>
              <p className="text-gray-700 mb-6">
                You have completed Manager Onboarding! Please make sure your new
                employee receives all of the appropriate paperwork, and welcome
                them to Trident Seafoods!
              </p>
              <p
                className="text-orange-600 text-sm cursor-pointer hover:underline"
                onClick={() => (window.location.href = "/applicant?id=1")}
              >
                Please click here to close this window.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
