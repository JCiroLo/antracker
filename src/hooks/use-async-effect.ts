import React from "react";

const isAsyncGenerator = (v: unknown): v is AsyncGenerator => {
  return Object.prototype.toString.call(v) === "[object AsyncGenerator]";
};

const useAsyncEffect = (effect: () => Promise<void> | AsyncGenerator<void, void, void>, deps?: React.DependencyList) => {
  React.useEffect(() => {
    const task = effect();
    let isCancelled = false;

    void (async () => {
      if (isAsyncGenerator(task)) {
        for await (const _ of task) {
          if (isCancelled) {
            break;
          }
        }
      } else {
        await task;
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, deps);
};

export default useAsyncEffect;
