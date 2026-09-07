# Wonder · By Hila

A Hebrew RTL portfolio for Hila Orfali's handmade celebration work, presented as an animated scroll, with a private Owner Workspace and Project-bound Testimonials.

## Start here

- Read [the implementation specification](docs/specs/wonder-implementation-spec.md).
- Follow [the build sequence](docs/implementation-plan.md).
- Use [GitHub Issues](https://github.com/Finz24/wonder/issues) to coordinate work.
- The parent specification is [issue #1](https://github.com/Finz24/wonder/issues/1), labelled ready-for-agent.
- Read [repository instructions](AGENTS.md), [domain vocabulary](CONTEXT.md), and relevant [ADRs](docs/adr).

## Approved prototype

The reviewed design source, generated example images, seal, and exact generation prompts are preserved on [prototype/scroll-book](https://github.com/Finz24/wonder/tree/prototype/scroll-book/prototypes/scroll-book). It is a visual reference, with fictional content and temporary state, not the production application.

On that branch, run `node prototypes/scroll-book/serve.mjs`, then open `http://127.0.0.1:4174/` for the scroll or `http://127.0.0.1:4174/owner.html` for Hila's editor. Existing local prototype files are retained and ignored on main so the local demo can continue running.

No production framework, persistent backend, or deployment has been implemented yet.
