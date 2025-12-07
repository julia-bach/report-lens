# ReportLens

Aplicação web para retenção, visualização e análise de relatórios de testes automatizados, com foco em relatórios gerados pelo Playwright.  
O objetivo é transformar arquivos JSON brutos em histórico, métricas e dashboards que ajudem a acompanhar a qualidade dos testes ao longo do tempo.

---

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
- [Requisitos](#requisitos)
- [Configuração](#configuração)
- [Como rodar localmente](#como-rodar-localmente)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Fluxo de uso](#fluxo-de-uso)
- [Licença](#licença)

---

## Visão Geral

O ReportLens é uma aplicação open source pensada para times de QA e desenvolvimento que precisam:

- Centralizar relatórios de testes automatizados (Playwright).
- Consultar o histórico de execuções.
- Visualizar estatísticas e gráficos.
- Investigar falhas recorrentes e testes flaky.

O primeiro caso de uso real do projeto é em um sistema interno da WEG, servindo como base para validação da ferramenta em um contexto corporativo. A vivência com testes automatizados nesse e em outros projetos da empresa também foi um dos principais motivadores e inspirações para o desenvolvimento do ReportLens.

---

## Funcionalidades

### Visualização de relatórios
- Visualização de relatórios de testes por projeto.
- Timeline de execuções com:
    - Data/hora da execução.
    - Tempo total de execução.
    - Informações de quantidade de testes (passaram, falharam, pendentes).
- Detalhes por execução:
    - Total de testes executados.
    - Total de falhas com visualização de mensagem de erro e ponto de falha.
    - Testes aprovados e pendentes/skipped.

### Dashboards
- Overview da distribuição de resultados (passaram, falharam, pendentes).
- Identificação de testes flaky.
- Observabilidade de falhas ao longo do tempo.
- Comparação de testes falhos x aprovados em diferentes execuções.

### Análise de falhas
- Lista de testes com falha e seus detalhes.
- Logs e mensagens de erro.

### Histórico
- Histórico de execuções armazenado em banco de dados.
- Possibilidade de comparação de execuções ao longo do tempo.
- Apoio à análise de melhoria contínua das suites de testes.

---

## Arquitetura e Tecnologias
O ReportLens é uma aplicação fullstack construída sobre o Next.js, usando API Routes para o backend e MongoDB como banco de dados principal.

### Frontend
- Next.js + React + TypeScript.
- SWR para fetch/cache de dados e revalidação automática.
- Tailwind CSS para estilização utilitária.
- HeroUI / NextUI + componentes customizados para UI.
- AgGrid para visualização de grandes volumes de dados em tabelas.
- AG Charts para gráficos interativos.
- Zustand para gerenciamento de estado global leve.
- next-intl para internacionalização (i18n).

### Backend
- Next.js API Routes para endpoints REST.
- MongoDB para persistência dos dados de teste.
- Zod para validação de payloads e tipos.
- Integração com:
    - Playwright (como gerador dos relatórios de teste).
    - Pipelines CI/CD (ex.: GitLab) para ingestão dos JSONs.

### Infraestrutura
- Configuração via arquivo `.env` e `.env.example`.
- Deploy flexível:
    - Ambiente local (dev).
    - Qualquer provedor que suporte Next.js + Node.js (Vercel, servidor próprio, etc.).

---

## Requisitos
- Node.js 18+ (recomendado).
- npm ou pnpm.
- Instância do MongoDB (local ou em nuvem).
- Arquivo `.env` configurado com os dados de conexão.

---

## Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/julia-bach/report-lens.git
   cd report-lens
   ```
   
2. Crie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```

3. Edite o `.env` com as configurações necessárias, como por exemplo:
    - URL de conexão com o MongoDB.
    - Configurações de JWT (se ativar autenticação).
    - Configurações de logo e nome do projeto.

---

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

3. Acesse a aplicação em:
   ```text
   http://localhost:3000
   ```

---

## Estrutura de pastas

Estrutura geral (resumida):
```bash
.
├── i18n/               # Configuração de internacionalização
├── messages/           # Mensagens de tradução
├── src/
│   ├── app/            # Páginas e rotas (inclui API Routes em /api)
│   ├── components/     # Componentes reutilizáveis de UI
│   ├── constant/       # Constantes globais
│   ├── hook/           # Custom hooks
│   ├── lib/            # Schemas, validações e lógica de domínio
│   ├── services/       # Instanciação dos serviços de API
│   ├── store/          # Gerenciamento de estado global 
│   ├── types/          # Definições de tipos
│   └── utils/          # Helpers e utilitários
├── .env.example        # Exemplo de variáveis de ambiente
├── next.config.ts      # Configuração do Next.js
├── tailwind.config.ts  # Configuração do Tailwind
└── README.md
```

---

## Fluxo de uso
1. Pipeline de testes (ex.: GitLab) executa os testes automatizados com Playwright e gera arquivos JSON de resultado.
2. Esses arquivos são enviados para o ReportLens via API.
3. A aplicação processa e persiste os dados no MongoDB.
4. A interface web exibe:
    - Lista de execuções.
    - Métricas agregadas.
    - Detalhes dos testes e falhas.

---

## Licença / Aviso de Uso

Este código-fonte foi desenvolvido originalmente para uso interno da empresa WEG, como parte de um projeto corporativo.  
Com a autorização, a autora disponibiliza este repositório publicamente **apenas para fins educacionais e de demonstração**.
