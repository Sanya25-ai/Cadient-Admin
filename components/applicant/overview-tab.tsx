'use client'

import { useEffect, useState } from 'react';
import { getAdrOverview } from '../../lib/api/adr-overview';
import type { AdrOverviewResponse } from '../../lib/types/adr-overview';

interface OverviewTabProps {
  jobBidId: number;
}

const OverviewTab = ({ jobBidId }: OverviewTabProps) => {
  const [data, setData] = useState<AdrOverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching ADR overview data for jobBidId:', 536344);
        const response = await getAdrOverview(536344);
        console.log('ADR Overview Response:', {
          status: response.status,
          message: response.message,
          data: response.data
        });
        
        if (response.data && typeof response.data !== 'string') {
          console.log('Job Bid Info:', response.data.mainData.jobBid);
          console.log('Location Info:', response.data.mainData.location);
          console.log('Posting Info:', response.data.mainData.posting);
          console.log('Applicant Info:', response.data.mainData.applicant);
        }
        
        setData(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching ADR overview:', err);
        setError('Failed to load overview data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [jobBidId]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded shadow border p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i}>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Instead of showing error, show empty state with a message
  if (error || !data || !data.data || typeof data.data === 'string') {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded shadow border p-6">
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">Application Overview</div>
            <div className="text-sm text-gray-400">
              {error || 'No application details available'}
            </div>
          </div>
        </div>
        <div className="bg-white rounded shadow border p-6">
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">Location</div>
            <div className="text-sm text-gray-400">No location details available</div>
          </div>
        </div>
        <div className="bg-white rounded shadow border p-6">
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">Job Details</div>
            <div className="text-sm text-gray-400">No job details available</div>
          </div>
        </div>
      </div>
    );
  }

  const { mainData } = data.data;
  
  // Add additional check for mainData
  if (!mainData || !mainData.jobBid) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded shadow border p-6">
          <div className="text-center py-8">
            <div className="text-gray-500 mb-2">Data Error</div>
            <div className="text-sm text-gray-400">Unable to load application data</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Job Bid Information */}
      <div className="bg-white rounded shadow border p-6">
        <h3 className="text-lg font-semibold mb-4">Application Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Application ID</div>
            <div className="text-sm font-medium">{mainData.jobBid.uniqueApplicationId}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Status</div>
            <div className="text-sm font-medium">{mainData.jobBid.bidStatus}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Bid Date</div>
            <div className="text-sm font-medium">{mainData.jobBid.bidDate}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Score</div>
            <div className="text-sm font-medium">{mainData.jobBid.prescreenScore}</div>
          </div>
        </div>
      </div>

      {/* Location Information */}
      {mainData.location && (
        <div className="bg-white rounded shadow border p-6">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Name</div>
              <div className="text-sm font-medium">{mainData.location.name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Address</div>
              <div className="text-sm font-medium">
                {mainData.location.address1}
                {mainData.location.address2 && <>, {mainData.location.address2}</>}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">City</div>
              <div className="text-sm font-medium">{mainData.location.city}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">State</div>
              <div className="text-sm font-medium">{mainData.location.state}</div>
            </div>
          </div>
        </div>
      )}

      {/* Job Posting Information */}
      {mainData.posting && (
        <div className="bg-white rounded shadow border p-6">
          <h3 className="text-lg font-semibold mb-4">Job Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Title</div>
              <div className="text-sm font-medium">{mainData.posting.title}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Internal Title</div>
              <div className="text-sm font-medium">{mainData.posting.internalJobTitle}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Job Code</div>
              <div className="text-sm font-medium">{mainData.posting.jobCode}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <div className="text-sm font-medium">{mainData.posting.isActive ? 'Active' : 'Inactive'}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewTab;
