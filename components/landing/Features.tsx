"use client";

import { motion } from "framer-motion";
import {
  IconLock,
  IconBolt,
  IconWorld,
  IconEyeOff,
  IconHeadset,
  IconDeviceDesktop,
  IconServer,
  IconShieldCheck,
} from "@tabler/icons-react";

const features = [
  {
    icon: IconLock,
    title: "256-битное шифрование",
    description:
      "Военное шифрование AES-256 защищает ваши данные от хакеров и перехвата. Тот же стандарт, что используют банки и армия.",
    stat: "AES-256",
  },
  {
    icon: IconBolt,
    title: "Скорость до 10 Гбит/с",
    description:
      "Наши серверы выдерживают огромные нагрузки. Стримьте 4K, играйте онлайн без лагов и пинга.",
    stat: "10 Гбит/с",
  },
  {
    icon: IconServer,
    title: "50+ серверов",
    description:
      "Серверы в 30+ странах мира. Обходите блокировки и получайте доступ к любому контенту.",
    stat: "30+ стран",
  },
  {
    icon: IconEyeOff,
    title: "Политика без логов",
    description:
      "Мы не храним, не собираем и не передаём данные о вашей активности. Абсолютная приватность.",
    stat: "0 логов",
  },
  {
    icon: IconDeviceDesktop,
    title: "10 устройств одновременно",
    description:
      "Один аккаунт — все ваши устройства защищены. Телефон, ноутбук, планшет, Smart TV.",
    stat: "10 устройств",
  },
  {
    icon: IconHeadset,
    description:
      "Наша команда на связи 24/7. Быстрые ответы и решение проблем за минуты, а не часы.",
    title: "Поддержка 24/7",
    stat: "24/7",
  },
  {
    icon: IconShieldCheck,
    title: "99.9% Uptime",
    description:
      "Мы гарантируем стабильную работу сервиса. Аварийное переключение на резервные серверы.",
    stat: "99.9%",
  },
  {
    icon: IconWorld,
    title: "Обход блокировок",
    description:
      "Получите доступ к YouTube, Telegram, Instagram, TikTok и другим заблокированным сервисам.",
    stat: "∞ доступ",
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
            Передовые технологии безопасности, максимальная скорость и абсолютная приватность для ваших устройств.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="glass interactive h-full p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex rounded-xl bg-accent-purple/10 p-3">
                    <feature.icon className="h-8 w-8 text-accent-purple" />
                  </div>
                  <span className="text-sm font-bold gradient-text">{feature.stat}</span>
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
