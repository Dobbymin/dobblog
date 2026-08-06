<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Skill policy

- For every non-UI feature implementation, load and apply the `ponytail` skill before changing code.
- UI-only styling and layout work is exempt. State, event, data-flow, routing, and other behavior changes are not UI-only.
- If `ponytail` is unavailable, install it from `https://github.com/DietrichGebert/ponytail` before proceeding.

# Architecture

- Do not use FSD. Organize source code first by technical responsibility, then by concern.
- Keep Next.js route files in `src/app`, layout composition in `src/layout`, UI in `src/components`, stateful behavior in `src/hooks`, pure functions in `src/utils`, data and external-library integration in `src/libs`, shared types in `src/types`, and shared constants in `src/constants`.
- Do not create a `logic` directory. Use `hooks`, `utils`, or `libs` according to responsibility.
- Use `libs`, never `lib`.
- Keep route files thin: metadata, params, data lookup, and page composition only.
- Keep `Header` and `Footer` server-side composition in `src/layout`. Put their rendered UI in `src/components/header` and `src/components/footer`.
- Move code to a `common` directory only after at least two sibling concerns share it.
- Keep trivial local state and single-use constants beside their component. Extract effects, DOM event logic, or reusable state to hooks; pure calculations to utils.

# Imports and exports

- Add `index.ts` barrel files to source responsibility and concern directories. Exclude Next.js route directories in `src/app` and article content in `src/content`.
- Barrel files must use `export * from './path'`.
- Import across top-level responsibilities through short aliases such as `@/components`, `@/hooks`, `@/utils`, `@/libs`, `@/types`, `@/constants`, and `@/layout`.
- Within the same top-level responsibility, use relative imports such as `./Component` or `../ui` to prevent a root barrel from importing itself.
- Respect this dependency direction: `app -> layout/components/libs/constants/types`, `layout -> components/libs/constants/types`, `components -> hooks/utils/constants/types`, `hooks -> utils/constants/types`, `libs -> utils/constants/types/content`, `utils -> types`. `constants` and `types` must not import project layers above them.
- Components must receive data through props instead of importing `libs` directly. Hooks must not import components. Lower layers must not import `layout` or `app`.
- Treat an awkward import path as a signal that responsibility or concern placement is wrong. Fix the boundary instead of hiding it with another alias.

# Naming

- Name React component files with PascalCase and other files with kebab-case.
- Hook files are the only exception: use camelCase beginning with `use`, such as `useHeader.ts`.
- Name a component's local props type `Props` and do not export it. Put only genuinely shared domain types in `src/types`.
- Preserve shadcn-generated component internals. When adding a shadcn component, also add its `export * from './component'` entry to `src/components/ui/index.ts`.

# Error prevention

- Inspect the harness and relevant local Next.js documentation before implementation.
- When an implementation mistake or incorrect assumption causes a problem, record the symptom, cause, fix, and prevention rule in `ERROR.md` before continuing.
