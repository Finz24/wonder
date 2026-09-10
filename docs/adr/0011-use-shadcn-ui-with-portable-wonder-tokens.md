# Use shadcn/ui with portable Wonder tokens

## Decision

Use shadcn/ui's open-code components with Base UI primitives as Wonder's React component foundation. Keep Wonder's primitive brand tokens in CSS custom properties, then map them into shadcn's semantic tokens. The current Next.js application owns the generated component source under `src/components/ui`.

Preserve the public Portfolio's authored visual language by composing and theming primitives instead of adopting a generic dashboard theme. Use shadcn components for repeatable structure and accessible interaction behavior; keep domain-specific Portfolio composition in Wonder-owned components and pages.

Treat cross-framework support as portability of design tokens, component anatomy, interaction specifications, and content vocabulary—not direct reuse of React `.tsx` files. Add a framework-specific implementation only when another client exists rather than creating speculative Vue or Svelte packages now.

## Context

The Creator selected shadcn/ui after comparing Ark UI, shadcn/ui, Web Awesome, and daisyUI. shadcn/ui provides the strongest fit for the current Next.js and React application because its component source is locally owned, its current tooling supports RTL, and its semantic token model allows Wonder to retain a distinctive design.

This choice optimizes the active product rather than promising a false cross-framework abstraction. A future non-React client can reuse the framework-neutral Wonder tokens and documented behavior while implementing native components for that framework.
