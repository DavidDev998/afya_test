# Dashboard de Criptomoedas - Afya Test

![CI](https://github.com/DavidDev998/afya_test/workflows/CI/badge.svg)
![CD](https://github.com/DavidDev998/afya_test/workflows/CD/badge.svg)
![Coverage](https://codecov.io/gh/DavidDev998/afya_test/branch/main/graph/badge.svg)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/github/license/DavidDev998/afya_test)

Um dashboard de criptomoedas construído com Next.js, TypeScript, React Query, tema claro/escuro, testes unitários, containerização Docker e pipeline CI/CD automatizado.

## 🚀 Funcionalidades

- ⚡ **Next.js 14** com App Router
- 🔷 **TypeScript** para segurança de tipos
- 🔄 **React Query (TanStack Query)** para gerenciamento de estado do servidor
- 🌙 **Tema Escuro/Claro** com persistência e detecção automática do sistema
- 💰 **API de Criptomoedas** integração com dados em tempo real
- 📊 **Gráficos de Preços** interativos e responsivos
- 🧪 **Jest & React Testing Library** para testes unitários
- 🐳 **Docker** containerização
- 🚀 **Vercel** pronto para deploy
- 💨 **Tailwind CSS** para estilização
- 📝 **ESLint & Prettier** para qualidade de código
- 🎯 **Path aliases** para importações limpas
- 🔄 **GitHub Actions CI/CD** pipeline completo
- 📊 **Monitoramento automático de performance** com Lighthouse
- 🔒 **Escaneamento de segurança** e atualizações de dependências
- ♿ **Acessibilidade** com suporte completo a screen readers

## 📋 Pré-requisitos

- Node.js 18.0.0 ou superior
- npm 8.0.0 ou superior

## ⚙️ Instalação

1. Clone o repositório:

```bash
git clone https://github.com/DavidDev998/afya_test.git
cd afya_test
```

2. Instale as dependências:

```bash
npm install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📜 Scripts Disponíveis

### Desenvolvimento

- `npm run dev` - Iniciar servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run start` - Iniciar servidor de produção

### Qualidade de Código

- `npm run lint` - Executar ESLint
- `npm run lint:fix` - Corrigir problemas do ESLint automaticamente
- `npm run format` - Formatar código com Prettier
- `npm run format:check` - Verificar formatação do código
- `npm run type-check` - Executar verificação do compilador TypeScript

### Testes

- `npm run test` - Executar testes
- `npm run test:watch` - Executar testes em modo watch
- `npm run test:coverage` - Executar testes com cobertura
- `npm run test:ci` - Executar testes para CI (sem watch)
- `npm run test:silent` - Executar testes silenciosamente

### CI/CD

- `npm run pre-commit` - Validação pré-commit
- `npm run ci:validate` - Validação completa de CI

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx          # Página inicial (dashboard)
│   ├── providers.tsx     # Provedores (React Query, Theme)
│   └── coins/            # Página de listagem de moedas
│       └── page.tsx
├── components/            # Componentes reutilizáveis
│   ├── CoinCard.tsx      # Card de criptomoeda
│   ├── Navigation.tsx    # Navegação principal
│   ├── ThemeProvider.tsx # Provedor de tema
│   ├── ThemeToggle.tsx   # Seletor de tema
│   ├── ErrorMessage.tsx  # Mensagem de erro
│   ├── LoadingSpinner.tsx # Indicador de carregamento
│   ├── PriceChart.tsx    # Gráfico de preços
│   └── __tests__/        # Testes dos componentes
├── hooks/                 # Hooks customizados
│   └── useCoins.ts       # Hook para buscar dados de moedas
├── lib/                  # Bibliotecas utilitárias
│   └── api.ts           # Configuração da API
├── types/                # Definições de tipos TypeScript
│   └── coin.ts          # Tipos relacionados a moedas
└── test-setup.ts         # Configuração dos testes
```

## 🎨 Sistema de Temas

O projeto inclui um sistema completo de temas claro/escuro com:

- **3 Modos**: Claro, Escuro, Sistema (detecta preferência do OS)
- **Persistência**: Preferência salva no localStorage
- **Transições Suaves**: Animações CSS para mudanças de tema
- **Detecção Automática**: Segue a preferência do sistema automaticamente
- **Acessibilidade**: Suporte completo para leitores de tela

## 🧪 Testes

Este projeto usa Jest e React Testing Library para testes:

```bash
# Executar todos os testes
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

### Cobertura Atual de Testes

- **CoinCard**: 11 testes abrangentes
- **Navigation**: 9 testes incluindo integração com tema
- Cobertura de componentes críticos e hooks customizados

## 🐳 Docker

### Desenvolvimento

```bash
# Build da imagem de desenvolvimento
docker build -t afya-test-dev .

# Executar container
docker run -p 3000:3000 afya-test-dev
```

### Produção

```bash
# Build da imagem de produção
docker build -t afya-test-prod .

# Executar container de produção
docker run -p 3000:3000 afya-test-prod
```

## 🔄 Pipeline CI/CD

Este projeto inclui um pipeline CI/CD abrangente usando GitHub Actions:

### ✅ Integração Contínua (CI)

- **Qualidade de Código**: ESLint, Prettier, verificações TypeScript
- **Testes**: Testes unitários com relatório de cobertura
- **Segurança**: Escaneamento de vulnerabilidades de dependências
- **Build**: Validação de build de produção
- **Teste Matrix**: Node.js 18.x e 20.x

### 🚀 Deploy Contínuo (CD)

- **Deploy Automático**: Push para `main` dispara deploy de produção
- **Deploys de Preview**: PRs recebem URLs de preview
- **Monitoramento de Performance**: Auditoria Lighthouse
- **Suporte a Rollback**: Rollback fácil via dashboard Vercel

### 📊 Workflows Automatizados

- **Atualizações de Dependências**: Atualizações automáticas semanais
- **Badges de Status**: Badges do README auto-atualizáveis
- **Testes de Regressão Visual**: Testes visuais Percy (opcional)

### Instruções de Configuração

1. Configure secrets nas configurações do repositório GitHub:

   ```
   VERCEL_TOKEN=seu_token_vercel
   VERCEL_ORG_ID=seu_org_id_vercel
   VERCEL_PROJECT_ID=seu_project_id_vercel
   ```

2. Integrações opcionais:
   ```
   CODECOV_TOKEN=seu_token_codecov
   PERCY_TOKEN=seu_token_percy
   ```

Para instruções detalhadas de configuração CI/CD, consulte [Guia de Configuração CI/CD](./docs/CI_CD_SETUP.md).

## 🌐 Deploy

### Vercel (Recomendado)

O projeto está configurado para deploy automático no Vercel:

1. **Automático**: Push para `main` faz deploy para produção
2. **Preview**: PRs recebem deploys de preview
3. **Manual**: Conecte o repositório ao dashboard Vercel

### Deploy Manual

```bash
# Build da aplicação
npm run build

# Iniciar servidor de produção
npm run start
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` para desenvolvimento local:

```env
# Adicione suas variáveis de ambiente aqui
NEXT_PUBLIC_API_URL=https://api.coingecko.com/api/v3
```

## 🤝 Contribuindo

1. Faça fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça suas alterações
4. Execute testes e linting (`npm run ci:validate`)
5. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
6. Push para a branch (`git push origin feature/nova-funcionalidade`)
7. Abra um Pull Request

### Templates Disponíveis

- **Pull Request**: Template completo com checklist
- **Bug Report**: Template para reportar bugs
- **Feature Request**: Template para solicitar funcionalidades

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Segurança de tipos
- **React Query (TanStack Query)** - Gerenciamento de estado do servidor
- **Tailwind CSS** - Framework CSS utility-first
- **Jest** - Framework de testes
- **React Testing Library** - Testes de componentes
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Husky** - Git hooks
- **Docker** - Containerização
- **GitHub Actions** - CI/CD
- **Vercel** - Plataforma de deploy

## 📊 API de Criptomoedas

O projeto integra com a API CoinGecko para fornecer:

- **Dados em Tempo Real**: Preços atualizados de criptomoedas
- **Informações Detalhadas**: Market cap, volume, variação 24h
- **Gráficos Históricos**: Dados de preços históricos
- **Rate Limiting**: Gerenciamento inteligente de rate limits

## ♿ Acessibilidade

O projeto segue as diretrizes WCAG 2.1 com:

- **Navegação por Teclado**: Suporte completo
- **Screen Reader**: Compatibilidade total
- **Contrast Ratio**: Atende padrões AA
- **Semântica HTML**: Estrutura semântica adequada
- **ARIA Labels**: Labels descritivos para elementos interativos

## 📄 Licença

## Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
