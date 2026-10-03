export type RouteParams<T extends Record<string, string> = Record<string, string>> =
  Promise<T>;

export type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; status: number };

export type Maybe<T> = T | null | undefined;

export type Prettify<T> = { [K in keyof T]: T[K] } & {};
