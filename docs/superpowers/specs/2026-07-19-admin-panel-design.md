# Админ-панель ASCEND.VPN — Спецификация

## Обзор

Админ-панель для управления VPN-сервисом ASCEND.VPN. Расположена в папке `/admin` текущего проекта. Отдельная авторизация с 2FA, REST API, полный контроль над пользователями, серверами, финансами и новостями.

## Архитектура

```
app/
├── admin/                        ← Админ-панель
│   ├── layout.tsx                ← Layout с sidebar и auth check
│   ├── page.tsx                  ← Дашборд (статистика)
│   ├── users/page.tsx            ← Управление пользователями
│   ├── servers/page.tsx          ← Управление серверами
│   ├── finance/page.tsx          ← Финансы и платежи
│   ├── news/page.tsx             ← Новости/обновления
│   ├── logs/page.tsx             ← Логи и аудит
│   └── settings/page.tsx         ← Настройки системы
├── api/admin/                    ← REST API
│   ├── auth/route.ts             ← Авторизация админа
│   ├── users/route.ts            ← CRUD пользователей
│   ├── servers/route.ts          ← CRUD серверов
│   ├── finance/route.ts          ← Данные о платежах
│   ├── news/route.ts             ← CRUD новостей
│   └── logs/route.ts             ← Логи действий
components/admin/                 ← UI-компоненты
├── AdminSidebar.tsx
├── AdminHeader.tsx
├── StatsCard.tsx
├── UsersTable.tsx
├── ServersTable.tsx
└── ...
lib/
├── admin-auth.ts                 ← Авторизация + 2FA
└── admin-db.ts                   ← Запросы для админки
```

## Модели данных (Prisma)

### Admin
```prisma
model Admin {
  id              String   @id @default(cuid())
  email           String   @unique
  passwordHash    String
  twoFactorSecret String?
  twoFactorEnabled Boolean @default(false)
  role            String   @default("admin") // admin, superadmin
  createdAt       DateTime @default(now())
  lastLogin       DateTime?
  news            News[]
  auditLogs       AuditLog[]
}
```

### News
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

### AuditLog
```prisma
model AuditLog {
  id        String   @id @default(cuid())
  adminId   String
  admin     Admin    @relation(fields: [adminId], references: [id])
  action    String   // "user.block", "server.add", "news.create"
  targetId  String?
  details   String?  // JSON с деталями
  ip        String?
  createdAt DateTime @default(now())
}
```

## Страницы админки

### 1. Дашборд (`/admin`)
- Всего пользователей / онлайн
- Доход за день / неделю / месяц
- Активные серверы / общее количество
- Последние регистрации (5-10)
- График дохода (Chart.js, line chart)

### 2. Управление пользователями (`/admin/users`)
- Таблица: email, подписка, статус, дата регистрации
- Поиск по email
- Фильтр по статусу (активный/заблокированный)
- Действия: просмотр, блокировка, изменение подписки, удаление
- Экспорт в CSV

### 3. Управление серверами (`/admin/servers`)
- Таблица: название, страна, IP, статус, нагрузка, пинг
- Добавление сервера (модальное окно)
- Включение/выключение
- Мониторинг в реальном времени (обновление каждые 30 сек)
- Удаление сервера

### 4. Финансы (`/admin/finance`)
- Общий доход за период (селектор: день/неделя/месяц/год)
- Таблица платежей: пользователь, сумма, план, дата, статус
- Статистика по тарифам (круговая диаграмма)
- Возврат средств

### 5. Новости (`/admin/news`)
- Создание новости: заголовок, контент (Rich Editor), дата публикации
- Список новостей: статус (опубликовано/черновик), дата, автор
- Редактирование и удаление
- Превью перед публикацией
- Новости отображаются в `/dashboard` у пользователей

### 6. Логи (`/admin/logs`)
- Журнал: дата, админ, действие, объект, IP
- Фильтр по: действию, админу, дате
- Пагинация (20 записей на страницу)
- Экспорт в CSV

### 7. Настройки (`/admin/settings`)
- Общие настройки VPN-сервиса
- Управление админами (добавление, удаление, изменение роли)
- Настройки уведомлений

## Авторизация

### Вход
- Email + пароль
- 2FA (TOTP) — опционально, но рекомендуется
- Сессия: JWT с TTL 15 минут
- Refresh token с TTL 7 дней

### Регистрация админа
- Только через суперадмина
- Приглашение по email

### 2FA
- TOTP (Google Authenticator, Authy)
- QR-код при настройке
- Резервные коды (8 штук)

## REST API

### Аутентификация
```
POST /api/admin/auth/login       — Вход
POST /api/admin/auth/logout      — Выход
POST /api/admin/auth/2fa/setup   — Настройка 2FA
POST /api/admin/auth/2fa/verify  — Проверка 2FA
POST /api/admin/auth/refresh     — Обновление токена
```

### Пользователи
```
GET    /api/admin/users          — Список (пагинация, поиск)
GET    /api/admin/users/:id      — Детали пользователя
PUT    /api/admin/users/:id      — Редактирование
DELETE /api/admin/users/:id      — Удаление
POST   /api/admin/users/:id/block — Блокировка
```

### Серверы
```
GET    /api/admin/servers        — Список серверов
POST   /api/admin/servers        — Добавление
PUT    /api/admin/servers/:id    — Редактирование
DELETE /api/admin/servers/:id    — Удаление
POST   /api/admin/servers/:id/toggle — Вкл/выкл
```

### Финансы
```
GET /api/admin/finance/summary   — Сводка за период
GET /api/admin/finance/payments  — Все платежи (пагинация)
POST /api/admin/finance/refund   — Возврат
```

### Новости
```
GET    /api/admin/news           — Список
POST   /api/admin/news           — Создание
PUT    /api/admin/news/:id       — Редактирование
DELETE /api/admin/news/:id       — Удаление
```

### Логи
```
GET /api/admin/logs              — Список (пагинация, фильтры)
GET /api/admin/logs/export       — Экспорт CSV
```

## Безопасность

| Мера | Реализация |
|------|------------|
| Авторизация | NextAuth.js (отдельный провайдер) |
| 2FA | speakeasy (TOTP) |
| Rate limiting | 100 запросов/мин на API |
| CSRF | Next.js built-in |
| JWT TTL | 15 мин access, 7 дней refresh |
| Логирование | Все действия в AuditLog |
| IP-ограничение | Опционально, через middleware |

## Технологии

- **Frontend:** Next.js 14, Tailwind CSS, shadcn/ui, Chart.js
- **Backend:** Next.js API routes, Prisma ORM
- **БД:** SQLite (общая с основным сайтом)
- **Auth:** NextAuth.js (отдельный провайдер)
- **2FA:** speakeasy
- **Charts:** Chart.js + react-chartjs-2

## Доступ

- URL: `/admin` (в рамках текущего домена)
- Отдельная сессия (не смешивать с пользовательской)
- Роли: admin, superadmin
- Superadmin может добавлять/удалять админов
