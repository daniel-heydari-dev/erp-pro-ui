# Component Architecture

This folder is the source of truth for reusable UI building blocks in `erp-pro-ui`.

Use this structure for all new components and for any component you refactor.

## Goals

- Keep component folders predictable.
- Keep stories close to the component they document.
- Keep public exports stable through `packages/ui/src/index.ts`.
- Prefer small focused modules over large component files with mixed concerns.

## Target Folder Shape

```text
components/
  basics/
    component-name/
      ComponentName.tsx
      ComponentName.stories.tsx
      types.ts
      index.ts
      ComponentName.test.tsx
```

## Rules

- Use `kebab-case` for folder names.
- Use one public component per folder.
- Author source types in `types.ts`, not `types.d.ts`.
- Use `index.ts` as the local entrypoint for each component folder.
- Keep Storybook stories next to the component they describe.
- Import cross-component helpers from shared modules instead of duplicating story or UI scaffolding.

## Storybook Taxonomy

Use stable top-level story groups so Storybook stays navigable as the library grows.

- `Foundations/*` for theme, tokens, and typography primitives.
- `Forms/*` for input controls and form composition.
- `Data Display/*` for tables, cards, chips, and charts.
- `Overlays/*` for dialog, drawer, tooltip, and hover surfaces.
- `Feedback/*` for alert, toast, loading, and empty states.
- `Visuals/*` for animation-heavy or decorative components.

## Migration Notes

- Legacy folder names should be normalized to kebab-case when touched.
- Root-level component files under `components/` should be treated as dead code unless they are exported from `packages/ui/src/index.ts`.
- Large naming migrations should be handled deliberately because they affect package exports and subpath imports.
