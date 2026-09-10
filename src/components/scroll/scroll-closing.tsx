import { DEMO_CONTACT_NOTICE, SCROLL_CONTACT_ANCHOR } from "./scroll-contracts";
import styles from "./scroll-book.module.css";
import { WaxSeal } from "./wax-seal";

/**
 * Shared closing contact slot. Real contact methods (WhatsApp configuration)
 * arrive with a sibling track; until then the closing renders a clearly
 * labelled demo notice and no invented number.
 */
export function ScrollClosing() {
  return (
    <section id={SCROLL_CONTACT_ANCHOR} aria-label="יצירת קשר" className={styles.closing}>
      <div className={styles.closingContent}>
        <WaxSeal small />
        <p className={styles.eyebrow}>הסיפור הבא יכול להיות שלכם</p>
        <h2 className={styles.closingTitle}>
          מה נחגוג <em>ביחד?</em>
        </h2>
        <p className={styles.closingText}>
          רעיון קטן, אירוע שמתקרב, או רק תחושה. אשמח לשמוע וליצור משהו שהוא שלכם.
        </p>
        <p role="note" className={styles.demoNotice}>
          {DEMO_CONTACT_NOTICE}
        </p>
        <p className={styles.signature} lang="en">
          With love, Hila
        </p>
      </div>
    </section>
  );
}
