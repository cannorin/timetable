import { getTable } from "@/lib/table";
import { getUserId } from "@/lib/user";
import { notFound } from "next/navigation";

interface Params {
  params: { id: string };
}

export default async function Page({ params }: Params) {
  const table = await getTable(params.id);

  if (!table) return notFound();

  const userId = await getUserId();

  const isEditable = userId && userId === table.userId;

  return <code>{JSON.stringify(table)}</code>;
}
