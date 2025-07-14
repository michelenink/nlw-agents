# Agents Workspace - Sistema de Q&A com IA

## 🤖 Sobre o Projeto

O **Agents Workspace** é um sistema inteligente de perguntas e respostas que utiliza inteligência artificial para processar áudio e gerar respostas baseadas em contexto. O sistema permite criar salas de conversa onde usuários podem:

### Funcionalidades Principais

#### **Gerenciamento de Salas**

- Criar salas temáticas com nome e descrição
- Listar todas as salas disponíveis
- Navegar entre diferentes salas de conversa

#### **Gravação e Transcrição de Áudio**

- Gravar áudio diretamente no navegador
- Transcrição automática usando **Google Gemini AI**
- Processamento de chunks de áudio para melhor performance
- Suporte a diferentes formatos de áudio

#### **Busca Semântica Inteligente**

- Geração de embeddings vetoriais para cada transcrição
- Busca semântica avançada usando PostgreSQL + pgvector
- Respostas contextualizadas baseadas no histórico de áudio

#### **Sistema de Perguntas e Respostas**

- Fazer perguntas sobre qualquer conteúdo gravado
- Respostas automáticas geradas pela IA
- Histórico completo de perguntas e respostas por sala
- Interface intuitiva para interação

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

## Estrutura do Projeto

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

### Instalação

````bash
# Instalar dependências
npm install --legacy-peer-deps

# Configurar banco de dados
cd apps/server
cp .env.example .env
# Editar variáveis de ambiente conforme necessário

# Subir banco de dados
docker-compose up -d

### Desenvolvimento

```bash
# Executar app web em modo desenvolvimento
npm run dev:web

# Executar servidor em modo desenvolvimento
npm run dev:server

# Executar ambos (use terminais separados)
npm run dev:web & npm run dev:server
````

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

## 🏛️ Arquitetura

### Benefícios do Monorepo

- **Compartilhamento de código** - Tipos e utilitários compartilhados
- **Desenvolvimento simplificado** - Um único repositório para ambos os projetos
- **Dependências centralizadas** - Gerenciamento unificado de dependências
- **Build otimizado** - Cache inteligente do NX
- **Desenvolvimento paralelo** - Múltiplos projetos no mesmo workspace

[Visite meu linkedin](https://www.linkedin.com/in/michelenink/)
