import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const statusHistory = [
  {
    date: "Mar 19, 2025 (11:55 PM)",
    status: "Offered",
    modifiedBy: "Administrator TestAdminLN - TEST_ADMIN",
    description: "Position: Cook (San Diego)",
  },
  {
    date: "Feb 20, 2025 (9:23 PM)",
    status: "Qualified Not Interviewed",
    modifiedBy: "Kyle Boyd - KBIDWELL102202025",
    description: "Position: Cook (San Diego)",
  },
];

const hiringProcessHistory = [
  {
    date: "Mar 19, 2025 (11:55 PM)",
    status: "Offer Extended",
    modifiedBy: "Administrator TestAdminLN - TEST_ADMIN",
    description: "Conditional Offer - Offer Extended",
  },
  {
    date: "Mar 19, 2025 (11:55 PM)",
    status: "Interview Result",
    modifiedBy: "Administrator TestAdminLN - TEST_ADMIN",
    description: "Interview - Favorable Interview Results",
  },
  {
    date: "Mar 19, 2025 (11:55 PM)",
    status: "Interview Scheduled",
    modifiedBy: "Administrator TestAdminLN - TEST_ADMIN",
    description: "Interview - Schedule Interview",
  },
  {
    date: "Mar 19, 2025 (11:53 PM)",
    status: "Interest",
    modifiedBy: "Administrator TestAdminLN - TEST_ADMIN",
    description: "Review Application - Interest",
  },
];

export default function HistoryTab() {
  return (
    <div className="w-full md:col-span-2 mt-2">
      <div className="bg-white p-6">
        <div className="mb-4">
          <span className="uppercase text-orange-600 font-bold text-sm">History</span>
          <div className="text-xs text-gray-500 mt-1">View the historical details of this application below.</div>
        </div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols-4 gap-2 bg-orange-50 rounded-t px-3 py-2 text-xs font-bold text-gray-600 mb-1">
            <div>Date</div>
            <div>Status</div>
            <div>Modified By</div>
            <div>Description</div>
          </div>

          <Accordion type="single" collapsible defaultValue="status">
            <AccordionItem value="status">
              <AccordionTrigger className="bg-orange-50 hover:bg-orange-100 px-3 py-2 font-semibold text-orange-700 border border-orange-200 rounded-t-none">
                Status History
              </AccordionTrigger>
              <AccordionContent className="bg-white border-x border-b border-orange-200 rounded-b">
                {statusHistory.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 px-3 py-2 border-b last:border-b-0 text-xs">
                    <div>{row.date}</div>
                    <div>{row.status}</div>
                    <div>{row.modifiedBy}</div>
                    <div>{row.description}</div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible defaultValue="hiring">
            <AccordionItem value="hiring">
              <AccordionTrigger className="bg-orange-50 hover:bg-orange-100 px-3 py-2 font-semibold text-orange-700 border border-orange-200 rounded-t-none">
                Hiring Process History
              </AccordionTrigger>
              <AccordionContent className="bg-white border-x border-b border-orange-200 rounded-b">
                {hiringProcessHistory.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 px-3 py-2 border-b last:border-b-0 text-xs">
                    <div>{row.date}</div>
                    <div>{row.status}</div>
                    <div>{row.modifiedBy}</div>
                    <div>{row.description}</div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
