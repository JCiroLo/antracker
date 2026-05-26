import { useState, useEffect, useCallback, useRef } from "react";

export type UseSimpleQueryOptions<Data, FetchOptions> = {
  queryFn: (signal: AbortSignal, options?: FetchOptions) => Promise<Data>;
  queryKey?: any[];
  enabled?: boolean;
  keepPreviousData?: boolean;
};

const useSimpleQuery = <Data, FetchOptions = unknown>({
  queryFn,
  queryKey = [],
  enabled = true,
  keepPreviousData = false,
}: UseSimpleQueryOptions<Data, FetchOptions>) => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(enabled);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const queryFnRef = useRef(queryFn);
  queryFnRef.current = queryFn;

  const abortControllerRef = useRef<AbortController | null>(null);

  const queryKeyHash = JSON.stringify(queryKey);

  const mutateData = useCallback((value: React.SetStateAction<Data | null>) => setData(value), []);

  const executeFetch = useCallback(async (options?: FetchOptions) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);
    setHasLoaded(false);
    // setData(null);

    try {
      const result = await queryFnRef.current(controller.signal, options);

      if (!controller.signal.aborted) {
        setData((oldData) => {
          if (!oldData) {
            return result as Data;
          }

          if (keepPreviousData) {
            if (Array.isArray(oldData) && Array.isArray(result)) {
              return [...(oldData as Data[]), ...result] as Data;
            }
          }

          return result as Data;
        });
        setIsLoading(false);
        setHasLoaded(true);
      }

      return result;
    } catch (error) {
      if (!controller.signal.aborted) {
        setError(error instanceof Error ? error : new Error(String(error)));
        setIsLoading(false);
        setHasLoaded(true);
      }

      throw error;
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      executeFetch();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [queryKeyHash, enabled, executeFetch]);

  return { data, isLoading, hasLoaded, error, fetch: executeFetch, mutateData };
};

export default useSimpleQuery;
