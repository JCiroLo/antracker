const ArrayTools = {
  cumulativeSum<T extends object | number>(items: T[], keySelector: (item: T) => number) {
    let cumulation = 0;

    return items.map((item) => {
      cumulation += keySelector(item);

      return cumulation;
    });
  },
  indexBy<T extends object>(items: T[], keySelector: (item: T) => string) {
    return items.reduce(
      (indexed, item) => ({
        ...indexed,
        [keySelector(item)]: item,
      }),
      {} as Record<string, T>
    );
  },
};

export default ArrayTools;
