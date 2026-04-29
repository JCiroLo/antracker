export type CamelCase<S extends string> = S extends `${infer First}_${infer Rest}`
  ? `${Lowercase<First>}${Capitalize<CamelCase<Rest>>}`
  : S;

export type KeysToCamelCase<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T as CamelCase<string & K>]: KeysToCamelCase<T[K]>;
    }
  : T;
