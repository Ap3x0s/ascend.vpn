"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "30 дней",
    price: "299₽",
    perDay: "~10₽/день",
    devices: "3 устройства",
    features: ["Все серверы", "24/7 поддержка"],
    popular: false,
  },
  {
    name: "90 дней",
    price: "799₽",
    perDay: "~8.9₽/день",
    devices: "5 устройств",
    features: ["Все серверы", "24/7 поддержка"],
    popular: false,
  },
  {
    name: "180 дней",
    price: "1 499₽",
    perDay: "~8.3₽/день",
    devices: "7 устройств",
    features: ["Все серверы", "24/7 поддержка", "Приоритет"],
    popular: true,
  },
  {
    name: "365 дней",
    price: "2 499₽",
    perDay: "~6.8₽/день",
    devices: "10 устройств",
    features: ["Все серверы", "24/7 поддержка", "Приоритет", "Exclusive серверы"],
    popular: false,
  },
];

const allFeatures = [
  { name: "Количество устройств", values: ["3", "5", "7", "10"] },
  { name: "Все серверы", values: [true, true, true, true] },
  { name: "24/7 поддержка", values: [true, true, true, true] },
  { name: "Приоритет", values: [false, false, true, true] },
  { name: "Exclusive серверы", values: [false, false, false, true] },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <Navbar />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="gradient-text">Выберите свой план</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Чем дольше подписка, тем больше экономия
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card
                className={`relative flex flex-col h-full ${
                  plan.popular ? "glow-border border-accent-purple" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-purple px-3 py-1 text-xs font-semibold text-white">
                    Популярный
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">{plan.price}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400">{plan.perDay}</p>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="text-center text-sm text-accent-cyan mb-4">
                    {plan.devices}
                  </p>
                  <ul className="space-y-3 mb-6 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent-teal shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Выбрать
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="gradient-text">Сравнение планов</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Функция</th>
                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`text-center py-3 px-4 font-medium ${
                        plan.popular ? "text-accent-purple" : "text-gray-400"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature) => (
                  <tr key={feature.name} className="border-b border-border/50">
                    <td className="py-3 px-4 text-gray-300">{feature.name}</td>
                    {feature.values.map((val, i) => (
                      <td key={i} className="text-center py-3 px-4">
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check className="h-4 w-4 text-accent-teal mx-auto" />
                          ) : (
                            <span className="text-gray-600">—</span>
                          )
                        ) : (
                          <span className="text-white">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
