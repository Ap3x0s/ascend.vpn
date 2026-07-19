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

// Custom SVG icons for ChatGPT and Claude
function ChatGPTIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function ClaudeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M4.709 15.955l4.72-2.783.08-.046 2.803-1.644v3.315l-4.116 2.427-4.116 2.427c-.282.166-.526.054-.526-.248v-3.252l.158-.144zm9.582-8.006l4.719-2.782.081-.047 2.802-1.643v3.314l-4.115 2.427-4.116 2.427c-.282.166-.526.054-.526-.248v-3.252l.158-.144zM10.59 12.74l4.719-2.783.081-.046 2.802-1.644v3.315l-4.115 2.427-4.116 2.427c-.282.166-.526.054-.526-.248v-3.252l.158-.144z" />
    </svg>
  );
}

const services: Array<{
  name: string;
  color: string;
  type: "tabler" | "custom";
  icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  customIcon?: React.ComponentType<{ className?: string }>;
}> = [
  { icon: IconBrandYoutube, name: "YouTube", color: "#FF0000", type: "tabler" },
  { icon: IconBrandTelegram, name: "Telegram", color: "#26A5E4", type: "tabler" },
  { icon: IconBrandInstagram, name: "Instagram", color: "#E4405F", type: "tabler" },
  { icon: IconBrandTwitter, name: "X (Twitter)", color: "#FFFFFF", type: "tabler" },
  { icon: IconBrandTiktok, name: "TikTok", color: "#FFFFFF", type: "tabler" },
  { icon: IconBrandDiscord, name: "Discord", color: "#5865F2", type: "tabler" },
  { icon: IconBrandTwitch, name: "Twitch", color: "#9146FF", type: "tabler" },
  { icon: IconBrandSpotify, name: "Spotify", color: "#1DB954", type: "tabler" },
  { icon: IconBrandNetflix, name: "Netflix", color: "#E50914", type: "tabler" },
  { customIcon: ChatGPTIcon, name: "ChatGPT", color: "#10A37F", type: "custom" },
  { customIcon: ClaudeIcon, name: "Claude", color: "#D97757", type: "custom" },
];

// Triple for seamless infinite loop
const tripledServices = [...services, ...services, ...services];

export function BlockedServices() {
  return (
    <section className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
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
            Получите доступ к YouTube, Telegram, ChatGPT и другим сервисам
          </p>
        </motion.div>
      </div>

      {/* Infinite scrolling marquee - scrolls LEFT */}
      <div className="relative py-4">
        {/* Soft fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-[#08080f] via-[#08080f]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-[#08080f] via-[#08080f]/80 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee-left">
          {tripledServices.map((service, i) => (
            <div
              key={`${service.name}-${i}`}
              className="service-card flex items-center gap-3 px-5 py-3 mx-2 shrink-0 rounded-2xl border border-white/[0.06] bg-[rgba(12,12,22,0.9)] backdrop-blur-sm transition-all duration-300"
              style={{
                "--glow-color": service.color,
              } as React.CSSProperties}
            >
              {service.type === "tabler" && service.icon ? (
                <service.icon
                  className="h-5 w-5"
                  style={{ color: service.color }}
                />
              ) : service.customIcon ? (
                <service.customIcon
                  className="h-5 w-5"
                />
              ) : null}
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
        className="text-center text-dim text-xs mt-6 px-4"
      >
        И многие другие сервисы доступны через ASCEND.VPN
      </motion.p>
    </section>
  );
}
