import React from "react";
import { FileText } from "lucide-react";

const documents = [
  "Employment Application",
  "DE 4 California",
  "Behavioral Interview Job Aid",
  "Parking Registration",
  "W 4"
];

export default function CompanyDocumentsTab() {
  return (
    <div className="w-full md:col-span-2 mt-6">
      <div className="bg-white p-6">
        {/* Top Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-200 hover:bg-orange-50">Company Documents</button>
          <button className="bg-transparent text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-200 hover:bg-orange-50">Attachment</button>
          <button className="bg-transparent text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-200 hover:bg-orange-50">New Hire Packet</button>
        </div>
        {/* Header */}
        <div className="uppercase text-orange-600 font-bold text-sm mb-4">Company Documents</div>
        {/* View All Button */}
        <div className="mb-4">
          <button className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 text-xs font-semibold transition-all rounded-full">
            <FileText className="w-4 h-4 mr-2 text-white" />
            View All
          </button>
        </div>
        {/* Document List */}
        <div className="bg-white border rounded p-2">
          {documents.map((doc, idx) => (
            <div key={doc} className="flex items-center border-b last:border-b-0 px-4 py-2">
              <span className="material-icons text-orange-400 mr-2">insert_drive_file</span>
              <span className="text-sm text-gray-800">{doc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
