'use client';

import { useEffect, useState } from 'react';
import { getAdrOverview } from '../lib/api/adr-overview';
import type { AdrOverviewResponse } from '../lib/types/adr-overview';

interface AdrOverviewProps {
  jobBidId: number;
}

export default function AdrOverview({ jobBidId }: AdrOverviewProps) {
  const [data, setData] = useState<AdrOverviewResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getAdrOverview(jobBidId);
        setData(response);
        setError(null);
      } catch (err) {
        setError('Failed to load ADR overview data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [jobBidId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data || typeof data.data === 'string') {
    return <div>No data available</div>;
  }

  const { mainData } = data.data;

  return (
    <div className="space-y-6">
      {/* Job Bid Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Job Bid Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">ID</p>
            <p className="font-medium">{mainData.jobBid.id}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="font-medium">{mainData.jobBid.bidStatus}</p>
          </div>
          <div>
            <p className="text-gray-600">Bid Date</p>
            <p className="font-medium">{mainData.jobBid.bidDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Score</p>
            <p className="font-medium">{mainData.jobBid.prescreenScore}</p>
          </div>
        </div>
      </div>

      {/* Location Information */}
      {mainData.location && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Location</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">{mainData.location.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Address</p>
              <p className="font-medium">
                {mainData.location.address1}
                {mainData.location.address2 && <>, {mainData.location.address2}</>}
              </p>
            </div>
            <div>
              <p className="text-gray-600">City</p>
              <p className="font-medium">{mainData.location.city}</p>
            </div>
            <div>
              <p className="text-gray-600">State</p>
              <p className="font-medium">{mainData.location.state}</p>
            </div>
          </div>
        </div>
      )}

      {/* Applicant Information */}
      {mainData.applicant && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Applicant</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name</p>
              <p className="font-medium">
                {mainData.applicant.firstName} {mainData.applicant.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{mainData.applicant.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone</p>
              <p className="font-medium">{mainData.applicant.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Source</p>
              <p className="font-medium">{mainData.applicant.source || 'N/A'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
