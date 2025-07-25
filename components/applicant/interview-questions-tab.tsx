import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ChevronLeft, User, X } from "lucide-react";
import { useState } from "react";

interface Interviewer {
  id: number;
  name: string;
  email: string;
}

export default function InterviewQuestionsTab() {
  const [activeTab, setActiveTab] = useState("schedule");
  const [isScheduleDrawerOpen, setIsScheduleDrawerOpen] = useState(false);
  const [scheduleStep, setScheduleStep] = useState(1);
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState({ start: "", end: "" });
  const [interviewType, setInterviewType] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [useProfileNumber, setUseProfileNumber] = useState(true);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [currentInterviewer, setCurrentInterviewer] = useState("");
  const [isScheduled, setIsScheduled] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedInterviewDate, setSelectedInterviewDate] = useState("");
  const [currentInterviewerId, setCurrentInterviewerId] = useState<
    number | null
  >(null);
  const [interviewerTimes, setInterviewerTimes] = useState<{
    [key: number]: { start: string; end: string };
  }>({});

  // Dummy suggestions for interviewer search
  const interviewerSuggestions = [
    "Abhishek Gupta",
    "John Smith",
    "Sarah Johnson",
    "Michael Brown",
    "Emily Davis",
  ];

  const filteredSuggestions = interviewerSuggestions.filter(
    (name) =>
      name.toLowerCase().includes(currentInterviewer.toLowerCase()) &&
      currentInterviewer.length > 0
  );

  const questions = [
    "As a cook, are you familiar with the health codes in our specific state or county?",
    "How have you or how would you respond to criticism from a customer about their dish?",
    "How would you handle this situation: You run out of the daily special but still have three orders you need to fill?",
    "What is the most stressful situation you have had while cooking professionally, and how did you handle it?",
    "As a cook, how do you stay energized and motivated to produce quality dishes throughout your shift?",
  ];

  const addInterviewer = (name?: string) => {
    const interviewerName = name || currentInterviewer.trim();
    if (interviewerName) {
      setInterviewers([
        ...interviewers,
        {
          id: Date.now(),
          name: interviewerName,
          email: "diana.laferriere@kronos.com",
        },
      ]);
      setCurrentInterviewer("");
      setShowSuggestions(false);
    }
  };

  const removeInterviewer = (id: number) => {
    setInterviewers(
      interviewers.filter((interviewer) => interviewer.id !== id)
    );
  };

  const nextStep = () => {
    if (scheduleStep < 4) {
      setScheduleStep(scheduleStep + 1);
    }
  };

  const prevStep = () => {
    if (scheduleStep > 1) {
      setScheduleStep(scheduleStep - 1);
    }
  };

  const scheduleInterview = () => {
    setIsScheduled(true);
    setIsScheduleDrawerOpen(false);
    setScheduleStep(1);
  };

  const resetSchedule = () => {
    setIsScheduled(false);
    setInterviewers([]);
    setSelectedDate(null);
    setSelectedTime({ start: "", end: "" });
    setInterviewType("");
    setLocation("");
    setPhoneNumber("");
  };

  const renderProgressSteps = () => (
    <div className="flex items-center justify-center mb-12 px-4">
      <div className="flex items-center space-x-4">
        {/* Interviewers */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              scheduleStep >= 1
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {scheduleStep > 1 ? "✓" : "1"}
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              scheduleStep >= 1 ? "text-orange-600" : "text-gray-500"
            }`}
          >
            Interviewers
          </span>
        </div>

        <div
          className={`w-8 h-0.5 ${
            scheduleStep >= 2 ? "bg-orange-500" : "bg-gray-300"
          }`}
        ></div>

        {/* Schedule */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              scheduleStep >= 2
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {scheduleStep > 2 ? "✓" : "2"}
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              scheduleStep >= 2 ? "text-orange-600" : "text-gray-500"
            }`}
          >
            Schedule
          </span>
        </div>

        <div
          className={`w-8 h-0.5 ${
            scheduleStep >= 3 ? "bg-orange-500" : "bg-gray-300"
          }`}
        ></div>

        {/* Communication */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              scheduleStep >= 3
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {scheduleStep > 3 ? "✓" : "3"}
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              scheduleStep >= 3 ? "text-orange-600" : "text-gray-500"
            }`}
          >
            Communication
          </span>
        </div>

        <div
          className={`w-8 h-0.5 ${
            scheduleStep >= 4 ? "bg-orange-500" : "bg-gray-300"
          }`}
        ></div>

        {/* Preview */}
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              scheduleStep >= 4
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            4
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              scheduleStep >= 4 ? "text-orange-600" : "text-gray-500"
            }`}
          >
            Preview
          </span>
        </div>
      </div>
    </div>
  );

  const renderScheduleContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Legacy Schedule Interview
        </h2>
        <Button
          onClick={() => setIsScheduleDrawerOpen(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium text-sm flex items-center gap-2"
        >
          <span className="text-sm">📅</span>
          Schedule an Interview
        </Button>
      </div>

      {/* Upcoming Interviews Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">
          Upcoming Interviews
        </h3>

        {/* Interview Entry 1 */}
        <div className="border border-gray-200 rounded-lg p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {/* Date Icon */}
              <div className="bg-orange-100 rounded p-1.5 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Interview Details */}
              <div className="flex-1">
                <div className="text-sm font-semibold text-orange-600 mb-1">
                  July 15, 2025
                </div>
                <div className="text-base font-semibold text-gray-900 mb-2">
                  Interview for Emily Davis
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Requisition:</span> Accountant
                    (281)
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> 5:00 AM - 1:30 PM
                  </div>
                  <div>
                    <span className="font-medium">Interviewers:</span> Pratham
                    Jain (you)
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> Phone Screen
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Location:</span> Call:
                    360-772-4065
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Reschedule
              </Button>
            </div>
          </div>
        </div>

        {/* Interview Entry 2 */}
        <div className="border border-gray-200 rounded-lg p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {/* Date Icon */}
              <div className="bg-orange-100 rounded p-1.5 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-orange-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Interview Details */}
              <div className="flex-1">
                <div className="text-sm font-semibold text-orange-600 mb-1">
                  -
                </div>
                <div className="text-base font-semibold text-gray-900 mb-2">
                  Interview for Emily Davis
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Requisition:</span> Accountant
                    (281)
                  </div>
                  <div>
                    <span className="font-medium">Time:</span>
                  </div>
                  <div>
                    <span className="font-medium">Interviewers:</span> Pratham
                    Jain (you)
                  </div>
                  <div>
                    <span className="font-medium">Type:</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium">Location:</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="text-gray-600 border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                Complete
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {!isScheduled ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <p className="text-gray-700 text-sm">
            There are no interviews scheduled for this application.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Scheduled Interview
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetSchedule}>
                  Cancel Interview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsScheduleDrawerOpen(true)}
                >
                  Reschedule Interview
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Date:</span>
                <p className="text-gray-600">Tuesday, July 1, 2025</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Time:</span>
                <p className="text-gray-600">6:30 PM - 7:30 PM</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Type:</span>
                <p className="text-gray-600">
                  {interviewType || "Phone Screen"}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Interviewers:</span>
                <p className="text-gray-600">
                  {interviewers.map((i) => i.name).join(", ") ||
                    "Abhishek Gupta"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Drawer */}
      <Sheet open={isScheduleDrawerOpen} onOpenChange={setIsScheduleDrawerOpen}>
        <SheetContent
          side="right"
          className="p-0 overflow-hidden"
          style={{ width: "70vw", maxWidth: "70vw" }}
        >
          <div className="flex flex-col h-full">
            <SheetHeader className="px-6 py-6 border-b bg-white">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsScheduleDrawerOpen(false)}
                  className="p-1 h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
                <div>
                  <SheetTitle className="text-lg font-semibold">
                    Schedule an Interview
                  </SheetTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Bryan Bellmeyer m for Distribution Warehouse Custodian
                  </p>
                </div>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-auto">
              {renderProgressSteps()}

              <div className="px-6 pb-6">
                {scheduleStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Interviewers
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        This is the list of users who will interview the
                        candidate.
                      </p>
                    </div>

                    {interviewers.length === 0 ? (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <p className="text-gray-700 text-sm">
                          There are no interviewers associated. Add an
                          interviewer.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {interviewers.map((interviewer) => (
                          <div
                            key={interviewer.id}
                            className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-600" />
                              <span className="text-sm font-medium">
                                {interviewer.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({interviewer.email})
                              </span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeInterviewer(interviewer.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Add an Interviewer:
                        </h4>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="interviewer-type"
                              defaultChecked
                              className="text-orange-500"
                            />
                            <span className="text-sm">
                              System User - user&apos;s name is in the system
                            </span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="interviewer-type"
                              className="text-orange-500"
                            />
                            <span className="text-sm">
                              Ad Hoc Interviewer - add name and email address
                            </span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4 relative">
                        <Input
                          placeholder="Start typing to show a list"
                          value={currentInterviewer}
                          onChange={(e) => {
                            setCurrentInterviewer(e.target.value);
                            setShowSuggestions(e.target.value.length > 0);
                          }}
                          onFocus={() =>
                            setShowSuggestions(currentInterviewer.length > 0)
                          }
                          onBlur={() =>
                            setTimeout(() => setShowSuggestions(false), 200)
                          }
                          className="w-full"
                        />

                        {/* Suggestions Dropdown */}
                        {showSuggestions && filteredSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-40 overflow-y-auto">
                            {filteredSuggestions.map((suggestion, index) => (
                              <div
                                key={index}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                onClick={() => addInterviewer(suggestion)}
                              >
                                {suggestion}
                              </div>
                            ))}
                          </div>
                        )}

                        <Button
                          onClick={() => addInterviewer()}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                          disabled={!currentInterviewer.trim()}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Add an Interviewer
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {scheduleStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Schedule
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      {/* Date Section */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Date
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Choose a date for the interview event
                        </p>
                        <div className="relative">
                          <Input
                            placeholder="Select date"
                            value={selectedInterviewDate}
                            onChange={(e) =>
                              setSelectedInterviewDate(e.target.value)
                            }
                            className="w-full pr-10"
                          />
                          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-orange-500 text-sm">
                            📅
                          </span>
                        </div>
                      </div>

                      {/* Times Section */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          Times
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Schedule times for each interviewer
                        </p>

                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-900">
                            Interviewers
                          </h5>

                          {interviewers.length === 0 ? (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                              <span className="text-sm text-gray-600">
                                Abhishek Gupta
                              </span>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-orange-600">
                                  {interviewerTimes[0]
                                    ? `${interviewerTimes[0].start} - ${interviewerTimes[0].end}`
                                    : "6:30 PM - 7:30 PM"}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-orange-600 border-orange-300"
                                  onClick={() => {
                                    setCurrentInterviewerId(0);
                                    setIsTimePickerOpen(true);
                                  }}
                                >
                                  pick a time
                                </Button>
                              </div>
                            </div>
                          ) : (
                            interviewers.map((interviewer) => (
                              <div
                                key={interviewer.id}
                                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                              >
                                <span className="text-sm text-gray-600">
                                  {interviewer.name}
                                </span>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-sm text-orange-600">
                                    {interviewerTimes[interviewer.id]
                                      ? `${
                                          interviewerTimes[interviewer.id].start
                                        } - ${
                                          interviewerTimes[interviewer.id].end
                                        }`
                                      : "6:30 PM - 7:30 PM"}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-orange-600 border-orange-300"
                                    onClick={() => {
                                      setCurrentInterviewerId(interviewer.id);
                                      setIsTimePickerOpen(true);
                                    }}
                                  >
                                    pick a time
                                  </Button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {scheduleStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Communication Options
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        An email will be sent to each interview participant.
                        Please review the communication options.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Interviewers Section */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Interviewers
                        </h4>
                        <div className="text-sm text-gray-600 mb-2">
                          Tuesday, July 1, 2025
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="text-sm text-gray-600">
                                6:30 PM to 7:30 PM
                              </div>
                              <div className="text-sm font-medium">
                                Abhishek Gupta
                              </div>
                              <div className="text-xs text-gray-500">
                                (diana.laferriere@kronos.com)
                              </div>
                            </div>
                          </div>

                          {/* Interview Type */}
                          <div className="mb-4">
                            <div className="text-sm font-medium mb-2">
                              Interview Type:
                            </div>
                            <select
                              className="text-sm border border-gray-300 rounded px-2 py-1 w-full"
                              value={interviewType}
                              onChange={(e) => setInterviewType(e.target.value)}
                            >
                              <option value="">Choose one...</option>
                              <option value="On-site Interview">
                                On-site Interview
                              </option>
                              <option value="Phone Screen">Phone Screen</option>
                            </select>

                            {interviewType === "On-site Interview" && (
                              <div className="mt-2">
                                <div className="text-sm font-medium mb-1">
                                  Location:
                                </div>
                                <Input
                                  placeholder="Enter location"
                                  value={location}
                                  onChange={(e) => setLocation(e.target.value)}
                                  className="text-sm"
                                />
                              </div>
                            )}

                            {interviewType === "Phone Screen" && (
                              <div className="mt-2 space-y-2">
                                <div className="text-sm font-medium">
                                  Number to call:
                                </div>
                                <div className="space-y-1">
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="phone-option"
                                      checked={useProfileNumber}
                                      onChange={() => setUseProfileNumber(true)}
                                      className="text-orange-500"
                                    />
                                    <span className="text-sm">
                                      Use number in Profile
                                    </span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="phone-option"
                                      checked={!useProfileNumber}
                                      onChange={() =>
                                        setUseProfileNumber(false)
                                      }
                                      className="text-orange-500"
                                    />
                                    <span className="text-sm">New Number</span>
                                  </label>
                                </div>
                                {!useProfileNumber && (
                                  <Input
                                    placeholder="555-555-5555"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                      setPhoneNumber(e.target.value)
                                    }
                                    className="text-sm"
                                  />
                                )}
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="text-sm font-medium mb-1">
                              Interviewer Notes:
                            </div>
                            <textarea
                              className="w-full text-sm border border-gray-300 rounded p-2 h-20"
                              placeholder="Enter notes for the interviewer..."
                            />
                          </div>
                        </div>
                      </div>

                      {/* Candidate Section */}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Candidate
                        </h4>
                        <div className="text-sm text-gray-600 mb-2">
                          Tuesday, July 1, 2025
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="text-sm text-gray-600">
                                6:30 PM to 7:30 PM
                              </div>
                              <div className="text-sm font-medium">
                                Bryan Bellmeyer m
                              </div>
                              <div className="text-xs text-gray-500">
                                (bbellmeyertest@gmail.com)
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="text-sm font-medium mb-1">
                              Additional Instructions for candidate:
                            </div>
                            <textarea
                              className="w-full text-sm border border-gray-300 rounded p-2 h-20"
                              placeholder="Enter additional instructions..."
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {scheduleStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Preview
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Please review the interview event and communications for
                        each participant. Click &quot;Schedule Interview&quot;
                        to finalize the interview and send emails.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">📅</span>
                          <span className="font-medium">
                            Tuesday, July 1, 2025
                          </span>
                          <span className="ml-auto font-medium">
                            6:30 PM - 7:30 PM
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span>6:30 PM to 7:30 PM</span>
                          <span>Abhishek Gupta</span>
                          <span>Phone Screen</span>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">📧</span>
                          <span className="font-medium text-sm">
                            Abhishek Gupta (diana.laferriere@kronos.com)
                          </span>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                          <div className="text-red-600 text-xs">
                            ⚠️ Interviewer Email Template is not configured.
                            Please contact your system administrator.
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span>6:30 PM to 7:30 PM</span>
                          <span>Phone Screen</span>
                          <span>123-455-6665</span>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm">📧</span>
                          <span className="font-medium text-sm">
                            Bryan Bellmeyer m (bbellmeyertest@gmail.com)
                          </span>
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                          <div className="text-red-600 text-xs">
                            ⚠️ Interviewee Email Template is not configured.
                            Please contact your system administrator.
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-4">
                          <span>6:30 PM to 7:30 PM</span>
                          <span>Interview</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t bg-white px-6 py-4 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={scheduleStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Next Step:</span>
                {scheduleStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={scheduleStep === 1 && interviewers.length === 0}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={scheduleInterview}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Schedule Interview
                  </Button>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Time Picker Modal - Higher z-index to appear in front of drawer */}
      {isTimePickerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Abhishek Gupta</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsTimePickerOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm">📅</span>
              <span className="text-sm">July 1, 2025</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Start Time:
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={selectedTime.start}
                  onChange={(e) =>
                    setSelectedTime({ ...selectedTime, start: e.target.value })
                  }
                >
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  End Time:
                </label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={selectedTime.end}
                  onChange={(e) =>
                    setSelectedTime({ ...selectedTime, end: e.target.value })
                  }
                >
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="12:30 PM">12:30 PM</option>
                  <option value="1:00 PM">1:00 PM</option>
                  <option value="1:30 PM">1:30 PM</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-medium text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (currentInterviewerId !== null) {
                      setInterviewerTimes({
                        ...interviewerTimes,
                        [currentInterviewerId]: {
                          start: selectedTime.start || "11:30 AM",
                          end: selectedTime.end || "12:00 PM",
                        },
                      });
                    }
                    setIsTimePickerOpen(false);
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded font-medium text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsTimePickerOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderInterviewQuestionsContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="uppercase text-orange-600 font-bold text-sm">
        Interview Questions
      </div>

      {/* Position-Specific Section */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="font-semibold text-gray-800 text-lg mb-2">
              Position-Specific Interview Questions for Cook
            </div>
            <div className="text-sm text-gray-500 mb-4">
              Ask the following questions of everyone who applied to the Cook
              position.
            </div>
            <ol className="space-y-3">
              {questions.map((q, i) => (
                <li
                  key={i}
                  className="bg-gray-50 rounded-lg px-4 py-3 flex items-start text-sm text-gray-800 border border-gray-200"
                >
                  <span className="font-semibold mr-3 text-orange-600">
                    {i + 1}.
                  </span>
                  <span className="leading-relaxed">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Follow Up Questions */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="font-semibold text-gray-800 text-lg mb-2">
              Follow Up Questions
            </div>
            <div className="text-sm text-gray-500">
              Ask the following questions of everyone who applied to the Cook
              position.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Results Follow-up Questions */}
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="font-semibold text-gray-800 text-lg mb-2">
              Assessment Results Follow-up Questions
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Tab Navigation Buttons */}
      <div className="flex gap-3">
        <Button
          variant={activeTab === "schedule" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("schedule")}
          className={
            activeTab === "schedule"
              ? "bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              : "border-orange-400 text-orange-700 hover:bg-orange-50 px-4 py-2 rounded-md text-sm font-medium"
          }
        >
          Schedule
        </Button>
        <Button
          variant={activeTab === "questions" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("questions")}
          className={
            activeTab === "questions"
              ? "bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              : "border-orange-400 text-orange-700 hover:bg-orange-50 px-4 py-2 rounded-md text-sm font-medium"
          }
        >
          Interview Questions
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === "schedule" && renderScheduleContent()}
      {activeTab === "questions" && renderInterviewQuestionsContent()}
    </div>
  );
}
