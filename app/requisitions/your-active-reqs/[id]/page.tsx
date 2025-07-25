import { RequisitionDetailsPage } from "@/components/requisition-details-page";

export default function RequisitionDetailsPageRoute({
  params,
}: {
  params: { id: string };
}) {
  return <RequisitionDetailsPage requisitionId={params.id} />;
}
