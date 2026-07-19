# Админ-панель ASCEND.VPN — План реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Создать полную админ-панель для управления VPN-сервисом в папке `/admin` текущего проекта.

**Architecture:** Next.js App Router с `/admin` маршрутом, отдельная авторизация с 2FA, REST API, общая SQLite база данных с дополнительными моделями (Admin, News, AuditLog).

**Tech Stack:** Next.js 14, Tailwind CSS, shadcn/ui, Prisma ORM, NextAuth.js, speakeasy (2FA), Chart.js

## Global Constraints

- Next.js 14+ (App Router)
- Tailwind CSS + shadcn/ui
- SQLite через Prisma
- Авторизация: NextAuth.js с отдельным провайдером для админов
- 2FA: TOTP (Google Authenticator)
- Все действия логируются в AuditLog

---

## Фаза 1: Модели данных и настройка

### Task 1: Добавить модели Admin, News, AuditLog в Prisma

**Files:**
- Modify: `prisma/schema.prisma`

**Interfaces:**
- Consumes: Текущая схема с User, Subscription, Device, Payment
- Produces: Новые модели Admin, News, AuditLog

- [ ] **Step 1: Добавить модель Admin**

```prisma
model Admin {
  id              String   @id @default(cuid())
  email           String   @unique
  passwordHash    String
  twoFactorSecret String?
  twoFactorEnabled Boolean @default(false)
  role            String   @default("admin")
  createdAt       DateTime @default(now())
  lastLogin       DateTime?
  news            News[]
  auditLogs       AuditLog[]
}
```

- [ ] **Step 2: Добавить модель News**

```prisma
model News {
  id        String   @id @default(cuid())
  title     String
  content   String
  authorId  String
  author    Admin    @relation(fields: [authorId], references: [id])
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- [ ] **Step 3: Добавить модель AuditLog**

```prisma
model AuditLog {
  id        String   @id @default(cuid())
  adminId   String
  admin     Admin    @relation(fields: [adminId], references: [id])
  action    String
  targetId  String?
  details   String?
  ip        String?
  createdAt DateTime @default(now())
}
```

- [ ] **Step 4: Применить миграцию**

```bash
npx prisma db push
```

- [ ] **Step 5: Создать первого суперадмина**

```bash
npx tsx prisma/seed-admin.ts
```

- [ ] **Step 6: Commit**

```bash
git add prisma/
git commit -m "feat: add Admin, News, AuditLog models to Prisma"
```

---

## Фаза 2: Авторизация админа

### Task 2: Настроить авторизацию админа с 2FA

**Files:**
- Create: `lib/admin-auth.ts`
- Create: `app/api/admin/auth/[...nextauth]/route.ts`
- Create: `app/api/admin/auth/2fa/setup/route.ts`
- Create: `app/api/admin/auth/2fa/verify/route.ts`
- Modify: `package.json` (добавить speakeasy)

**Interfaces:**
- Consumes: Модель Admin из Prisma
- Produces: Функции authorizeAdmin, verify2FA, generate2FASecret

- [ ] **Step 1: Установить зависимости**

```bash
npm install speakeasy qrcode
npm install -D @types/speakeasy @types/qrcode
```

- [ ] **Step 2: Создать lib/admin-auth.ts**

```typescript
import speakeasy from "speakeasy";
import QRCode from "qrcode";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export async function authorizeAdmin(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return null;

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) return null;

  return { id: admin.id, email: admin.email, role: admin.role };
}

export async function generate2FASecret(email: string) {
  const secret = speakeasy.generateSecret({
    name: `ASCEND.VPN Admin (${email})`,
    issuer: "ASCEND.VPN",
  });

  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url!);

  return { secret: secret.base32, qrCode: qrCodeUrl };
}

export function verify2FAToken(secret: string, token: string): boolean {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1,
  });
}
```

- [ ] **Step 3: Создать API маршруты авторизации**

Создать `app/api/admin/auth/[...nextauth]/route.ts` с NextAuth провайдером для админов.

- [ ] **Step 4: Создать API для настройки 2FA**

Создать `app/api/admin/auth/2fa/setup/route.ts` — генерация секрета и QR-кода.

- [ ] **Step 5: Создать API для верификации 2FA**

Создать `app/api/admin/auth/2fa/verify/route.ts` — проверка токена и активация 2FA.

- [ ] **Step 6: Commit**

```bash
git add lib/admin-auth.ts app/api/admin/
git commit -m "feat: add admin auth with 2FA support"
```

---

## Фаза 3: UI компоненты админки

### Task 3: Создать layout и sidebar админки

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `components/admin/AdminSidebar.tsx`
- Create: `components/admin/AdminHeader.tsx`

**Interfaces:**
- Consumes: Авторизация админа
- Produces: Layout с навигацией

- [ ] **Step 1: Создать AdminSidebar**

Создать `components/admin/AdminSidebar.tsx` с навигацией:
- Дашборд (/admin)
- Пользователи (/admin/users)
- Серверы (/admin/servers)
- Финансы (/admin/finance)
- Новости (/admin/news)
- Логи (/admin/logs)
- Настройки (/admin/settings)

- [ ] **Step 2: Создать AdminHeader**

Создать `components/admin/AdminHeader.tsx` с:
- Название текущей страницы
- Email админа
- Кнопка выхода

- [ ] **Step 3: Создать admin layout**

Создать `app/admin/layout.tsx` с проверкой авторизации и рендером sidebar + header.

- [ ] **Step 4: Commit**

```bash
git add components/admin/ app/admin/layout.tsx
git commit -m "feat: add admin layout with sidebar and header"
```

---

## Фаза 4: Дашборд

### Task 4: Создать дашборд админки

**Files:**
- Create: `app/admin/page.tsx`
- Create: `components/admin/StatsCard.tsx`

**Interfaces:**
- Consumes: Модели User, Subscription, Device, Payment, Admin
- Produces: Статистика и графики

- [ ] **Step 1: Создать StatsCard компонент**

Универсальная карточка со статистикой: иконка, значение, описание, тренд.

- [ ] **Step 2: Создать дашборд**

Страница с:
- 4 карточки статистики (пользователи, доход, серверы, активность)
- График дохода за месяц (Chart.js)
- Список последних регистраций (5-10)
- Список последних платежей (5-10)

- [ ] **Step 3: Создать API для статистики**

`GET /api/admin/stats` — агрегированная статистика.

- [ ] **Step 4: Commit**

```bash
git add app/admin/page.tsx components/admin/StatsCard.tsx app/api/admin/stats/
git commit -m "feat: add admin dashboard with stats and charts"
```

---

## Фаза 5: Управление пользователями

### Task 5: Создать страницу управления пользователями

**Files:**
- Create: `app/admin/users/page.tsx`
- Create: `components/admin/UsersTable.tsx`

**Interfaces:**
- Consumes: Модель User с relations
- Produces: Таблица пользователей с CRUD

- [ ] **Step 1: Создать UsersTable**

Таблица с:
- Колонки: email, подписка, статус, дата регистрации, устройства
- Поиск по email
- Фильтр по статусу
- Кнопки действий: просмотр, блокировка, удаление

- [ ] **Step 2: Создать страницу users**

Главная страница с UsersTable и пагинацией.

- [ ] **Step 3: Создать API для пользователей**

CRUD API: GET (список), GET/:id (детали), PUT/:id (обновление), DELETE/:id (удаление), POST/:id/block (блокировка).

- [ ] **Step 4: Commit**

```bash
git add app/admin/users/ components/admin/UsersTable.tsx app/api/admin/users/
git commit -m "feat: add user management page with search and filters"
```

---

## Фаза 6: Управление серверами

### Task 6: Создать страницу управления серверами

**Files:**
- Create: `app/admin/servers/page.tsx`
- Create: `components/admin/ServersTable.tsx`

**Interfaces:**
- Consumes: Модель для серверов (создать)
- Produces: CRUD серверов

- [ ] **Step 1: Добавить модель Server в Prisma**

```prisma
model Server {
  id        String   @id @default(cuid())
  name      String
  country   String
  city      String
  ip        String
  status    String   @default("online")
  load      Int      @default(0)
  ping      Int      @default(0)
  maxUsers  Int      @default(100)
  createdAt DateTime @default(now())
}
```

- [ ] **Step 2: Создать ServersTable**

Таблица с:
- Колонки: название, страна, IP, статус, нагрузка, пинг
- Кнопки: вкл/выкл, редактирование, удаление
- Модальное окно добавления сервера

- [ ] **Step 3: Создать страницу servers**

Главная страница с ServersTable и кнопкой "Добавить сервер".

- [ ] **Step 4: Создать API для серверов**

CRUD API: GET (список), POST (создание), PUT/:id (обновление), DELETE/:id (удаление), POST/:id/toggle (вкл/выкл).

- [ ] **Step 5: Commit**

```bash
git add prisma/schema.prisma app/admin/servers/ components/admin/ServersTable.tsx app/api/admin/servers/
git commit -m "feat: add server management with monitoring"
```

---

## Фаза 7: Финансы

### Task 7: Создать страницу финансов

**Files:**
- Create: `app/admin/finance/page.tsx`
- Create: `components/admin/FinanceTable.tsx`

**Interfaces:**
- Consumes: Модель Payment
- Produces: Финансовая статистика

- [ ] **Step 1: Создать FinanceTable**

Таблица платежей с:
- Колонки: пользователь, сумма, план, дата, статус
- Фильтр по дате и статусу
- Пагинация

- [ ] **Step 2: Создать страницу finance**

Главная страница с:
- Сводка за период (селектор день/неделя/месяц)
- Круговая диаграмма по тарифам
- Таблица платежей
- Кнопка "Возврат"

- [ ] **Step 3: Создать API для финансов**

API: GET /summary (сводка), GET /payments (список), POST /refund (возврат).

- [ ] **Step 4: Commit**

```bash
git add app/admin/finance/ components/admin/FinanceTable.tsx app/api/admin/finance/
git commit -m "feat: add finance page with payment stats"
```

---

## Фаза 8: Новости

### Task 8: Создать страницу новостей

**Files:**
- Create: `app/admin/news/page.tsx`
- Create: `components/admin/NewsEditor.tsx`

**Interfaces:**
- Consumes: Модель News
- Produces: CRUD новостей

- [ ] **Step 1: Создать NewsEditor**

Форма редактирования новости:
- Заголовок
- Контент (textarea или простой rich editor)
- Чекбокс "Опубликовать"
- Кнопки: сохранить, опубликовать, удалить

- [ ] **Step 2: Создать страницу news**

Главная страница со списком новостей и кнопкой "Создать новость".

- [ ] **Step 3: Создать API для новостей**

CRUD API: GET (список), POST (создание), PUT/:id (обновление), DELETE/:id (удаление).

- [ ] **Step 4: Обновить дашборд пользователей**

Добавить блок "Новости/обновления" на страницу `/dashboard`, который показывает опубликованные новости.

- [ ] **Step 5: Commit**

```bash
git add app/admin/news/ components/admin/NewsEditor.tsx app/api/admin/news/ app/dashboard/page.tsx
git commit -m "feat: add news management with user-facing updates"
```

---

## Фаза 9: Логи

### Task 9: Создать страницу логов

**Files:**
- Create: `app/admin/logs/page.tsx`
- Create: `components/admin/LogsTable.tsx`

**Interfaces:**
- Consumes: Модель AuditLog
- Produces: Журнал действий

- [ ] **Step 1: Создать LogsTable**

Таблица логов с:
- Колонки: дата, админ, действие, объект, IP
- Фильтр по действию, админу, дате
- Пагинация (20 записей)
- Кнопка "Экспорт CSV"

- [ ] **Step 2: Создать страницу logs**

Главная страница с LogsTable.

- [ ] **Step 3: Создать middleware для логирования**

Добавить middleware, который логирует все действия админа в AuditLog.

- [ ] **Step 4: Commit**

```bash
git add app/admin/logs/ components/admin/LogsTable.tsx
git commit -m "feat: add audit logs page with filters"
```

---

## Фаза 10: Настройки

### Task 10: Создать страницу настроек

**Files:**
- Create: `app/admin/settings/page.tsx`

**Interfaces:**
- Consumes: Модель Admin
- Produces: Управление админами

- [ ] **Step 1: Создать страницу settings**

Страница с:
- Список админов (email, роль, дата добавления)
- Кнопка "Добавить админа"
- Редактирование роли
- Удаление админа

- [ ] **Step 2: Создать API для админов**

API: GET (список), POST (создание), PUT/:id (обновление роли), DELETE/:id (удаление).

- [ ] **Step 3: Commit**

```bash
git add app/admin/settings/ app/api/admin/admins/
git commit -m "feat: add admin settings with user management"
```

---

## Фаза 11: Финальная проверка

### Task 11: Проверка и деплой

- [ ] **Step 1: Проверить все страницы**

Проверить работу каждой страницы админки.

- [ ] **Step 2: Проверить безопасность**

- Авторизация работает
- 2FA работает
- Неавторизованный доступ блокируется
- Все действия логируются

- [ ] **Step 3: Commit**

```bash
git commit --allow-empty -m "chore: admin panel verification complete"
```

---

## Итого

| Фаза | Задач | Описание |
|------|-------|----------|
| 1 | 1 | Модели данных |
| 2 | 1 | Авторизация + 2FA |
| 3 | 1 | Layout + Sidebar |
| 4 | 1 | Дашборд |
| 5 | 1 | Пользователи |
| 6 | 1 | Серверы |
| 7 | 1 | Финансы |
| 8 | 1 | Новости |
| 9 | 1 | Логи |
| 10 | 1 | Настройки |
| 11 | 1 | Проверка |
| **Итого** | **11** | |
