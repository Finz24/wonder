/**
 * Shared scroll-book contracts owned by issue #4.
 *
 * Sibling tracks (public chapter richness, contact methods) render *inside*
 * these slots; the slots themselves — stable chapter-entry anchors and the
 * contact anchor — stay stable so direct links keep working.
 */

export const SCROLL_CHAPTER_ATTRIBUTE = "data-chapter";

export const SCROLL_CONTACT_ANCHOR = "contact";

/** Demo-only notice shown until real contact methods are configured. */
export const DEMO_CONTACT_NOTICE = "הדגמה בלבד — פרטי הקשר של הילה עדיין לא הוגדרו.";

function assertSlug(slug: string): void {
  if (!slug || /[\s#]/.test(slug)) {
    throw new Error("A scroll chapter slug must be a non-empty fragment-safe value.");
  }
}

/**
 * Stable chapter-entry hook: `chapter-<slug>`.
 * Used as the section `id` and as the direct-link fragment (`/#chapter-<slug>`).
 */
export function chapterAnchorFor(slug: string): string {
  assertSlug(slug);
  return `chapter-${slug}`;
}

/** Reads the chapter slug back from a section carrying the stable hook. */
export function chapterSlugFromElement(element: Element): string | null {
  return element.getAttribute(SCROLL_CHAPTER_ATTRIBUTE);
}
