# Wonder v1 implementation brief

This concise discovery brief is expanded by [the tracker-ready implementation specification](wonder-implementation-spec.md). Use the expanded specification when creating implementation tickets.

Status: product and visual direction accepted for implementation on 2026-09-07. This brief uses only the current Wonder discovery and the reviewed prototype. It does not inherit earlier Wonder projects.

## Purpose

Wonder is Hila Orfali's personal Hebrew portfolio. She showcases physical celebration objects and decorations she makes herself, and Visitors contact her through WhatsApp about personalized work for their own Occasion. The portfolio should feel like discovering a beautiful handmade object: warm, personal, realistic, and richly animated.

## Approved reference

The reference is [the scroll prototype and Hila's workspace](https://github.com/Finz24/wonder/tree/prototype/scroll-book/prototypes/scroll-book), including the compact albums, refined wax seal, matching editor theme, and Project Testimonials. See [visual direction](../discovery/visual-direction.md), [domain vocabulary](../../CONTEXT.md), and the decisions in ../adr/.

The prototype establishes appearance and interaction intent. Its CSS mechanics, publicly accessible owner page, in-memory data, fictional content, and demo dialogs are not production implementations. Keep this source intact during the build. Approval of the direction does not establish that physically realistic scroll animation or final mobile pacing is finished.

## Public Portfolio

- Hebrew and right-to-left reading order, with the requested Wonder and By Hila branding. Project descriptions speak in Hila's feminine first-person voice.
- Begin with a closed scroll, Wonder / By Hila, and the wax seal. The first native scroll movement initiates opening.
- The seal has realistic wax texture, varied pastel-red tones, and a handwritten W intertwined with H and O. Use the reviewed raster as the visual reference, with suitable smaller assets for interface uses.
- Every Published Project appears within the scroll in Hila's chosen order. No search bar or separate public Project index.
- A Project contains a title, description, cover, and one or more ordered photographs. A single-photo Project uses the same layout without unnecessary gallery controls.
- Main photographs stay compact and share the chapter with the story. Album thumbnails allow deliberate photo selection within the chapter; do not automatically advance them.
- A stable Project link opens its chapter inside the scroll. It must not require replaying the opening to reach shared work.
- Published Testimonials appear within their attached Project, using the reviewed expandable presentation. Private, pending, and deleted submissions do not appear.
- Closing motion leads to readable contact information. WhatsApp remains available throughout, with editable message context and the relevant Project link where appropriate.
- Client stories are anonymous and Client faces are not published.
- Preserve native scrolling, keyboard operation, readable content, touch access, reduced motion, and a static fallback. The motion must not make text or contact actions inaccessible.

## Hila's Owner Workspace

- Only Hila can access the working editor. No public registration, Client accounts, or additional editorial roles are needed.
- Match the Portfolio's parchment forms, rose atmosphere, wax-red actions, and typography while retaining calm forms and straightforward controls.
- Create and edit Projects; upload images; choose a cover; arrange and remove album images; arrange the public Project sequence.
- Save changes privately. Preview uses the actual public presentation, including that Project's published Testimonials.
- Publishing deliberately replaces the visible Project version. Saving or previewing must not change the currently published content.
- Archive a Project to remove it from public presentation while retaining it privately. Keep Draft, Preview, Published, and Archived distinctions visible in language and controls; Preview is a view, not a required database state.
- Show pending Testimonials and let Hila publish, unpublish, or delete them. Never expose text editing, including typo correction.

## Testimonial invitations

- Hila creates a private invitation tied to a specific Project and sends its link herself.
- A Client submits their own words without signing in or selecting a Project.
- Each invitation accepts exactly one submission. Repeated or simultaneous submissions must not produce multiple Testimonials.
- A submitted Testimonial is private until Hila publishes it. Hila cannot edit its words.
- Unpublishing retains the text privately. Deletion removes it from ordinary application access and public presentation.
- A Testimonial is visible publicly only when both it and its attached Project are published. Archiving a Project must not expose an orphaned Testimonial.

## Boundaries

- Service inquiries and conversations continue in WhatsApp. There is no on-site inquiry form, ordering, checkout, pricing calculator, or internal chat.
- Delivery planning is outside scope for now.
- Public brand/contact details should be configurable. Only WhatsApp is confirmed; do not invent additional contact accounts.
- Generated Project imagery, stories, and quotes are demonstration content and must remain labelled as such. They cannot launch as Hila's real work or real endorsements.
- No invented launch inventory requirement or pricing policy: these do not block implementing the approved Portfolio workflow.

## Implementation acceptance

1. Hila signs in, creates a Project, uploads two images, saves a Draft, and can return after a restart without losing it.
2. Hila previews the Draft in the scroll; an anonymous Visitor cannot read the Draft, its private media, or the preview.
3. Publishing exposes the intended text, cover, and album in the selected order. Subsequent Draft edits leave that public version unchanged until published.
4. Direct Project links, album thumbnails, native scroll controls, and WhatsApp context work on desktop and mobile.
5. An invitation submits once, remains Project-bound, and creates a private immutable Testimonial. Publishing and unpublishing affect its public chapter appropriately.
6. An anonymous or invited Client cannot invoke owner actions, enumerate private content, or edit submitted Testimonial text.
7. Motion-disabled and low-capability presentation preserves the same Projects, Testimonials, and contact route.
8. Launch content, owner identity, contact number, hosting configuration, and recovery procedure are verified before public deployment.

## Inputs still needed before launch

Hila's sign-in identity, WhatsApp number, real portfolio content, and hosting/domain ownership. Framework, authentication, media storage, and hosting choices must be made explicitly for this new project during technical setup; none is inherited from previous Wonder work. These inputs do not prevent local development using labelled fixtures.
