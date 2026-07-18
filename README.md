# ASCEND.VPN

Безопасный и быстрый VPN-сервис с современным дизайном в стиле киберпанк.

## Демо

- **Сайт:** [ascend.vpn](https://ascend.vpn) (в разработке)
- **Демо аккаунт:** `demo@ascendvpn.com` / `demo1234`

## Возможности

- Лендинг с анимированным фоном и плавными переходами
- Система тарифов (30/90/180/365 дней)
- Регистрация и авторизация через email
- Личный кабинет с статистикой
- Управление устройствами
- История оплат
- Настройки аккаунта
- Адаптивный дизайн для всех устройств

## Технологии

- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Иконки:** @tabler/icons-react
- **База данных:** SQLite (Prisma ORM)
- **Авторизация:** NextAuth.js

## Структура проекта

```
├── app/
│   ├── page.tsx              # Лендинг
│   ├── pricing/page.tsx      # Тарифы
│   ├── register/page.tsx     # Регистрация
│   ├── login/page.tsx        # Вход
│   └── dashboard/            # Личный кабинет
├── components/
│   ├── landing/              # Компоненты лендинга
│   ├── auth/                 # Формы авторизации
│   ├── dashboard/            # Компоненты дашборда
│   └── ui/                   # UI компоненты
├── lib/
│   ├── db.ts                 # Prisma клиент
│   └── auth.ts               # NextAuth конфиг
└── prisma/
    └── schema.prisma         # Модели данных
```

## Установка

```bash
# Клонировать репозиторий
git clone https://github.com/Ap3x0s/ascend.vpn.git
cd ascend.vpn

# Установить зависимости
npm install

# Инициализировать базу данных
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

# Запустить разработку
npm run dev
```

## Лицензия

MIT
