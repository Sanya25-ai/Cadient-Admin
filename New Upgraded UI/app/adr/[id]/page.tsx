import AdrOverview from '../../../components/adr-overview';

interface PageProps {
  params: {
    id: string;
  };
}

export default function AdrOverviewPage({ params }: PageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">ADR Overview</h1>
      <AdrOverview jobBidId={536344} />
    </div>
  );
}
