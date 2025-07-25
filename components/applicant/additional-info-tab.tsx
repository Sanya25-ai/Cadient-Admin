import React from "react";

export default function AdditionalInfoTab() {
  return (
    <div className="w-full md:col-span-2 mt-6">
      <div className="bg-white rounded p-6">
        {/* Header */}
        <div className="uppercase text-orange-600 font-bold text-sm mb-4">Additional Info</div>
        {/* Pay Details */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800 mb-2">Pay Details</div>
          <div className="flex gap-8 items-center">
            <div>
              <div className="text-xs text-gray-500">Pay Rate:</div>
              <div className="text-sm text-gray-700">None</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Base Pay:</div>
              <div className="text-sm text-gray-700">None</div>
            </div>
          </div>
        </div>
        {/* Legend */}
        <div className="mb-4 flex gap-4 items-center">
          <span className="text-xs text-gray-500">Legend:</span>
          <span className="text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span> Marginal Responses
          </span>
          <span className="text-xs flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span> Knockout Responses
          </span>
        </div>
        {/* Electronic Consent and Disclosures */}
        <div className="mb-4">
          <div className="font-semibold text-gray-800 mb-2">Electronic Consent and Disclosures</div>
          <div className="mb-2 flex items-center justify-between bg-gray-100 rounded px-4 py-2">
            <span className="text-xs font-semibold text-gray-700">ELECTRONIC CONSENT AGREEMENT</span>
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">Statement viewed</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-red-50 rounded p-3 text-xs text-gray-700 mb-2">
              We need your authorization in order to present notices, disclosures, or other documents electronically, and to use electronic signatures, in connection with this process to collect your information. You have the right to receive such disclosures and give your consent or authorization on paper instead of electronically. If you agree to engage in electronic transactions but change your mind later, you may withdraw your consent at any time by notifying the hiring manager or person in charge at this location. You can also be permitted to update your contact information. If you decide to withdraw your consent to engage in electronic transactions, you will have to sign a corresponding paper authorization or consent form as needed to continue with the process.
            </div>
            <div className="flex-1 bg-red-50 rounded p-3 text-xs text-gray-700 mb-2 flex items-center justify-between">
              <span>I agree to the terms of this Consent</span>
              <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded">Statement viewed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
