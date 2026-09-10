import type { ReactNode } from "react";

import { chapterAnchorFor, SCROLL_CHAPTER_ATTRIBUTE } from "./scroll-contracts";
import styles from "./scroll-book.module.css";

type ScrollChapterProps = Readonly<{
  slug: string;
  labelledBy?: string;
  heading: ReactNode;
  children: ReactNode;
}>;

/**
 * Shared chapter slot. The section carries the stable chapter-entry hook
 * (`id="chapter-<slug>"` + `data-chapter`) so Project links land at their
 * chapter inside the scroll. Rich chapter content (albums, Testimonials)
 * is owned by sibling tracks and renders as children.
 */
export function ScrollChapter({ slug, labelledBy, heading, children }: ScrollChapterProps) {
  return (
    <section
      id={chapterAnchorFor(slug)}
      {...{ [SCROLL_CHAPTER_ATTRIBUTE]: slug }}
      aria-labelledby={labelledBy}
      className={styles.chapter}
    >
      <div className={styles.chapterHeading}>{heading}</div>
      {children}
    </section>
  );
}
