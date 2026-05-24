import { useCallback, useRef, useState } from "react";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import type { UseIntersectionObserverReturn } from "@/hooks/use-intersection-observer";

type RefetchProps = {
  resetPagination?: boolean;
};

type Refetch = (options?: RefetchProps) => Promise<void>;

type UseInfiniteScrollOptions = {
  initialPage?: number;
  debug?: boolean;
  onIntersection: (page: number) => Promise<void>;
};

type UseInfiniteScrollReturn = {
  observer: UseIntersectionObserverReturn;
  loading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  refetch: Refetch;
};

type UseInfiniteScroll = (options: UseInfiniteScrollOptions) => UseInfiniteScrollReturn;

const useInfiniteScroll: UseInfiniteScroll = ({ initialPage = 0, onIntersection }) => {
  const page = useRef(initialPage);
  const hasNextPage = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch: Refetch = useCallback(
    async (options) => {
      if (options?.resetPagination) {
        page.current = 1;
      }

      setIsLoading(true);

      try {
        await onIntersection(page.current);

        page.current += 1;
      } catch (error) {
        hasNextPage.current = false;

        setError(error as Error);
      }

      setIsLoading(false);
    },
    [onIntersection],
  );

  const observer = useIntersectionObserver({
    rootMargin: "100px",
    threshold: 0,
    canIntersect: !isLoading && !error,
    onIntersection: refetch,
  });

  return { observer, loading: isLoading, error, hasNextPage: hasNextPage.current, refetch };
};

export default useInfiniteScroll;
