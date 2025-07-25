"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CreateSelfServiceChangePage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    configuration: "",
    title: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center gap-4">
              <Link href="/admin-console/self-service">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-gray-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back to Self Service
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-[#EE5A37]">
                  System Configuration
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  Self service change created successfully
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="max-w-6xl mx-auto">
              {/* Navigation Links */}
              <div className="mb-6">
                <div className="flex items-center gap-1 text-sm">
                  <Link
                    href="/dashboard"
                    className="text-[#EE5A37] hover:underline"
                  >
                    Home
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    href="/admin-console"
                    className="text-[#EE5A37] hover:underline"
                  >
                    HMC Admin Console
                  </Link>
                  <span className="text-gray-400">|</span>
                  <Link
                    href="/admin-console/self-service/sign-out"
                    className="text-[#EE5A37] hover:underline"
                  >
                    Sign Out
                  </Link>
                </div>
              </div>

              {/* Welcome Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Welcome, Pratham!
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Self Service Management Console
                </p>
              </div>

              {/* Success Message */}
              <div className="mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-green-800">Success!</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Self Service Change created successfully.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Information */}
              <div className="mb-8">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    System Configuration
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-gray-600">Status:</span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full">
                        In-Progress
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">System:</span>
                      <span className="text-sm font-medium text-gray-900">
                        System
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      There are no approvers associated with this Self Service
                      Change.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/admin-console/self-service/add-edit-change-unit"
                    className="group"
                  >
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:border-[#EE5A37]/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#EE5A37] bg-opacity-[0.1] rounded-lg flex items-center justify-center group-hover:bg-[#EE5A37] group-hover:bg-opacity-[0.2]">
                          <svg
                            className="w-5 h-5 text-[#EE5A37]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-[#EE5A37]">
                            Add/Edit Change Unit
                          </h4>
                          <p className="text-sm text-gray-600">
                            Manage change units
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/admin-console/self-service/archive"
                    className="group"
                  >
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:border-[#EE5A37]/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#EE5A37] bg-opacity-[0.1] rounded-lg flex items-center justify-center group-hover:bg-[#EE5A37] group-hover:bg-opacity-[0.2]">
                          <svg
                            className="w-5 h-5 text-[#EE5A37]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 8l4 4 4-4"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-[#EE5A37]">
                            Archive Change
                          </h4>
                          <p className="text-sm text-gray-600">
                            Archive this change
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <Link href="/admin-console/self-service" className="group">
                    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 hover:border-[#EE5A37]/30">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#EE5A37] bg-opacity-[0.1] rounded-lg flex items-center justify-center group-hover:bg-[#EE5A37] group-hover:bg-opacity-[0.2]">
                          <svg
                            className="w-5 h-5 text-[#EE5A37]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-[#EE5A37]">
                            Back to Home
                          </h4>
                          <p className="text-sm text-gray-600">
                            Return to main page
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-8">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex space-x-8">
                    <button className="border-b-2 border-[#EE5A37] py-2 px-1 text-sm font-medium text-[#EE5A37]">
                      Contents
                    </button>
                    <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Additional Details
                    </button>
                    <button className="border-b-2 border-transparent py-2 px-1 text-sm font-medium text-gray-500 hover:text-gray-700">
                      History
                    </button>
                  </nav>
                </div>
              </div>

              {/* Edit Details */}
              <div className="mb-8">
                <Link
                  href="/admin-console/self-service/edit-details"
                  className="text-[#EE5A37] hover:text-[#d14d2a] hover:underline font-medium"
                >
                  Edit Details
                </Link>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-300 pt-6 mt-12">
                <div className="text-xs text-gray-600 space-y-2">
                  <p>
                    <strong>LEGAL DISCLAIMER:</strong> By utilizing this
                    self-service Change Management Console, you acknowledge that
                    you have received the required training for the Console and
                    are authorized by your company to access and use the Console
                    in accordance with your company's instructions.
                  </p>
                  <p>
                    Cadient Talent disclaims any responsibility or liability for
                    any content or modifications created through the use of the
                    Console.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <Link
                      href="/help"
                      className="text-[#EE5A37] hover:underline text-xs"
                    >
                      Help
                    </Link>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        Copyright © 2000 - 2025 by Cadient LLC. All rights
                        reserved.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        U. S. Patents 7,080,057; 7,310,626; 7,558,767;
                        7,562,059; 7,472,097; 7,606,778; 8,086,558 and
                        8,046,251.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin-console/self-service">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Back to Self Service
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-[#EE5A37]">
                Create Self Service Change
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Create and configure your self service change
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Navigation Links */}
            <div className="mb-6">
              <div className="flex items-center gap-1 text-sm">
                <Link
                  href="/dashboard"
                  className="text-[#EE5A37] hover:underline"
                >
                  Home
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/admin-console"
                  className="text-[#EE5A37] hover:underline"
                >
                  HMC Admin Console
                </Link>
                <span className="text-gray-400">|</span>
                <Link
                  href="/admin-console/self-service/sign-out"
                  className="text-[#EE5A37] hover:underline"
                >
                  Sign Out
                </Link>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Welcome, Pratham!
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Self Service Management Console
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-sm text-gray-700 leading-relaxed">
                You can create a self service change from this page. You will
                provide details including a title and description for your self
                service change. Also, you can optionally attach a configuration
                document for later use and designate an approver for the self
                service change.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 mb-8">
                {/* Choose Configuration Area */}
                <div className="space-y-3">
                  <Label
                    htmlFor="configuration"
                    className="text-sm font-medium text-gray-900"
                  >
                    Choose the area of Configuration: *
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="choose one..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system-configuration">
                        System Configuration
                      </SelectItem>
                      <SelectItem value="onboarding-site-configuration">
                        Onboarding Site Configuration
                      </SelectItem>
                      <SelectItem value="seeker-site-configuration">
                        Seeker Site Configuration
                      </SelectItem>
                      <SelectItem value="hmc-configuration">
                        HMC Configuration
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Title */}
                <div className="space-y-3">
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium text-gray-900"
                  >
                    Title: *
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    className="w-full"
                    placeholder="Enter a title for your self service change"
                  />
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <Label
                    htmlFor="description"
                    className="text-sm font-medium text-gray-900"
                  >
                    Description:
                  </Label>
                  <Textarea
                    id="description"
                    className="w-full min-h-[120px]"
                    placeholder="Enter a detailed description of your self service change"
                  />
                </div>

                {/* Attach Configuration Document */}
                <div className="space-y-3">
                  <Label
                    htmlFor="document"
                    className="text-sm font-medium text-gray-900"
                  >
                    Attach Configuration Document:
                  </Label>
                  <Input
                    id="document"
                    type="file"
                    className="w-full"
                    accept=".pdf,.doc,.docx,.txt"
                  />
                </div>

                {/* Choose Approver */}
                <div className="space-y-3">
                  <Label
                    htmlFor="approver"
                    className="text-sm font-medium text-gray-900"
                  >
                    Choose an Approver:
                  </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an approver..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">
                        System Administrator
                      </SelectItem>
                      <SelectItem value="manager">
                        Department Manager
                      </SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-8">
                <Button
                  type="submit"
                  className="bg-[#EE5A37] hover:bg-[#d14d2a] text-white px-8"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="px-8"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="border-t border-gray-300 pt-6 mt-12">
              <div className="text-xs text-gray-600 space-y-2">
                <p>
                  <strong>LEGAL DISCLAIMER:</strong> By utilizing this
                  self-service Change Management Console, you acknowledge that
                  you have received the required training for the Console and
                  are authorized by your company to access and use the Console
                  in accordance with your company's instructions.
                </p>
                <p>
                  Cadient Talent disclaims any responsibility or liability for
                  any content or modifications created through the use of the
                  Console.
                </p>
                <div className="flex items-center justify-between mt-4">
                  <Link
                    href="/help"
                    className="text-[#EE5A37] hover:underline text-xs"
                  >
                    Help
                  </Link>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      Copyright © 2000 - 2025 by Cadient LLC. All rights
                      reserved.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      U. S. Patents 7,080,057; 7,310,626; 7,558,767; 7,562,059;
                      7,472,097; 7,606,778; 8,086,558 and 8,046-251.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
