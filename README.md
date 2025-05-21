# EffectiveMobileTest
Тестовое задание связано с обращениями. Все .env файлы в репозитории.

Стэк ```Node.js```, ```Express.js```, ```PostgreSQL```, ```Prisma ORM```, ```Zod``` для валидации поступаемых данных с клиента, ```Pino``` для логирования. Также подключен ```Swagger```

# Запуск
Установка зависимостей
```
npm install
```
Генерация PrismaClient и деплой в базу данных
```
npm run prisma:deploy
```
Транспиляция и запуск
```
npm run start
```
Доступна документация OpenAPI, для этого нужно ввести путь ```/documentation```

Также для добавления заготовленных обращений можно использовать
```
npm run prisma:seed
```
## Тест
**После установки зависимостей, генерации PrismaClient:**

Деплой в тестовую базу данных
```
npm run prisma:deploy:test
```
Запуск теста
```
npm run test
```
# Запуск через docker
Требуются образы node:latest, postgres:latest

Ввести команду, которая соберёт контейнеры и запустит их
```
docker compose up --build
```

# Структура проекта:
```
appeal
│   .dockerignore
│   .env
│   .env.prod
│   .env.test
│   .gitignore
│   docker-compose.yaml
│   dockerfile
│   package-lock.json
│   package.json
│   tsconfig.json
│
├───prisma
│   │   schema.prisma
│   │
│   └───migrations
│       │   migration_lock.toml
│       │
│       └───20250521183447_init
│               migration.sql
│
└───src
    │   app.ts
    │   index.ts
    │   seed.ts
    │
    ├───config
    │       index.ts
    │       
    ├───modules
    │   ├───answer
    │   │       answer.repository.ts
    │   │       answer.service.ts
    │   │
    │   └───appeal
    │           appeal.controller.ts
    │           appeal.repository.ts
    │           appeal.router.ts
    │           appeal.service.ts
    │
    ├───prisma
    │       exception.ts
    │       prisma.ts
    │       
    ├───schemas
    │       answer.schema.ts
    │       appeal.schema.ts
    │       response.schema.ts
    │
    ├───swagger
    │       swagger.ts
    │
    ├───tests
    │       express.test.ts
    │
    └───types
            index.d.ts
```
