"use client";

import { useState } from "react";
import { IconServer } from "@tabler/icons-react";
import { ServersTable } from "@/components/admin/ServersTable";
import { AddServerModal } from "@/components/admin/AddServerModal";

export default function AdminServersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Серверы</h2>
          <p className="text-gray-400">Управление VPN серверами</p>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors"
          onClick={() => setShowAddModal(true)}
        >
          <IconServer className="h-4 w-4" />
          Добавить сервер
        </button>
      </div>

      <ServersTable refreshTrigger={refreshTrigger} />

      <AddServerModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCreated={() => setRefreshTrigger((n) => n + 1)}
      />
    </div>
  );
}
