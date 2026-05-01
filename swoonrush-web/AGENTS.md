<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Import Order (enforced by `@ianvs/prettier-plugin-sort-imports`)

```typescript
// 1. React
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
// 2. Next.js / Core (Adapted from React Native for this Next.js project)
import Link from 'next/link';
// 3. Third-party packages (alphabetical within group)
import { motion } from 'framer-motion';
import { Shirt, Sparkles } from 'lucide-react';

import ProductCard from '@/components/ProductCard';
// 4. blank line then internal aliases (@…)
import { HERO_CONTENT } from '@/constants';

// 5. blank line then relative imports
import { formatPrice } from './utils';
```

Run `npm run lint:fix` (or `npx prettier --write .` and `npm run lint -- --fix`) after every change to auto-sort imports.

---

## Components

### Rules

- **Functional components only** — the single exception is `ErrorBoundary` (class component, must stay that way).
- Always type with `React.FC` or explicit return type when defining standard components. Next.js pages/layouts can use their standard types or infer return type.
- Pass navigation props explicitly if used.
- Never use `any` (ESLint warns; prefer `unknown` with narrowing).

### Pattern

```tsx
import React, { useMemo } from 'react';
import Link from 'next/link';

import { ThemeColors } from '@/constants';
import { useLocale, useTheme } from '@/hooks';

interface Props {
  title: string;
}

const ExampleComponent: React.FC<Props> = ({ title }) => {
  const { colors } = useTheme();
  const { t } = useLocale();

  return (
    <div style={{ backgroundColor: colors.background }}>
      <h1>
        {t('example.title')}: {title}
      </h1>
    </div>
  );
};

export default ExampleComponent;
```

---

## ESLint Rules (summary)

| Rule                                 | Setting                                                |
| ------------------------------------ | ------------------------------------------------------ |
| `prettier/prettier`                  | `error`                                                |
| `react/react-in-jsx-scope`           | `off` (no manual React import needed)                  |
| `react/prop-types`                   | `off` (TypeScript handles this)                        |
| `@typescript-eslint/no-explicit-any` | `warn`                                                 |
| `@typescript-eslint/no-unused-vars`  | `error` (args prefixed `_` are OK)                     |
| `react-hooks/rules-of-hooks`         | `error`                                                |
| `react-hooks/exhaustive-deps`        | `warn`                                                 |
| `no-console`                         | `warn` — only `console.warn` / `console.error` allowed |

Config files (`*.config.js`, `babel.config.js`, `metro.config.js`, `jest.config.js`), `android/`, `ios/`, `node_modules/` are all ignored by ESLint.

---
