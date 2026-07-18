"use client";

import { motion } from "framer-motion";
import {
  IconBrandYoutube,
  IconBrandTelegram,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandTiktok,
  IconBrandDiscord,
  IconBrandTwitch,
  IconBrandSpotify,
  IconBrandNetflix,
} from "@tabler/icons-react";

const services = [
  { icon: IconBrandYoutube, name: "YouTube", color: "#FF0000" },
  { icon: IconBrandTelegram, name: "Telegram", color: "#26A5E4" },
  { icon: IconBrandInstagram, name: "Instagram", color: "#E4405F" },
  { icon: IconBrandTwitter, name: "X (Twitter)", color: "#FFFFFF" },
  { icon: IconBrandTiktok, name: "TikTok", color: "#FFFFFF" },
  { icon: IconBrandDiscord, name: "Discord", color: "#5865F2" },
  { icon: IconBrandTwitch, name: "Twitch", color: "#9146FF" },
  { icon: IconBrandSpotify, name: "Spotify", color: "#1DB954" },
  { icon: IconBrandNetflix, name: "Netflix", color: "#E50914" },
];

// Duplicate for seamless loop
const doubledServices = [...services, ...services];

export function BlockedServices() {
  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-3">
            Доступ к <span className="gradient-text">заблокированным сервисам</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto text-sm">
            Получите доступ к YouTube, Telegram, Instagram и другим сервисам
          </p>
        </motion.div>
      </div>

      {/* Scrolling marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#08080f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#08080f] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {doubledServices.map((service, i) => (
            <div
              key={`${service.name}-${i}`}
              className="glass flex items-center gap-3 px-5 py-3 mx-2 shrink-0 transition-all hover:border-accent-purple/30"
            >
              <service.icon
                className="h-5 w-5"
                style={{ color: service.color }}
              />
              <span className="text-sm font-medium text-white whitespace-nowrap">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center text-dim text-xs mt-6 max-w-7xl mx-auto"
      >
        И многие другие сервисы доступны через ASCEND.VPN
      </motion.p>
    </section>
  );
}
