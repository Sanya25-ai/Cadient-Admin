import React from "react";
import { Circle } from "lucide-react";

const notes = [
  {
    id: 1,
    date: "Thursday, March 27, 2025 - 12:08 AM",
    author: "Melissa Demo Moser",
    content: (
      <>
        <span className="font-semibold">Contact Made</span> - <span className="text-xs text-orange-600">(edited by Melissa Demo Moser on Thursday, March 27, 2025)</span><br />
        Phone interview went really well. Heather could start work right away and has a lot of relevant experience. We should fast track the offer on her before she applies elsewhere.
      </>
    ),
    icon: <Circle className="w-3 h-3 text-orange-400 mr-1 inline" fill="#FFA726" />,
  },
  {
    id: 2,
    date: "Thursday, March 27, 2025 - 12:08 AM",
    author: "Melissa Demo Moser",
    content: (
      <>
        <span className="font-semibold">Feedback</span>: Seems like a great fit for the posting.
      </>
    ),
    icon: <Circle className="w-3 h-3 text-orange-400 mr-1 inline" fill="#FFA726" />,
  },
];

export default function NotesTab() {
  return (
    <div className="w-full md:col-span-2 mt-4">
      <div className="bg-white p-6">
        {/* Notes Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="uppercase text-orange-600 font-bold text-sm">Notes</span>
          </div>
          <button className="flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold border border-orange-200 hover:bg-orange-50">
            Add Notes
          </button>
        </div>
        {/* Notes List */}
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="border rounded bg-white p-4 flex flex-col gap-2 shadow-sm">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                {note.icon}
                <span>{note.date}</span>
                <span className="mx-1">by</span>
                <span className="font-semibold text-gray-700">{note.author}</span>
              </div>
              <div className="text-sm text-gray-700">
                {note.content}
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <button className="text-orange-600 hover:text-orange-800 text-xs font-semibold px-2 py-1 rounded hover:bg-orange-50">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 rounded hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
