import { CreatePostingPage } from "@/components/create-posting-page";

export default function CreatePostingPageRoute({
  params,
}: {
  params: { id: string };
}) {
  return <CreatePostingPage requisitionId={params.id} />;
}
