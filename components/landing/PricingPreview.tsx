"use client";

import { motion } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";

const plans = [
  {
    name: "30 дней",
    price: "299",
    perDay: "~10₽/день",
    devices: "3 устройства",
    features: ["Все серверы", "24/7 поддержка"],
    popular: false,
  },
  {
    name: "90 дней",
    price: "799",
    perDay: "~8.9₽/день",
    devices: "5 устройств",
    features: ["Все серверы", "24/7 поддержка"],
    popular: false,
  },
  {
    name: "180 дней",
    price: "1 499",
    perDay: "~8.3₽/день",
    devices: "7 устройств",
    features: ["Все серверы", "24/7 поддержка", "Приоритет"],
    popular: true,
  },
  {
    name: "365 дней",
    price: "2 499",
    perDay: "~6.8₽/день",
    devices: "10 устройств",
    features: ["Все серверы", "24/7 поддержка", "Приоритет", "Exclusive"],
    popular: false,
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="py-20 px-4 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Выберите свой <span className="gradient-text">план</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Чем дольше подписка, тем больше экономия
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={`glass relative flex flex-col h-full p-6 ${
                  plan.popular ? "glow-border" : "interactive"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-purple to-accent-cyan px-4 py-1 text-xs font-bold text-white shadow-glow">
                    Популярный
                  </div>
                )}

                <h3 className="text-lg font-semibold mb-3 text-white">{plan.name}</h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold gradient-text">
                    {plan.price}₽
                  </span>
                  <p className="text-dim text-sm mt-1">{plan.perDay}</p>
                </div>

                <p className="text-sm text-accent-cyan font-medium mb-5">
                  {plan.devices}
                </p>

                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      <IconCheck className="h-4 w-4 text-accent-purple shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-accent-purple to-accent-cyan text-white shadow-glow hover:scale-105"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-accent-purple/30"
                  }`}
                >
                  Выбрать
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
