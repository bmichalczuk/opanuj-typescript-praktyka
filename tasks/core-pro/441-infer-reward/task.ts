type Raw<T extends string> = T extends `${string}[${infer Amount}$]${infer Rest}`
  ? Raw<Rest> extends null
    ? ExcludeZero<ToPositiveNumber<Amount>> extends never
      ? null
      : ExcludeZero<ToPositiveNumber<Amount>>
    : Raw<Rest>
  : null;

type ToPositiveNumber<S extends string> = S extends `${infer N extends number}` ? N : never;

type ExcludeZero<N extends number> = Exclude<N, 0>;
export type RewardRadar<T extends string> = Raw<T> extends null ? null : `${Raw<T>}$`;
