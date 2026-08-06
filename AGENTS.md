<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Skill policy

- For every non-UI feature implementation, load and apply the `ponytail` skill before changing code.
- UI-only styling and layout work is exempt. State, event, data-flow, routing, and other behavior changes are not UI-only.
- If `ponytail` is unavailable, install it from `https://github.com/DietrichGebert/ponytail` before proceeding.
