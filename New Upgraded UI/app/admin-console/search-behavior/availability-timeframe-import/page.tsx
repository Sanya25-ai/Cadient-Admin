"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AvailabilityTimeframeImportPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Handle file upload logic here
      console.log("Uploading file:", selectedFile.name);
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Fixed Header - positioned below main navbar (70px) */}
      <div className="sticky z-10 bg-white shadow-sm" style={{ top: "70px" }}>
        {/* Sub Header with Back Navigation and Title */}
        <div className="px-6 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin-console/search-behavior">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold text-[#EE5A37]">
              Availability Timeframe Import
            </h1>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Description */}
          <div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Use this tool to batch import multiple Availability Timeframes.
              Timeframes must be structured in an XML file.
            </p>
          </div>

          {/* File Upload Section */}
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-1">
                <span className="text-red-500">*</span>
                <Label
                  htmlFor="timeframe-file"
                  className="text-sm font-medium text-gray-900"
                >
                  Choose Availability Timeframe file:
                </Label>
              </div>

              <div className="space-y-2">
                <Input
                  id="timeframe-file"
                  type="file"
                  accept=".xml"
                  onChange={handleFileChange}
                  className="w-full max-w-md"
                />
                <p className="text-xs text-red-600">This field is required.</p>
              </div>
            </div>

            {/* Upload Button */}
            <div className="pt-4">
              <Button
                onClick={handleUpload}
                disabled={!selectedFile}
                className="bg-[#EE5A37] hover:bg-[#EE5A37]/90 text-white font-medium px-6 py-2"
              >
                Upload Timeframes
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-300 pt-6 mt-12">
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex items-center justify-between">
                <Link href="/help" className="text-[#EE5A37] hover:underline">
                  Help
                </Link>
                <p className="text-xs text-gray-500">
                  Copyright © 2000 - 2025 by Cadient LLC. All rights reserved.
                </p>
              </div>
              <p className="text-xs text-gray-500">
                U. S. Patents 7,080,057; 7,310,626; 7,558,767; 7,562,059;
                7,472,097; 7,606,778; 8,086,558 and 8,046,251.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
