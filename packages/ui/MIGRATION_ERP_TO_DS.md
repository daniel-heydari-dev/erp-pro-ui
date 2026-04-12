# ERP To DS Migration Note

This guide helps migrate legacy `--erp-*` token usage to canonical `--ds-*` tokens with no visual regressions.

## Goal

- Source of truth: `--ds-*`
- Legacy compatibility: `--erp-*` stays available short-term via the internal bridge imported by `erp-pro-ui/tokens.css`

## Safe import strategy

- Preferred: `@import "erp-pro-ui/styles.css";`
- If importing tokens manually:
  - `@import "erp-pro-ui/tokens.css";`
  - this already includes the internal ERP compatibility bridge

## Mapping (common)

- `--erp-color-primary` -> `--ds-brand-primary`
- `--erp-color-secondary` -> `--ds-brand-secondary`
- `--erp-color-background-primary` -> `--ds-color-bg-canvas`
- `--erp-color-background-secondary` -> `--ds-color-bg-surface`
- `--erp-color-background-tertiary` -> `--ds-color-bg-elevated`
- `--erp-color-text-primary` -> `--ds-text-1`
- `--erp-color-text-secondary` -> `--ds-text-2`
- `--erp-color-text-tertiary` -> `--ds-text-3`
- `--erp-color-border-primary` -> `--ds-border-1`
- `--erp-color-border-secondary` -> `--ds-border-2`
- `--erp-color-border-tertiary` -> `--ds-border-3`
- `--erp-color-success` -> `--ds-color-success`
- `--erp-color-warning` -> `--ds-color-warning`
- `--erp-color-error` -> `--ds-color-danger`
- `--erp-color-info` -> `--ds-color-info`

## Grep checklist

```bash
rg -n -- "--erp-" src
rg -n -- "var\\(--erp-" src
```

## AI prompt template

```text
Migrate this app from legacy ERP CSS variables (--erp-*) to canonical DS tokens (--ds-*), without changing visual output.

Rules:
1) Replace all --erp-* usage in source files using semantic DS equivalents.
2) Keep importing erp-pro-ui/styles.css or erp-pro-ui/tokens.css during migration.
3) Do not change behavior, spacing, typography, or component states.
4) Update docs/comments to mark --erp-* deprecated.
5) Return:
   - changed files
   - remaining grep matches for --erp-
   - risky/manual-check spots
```
