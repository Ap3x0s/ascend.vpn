"use client";

import { motion } from "framer-motion";
import { IconCheck } from "@tabler/icons-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const plans = [
  {
    name: "90 дней",
    price: "799₽",
    daily: "~8.9₽/день",
    features: ["5 устройств", "Все серверы", "24/7 поддержка"],
    popular: false,
  },
  {
    name: "180 дней",
    price: "1 499₽",
    daily: "~8.3₽/день",
    features: ["7 устройств", "Все серверы", "24/7 поддержка", "Приоритет"],
    popular: true,
  },
  {
    name: "365 дней",
    price: "2 499₽",
    daily: "~6.8₽/день",
    features: [
      "10 устройств",
      "Все серверы",
      "24/7 поддержка",
      "Приоритет",
      "Exclusive серверы",
    ],
    popular: false,
  },
];

export function PricingPreview() {
  return (
    <section id="pricing" className="py-20 px-4 bg-card/30 scroll-mt-20">
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
          <p className="text-gray-400 max-w-2xl mx-auto">
            Чем дольше подписка, тем больше экономия
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-accent-purple text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Популярный
                  </span>
                </div>
              )}
              <Card
                className={`h-full border-border/50 bg-card/50 ${
                  plan.popular ? "glow-border" : ""
                }`}
              >
                <CardHeader className="text-center">
                  <h3 className="text-xl font-semibold text-gray-400">
                    {plan.name}
                  </h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">
                      {plan.price}
                    </span>
                    <p className="text-sm text-gray-400 mt-2">{plan.daily}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm"
                      >
                        <IconCheck className="h-4 w-4 text-accent-cyan flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    className="w-full"
                    asChild
                  >
                    <Link href="/register">Выбрать</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/pricing"
            className="text-accent-cyan hover:underline text-lg"
          >
            Смотреть все тарифы →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
