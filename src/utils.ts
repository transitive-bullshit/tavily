export function pruneNullOrUndefined<T extends Record<string, any>>(
  obj: T
): NonNullable<{ [K in keyof T]: Exclude<T[K], undefined | null> }> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== undefined && value !== null
    )
  ) as NonNullable<T>
}
