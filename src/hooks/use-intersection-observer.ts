import { useRef, useCallback, useMemo } from "react";

type UseIntersectionObserverOptions = IntersectionObserverInit & {
  canIntersect?: boolean;
  onIntersection: () => void;
};

export type UseIntersectionObserverReturn = {
  ref: (node: HTMLElement | null) => void;
  unobserve: () => void;
};

type TUseIntersectionObserver = (options: UseIntersectionObserverOptions) => UseIntersectionObserverReturn;

const useIntersectionObserver: TUseIntersectionObserver = ({ onIntersection, ...options }) => {
  const { root = null, rootMargin = "0px", threshold = 0, canIntersect = true } = options;

  const observerRef = useRef<HTMLElement | null>(null);

  const handleIntersection = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;

      if (target.isIntersecting && canIntersect) {
        onIntersection();
      }
    },
    [canIntersect, onIntersection],
  );

  const observer = useMemo(
    () =>
      new IntersectionObserver(handleIntersection, {
        root,
        rootMargin,
        threshold,
      }),
    [handleIntersection, root, rootMargin, threshold],
  );

  const ref = useCallback(
    (node: HTMLElement | null) => {
      if (node) {
        observerRef.current = node;
        observer.observe(node);

        return;
      }

      if (observerRef.current) {
        observer.unobserve(observerRef.current);
        observerRef.current = null;
      }
    },
    [observer],
  );

  const unobserve = useCallback(() => {
    if (observerRef.current) {
      observer.unobserve(observerRef.current);
    }
  }, [observer]);

  return { ref, unobserve };
};

export default useIntersectionObserver;
