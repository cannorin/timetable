import { getTable } from "@/lib/table";
import { getUserId } from "@/lib/user";
import { redirect } from "next/navigation";

interface Params {
  params: { id: string };
}

export default async function Page({ params }: Params) {
  const table = await getTable(params.id);

  if (!table) redirect(`/table/${params.id}/`);

  const userId = await getUserId();

  if (table.userId !== userId) redirect(`/table/${params.id}/`);

  return <code>{JSON.stringify(table)}</code>;
}
