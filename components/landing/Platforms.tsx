"use client";

import { motion } from "framer-motion";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconBrandWindows,
  IconBrandApple,
  IconBrandAndroid,
  IconTerminal,
} from "@tabler/icons-react";

const platforms = [
  { icon: IconBrandWindows, name: "Windows" },
  { icon: IconBrandApple, name: "macOS" },
  { icon: IconTerminal, name: "Linux" },
  { icon: IconDeviceMobile, name: "iOS" },
  { icon: IconBrandAndroid, name: "Android" },
  { icon: IconDeviceTablet, name: "Планшеты" },
  { icon: IconDeviceDesktop, name: "Smart TV" },
];

export function Platforms() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">
            Для <span className="gradient-text">любого устройства</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Один аккаунт — все ваши устройства защищены
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass flex flex-col items-center gap-3 p-6 w-28 transition-all hover:border-accent-purple/30 hover:shadow-glow-sm"
            >
              <platform.icon className="h-10 w-10 text-accent-purple" />
              <span className="text-sm text-muted">{platform.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
