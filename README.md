# Production-Ready Monorepo Template

A robust, reusable monorepo template powered by **pnpm workspaces**, **Turborepo**, and **TypeScript**.  
Includes a **React + Vite + Tailwind v4 web app**, an **Express API**, and **Storybook** wired to a shared UI package.

---

## Tech Stack

- **Package Manager**: pnpm
- **Monorepo Tooling**: Turborepo
- **Frontend**: React + Vite + Tailwind CSS v4
- **Backend API**: Node.js + Express
- **Component Docs**: Storybook
- **Linting/Formatting**: ESLint (Flat Config) + Prettier

---

## Folder Structure

```text
.
├── apps/
│   ├── api/              # Node.js + Express API
│   ├── storybook/        # Storybook for UI components
│   └── web/              # React + Vite web app
├── packages/
│   ├── eslint-config/    # Shared ESLint config
│   ├── prettier-config/  # Shared Prettier config
│   ├── shared/           # Shared TS utilities/types
│   ├── tsconfig/         # Shared base TS configs
│   └── ui/               # Shared React UI components
├── package.json
├── turbo.json
└── pnpm-workspace.yaml
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- [pnpm](https://pnpm.io/) (v9+)

### Installation

```bash
pnpm install
```

### Development

Run all applications in development mode (API + Web):

```bash
pnpm dev
```

Run specific apps:

```bash
pnpm dev:web    # React Web App (localhost:3000)
pnpm dev:api    # Express API (localhost:3001)
pnpm storybook  # Storybook (localhost:6006)
```

Web: http://localhost:3000

API: http://localhost:3001

Storybook: http://localhost:6006

### Other Commands

- `pnpm build`: Build all apps and packages
- `pnpm lint`: Lint the entire project
- `pnpm typecheck`: Run typechecking across the repo
- `pnpm format`: Format all files with Prettier
- `pnpm clean`: Remove build outputs and node_modules

---

## Path Aliases

Both the **web** app and **storybook** support path aliases for cleaner imports:

| Alias | Path |
|-------|------|
| `@/*` | `./src/*` |

### Usage Example

```tsx
// Instead of relative imports like this:
import { Button } from '../../../components/Button';

// Use the @ alias:
import { Button } from '@/components/Button';
```

This is configured in:
- `tsconfig.json` - TypeScript path mapping
- `vite.config.ts` / `.storybook/main.ts` - Vite resolve aliases
