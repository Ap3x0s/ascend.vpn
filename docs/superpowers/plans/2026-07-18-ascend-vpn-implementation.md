# ASCEND.VPN Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete VPN service website with landing page, pricing, registration/login, and user dashboard with dark cyberpunk theme.

**Architecture:** Next.js 14 App Router with Tailwind CSS, shadcn/ui components, Prisma ORM with SQLite, NextAuth.js for authentication. Single-page application with server-side rendering where needed.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Prisma, NextAuth.js, SQLite

## Global Constraints

- Node.js 18+ required
- Project directory: `C:\Users\Евгений\Desktop\Projects\vpnwebsitev2`
- Language: Russian only
- Theme: Dark cyberpunk (#0a0a0f background, #6c5ce7 purple accent, #00cec9 cyan accent)
- Prices in RUB: 30d=299₽, 90d=799₽, 180d=1499₽, 365d=2499₽

---

## Task 1: Project Setup & Dependencies

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.js`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `lib/utils.ts`

**Interfaces:**
- Consumes: None
- Produces: Running Next.js dev server with Tailwind configured

- [ ] **Step 1: Create project directory and initialize**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2"
cd "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2"
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "ascend-vpn",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18",
    "react-dom": "^18",
    "@prisma/client": "^5.14.0",
    "next-auth": "^4.24.7",
    "bcryptjs": "^2.4.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0",
    "lucide-react": "^0.378.0",
    "framer-motion": "^11.2.10",
    "@tsparticles/react": "^3.0.0",
    "@tsparticles/slim": "^3.0.0",
    "tsparticles": "^3.5.0"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "@types/bcryptjs": "^2.4.6",
    "prisma": "^5.14.0",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.2.5"
  }
}
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 4: Create tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        card: "#1a1a2e",
        "card-hover": "#25253e",
        accent: {
          purple: "#6c5ce7",
          cyan: "#00cec9",
        },
        border: "#2a2a3e",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 5: Create postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Create next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [],
  },
};

module.exports = nextConfig;
```

- [ ] **Step 7: Create app/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #0a0a0f;
  --card: #1a1a2e;
  --card-hover: #25253e;
  --accent-purple: #6c5ce7;
  --accent-cyan: #00cec9;
  --text-primary: #ffffff;
  --text-secondary: #a0a0b0;
  --border: #2a2a3e;
}

body {
  background-color: var(--background);
  color: var(--text-primary);
  font-family: "Inter", sans-serif;
}

/* Glow effects */
.glow-purple {
  box-shadow: 0 0 20px rgba(108, 92, 231, 0.5);
}

.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 206, 201, 0.5);
}

.glow-border {
  border: 1px solid transparent;
  background-clip: padding-box;
  position: relative;
}

.glow-border::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  z-index: -1;
  opacity: 0.5;
  transition: opacity 0.3s;
}

.glow-border:hover::before {
  opacity: 1;
}

/* Gradient text */
.gradient-text {
  background: linear-gradient(135deg, #6c5ce7, #00cec9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0f;
}

::-webkit-scrollbar-thumb {
  background: #2a2a3e;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6c5ce7;
}
```

- [ ] **Step 8: Create lib/utils.ts**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 9: Create app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "ASCEND.VPN - Безопасность. Скорость. Свобода.",
  description:
    "Защитите свои данные с VPN нового поколения. Шифрование военного класса, серверы по всему миру.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 10: Create app/page.tsx (placeholder)**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-20 gradient-text">
        ASCEND.VPN
      </h1>
      <p className="text-center text-gray-400 mt-4">
        Сайт в разработке...
      </p>
    </main>
  );
}
```

- [ ] **Step 11: Install dependencies and run dev server**

```bash
cd "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2"
npm install
```

Expected: Dependencies installed successfully

- [ ] **Step 12: Run dev server to verify**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000, page shows "ASCEND.VPN"

- [ ] **Step 13: Commit**

```bash
git init
git add .
git commit -m "feat: initial project setup with Next.js, Tailwind, and dark theme"
```

---

## Task 2: shadcn/ui Components Setup

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/label.tsx`
- Create: `components/ui/checkbox.tsx`
- Create: `components/ui/separator.tsx`

**Interfaces:**
- Consumes: `lib/utils.ts` (cn function)
- Produces: Reusable UI components

- [ ] **Step 1: Create components/ui directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\components\ui"
```

- [ ] **Step 2: Create components/ui/button.tsx**

```tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-accent-purple to-accent-cyan text-white hover:shadow-lg hover:shadow-accent-purple/50",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline:
          "border border-border bg-transparent hover:bg-card hover:text-white",
        secondary: "bg-card text-white hover:bg-card-hover",
        ghost: "hover:bg-card hover:text-white",
        link: "text-accent-purple underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-lg px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 3: Create components/ui/card.tsx**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-border bg-card text-white shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

- [ ] **Step 4: Create components/ui/input.tsx**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

- [ ] **Step 5: Create components/ui/label.tsx**

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
```

- [ ] **Step 6: Create components/ui/checkbox.tsx**

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        className={cn(
          "h-4 w-4 rounded border-border bg-card text-accent-purple focus:ring-accent-purple focus:ring-offset-0",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
```

- [ ] **Step 7: Create components/ui/separator.tsx**

```tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <div
    ref={ref}
    role={decorative ? "none" : "separator"}
    aria-orientation={!decorative ? orientation : undefined}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export { Separator };
```

- [ ] **Step 8: Verify components compile**

```bash
npm run dev
```

Expected: No TypeScript errors, dev server runs

- [ ] **Step 9: Commit**

```bash
git add components/ui/
git commit -m "feat: add shadcn/ui-style components (button, card, input, label, checkbox, separator)"
```

---

## Task 3: Layout Components (Navbar & Footer)

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`

**Interfaces:**
- Consumes: `components/ui/button.tsx`, `components/ui/separator.tsx`
- Produces: Reusable Navbar and Footer components

- [ ] **Step 1: Create layout directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\components\layout"
```

- [ ] **Step 2: Create components/layout/Navbar.tsx**

```tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent-purple" />
            <span className="text-xl font-bold gradient-text">ASCEND.VPN</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Тарифы
            </Link>
            <Link
              href="/#faq"
              className="text-gray-400 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Войти</Button>
            </Link>
            <Link href="/register">
              <Button>Регистрация</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: Create components/layout/Footer.tsx**

```tsx
import Link from "next/link";
import { Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-accent-purple" />
              <span className="text-lg font-bold gradient-text">ASCEND.VPN</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Безопасный и быстрый VPN-сервис для保护ва ваших данных и свободы в интернете.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Войти
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>support@ascendvpn.com</li>
              <li>Telegram: @ascendvpn</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-gray-500">
          © 2026 ASCEND.VPN. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Verify components render**

```bash
npm run dev
```

Expected: Pages compile, components visible

- [ ] **Step 5: Commit**

```bash
git add components/layout/
git commit -m "feat: add Navbar and Footer layout components"
```

---

## Task 4: Particle Background Effect

**Files:**
- Create: `components/effects/ParticleBackground.tsx`

**Interfaces:**
- Consumes: `@tsparticles/react`, `@tsparticles/slim`
- Produces: Animated particle background component

- [ ] **Step 1: Create effects directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\components\effects"
```

- [ ] **Step 2: Create components/effects/ParticleBackground.tsx**

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/slim";

export function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
      particles: {
        color: {
          value: ["#6c5ce7", "#00cec9"],
        },
        links: {
          color: "#6c5ce7",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Particles id="tsparticles" options={options} className="h-full" />
    </div>
  );
}
```

- [ ] **Step 3: Verify particles load**

```bash
npm run dev
```

Expected: Background shows animated particles on homepage

- [ ] **Step 4: Commit**

```bash
git add components/effects/
git commit -m "feat: add animated particle background effect"
```

---

## Task 5: Landing Page - Hero Section

**Files:**
- Create: `components/landing/Hero.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `components/ui/button.tsx`, `components/effects/ParticleBackground.tsx`
- Produces: Hero section with CTA

- [ ] **Step 1: Create landing directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\components\landing"
```

- [ ] **Step 2: Create components/landing/Hero.tsx**

```tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Globe, Lock } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Shield className="h-16 w-16 text-accent-purple" />
            <h1 className="text-6xl md:text-8xl font-bold gradient-text">
              ASCEND.VPN
            </h1>
          </div>

          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            Безопасность. Скорость. Свобода.
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Защитите свои данные с VPN нового поколения. 256-битное шифрование,
            серверы по всему миру, абсолютная анонимность.
          </p>

          <Link href="/register">
            <Button size="xl" className="text-lg px-12 py-6">
              Начать сейчас
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: Lock, label: "256-бит", desc: "Шифрование" },
            { icon: Zap, label: "10 Гбит/с", desc: "Скорость" },
            { icon: Globe, label: "50+", desc: "Серверов" },
            { icon: Shield, label: "0", desc: "Логов" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-card/50 border border-border hover:border-accent-purple/50 transition-colors"
            >
              <item.icon className="h-8 w-8 text-accent-cyan mx-auto mb-2" />
              <div className="text-2xl font-bold gradient-text">{item.label}</div>
              <div className="text-sm text-gray-400">{item.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Update app/page.tsx**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Verify hero renders**

```bash
npm run dev
```

Expected: Hero section with gradient text, particles, and CTA button

- [ ] **Step 5: Commit**

```bash
git add components/landing/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with animated text and stats"
```

---

## Task 6: Landing Page - Features Section

**Files:**
- Create: `components/landing/Features.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `components/ui/card.tsx`
- Produces: Features grid section

- [ ] **Step 1: Create components/landing/Features.tsx**

```tsx
"use client";

import { motion } from "framer-motion";
import { Lock, Zap, Globe, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Lock,
    title: "256-битное шифрование",
    description:
      "Ваши данные под надёжной защитой военного класса. Никто не сможет перехватить ваш трафик.",
  },
  {
    icon: Zap,
    title: "Молниеносная скорость",
    description:
      "Серверы по всему миру с минимальной задержкой. Стримьте, играйте и работайте без ограничений.",
  },
  {
    icon: Globe,
    title: "50+ серверов",
    description:
      "Выбирайте локацию из 30+ стран. Обходите гео-ограничения и получайте доступ к любому контенту.",
  },
  {
    icon: EyeOff,
    title: "Без логов",
    description:
      "Мы не храним данные о вашей активности. Ваша приватность — наш приоритет.",
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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Почему <span className="gradient-text">ASCEND.VPN</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы предоставляем лучший VPN-сервис для тех, кто ценит безопасность и скорость
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card className="h-full hover:border-accent-purple/50 transition-colors">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-accent-cyan mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
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
```

- [ ] **Step 2: Update app/page.tsx to include Features**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify features render**

```bash
npm run dev
```

Expected: 4 feature cards with icons and descriptions

- [ ] **Step 4: Commit**

```bash
git add components/landing/Features.tsx app/page.tsx
git commit -m "feat: add Features section with 4 feature cards"
```

---

## Task 7: Landing Page - Pricing Preview

**Files:**
- Create: `components/landing/PricingPreview.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `components/ui/card.tsx`, `components/ui/button.tsx`
- Produces: Pricing preview section

- [ ] **Step 1: Create components/landing/PricingPreview.tsx**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "90 дней",
    price: "799",
    period: "за 3 месяцев",
    perDay: "~8.9₽/день",
    features: ["5 устройств", "Все серверы", "24/7 поддержка"],
    popular: false,
  },
  {
    name: "180 дней",
    price: "1 499",
    period: "за 6 месяцев",
    perDay: "~8.3₽/день",
    features: ["7 устройств", "Все серверы", "24/7 поддержка", "Приоритет"],
    popular: true,
  },
  {
    name: "365 дней",
    price: "2 499",
    period: "за год",
    perDay: "~6.8₽/день",
    features: [
      "10 устройств",
      "Все серверы",
      "24/7 поддержка",
      "Приоритет",
      "Exclusive серверы",
    ],
    popular: false,
  },
];

export function PricingPreview() {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Выберите свой <span className="gradient-text">план</span>
          </h2>
          <p className="text-gray-400">
            Чем дольше подписка, тем больше экономия
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Card
                className={`relative h-full ${
                  plan.popular
                    ? "border-accent-purple glow-border"
                    : "hover:border-accent-purple/50"
                } transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-purple text-white text-xs font-semibold rounded-full">
                    Популярный
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold gradient-text">
                      {plan.price}₽
                    </span>
                    <p className="text-gray-400 text-sm mt-1">{plan.period}</p>
                    <p className="text-accent-cyan text-sm">{plan.perDay}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent-cyan" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/register" className="block">
                    <Button
                      variant={plan.popular ? "default" : "outline"}
                      className="w-full"
                    >
                      Выбрать план
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/pricing"
            className="text-accent-purple hover:underline text-sm"
          >
            Смотреть все тарифы →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update app/page.tsx**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PricingPreview />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify pricing renders**

```bash
npm run dev
```

Expected: 3 pricing cards with "Популярный" badge on middle card

- [ ] **Step 4: Commit**

```bash
git add components/landing/PricingPreview.tsx app/page.tsx
git commit -m "feat: add Pricing Preview section with 3 plan cards"
```

---

## Task 8: Landing Page - FAQ Section

**Files:**
- Create: `components/landing/FAQ.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: framer-motion
- Produces: FAQ accordion section

- [ ] **Step 1: Create components/landing/FAQ.tsx**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Что такое VPN?",
    answer:
      "VPN (Virtual Private Network) — это технология, которая шифрует ваш интернет-трафик и направляет его через безопасный сервер. Это защищает ваши данные от перехвата и скрывает ваш реальный IP-адрес.",
  },
  {
    question: "Как подключиться к VPN?",
    answer:
      "После регистрации и оплаты подписки вы получите доступ к личному кабинету, где сможете скачать приложение для вашего устройства. Установите его, войдите в аккаунт и нажмите 'Подключить'.",
  },
  {
    question: "Какие устройства поддерживаются?",
    answer:
      "Мы поддерживаем Windows, macOS, Linux, iOS, Android, а также роутеры. Вы можете использовать VPN на нескольких устройствах одновременно в зависимости от вашего тарифного плана.",
  },
  {
    question: "Можно ли использовать на нескольких устройствах?",
    answer:
      "Да! В зависимости от тарифа вы можете подключить от 3 до 10 устройств одновременно. Все устройства защищены одним аккаунтом.",
  },
  {
    question: "Ваши данные в безопасности?",
    answer:
      "Абсолютно. Мы используем 256-битное шифрование военного класса и политику отсутствия логов. Мы не храним информацию о вашей онлайн-активности.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-card transition-colors"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="p-4 pt-0 text-gray-400 text-sm">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update app/page.tsx**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { FAQ } from "@/components/landing/FAQ";
import { ParticleBackground } from "@/components/effects/ParticleBackground";

export default function Home() {
  return (
    <>
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PricingPreview />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify FAQ renders**

```bash
npm run dev
```

Expected: FAQ accordion with 5 questions, expandable on click

- [ ] **Step 4: Commit**

```bash
git add components/landing/FAQ.tsx app/page.tsx
git commit -m "feat: add FAQ section with animated accordion"
```

---

## Task 9: Full Pricing Page

**Files:**
- Create: `app/pricing/page.tsx`

**Interfaces:**
- Consumes: `components/ui/card.tsx`, `components/ui/button.tsx`
- Produces: Full pricing comparison page

- [ ] **Step 1: Create app/pricing directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\app\pricing"
```

- [ ] **Step 2: Create app/pricing/page.tsx**

```tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const plans = [
  {
    name: "30 дней",
    price: "299",
    period: "в месяц",
    perDay: "~10₽/день",
    features: ["3 устройства", "Все серверы", "24/7 поддержка"],
    popular: false,
  },
  {
    name: "90 дней",
    price: "799",
    period: "за 3 месяца",
    perDay: "~8.9₽/день",
    features: ["5 устройств", "Все серверы", "24/7 поддержка"],
    popular: false,
  },
  {
    name: "180 дней",
    price: "1 499",
    period: "за 6 месяцев",
    perDay: "~8.3₽/день",
    features: ["7 устройств", "Все серверы", "24/7 поддержка", "Приоритет"],
    popular: true,
  },
  {
    name: "365 дней",
    price: "2 499",
    period: "за год",
    perDay: "~6.8₽/день",
    features: [
      "10 устройств",
      "Все серверы",
      "24/7 поддержка",
      "Приоритет",
      "Exclusive серверы",
    ],
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Выберите свой <span className="gradient-text">план</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Чем дольше подписка, тем больше экономия
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Card
                  className={`relative h-full ${
                    plan.popular
                      ? "border-accent-purple glow-border"
                      : "hover:border-accent-purple/50"
                  } transition-all`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-purple text-white text-xs font-semibold rounded-full">
                      Популярный
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold gradient-text">
                        {plan.price}₽
                      </span>
                      <p className="text-gray-400 text-sm mt-1">{plan.period}</p>
                      <p className="text-accent-cyan text-sm">{plan.perDay}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-accent-cyan" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/register" className="block">
                      <Button
                        variant={plan.popular ? "default" : "outline"}
                        className="w-full"
                      >
                        Выбрать план
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Сравнение тарифов</h2>
            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left">Функция</th>
                    {plans.map((plan, i) => (
                      <th key={i} className="p-4 text-center">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4">Устройства</td>
                    {["3", "5", "7", "10"].map((num, i) => (
                      <td key={i} className="p-4 text-center">
                        {num}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Все серверы</td>
                    {plans.map((_, i) => (
                      <td key={i} className="p-4 text-center text-accent-cyan">
                        ✓
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">24/7 Поддержка</td>
                    {plans.map((_, i) => (
                      <td key={i} className="p-4 text-center text-accent-cyan">
                        ✓
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4">Приоритет</td>
                    <td className="p-4 text-center text-gray-500">—</td>
                    <td className="p-4 text-center text-gray-500">—</td>
                    <td className="p-4 text-center text-accent-cyan">✓</td>
                    <td className="p-4 text-center text-accent-cyan">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4">Exclusive серверы</td>
                    <td className="p-4 text-center text-gray-500">—</td>
                    <td className="p-4 text-center text-gray-500">—</td>
                    <td className="p-4 text-center text-gray-500">—</td>
                    <td className="p-4 text-center text-accent-cyan">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify pricing page renders**

```bash
npm run dev
```

Expected: 4 pricing cards + comparison table

- [ ] **Step 4: Commit**

```bash
git add app/pricing/
git commit -m "feat: add full pricing page with comparison table"
```

---

## Task 10: Prisma Schema & Database Setup

**Files:**
- Create: `prisma/schema.prisma`
- Create: `lib/db.ts`
- Create: `prisma/seed.ts`

**Interfaces:**
- Consumes: None
- Produces: Database models and seed data

- [ ] **Step 1: Create prisma directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\prisma"
```

- [ ] **Step 2: Create prisma/schema.prisma**

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id            String         @id @default(cuid())
  email         String         @unique
  passwordHash  String
  name          String?
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt
  subscriptions Subscription[]
  devices       Device[]
  payments      Payment[]
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  plan      String
  startDate DateTime
  endDate   DateTime
  status    String   @default("active")
  createdAt DateTime @default(now())
}

model Device {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  name       String
  type       String
  lastActive DateTime
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
}

model Payment {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  amount    Float
  currency  String   @default("RUB")
  plan      String
  date      DateTime @default(now())
  status    String   @default("completed")
}
```

- [ ] **Step 3: Create lib/db.ts**

```typescript
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 4: Initialize Prisma and create database**

```bash
cd "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2"
npx prisma generate
npx prisma db push
```

Expected: Database created at prisma/dev.db

- [ ] **Step 5: Create prisma/seed.ts**

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create demo user
  const passwordHash = await bcrypt.hash("demo1234", 10);

  const user = await prisma.user.upsert({
    where: { email: "demo@ascendvpn.com" },
    update: {},
    create: {
      email: "demo@ascendvpn.com",
      passwordHash,
      name: "Демо пользователь",
      subscriptions: {
        create: {
          plan: "180d",
          startDate: new Date(),
          endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
          status: "active",
        },
      },
      devices: {
        create: [
          {
            name: "iPhone 15 Pro",
            type: "iOS",
            lastActive: new Date(),
            isActive: true,
          },
          {
            name: "MacBook Pro",
            type: "macOS",
            lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
            isActive: true,
          },
        ],
      },
      payments: {
        create: [
          {
            amount: 1499,
            plan: "180d",
            status: "completed",
            date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

- [ ] **Step 6: Run seed**

```bash
cd "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2"
npx tsx prisma/seed.ts
```

Expected: Demo user created with subscription, devices, and payment

- [ ] **Step 7: Commit**

```bash
git add prisma/ lib/db.ts
git commit -m "feat: add Prisma schema with User, Subscription, Device, Payment models"
```

---

## Task 11: NextAuth.js Setup

**Files:**
- Create: `app/api/auth/[...nextauth]/route.ts`
- Create: `app/api/register/route.ts`
- Create: `app/providers.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `lib/db.ts`, `prisma/schema.prisma`
- Produces: Authentication system

- [ ] **Step 1: Create API directories**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\app\api\auth\[...nextauth]"
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\app\api\register"
```

- [ ] **Step 2: Create app/api/auth/[...nextauth]/route.ts**

```typescript
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
```

- [ ] **Step 3: Create app/api/register/route.ts**

```typescript
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Пароль должен быть минимум 8 символов" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    return NextResponse.json(
      { message: "Пользователь создан", userId: user.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Ошибка сервера" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 4: Create app/providers.tsx**

```tsx
"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

- [ ] **Step 5: Update app/layout.tsx**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "ASCEND.VPN - Безопасность. Скорость. Свобода.",
  description:
    "Защитите свои данные с VPN нового поколения. Шифрование военного класса, серверы по всему миру.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify auth compiles**

```bash
npm run dev
```

Expected: No TypeScript errors

- [ ] **Step 7: Commit**

```bash
git add app/api/ app/providers.tsx app/layout.tsx
git commit -m "feat: add NextAuth.js with credentials provider and registration API"
```

---

## Task 12: Registration Page

**Files:**
- Create: `app/register/page.tsx`
- Create: `components/auth/RegisterForm.tsx`

**Interfaces:**
- Consumes: `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/label.tsx`, `components/ui/card.tsx`, `components/ui/checkbox.tsx`
- Produces: Registration form

- [ ] **Step 1: Create auth components directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\components\auth"
```

- [ ] **Step 2: Create components/auth/RegisterForm.tsx**

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Lock, Loader2 } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    if (password.length < 8) {
      setError("Пароль должен быть минимум 8 символов");
      return;
    }

    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Пароль должен содержать буквы и цифры");
      return;
    }

    if (!agreed) {
      setError("Необходимо согласиться с условиями");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка регистрации");
        return;
      }

      router.push("/login?registered=true");
    } catch {
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Создайте аккаунт</CardTitle>
        <CardDescription>
          Зарегистрируйтесь для доступа к VPN
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type="password"
                placeholder="Минимум 8 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Captcha placeholder */}
          <div className="p-4 rounded-lg border border-border bg-card/50 text-center text-sm text-gray-500">
            Anti-bot проверка (будет добавлена позже)
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <Label htmlFor="terms" className="text-sm text-gray-400">
              Я согласен с{" "}
              <Link href="#" className="text-accent-purple hover:underline">
                условиями использования
              </Link>
            </Label>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Зарегистрироваться"
            )}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-accent-purple hover:underline">
              Войти
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 3: Create app/register/page.tsx**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-16">
        <RegisterForm />
      </main>
    </>
  );
}
```

- [ ] **Step 4: Verify registration page renders**

```bash
npm run dev
```

Expected: Registration form with email, password fields, captcha placeholder, and submit button

- [ ] **Step 5: Test registration**

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test1234"}'
```

Expected: `{"message":"Пользователь создан","userId":"..."}`

- [ ] **Step 6: Commit**

```bash
git add components/auth/RegisterForm.tsx app/register/
git commit -m "feat: add registration page with form validation and captcha placeholder"
```

---

## Task 13: Login Page

**Files:**
- Create: `app/login/page.tsx`
- Create: `components/auth/LoginForm.tsx`

**Interfaces:**
- Consumes: NextAuth.js, `components/ui/*`
- Produces: Login form

- [ ] **Step 1: Create components/auth/LoginForm.tsx**

```tsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Lock, Loader2, CheckCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Неверный email или пароль");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Вход в аккаунт</CardTitle>
        <CardDescription>
          Войдите для доступа к вашему VPN
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {registered && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/50 text-green-400 text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Аккаунт создан успешно! Теперь войдите.
            </div>
          )}

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Пароль</Label>
              <Link
                href="#"
                className="text-xs text-accent-purple hover:underline"
              >
                Забыли пароль?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Войти"
            )}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Нет аккаунта?{" "}
            <Link
              href="/register"
              className="text-accent-purple hover:underline"
            >
              Зарегистрироваться
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Create app/login/page.tsx**

```tsx
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 pt-16">
        <Suspense fallback={<div className="text-white">Загрузка...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify login page renders**

```bash
npm run dev
```

Expected: Login form with email, password, "Забыли пароль?" link

- [ ] **Step 4: Test login with demo user**

```bash
curl -X POST http://localhost:3000/api/auth/callback/credentials \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "email=demo@ascendvpn.com&password=demo1234&csrfToken=test"
```

Expected: Redirect to dashboard (or 200 response)

- [ ] **Step 5: Commit**

```bash
git add components/auth/LoginForm.tsx app/login/
git commit -m "feat: add login page with NextAuth credentials provider"
```

---

## Task 14: Dashboard Layout

**Files:**
- Create: `app/dashboard/layout.tsx`
- Create: `components/layout/Sidebar.tsx`

**Interfaces:**
- Consumes: NextAuth.js session, `components/ui/*`
- Produces: Dashboard layout with sidebar navigation

- [ ] **Step 1: Create dashboard directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\app\dashboard"
```

- [ ] **Step 2: Create components/layout/Sidebar.tsx**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Smartphone,
  CreditCard,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Обзор", icon: LayoutDashboard },
  { href: "/dashboard/devices", label: "Устройства", icon: Smartphone },
  { href: "/dashboard/payments", label: "История оплат", icon: CreditCard },
  { href: "/dashboard/settings", label: "Настройки", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Shield className="h-6 w-6 text-accent-purple" />
        <span className="text-lg font-bold gradient-text">ASCEND.VPN</span>
      </Link>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors",
              pathname === item.href
                ? "bg-accent-purple/20 text-accent-purple"
                : "text-gray-400 hover:text-white hover:bg-card-hover"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-card-hover transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          Выйти
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Create app/dashboard/layout.tsx**

```tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
```

- [ ] **Step 4: Create app/dashboard/page.tsx (placeholder)**

```tsx
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Обзор</h1>
      <p className="text-gray-400">Загрузка данных...</p>
    </div>
  );
}
```

- [ ] **Step 5: Verify dashboard layout renders**

```bash
npm run dev
```

Expected: Sidebar with navigation items, redirect to /login if not authenticated

- [ ] **Step 6: Commit**

```bash
git add app/dashboard/ components/layout/Sidebar.tsx
git commit -m "feat: add dashboard layout with sidebar navigation"
```

---

## Task 15: Dashboard Overview Page

**Files:**
- Create: `app/dashboard/page.tsx`
- Create: `components/dashboard/StatsOverview.tsx`

**Interfaces:**
- Consumes: Prisma (User, Subscription, Device), `components/ui/card.tsx`
- Produces: Dashboard overview with stats

- [ ] **Step 1: Create dashboard components directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\components\dashboard"
```

- [ ] **Step 2: Create components/dashboard/StatsOverview.tsx**

```tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Smartphone, Clock, Wifi } from "lucide-react";

interface StatsProps {
  subscription: {
    plan: string;
    endDate: string;
    status: string;
  } | null;
  devicesCount: number;
  activeDevices: number;
}

export function StatsOverview({ subscription, devicesCount, activeDevices }: StatsProps) {
  const planNames: Record<string, string> = {
    "30d": "30 дней",
    "90d": "90 дней",
    "180d": "180 дней",
    "365d": "365 дней",
  };

  const endDate = subscription ? new Date(subscription.endDate) : null;
  const daysLeft = endDate
    ? Math.max(0, Math.ceil((endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Статус</CardTitle>
          <Shield className="h-4 w-4 text-accent-cyan" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {subscription?.status === "active" ? "Активна" : "Неактивна"}
          </div>
          <p className="text-xs text-gray-400">
            {subscription ? planNames[subscription.plan] || subscription.plan : "Нет подписки"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Осталось дней</CardTitle>
          <Clock className="h-4 w-4 text-accent-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{daysLeft}</div>
          <div className="mt-2 h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-purple to-accent-cyan"
              style={{
                width: `${Math.min(100, (daysLeft / (subscription?.plan === "365d" ? 365 : subscription?.plan === "180d" ? 180 : subscription?.plan === "90d" ? 90 : 30)) * 100)}%`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Устройства</CardTitle>
          <Smartphone className="h-4 w-4 text-accent-cyan" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {activeDevices} / {devicesCount}
          </div>
          <p className="text-xs text-gray-400">активных</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Сервер</CardTitle>
          <Wifi className="h-4 w-4 text-accent-purple" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Россия</div>
          <p className="text-xs text-gray-400">Москва • 12ms</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

- [ ] **Step 3: Create app/dashboard/page.tsx**

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: { orderBy: { createdAt: "desc" }, take: 1 },
      devices: true,
      payments: { orderBy: { date: "desc" }, take: 5 },
    },
  });

  const activeSubscription = user?.subscriptions.find((s) => s.status === "active");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Обзор</h1>

      <StatsOverview
        subscription={activeSubscription
          ? {
              plan: activeSubscription.plan,
              endDate: activeSubscription.endDate.toISOString(),
              status: activeSubscription.status,
            }
          : null}
        devicesCount={user?.devices.length || 0}
        activeDevices={user?.devices.filter((d) => d.isActive).length || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Последние платежи</CardTitle>
          </CardHeader>
          <CardContent>
            {user?.payments.length === 0 ? (
              <p className="text-gray-400 text-sm">Нет платежей</p>
            ) : (
              <div className="space-y-3">
                {user?.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {payment.plan === "30d"
                          ? "30 дней"
                          : payment.plan === "90d"
                          ? "90 дней"
                          : payment.plan === "180d"
                          ? "180 дней"
                          : "365 дней"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {payment.date.toLocaleDateString("ru-RU")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{payment.amount}₽</p>
                      <p className="text-xs text-accent-cyan">{payment.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Активные устройства</CardTitle>
          </CardHeader>
          <CardContent>
            {user?.devices.length === 0 ? (
              <p className="text-gray-400 text-sm">Нет устройств</p>
            ) : (
              <div className="space-y-3">
                {user?.devices.map((device) => (
                  <div
                    key={device.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-background"
                  >
                    <div>
                      <p className="text-sm font-medium">{device.name}</p>
                      <p className="text-xs text-gray-400">{device.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          device.isActive ? "bg-accent-cyan" : "bg-gray-500"
                        }`}
                      />
                      <span className="text-xs text-gray-400">
                        {device.isActive ? "Онлайн" : "Офлайн"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify dashboard renders with mock data**

```bash
npm run dev
```

Expected: Dashboard shows stats cards, recent payments, and active devices

- [ ] **Step 5: Commit**

```bash
git add app/dashboard/page.tsx components/dashboard/StatsOverview.tsx
git commit -m "feat: add dashboard overview with stats, payments, and devices"
```

---

## Task 16: Dashboard Devices Page

**Files:**
- Create: `app/dashboard/devices/page.tsx`

**Interfaces:**
- Consumes: Prisma (Device), `components/ui/card.tsx`, `components/ui/button.tsx`
- Produces: Devices management page

- [ ] **Step 1: Create app/dashboard/devices directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\app\dashboard\devices"
```

- [ ] **Step 2: Create app/dashboard/devices/page.tsx**

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Plus, Trash2 } from "lucide-react";

export default async function DevicesPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  const devices = await prisma.device.findMany({
    where: { userId },
    orderBy: { lastActive: "desc" },
  });

  const maxDevices = 7; // Based on subscription plan

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Устройства</h1>
        <Button disabled={devices.length >= maxDevices}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить устройство
        </Button>
      </div>

      <p className="text-gray-400 mb-6">
        {devices.length} из {maxDevices} устройств
      </p>

      {devices.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Smartphone className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Нет подключённых устройств</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {devices.map((device) => (
            <Card key={device.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-card-hover flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-accent-cyan" />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-gray-400">{device.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            device.isActive ? "bg-accent-cyan" : "bg-gray-500"
                          }`}
                        />
                        <span className="text-sm">
                          {device.isActive ? "Онлайн" : "Офлайн"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">
                        Последняя активность:{" "}
                        {device.lastActive.toLocaleDateString("ru-RU")}
                      </p>
                    </div>

                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-400" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify devices page renders**

```bash
npm run dev
```

Expected: List of devices with online/offline status

- [ ] **Step 4: Commit**

```bash
git add app/dashboard/devices/
git commit -m "feat: add devices management page"
```

---

## Task 17: Dashboard Payments Page

**Files:**
- Create: `app/dashboard/payments/page.tsx`

**Interfaces:**
- Consumes: Prisma (Payment), `components/ui/card.tsx`
- Produces: Payment history page

- [ ] **Step 1: Create app/dashboard/payments directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\app\dashboard\payments"
```

- [ ] **Step 2: Create app/dashboard/payments/page.tsx**

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, CheckCircle, Clock, XCircle } from "lucide-react";

export default async function PaymentsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id;

  const payments = await prisma.payment.findMany({
    where: { userId },
    orderBy: { date: "desc" },
  });

  const totalSpent = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const statusIcons: Record<string, React.ReactNode> = {
    completed: <CheckCircle className="h-4 w-4 text-accent-cyan" />,
    pending: <Clock className="h-4 w-4 text-yellow-400" />,
    failed: <XCircle className="h-4 w-4 text-red-400" />,
  };

  const statusLabels: Record<string, string> = {
    completed: "Завершён",
    pending: "Ожидание",
    failed: "Ошибка",
  };

  const planNames: Record<string, string> = {
    "30d": "30 дней",
    "90d": "90 дней",
    "180d": "180 дней",
    "365d": "365 дней",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">История оплат</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего потрачено</CardTitle>
            <CreditCard className="h-4 w-4 text-accent-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSpent.toLocaleString("ru-RU")}₽</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Платежей</CardTitle>
            <CheckCircle className="h-4 w-4 text-accent-cyan" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Последний платёж</CardTitle>
            <Clock className="h-4 w-4 text-accent-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {payments[0]?.date.toLocaleDateString("ru-RU") || "—"}
            </div>
          </CardContent>
        </Card>
      </div>

      {payments.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <CreditCard className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Нет истории платежей</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Все платежи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-3 text-left">Дата</th>
                    <th className="p-3 text-left">План</th>
                    <th className="p-3 text-left">Сумма</th>
                    <th className="p-3 text-left">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-border">
                      <td className="p-3">
                        {payment.date.toLocaleDateString("ru-RU")}
                      </td>
                      <td className="p-3">
                        {planNames[payment.plan] || payment.plan}
                      </td>
                      <td className="p-3 font-medium">
                        {payment.amount.toLocaleString("ru-RU")}₽
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {statusIcons[payment.status]}
                          {statusLabels[payment.status] || payment.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verify payments page renders**

```bash
npm run dev
```

Expected: Payment history table with stats cards

- [ ] **Step 4: Commit**

```bash
git add app/dashboard/payments/
git commit -m "feat: add payment history page with stats and table"
```

---

## Task 18: Dashboard Settings Page

**Files:**
- Create: `app/dashboard/settings/page.tsx`

**Interfaces:**
- Consumes: NextAuth.js session, `components/ui/*`
- Produces: Settings page

- [ ] **Step 1: Create app/dashboard/settings directory**

```bash
mkdir -p "C:\Users\Евгений\Desktop\Projects\vpnwebsitev2\app\dashboard\settings"
```

- [ ] **Step 2: Create app/dashboard/settings/page.tsx**

```tsx
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock, Bell, Key } from "lucide-react";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Настройки</h1>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-accent-purple" />
              Изменение пароля
            </CardTitle>
            <CardDescription>
              Обновите пароль для защиты вашего аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Текущий пароль</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Новый пароль</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button>Сохранить пароль</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-accent-cyan" />
              Управление ключами
            </CardTitle>
            <CardDescription>
              API ключи для доступа к сервису
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-lg bg-background border border-border">
              <p className="text-sm text-gray-400 mb-2">Ваш API ключ:</p>
              <code className="text-sm text-accent-cyan">
                asc_vpn_xxxxxxxxxxxxxxxxxxxx
              </code>
            </div>
            <Button variant="outline" className="mt-4">
              Сгенерировать новый ключ
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-accent-purple" />
              Уведомления
            </CardTitle>
            <CardDescription>
              Настройте получение уведомлений
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email уведомления</p>
                <p className="text-sm text-gray-400">
                  Получать уведомления о платежах и обновлениях
                </p>
              </div>
              <div className="h-6 w-11 rounded-full bg-accent-purple relative cursor-pointer">
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
              </div>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Уведомления о безопасности</p>
                <p className="text-sm text-gray-400">
                  Предупреждения о входах в аккаунт
                </p>
              </div>
              <div className="h-6 w-11 rounded-full bg-accent-purple relative cursor-pointer">
                <div className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify settings page renders**

```bash
npm run dev
```

Expected: Settings page with password change, API keys, and notification toggles

- [ ] **Step 4: Commit**

```bash
git add app/dashboard/settings/
git commit -m "feat: add settings page with password, API keys, and notifications"
```

---

## Task 19: Final Polish & Responsive Design

**Files:**
- Modify: Various components for mobile responsiveness
- Create: `app/not-found.tsx`
- Create: `app/error.tsx`

**Interfaces:**
- Consumes: All existing components
- Produces: Polished, responsive website

- [ ] **Step 1: Create app/not-found.tsx**

```tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Shield className="h-16 w-16 text-accent-purple mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400 mb-6">Страница не найдена</p>
        <Link href="/">
          <Button>На главную</Button>
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create app/error.tsx**

```tsx
"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Ошибка</h1>
        <p className="text-gray-400 mb-6">Что-то пошло не так</p>
        <Button onClick={reset}>Попробовать снова</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Add mobile menu to Navbar**

Update `components/layout/Navbar.tsx` to include a mobile hamburger menu:

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-accent-purple" />
            <span className="text-xl font-bold gradient-text">ASCEND.VPN</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/pricing"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Тарифы
            </Link>
            <Link
              href="/#faq"
              className="text-gray-400 hover:text-white transition-colors"
            >
              FAQ
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Войти</Button>
            </Link>
            <Link href="/register">
              <Button>Регистрация</Button>
            </Link>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="/pricing"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Тарифы
              </Link>
              <Link
                href="/#faq"
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Войти
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">Регистрация</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Verify responsive design**

```bash
npm run dev
```

Test at different viewport sizes:
- Desktop (1920x1080): Full layout
- Tablet (768x1024): Adjusted grid
- Mobile (375x812): Single column, hamburger menu

- [ ] **Step 5: Final build test**

```bash
npm run build
```

Expected: Build completes without errors

- [ ] **Step 6: Commit**

```bash
git add app/not-found.tsx app/error.tsx components/layout/Navbar.tsx
git commit -m "feat: add error pages, mobile menu, and responsive polish"
```

---

## Task 20: Environment Variables & Documentation

**Files:**
- Create: `.env.example`
- Create: `.env.local`
- Create: `README.md`

**Interfaces:**
- Consumes: None
- Produces: Environment configuration and documentation

- [ ] **Step 1: Create .env.example**

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-change-in-production

# Database
DATABASE_URL="file:./dev.db"
```

- [ ] **Step 2: Create .env.local**

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=ascend-vpn-development-secret-key-2026
DATABASE_URL="file:./dev.db"
```

- [ ] **Step 3: Create README.md**

```markdown
# ASCEND.VPN

Безопасный и быстрый VPN-сервис.

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- NextAuth.js
- Framer Motion

## Запуск

```bash
# Установка зависимостей
npm install

# Инициализация базы данных
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# Запуск разработки
npm run dev
```

## Демо аккаунт

- Email: demo@ascendvpn.com
- Пароль: demo1234

## Структура проекта

- `app/` — страницы и API роуты
- `components/` — React компоненты
- `lib/` — утилиты и конфигурация
- `prisma/` — схема базы данных

## Лицензия

MIT
```

- [ ] **Step 4: Update .gitignore**

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma
prisma/dev.db
prisma/dev.db-journal
```

- [ ] **Step 5: Commit**

```bash
git add .env.example README.md .gitignore
git commit -m "docs: add environment config, README, and gitignore"
```

---

## Task 21: Final Verification

**Files:**
- None (verification only)

**Interfaces:**
- Consumes: All previous tasks
- Produces: Verified, working website

- [ ] **Step 1: Run development server**

```bash
npm run dev
```

Expected: Server starts without errors

- [ ] **Step 2: Test all pages**

Navigate to each page and verify:
- `/` — Landing page with Hero, Features, Pricing, FAQ
- `/pricing` — Full pricing page with comparison table
- `/register` — Registration form
- `/login` — Login form
- `/dashboard` — Dashboard overview (redirects to login if not authenticated)

- [ ] **Step 3: Test authentication flow**

1. Go to `/register`
2. Register with test@email.com / password123
3. Redirected to `/login`
4. Login with credentials
5. Redirected to `/dashboard`
6. See stats, devices, payments

- [ ] **Step 4: Test responsive design**

Check at:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x812)

- [ ] **Step 5: Build production**

```bash
npm run build
```

Expected: Build completes successfully

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: complete ASCEND.VPN website with all features"
```

---

## Summary

Total tasks: 21
Estimated time: 4-6 hours

### Pages implemented:
1. Landing page (Hero, Features, Pricing Preview, FAQ)
2. Full pricing page with comparison table
3. Registration page with validation
4. Login page with NextAuth
5. Dashboard (Overview, Devices, Payments, Settings)

### Features:
- Dark cyberpunk theme with particle effects
- Animated UI with Framer Motion
- SQLite database with Prisma ORM
- Authentication with NextAuth.js
- Responsive design (mobile-first)
- Demo user with sample data
