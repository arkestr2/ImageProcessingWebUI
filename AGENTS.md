# AGENTS.md

## Stack

- React 19 + TypeScript 6 + Vite 8
- Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- ESLint with typescript-eslint and @eslint-react — config: `eslint.config.js`
- React Compiler enabled via `@rolldown/plugin-babel`

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc -b && vite build` (typecheck then build)
- `npm run lint` — ESLint (config is in `eslint.config.js`)
- `npm run preview` — preview production build

No test framework is configured. Do not add tests unless asked.

## TypeScript

- `verbatimModuleSyntax: true` — use `import type` for type-only imports
- `erasableSyntaxOnly: true` — no `enum`, use `as const` or union types instead
- `noUnusedLocals` / `noUnusedParameters` — strict unused checks
- Config split: `tsconfig.app.json` (src) and `tsconfig.node.json` (vite config)

## Project Structure

```
src/
  api/            — API client (fetch wrapper)
  dto/            — API response shapes (snake_case from server)
  models/         — Domain models (camelCase for frontend)
  mappers/        — Functions: DTO → Model
  services/       — Business logic (calls API, maps to models)
  components/     — React components
```

## Architecture Flow

```
API response (DTO)  →  service  →  mapper  →  model  →  component
```

- Components never import DTOs — they only use models
- Services handle API calls and mapping
- Mappers convert snake_case DTOs to camelCase models

## File Naming

- Kebab-case for all files: `processor.mapper.ts`, `processor.service.ts`
- PascalCase only for React components: `Header.tsx`, `ProcessorList.tsx`

## API Client

`src/api/client.ts` — thin wrapper around `fetch`. Env var `VITE_API_BASE_URL` from `.env` (gitignored, defaults to `http://localhost:8000`).

## Linting

ESLint, not Oxlint. Rules are in `eslint.config.js`. Do not create `.eslintrc` or add ESLint dependencies.
