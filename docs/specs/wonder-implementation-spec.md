# Implement Wonder: Hila's scroll Portfolio and private Owner Workspace

## Problem Statement

Hila Orfali needs a personal place to proudly present the celebration objects and decorations she makes, help Visitors imagine something for their own Occasion, and invite them into a direct WhatsApp conversation. She needs to independently maintain her work and publish Client Testimonials without depending on a developer for everyday content changes.

The approved prototype establishes the experience but cannot serve that purpose yet: content and editorial actions are temporary, the owner page is not protected, invitations are simulated, and contact details are unconfigured.

## Solution

Build Wonder as a Hebrew, right-to-left Portfolio that unfolds like a realistic animated scroll. Visitors discover all Published Projects inside the scroll, with compact photography, selectable album previews, Hila's first-person descriptions, and Project-bound Testimonials. The ending presents contact methods, with WhatsApp available throughout.

Give Hila a calm Owner Workspace using the same parchment shapes, rose atmosphere, wax-red accents, and typography. She creates, edits, previews, publishes, orders, and archives Projects. She sends private, single-submission Testimonial Invitations and decides whether to publish, unpublish, or delete each submission without editing its words.

## User Stories

1. As a Visitor, I want to see Wonder, By Hila, and the wax seal on the closed scroll, so that I immediately recognize the Creator's identity.
2. As a Visitor, I want my first scroll movement to open the scroll, so that exploring the work feels tactile and personal.
3. As a Visitor, I want realistic paper, rollers, shadows, and unfolding motion, so that the Portfolio feels like a crafted object.
4. As a Visitor, I want ordinary vertical scrolling to remain under my control, so that I can explore at my own pace.
5. As a Visitor, I want every Published Project to be discoverable within the scroll, so that I can explore the whole Portfolio without a separate catalogue or search page.
6. As a Visitor, I want Projects presented in Hila's chosen sequence, so that the work forms an intentional journey.
7. As a Visitor, I want Hebrew text and natural right-to-left layouts, so that reading and interacting feel familiar.
8. As a Visitor, I want Hila's descriptions in her feminine first-person voice, so that I feel the person behind the work.
9. As a Visitor, I want to understand what Hila made and what makes it special, so that I can imagine her creating something for my Occasion.
10. As a Visitor, I want to see a Project title, description, and cover photograph together, so that I can understand the work without a photograph consuming the entire screen.
11. As a Visitor, I want smaller selectable previews of additional Project photographs, so that I can inspect details while staying inside its chapter.
12. As a Visitor, I want the selected album image and selection state to be clear, so that I know which photograph I am viewing.
13. As a Visitor, I want to choose when an album changes images, so that I can examine the work without automatic advancement.
14. As a Visitor, I want a single-photo Project to look complete, so that simple work is represented without empty gallery controls.
15. As a Visitor, I want each Project to have a shareable link, so that I can return to or discuss the work that inspired me.
16. As a Visitor, I want a shared link to open the corresponding chapter, so that I do not need to repeat the full opening journey.
17. As a Visitor, I want approved Testimonials alongside their Projects, so that I can relate feedback to the work it describes.
18. As a Visitor, I want to expand or collapse the Project's Testimonials, so that I can choose how much to read.
19. As a Visitor, I want Projects without Testimonials to remain well composed, so that missing optional feedback does not feel like missing work.
20. As a Visitor, I want anonymous stories and Testimonials, so that viewing the Portfolio does not depend on exposing Clients' identities or faces.
21. As a Visitor, I want a persistent WhatsApp contact action, so that I can contact Hila whenever inspiration arrives.
22. As a Visitor, I want a Project's WhatsApp action to include its link in an editable message, so that I can show Hila what inspired me.
23. As a Visitor, I want a general WhatsApp action without a Project requirement, so that I can describe a new idea.
24. As a Visitor, I want the closing scene to keep contact methods readable and usable, so that the animation leads naturally into conversation.
25. As a Visitor, I want to understand that I am enquiring about personalized work, so that a photograph is not mistaken for a fixed purchasable item.
26. As a mobile Visitor, I want compact images and readable text within the scroll, so that the Portfolio works on a narrow screen.
27. As a keyboard Visitor, I want visible focus and operable albums, Testimonials, and contact actions, so that I can explore without a pointer.
28. As a Visitor who prefers reduced motion, I want a quieter presentation of the same content, so that I can comfortably explore the Portfolio.
29. As a Visitor on a less capable device, I want a static scroll presentation when needed, so that animation limitations do not hide the work.
30. As a Visitor, I want useful image descriptions and logical reading order, so that assistive technology can explain the Projects.
31. As a Visitor, I want the Portfolio to remain silent by default, so that opening it does not unexpectedly play audio.
32. As a Visitor, I want a useful outcome for an unavailable Project link, so that I can return to the remaining Portfolio without seeing private content.
33. As Hila, I want to sign into my private Owner Workspace, so that only I can change the Portfolio.
34. As Hila, I want protected access to every editorial operation, so that hiding a page is not the only barrier to unauthorized changes.
35. As Hila, I want a calm editing layout in Wonder's colors, shapes, and fonts, so that managing my work feels coherent and comfortable.
36. As Hila, I want to create a Project with a title, description, and photographs, so that I can showcase new work independently.
37. As Hila, I want the same Project form for one photograph or an album, so that I do not need to classify simple and grouped work differently.
38. As Hila, I want to group photographs from one Occasion or a shared theme, so that the Portfolio reflects how I want to tell the story.
39. As Hila, I want to upload and preview photographs, so that I can choose how my work is represented.
40. As Hila, I want to select the cover photograph, so that each Project begins with the image I consider strongest.
41. As Hila, I want to rearrange album photographs, so that their sequence supports the Project's story.
42. As Hila, I want to remove photographs from an unpublished edit, so that I can refine an album before changing the public presentation.
43. As Hila, I want optional photo captions and accessible image descriptions, so that I can provide context without writing a caption for every image.
44. As Hila, I want to save an incomplete Draft, so that I can prepare work over more than one sitting.
45. As Hila, I want saved content and media to survive leaving and restarting the application, so that my work is not lost.
46. As Hila, I want a preview using the actual public scroll presentation, so that I can judge a Project before publishing.
47. As Hila, I want only published Project Testimonials included in that preview, so that it reflects what Visitors will see.
48. As Hila, I want private Draft changes to remain separate from the published version, so that saving or previewing does not expose unfinished content.
49. As Hila, I want deliberate publication with clear confirmation, so that I know when a Project becomes public.
50. As Hila, I want publication to require a title, description, cover, and at least one photograph, so that public Projects are complete.
51. As Hila, I want to reorder Published Projects, so that the scroll follows my preferred sequence.
52. As Hila, I want to archive a Project while retaining it privately, so that I can curate the public Portfolio without discarding my work.
53. As Hila, I want clear Draft, Preview, Published, and Archived terminology, so that I understand what is visible to Visitors.
54. As Hila, I want clear saved and unsaved feedback, so that I know whether my editing work has been retained.
55. As Hila, I want to use the Owner Workspace on a phone, so that a desktop computer is not required for routine changes.
56. As Hila, I want to create a Testimonial Invitation for a selected Project, so that Client feedback is attached to the right work.
57. As Hila, I want to copy and personally send the invitation link, so that I choose whom to invite and communicate in my usual way.
58. As a Client, I want the invitation to identify the Project, so that I know which work I am commenting on.
59. As a Client, I want to submit my own words without creating an account, so that giving feedback is straightforward.
60. As a Client, I want to understand that my words may be published anonymously after approval, so that I know what submission means.
61. As a Client, I want a confirmation after submission, so that I know my Testimonial reached Hila.
62. As a Client, I want an already-used invitation to clearly say it has been used, so that I do not accidentally send duplicates.
63. As Hila, I want each invitation to accept only one submission, including simultaneous retries, so that a private request does not become an open comment channel.
64. As Hila, I want new Testimonials to remain private until I approve them, so that I control public presentation.
65. As Hila, I want pending Testimonials shown with their attached Projects, so that I can review them in context.
66. As Hila, I want to publish a Testimonial without changing its words, so that it retains the Client's authorship.
67. As Hila, I want to unpublish a Testimonial while keeping it privately, so that I can change its visibility reversibly.
68. As Hila, I want to delete an unwanted Testimonial after confirming the action, so that I can remove it from the application.
69. As a Client, I want my submitted words to remain unchanged by Hila, so that a public Testimonial is still my statement.
70. As Hila, I want an archived Project's Testimonials excluded from public presentation, so that feedback is not left detached from its Project.
71. As Hila, I want private invitations and submission access to grant no editorial privileges, so that Clients cannot access the Owner Workspace.
72. As Hila, I want the WhatsApp number and public contact wording to be configurable, so that contact information can remain accurate.
73. As Hila, I want example Projects and quotes unmistakably identified during development, so that generated fixtures are never represented as my real work or Client endorsements.
74. As Hila, I want a verified recovery process for saved content and media, so that an operational problem does not erase the Portfolio.

## Implementation Decisions

- The application has three audience surfaces: the public scroll Portfolio, Hila's protected Owner Workspace, and a narrow Client invitation/submission experience. Only Hila receives editorial access.
- Project is the public publishing unit. Products are the physical objects shown, not a separate commerce catalogue or mandatory data model. No public distinction between Occasion and thematic Projects is required.
- A Project has title, description, ordered images, selected cover, and publication information. Optional captions do not replace useful accessible image descriptions.
- Preserve a public published version while Hila prepares private changes. Preview renders private changes using the public layout and does not itself publish or require a separate persisted lifecycle state.
- Publication validates the required Project fields. Public content and media access follow publication state; private previews and unpublished media must not be publicly enumerable or accessible merely by guessing a URL.
- Project order is chosen by Hila. All Published Projects remain in the scroll; direct links resolve within that experience. Archival removes public availability while retaining private content.
- The scroll is progressive enhancement over readable content. Native scrolling drives motion; reduced-motion and static presentations retain the same core content and contact actions. Compact albums use explicit image selection.
- Carry the reviewed pastel-red realistic wax seal and intertwined handwritten W/H/O direction into the implementation. The generated raster is a visual reference, not proof of a final scalable logo system.
- The Owner Workspace shares the scroll's palette, parchment treatment, and typography but uses calm editing controls. Production implementation replaces all temporary prototype state and access behavior.
- Each Testimonial belongs to exactly one Project. Store submitted words without an owner-edit operation. Publication and unpublication change visibility only; deletion removes the active submission from normal access.
- Each private invitation is bound to one Project and accepts one submission. Enforce consumption atomically at the application/data boundary; disabling a button alone is insufficient. A Client invitation never confers owner permissions.
- New Testimonials are private pending Hila's approval. Public display requires both a published Testimonial and a Published Project. Project previews include only published Testimonials for that Project.
- WhatsApp opens an editable message and includes the relevant stable Project link when invoked in Project context. The application neither sends the message automatically nor hosts Inquiry conversations.
- Client stories and Testimonials are anonymous; Client faces are excluded. The application does not need Client profile pages or public attribution fields.
- Use configurable owner identity and contact values; do not embed an invented WhatsApp number, account, or response promise.
- This specification makes no framework, hosting-provider, authentication-provider, or database selection. Those choices remain explicit setup decisions for this new repository, informed by current documentation before implementation. They must preserve the behavior and access boundaries described here.

## Testing Decisions

- User-confirmed primary testing boundary: complete user journeys through the running application, exercising the real application and local test storage rather than mocked internal functions. The user confirmed the create/save/preview/publish and invite/submit-once/approve/display workflows plus private-content access checks on 2026-09-07.
- A good test asserts a visible outcome or authorization rule: a saved Draft survives restart; publishing exposes the intended version; a later Draft edit does not change it; an invitation is consumed once; an approved Testimonial appears only on its Project.
- Cover the public Portfolio, Owner Workspace, and invitation/submission workflow through a small set of end-to-end journeys. Prefer existing application boundaries once implemented; do not create unrelated test-only modules.
- Add narrow request/data integration checks for private-content access, owner authorization, immutable Testimonial text, concurrent one-use invitation submission, and publication visibility where browser-only checks cannot establish the invariant.
- Validate desktop and narrow mobile layouts, keyboard navigation, focus return from preview, album selection, Project links, readable RTL content, and Testimonial expansion. Check reduced-motion and static fallback behavior with the same content.
- Use visual review and representative screenshots for scroll opening, Project chapters, closing contact, seal appearance, and Owner Workspace. Avoid tests that assert every animation frame or merely repeat CSS values.
- Exercise WhatsApp link construction without sending a real message. Use fictional data and isolated storage for all automated checks; do not invite real Clients or mutate public content during tests.
- Current prior art is the reviewed standalone prototype and its manual browser checks. There is no production test suite, application framework, or established test harness to inherit. Prototype observations are design evidence, not production acceptance results.

## Out of Scope

- Storefront, checkout, payment, inventory, shipping calculator, event planning, third-party resale, fixed Product catalogue, or marketplace.
- Delivery geography and operational delivery planning for now.
- On-site Inquiry forms, internal messaging, CRM workflows, automatic WhatsApp sending, and response-time promises.
- Visitor accounts, Client dashboards, multiple Creators, additional editorial roles, and public registration.
- Open public comments, owner rewriting of Testimonials, independent Testimonials without a Project, and Client identities/faces in public stories.
- Search bars, a separate public Project index, compulsory scroll snapping, and wheel hijacking.
- Optional audio, analytics expansion, advanced pricing workflows, and new external integrations not discussed in discovery.
- Treating generated example work or quotes as authentic Hila content; shipping a publicly accessible prototype editor as protected owner access.

## Further Notes

The product and visual direction were accepted after an iterative scroll and editor prototype review. The physical Ruth-scroll reference conveys only the mechanism, not its story or religious decoration. Later feedback superseded the initial public Project index, large full-screen photographs, geometric seal, differently themed editor, and editable-Testimonial suggestions.

Preserve the reviewed prototype as a primary visual reference on [prototype/scroll-book](https://github.com/Finz24/wonder/tree/prototype/scroll-book/prototypes/scroll-book). It is intentionally temporary code with no production authentication or persistence. The [repository documentation](https://github.com/Finz24/wonder) records the glossary, ADRs, visual decisions, and build sequence.

The launch inputs still needed are Hila's sign-in identity, real work and descriptions, WhatsApp number, and hosting/domain ownership. Local development can use labelled fixtures while these are supplied. Do not make up business values or silently inherit any from previous Wonder projects.

Deliver in complete increments: one durable Project from owner editing to public publication; full albums and scroll presentation; the invitation-to-Testimonial loop; then release validation and real content. This specification is the parent implementation issue; dependency-linked implementation tickets are a subsequent step.
