# ASCEND.VPN — Спецификация дизайна

## Обзор

Сайт для VPN-сервиса ASCEND.VPN с лендингом, системой тарифов, регистрацией/авторизацией и личным кабинетом. Тёмная киберпанк-тема, неоновые акценты, профессиональный UI/UX.

## Стек технологий

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **UI Kit:** shadcn/ui
- **Animations:** Framer Motion
- **Particles:** react-tsparticles
- **Auth:** NextAuth.js (credentials provider)
- **ORM:** Prisma
- **Database:** SQLite (легко мигрировать на PostgreSQL)
- **Language:** TypeScript

## Визуальная концепция

### Цветовая палитра

| Переменная | Значение | Назначение |
|-----------|----------|------------|
| `--bg-primary` | `#0a0a0f` | Основной фон |
| `--bg-card` | `#1a1a2e` | Фон карточек |
| `--bg-card-hover` | `#25253e` | Hover карточек |
| `--accent-purple` | `#6c5ce7` | Основной акцент |
| `--accent-cyan` | `#00cec9` | Вторичный акцент |
| `--accent-gradient` | `linear-gradient(135deg, #6c5ce7, #00cec9)` | Градиенты |
| `--text-primary` | `#ffffff` | Основной текст |
| `--text-secondary` | `#a0a0b0` | Вторичный текст |
| `--border` | `#2a2a3e` | Границы |

### Типографика

- **Шрифт:** Inter (Google Fonts) или Geist Sans
- **Заголовки:** Bold, tracking tighter
- **Текст:** Regular, line-height 1.6

### Эффекты

- Glow-эффект на кнопках и карточках при hover
- Градиентные бордеры на карточках тарифов
- Анимированная сетка на фоне Hero-секции
- Плавные переходы (Framer Motion) между страницами
- Пульсирующий индикатор онлайн-статуса

## Страницы

### 1. Лендинг (`/`)

**Hero-секция:**
- Логотип ASCEND.VPN ( large, с glow-эффектом)
- Слоган: "Безопасность. Скорость. Свобода."
- Подзаголовок: "Защитите свои данные с VPN нового поколения"
- CTA-кнопка: "Начать сейчас" (градиент, glow при hover)
- Фон: анимированная сетка с частицами

**Фичи (4 карточки):**
1. 256-битное шифрование — "Ваши данные под надёжной защитой"
2. Молниеносная скорость — "Серверы по всему миру, минимум задержек"
3. 50+ серверов — "Выбирайте локацию из 30+ стран"
4. Без логов — "Мы не храним данные о вашей активности"

**Тарифы (превью):**
- 3 карточки: Популярные тарифы (90/180/365 дней)
- Кнопка "Все тарифы" → /pricing

**FAQ (аккордеон):**
- Что такое VPN?
- Как подключиться?
- Какие устройства поддерживаются?
- Можно ли использовать на нескольких устройствах?

**Footer:**
- Логотип, ссылки (Тарифы, FAQ, Контакты), копирайт

---

### 2. Тарифы (`/pricing`)

**Заголовок:** "Выберите свой план"

**Сравнительная таблица:**

| План | Цена | В день | Устройства | Серверы |
|------|------|--------|-----------|---------|
| 30 дней | 299₽ | ~10₽ | 3 | Все |
| 90 дней | 799₽ | ~8.9₽ | 5 | Все |
| 180 дней | 1499₽ | ~8.3₽ | 7 | Все |
| 365 дней | 2499₽ | ~6.8₽ | 10 | Все + Exclusive |

**Карточки:**
- Название плана
- Цена (крупно) + "за период"
- Цена за день (мелким текстом)
- Список фич (галочки)
- Кнопка "Выбрать план" → /register?plan=X

**Выделение:** План "365 дней" имеет градиентную рамку + бейдж "Выгодно"

---

### 3. Регистрация (`/register`)

**Форма:**
- Заголовок: "Создайте аккаунт"
- Поле: Email (с иконкой)
- Поле: Пароль (с иконкой и toggle видимости)
- Поле: Подтвердите пароль
- Captcha: Плейсхолдер "Anti-bot проверка" (интеграция позже)
- Чекбокс: "Я согласен с условиями использования"
- Кнопка: "Зарегистрироваться" (градиент)
- Ссылка: "Уже есть аккаунт? Войти"

**Валидация:**
- Email: корректный формат, уникальность
- Пароль: минимум 8 символов, буква + цифра
- Совпадение паролей

---

### 4. Вход (`/login`)

**Форма:**
- Заголовок: "Вход в аккаунт"
- Поле: Email
- Поле: Пароль
- Кнопка: "Войти"
- Ссылка: "Забыли пароль?"
- Ссылка: "Нет аккаунта? Зарегистрироваться"

---

### 5. Личный кабинет (`/dashboard`)

**Layout:** Sidebar + Main content

**Sidebar (навигация):**
- Обзор (Dashboard)
- Устройства
- История оплат
- Настройки
- Выйти

**Обзор (главная страница дашборда):**
- **Статус подписки:** активна/неактивна, дата окончания, прогресс-бар
- **Сервер:** текущая локация, пинг, статус
- **Трафик:** использовано/лимит, график за 7 дней
- **Скорость:** загрузка/отдача в реальном времени

**Устройства:**
- Таблица: Имя устройства, тип, последняя активность, статус
- Кнопка "Добавить устройство"
- Лимит: X из Y устройств

**История оплат:**
- Таблица: Дата, План, Сумма, Статус, Квитанция
- Фильтр по дате

**Настройки:**
- Изменение пароля
- Управление ключами
- Уведомления

## Модели данных (Prisma)

```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  passwordHash  String
  createdAt     DateTime       @default(now())
  subscriptions Subscription[]
  devices       Device[]
  payments      Payment[]
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  plan      String   // "30d", "90d", "180d", "365d"
  startDate DateTime
  endDate   DateTime
  status    String   // "active", "expired", "cancelled"
}

model Device {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
  name         String
  lastActive   DateTime
  isActive     Boolean  @default(true)
}

model Payment {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  amount    Float
  currency  String   @default("RUB")
  plan      String
  date      DateTime @default(now())
  status    String   // "completed", "pending", "failed"
}
```

## Структура проекта

```
vpnwebsitev2/
├── app/
│   ├── layout.tsx              # Root layout (шрифты, тема, Providers)
│   ├── page.tsx                # Лендинг
│   ├── pricing/page.tsx        # Тарифы
│   ├── register/page.tsx       # Регистрация
│   ├── login/page.tsx          # Вход
│   └── dashboard/
│       ├── layout.tsx          # Dashboard layout (sidebar)
│       ├── page.tsx            # Обзор
│       ├── devices/page.tsx    # Устройства
│       ├── payments/page.tsx   # История оплат
│       └── settings/page.tsx   # Настройки
├── components/
│   ├── ui/                     # shadcn/ui (Button, Card, Input, etc.)
│   ├── layout/
│   │   ├── Navbar.tsx          # Навигация лендинга
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx         # Sidebar дашборда
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── PricingPreview.tsx
│   │   ├── FAQ.tsx
│   │   └── Testimonials.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── dashboard/
│   │   ├── StatsOverview.tsx
│   │   ├── DeviceList.tsx
│   │   └── PaymentHistory.tsx
│   └── effects/
│       ├── ParticleBackground.tsx
│       └── GlowButton.tsx
├── lib/
│   ├── auth.ts                 # NextAuth конфиг
│   ├── db.ts                   # Prisma клиент
│   └── utils.ts                # Утилиты
├── prisma/
│   └── schema.prisma           # Модели данных
├── public/
│   └── logo.svg
├── tailwind.config.ts
├── next.config.js
├── package.json
└── tsconfig.json
```

## Стоимость тарифов

| План | Цена | За день |
|------|------|---------|
| 30 дней | 299₽ | ~10₽ |
| 90 дней | 799₽ | ~8.9₽ |
| 180 дней | 1499₽ | ~8.3₽ |
| 365 дней | 2499₽ | ~6.8₽ |

## Не входит в MVP

- Реальная VPN-логика (подключение к серверам)
- Платёжная система (интеграция с ЮKassa/Stripe)
- Реальная капча (будет placeholder)
- Email-верификация
- Админ-панель
- Мультиязычность

## Критерии успеха

1. Сайт открывается и выглядит как на скриншотах
2. Регистрация/вход работают (через SQLite)
3. Дашборд отображает mock-данные
4. Адаптивность (mobile-first)
5. Все страницы загружаются < 2s
