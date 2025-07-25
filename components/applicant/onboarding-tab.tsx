import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useEffect, useState } from "react";

export default function OnboardingTab() {
  const [activeTab, setActiveTab] = useState("controls");
  const [employeeOnboardingReset, setEmployeeOnboardingReset] = useState(false);
  const [managerOnboardingComplete, setManagerOnboardingComplete] =
    useState(true); // Set to true to show completion status

  const handleResetCompleteOnboarding = () => {
    setEmployeeOnboardingReset(true);
    setManagerOnboardingComplete(false);
  };

  const handleCompleteManagerOnboarding = () => {
    window.open("/manager-onboarding", "_blank");
  };

  // Check if returning from manager onboarding completion
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("managerComplete") === "true") {
      setManagerOnboardingComplete(true);
    }
  }, []);

  const signedDocuments = [
    {
      name: "Case Rate Employment Agreement (Catcher Processors)",
      signedBy: "Employee",
      signedDate: "Jun 26, 2025 (5:12 PM)",
      managerSignatureRequired: true,
    },
    {
      name: "W-4",
      signedBy: "Employee",
      signedDate: "Jun 26, 2025 (5:12 PM)",
      managerSignatureRequired: false,
    },
    {
      name: "Standard Offer of Employment",
      signedBy: "Employee",
      signedDate: "Jun 26, 2025 (5:12 PM)",
      managerSignatureRequired: false,
    },
    {
      name: "Trident Seafoods Corporation Employment Application Summary",
      signedBy: "Employee",
      signedDate: "Jun 26, 2025 (5:05 PM)",
      managerSignatureRequired: false,
    },
    {
      name: "Employment Background Report Disclosure",
      signedBy: "Employee",
      signedDate: "Jun 26, 2025 (5:12 PM)",
      managerSignatureRequired: false,
    },
    {
      name: "Anti-Discrimination and Anti-Harassment Policy",
      signedBy: "Employee",
      signedDate: "Jun 26, 2025 (5:12 PM)",
      managerSignatureRequired: false,
    },
    {
      name: "Onboarding - Voluntary Self-Identification of Disability CC-305",
      signedBy: "Employee",
      signedDate: "Jun 26, 2025 (5:12 PM)",
      managerSignatureRequired: false,
    },
    {
      name: "Vessel Personnel Handbook",
      signedBy: "Employee",
      signedDate: "Jun 26, 2025 (5:12 PM)",
      managerSignatureRequired: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation Buttons */}
      <div className="flex gap-3">
        <Button
          variant={activeTab === "controls" ? "default" : "outline"}
          size="sm"
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "controls"
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "border-orange-400 text-orange-700 hover:bg-orange-50"
          }`}
          onClick={() => setActiveTab("controls")}
        >
          Onboarding Controls
        </Button>
        <Button
          variant={activeTab === "details" ? "default" : "outline"}
          size="sm"
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "details"
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "border-orange-400 text-orange-700 hover:bg-orange-50"
          }`}
          onClick={() => setActiveTab("details")}
        >
          Onboarding Details
        </Button>
        <Button
          variant={activeTab === "documents" ? "default" : "outline"}
          size="sm"
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "documents"
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "border-orange-400 text-orange-700 hover:bg-orange-50"
          }`}
          onClick={() => setActiveTab("documents")}
        >
          Signed Documents
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "controls" && (
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Onboarding
              </h2>
              <h3 className="text-lg font-medium text-gray-800">
                Employee Onboarding
              </h3>
            </div>

            {/* Employee Onboarding Status */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span className="text-sm text-gray-700">
                  Onboarding Complete -- 3/20/25 (10:16 PM)
                </span>
              </div>
              <Button
                onClick={handleResetCompleteOnboarding}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Reset Complete Onboarding
              </Button>
            </div>

            {/* Manager Onboarding Section */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800">
                Manager Onboarding
              </h3>
              {managerOnboardingComplete ? (
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-sm text-gray-700">
                    Onboarding Complete -- 3/20/25 (10:16 PM)
                  </span>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-700">
                    Manager Onboarding has been reset.
                  </p>
                  <div className="flex items-center gap-2 text-orange-600">
                    <FileText className="w-4 h-4" />
                    <span
                      className="text-sm hover:underline cursor-pointer"
                      onClick={handleCompleteManagerOnboarding}
                    >
                      Complete Manager Onboarding
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "details" && (
        <div className="space-y-8">
          {/* Personal Information Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-500 text-white rounded text-xs flex items-center justify-center font-medium">
                P
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Personal Information
              </h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">Full Name:</span>
                  <p className="text-gray-600">Ben Rodriguez</p>
                </div>
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">Email:</span>
                  <p className="text-gray-600">testemail898955@gmail.com</p>
                </div>
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">Phone:</span>
                  <p className="text-gray-600">623-388-8144 (home)</p>
                </div>
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">Address:</span>
                  <p className="text-gray-600">
                    3523 W Stella Lane Phoenix, AZ 85019
                  </p>
                </div>
              </div>
              <div className="text-sm space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  If you are traveling to Alaska, please select your Departure
                  City from the drop down list. If you are not traveling to
                  Alaska, please select N/A - Position not in Alaska:{" "}
                  <span className="text-orange-600">Change</span>
                </p>
                <p className="text-gray-600 leading-relaxed">
                  If you are applying as a Seafood Processor, please select your
                  first preference on where you want to work, everyone else
                  please select N/A - Not applying as a Seafood Processor:{" "}
                  <span className="text-orange-600">
                    N/A - Not applying as a Seafood Processor
                  </span>
                </p>
                <p className="text-gray-600 leading-relaxed">
                  If you are applying as a Seafood Processor, please select your
                  second preference on where you want to work, everyone else
                  please select N/A - Not applying as a Seafood Processor:{" "}
                  <span className="text-orange-600">
                    N/A - Not applying as a Seafood Processor
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* EEO Questions Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-500 text-white rounded text-xs flex items-center justify-center font-medium">
                E
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                EEO Questions
              </h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="text-sm space-y-3">
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Gender:</span>
                  <span className="text-gray-600">Male</span>
                </div>
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">
                    Are You Hispanic or Latino?
                  </span>
                  <p className="text-gray-600">
                    No, I am not Hispanic or Latino.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">Race:</span>
                  <p className="text-gray-600 leading-relaxed">
                    White (Not Hispanic or Latino) - A person having origins in
                    any of the original peoples of Europe, North Africa, or the
                    Middle East.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Veteran Status Questions Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-500 text-white rounded text-xs flex items-center justify-center font-medium">
                V
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Veteran Status Questions
              </h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-sm space-y-2">
                <span className="font-medium text-gray-700">
                  Veteran Status:
                </span>
                <p className="text-gray-600">I AM NOT A PROTECTED VETERAN</p>
              </div>
            </div>
          </div>

          {/* Disability OFCCP Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-500 text-white rounded text-xs flex items-center justify-center font-medium">
                D
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Disability OFCCP
              </h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
              <div className="text-sm space-y-3">
                <div className="space-y-2">
                  <span className="font-medium text-gray-700">
                    Disability Status:
                  </span>
                  <span className="text-gray-600">
                    No, I do not have a disability and have not had one in the
                    past
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="text-gray-600">N/A Testbed</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-gray-700">Date:</span>
                  <span className="text-gray-600">06/24/2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-500 text-white rounded text-xs flex items-center justify-center font-medium">
                C
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Emergency Contacts
              </h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6">
              <div className="text-sm">
                <div className="font-medium text-gray-700 mb-3">
                  Jackie Testbed
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="text-gray-600">United States of America</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="text-gray-600">858-726-7771</span>
                  </div>
                </div>
              </div>
              <div className="text-sm border-t border-gray-300 pt-6">
                <div className="font-medium text-gray-700 mb-3">
                  Richard Buckshaw
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-700">Address:</span>
                    <p className="text-gray-600">United States of America</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-gray-700">Phone:</span>
                    <span className="text-gray-600">253-750-4162</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Deposit Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-500 text-white rounded text-xs flex items-center justify-center font-medium">
                $
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Direct Deposit
              </h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-sm space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Direct Deposit Enrollment:
                  </span>
                  <span className="text-gray-600">Enrolled</span>
                </div>
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    I authorize Trident Seafoods to electronically credit my
                    account (and, if necessary, to electronically debit my
                    account to correct erroneous credits) as follows:
                  </p>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Statement authorized</span>
                  <span className="text-gray-600">06/26</span>
                </div>
                <div>
                  <p className="text-gray-600 leading-relaxed">
                    I understand that this authorization will remain in full
                    force and effect until I notify Trident Seafoods that I wish
                    to revoke this authorization.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-500 text-white rounded text-xs flex items-center justify-center font-medium">
                +
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Additional Info
              </h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="text-sm space-y-4">
                <div>
                  <span className="font-medium text-gray-700">
                    Disability and Veteran Status Reporting
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Are you requesting an accommodation?
                  </span>
                  <span className="text-gray-600">No</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Are you a Veteran of the United States Armed Forces?
                  </span>
                  <span className="text-gray-600">No</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Signed Documents
            </h2>
            <p className="text-gray-600">
              The following documents have been signed:
            </p>
          </div>

          <div className="space-y-4">
            {signedDocuments.map((doc, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-8 items-start py-3"
              >
                {/* Document Name Column */}
                <div className="col-span-5 flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div className="font-medium text-orange-600 hover:text-orange-700 cursor-pointer">
                    {doc.name}
                  </div>
                </div>

                {/* Signed By Employee Column */}
                <div className="col-span-4">
                  <div className="text-sm text-gray-600">
                    Signed by {doc.signedBy}
                  </div>
                  <div className="text-sm text-gray-600">{doc.signedDate}</div>
                </div>

                {/* Manager Signature Required Column */}
                <div className="col-span-3 text-right">
                  {doc.managerSignatureRequired ? (
                    <span className="text-sm text-gray-600 font-bold">
                      Manager signature required
                    </span>
                  ) : (
                    <span className="text-sm text-gray-600">--</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4">
            <Button
              variant="outline"
              className="text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              📄 View All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
