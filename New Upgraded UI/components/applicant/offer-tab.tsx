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
import { useState } from "react";

export default function OfferTab() {
  const [activeOfferTab, setActiveOfferTab] = useState("offer-details");
  const [showOfferDetailsModal, setShowOfferDetailsModal] = useState(false);
  const [showEditFieldModal, setShowEditFieldModal] = useState(false);
  const [showResponseHistoryModal, setShowResponseHistoryModal] =
    useState(false);
  const [showPrepareOfferLetterModal, setPrepareOfferLetterModal] =
    useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedDynamicField, setSelectedDynamicField] = useState("");
  const [letterBody, setLetterBody] = useState("");
  const [offerLetterCompleted, setOfferLetterCompleted] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [offerLetterType, setOfferLetterType] = useState("working");
  const [showSendOfferModal, setShowSendOfferModal] = useState(false);
  const [offerSentForESign, setOfferSentForESign] = useState(false);
  const [offerPrinted, setOfferPrinted] = useState(false);
  const [editingField, setEditingField] = useState<{
    key: string;
    title: string;
    type: string;
    value: string;
  } | null>(null);
  const [offerDetailsCompleted, setOfferDetailsCompleted] = useState(true); // Set to true to show completed state

  // Sample offer data based on the first image
  const [offerData, setOfferData] = useState({
    positionTitle: "as",
    startDate: "7/16/2025",
    jobStatus: "Exempt",
    supervisorName: "sd",
    supervisorEmail: "sanya@commercev3.com",
    handout: "Intern Onboarding - BH Packet",
    identogo: "Yes",
    map: "CareNow",
    ftpt: "Full Time",
  });

  // Field configurations for editing
  const fieldConfigs: Record<
    string,
    { title: string; type: string; options?: string[] }
  > = {
    positionTitle: { title: "Position Title", type: "text" },
    startDate: { title: "Start Date", type: "date" },
    jobStatus: {
      title: "Job Status",
      type: "select",
      options: ["Exempt", "Non-Exempt"],
    },
    supervisorName: { title: "Supervisor Name", type: "text" },
    supervisorEmail: { title: "Supervisor Email", type: "email" },
    handout: {
      title: "Which informational handout should this applicant receive?",
      type: "select",
      options: [
        "ECS Informational Handout",
        "Full Time/Market Informational Handout",
        "Pool/Part Time Informational Handout",
        "Intern Onboarding - BH Packet",
        "Intern Onboarding - CFS Packet",
        "Intern Onboarding - Other",
        "None",
      ],
    },
    identogo: {
      title: "Should this applicant receive the IndentoGo form?",
      type: "select",
      options: ["Yes", "No"],
    },
    map: {
      title: "Which map do they need to receive?",
      type: "select",
      options: ["CareNow", "Concentra", "OHS", "None"],
    },
    ftpt: {
      title: "FT/PT",
      type: "select",
      options: ["Full Time", "Part Time"],
    },
  };

  const handleViewEditOfferDetails = () => {
    setShowOfferDetailsModal(true);
  };

  const handleEditField = (fieldKey: string) => {
    const config = fieldConfigs[fieldKey as keyof typeof fieldConfigs];
    if (config) {
      setEditingField({
        key: fieldKey,
        title: config.title,
        type: config.type,
        value: offerData[fieldKey as keyof typeof offerData],
      });
      setShowEditFieldModal(true);
    }
  };

  const handleSaveEdit = () => {
    if (editingField) {
      setOfferData((prev) => ({
        ...prev,
        [editingField.key]: editingField.value,
      }));

      // Show success alert
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
    setShowEditFieldModal(false);
    setEditingField(null);
  };

  const handleCancelEdit = () => {
    setShowEditFieldModal(false);
    setEditingField(null);
  };

  const handleCloseOfferDetails = () => {
    setShowOfferDetailsModal(false);
  };

  // Dynamic fields for offer letter
  const dynamicFields = [
    "[Application: Applicant Status]",
    "[Application: Application Date]",
    "[Application: Base Pay]",
    "[Application: Base Pay Rate]",
    "[Application: Exclusivity Period Ends]",
    "[Application: Expiration Date]",
    "[Application: HRMS Pay Frequency]",
    "[Application: Job Title]",
    "[Application: Prescreener Status]",
    "[AppliedForLocation: Address 1]",
    "[AppliedForLocation: Address 2]",
    "[AppliedForLocation: City]",
    "[AppliedForLocation: Country]",
    "[AppliedForLocation: Email Address]",
    "[AppliedForLocation: Name]",
    "[AppliedForLocation: Phone Number]",
    "[AppliedForLocation: State]",
    "[AppliedForLocation: Zip/Postal Code]",
    "[Candidate: Alternate Phone]",
    "[Candidate: Applicant User Name]",
    "[Candidate: Cell Phone]",
    "[Candidate: City]",
    "[Candidate: Country]",
    "[Candidate: Email Address]",
    "[Candidate: First Name]",
    "[Candidate: Home Phone]",
    "[Candidate: Last Name]",
    "[Candidate: Prefix]",
    "[Candidate: Signature]",
    "[Candidate: SignatureDate]",
    "[Candidate: State]",
    "[Candidate: Work Phone]",
    "[Candidate: Zip/Postal Code]",
    "[Company Name]",
    "[Job: Hiring Manager]",
    "[Job Title]",
    "[Link: OfferLetterESign]",
    "[Location: Address 1]",
    "[Location: Address 2]",
    "[Location: City]",
    "[Location: Country]",
    "[Location: Email Address]",
    "[Location: Name]",
    "[Location: Phone Number]",
    "[Location: State]",
    "[Location: Zip/Postal Code]",
    "[Offer: Calculated Base Pay]",
    "[Offer: Exempt/NonExempt]",
    "[Offer: Position Title]",
    "[Offer: Start Date]",
    "[Offer: Supervisor Email]",
    "[Offer: Supervisor Name]",
    "[Requisition: Requisition Number]",
    "[Site Name]",
    "[System Date]",
  ];

  const handleInsertDynamicField = () => {
    if (selectedDynamicField) {
      setLetterBody((prev) => prev + selectedDynamicField);
      setSelectedDynamicField("");
    }
  };

  // Template content based on the images
  const templateContent = {
    newhire: `[System Date]

[Candidate: First Name] [Candidate: Last Name]


Dear [Candidate: First Name],

Congratulations on your recent interview for the [Offer: Position Title]. MHMR has extended an offer to you for the position. We are glad you have accepted the offer and look forward to your continued contributions to the MHMR We Care values. The following will provide additional details about your new position.

Title: [Offer: Position Title]
Status: [Offer: Exempt/NonExempt]
Start Date: [Offer: Start Date]
Hours of Work: 2080
Pay: $[Application: Base Pay]
Supervisor Name: [Offer: Supervisor Name] ([Offer: Supervisor Email])

The date may change depending on the needs of either program. The managers will agree on the transfer date. Please let us know if you have any additional questions.

My Health My Resources (MHMR) of Tarrant County is an at-will employer. That means that either you or MHMR of Tarrant County are free to end the employment relationship at any time, with or without notice or cause, and nothing in this letter or MHMR of Tarrant County policies or procedures, either now or in the future, are intended to change the at-will nature of our relationship.

For those employees required to obtain fingerprints, results have been received in Human Resources.

Best wishes on your new position.`,
    bilingual: `[System Date]

[Candidate: First Name] [Candidate: Last Name]


Dear [Candidate: First Name],

Congratulations on your recent interview for the [Offer: Position Title]. MHMR has extended a bilingual stipend offer to you for the position. We are glad you have accepted the offer and look forward to your continued contributions to the MHMR We Care values.

Title: [Offer: Position Title]
Status: [Offer: Exempt/NonExempt]
Start Date: [Offer: Start Date]
Hours of Work: 2080
Pay: $[Application: Base Pay] + Bilingual Stipend
Supervisor Name: [Offer: Supervisor Name] ([Offer: Supervisor Email])

Best wishes on your new position.`,
    dual: `[System Date]

[Candidate: First Name] [Candidate: Last Name]


Dear [Candidate: First Name],

This is a dual offer letter for the [Offer: Position Title] position.

Title: [Offer: Position Title]
Status: [Offer: Exempt/NonExempt]
Start Date: [Offer: Start Date]
Pay: $[Application: Base Pay]
Supervisor Name: [Offer: Supervisor Name] ([Offer: Supervisor Email])

Best wishes on your new position.`,
    final: `[System Date]

[Candidate: First Name] [Candidate: Last Name]


Dear [Candidate: First Name],

Final job bid letter updated 12/02/2021 for the [Offer: Position Title] position.

Title: [Offer: Position Title]
Status: [Offer: Exempt/NonExempt]
Start Date: [Offer: Start Date]
Pay: $[Application: Base Pay]
Supervisor Name: [Offer: Supervisor Name] ([Offer: Supervisor Email])

Best wishes on your new position.`,
    intern: `[System Date]

[Candidate: First Name] [Candidate: Last Name]


Dear [Candidate: First Name],

Congratulations on your acceptance as an intern for the [Offer: Position Title] position.

Title: [Offer: Position Title]
Status: [Offer: Exempt/NonExempt]
Start Date: [Offer: Start Date]
Hours of Work: 2080
Pay: $[Application: Base Pay]
Supervisor Name: [Offer: Supervisor Name] ([Offer: Supervisor Email])

Best wishes on your internship.`,
  };

  const handleTemplateChange = (templateKey: string) => {
    if (
      templateKey &&
      templateContent[templateKey as keyof typeof templateContent]
    ) {
      setLetterBody(
        templateContent[templateKey as keyof typeof templateContent]
      );
    }
  };

  return (
    <div className="w-full mt-4">
      {/* Sub-tabs - Using same styling as Application tab */}
      <div className="mb-6">
        <div className="flex space-x-0">
          <button
            onClick={() => setActiveOfferTab("offer-details")}
            className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
              activeOfferTab === "offer-details"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Offer Details
          </button>
          <button
            onClick={() => setActiveOfferTab("documents")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
              activeOfferTab === "documents"
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            Documents
          </button>
        </div>
      </div>

      {/* Content */}
      {activeOfferTab === "offer-details" && (
        <div>
          {!offerDetailsCompleted ? (
            <>
              <h4 className="text-base font-semibold text-gray-900 mb-4">
                Offer Details
              </h4>

              {/* Warning Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  Offer details are incomplete. Please provide additional
                  detail.
                </p>
              </div>

              {/* Enter Offer Details Button */}
              <button
                onClick={handleViewEditOfferDetails}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Enter Offer Details
              </button>
            </>
          ) : (
            /* Final Content - Simplified without cards */
            <div>
              <h3 className="text-lg font-semibold mb-4">Offer</h3>

              <div className="mb-6">
                <h4 className="text-base font-semibold mb-2">Offer Details</h4>
                <div className="flex items-center mb-2">
                  <span className="text-green-600 mr-2">✓</span>
                  <span className="text-sm">
                    Offer Details Complete - 7/4/25 (9:57 PM)
                  </span>
                </div>
                <button
                  onClick={handleViewEditOfferDetails}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  View/Edit Offer Details
                </button>
              </div>

              <div className="mb-6">
                <h4 className="text-base font-semibold mb-2">Offer Letter</h4>
                {!offerLetterCompleted ? (
                  <>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-3">
                      <p className="text-sm text-yellow-800">
                        Offer letter is incomplete. Please prepare the offer
                        letter.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsEditMode(false);
                        setPrepareOfferLetterModal(true);
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      Prepare Offer Letter
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center mb-3">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-sm">
                        Offer Letter Complete - 7/15/25 (2:54 PM)
                      </span>
                    </div>
                    {!offerPrinted && (
                      <div className="flex gap-3 mb-4">
                        <button
                          onClick={() => {
                            setIsEditMode(true);
                            setPrepareOfferLetterModal(true);
                          }}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit Offer Letter
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium">
                          Preview Offer Letter
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {offerLetterCompleted && (
                <div>
                  <h4 className="text-base font-semibold mb-2">
                    Offer Message or Print
                  </h4>

                  {!offerSentForESign && !offerPrinted && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                      <p className="text-sm text-yellow-800">
                        The offer letter is ready, you can print or send through
                        email.
                      </p>
                    </div>
                  )}

                  {offerSentForESign && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
                      <p className="text-sm text-yellow-800">
                        Offer letter sent, awaiting e-signature
                      </p>
                    </div>
                  )}

                  {offerPrinted && (
                    <div className="flex items-center mb-3">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-sm">
                        Offer Printed - 7/15/25 (3:18 PM)
                      </span>
                    </div>
                  )}

                  {!offerPrinted && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowSendOfferModal(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        Send Offer for e-Sign
                      </button>
                      <button
                        onClick={() => {
                          setOfferPrinted(true);
                          setShowSuccessAlert(true);
                          setTimeout(() => setShowSuccessAlert(false), 3000);
                        }}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          />
                        </svg>
                        Print Offer Letter
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeOfferTab === "documents" && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Offer Documents
          </h3>
          <p className="text-sm text-gray-700 mb-6">
            The following offer letter(s) have been printed or sent.
          </p>

          <div className="border border-gray-300 rounded-lg p-6 bg-white">
            {offerPrinted || offerSentForESign ? (
              <div className="flex items-center">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center mr-4">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Offer Letter
                </div>
                <span className="text-sm text-gray-700">
                  - 7/15/25 (3:18 PM) -
                  <span className="font-medium ml-1">
                    {offerPrinted ? "Printed" : "Sent"}
                  </span>
                </span>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No offer letters have been printed or sent yet.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Offer Details Modal - First Image */}
      <Dialog
        open={showOfferDetailsModal}
        onOpenChange={setShowOfferDetailsModal}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Offer Details
            </DialogTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResponseHistoryModal(true)}
              className="absolute top-4 right-16 border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Response History
            </Button>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 p-6">
            <div className="space-y-4">
              {/* Position Title */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Position Title
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">
                    {offerData.positionTitle}
                  </span>
                  <button
                    onClick={() => handleEditField("positionTitle")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Start Date */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Start Date
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">
                    {offerData.startDate}
                  </span>
                  <button
                    onClick={() => handleEditField("startDate")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Job Status */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Job Status
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">
                    {offerData.jobStatus}
                  </span>
                  <button
                    onClick={() => handleEditField("jobStatus")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Supervisor Name */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Supervisor Name
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">
                    {offerData.supervisorName}
                  </span>
                  <button
                    onClick={() => handleEditField("supervisorName")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Supervisor Email */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Supervisor Email
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">
                    {offerData.supervisorEmail}
                  </span>
                  <button
                    onClick={() => handleEditField("supervisorEmail")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Which informational handout */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Which informational handout should this applicant receive?
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">
                    {offerData.handout}
                  </span>
                  <button
                    onClick={() => handleEditField("handout")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Should this applicant receive the IndentoGo form? */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Should this applicant receive the IndentoGo form?
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">
                    {offerData.identogo}
                  </span>
                  <button
                    onClick={() => handleEditField("identogo")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Which map do they need to receive? */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">
                  Which map do they need to receive?
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">{offerData.map}</span>
                  <button
                    onClick={() => handleEditField("map")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* FT/PT */}
              <div className="flex items-center justify-between py-3 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">FT/PT</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-900">
                    {offerData.ftpt}
                  </span>
                  <button
                    onClick={() => handleEditField("ftpt")}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button
              variant="outline"
              onClick={handleCloseOfferDetails}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Field Modal - Second Image */}
      <Dialog open={showEditFieldModal} onOpenChange={setShowEditFieldModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Offer Script Question
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <p className="text-sm text-gray-700 mb-2">
              You can change the response to this question below.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              <strong>Note:</strong> all changes to responses will be captured
              in the "Response History" section.
            </p>

            {editingField && (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    <span className="text-red-500">*</span> {editingField.title}
                  </Label>

                  {editingField.type === "text" && (
                    <Input
                      type="text"
                      value={editingField.value}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          value: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  )}

                  {editingField.type === "email" && (
                    <Input
                      type="email"
                      value={editingField.value}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          value: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  )}

                  {editingField.type === "date" && (
                    <Input
                      type="date"
                      value={editingField.value}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          value: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  )}

                  {editingField.type === "select" && (
                    <select
                      value={editingField.value}
                      onChange={(e) =>
                        setEditingField({
                          ...editingField,
                          value: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    >
                      {fieldConfigs[editingField.key]?.options?.map(
                        (option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="border-t pt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={handleCancelEdit}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Alert */}
      {showSuccessAlert && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
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
            <span>Changes saved successfully!</span>
          </div>
        </div>
      )}

      {/* Response History Modal */}
      <Dialog
        open={showResponseHistoryModal}
        onOpenChange={setShowResponseHistoryModal}
      >
        <DialogContent className="max-w-5xl h-[80vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Complete Response History
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <p className="text-sm text-gray-700 mb-6">
              View the history of changes that have been made to the responses
              to the questions.
            </p>

            <div className="overflow-y-auto h-[calc(80vh-200px)] space-y-6">
              {/* Position Title */}
              <div className="border border-gray-300 rounded">
                <div className="p-4 border-b border-gray-300 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="font-medium text-gray-900">
                    Position Title
                  </span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-orange-500 bg-opacity-10">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Date of Edit
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Changed To
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Changed From
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Changed By
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900">--</td>
                      <td className="px-4 py-3 text-sm text-gray-900">--</td>
                      <td className="px-4 py-3 text-sm text-gray-900">--</td>
                      <td className="px-4 py-3 text-sm text-gray-900">--</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Start Date */}
              <div className="border border-gray-300 rounded">
                <div className="p-4 border-b border-gray-300 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="font-medium text-gray-900">Start Date</span>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-orange-500 bg-opacity-10">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Date of Edit
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Changed To
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Changed From
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                        Changed By
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900">--</td>
                      <td className="px-4 py-3 text-sm text-gray-900">--</td>
                      <td className="px-4 py-3 text-sm text-gray-900">--</td>
                      <td className="px-4 py-3 text-sm text-gray-900">--</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Add more fields as needed - keeping it concise for now */}
              {Object.keys(fieldConfigs)
                .slice(2)
                .map((fieldKey) => (
                  <div
                    key={fieldKey}
                    className="border border-gray-300 rounded"
                  >
                    <div className="p-4 border-b border-gray-300 flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <span className="font-medium text-gray-900">
                        {fieldConfigs[fieldKey].title}
                      </span>
                    </div>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-orange-500 bg-opacity-10">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Date of Edit
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Changed To
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Changed From
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                            Changed By
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-gray-200">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            --
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            --
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            --
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            --
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ))}
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button
              variant="outline"
              onClick={() => setShowResponseHistoryModal(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Prepare Offer Letter Modal */}
      <Dialog
        open={showPrepareOfferLetterModal}
        onOpenChange={(open) => {
          setPrepareOfferLetterModal(open);
          if (!open) {
            setIsEditMode(false);
          }
        }}
      >
        <DialogContent className="max-w-6xl h-[90vh] overflow-hidden">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {isEditMode ? "Edit Offer Letter" : "Prepare Offer Letter"}
            </DialogTitle>
          </DialogHeader>

          <div className="p-6 overflow-y-auto flex-1">
            <p className="text-sm text-gray-700 mb-6">
              Complete the fields below to make an offer letter.
            </p>

            <div className="space-y-6">
              {/* Choose Offer Letter Template */}
              {isEditMode ? (
                <div>
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-700 mb-4 block">
                      Choose Offer Letter:
                    </Label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="working"
                          name="offerLetterType"
                          value="working"
                          checked={offerLetterType === "working"}
                          onChange={(e) => setOfferLetterType(e.target.value)}
                          className="mr-3"
                        />
                        <label
                          htmlFor="working"
                          className="text-sm text-gray-700"
                        >
                          Working Copy
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="template"
                          name="offerLetterType"
                          value="template"
                          checked={offerLetterType === "template"}
                          onChange={(e) => setOfferLetterType(e.target.value)}
                          className="mr-3"
                        />
                        <label
                          htmlFor="template"
                          className="text-sm text-gray-700"
                        >
                          Choose from Offer Letter Template
                        </label>
                      </div>
                    </div>
                  </div>

                  {offerLetterType === "template" && (
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        <span className="text-red-500">*</span> Choose Offer
                        Letter Template:
                      </Label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => {
                          setSelectedTemplate(e.target.value);
                          handleTemplateChange(e.target.value);
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">choose one...</option>
                        <option value="bilingual">
                          Bilingual Stipend New Hire Offer Letter Template
                        </option>
                        <option value="dual">Dual Offer Letter</option>
                        <option value="final">
                          Final Job Bid Letter Updated 12022021
                        </option>
                        <option value="intern">Intern Offer Letter</option>
                        <option value="newhire">
                          New Hire Offer Letter Template
                        </option>
                      </select>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    <span className="text-red-500">*</span> Choose Offer Letter
                    Template:
                  </Label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => {
                      setSelectedTemplate(e.target.value);
                      handleTemplateChange(e.target.value);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">choose one...</option>
                    <option value="bilingual">
                      Bilingual Stipend New Hire Offer Letter Template
                    </option>
                    <option value="dual">Dual Offer Letter</option>
                    <option value="final">
                      Final Job Bid Letter Updated 12022021
                    </option>
                    <option value="intern">Intern Offer Letter</option>
                    <option value="newhire">
                      New Hire Offer Letter Template
                    </option>
                  </select>
                </div>
              )}

              {/* Light Grey Card containing Insert Dynamic Fields and Letter Body */}
              <div className="bg-gray-50 rounded-lg p-6">
                {/* Insert Dynamic Fields */}
                <div className="mb-6">
                  <h3 className="text-gray-900 font-medium mb-4">
                    Insert Dynamic Fields
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-gray-700 text-sm font-medium mb-2 block">
                        Choose Specific Field:
                      </Label>
                      <select
                        value={selectedDynamicField}
                        onChange={(e) =>
                          setSelectedDynamicField(e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">choose one...</option>
                        {dynamicFields.map((field) => (
                          <option key={field} value={field}>
                            {field}
                          </option>
                        ))}
                      </select>
                    </div>

                    <Button
                      onClick={handleInsertDynamicField}
                      disabled={!selectedDynamicField}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Insert
                    </Button>
                  </div>
                </div>

                {/* Letter Body */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    <span className="text-red-500">*</span> Letter Body:
                  </Label>

                  {/* Rich Text Editor Toolbar - Complete with all tools from image */}
                  <div className="border border-gray-300 rounded-t-md bg-white p-2">
                    <div className="flex flex-wrap items-center gap-1">
                      {/* Row 1: File operations and basic tools */}
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Cut"
                      >
                        ✂️
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Copy"
                      >
                        📋
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Paste"
                      >
                        📄
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Paste Special"
                      >
                        📑
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Paste from Word"
                      >
                        📝
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Undo"
                      >
                        ↶
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Redo"
                      >
                        ↷
                      </button>

                      <div className="w-px h-4 bg-gray-300 mx-1"></div>

                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Print"
                      >
                        🖨️
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Spell Check"
                      >
                        ✓
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Link"
                      >
                        🔗
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Image"
                      >
                        🖼️
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Table"
                      >
                        ⊞
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Special Characters"
                      >
                        Ω
                      </button>
                      <button
                        className="p-1 hover:bg-gray-200 rounded text-gray-600"
                        title="Source"
                      >
                        Source
                      </button>
                    </div>

                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <div className="flex flex-wrap items-center gap-1">
                        {/* Row 2: Text formatting */}
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600 font-bold"
                          title="Bold"
                        >
                          B
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600 italic"
                          title="Italic"
                        >
                          I
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600 underline"
                          title="Underline"
                        >
                          U
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Strikethrough"
                        >
                          S̶
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Subscript"
                        >
                          X₂
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Superscript"
                        >
                          X²
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Remove Format"
                        >
                          Tx
                        </button>

                        <div className="w-px h-4 bg-gray-300 mx-1"></div>

                        {/* Alignment */}
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Align Left"
                        >
                          ≡
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Center"
                        >
                          ≣
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Align Right"
                        >
                          ≡
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Justify"
                        >
                          ≣
                        </button>

                        <div className="w-px h-4 bg-gray-300 mx-1"></div>

                        {/* Lists and indentation */}
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Numbered List"
                        >
                          1.
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Bullet List"
                        >
                          •
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Decrease Indent"
                        >
                          ⇤
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Increase Indent"
                        >
                          ⇥
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 mt-2 pt-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Row 3: Font controls */}
                        <select className="text-xs border border-gray-300 rounded px-2 py-1 min-w-[80px]">
                          <option>Font</option>
                          <option>Arial</option>
                          <option>Times New Roman</option>
                          <option>Helvetica</option>
                          <option>Georgia</option>
                        </select>
                        <select className="text-xs border border-gray-300 rounded px-2 py-1 min-w-[60px]">
                          <option>Size</option>
                          <option>8</option>
                          <option>10</option>
                          <option>12</option>
                          <option>14</option>
                          <option>16</option>
                          <option>18</option>
                          <option>24</option>
                        </select>
                        <select className="text-xs border border-gray-300 rounded px-2 py-1 min-w-[80px]">
                          <option>Styles</option>
                          <option>Normal</option>
                          <option>Heading 1</option>
                          <option>Heading 2</option>
                          <option>Heading 3</option>
                        </select>

                        <div className="w-px h-4 bg-gray-300 mx-1"></div>

                        {/* Text and background color */}
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600 flex items-center"
                          title="Text Color"
                        >
                          A<span className="text-red-500">▼</span>
                        </button>
                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600 flex items-center"
                          title="Background Color"
                        >
                          A<span className="bg-yellow-300">▼</span>
                        </button>

                        <button
                          className="p-1 hover:bg-gray-200 rounded text-gray-600"
                          title="Maximize"
                        >
                          ⛶
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Text Area */}
                  <textarea
                    value={letterBody}
                    onChange={(e) => setLetterBody(e.target.value)}
                    className="w-full h-64 border border-gray-300 border-t-0 rounded-b-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none bg-white"
                    placeholder="Enter your offer letter content here..."
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setPrepareOfferLetterModal(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle save logic here
                setOfferLetterCompleted(true);
                setPrepareOfferLetterModal(false);
                setShowSuccessAlert(true);
                setTimeout(() => setShowSuccessAlert(false), 3000);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Offer for e-Sign Modal */}
      <Dialog open={showSendOfferModal} onOpenChange={setShowSendOfferModal}>
        <DialogContent className="max-w-md">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Send Offer for e-Sign
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <p className="text-sm text-gray-700 mb-6">
              The offer is ready to be sent.
            </p>
          </div>

          <DialogFooter className="border-t pt-4 flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowSendOfferModal(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOfferSentForESign(true);
                setShowSendOfferModal(false);
                setShowSuccessAlert(true);
                setTimeout(() => setShowSuccessAlert(false), 3000);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
