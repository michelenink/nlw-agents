# Agents Workspace - Monorepo

Este é um monorepo NX que contém os projetos **web** e **server** para o sistema de agentes NLW, junto com bibliotecas compartilhadas.

![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933)
![Fastify](https://img.shields.io/badge/Fastify-Framework-000000)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-ORM-C5F74F)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-UI-38B2AC)
![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF)
![NX](https://img.shields.io/badge/NX-Monorepo-143055)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED)

## 🏗️ Estrutura do Projeto

```
agents/
├── apps/
│   ├── web/                    # Aplicação React + Vite
│   │   ├── src/
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── project.json
│   └── server/                 # API Node.js + Fastify
│       ├── src/
│       ├── docker/
│       ├── docker-compose.yml
│       ├── drizzle.config.ts
│       └── project.json
├── libs/
│   └── shared/
│       └── types/              # Tipos TypeScript compartilhados
│           ├── src/
│           └── project.json
├── nx.json                     # Configuração do NX
├── tsconfig.base.json          # Configuração base do TypeScript
└── package.json                # Dependências do workspace
```

## 🚀 Comandos Disponíveis

### Desenvolvimento

```bash
# Executar app web em modo desenvolvimento
npm run dev:web

# Executar servidor em modo desenvolvimento
npm run dev:server

# Executar ambos (use terminais separados)
npm run dev:web & npm run dev:server
```

### Build

```bash
# Build do app web
npm run build:web

# Build do servidor
npm run build:server

# Build de todos os projetos
npm run build:all
```

### Banco de Dados

```bash
# Gerar migrações
npm run db:generate

# Executar migrações
npm run db:migrate

# Abrir Drizzle Studio
npm run db:studio

# Executar seed do banco
npm run db:seed
```

### Linting

```bash
# Executar lint em todos os projetos
npm run lint:all

# Executar lint em projeto específico
nx lint web
nx lint server
```

## 🛠️ Tecnologias Utilizadas

### Frontend (Web)

- **React 19** - Biblioteca para interfaces
- **Vite** - Build tool e dev server
- **TypeScript** - Linguagem principal
- **Tailwind CSS** - Framework CSS
- **Shadcn/ui** - Componentes UI
- **React Hook Form** - Gerenciamento de formulários
- **React Query** - Gerenciamento de estado servidor
- **React Router DOM** - Roteamento
- **Zod** - Validação de esquemas

### Backend (Server)

- **Node.js** - Runtime JavaScript
- **Fastify** - Framework web
- **TypeScript** - Linguagem principal
- **PostgreSQL** - Banco de dados
- **Drizzle ORM** - ORM TypeScript
- **Google GenAI** - Integração com IA
- **Zod** - Validação de esquemas

### Desenvolvimento

- **NX** - Monorepo tooling
- **Biome** - Linter e formatter
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 📂 Bibliotecas Compartilhadas

### @agents-workspace/shared-types

Contém todos os tipos TypeScript compartilhados entre o frontend e backend:

- Request/Response types
- Modelos de dados
- Interfaces comuns

## 🔧 Configuração do Ambiente

### Pré-requisitos

- Node.js 18+
- npm
- Docker e Docker Compose

### Instalação

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Configurar banco de dados
cd apps/server
cp .env.example .env
# Editar variáveis de ambiente conforme necessário

# Subir banco de dados
docker-compose up -d

# Executar migrações
npm run db:migrate

# Opcional: executar seed
npm run db:seed
```

## 📋 Scripts de Desenvolvimento

### Para o Frontend

```bash
# Dentro da pasta apps/web
npm run dev    # Inicia servidor de desenvolvimento
npm run build  # Build para produção
npm run lint   # Executa linting
```

### Para o Backend

```bash
# Dentro da pasta apps/server
npm run dev    # Inicia servidor com watch
npm run build  # Build para produção
npm run start  # Inicia servidor em produção
```

## 🏛️ Arquitetura

### Benefícios do Monorepo

- **Compartilhamento de código** - Tipos e utilitários compartilhados
- **Desenvolvimento simplificado** - Um único repositório para ambos os projetos
- **Dependências centralizadas** - Gerenciamento unificado de dependências
- **Build otimizado** - Cache inteligente do NX
- **Desenvolvimento paralelo** - Múltiplos projetos no mesmo workspace

### Princípios Arquiteturais

- **Separação de responsabilidades** - Apps independentes com libs compartilhadas
- **Type safety** - TypeScript end-to-end
- **Clean Code** - Código limpo e bem documentado
- **DRY** - Reutilização de código através de libs compartilhadas

[Visite meu linkedin](https://www.linkedin.com/in/michelenink/)
