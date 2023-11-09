import TableClient from "@/components/TableClient";
import { parseDirectory } from "@/utils/parseDirectory";

export default async function Home() {
  const tables = await parseDirectory('./vault');

  return (
    <main className="flex justify-center dark:text-slate-100 dark:bg-slate-900 h-screen">
      <TableClient tables={tables} />
    </main>
  )
}
