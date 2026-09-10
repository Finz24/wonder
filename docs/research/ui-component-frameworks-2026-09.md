# UI component framework options for Wonder

Research date: 2026-09-09

## Decision in one page

Wonder is currently a Next.js 16 / React 19 application. It is a Hebrew-first, RTL, highly visual Portfolio rather than a generic administration product. The component foundation therefore needs accessible interaction behavior without imposing a generic visual identity, while leaving a credible path to other frontend frameworks.

There is no single objectively “best” component framework. Under Wonder's stated requirements, **Ark UI is the preferred option**. It provides headless, accessible component primitives through official React, Vue, Svelte, and Solid adapters, while Wonder continues to own its visual language. Choose **shadcn/ui** instead if excellent React/Next.js ergonomics and owned source code matter more than formal multi-framework support. Choose **Web Awesome** only if reusing the exact compiled components across frameworks is the overriding requirement.

| Option | What is portable | Accessibility behavior | RTL | Styling ownership | Fit for Wonder |
| --- | --- | --- | --- | --- | --- |
| **Ark UI** | Common component model and behavior through separate React, Vue, Svelte, and Solid adapters | Headless accessible primitives built on Zag.js state machines | Locale/direction APIs and component `dir` support | Excellent; presentation is application-owned | **Preferred under the stated multi-framework requirement** |
| **shadcn/ui** | Design conventions, registry format, and source distribution; official UI output is primarily React | Accessible primitives can use Base UI, React Aria, or Radix | First-class RTL tooling and logical-property migration | Excellent; component source is copied into the application | Best current React/Next.js developer experience, but not one multi-framework component implementation |
| **Web Awesome** | The same standards-based custom elements run across frameworks and plain HTML | Components are built with accessibility in mind; application-level validation remains required | Localization and `dir` support | Good through tokens, CSS properties, and CSS parts; less direct than headless normal DOM | Best for literal implementation reuse, with newer SSR integration and Shadow DOM tradeoffs |
| **daisyUI** | The same CSS classes can be used with any framework | Mostly CSS; correct semantics, ARIA, keyboard behavior, and additional JavaScript remain the application’s responsibility | Native runtime RTL via logical CSS properties | Fast theming, but stronger default visual language | Useful for broad CSS portability and speed, weaker for Wonder's bespoke interaction and accessibility needs |

## The crucial distinction: what does “support multiple frameworks” mean?

These are different architectural promises:

```text
portable design system
  tokens + CSS + anatomy + behavior specification
  React implementation
  Vue implementation
  Svelte implementation

shared implementation
  one standards-based custom element
  React consumes <wa-dialog>
  Vue consumes <wa-dialog>
  Svelte consumes <wa-dialog>
```

The first approach keeps the brand and behavior consistent but still has framework-specific component code. Ark UI is strongest here: the adapters share the underlying Zag.js behavior model, but React, Vue, Svelte, and Solid applications import different packages and render framework-native templates. shadcn/ui can also preserve tokens and component specifications, but its installed UI source is React-oriented.

The second approach literally reuses the compiled component. Standards-based Web Components such as Web Awesome provide that, at the cost of Shadow DOM styling boundaries, framework integration details, and a younger server-rendering path.

daisyUI shares neither interactive implementation nor behavior: it shares CSS class names. That is highly portable, but the application still owns interactive state, ARIA, focus management, and keyboard behavior.

## What is current in 2026

The direction visible across the current official offerings is toward **headless or open-code primitives plus application-owned tokens**, rather than a visually prescriptive library that defines the product's identity. This is an inference from the products' own architectures, not a popularity ranking:

- Ark UI explicitly leaves presentation to the application and exposes component parts and states for styling.
- shadcn/ui describes itself as open code and a distribution system rather than a conventional installed component library. As of July 2026 it supports Base UI, React Aria, and Radix as alternative React primitive foundations, with Base UI the default for new projects.
- Web Awesome uses standards-based custom elements and exposes a theming/token surface for cross-framework use.
- daisyUI deliberately remains a CSS component layer usable wherever CSS works.

This direction suits Wonder: its public Portfolio should look authored and expressive, while conventional controls in the future Owner Workspace should remain predictable and accessible.

## Option A — Ark UI (preferred)

Ark UI is a headless library built on Zag.js finite-state machines. Its official documentation describes more than 40 accessible primitives and official React, Solid, Vue, and Svelte support. It exposes component anatomy through `data-scope`, `data-part`, and state attributes and works with ordinary CSS, Tailwind CSS, Panda CSS, or another styling layer.

Why it fits:

- It takes “multiple frameworks” seriously at the behavior/API level rather than only at the CSS level.
- Its React adapter works for the current Next.js application, while later Vue/Svelte/Solid clients can follow the same component concepts.
- It does not impose a dashboard-like theme on Wonder's editorial Portfolio.
- `LocaleProvider` derives direction from the locale, and relevant components expose `dir="rtl"`; Wonder should retain `lang="he"` and `dir="rtl"` at the document root and set the Ark locale explicitly.

Costs:

- Wonder must design and maintain its own visual recipes, tokens, focus treatments, and responsive styling.
- Framework adapters are separate implementations at the rendering layer. Ark does not make a React component directly importable into Vue or Svelte.
- Accessible primitives reduce risk but do not replace application-level automated and assistive-technology testing.

Primary sources: [Ark UI overview](https://ark-ui.com/docs/overview/about), [getting started](https://ark-ui.com/docs/overview/getting-started), [styling](https://ark-ui.com/docs/guides/styling), [locale](https://ark-ui.com/docs/utilities/locale), and [RTL example/API](https://ark-ui.com/docs/components/date-input).

## Option B — shadcn/ui

shadcn/ui copies component source into the application instead of hiding the top layer behind a package API. This gives Wonder unusually strong ownership: components can be simplified, restyled, and tested as first-party code. Its current tooling has first-class RTL support, including logical-property conversion and direction providers. Current shadcn/ui supports Base UI, React Aria, and Radix foundations; Base UI is the default for new projects as of July 2026.

Why it fits:

- It is exceptionally practical for the existing React/Next.js codebase.
- Owned source is valuable for Wonder's highly specific art direction and progressive enhancement.
- It provides strong defaults for formal Owner Workspace controls without forcing those defaults onto the immersive public Portfolio.
- First-class RTL tooling explicitly targets Hebrew and other right-to-left languages.

Costs:

- The installed component implementations are React source. The registry is cross-project and can distribute arbitrary files, but that does **not** make one React implementation reusable in Vue or Svelte.
- Because the app owns copied source, upstream improvements are not ordinary package upgrades; changes must be reviewed and merged into local components.
- Portability to another framework would come from shared design tokens/specifications and a new framework-specific component layer.

Primary sources: [shadcn/ui introduction and open-code model](https://ui.shadcn.com/docs), [RTL support](https://ui.shadcn.com/docs/rtl), [registry schema](https://ui.shadcn.com/docs/registry/registry-json), [Base UI default announcement](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default), and [React Aria support](https://ui.shadcn.com/docs/changelog/2026-07-react-aria).

## Option C — Web Awesome

Web Awesome is a Lit-based Web Components system. The same `wa-*` custom elements can be consumed from React, Vue, Angular, Svelte, or plain HTML, which is the clearest answer if “multiple frameworks” means one compiled implementation. It provides React 19 integration, TypeScript JSX types, localization, design tokens, CSS custom properties, and CSS parts.

Why it fits:

- It offers the strongest literal cross-framework implementation reuse.
- React 19 handles custom elements natively.
- The component set includes accessible interaction work and a consistent theming surface.

Costs:

- Shadow DOM intentionally limits deep styling. Tokens and CSS parts are clean extension points, but headless components offer more freedom for Wonder's distinctive visual language.
- Server rendering for the full library is comparatively young: the official changelog records experimental all-component SSR in 3.8.0 and a dedicated SSR entry point plus fixes in 3.9.0. That deserves a proof-of-concept before adopting it in a Next.js SSR-first application.
- Framework-specific event typing, form integration, hydration, and browser-oriented test setup add integration work.
- The project itself correctly warns that Web Components and assistive-technology support continue to evolve; accessibility still needs product-level testing.

Primary sources: [Web Awesome usage](https://webawesome.com/docs/usage), [React integration](https://webawesome.com/docs/frameworks/react), [server rendering](https://webawesome.com/docs/ssr), [localization and direction](https://webawesome.com/docs/localization), [customization](https://webawesome.com/docs/customizing), [accessibility commitment](https://webawesome.com/docs/resources/accessibility), and [changelog](https://webawesome.com/docs/resources/changelog).

## Option D — daisyUI

daisyUI is a CSS component layer built around semantic class names and commonly used with Tailwind CSS. Because it is CSS, the same classes work in essentially every frontend framework. Version 5 uses Tailwind CSS 4 when installed as a Tailwind plugin, although its compiled CSS can also be used standalone. Its components support runtime LTR/RTL through logical CSS properties.

Why it fits:

- It provides the broadest low-friction styling portability.
- Themes and semantic colors make it fast to establish a consistent conventional interface.
- It can coexist with framework-native semantics and behavior.

Costs:

- It is primarily CSS, not a headless behavioral primitive system. The application remains responsible for state, keyboard interaction, focus management, and contextual ARIA for complex controls.
- Its visual defaults can make an authored celebration Portfolio feel more template-like unless Wonder overrides them substantially.
- It offers less leverage than Ark UI or shadcn/ui for complex interactive controls in the Owner Workspace.

Primary sources: [daisyUI introduction and framework model](https://daisyui.com/docs/intro/), [official v5 installation guidance](https://github.com/saadeghi/daisyui/blob/master/skills/daisyui/install/SKILL.md), [themes](https://daisyui.com/docs/themes/), and [official maintainer explanation of the CSS/accessibility boundary](https://github.com/saadeghi/daisyui/discussions/3135).

## Recommendation and choices

### 1. Ark UI + Wonder-owned tokens and recipes — recommended

Choose this if support for React, Vue, Svelte, and Solid is a real architectural requirement. Refactor the current page using Ark's React adapter, then keep these portable assets framework-neutral:

```text
design-system/
├── tokens.css              # color, type, spacing, motion, elevation
├── component-contracts.md  # anatomy, states, keyboard and RTL behavior
├── react/                  # Ark React composition for Next.js
├── vue/                    # added only if a Vue client exists
└── svelte/                 # added only if a Svelte client exists
```

Do not build speculative Vue/Svelte packages now. Establish portable tokens and contracts; add adapters only when a second application exists.

### 2. shadcn/ui + framework-neutral design tokens

Choose this if Wonder will remain Next.js/React for the foreseeable future and “support multiple frameworks” means that its brand/design system must be portable later. It offers the fastest path to polished, accessible React controls and the strongest local code ownership. The future port would reuse tokens and specifications, not `.tsx` component code.

### 3. Web Awesome proof-of-concept

Choose this if the same runtime component implementation must be shared across React, Vue, Svelte, Angular, and non-framework pages. Before committing, prototype the hardest seam in Wonder: a server-rendered, Hebrew RTL dialog/form inside Next.js, then verify hydration, form submission, keyboard navigation, and Playwright behavior.

### Why daisyUI is not shortlisted

daisyUI is a good cross-framework CSS choice, but it does not address complex interaction behavior and accessibility as completely as Ark UI or shadcn/ui, and its predesigned visual language is less aligned with Wonder's authored editorial direction. It remains a reasonable choice if implementation speed and CSS portability outweigh those concerns.

## Decision needed from the owner

Pick one interpretation of the requirement:

1. **Ark UI:** consistent accessible behavior and design across React/Vue/Svelte/Solid, with framework-specific adapters.
2. **shadcn/ui:** best React/Next.js ownership and ergonomics now, with portable tokens/specifications rather than portable component code.
3. **Web Awesome:** the same compiled Web Components across frameworks, accepting newer SSR integration and less direct styling.

No UI refactor should begin until this choice is explicit, because switching between these foundations later would rewrite component structure, tests, and styling seams.
