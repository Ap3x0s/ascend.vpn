"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconCreditCard,
  IconWallet,
  IconCoin,
  IconCheck,
  IconShield,
  IconArrowLeft,
  IconLock,
} from "@tabler/icons-react";
import { getPlanName, PLAN_PRICES } from "@/lib/constants";

const plans = [
  { id: "30d", name: "30 дней", price: 299, popular: false },
  { id: "90d", name: "90 дней", price: 799, popular: false },
  { id: "180d", name: "180 дней", price: 1499, popular: true },
  { id: "365d", name: "365 дней", price: 2499, popular: false },
];

const paymentMethods = [
  {
    id: "card",
    name: "Российские карты",
    icon: IconCreditCard,
    description: "Visa, Мир, СБП",
    color: "text-accent-purple",
    bgColor: "bg-accent-purple/10",
  },
  {
    id: "sbp",
    name: "СБП",
    icon: IconWallet,
    description: "Мгновенный перевод",
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
  },
  {
    id: "crypto",
    name: "Криптовалюта",
    icon: IconCoin,
    description: "USDT, BTC, ETH",
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
];

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState("180d");
  const [selectedMethod, setSelectedMethod] = useState("card");

  const plan = plans.find((p) => p.id === selectedPlan);
  const method = paymentMethods.find((m) => m.id === selectedMethod);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2 text-muted hover:text-white transition-colors">
            <IconArrowLeft className="w-4 h-4" />
            <span className="text-sm">Назад</span>
          </Link>
          <h1 className="font-semibold">Оформление заказа</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left - Selection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Plan selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Выберите план</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {plans.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      selectedPlan === p.id
                        ? "border-accent-purple bg-accent-purple/5"
                        : "border-border hover:border-accent-purple/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === p.id ? "border-accent-purple" : "border-gray-500"}`}>
                        {selectedPlan === p.id && <div className="h-2.5 w-2.5 rounded-full bg-accent-purple" />}
                      </div>
                      <span className="font-medium text-white">{p.name}</span>
                      {p.popular && (
                        <span className="px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple text-xs">
                          Выгодно
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-white">{p.price}₽</span>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Payment method */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Способ оплаты</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((m) => {
                  const MethodIcon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMethod(m.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        selectedMethod === m.id
                          ? "border-accent-purple bg-accent-purple/5"
                          : "border-border hover:border-accent-purple/30"
                      }`}
                    >
                      <div className={`h-10 w-10 rounded-lg ${m.bgColor} flex items-center justify-center`}>
                        <MethodIcon className={`w-5 h-5 ${m.color}`} />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-medium text-white">{m.name}</p>
                        <p className="text-sm text-muted">{m.description}</p>
                      </div>
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === m.id ? "border-accent-purple" : "border-gray-500"}`}>
                        {selectedMethod === m.id && <div className="h-2.5 w-2.5 rounded-full bg-accent-purple" />}
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Right - Summary */}
          <div className="space-y-4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-base">Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Plan */}
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted">Подписка</span>
                  <span className="font-medium text-white">{plan?.name}</span>
                </div>

                {/* Method */}
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted">Оплата</span>
                  <span className="text-white">{method?.name}</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-3">
                  <span className="font-semibold text-white">Итого</span>
                  <span className="text-2xl font-bold gradient-text">{plan?.price}₽</span>
                </div>

                {/* Pay button */}
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-accent-purple to-accent-violet text-white font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  <IconLock className="w-4 h-4" />
                  Оплатить {plan?.price}₽
                </button>

                {/* Security */}
                <div className="flex items-center gap-2 justify-center text-xs text-muted">
                  <IconShield className="w-3.5 h-3.5 text-accent-purple" />
                  Безопасная оплата
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
