import { LogsTable } from "@/components/admin/LogsTable";

export default function AdminLogsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Логи аудита</h2>
        <p className="text-gray-400">История действий администраторов</p>
      </div>
      <LogsTable />
    </div>
  );
}
