# AuraBox

Micro-SaaS de Cápsulas do Tempo Digitais para presentes sazonais e datas comemorativas.

## Objetivo Inicial

Definir a base arquitetural do projeto com:

- Front-end em React + Vite + Tailwind CSS.
- Back-end em Node.js + Express.js.
- Banco de dados PostgreSQL com Prisma ORM.
- Estrutura preparada para uma experiência de presente imersiva, mobile-first e de alto impacto visual.

## Direção de UX/UI

O fluxo da página do presente deve considerar quatro momentos principais:

1. Tela de entrada com lacre ou envelope digital, exigindo uma ação explícita do usuário para abrir a cápsula.
2. Ativação suave de áudio em background assim que a cápsula for aberta.
3. Linha do tempo visual com fotos, legendas e transições limpas em scroll vertical.
4. Carta viva com efeito typewriter para revelar a mensagem principal no ritmo da experiência.

## Estrutura Ideal de Pastas

```text
AuraBox/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── README.md
└── .gitignore
```

## Modelo de Dados Prisma

Para a primeira versão, a modelagem mais saudável é separar a cápsula do tempo e os itens da linha do tempo em duas tabelas. Isso evita um campo JSON rígido e facilita ordenação, edição e expansão futura.

```prisma
generator client {
	provider = "prisma-client-js"
}

datasource db {
	provider = "postgresql"
	url      = env("DATABASE_URL")
}

model Capsule {
	id            String         @id @default(uuid())
	title         String
	songUrl       String?
	letter        String
	slug          String         @unique
	createdAt     DateTime       @default(now())
	updatedAt     DateTime       @updatedAt

	timelineItems TimelineItem[]
}

model TimelineItem {
	id         String   @id @default(uuid())
	capsuleId  String
	imageUrl   String
	caption    String
	sortOrder  Int      @default(0)
	createdAt  DateTime @default(now())
	updatedAt  DateTime @updatedAt

	capsule    Capsule  @relation(fields: [capsuleId], references: [id], onDelete: Cascade)

	@@index([capsuleId])
	@@index([sortOrder])
}
```

Se quiser manter tudo em uma única tabela por enquanto, o campo `timelineItems` também pode ser representado como `Json`, mas a abordagem relacional acima é a mais flexível para o produto.

## Passo a Passo de Setup

### 1. Criar o workspace do projeto

```bash
mkdir AuraBox
cd AuraBox
mkdir frontend backend
```

### 2. Inicializar o front-end com Vite

```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Inicializar o back-end com Node.js + Express

```bash
cd ../backend
npm init -y
npm install express cors dotenv
npm install -D typescript tsx @types/node @types/express @types/cors prisma
npm install @prisma/client
npx tsc --init
npx prisma init
```

Depois do `prisma init`, ajuste a base para o padrão mais novo do Prisma criando `backend/prisma.config.ts` e removendo a `url` de `backend/prisma/schema.prisma`.

### 4. Configurar o banco PostgreSQL

Crie um banco local ou use Neon e adicione a string em `backend/.env`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

### 5. Aplicar o schema inicial do Prisma

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

Se estiver usando a versão mais recente do Prisma, o arquivo `prisma.config.ts` já vai ser lido automaticamente e a connection string continuará vindo de `DATABASE_URL`.

### 6. Preparar variáveis e scripts base

Depois disso, crie os arquivos principais:

- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/styles/globals.css`
- `backend/src/app.ts`
- `backend/src/server.ts`
- `backend/prisma.config.ts`

E adicione scripts de desenvolvimento em cada `package.json`:

- Front-end: `npm run dev`
- Back-end: `npm run dev`

## Próximo Passo Recomendado

1. Criar os projetos iniciais em `frontend` e `backend`.
2. Configurar Tailwind, Prisma e o servidor Express base.
3. Definir o primeiro fluxo de acesso da cápsula e o contrato da API.
