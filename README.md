# ASCEND.VPN

Безопасный и быстрый VPN-сервис

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- NextAuth.js
- Framer Motion

## Установка и запуск

```bash
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```

Приложение доступно по адресу: http://localhost:3000

## Демо-аккаунт

- Email: demo@ascendvpn.com
- Пароль: demo1234

## Структура проекта

```
src/
├── app/            # Next.js App Router (маршруты и страницы)
├── components/     # Переиспользуемые UI-компоненты
├── lib/            # Утилиты, конфигурация, Prisma-клиент
├── types/          # TypeScript-типы
prisma/
├── schema.prisma   # Модели базы данных
├── seed.ts         # Скрипт заполнения демо-данными
```

## Лицензия

MIT
