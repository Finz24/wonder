# Wonder implementation sequence

The user accepted the refined prototype and requested the next phase on 2026-09-07. Build against [the implementation specification](specs/wonder-implementation-spec.md), preserving the prototype as a visual reference. The public GitHub repository and issue tracker are configured; no application deployment has been made.

## 1. One real Project, end to end

Choose and document the application, authentication, data, media, and hosting foundation using current documentation. Establish a local development setup with labelled fixtures. Implement Hila-only access, one durable Project with an image, private Draft editing, preview, deliberate publication, and a public scroll chapter.

Review result: Hila can save, leave, return, preview, and publish one Project; Visitors see only the published version. This is the first working increment, not a static recreation of the prototype.

## 2. Complete the Portfolio and editing experience

Implement albums, cover choice, image ordering, Project ordering, archival, stable Project links, and contextual WhatsApp actions. Apply shared typography, colors, paper surfaces, and seal assets to the scroll and Owner Workspace. Improve the scroll's opening and closing mechanics against the accepted visual reference, with native scroll and reduced-motion/static alternatives.

Review result: a coherent portfolio containing several Projects, editable by Hila, with compact photography, working album previews, and contact context.

## 3. Complete the Client-to-Testimonial loop

Create private Project-bound invitations, a Client submission view, one-use enforcement, pending review, publication, unpublication, and deletion. Include only published Testimonials in public chapters and Hila's actual preview; prevent text rewriting.

Review result: send a local test invitation, submit once, approve it as Hila, see it on the Project, then unpublish it.

## 4. Validate and prepare for launch

Check access boundaries, publication isolation, media handling, direct links, accessibility, mobile performance, and motion fallbacks. Replace or clearly segregate generated fixtures. Configure Hila's identity and WhatsApp number, document backups and recovery, and prepare the deployment for the chosen hosting account.

Review result: a working release with real content and a documented, recoverable deployment. Public deployment follows the user's release instruction.

## Current handoff

Discovery and visual prototyping are complete enough to begin increment 1. The current repository contains documentation and a standalone prototype; there is no production application, durable storage, authentication, chosen stack, or deployment yet. No implementation increment is marked complete by this plan.
