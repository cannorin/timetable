export type CacheKey =
  | `table`
  | `table::${string}` // table::<tableId>
  | `row`
  | `row::${string}` // row::<tableId>
  | `row::${string}/${string}` // row::<tableId>/<rowId>
  | `app`
  | `app::${string}` // app::<tableId>
  | `app::${string}/${string}` // app::<tableId>/<rowId>
  | `app::${string}/${string}/${string}`; // app::<tableId>/<rowId>/<appId>

export const tableTag = (tableId?: string) =>
  (tableId ? `table::${tableId}` : "table") satisfies CacheKey;

export const rowTag = (tableId?: string, rowId?: string) =>
  (tableId
    ? rowId
      ? `row::${tableId}/${rowId}`
      : `row::${tableId}`
    : "row") satisfies CacheKey;

export const appTag = (tableId?: string, rowId?: string, appId?: string) =>
  (tableId
    ? rowId
      ? appId
        ? `app::${tableId}/${rowId}/${appId}`
        : `app::${tableId}/${rowId}`
      : `app::${tableId}`
    : "app") satisfies CacheKey;
