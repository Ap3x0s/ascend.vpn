"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IconShieldCheck, IconLock, IconBolt, IconWorld } from "@tabler/icons-react";

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
          <IconShieldCheck className="h-20 w-20 text-accent-purple icon-glow animate-pulse-slow" />
        </motion.div>

        <h1 className="text-6xl font-bold md:text-8xl gradient-text">
          ASCEND.VPN
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl md:text-3xl text-white/90"
        >
          Безопасность. Скорость. Свобода.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted"
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
          <Link
            href="/register"
            className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-accent-purple to-accent-violet px-10 text-lg font-semibold text-white shadow-glow transition-all hover:scale-105"
          >
            Начать сейчас
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
            className="glass flex flex-col items-center p-6 transition-all hover:border-accent-purple/30 hover:shadow-glow-sm"
          >
            <stat.icon className="mb-3 h-8 w-8 text-accent-purple" />
            <span className="text-2xl font-bold text-white">{stat.value}</span>
            <span className="mt-1 text-sm text-muted">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
