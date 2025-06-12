# 🔗 GitHub & Vercel Integration Guide

Este guia irá te ajudar a configurar completamente a integração entre GitHub e Vercel para ativar o pipeline CI/CD.

## 📋 Pré-requisitos

- ✅ Conta no [GitHub](https://github.com)
- ✅ Conta no [Vercel](https://vercel.com)
- ✅ Projeto local configurado
- ✅ Node.js 18+ instalado

## 🚀 Passo 1: Configuração do Repositório GitHub

### 1.1 Criar Repositório GitHub

1. **Via GitHub Web:**

   ```
   1. Acesse https://github.com
   2. Clique em "New repository"
   3. Nome: "afya_test" (ou nome desejado)
   4. Descrição: "Cryptocurrency Dashboard - Afya Technical Test"
   5. Público ou Privado (sua escolha)
   6. ❌ NÃO inicialize com README (você já tem um)
   7. Clique em "Create repository"
   ```

2. **Via GitHub CLI (opcional):**

   ```bash
   # Instale GitHub CLI se não tiver
   brew install gh  # macOS
   # ou
   winget install GitHub.cli  # Windows

   # Faça login
   gh auth login

   # Crie o repositório
   gh repo create afya_test --public --description "Cryptocurrency Dashboard - Afya Technical Test"
   ```

### 1.2 Conectar Projeto Local ao GitHub

```bash
# No diretório do projeto
cd /Users/davidjunior/dev/projetos_pessoais/afya_test

# Inicializar git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "feat: initial project setup with CI/CD pipeline"

# Adicionar remote origin (substitua SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/afya_test.git

# Push para GitHub
git branch -M main
git push -u origin main
```

## ⚡ Passo 2: Configuração do Vercel

### 2.1 Conectar GitHub com Vercel

1. **Acesse o Vercel:**

   ```
   1. Vá para https://vercel.com
   2. Clique em "Sign up" ou "Log in"
   3. Escolha "Continue with GitHub"
   4. Autorize o Vercel a acessar sua conta GitHub
   ```

2. **Importar Projeto:**

   ```
   1. No dashboard do Vercel, clique em "Add New..."
   2. Selecione "Project"
   3. Encontre seu repositório "afya_test"
   4. Clique em "Import"
   ```

3. **Configurar Deploy:**

   ```
   1. Project Name: "afya-test" (será gerado automaticamente)
   2. Framework Preset: "Next.js" (detectado automaticamente)
   3. Root Directory: "./" (padrão)
   4. Build Command: "npm run build" (padrão)
   5. Output Directory: ".next" (padrão)
   6. Install Command: "npm install" (padrão)
   ```

4. **Deploy:**
   ```
   1. Clique em "Deploy"
   2. Aguarde o build completar (~2-3 minutos)
   3. Anote a URL gerada (ex: https://afya-test-abc123.vercel.app)
   ```

### 2.2 Obter Tokens do Vercel

1. **Vercel Token:**

   ```
   1. No Vercel Dashboard, vá em Settings
   2. Clique em "Tokens" na sidebar
   3. Clique em "Create Token"
   4. Nome: "GitHub Actions CI/CD"
   5. Escopo: "Full Account"
   6. Clique em "Create"
   7. ⚠️ COPIE O TOKEN (você não verá novamente!)
   ```

2. **Project e Org IDs:**

   ```bash
   # Instale Vercel CLI
   npm i -g vercel

   # Faça login
   vercel login

   # No diretório do projeto
   vercel link

   # Os IDs serão salvos em .vercel/project.json
   cat .vercel/project.json
   ```

   Você verá algo assim:

   ```json
   {
     "projectId": "prj_abc123def456ghi789",
     "orgId": "team_xyz789abc123def456"
   }
   ```

## 🔐 Passo 3: Configurar Secrets no GitHub

### 3.1 Adicionar Secrets Obrigatórios

1. **Acesse Settings do Repositório:**

   ```
   1. Vá para seu repositório no GitHub
   2. Clique em "Settings" (tab)
   3. Na sidebar esquerda, clique em "Secrets and variables"
   4. Clique em "Actions"
   ```

2. **Adicionar Secrets:**

   ```
   Clique em "New repository secret" para cada um:

   Name: VERCEL_TOKEN
   Value: [cole o token do Vercel]

   Name: VERCEL_ORG_ID
   Value: [orgId do arquivo .vercel/project.json]

   Name: VERCEL_PROJECT_ID
   Value: [projectId do arquivo .vercel/project.json]
   ```

### 3.2 Secrets Opcionais (Recomendados)

1. **Codecov (Coverage Reports):**

   ```
   1. Acesse https://codecov.io
   2. Faça login com GitHub
   3. Adicione seu repositório
   4. Copie o token gerado

   GitHub Secret:
   Name: CODECOV_TOKEN
   Value: [seu token do Codecov]
   ```

2. **Percy (Visual Testing):**

   ```
   1. Acesse https://percy.io
   2. Faça login com GitHub
   3. Crie novo projeto
   4. Copie o token

   GitHub Secret:
   Name: PERCY_TOKEN
   Value: [seu token do Percy]
   ```

## 🛡️ Passo 4: Configurar Branch Protection

### 4.1 Proteger Branch Main

1. **Acesse Branch Settings:**

   ```
   1. No GitHub, vá em Settings > Branches
   2. Clique em "Add rule"
   3. Branch name pattern: "main"
   ```

2. **Configurar Regras:**

   ```
   ✅ Require a pull request before merging
       ✅ Require approvals: 1
       ✅ Dismiss stale PR approvals when new commits are pushed
       ✅ Require review from code owners

   ✅ Require status checks to pass before merging
       ✅ Require branches to be up to date before merging
       Buscar e selecionar:
       - "Quality Checks (20.x)"
       - "Security Audit"

   ✅ Require conversation resolution before merging
   ✅ Restrict pushes that create files larger than 100MB
   ```

3. **Salvar:**
   ```
   1. Clique em "Create" ou "Save changes"
   ```

## 🧪 Passo 5: Testar a Integração

### 5.1 Teste do CI Pipeline

1. **Criar Branch de Teste:**

   ```bash
   # Criar nova branch
   git checkout -b test/ci-pipeline

   # Fazer uma pequena alteração
   echo "# Testing CI Pipeline" >> test-ci.md
   git add test-ci.md
   git commit -m "test: add CI pipeline test"

   # Push da branch
   git push origin test/ci-pipeline
   ```

2. **Criar Pull Request:**

   ```
   1. Vá para o GitHub
   2. Você verá um banner "Compare & pull request"
   3. Clique nele
   4. Adicione título: "test: CI pipeline integration"
   5. Adicione descrição usando o template
   6. Clique em "Create pull request"
   ```

3. **Verificar Workflows:**

   ```
   1. Na aba "Checks" do PR, você deve ver:
      - ✅ CI / Quality Checks (18.x)
      - ✅ CI / Quality Checks (20.x)
      - ✅ CI / Security Audit
      - ✅ Preview Deployment / Preview Deploy

   2. Aguarde todos passarem (verde)
   3. Verifique o comentário automático com URL de preview
   ```

### 5.2 Teste do CD Pipeline

1. **Merge do PR:**

   ```
   1. Se todos os checks passaram, clique em "Merge pull request"
   2. Escolha "Squash and merge"
   3. Confirme o merge
   ```

2. **Verificar Deploy:**
   ```
   1. Vá para Actions tab no GitHub
   2. Você deve ver o workflow "CD" executando
   3. Aguarde completar (~3-5 minutos)
   4. Verifique o deploy na URL do Vercel
   ```

## 🔍 Passo 6: Verificação e Monitoramento

### 6.1 URLs para Monitorar

```bash
# Anote essas URLs importantes:

1. GitHub Repository:
   https://github.com/SEU_USUARIO/afya_test

2. GitHub Actions:
   https://github.com/SEU_USUARIO/afya_test/actions

3. Vercel Dashboard:
   https://vercel.com/SEU_USUARIO/afya-test

4. Production URL:
   https://afya-test-SEU_USUARIO.vercel.app

5. Vercel Analytics:
   https://vercel.com/SEU_USUARIO/afya-test/analytics
```

### 6.2 Status Badges

Atualize o README.md com suas URLs corretas:

```markdown
![CI](https://github.com/SEU_USUARIO/afya_test/workflows/CI/badge.svg)
![CD](https://github.com/SEU_USUARIO/afya_test/workflows/CD/badge.svg)
![Vercel](https://img.shields.io/github/deployments/SEU_USUARIO/afya_test/production?label=vercel&logo=vercel)
```

## 🐛 Solução de Problemas

### ❌ CI Failures

**Erro: Tests failing**

```bash
# Execute localmente para debugar
npm run ci:validate
```

**Erro: Vercel secrets missing**

```bash
# Verifique se todos os secrets estão configurados:
VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
```

**Erro: Permission denied**

```bash
# Verifique se o GitHub Actions tem permissões:
Settings > Actions > General > Workflow permissions
Selecione "Read and write permissions"
```

### 🚫 Deploy Issues

**Erro: Build timeout**

```bash
# Otimize o build
npm run build
# Se local funciona, pode ser problema de recursos no Vercel
```

**Erro: Environment variables**

```bash
# Configure variáveis no Vercel Dashboard:
Project Settings > Environment Variables
```

### 🔍 Debug Commands

```bash
# Verificar status do repositório
git status
git remote -v

# Verificar Vercel CLI
vercel whoami
vercel projects ls

# Testar build local
npm run ci:validate

# Verificar logs do Vercel
vercel logs [deployment-url]
```

## ✅ Checklist Final

- [ ] ✅ Repositório GitHub criado e configurado
- [ ] ✅ Projeto conectado ao Vercel
- [ ] ✅ Todos os secrets configurados no GitHub
- [ ] ✅ Branch protection rules ativadas
- [ ] ✅ CI pipeline testado com PR
- [ ] ✅ CD pipeline testado com merge
- [ ] ✅ Deploy de produção funcionando
- [ ] ✅ URLs de monitoramento anotadas
- [ ] ✅ Status badges atualizados
- [ ] ✅ Equipe notificada sobre novo processo

## 🎉 Parabéns!

Seu pipeline CI/CD está totalmente configurado e operacional!

Agora toda mudança no código será:

1. ✅ Automaticamente testada
2. 🚀 Automaticamente deployada
3. 📊 Monitorada por performance
4. 🔒 Verificada por segurança

---

## 📞 Suporte

Se encontrar problemas:

1. Consulte os logs no GitHub Actions
2. Verifique o dashboard do Vercel
3. Revise a [documentação do CI/CD](./CI_CD_SETUP.md)
4. Abra uma issue no repositório

_Última atualização: Janeiro 2024_
