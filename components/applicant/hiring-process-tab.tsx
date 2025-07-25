import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface HiringProcessTabProps {
  isStarted?: boolean;
  onNavigateToOffer?: () => void;
  onNavigateToOfferTab?: () => void;
  onStatusChange?: (status: string) => void;
}

export default function HiringProcessTab({
  isStarted = false,
  onNavigateToOffer,
  onNavigateToOfferTab,
  onStatusChange,
}: HiringProcessTabProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showPhoneScreen, setShowPhoneScreen] = useState(false);
  const [selectedPhoneOption, setSelectedPhoneOption] = useState<string | null>(
    null
  );
  const [showFirstInterview, setShowFirstInterview] = useState(false);
  const [selectedFirstInterviewOption, setSelectedFirstInterviewOption] =
    useState<string | null>(null);
  const [showSecondInterview, setShowSecondInterview] = useState(false);
  const [selectedSecondInterviewOption, setSelectedSecondInterviewOption] =
    useState<string | null>(null);
  const [showPersonalReferenceCheck, setShowPersonalReferenceCheck] =
    useState(false);
  const [showReferenceCheckGuide, setShowReferenceCheckGuide] = useState(false);
  const [referenceCheckInitiated, setReferenceCheckInitiated] = useState(false);
  const [selectedReferenceOption, setSelectedReferenceOption] = useState<
    string | null
  >(null);
  const [showRequestForHire, setShowRequestForHire] = useState(false);
  const [showApprovalProcessModal, setShowApprovalProcessModal] =
    useState(false);
  const [approvalProcessInitiated, setApprovalProcessInitiated] =
    useState(false);
  const [showConfirmRestart, setShowConfirmRestart] = useState(false);
  const [restartType, setRestartType] = useState<string>("");
  const [showOnboardingCards, setShowOnboardingCards] = useState(false);
  const [sentApprovalEmail, setSentApprovalEmail] = useState(false);
  const [showRequestForHireApproval, setShowRequestForHireApproval] =
    useState(false);
  const [selectedHireApprovalOption, setSelectedHireApprovalOption] = useState<
    string | null
  >(null);
  const [backgroundInitiated, setBackgroundInitiated] = useState(false);
  const [backgroundCompleted, setBackgroundCompleted] = useState(false);
  const [showVerbalOffer, setShowVerbalOffer] = useState(false);
  const [showCompensationModal1, setShowCompensationModal1] = useState(false);
  const [showCompensationModal2, setShowCompensationModal2] = useState(false);
  const [compensationCompleted, setCompensationCompleted] = useState(false);
  const [credentialingCompleted, setCredentialingCompleted] = useState(false);
  const [credentialingInitiated, setCredentialingInitiated] = useState(false);
  const [selectedCredentialingOption, setSelectedCredentialingOption] =
    useState<string | null>(null);
  const [credentialingPendingInitiated, setCredentialingPendingInitiated] =
    useState(false);
  const [
    selectedCredentialingPendingOption,
    setSelectedCredentialingPendingOption,
  ] = useState<string | null>(null);
  const [applicantInfoCompleted, setApplicantInfoCompleted] = useState(false);
  const [specialRUCompleted, setSpecialRUCompleted] = useState(false);
  const [fingerprintCompleted, setFingerprintCompleted] = useState(false);
  const [educationCompleted, setEducationCompleted] = useState(false);
  const [hrReferenceCompleted, setHRReferenceCompleted] = useState(false);
  const [verbalOfferInitiated, setVerbalOfferInitiated] = useState(false);
  const [selectedVerbalOfferOption, setSelectedVerbalOfferOption] = useState<
    string | null
  >(null);
  const [verbalOfferCompleted, setVerbalOfferCompleted] = useState(false);
  const [showOfferLetter, setShowOfferLetter] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [formPopupData, setFormPopupData] = useState<any>(null);
  const [offerLetterInitiated, setOfferLetterInitiated] = useState(false);
  const [selectedOfferLetterOption, setSelectedOfferLetterOption] = useState<
    string | null
  >(null);
  const [showDrugScreening, setShowDrugScreening] = useState(false);
  const [drugScreeningInitiated, setDrugScreeningInitiated] = useState(false);
  const [selectedDrugScreeningOption, setSelectedDrugScreeningOption] =
    useState<string | null>(null);
  const [drugScreeningCompleted, setDrugScreeningCompleted] = useState(false);
  const [showOnboardingCard, setShowOnboardingCard] = useState(false);
  const [onboardingInitiated, setOnboardingInitiated] = useState(false);
  const [selectedOnboardingOption, setSelectedOnboardingOption] = useState<
    string | null
  >(null);
  const [employeeOnboardingCompleted, setEmployeeOnboardingCompleted] =
    useState(false);
  const [hrOnboardingInitiated, setHrOnboardingInitiated] = useState(false);
  const [selectedHrOnboardingOption, setSelectedHrOnboardingOption] = useState<
    string | null
  >(null);
  const [showNewHireCard, setShowNewHireCard] = useState(false);
  const [newHireInitiated, setNewHireInitiated] = useState(false);
  const [selectedNewHireOption, setSelectedNewHireOption] = useState<
    string | null
  >(null);
  const [showHireDateModal, setShowHireDateModal] = useState(false);
  const [hireDateData, setHireDateData] = useState({
    hireDate: "",
    startDate: "",
  });
  const [showHireDetailsModal, setShowHireDetailsModal] = useState(false);
  const [collapsedSteps, setCollapsedSteps] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowPhoneScreen(true);
  };

  const handlePhoneOptionSelect = (option: string) => {
    setSelectedPhoneOption(option);
    if (option === "favorable") {
      setShowFirstInterview(true);
    }
  };

  const handleFirstInterviewOptionSelect = (option: string) => {
    setSelectedFirstInterviewOption(option);
    if (option === "favorable") {
      setShowSecondInterview(true);
    }
  };

  const handleSecondInterviewOptionSelect = (option: string) => {
    setSelectedSecondInterviewOption(option);
    if (option === "favorable") {
      setShowPersonalReferenceCheck(true);
    }
  };

  const handleInitiateReferenceCheck = () => {
    setShowReferenceCheckGuide(true);
  };

  const handleReferenceCheckNext = () => {
    setShowReferenceCheckGuide(false);
    setReferenceCheckInitiated(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setShowPhoneScreen(false);
    setSelectedPhoneOption(null);
    setShowFirstInterview(false);
    setSelectedFirstInterviewOption(null);
    setShowSecondInterview(false);
    setSelectedSecondInterviewOption(null);
    setShowPersonalReferenceCheck(false);
    setReferenceCheckInitiated(false);
    setSelectedReferenceOption(null);
    setShowRequestForHire(false);
    setApprovalProcessInitiated(false);
  };

  const handleResetPhoneScreen = () => {
    setSelectedPhoneOption(null);
  };

  const handleResetFirstInterview = () => {
    setSelectedFirstInterviewOption(null);
  };

  const handleResetSecondInterview = () => {
    setSelectedSecondInterviewOption(null);
  };

  const handleResetPersonalReference = () => {
    setReferenceCheckInitiated(false);
    setSelectedReferenceOption(null);
    // Don't reset subsequent cards - only reset this specific card
  };

  const handleReferenceOptionSelect = (option: string) => {
    setSelectedReferenceOption(option);
    if (option === "favorable") {
      setShowRequestForHire(true);
    }
  };

  const handleApprovalProcessSelect = () => {
    setShowApprovalProcessModal(true);
  };

  const handleApprovalProcessNext = () => {
    setShowApprovalProcessModal(false);
    setApprovalProcessInitiated(true);
  };

  const handleConfirmRestart = (type: string) => {
    setRestartType(type);
    setShowConfirmRestart(true);
  };

  const handleConfirmRestartYes = () => {
    switch (restartType) {
      case "review":
        handleReset();
        break;
      case "phone":
        handleResetPhoneScreen();
        break;
      case "first-interview":
        handleResetFirstInterview();
        break;
      case "second-interview":
        handleResetSecondInterview();
        break;
      case "reference":
        handleResetPersonalReference();
        break;
      case "request-for-hire":
        handleRestartRequestForHire();
        break;
      case "request-for-hire-approval":
        handleRestartRequestForHireApproval();
        break;
      case "compensation":
        handleRestartCompensation();
        break;
      case "credentialing":
        handleRestartOnboardingCard("credentialing");
        break;
      case "applicant-info":
        handleRestartOnboardingCard("applicant-info");
        break;
      case "special-ru":
        handleRestartOnboardingCard("special-ru");
        break;
      case "fingerprint":
        handleRestartOnboardingCard("fingerprint");
        break;
      case "background":
        handleRestartBackground();
        break;
      case "education":
        handleRestartOnboardingCard("education");
        break;
      case "hr-reference":
        handleRestartOnboardingCard("hr-reference");
        break;
      case "verbal-offer":
        handleRestartVerbalOffer();
        break;
      case "offer-letter":
        handleRestartOfferLetter();
        break;
      case "drug-screening":
        handleRestartDrugScreening();
        break;
      case "onboarding":
        handleRestartOnboarding();
        break;
      case "new-hire":
        handleRestartNewHire();
        break;
    }
    setShowConfirmRestart(false);
    setRestartType("");
  };

  const handleConfirmRestartNo = () => {
    setShowConfirmRestart(false);
    setRestartType("");
  };

  const handleSentApprovalEmail = () => {
    setSentApprovalEmail(true);
    setShowRequestForHireApproval(true);
  };

  const handleHireApprovalOptionSelect = (option: string) => {
    setSelectedHireApprovalOption(option);
    if (option === "approved") {
      setShowOnboardingCards(true);
    }
  };

  const handleInitiateBackground = () => {
    setBackgroundInitiated(true);
  };

  const handleBackgroundComplete = () => {
    setBackgroundCompleted(true);
    setShowVerbalOffer(true);
  };

  const handleInitiateCompensation = () => {
    setShowCompensationModal1(true);
  };

  const handleCompensationModal1Next = () => {
    setShowCompensationModal1(false);
    setShowCompensationModal2(true);
  };

  const handleCompensationModal2Next = () => {
    setShowCompensationModal2(false);
    setCompensationCompleted(true);
    if (!showVerbalOffer) {
      setShowVerbalOffer(true);
    }
  };

  const handleRestartRequestForHire = () => {
    setSentApprovalEmail(false);
    setApprovalProcessInitiated(false);
    // Don't reset subsequent cards - only reset this specific card
  };

  const handleRestartRequestForHireApproval = () => {
    setSelectedHireApprovalOption(null);
    // Don't reset subsequent cards - only reset this specific card
  };

  const handleRestartCompensation = () => {
    setCompensationCompleted(false);
  };

  const handleRestartBackground = () => {
    setBackgroundCompleted(false);
    setBackgroundInitiated(false);
  };

  const handleCredentialingInitiate = () => {
    setCredentialingInitiated(true);
    // Open verbal offer if not already opened
    if (!showVerbalOffer) {
      setShowVerbalOffer(true);
    }
  };

  const handleCredentialingOptionSelect = (option: string) => {
    setSelectedCredentialingOption(option);
    if (option === "pending") {
      setCredentialingPendingInitiated(true);
    } else {
      setCredentialingCompleted(true);
    }
  };

  const handleCredentialingPendingOptionSelect = (option: string) => {
    setSelectedCredentialingPendingOption(option);
    setCredentialingCompleted(true);
  };

  const handleOnboardingCardOption = (cardType: string, option: string) => {
    // Open verbal offer if not already opened
    if (!showVerbalOffer) {
      setShowVerbalOffer(true);
    }

    // Set the specific card as completed
    switch (cardType) {
      case "credentialing":
        setCredentialingCompleted(true);
        break;
      case "applicant-info":
        setApplicantInfoCompleted(true);
        break;
      case "special-ru":
        setSpecialRUCompleted(true);
        break;
      case "fingerprint":
        setFingerprintCompleted(true);
        break;
      case "education":
        setEducationCompleted(true);
        break;
      case "hr-reference":
        setHRReferenceCompleted(true);
        break;
    }
  };

  const handleRestartOnboardingCard = (cardType: string) => {
    switch (cardType) {
      case "credentialing":
        setCredentialingCompleted(false);
        setCredentialingInitiated(false);
        setSelectedCredentialingOption(null);
        setCredentialingPendingInitiated(false);
        setSelectedCredentialingPendingOption(null);
        break;
      case "applicant-info":
        setApplicantInfoCompleted(false);
        break;
      case "special-ru":
        setSpecialRUCompleted(false);
        break;
      case "fingerprint":
        setFingerprintCompleted(false);
        break;
      case "education":
        setEducationCompleted(false);
        break;
      case "hr-reference":
        setHRReferenceCompleted(false);
        break;
    }
  };

  const handleStartOffer = () => {
    setVerbalOfferInitiated(true);
  };

  const handleVerbalOfferOptionSelect = (option: string) => {
    setSelectedVerbalOfferOption(option);
    setVerbalOfferCompleted(true);
    if (option === "offer-accepted") {
      setShowOfferLetter(true);
    }
  };

  const handleRestartVerbalOffer = () => {
    setVerbalOfferInitiated(false);
    setSelectedVerbalOfferOption(null);
    setVerbalOfferCompleted(false);
    // Don't reset showOfferLetter - keep the Offer Letter card visible
    // Don't reset showVerbalOffer - keep the card visible
  };

  const handleFormPopupOpen = (data: any) => {
    setFormPopupData(data);
    setShowFormPopup(true);
  };

  const handleFormPopupClose = () => {
    setShowFormPopup(false);
    setFormPopupData(null);
  };

  const handleStartOfferLetter = () => {
    setOfferLetterInitiated(true);
  };

  const handleOfferLetterOptionSelect = (option: string) => {
    setSelectedOfferLetterOption(option);
    if (option === "start-offer-letter") {
      if (onNavigateToOfferTab) {
        onNavigateToOfferTab();
      }
      if (onStatusChange) {
        onStatusChange("Offered");
      }
    } else if (option === "offer-letter-sent") {
      setShowDrugScreening(true);
    }
  };

  const handleRestartOfferLetter = () => {
    setOfferLetterInitiated(false);
    setSelectedOfferLetterOption(null);
  };

  const handleInitiateDrugScreening = () => {
    setDrugScreeningInitiated(true);
  };

  const handleDrugScreeningOptionSelect = (option: string) => {
    setSelectedDrugScreeningOption(option);
    setDrugScreeningCompleted(true);
    if (option === "approved") {
      setShowOnboardingCard(true);
    }
  };

  const handleRestartDrugScreening = () => {
    setDrugScreeningInitiated(false);
    setSelectedDrugScreeningOption(null);
    setDrugScreeningCompleted(false);
    setShowOnboardingCard(false);
  };

  const handleInitiateOnboarding = () => {
    setOnboardingInitiated(true);
  };

  const handleOnboardingOptionSelect = (option: string) => {
    setSelectedOnboardingOption(option);
    if (option === "onboarding-complete") {
      setEmployeeOnboardingCompleted(true);
    }
  };

  const handleRestartOnboarding = () => {
    setOnboardingInitiated(false);
    setSelectedOnboardingOption(null);
    setEmployeeOnboardingCompleted(false);
    setHrOnboardingInitiated(false);
    setSelectedHrOnboardingOption(null);
    setShowNewHireCard(false);
  };

  const handleInitiateHrOnboarding = () => {
    setHrOnboardingInitiated(true);
  };

  const handleHrOnboardingOptionSelect = (option: string) => {
    setSelectedHrOnboardingOption(option);
    if (option === "hr-onboarding-complete") {
      setShowNewHireCard(true);
    }
  };

  const handleInitiateNewHire = () => {
    setNewHireInitiated(true);
  };

  const handleNewHireOptionSelect = (option: string) => {
    setSelectedNewHireOption(option);
    if (option === "ready-to-hire") {
      setShowHireDateModal(true);
    }
  };

  const handleHireDateSave = () => {
    setShowHireDateModal(false);
    // Show the window icon functionality will be added here
  };

  const handleShowHireDetails = () => {
    setShowHireDetailsModal(true);
  };

  const handleRestartNewHire = () => {
    setNewHireInitiated(false);
    setSelectedNewHireOption(null);
    setHireDateData({ hireDate: "", startDate: "" });
  };

  // Function to get completed steps for collapse view
  const getCompletedSteps = () => {
    const completed = [];

    if (selectedOption) {
      completed.push("Review Application");
    }
    if (selectedPhoneOption) {
      completed.push("Phone Screen");
    }
    if (selectedFirstInterviewOption) {
      completed.push("First Interview");
    }
    if (selectedSecondInterviewOption) {
      completed.push("Second Interview");
    }
    if (selectedReferenceOption) {
      completed.push("Personal Reference Check - Manager");
    }
    if (sentApprovalEmail) {
      completed.push("Request for Hire - Manager");
    }
    if (selectedHireApprovalOption) {
      completed.push("Request for Hire Approval");
    }
    if (compensationCompleted) {
      completed.push("Compensation (HR)");
    }
    if (credentialingCompleted) {
      completed.push("Credentialing");
    }
    if (applicantInfoCompleted) {
      completed.push("Applicant Additional Info");
    }
    if (specialRUCompleted) {
      completed.push("Special RU for Backgrounds");
    }
    if (fingerprintCompleted) {
      completed.push("Fingerprint Check");
    }
    if (backgroundCompleted) {
      completed.push("Background");
    }
    if (educationCompleted) {
      completed.push("Education/Employment Check");
    }
    if (hrReferenceCompleted) {
      completed.push("Reference Check - HR");
    }
    if (verbalOfferCompleted) {
      completed.push("Verbal Offer");
    }
    if (selectedOfferLetterOption) {
      completed.push("Offer Letter");
    }
    if (selectedDrugScreeningOption) {
      completed.push("Drug Screening/Physical/TB");
    }
    if (selectedOnboardingOption) {
      completed.push("Onboarding");
    }
    if (selectedNewHireOption) {
      completed.push("New Hire");
    }

    return completed;
  };

  const toggleCollapsedSteps = () => {
    setCollapsedSteps(!collapsedSteps);
  };

  // Show simple message if not started
  if (!isStarted) {
    return (
      <div className="w-full mt-4">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Hiring Process</h3>
          <p className="text-sm text-gray-600">
            To start the hiring process, please click the "Start Hiring Process"
            button.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Hiring Process</h3>
          {getCompletedSteps().length > 0 && (
            <button
              onClick={toggleCollapsedSteps}
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              {collapsedSteps ? (
                <>
                  <span>Expand Completed Steps</span>
                  <ChevronDown className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Collapse Completed Steps</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600">
          These are the currently available steps in the hiring process.
        </p>
      </div>

      {/* Collapsed Steps Summary */}
      {collapsedSteps && getCompletedSteps().length > 0 && (
        <div className="border border-gray-300 bg-white rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                {getCompletedSteps().length} Completed Steps
              </span>
            </div>
            <button
              onClick={toggleCollapsedSteps}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Expand
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1">
            {getCompletedSteps().map((step, index) => (
              <div key={index} className="flex items-center">
                <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                  {step}
                </span>
                {index < getCompletedSteps().length - 1 && (
                  <span className="mx-1 text-gray-400">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {/* Review Application Section */}
        {(!collapsedSteps || !selectedOption) && (
          <div
            className={`border rounded-lg ${
              selectedOption
                ? "border-gray-300 bg-gray-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`flex items-center justify-between ${
                selectedOption ? "p-2" : "p-4"
              }`}
            >
              <div className="flex items-center gap-3">
                {selectedOption ? (
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <h4
                  className={`font-semibold ${
                    selectedOption ? "text-gray-600 text-sm" : "text-gray-900"
                  }`}
                >
                  Review Application
                </h4>
              </div>
              {selectedOption && (
                <button
                  onClick={() => handleConfirmRestart("review")}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                >
                  <span className="text-orange-600">↻</span>
                  Restart
                </button>
              )}
            </div>

            {selectedOption && (
              <div className="px-2 pb-2">
                <div className="flex items-center gap-2 ml-6">
                  <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                  <span className="text-xs font-medium text-orange-600">
                    {selectedOption === "interest" ? "Interest" : "No Interest"}
                  </span>
                </div>
              </div>
            )}

            {!selectedOption && (
              <div className="px-4 pb-4">
                <div className="ml-7 space-y-2">
                  <div
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleOptionSelect("interest")}
                  >
                    <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                    <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                      Interest
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleOptionSelect("no-interest")}
                  >
                    <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                    <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                      No Interest
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phone Screen Section - Only show after interest */}
        {showPhoneScreen && (!collapsedSteps || !selectedPhoneOption) && (
          <div
            className={`border rounded-lg ${
              selectedPhoneOption
                ? "border-gray-300 bg-gray-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`flex items-center justify-between ${
                selectedPhoneOption ? "p-2" : "p-4"
              }`}
            >
              <div className="flex items-center gap-3">
                {selectedPhoneOption ? (
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <h4
                  className={`font-semibold ${
                    selectedPhoneOption
                      ? "text-gray-600 text-sm"
                      : "text-gray-900"
                  }`}
                >
                  Phone Screen
                </h4>
              </div>
              {selectedPhoneOption && (
                <button
                  onClick={() => handleConfirmRestart("phone")}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                >
                  <span className="text-orange-600">↻</span>
                  Restart
                </button>
              )}
            </div>

            {selectedPhoneOption && (
              <div className="px-2 pb-2">
                <div className="flex items-center gap-2 ml-6">
                  <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                  <span className="text-xs font-medium text-orange-600">
                    {selectedPhoneOption === "favorable"
                      ? "Favorable Phone Screen"
                      : selectedPhoneOption === "unfavorable"
                      ? "Unfavorable Phone Screen"
                      : selectedPhoneOption === "contact"
                      ? "Contact Attempted"
                      : "Not Applicable"}
                  </span>
                </div>
              </div>
            )}

            {!selectedPhoneOption && (
              <div className="px-4 pb-4">
                <div className="ml-7 space-y-2">
                  <div
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handlePhoneOptionSelect("favorable")}
                  >
                    <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                    <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                      Favorable Phone Screen
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handlePhoneOptionSelect("unfavorable")}
                  >
                    <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                    <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                      Unfavorable Phone Screen
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handlePhoneOptionSelect("contact")}
                  >
                    <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                    <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                      Contact Attempted
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handlePhoneOptionSelect("not-applicable")}
                  >
                    <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                    <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                      Not Applicable
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* First Interview Section - Only show after favorable phone screen */}
        {showFirstInterview &&
          (!collapsedSteps || !selectedFirstInterviewOption) && (
            <div
              className={`border rounded-lg ${
                selectedFirstInterviewOption
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  selectedFirstInterviewOption ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedFirstInterviewOption ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      selectedFirstInterviewOption
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    First Interview
                  </h4>
                </div>
                {selectedFirstInterviewOption && (
                  <button
                    onClick={() => handleConfirmRestart("first-interview")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {selectedFirstInterviewOption && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      {selectedFirstInterviewOption === "favorable"
                        ? "Favorable Interview Results"
                        : selectedFirstInterviewOption === "unfavorable"
                        ? "Unfavorable Interview Results"
                        : selectedFirstInterviewOption === "withdrew"
                        ? "No Interview: Candidate withdrew interest"
                        : selectedFirstInterviewOption === "contact"
                        ? "No Interview: Could not contact"
                        : selectedFirstInterviewOption === "no-show"
                        ? "No Interview: No show"
                        : "No Interview: Position no longer available"}
                    </span>
                  </div>
                </div>
              )}

              {!selectedFirstInterviewOption && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleFirstInterviewOptionSelect("favorable")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Favorable Interview Results
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleFirstInterviewOptionSelect("unfavorable")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Unfavorable Interview Results
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleFirstInterviewOptionSelect("withdrew")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No Interview: Candidate withdrew interest
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleFirstInterviewOptionSelect("contact")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No Interview: Could not contact
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleFirstInterviewOptionSelect("no-show")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No Interview: No show
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleFirstInterviewOptionSelect("position-unavailable")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No Interview: Position no longer available
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Second Interview Section - Only show after favorable first interview */}
        {showSecondInterview &&
          (!collapsedSteps || !selectedSecondInterviewOption) && (
            <div
              className={`border rounded-lg ${
                selectedSecondInterviewOption
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  selectedSecondInterviewOption ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedSecondInterviewOption ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      selectedSecondInterviewOption
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Second Interview
                  </h4>
                </div>
                {selectedSecondInterviewOption && (
                  <button
                    onClick={() => handleConfirmRestart("second-interview")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {selectedSecondInterviewOption && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      {selectedSecondInterviewOption === "favorable"
                        ? "Favorable Interview Results"
                        : selectedSecondInterviewOption === "unfavorable"
                        ? "Unfavorable Interview Results"
                        : selectedSecondInterviewOption === "withdrew"
                        ? "No Interview: Candidate withdrew interest"
                        : selectedSecondInterviewOption === "contact"
                        ? "No Interview: Could not contact"
                        : selectedSecondInterviewOption === "no-show"
                        ? "No Interview: No show"
                        : selectedSecondInterviewOption ===
                          "position-unavailable"
                        ? "No Interview: Position no longer available"
                        : "Not Applicable"}
                    </span>
                  </div>
                </div>
              )}

              {!selectedSecondInterviewOption && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleSecondInterviewOptionSelect("favorable")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Favorable Interview Results
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleSecondInterviewOptionSelect("unfavorable")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Unfavorable Interview Results
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleSecondInterviewOptionSelect("withdrew")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No Interview: Candidate withdrew interest
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleSecondInterviewOptionSelect("contact")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No Interview: Could not contact
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleSecondInterviewOptionSelect("no-show")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No Interview: No show
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleSecondInterviewOptionSelect(
                          "position-unavailable"
                        )
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No Interview: Position no longer available
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleSecondInterviewOptionSelect("not-applicable")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Not Applicable
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Personal Reference Check Section - Only show after favorable second interview */}
        {showPersonalReferenceCheck &&
          (!collapsedSteps || !selectedReferenceOption) && (
            <div
              className={`border rounded-lg ${
                selectedReferenceOption
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  selectedReferenceOption ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedReferenceOption ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      selectedReferenceOption
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Personal Reference Check - Manager
                  </h4>
                </div>
                {selectedReferenceOption && (
                  <button
                    onClick={() => handleConfirmRestart("reference")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {selectedReferenceOption && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600 flex items-center gap-2">
                      Initiate Reference Check
                      <svg
                        className="w-3 h-3 cursor-pointer hover:bg-gray-200 rounded p-0.5 transition-colors"
                        onClick={() =>
                          handleFormPopupOpen({
                            title: "Initiate Reference Check",
                            fields: ["Reference Check initiated"],
                          })
                        }
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="9" y1="9" x2="15" y2="15" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                      </svg>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-8 mt-1">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      {selectedReferenceOption === "favorable"
                        ? "Favorable Reference Check"
                        : "Unfavorable Reference Check"}
                    </span>
                  </div>
                </div>
              )}

              {!selectedReferenceOption && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    {!referenceCheckInitiated ? (
                      <>
                        <div
                          className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={handleInitiateReferenceCheck}
                        >
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            Initiate Reference Check
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            Not Applicable
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                          <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                          <span className="text-sm font-medium text-orange-600 flex items-center gap-2">
                            Initiate Reference Check
                            <svg
                              className="w-4 h-4 cursor-pointer hover:bg-gray-200 rounded p-0.5 transition-colors"
                              onClick={() =>
                                handleFormPopupOpen({
                                  title: "Initiate Reference Check",
                                  fields: ["Reference Check initiated"],
                                })
                              }
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <rect
                                x="3"
                                y="3"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                              <line x1="9" y1="9" x2="15" y2="15" />
                              <line x1="15" y1="9" x2="9" y2="15" />
                            </svg>
                          </span>
                        </div>
                        <div className="ml-4 space-y-2">
                          <div
                            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() =>
                              handleReferenceOptionSelect("favorable")
                            }
                          >
                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                              Favorable Reference Check
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() =>
                              handleReferenceOptionSelect("unfavorable")
                            }
                          >
                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                              Unfavorable Reference Check
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Request for Hire Section - Only show after favorable reference check */}
        {showRequestForHire && (!collapsedSteps || !sentApprovalEmail) && (
          <div
            className={`border rounded-lg ${
              sentApprovalEmail
                ? "border-gray-300 bg-gray-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <div
              className={`flex items-center justify-between ${
                sentApprovalEmail ? "p-2" : "p-4"
              }`}
            >
              <div className="flex items-center gap-3">
                {sentApprovalEmail ? (
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
                <h4
                  className={`font-semibold ${
                    sentApprovalEmail
                      ? "text-gray-600 text-sm"
                      : "text-gray-900"
                  }`}
                >
                  Request for Hire - Manager
                </h4>
              </div>
              {sentApprovalEmail && (
                <button
                  onClick={() => handleConfirmRestart("request-for-hire")}
                  className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                >
                  <span className="text-orange-600">↻</span>
                  Restart
                </button>
              )}
            </div>

            {sentApprovalEmail && (
              <div className="px-2 pb-2">
                <div className="flex items-center gap-2 ml-6">
                  <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                  <span className="text-xs font-medium text-orange-600 flex items-center gap-2">
                    Approval Process (Signatures)/Credentialed Job
                    <svg
                      className="w-3 h-3 cursor-pointer hover:bg-gray-200 rounded p-0.5 transition-colors"
                      onClick={() =>
                        handleFormPopupOpen({
                          title:
                            "Approval Process (Signatures)/Credentialed Job",
                          fields: [
                            "Credentialed Job: Yes",
                            "Projected Start Date: 01/15/2025",
                            "Immediate Supervisor: John Smith",
                            "Shift Type: REG",
                          ],
                        })
                      }
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                    </svg>
                  </span>
                </div>
                <div className="flex items-center gap-2 ml-8 mt-1">
                  <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                  <span className="text-xs font-medium text-orange-600">
                    Sent Approval Email - Reminder Only
                  </span>
                </div>
              </div>
            )}

            {!sentApprovalEmail && (
              <div className="px-4 pb-4">
                <div className="ml-7 space-y-2">
                  {!approvalProcessInitiated ? (
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={handleApprovalProcessSelect}
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Approval Process (Signatures)/Credentialed Job
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                        <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                        <span className="text-sm font-medium text-orange-600">
                          Approval Process (Signatures)/Credentialed Job ⊠
                        </span>
                      </div>
                      <div className="ml-4 space-y-2">
                        <div
                          className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={handleSentApprovalEmail}
                        >
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            Sent Approval Email - Reminder Only
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Request for Hire Approval Section - Only show after sent approval email */}
        {showRequestForHireApproval &&
          (!collapsedSteps || !selectedHireApprovalOption) && (
            <div
              className={`border rounded-lg ${
                selectedHireApprovalOption
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  selectedHireApprovalOption ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {selectedHireApprovalOption ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      selectedHireApprovalOption
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Request for Hire Approval
                  </h4>
                </div>
                {selectedHireApprovalOption && (
                  <button
                    onClick={() =>
                      handleConfirmRestart("request-for-hire-approval")
                    }
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {selectedHireApprovalOption && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      {selectedHireApprovalOption === "approved"
                        ? "Approved"
                        : "Not Approved"}
                    </span>
                  </div>
                </div>
              )}

              {!selectedHireApprovalOption && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleHireApprovalOptionSelect("approved")}
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Approved
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleHireApprovalOptionSelect("not-approved")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Not Approved
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Onboarding Cards - Only show after approved */}
        {showOnboardingCards && (
          <>
            {/* Compensation (HR) */}
            <div
              className={`border rounded-lg ${
                compensationCompleted
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  compensationCompleted ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {compensationCompleted ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      compensationCompleted
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Compensation (HR)
                  </h4>
                </div>
                {compensationCompleted && (
                  <button
                    onClick={() => handleConfirmRestart("compensation")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {compensationCompleted && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Initiate Compensation ⊠
                    </span>
                  </div>
                </div>
              )}

              {!compensationCompleted && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={handleInitiateCompensation}
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Initiate Compensation
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Credentialing */}
            <div
              className={`border rounded-lg ${
                credentialingCompleted
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  credentialingCompleted ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {credentialingCompleted ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      credentialingCompleted
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Credentialing
                  </h4>
                </div>
                {credentialingCompleted && (
                  <button
                    onClick={() => handleConfirmRestart("credentialing")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {credentialingCompleted && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Yes, Credentialing is Required
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-8 mt-1">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      {selectedCredentialingOption === "pending"
                        ? "Credentialing Pending"
                        : "Credentialing Delay"}
                    </span>
                  </div>
                  {selectedCredentialingOption === "pending" &&
                    selectedCredentialingPendingOption && (
                      <div className="flex items-center gap-2 ml-10 mt-1">
                        <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                        <span className="text-xs font-medium text-orange-600">
                          {selectedCredentialingPendingOption === "approved"
                            ? "Credentialing Approved"
                            : "Credentialing Failed"}
                        </span>
                      </div>
                    )}
                </div>
              )}

              {!credentialingCompleted && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    {!credentialingInitiated ? (
                      <>
                        <div
                          className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={handleCredentialingInitiate}
                        >
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            Yes, Credentialing is Required
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() =>
                            handleOnboardingCardOption("credentialing", "no")
                          }
                        >
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            No, Credentialing is not Required
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                          <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                          <span className="text-sm font-medium text-orange-600">
                            Yes, Credentialing is Required
                          </span>
                        </div>
                        <div className="ml-4 space-y-2">
                          {!credentialingPendingInitiated ? (
                            <>
                              <div
                                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() =>
                                  handleCredentialingOptionSelect("pending")
                                }
                              >
                                <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                  Credentialing Pending
                                </span>
                              </div>
                              <div
                                className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() =>
                                  handleCredentialingOptionSelect("delay")
                                }
                              >
                                <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                  Credentialing Delay
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                                <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                                <span className="text-sm font-medium text-orange-600">
                                  Credentialing Pending
                                </span>
                              </div>
                              <div className="ml-4 space-y-2">
                                <div
                                  className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                  onClick={() =>
                                    handleCredentialingPendingOptionSelect(
                                      "approved"
                                    )
                                  }
                                >
                                  <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                  <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                    Credentialing Approved
                                  </span>
                                </div>
                                <div
                                  className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                  onClick={() =>
                                    handleCredentialingPendingOptionSelect(
                                      "failed"
                                    )
                                  }
                                >
                                  <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                  <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                    Credentialing Failed
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Applicant Additional Info */}
            <div
              className={`border rounded-lg ${
                applicantInfoCompleted
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  applicantInfoCompleted ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {applicantInfoCompleted ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      applicantInfoCompleted
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Applicant Additional Info
                  </h4>
                </div>
                {applicantInfoCompleted && (
                  <button
                    onClick={() => handleConfirmRestart("applicant-info")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {applicantInfoCompleted && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Send Applicant Message ⊠
                    </span>
                  </div>
                </div>
              )}

              {!applicantInfoCompleted && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption(
                          "applicant-info",
                          "send-message"
                        )
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Send Applicant Message
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption(
                          "applicant-info",
                          "no-license"
                        )
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No drivers license needed
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Special RU for Backgrounds */}
            <div
              className={`border rounded-lg ${
                specialRUCompleted
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  specialRUCompleted ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {specialRUCompleted ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      specialRUCompleted
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Special RU for Backgrounds
                  </h4>
                </div>
                {specialRUCompleted && (
                  <button
                    onClick={() => handleConfirmRestart("special-ru")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {specialRUCompleted && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Yes ⊠
                    </span>
                  </div>
                </div>
              )}

              {!specialRUCompleted && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption("special-ru", "yes")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Yes
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption("special-ru", "no")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fingerprint Check */}
            <div
              className={`border rounded-lg ${
                fingerprintCompleted
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  fingerprintCompleted ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {fingerprintCompleted ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      fingerprintCompleted
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Fingerprint Check
                  </h4>
                </div>
                {fingerprintCompleted && (
                  <button
                    onClick={() => handleConfirmRestart("fingerprint")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {fingerprintCompleted && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Yes ⊠
                    </span>
                  </div>
                </div>
              )}

              {!fingerprintCompleted && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption("fingerprint", "yes")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Yes
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption("fingerprint", "no")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        No
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Background */}
            <div
              className={`border rounded-lg ${
                backgroundCompleted
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  backgroundCompleted ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {backgroundCompleted ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      backgroundCompleted
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Background
                  </h4>
                </div>
                {backgroundCompleted && (
                  <button
                    onClick={() => handleConfirmRestart("background")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {backgroundCompleted && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Initiate Background ⊠
                    </span>
                  </div>
                  <div className="flex items-center gap-2 ml-8 mt-1">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Complete
                    </span>
                  </div>
                </div>
              )}

              {!backgroundCompleted && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    {!backgroundInitiated ? (
                      <>
                        <div
                          className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={handleInitiateBackground}
                        >
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            Initiate Background
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            Not Applicable
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                          <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                          <span className="text-sm font-medium text-orange-600">
                            Initiate Background ⊠
                          </span>
                        </div>
                        <div className="ml-4 space-y-2">
                          <div
                            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={handleBackgroundComplete}
                          >
                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                              Complete
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                              Not Approved
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Education/Employment Check */}
            <div
              className={`border rounded-lg ${
                educationCompleted
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  educationCompleted ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {educationCompleted ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      educationCompleted
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Education/Employment Check
                  </h4>
                </div>
                {educationCompleted && (
                  <button
                    onClick={() => handleConfirmRestart("education")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {educationCompleted && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Initiate Education/Employment Check/Additional Background
                      Check ⊠
                    </span>
                  </div>
                </div>
              )}

              {!educationCompleted && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption("education", "initiate")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Initiate Education/Employment Check/Additional
                        Background Check
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption(
                          "education",
                          "not-applicable"
                        )
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Not Applicable
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Reference Check - HR */}
            <div
              className={`border rounded-lg ${
                hrReferenceCompleted
                  ? "border-gray-300 bg-gray-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-between ${
                  hrReferenceCompleted ? "p-2" : "p-4"
                }`}
              >
                <div className="flex items-center gap-3">
                  {hrReferenceCompleted ? (
                    <ChevronDown className="w-3 h-3 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                  <h4
                    className={`font-semibold ${
                      hrReferenceCompleted
                        ? "text-gray-600 text-sm"
                        : "text-gray-900"
                    }`}
                  >
                    Reference Check - HR
                  </h4>
                </div>
                {hrReferenceCompleted && (
                  <button
                    onClick={() => handleConfirmRestart("hr-reference")}
                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                  >
                    <span className="text-orange-600">↻</span>
                    Restart
                  </button>
                )}
              </div>

              {hrReferenceCompleted && (
                <div className="px-2 pb-2">
                  <div className="flex items-center gap-2 ml-6">
                    <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                    <span className="text-xs font-medium text-orange-600">
                      Initiate Reference Check ⊠
                    </span>
                  </div>
                </div>
              )}

              {!hrReferenceCompleted && (
                <div className="px-4 pb-4">
                  <div className="ml-7 space-y-2">
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption("hr-reference", "initiate")
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Initiate Reference Check
                      </span>
                    </div>
                    <div
                      className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() =>
                        handleOnboardingCardOption(
                          "hr-reference",
                          "not-applicable"
                        )
                      }
                    >
                      <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                      <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                        Not Applicable
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verbal Offer Section - Only show after background completed */}
            {showVerbalOffer && (
              <div
                className={`border rounded-lg ${
                  verbalOfferCompleted
                    ? "border-gray-300 bg-gray-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-between ${
                    verbalOfferCompleted ? "p-2" : "p-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {verbalOfferCompleted ? (
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <h4
                      className={`font-semibold ${
                        verbalOfferCompleted
                          ? "text-gray-600 text-sm"
                          : "text-gray-900"
                      }`}
                    >
                      Verbal Offer
                    </h4>
                  </div>
                  {verbalOfferCompleted && (
                    <button
                      onClick={() => handleConfirmRestart("verbal-offer")}
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                    >
                      <span className="text-orange-600">↻</span>
                      Restart
                    </button>
                  )}
                </div>

                {verbalOfferCompleted && (
                  <div className="px-2 pb-2">
                    <div className="flex items-center gap-2 ml-6">
                      <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                      <span className="text-xs font-medium text-orange-600">
                        Start Offer
                      </span>
                    </div>
                    <div className="flex items-center gap-2 ml-8 mt-1">
                      <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                      <span className="text-xs font-medium text-orange-600">
                        {selectedVerbalOfferOption === "offer-accepted"
                          ? "Offer Accepted-Proceed to Next Step"
                          : selectedVerbalOfferOption ===
                            "offer-declined-accepted"
                          ? "Offer Declined-Accepted offer with another company"
                          : selectedVerbalOfferOption ===
                            "offer-declined-benefits"
                          ? "Offer Declined-Benefits"
                          : selectedVerbalOfferOption ===
                            "offer-declined-environment"
                          ? "Offer Declined-Company environment"
                          : selectedVerbalOfferOption ===
                            "offer-declined-requirements"
                          ? "Offer Declined-Company requirements"
                          : selectedVerbalOfferOption ===
                            "offer-declined-not-specify"
                          ? "Offer Declined-Did not specify"
                          : selectedVerbalOfferOption ===
                            "offer-declined-nature"
                          ? "Offer Declined-Nature of job"
                          : selectedVerbalOfferOption === "offer-declined-pay"
                          ? "Offer Declined-Pay"
                          : selectedVerbalOfferOption ===
                            "offer-declined-personal"
                          ? "Offer Declined-Personal reasons"
                          : "Offer Declined-Withdrew interest"}
                      </span>
                    </div>
                  </div>
                )}

                {!verbalOfferCompleted && (
                  <div className="px-4 pb-4">
                    <div className="ml-7 space-y-2">
                      {!verbalOfferInitiated ? (
                        <>
                          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                              No Offer-Manager withdrew candidate
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={handleStartOffer}
                          >
                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                              Start Offer
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                            <span className="text-sm font-medium text-orange-600">
                              Start Offer
                            </span>
                          </div>
                          <div className="ml-4 space-y-2">
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect("offer-accepted")
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Accepted-Proceed to Next Step
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-accepted"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Accepted offer with another
                                company
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-benefits"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Benefits
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-environment"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Company environment
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-requirements"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Company requirements
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-not-specify"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Did not specify
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-nature"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Nature of job
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-pay"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Pay
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-personal"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Personal reasons
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleVerbalOfferOptionSelect(
                                  "offer-declined-withdrew"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Declined-Withdrew interest
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Offer Letter Section - Only show after offer accepted */}
            {showOfferLetter && (
              <div
                className={`border rounded-lg ${
                  selectedOfferLetterOption
                    ? "border-gray-300 bg-gray-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-between ${
                    selectedOfferLetterOption ? "p-2" : "p-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedOfferLetterOption ? (
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <h4
                      className={`font-semibold ${
                        selectedOfferLetterOption
                          ? "text-gray-600 text-sm"
                          : "text-gray-900"
                      }`}
                    >
                      Offer Letter
                    </h4>
                  </div>
                  {selectedOfferLetterOption && (
                    <button
                      onClick={handleRestartOfferLetter}
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                    >
                      <span className="text-orange-600">↻</span>
                      Restart
                    </button>
                  )}
                </div>

                {selectedOfferLetterOption && (
                  <div className="px-2 pb-2">
                    <div className="flex items-center gap-2 ml-6">
                      <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                      <span className="text-xs font-medium text-orange-600">
                        {selectedOfferLetterOption === "start-offer-letter"
                          ? "Start Offer Letter"
                          : "Offer Letter Sent"}
                      </span>
                    </div>
                  </div>
                )}

                {!selectedOfferLetterOption && (
                  <div className="px-4 pb-4">
                    <div className="ml-7 space-y-2">
                      {!offerLetterInitiated ? (
                        <>
                          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                              No Offer-Manager withdrew candidate
                            </span>
                          </div>
                          <div
                            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={handleStartOfferLetter}
                          >
                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                              Start Offer Letter
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                            <span className="text-sm font-medium text-orange-600">
                              Start Offer Letter
                            </span>
                          </div>
                          <div className="ml-4 space-y-2">
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleOfferLetterOptionSelect(
                                  "start-offer-letter"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Start Offer Letter
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleOfferLetterOptionSelect(
                                  "offer-letter-sent"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Offer Letter Sent
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Drug Screening/Physical/TB Section - Only show after offer letter sent */}
            {showDrugScreening && (
              <div
                className={`border rounded-lg ${
                  selectedDrugScreeningOption
                    ? "border-gray-300 bg-gray-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-between ${
                    selectedDrugScreeningOption ? "p-2" : "p-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedDrugScreeningOption ? (
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <h4
                      className={`font-semibold ${
                        selectedDrugScreeningOption
                          ? "text-gray-600 text-sm"
                          : "text-gray-900"
                      }`}
                    >
                      Drug Screening/Physical/TB
                    </h4>
                  </div>
                  {selectedDrugScreeningOption && (
                    <button
                      onClick={handleRestartDrugScreening}
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                    >
                      <span className="text-orange-600">↻</span>
                      Restart
                    </button>
                  )}
                </div>

                {selectedDrugScreeningOption && (
                  <div className="px-2 pb-2">
                    <div className="flex items-center gap-2 ml-6">
                      <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                      <span className="text-xs font-medium text-orange-600">
                        Initiate Drug Screen/Physical/TB
                      </span>
                    </div>
                  </div>
                )}

                {!selectedDrugScreeningOption && (
                  <div className="px-4 pb-4">
                    <div className="ml-7 space-y-2">
                      {!drugScreeningInitiated ? (
                        <div
                          className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={handleInitiateDrugScreening}
                        >
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            Initiate Drug Screen/Physical/TB
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                            <span className="text-sm font-medium text-orange-600">
                              Initiate Drug Screen/Physical/TB
                            </span>
                          </div>
                          <div className="ml-4 space-y-2">
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleDrugScreeningOptionSelect("approved")
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Approved
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleDrugScreeningOptionSelect("not-approved")
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Not Approved
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Onboarding Card - Only show after drug screening approved */}
            {showOnboardingCard && (
              <div
                className={`border rounded-lg ${
                  selectedOnboardingOption
                    ? "border-gray-300 bg-gray-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-between ${
                    selectedOnboardingOption ? "p-2" : "p-4"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {selectedOnboardingOption ? (
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                    <h4
                      className={`font-semibold ${
                        selectedOnboardingOption
                          ? "text-gray-600 text-sm"
                          : "text-gray-900"
                      }`}
                    >
                      Onboarding
                    </h4>
                  </div>
                  {selectedOnboardingOption && (
                    <button
                      onClick={handleRestartOnboarding}
                      className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-xs font-medium"
                    >
                      <span className="text-orange-600">↻</span>
                      Restart
                    </button>
                  )}
                </div>

                {selectedOnboardingOption && (
                  <div className="px-2 pb-2">
                    <div className="flex items-center gap-2 ml-6">
                      <span className="w-1.5 h-0.5 bg-orange-500 rounded"></span>
                      <span className="text-xs font-medium text-orange-600">
                        {selectedOnboardingOption === "begin-onboarding"
                          ? "Begin Employee Onboarding"
                          : "Employee Onboarding Complete"}
                      </span>
                    </div>
                  </div>
                )}

                {!selectedOnboardingOption && (
                  <div className="px-4 pb-4">
                    <div className="ml-7 space-y-2">
                      {!onboardingInitiated ? (
                        <div
                          className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={handleInitiateOnboarding}
                        >
                          <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                          <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                            Begin Employee Onboarding
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                            <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                            <span className="text-sm font-medium text-orange-600">
                              Begin Employee Onboarding
                            </span>
                          </div>
                          <div className="ml-4 space-y-2">
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleOnboardingOptionSelect(
                                  "start-employee-onboarding"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Start Employee Onboarding
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                handleOnboardingOptionSelect(
                                  "onboarding-complete"
                                )
                              }
                            >
                              <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                              <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                Employee Onboarding Complete
                              </span>
                            </div>
                          </div>

                          {/* HR Onboarding options - show after Employee Onboarding Complete */}
                          {employeeOnboardingCompleted && (
                            <div className="ml-4 mt-2">
                              <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                                <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                                <span className="text-sm font-medium text-orange-600">
                                  Employee Onboarding Complete
                                </span>
                              </div>
                              <div className="ml-4 space-y-2">
                                {!hrOnboardingInitiated ? (
                                  <div
                                    className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={handleInitiateHrOnboarding}
                                  >
                                    <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                    <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                      Start HR Onboarding
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                                      <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                                      <span className="text-sm font-medium text-orange-600">
                                        Start HR Onboarding
                                      </span>
                                    </div>
                                    <div className="ml-4 space-y-2">
                                      <div
                                        className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() =>
                                          handleHrOnboardingOptionSelect(
                                            "start-hr-onboarding"
                                          )
                                        }
                                      >
                                        <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                        <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                          Start HR Onboarding
                                        </span>
                                      </div>
                                      <div
                                        className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() =>
                                          handleHrOnboardingOptionSelect(
                                            "hr-onboarding-complete"
                                          )
                                        }
                                      >
                                        <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                        <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                          HR Onboarding Complete
                                        </span>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}

                          {/* New Hire Card - Only show after HR onboarding complete */}
                          {showNewHireCard && (
                            <div
                              className={`border border-gray-200 rounded-lg bg-white ${
                                selectedNewHireOption ? "opacity-60" : ""
                              }`}
                            >
                              <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                  {selectedNewHireOption ? (
                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                  )}
                                  <h4 className="font-semibold text-gray-900">
                                    New Hire
                                  </h4>
                                </div>
                                {selectedNewHireOption && (
                                  <button
                                    onClick={handleRestartNewHire}
                                    className="flex items-center gap-1 text-orange-600 hover:text-orange-700 text-sm font-medium"
                                  >
                                    <span className="text-orange-600">↻</span>
                                    Restart
                                  </button>
                                )}
                              </div>

                              {selectedNewHireOption && (
                                <div className="px-4 pb-4">
                                  <div className="flex items-center gap-3 ml-7">
                                    <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                                    <span className="text-sm font-medium text-orange-600 flex items-center gap-2">
                                      {selectedNewHireOption === "ready-to-hire"
                                        ? "Ready to hire"
                                        : "Hiring Complete"}
                                      {selectedNewHireOption ===
                                        "ready-to-hire" &&
                                        hireDateData.hireDate && (
                                          <button
                                            onClick={handleShowHireDetails}
                                            className="w-4 h-4 text-orange-600 hover:text-orange-700 cursor-pointer"
                                            title="View hire details"
                                          >
                                            🪟
                                          </button>
                                        )}
                                    </span>
                                  </div>
                                </div>
                              )}

                              {!selectedNewHireOption && (
                                <div className="px-4 pb-4">
                                  <div className="ml-7 space-y-2">
                                    {!newHireInitiated ? (
                                      <div
                                        className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={handleInitiateNewHire}
                                      >
                                        <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                        <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                          Ready to hire
                                        </span>
                                      </div>
                                    ) : (
                                      <>
                                        <div className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors">
                                          <span className="w-2 h-0.5 bg-orange-500 rounded"></span>
                                          <span className="text-sm font-medium text-orange-600">
                                            Ready to hire
                                          </span>
                                        </div>
                                        <div className="ml-4 space-y-2">
                                          <div
                                            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() =>
                                              handleNewHireOptionSelect(
                                                "ready-to-hire"
                                              )
                                            }
                                          >
                                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                              Ready to hire
                                            </span>
                                          </div>
                                          <div
                                            className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() =>
                                              handleNewHireOptionSelect(
                                                "hiring-complete"
                                              )
                                            }
                                          >
                                            <span className="w-2 h-0.5 bg-gray-400 rounded"></span>
                                            <span className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer">
                                              Hiring Complete
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Approval Process Modal */}
      {showApprovalProcessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900">
                Request for Hire
              </h3>
              <button
                onClick={() => setShowApprovalProcessModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * Credentialed Job?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="credentialed"
                        className="mr-2"
                      />
                      <span className="text-sm">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="credentialed"
                        className="mr-2"
                      />
                      <span className="text-sm">No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Projected Start Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="border border-gray-300 rounded px-3 py-2 text-sm w-full pr-10"
                      placeholder="Select date"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-600 cursor-pointer"
                      onClick={() => {
                        // Calendar click functionality - you can integrate with a date picker library here
                        console.log("Calendar clicked");
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                        />
                        <line
                          x1="16"
                          y1="2"
                          x2="16"
                          y2="6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="8"
                          y1="2"
                          x2="8"
                          y2="6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <line
                          x1="3"
                          y1="10"
                          x2="21"
                          y2="10"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * Immediate Supervisor, Additional Contact
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * Shift Type:
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="shift" className="mr-2" />
                      <span className="text-sm">COMPR</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="shift" className="mr-2" />
                      <span className="text-sm">FLEX</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="shift" className="mr-2" />
                      <span className="text-sm">None</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="shift" className="mr-2" />
                      <span className="text-sm">REG</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="shift" className="mr-2" />
                      <span className="text-sm">VAR</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hours per week (Part-Time positions only) and/or Comments
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-4 border-t flex-shrink-0">
              <button
                onClick={() => setShowApprovalProcessModal(false)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleApprovalProcessNext}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reference Check Guide Modal */}
      {showReferenceCheckGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Reference Check Guide
              </h3>
              <button
                onClick={() => setShowReferenceCheckGuide(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Obtain the reference check guide by going to the documents tab
                  or{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    clicking here
                  </span>
                </p>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowReferenceCheckGuide(false)}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReferenceCheckNext}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmRestart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Confirm Restart
              </h3>
              <button
                onClick={handleConfirmRestartNo}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-700 mb-6">
                Do you really want to restart the{" "}
                {restartType === "review"
                  ? "Review Application"
                  : restartType === "phone"
                  ? "Phone Screen"
                  : restartType === "first-interview"
                  ? "First Interview"
                  : restartType === "second-interview"
                  ? "Second Interview"
                  : "Personal Reference Check"}{" "}
                process?
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleConfirmRestartNo}
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRestartYes}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Restart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compensation Modal 1 - Screening Questions */}
      {showCompensationModal1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
              <h3 className="text-lg font-semibold text-gray-900">
                Screening Questions
              </h3>
              <button
                onClick={() => setShowCompensationModal1(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * Base Pay:
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    * Pay Frequency:
                  </label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                    <option>choose one...</option>
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                    <option>Annually</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-4 border-t flex-shrink-0">
              <button
                onClick={() => setShowCompensationModal1(false)}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCompensationModal1Next}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compensation Modal 2 - Compensation (HR) */}
      {showCompensationModal2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Compensation (HR)
              </h3>
              <button
                onClick={() => setShowCompensationModal2(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-700">
                  To those that have access, you can view the rates at the top
                  of the Additional Info tab.
                </p>
                <p className="text-sm text-gray-700">
                  If you have any question about the rates contact HR at
                  HireNow@mhmrctc.org.
                </p>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowCompensationModal2(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompensationModal2Next}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Popup Modal */}
      {showFormPopup && formPopupData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                {formPopupData.title}
              </h3>
              <button
                onClick={handleFormPopupClose}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {formPopupData.fields.map((field: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{field}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleFormPopupClose}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
