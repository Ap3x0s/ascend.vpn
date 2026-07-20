"use client";

import { useState } from "react";
import { IconUserPlus } from "@tabler/icons-react";
import { UsersTable } from "@/components/admin/UsersTable";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Пользователи</h2>
          <p className="text-gray-400">Управление пользователями системы</p>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-accent-purple px-4 py-2 text-sm font-medium text-white hover:bg-accent-purple/80 transition-colors"
          onClick={() => {
            /* TODO: open add user dialog */
          }}
        >
          <IconUserPlus className="h-4 w-4" />
          Добавить пользователя
        </button>
      </div>

      <UsersTable />
    </div>
  );
}
