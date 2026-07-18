import Link from "next/link";
import { IconShield } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <IconShield className="mx-auto mb-4 h-16 w-16 text-accent-purple" />
        <h1 className="mb-2 text-4xl font-bold">404</h1>
        <p className="mb-6 text-gray-400">Страница не найдена</p>
        <Link href="/">
          <Button>На главную</Button>
        </Link>
      </div>
    </div>
  );
}
