"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconShieldCheck, IconLock, IconBolt, IconWorld } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: IconLock, value: "256-бит", label: "Шифрование" },
  { icon: IconBolt, value: "10 Гбит/с", label: "Скорость" },
  { icon: IconWorld, value: "50+", label: "Серверов" },
  { icon: IconShieldCheck, value: "0", label: "Логов" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 pt-20 z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-6"
        >
          <IconShieldCheck className="h-20 w-20 text-accent-cyan icon-glow animate-pulse-slow" />
        </motion.div>

        <h1 className="text-6xl font-bold md:text-8xl gradient-text">
          ASCEND.VPN
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl text-gray-300 md:text-3xl"
        >
          Безопасность. Скорость. Свобода.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-400"
        >
          Защитите свои данные с VPN нового поколения. Военное шифрование,
          молниеносная скорость и абсолютная приватность.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10"
        >
          <Link href="/register">
            <Button size="xl">Начать сейчас</Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center rounded-xl border border-border bg-card/50 p-6 transition-colors hover:border-accent-purple/50"
          >
            <stat.icon className="mb-3 h-8 w-8 text-accent-cyan" />
            <span className="text-2xl font-bold text-white">{stat.value}</span>
            <span className="mt-1 text-sm text-gray-400">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
