"use client";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">Ошибка</h1>
        <p className="mb-6 text-gray-400">Что-то пошло не так</p>
        <Button onClick={reset}>Попробовать снова</Button>
      </div>
    </div>
  );
}
