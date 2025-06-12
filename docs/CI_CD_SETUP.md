# 🚀 CI/CD Configuration Guide

Este guia explica como configurar e usar o pipeline CI/CD para o projeto Afya Test.

## 📋 Visão Geral

O projeto utiliza GitHub Actions para implementar um pipeline CI/CD completo com os seguintes workflows:

- **CI (Continuous Integration)** - Validação de código em PRs e pushes
- **CD (Continuous Deployment)** - Deploy automático para produção
- **Preview Deployment** - Deploy de preview para PRs
- **Dependency Updates** - Atualizações automáticas de dependências

## 🛠️ Configuração Inicial

### 1. Secrets do GitHub

Configure os seguintes secrets no seu repositório GitHub (`Settings > Secrets and variables > Actions`):

#### Vercel Integration

```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

#### Optional Integrations

```bash
CODECOV_TOKEN=your_codecov_token          # Para relatórios de cobertura
PERCY_TOKEN=your_percy_token              # Para testes visuais
```

### 2. Como Obter os Tokens

#### Vercel Token

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em Settings > Tokens
3. Crie um novo token
4. Copie o token gerado

#### Vercel Org/Project IDs

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Faça login
vercel login

# No diretório do projeto
vercel link

# Os IDs serão salvos em .vercel/project.json
```

## 📊 Workflows Detalhados

### 🔍 CI Workflow (`.github/workflows/ci.yml`)

**Triggers:**

- Push para `main` ou `develop`
- Pull requests para `main` ou `develop`

**Jobs:**

1. **Quality Checks** (Node.js 18.x, 20.x)

   - Checkout do código
   - Setup do Node.js
   - Instalação de dependências
   - ESLint
   - Prettier check
   - Type checking
   - Testes com cobertura
   - Build da aplicação
   - Cache de artifacts

2. **Security Scan**
   - Auditoria de segurança (`npm audit`)
   - Verificação de vulnerabilidades em dependências

### 🚀 CD Workflow (`.github/workflows/cd.yml`)

**Triggers:**

- Push para `main` (após CI passar)
- Workflow_run do CI completar com sucesso

**Jobs:**

1. **Deploy**
   - Deploy para produção no Vercel
   - Comentário com URL de deploy
2. **Lighthouse Audit**
   - Auditoria de performance
   - Relatório de acessibilidade
   - Comentário com resultados

### 👀 Preview Deployment (`.github/workflows/preview.yml`)

**Triggers:**

- Pull requests para `main` ou `develop`

**Jobs:**

1. **Preview Deploy**
   - Deploy de preview no Vercel
   - Comentário automático com URL
2. **Visual Regression**
   - Testes visuais com Percy
   - Comparação com baseline

### 🔄 Dependency Updates (`.github/workflows/dependency-update.yml`)

**Triggers:**

- Agendamento semanal (segundas-feiras às 9h UTC)
- Trigger manual

**Jobs:**

1. **Update Dependencies**
   - Verificação de pacotes desatualizados
   - Atualização automática de patch/minor versions
   - Execução de testes
   - Criação de PR automático

## 🏃‍♂️ Scripts Disponíveis

### Scripts de Desenvolvimento

```bash
npm run dev              # Inicia servidor de desenvolvimento
npm run build            # Build de produção
npm run start            # Inicia servidor de produção
```

### Scripts de Qualidade

```bash
npm run lint             # Executa ESLint
npm run lint:fix         # Corrige problemas do ESLint automaticamente
npm run format           # Formata código com Prettier
npm run format:check     # Verifica formatação do Prettier
npm run type-check       # Verificação de tipos TypeScript
```

### Scripts de Teste

```bash
npm run test             # Executa testes
npm run test:watch       # Executa testes em modo watch
npm run test:coverage    # Executa testes com cobertura
npm run test:ci          # Executa testes para CI (sem watch)
npm run test:silent      # Executa testes silenciosamente
```

### Scripts de CI/CD

```bash
npm run pre-commit       # Validação antes do commit
npm run ci:validate      # Validação completa para CI
```

## 🔧 Configurações

### Lighthouse (lighthouserc.json)

```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000", "http://localhost:3000/coins"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", { "minScore": 0.7 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["warn", { "minScore": 0.8 }],
        "categories:seo": ["warn", { "minScore": 0.8 }]
      }
    }
  }
}
```

### Branch Protection Rules

Recomendamos configurar as seguintes regras de proteção para a branch `main`:

1. **Require pull request reviews**

   - Require review from code owners
   - Dismiss stale reviews when new commits are pushed

2. **Require status checks to pass**

   - Quality Checks (Node.js 20.x)
   - Security Scan

3. **Require conversation resolution**

   - All conversations on code must be resolved

4. **Restrict pushes**
   - Only allow merge commits

## 🐛 Troubleshooting

### ❌ CI Failures

#### Tests Failing

```bash
# Execute localmente para debugar
npm run test:ci
npm run lint
npm run type-check
npm run build
```

#### Build Failures

```bash
# Limpe cache e reinstale dependências
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

#### Type Errors

```bash
# Execute type checking
npm run type-check

# Verifique arquivos de tipos
ls -la src/**/*.d.ts
```

### 🚫 Deployment Issues

#### Vercel Token Expired

1. Gere novo token no Vercel Dashboard
2. Atualize secret `VERCEL_TOKEN` no GitHub

#### Environment Variables Missing

1. Verifique `.env.example`
2. Configure variáveis no Vercel Dashboard
3. Redeploy

#### Build Timeout

1. Otimize imports
2. Reduza tamanho do bundle
3. Use dynamic imports

### 🔍 Performance Issues

#### Lighthouse Scores Baixos

1. Otimize imagens
2. Implemente lazy loading
3. Minimize JavaScript
4. Configure caching

#### Slow Tests

1. Use `--detectOpenHandles` para identificar vazamentos
2. Mock APIs externas
3. Parallelize testes quando possível

## 📈 Métricas e Monitoramento

### Coverage Reports

- Cobertura mínima: 70%
- Relatórios disponíveis em: `/coverage/lcov-report/index.html`
- Upload automático para Codecov (se configurado)

### Performance Monitoring

- Lighthouse CI para auditorias automáticas
- Vercel Analytics para métricas de produção
- Core Web Vitals tracking

### Error Monitoring

- Console errors captured em testes
- Build failures notificados via GitHub
- Deployment status em Vercel Dashboard

## 🎯 Best Practices

### 📝 Commits

```bash
# Use conventional commits
feat: add new feature
fix: resolve bug issue
docs: update documentation
style: format code
refactor: improve code structure
test: add test coverage
chore: update dependencies
```

### 🔄 Pull Requests

1. Use o template de PR fornecido
2. Inclua screenshots para mudanças de UI
3. Adicione testes para novas features
4. Mantenha PRs pequenos e focados

### 🧪 Testing

1. Escreva testes para novas features
2. Mantenha cobertura acima de 70%
3. Use mocks para APIs externas
4. Teste diferentes cenários (happy path, edge cases)

### 🚀 Deployment

1. Teste localmente antes do push
2. Verifique preview deployment
3. Monitore logs após deploy
4. Tenha rollback plan pronto

## 📚 Recursos Adicionais

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview)
- [Lighthouse Performance](https://web.dev/lighthouse-performance/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🤝 Contribuindo

Para contribuir com melhorias no pipeline CI/CD:

1. Crie uma issue descrevendo a melhoria
2. Implemente as mudanças em uma branch feature
3. Teste as mudanças localmente
4. Abra um PR com descrição detalhada
5. Aguarde review e aprovação

---

_Última atualização: Janeiro 2024_
