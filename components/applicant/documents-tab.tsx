'use client'

import React from "react";

const DocumentsTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Documents</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <div className="text-sm font-medium">Resume</div>
              <div className="text-xs text-gray-500">Uploaded on March 15, 2024</div>
            </div>
            <button className="text-orange-600 text-sm font-medium hover:underline">View</button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <div className="text-sm font-medium">Cover Letter</div>
              <div className="text-xs text-gray-500">Uploaded on March 15, 2024</div>
            </div>
            <button className="text-orange-600 text-sm font-medium hover:underline">View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsTab;
