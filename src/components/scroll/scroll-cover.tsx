import { Separator } from "@/components/ui/separator";

import { WaxSeal } from "./wax-seal";
import styles from "./scroll-book.module.css";

/**
 * Closed-scroll cover slot: Wonder, By Hila, and the approved wax-seal
 * symbol. The Visitor's first scroll movement opens the paper from here.
 */
export function ScrollCover() {
  return (
    <section aria-label="Wonder · By Hila" className={styles.cover}>
      <div className={styles.coverInner}>
        <p className={styles.eyebrow}>Wonder · By Hila</p>
        <h1 className={styles.coverTitle}>תיק העבודות של הילה</h1>
        <WaxSeal />
        <Separator className={styles.coverRule} />
        <p className={styles.coverInvitation}>
          עבודות חגיגה שנוצרו ביד, ומוצגות כאן כדי לעורר רעיון אישי משלכם.
        </p>
      </div>
      <p className={styles.scrollCue} aria-hidden="true">
        גללו בעדינות, הסיפור נפתח
        <span>↓</span>
      </p>
    </section>
  );
}
