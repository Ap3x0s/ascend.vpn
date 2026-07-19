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
    title: "Надёжное шифрование",
    description:
      "Все данные защищены шифрованием. Ваш трафик в безопасности от перехвата и утечек.",
    stat: "AES-256",
  },
  {
    icon: IconBolt,
    title: "Высокая скорость",
    description:
      "Серверы с пропускной способностью до 10 Гбит/с. Стримьте 4K и играйте без задержек.",
    stat: "10 Гбит/с",
  },
  {
    icon: IconServer,
    title: "Серверы по всему миру",
    description:
      "Более 50 серверов в 30+ странах. Обходите блокировки и получайте доступ к любому контенту.",
    stat: "50+ серверов",
  },
  {
    icon: IconEyeOff,
    title: "Без хранения данных",
    description:
      "Мы не собираем и не храним информацию о вашей активности. Полная приватность.",
    stat: "No logs",
  },
  {
    icon: IconDeviceDesktop,
    title: "Все ваши устройства",
    description:
      "Один аккаунт — телефон, ноутбук, планшет и Smart TV. До 10 устройств одновременно.",
    stat: "10 устройств",
  },
  {
    icon: IconHeadset,
    title: "Поддержка 24/7",
    description:
      "Наша команда всегда на связи. Поможем с настройкой и ответим на любые вопросы.",
    stat: "24/7",
  },
  {
    icon: IconShieldCheck,
    title: "Стабильная работа",
    description:
      "Гарантируем 99.9% времени работы. Резервные серверы и автоматическое переключение.",
    stat: "99.9%",
  },
  {
    icon: IconWorld,
    title: "Доступ ко всему",
    description:
      "YouTube, Telegram, Instagram, TikTok, ChatGPT — всё работает через наш VPN.",
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
            Безопасность, скорость и простота — всё для вашего комфортного использования.
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
