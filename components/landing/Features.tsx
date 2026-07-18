"use client";

import { motion } from "framer-motion";
import { IconLock, IconBolt, IconWorld, IconEyeOff, IconHeadset, IconDiscount } from "@tabler/icons-react";

const features = [
  {
    icon: IconLock,
    title: "256-битное шифрование",
    description:
      "Военное шифрование AES-256 защищает ваши данные от хакеров, перехвата и слежки.",
  },
  {
    icon: IconBolt,
    title: "Молниеносная скорость",
    description:
      "Серверы с пропускной способностью 10 Гбит/с. Стримьте 4K без задержек.",
  },
  {
    icon: IconWorld,
    title: "50+ серверов",
    description:
      "Серверы в 30+ странах. Обходите блокировки и получайте доступ к любому контенту.",
  },
  {
    icon: IconEyeOff,
    title: "Политика без логов",
    description:
      "Мы не храним данные о вашей активности. Абсолютная приватность гарантирована.",
  },
  {
    icon: IconHeadset,
    title: "Поддержка 24/7",
    description:
      "Наша команда готова помочь в любое время суток. Быстрые ответы за минуты.",
  },
  {
    icon: IconDiscount,
    title: "Выгодные тарифы",
    description:
      "От 299₽ в месяц. Чем дольше подписка — тем больше экономия.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Почему <span className="gradient-text">ASCEND.VPN</span>?
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Передовые технологии безопасности и максимальная скорость.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="glass interactive h-full p-6">
                <div className="mb-4 inline-flex rounded-xl bg-accent-purple/10 p-3">
                  <feature.icon className="h-8 w-8 text-accent-purple" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
