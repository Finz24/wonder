import { cn } from "@/lib/utils";

import styles from "./scroll-book.module.css";

type WaxSealProps = Readonly<{
  className?: string;
  small?: boolean;
}>;

/**
 * Approved wax-seal symbol: a flowing W forming the outer structure with H
 * nestled in its left wing and O in its right, referring to Hila Orfali.
 * Vector emblem only — the generated raster remains a visual reference.
 */
export function WaxSeal({ className, small = false }: WaxSealProps) {
  return (
    <span
      role="img"
      aria-label="חותם שעווה עם המונוגרמה W H O"
      className={cn(styles.seal, small && styles.sealSmall, className)}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
        <g fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
          <path d="M12 24 L30 78 L50 34 L70 78 L88 24" />
          <path d="M27 40 L27 58 M37 40 L37 58 M27 49 L37 49" strokeWidth="3" />
          <ellipse cx="70" cy="49" rx="7" ry="10" strokeWidth="3" />
        </g>
      </svg>
    </span>
  );
}
