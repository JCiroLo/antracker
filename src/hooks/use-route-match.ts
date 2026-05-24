import { matchPath, useLocation } from "react-router-dom";

type UseRouteMatch = (patterns: readonly string[]) => ReturnType<typeof matchPath> | null;

const useRouteMatch: UseRouteMatch = (patterns) => {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
};

export default useRouteMatch;
