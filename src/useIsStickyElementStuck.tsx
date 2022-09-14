import { useEffect, useRef, useState } from "react";

/**
 * Track the "sticky" status of a `position: sticky;` element.
 * Returns three elements:
 *   - isStuck: Whether or not the "sticky" element is in a "sticky" mode
 *   - nonStickyNodeRef: Attach this to an empty div immediately above your "sticky" element
 *   - stickyNodeRef: Attach this to your `position: sticky;` element
 *
 * Example:
 *    const { isStuck, nonStickyNodeRef, stickyNodeRef } = useIsStickyElementStuck<HTMLDivElement>()
 *    return (
 *      <div ref={nonStickyNodeRef} />
 *      <div ref={stickyNodeRef} css={{position: 'sticky', top: 0}}> (contents) </div>
 *    )
 */
export function useIsStickyElementStuck<T extends HTMLElement>() {
  const [isStuck, setIsStuck] = useState(false);
  const stickyNodeRef = useRef<T | null>(null);
  const nonStickyNodeRef = useRef<T | null>(null);

  useEffect(() => {
    const updateStuck = () => {
      if (!stickyNodeRef.current || !nonStickyNodeRef.current) {
        return;
      }
      const stickyTop = stickyNodeRef.current.getBoundingClientRect().top;
      const nonStickyTop = nonStickyNodeRef.current.getBoundingClientRect().top;
      console.log(stickyTop, nonStickyTop);
      setIsStuck(stickyTop > nonStickyTop);
    };

    updateStuck();
    window.addEventListener("scroll", updateStuck);
    return () => window.removeEventListener("scroll", updateStuck);
  }, []);

  return { isStuck, nonStickyNodeRef, stickyNodeRef };
}
