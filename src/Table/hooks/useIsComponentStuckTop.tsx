import { RefObject, useEffect, useMemo, useState } from "react";

const useIntersection = (
  ref: RefObject<HTMLElement>,
  options: IntersectionObserverInit
): IntersectionObserverEntry | null => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === "function") {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setIntersectionObserverEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      return () => {
        setIntersectionObserverEntry(null);
        observer.disconnect();
      };
    }
    return () => {};
  }, [ref.current, options.threshold, options.root, options.rootMargin]);

  return intersectionObserverEntry;
};

export const useIsComponentStuckTop = (
  targetRef: RefObject<HTMLElement>,
  containerRef?: RefObject<HTMLElement>
) => {
  const intersection = useIntersection(targetRef, {
    root: containerRef?.current ?? null,
    rootMargin: "-1px 0px 0px 0px",
    threshold: 0,
  });

  const isStuck = useMemo(() => {
    if (!intersection) return false;
    return !intersection?.isIntersecting;
  }, [intersection?.isIntersecting]);

  return isStuck;
};
