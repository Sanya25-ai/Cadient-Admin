import React from 'react';
import type { AdrOverviewResponse, Availability as AvailabilityType } from '../../lib/types/adr-overview';

interface ApplicationTabProps {
  currentStep: number;
  overviewData: AdrOverviewResponse | null;
  isLoading: boolean;
  error: string | null;
}

const HIRING_STEPS = [
  "Application",
  "Screening",
  "Interview",
  "Offer",
  "Onboarding"
];
// dummy
const DEFAULT_AVAILABILITY: AvailabilityType[] = [
  { day: "Tuesday", time: "11:00 AM - 11:00 PM" },
  { day: "Friday", time: "Any Time" }
];

export default function ApplicationTab({ 
  currentStep,
  overviewData,
  isLoading,
  error 
}: ApplicationTabProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Extract data with optional chaining
  const jobBidDate = overviewData?.data?.JobBid?.bidDate;
  const postingTitle = overviewData?.data?.Posting?.details?.title;
  const location = overviewData?.data?.Location;
  const cityState = location?.address ? `${location.address.city || ''}, ${location.address.state || ''}`.trim() || 'N/A' : 'N/A';
  const source = overviewData?.data?.PersonContact?.source || 'Web Site';
  const availability = overviewData?.data?.Availability;
  const smartMatchScore = overviewData?.data?.SmartMatchScore;

  return (
    <>
      {/* Row 1: Application Documents Buttons */}
      <div className="flex flex-wrap gap-3 my-4 w-full">
        <button className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all border-2 border-orange-100">Overview</button>
        <button className="bg-transparent text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all border-2 border-orange-400">Resume</button>
        <button className="bg-transparent text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all border-2 border-orange-400">Cover Letter</button>
        <button className="bg-transparent text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all border-2 border-orange-400">Pre-screener</button>
        <button className="bg-transparent text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all border-2 border-orange-400">Assessment</button>
        <button className="bg-transparent text-orange-700 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all border-2 border-orange-400">Additional Document</button>
      </div>

      {/* Row 2: 50-50 split for Overview/Availability and Hiring Process/Recommendation */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Overview & Availability */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div>Date Applied: <span className="font-medium">{jobBidDate || 'N/A'}</span></div>
              <div>Position Applied For: <span className="font-medium">{postingTitle || 'N/A'}</span></div>
              <div>Current Location: <span className="font-medium">{cityState}</span></div>
              <div>How Did You Hear About This Job?: <span className="font-medium">{source}</span></div>
              <div>Application Method: <span className="font-medium">Career Insite</span></div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Availability</h3>
            <div className="text-sm text-gray-700 mb-2">
              Start Date: <span className="font-medium">
                {availability?.availabilityDetails?.startDate || 'N/A'}
              </span>
            </div>
            <div className="text-sm text-gray-700 mb-2">
              Work Preference: <span className="font-medium">
                {availability?.availabilityDetails?.preferredShifts?.join(', ') || 'N/A'}
              </span>
            </div>
            <table className="w-full text-sm border rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left">Day</th>
                  <th className="p-2 text-left">Working Time</th>
                </tr>
              </thead>
              <tbody>
                {(availability?.availabilityDetails?.preferredShifts?.length ? 
                  availability.availabilityDetails.preferredShifts.map(shift => ({
                    day: 'Flexible',
                    time: shift
                  })) : 
                  DEFAULT_AVAILABILITY
                ).map(({ day, time }) => (
                  <tr key={`${day}-${time}`}>
                    <td className="p-2">{day}</td>
                    <td className="p-2">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vertical Divider (horizontal on mobile) */}
        <div className="hidden md:block w-px bg-gray-200 mx-2"></div>
        <div className="block md:hidden h-px bg-gray-200 my-4"></div>

        {/* Hiring Process & Recommendation */}
        <div className="w-full md:w-1/2 flex flex-col justify-between min-h-[350px]">
          {/* Hiring Process Timeline */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Hiring Process</h3>
            <div className="flex items-center justify-center w-full gap-x-0">
              {HIRING_STEPS.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center" style={step === 'Onboarding' ? { position: 'relative', left: '-20px' } : undefined}>
                      <div className="flex items-center">
                        {isCompleted ? (
                          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                            ✓
                          </div>
                        ) : isCurrent ? (
                          <div className="w-8 h-8 rounded-full border-2 border-orange-500 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full border-2 border-gray-300" />
                        )}
                        {idx < HIRING_STEPS.length - 1 && (
                          <div className="h-1 w-10 bg-gray-300 -ml-px" style={{ width: '3.5rem'}} />
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2 text-center ${
                          isCurrent
                            ? "text-orange-600 font-bold"
                            : "text-gray-500"
                        }`}
                        style={{
                          position: 'relative',
                          ...(step !== 'Onboarding' && { left: '-25px' })
                        }}
                      >
                        {step}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* SmartTenure Recommendation */}
          <div>
            <h3 className="text-lg font-semibold">CADIENT SMARTTENURE RECOMMENDATION</h3>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-2 mb-8 rounded w-full">
              <div className="text-sm text-gray-700">
                <span className="font-semibold text-orange-700">
                  {smartMatchScore?.overallScore ? 
                    `Score: ${smartMatchScore.overallScore}% - ` : ''}
                  More Likely to Have <span className="text-orange-600">Long Tenure</span>
                </span>
                <div className="mt-1 text-xs text-gray-600">
                  Based on the SmartTenure results, this person is more likely to stay on the job long-term.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
