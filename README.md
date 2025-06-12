# Afya Test App

![CI](https://github.com/username/afya_test/workflows/CI/badge.svg)
![CD](https://github.com/username/afya_test/workflows/CD/badge.svg)
![Coverage](https://codecov.io/gh/username/afya_test/branch/main/graph/badge.svg)
![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/github/license/username/afya_test)

A modern Next.js application built with TypeScript, React Query, comprehensive testing, Docker support, and automated CI/CD pipeline.

## Features

- ⚡ **Next.js 14** with App Router
- 🔷 **TypeScript** for type safety
- 🔄 **React Query (TanStack Query)** for server state management
- 🧪 **Jest & React Testing Library** for unit testing
- 🐳 **Docker** containerization
- 🚀 **Vercel** deployment ready
- 💨 **Tailwind CSS** for styling
- 📝 **ESLint & Prettier** for code quality
- 🎯 **Path aliases** for clean imports
- 🔄 **GitHub Actions CI/CD** pipeline
- 🌙 **Dark/Light theme** support
- 📊 **Automated performance monitoring** with Lighthouse
- 🔒 **Security scanning** and dependency updates

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 8.0.0 or later

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd afya-test
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript compiler check

### Testing

- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run test:ci` - Run tests for CI (no watch)
- `npm run test:silent` - Run tests silently

### CI/CD

- `npm run pre-commit` - Pre-commit validation
- `npm run ci:validate` - Complete CI validation

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── providers.tsx     # React Query provider
├── components/            # Reusable components
│   ├── UsersList.tsx     # Users list component
│   └── __tests__/        # Component tests
├── hooks/                 # Custom hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## Testing

This project uses Jest and React Testing Library for testing:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Docker

### Development

```bash
# Build development image
docker build -t afya-test-dev .

# Run container
docker run -p 3000:3000 afya-test-dev
```

### Production

```bash
# Build production image
docker build -t afya-test-prod .

# Run production container
docker run -p 3000:3000 afya-test-prod
```

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline using GitHub Actions:

### 🔄 Continuous Integration (CI)

- **Code Quality**: ESLint, Prettier, TypeScript checks
- **Testing**: Unit tests with coverage reporting
- **Security**: Dependency vulnerability scanning
- **Build**: Production build validation
- **Matrix Testing**: Node.js 18.x and 20.x

### 🚀 Continuous Deployment (CD)

- **Automatic Deployment**: Push to `main` triggers production deploy
- **Preview Deployments**: PRs get preview URLs
- **Performance Monitoring**: Lighthouse audits
- **Rollback Support**: Easy rollback via Vercel dashboard

### 📊 Automated Workflows

- **Dependency Updates**: Weekly automatic dependency updates
- **Status Badges**: Auto-updating README badges
- **Visual Regression**: Percy visual testing (optional)

### Setup Instructions

1. Configure secrets in GitHub repository settings:

   ```
   VERCEL_TOKEN=your_vercel_token
   VERCEL_ORG_ID=your_vercel_org_id
   VERCEL_PROJECT_ID=your_vercel_project_id
   ```

2. Optional integrations:
   ```
   CODECOV_TOKEN=your_codecov_token
   PERCY_TOKEN=your_percy_token
   ```

For detailed CI/CD setup instructions, see [CI/CD Setup Guide](./docs/CI_CD_SETUP.md).

## Deployment

### Vercel (Recommended)

The project is configured for automatic deployment to Vercel:

1. **Automatic**: Push to `main` deploys to production
2. **Preview**: PRs get preview deployments
3. **Manual**: Connect repository to Vercel dashboard

### Manual Deployment

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Technologies Used

- **Next.js** - React framework
- **TypeScript** - Type safety
- **React Query** - Server state management
- **Tailwind CSS** - Utility-first CSS
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## License

This project is licensed under the MIT License.
