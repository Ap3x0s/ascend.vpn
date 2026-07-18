"use client";

import { motion } from "framer-motion";
import { Lock, Zap, Globe, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Lock,
    title: "256-битное шифрование",
    description:
      "Военное шифрование AES-256 защищает ваши данные от любых угроз. Даже профессиональные хакеры не смогут взломать ваше соединение.",
  },
  {
    icon: Zap,
    title: "Молниеносная скорость",
    description:
      "Наши серверы оптимизированы для максимальной скорости. Стримьте 4K-видео, играйте в онлайн-игры без задержек.",
  },
  {
    icon: Globe,
    title: "50+ серверов",
    description:
      "Серверы в 30+ странах мира. Обходите гео-ограничения и получайте доступ к любому контенту из любой точки мира.",
  },
  {
    icon: EyeOff,
    title: "Без логов",
    description:
      "Мы не храним ваши данные и активность. Абсолютная приватность — наш главный приоритет и обещание каждому пользователю.",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Почему <span className="gradient-text">ASCEND.VPN</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы предоставляем лучший VPN-сервис с передовыми технологиями
            безопасности и максимальной производительностью.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-card/50 hover:border-accent-cyan/50 transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-accent-cyan mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
