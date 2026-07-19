// Plan names mapping
export const PLAN_NAMES: Record<string, string> = {
  "30d": "30 дней",
  "90d": "90 дней",
  "180d": "180 дней",
  "365d": "365 дней",
};

// Plan prices
export const PLAN_PRICES: Record<string, number> = {
  "30d": 299,
  "90d": 799,
  "180d": 1499,
  "365d": 2499,
};

// Max devices per plan
export const PLAN_DEVICES: Record<string, number> = {
  "30d": 3,
  "90d": 5,
  "180d": 7,
  "365d": 10,
};

// Locations available per plan
export const PLAN_LOCATIONS: Record<string, string[]> = {
  "30d": ["lv-riga", "fi-helsinki"],
  "90d": ["lv-riga", "fi-helsinki", "de-frankfurt"],
  "180d": ["lv-riga", "fi-helsinki", "de-frankfurt", "us-newyork"],
  "365d": ["lv-riga", "fi-helsinki", "de-frankfurt", "us-newyork"],
};

// Get plan display name
export function getPlanName(plan: string): string {
  return PLAN_NAMES[plan] || plan;
}

// Format traffic
export function formatTraffic(gb: number): string {
  if (gb >= 1000) return `${(gb / 1000).toFixed(1)} ТБ`;
  return `${gb.toFixed(1)} ГБ`;
}

// Format ping with color class
export function getPingColor(ping: number): string {
  if (ping < 20) return "text-green-400";
  if (ping < 50) return "text-yellow-400";
  return "text-red-400";
}
