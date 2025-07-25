import { CopyRequisitionPage } from "@/components/copy-requisition-page";

export default function CopyRequisitionPageRoute({
  params,
}: {
  params: { id: string };
}) {
  return <CopyRequisitionPage requisitionId={params.id} />;
}
