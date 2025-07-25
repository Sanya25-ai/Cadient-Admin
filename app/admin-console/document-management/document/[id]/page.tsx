"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, Check, X, Settings } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function DocumentDetailsPage() {
  const params = useParams();
  const documentId = (params?.id as string) || "i-9";
  const [showChangesModal, setShowChangesModal] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const [showDraftCreated, setShowDraftCreated] = useState(false);
  const [showDraftDiscarded, setShowDraftDiscarded] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [pdfAction, setPdfAction] = useState("");
  const [showJobCodesModal, setShowJobCodesModal] = useState(false);
  const [selectedJobCodes, setSelectedJobCodes] = useState(["PC102"]);

  // Mock data based on the screenshot
  const documentData = {
    "i-9": {
      name: "I-9",
      description: "Form I-9 Description",
      status: "Published",
      publishedBy: "TEST_ADMIN",
      publishDate: "Apr 6, 2022 02:10 AM",
      publishedByTalent: "Cadient Talent",
    },
    "sales-demo-retail-omega-new-employee-onboarding": {
      name: "Sales Demo Retail Omega New Employee Onboarding",
      description: "Employee onboarding document list",
      status: "Published",
      publishedBy: "TEST_ADMIN",
      publishDate: "Apr 6, 2022 02:10 AM",
      publishedByTalent: "Cadient Talent",
    },
  };

  const document =
    documentData[documentId as keyof typeof documentData] ||
    documentData["i-9"];

  const handleCreateDraft = () => {
    setIsDraft(true);
    setShowDraftCreated(true);
    setShowDraftDiscarded(false);
  };

  const handleDiscardDraft = () => {
    setShowDiscardModal(true);
  };

  const confirmDiscardDraft = () => {
    setIsDraft(false);
    setShowDiscardModal(false);
    setShowDraftCreated(false);
    setShowDraftDiscarded(true);
  };

  const handlePdfAction = (action: string) => {
    setPdfAction(action);
    setShowPdfModal(true);
    // Simulate opening in new tab after a short delay
    setTimeout(() => {
      setShowPdfModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Navigation - similar to before Administrator's Console */}
      <div className="border-b border-gray-200 bg-white px-8 py-4">
        <div className="flex items-center gap-3">
          <Link href="/admin-console/document-management/publish-history">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 p-1"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {document.name}
            </h1>
            <p className="text-sm text-gray-600">Document Details</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Success Messages */}
        {showDraftCreated && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
            <span className="text-green-600 mr-3 text-lg">✓</span>
            <div>
              <div className="font-medium">Draft Document Created</div>
              <div className="text-sm text-green-700 mt-1">
                A draft copy of the published document has been created.
              </div>
            </div>
          </div>
        )}

        {showDraftDiscarded && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
            <span className="text-green-600 mr-3 text-lg">✓</span>
            <div>
              <div className="font-medium">Draft Discarded</div>
              <div className="text-sm text-green-700 mt-1">
                The draft document has been discarded.
              </div>
            </div>
          </div>
        )}

        {/* Compact Document Status Card */}
        <div className="mb-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-orange-800 font-medium text-lg mb-2">
                Document Status: {isDraft ? "Draft" : "Published"}
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                {isDraft
                  ? "This is a draft version that you can modify without affecting the currently published version. To discard changes made to this draft, click 'Discard Draft'. To test changes, click 'Test Changes'. To publish this draft, click 'Go To Publishing'."
                  : "This is a published version. To make changes, click on the Create Draft link to create a working copy which can be modified."}
              </p>

              {/* Published entries with Show Changes as text buttons */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span>
                    📄 Published by <strong>{document.publishedBy}</strong> on{" "}
                    {document.publishDate}
                  </span>
                  <button
                    className="text-[#EE5A37] hover:text-[#EE5A37]/80 font-medium flex items-center gap-1"
                    onClick={() => setShowChangesModal(true)}
                  >
                    <Settings className="h-3 w-3" />
                    Show Changes
                  </button>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>
                    📄 Published by{" "}
                    <strong>{document.publishedByTalent}</strong>
                  </span>
                  <button
                    className="text-[#EE5A37] hover:text-[#EE5A37]/80 font-medium flex items-center gap-1"
                    onClick={() => setShowChangesModal(true)}
                  >
                    <Settings className="h-3 w-3" />
                    Show Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {isDraft ? (
              <>
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleDiscardDraft}
                >
                  Discard Draft
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                  Go To Publishing
                </Button>
                <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                  Test Changes
                </Button>
              </>
            ) : (
              <Button
                className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white"
                onClick={handleCreateDraft}
              >
                Create Draft Copy
              </Button>
            )}
          </div>
        </div>

        {/* General Properties - Table Structure */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="bg-gray-600 py-2">
            <CardTitle className="text-white text-sm font-medium flex items-center justify-between">
              General Properties
              <span className="text-xs font-normal text-gray-300">
                📄 Client managed document
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100 w-32">
                    Name:
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {document.name}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    Description:
                  </TableCell>
                  <TableCell className="text-gray-900">
                    {document.description}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* PDF Management - Table Structure with Check/Cross Icons */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="bg-gray-600 py-2">
            <CardTitle className="text-white text-sm font-medium flex items-center justify-between">
              PDF Management
              <span className="text-xs font-normal text-gray-300">
                📄 Client managed document
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100 w-32">
                    English (CA):
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-gray-900">No PDF Assigned</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    English:
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-gray-900">PDF Assigned</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1"
                        onClick={() => handlePdfAction("view")}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1"
                        onClick={() => handlePdfAction("download")}
                      >
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    Français:
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-gray-900">No PDF Assigned</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    Español:
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-gray-900">No PDF Assigned</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Document Lists - Table Structure with Check/Cross Icons */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="bg-gray-600 py-2">
            <CardTitle className="text-white text-sm font-medium">
              Document Lists
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100 w-48">
                    Company Documents:
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-gray-900">Not Included</span>
                    </div>
                    <Link href="/admin-console/document-management/company-documents-tab">
                      <Button
                        size="sm"
                        className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <Settings className="h-3 w-3" />
                        Modify Company Document List
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    New Hire Packet:
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-gray-900">Not Included</span>
                    </div>
                    <Link href="/admin-console/document-management/new-hire-packet">
                      <Button
                        size="sm"
                        className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <Settings className="h-3 w-3" />
                        Modify New Hire Document List
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    aDemoSOnetF Sweven309 Employee Onboarding:
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-gray-900">Not Included</span>
                    </div>
                    <Link href="/admin-console/document-management/sales-demo-retail-omega-new-employee-onboarding">
                      <Button
                        size="sm"
                        className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <Settings className="h-3 w-3" />
                        Modify this Onboarding Application
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    aDemoSOnetF Sweven309 Manager Onboarding:
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <X className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-gray-900">Not Included</span>
                    </div>
                    <Link href="/admin-console/document-management/sales-demo-retail-omega-new-manager-onboarding">
                      <Button
                        size="sm"
                        className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
                      >
                        <Settings className="h-3 w-3" />
                        Modify this Onboarding Application
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Document Acceptance Rules - Table Structure with Check Icons */}
        <Card className="mb-6 shadow-sm">
          <CardHeader className="bg-gray-600 py-2">
            <CardTitle className="text-white text-sm font-medium">
              Document Acceptance Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100 w-48">
                    Seeker Sites:
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-gray-900">
                      Appears for all Seeker Sites
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    Locations:
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-gray-900">
                      Appears for all Locations
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    Job Codes:
                  </TableCell>
                  <TableCell className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-white" />
                      </div>
                      <span className="text-gray-900">
                        Appears for all Job Codes
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-orange-400 hover:bg-orange-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1"
                      onClick={() => setShowJobCodesModal(true)}
                    >
                      <Settings className="h-3 w-3" />
                      Modify the Rules for Job Codes
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    Applicant Statuses:
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-gray-900">
                      Appears for all Applicant Statuses
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-700 bg-gray-100">
                    Geographies:
                  </TableCell>
                  <TableCell className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-2.5 w-2.5 text-white" />
                    </div>
                    <span className="text-gray-900">
                      Appears for all Geographies
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Bottom Back Button */}
        <div className="flex justify-center mt-8">
          <Link href="/admin-console/document-management/publish-history">
            <Button className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-2">
              Back to All Documents
            </Button>
          </Link>
        </div>

        {/* All Modals remain the same */}
        {/* Document Comparison Modal */}
        <Dialog open={showChangesModal} onOpenChange={setShowChangesModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold border-b border-gray-300 pb-2">
                Document Comparison
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {/* Description */}
              <div className="text-sm text-gray-700">
                Compare the two versions of this document.
              </div>

              {/* Document Versions Comparison */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-8">
                  {/* Left Document */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-orange-500 text-2xl">📄</span>
                      <div>
                        <div className="font-semibold text-lg">I-9</div>
                        <div className="text-sm text-gray-600">
                          Published by TEST_ADMIN
                        </div>
                        <div className="text-sm text-gray-600">
                          on Apr 6, 2022 (5:10 AM)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Document */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-orange-500 text-2xl">📄</span>
                      <div>
                        <div className="font-semibold text-lg">I-9</div>
                        <div className="text-sm text-gray-600">
                          Published by TEST_ADMIN
                        </div>
                        <div className="text-sm text-gray-600">
                          on Apr 6, 2022 (5:05 AM)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* No Differences Message */}
                <div className="text-center mt-6 p-4 bg-yellow-50 rounded">
                  <div className="text-yellow-800 font-medium">
                    There are no differences between the two documents.
                  </div>
                </div>
              </div>

              {/* View Full Audit Logs Button */}
              <div>
                <Button className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2">
                  View Full Audit Logs
                </Button>
              </div>

              {/* Audit Logs Table */}
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-800">
                      <TableHead className="text-white font-medium">
                        Change Date
                      </TableHead>
                      <TableHead className="text-white font-medium">
                        User Name
                      </TableHead>
                      <TableHead className="text-white font-medium">
                        Change Details
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-gray-50">
                      <TableCell className="text-gray-600 italic">
                        Apr 6, 2022 (5:05 AM)
                      </TableCell>
                      <TableCell className="font-medium">TEST_ADMIN</TableCell>
                      <TableCell className="text-gray-700">
                        Draft Document created.
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-white">
                      <TableCell className="text-gray-600 italic">
                        Apr 6, 2022 (5:10 AM)
                      </TableCell>
                      <TableCell className="font-medium">TEST_ADMIN</TableCell>
                      <TableCell className="text-gray-700">
                        Document published.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Done Button */}
              <div className="flex justify-start">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-6 py-2"
                  onClick={() => setShowChangesModal(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Discard Draft Confirmation Modal */}
        <Dialog open={showDiscardModal} onOpenChange={setShowDiscardModal}>
          <DialogContent className="max-w-md bg-gray-800 text-white border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-lg font-normal text-white">
                uat-cta.cadienttalent.com says
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div className="text-white">
                Are you sure you want to discard this draft? All changes made
                since the creation of this draft will be lost.
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full"
                  onClick={() => setShowDiscardModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-2 rounded-full"
                  onClick={confirmDiscardDraft}
                >
                  OK
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* PDF Action Modal */}
        <Dialog open={showPdfModal} onOpenChange={setShowPdfModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">
                {pdfAction === "view"
                  ? "Opening Document"
                  : "Downloading Document"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                <div className="text-gray-700">
                  {pdfAction === "view"
                    ? "The document will open in a new tab..."
                    : "The document download will begin shortly..."}
                </div>
              </div>

              <div className="text-sm text-gray-600">
                Please check your browser for the new tab or download
                notification.
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Job Codes Editor Modal */}
        <Dialog open={showJobCodesModal} onOpenChange={setShowJobCodesModal}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold">
                  Document Job Codes Editor
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowJobCodesModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Description */}
              <div className="text-sm text-gray-700">
                Select job codes from the following categories to add to the
                list. Search for specific job codes in the search box or
                manually enter a comma-delimited list.
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column - Job Code Search */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Job Code Search
                  </h3>

                  {/* Search Input */}
                  <Input placeholder="Search" className="mb-4 text-gray-500" />

                  {/* Job Categories */}
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {/* Requisitions Category */}
                    <div className="bg-gray-600 text-white p-3 rounded">
                      <div className="flex items-center gap-2">
                        <span>▼</span>
                        <span className="font-medium">Requisitions</span>
                      </div>
                    </div>

                    {/* Job Items */}
                    <div className="bg-gray-600 text-white p-3 rounded flex items-center gap-2">
                      <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm">
                        −
                      </span>
                      <span>Store Manager (402)</span>
                    </div>

                    <div className="bg-gray-600 text-white p-3 rounded flex items-center gap-2">
                      <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm">
                        −
                      </span>
                      <span>Assistant Manager (AMGR101)</span>
                    </div>

                    <div className="bg-gray-600 text-white p-3 rounded flex items-center gap-2">
                      <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm">
                        −
                      </span>
                      <span>Payroll Administrator (PADMN)</span>
                    </div>

                    {/* Highlighted Item */}
                    <div className="bg-gray-100 border-2 border-gray-300 p-3 rounded flex items-center gap-2">
                      <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-sm">
                        −
                      </span>
                      <span>Prep Cook (PC102)</span>
                    </div>
                  </div>
                </div>

                {/* Right Column - Job Codes */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Job Codes</h3>

                  {/* Job Codes Input */}
                  <div className="border border-gray-300 rounded p-4 min-h-96 bg-white">
                    <div className="text-gray-700">PC102</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
                  onClick={() => setShowJobCodesModal(false)}
                >
                  Save
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
                  onClick={() => setShowJobCodesModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
