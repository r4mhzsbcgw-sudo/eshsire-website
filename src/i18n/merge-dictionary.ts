export function deepMerge<T extends object>(base: T, patch: Partial<T>): T {
  const result = { ...base } as Record<string, unknown>;
  for (const key of Object.keys(patch) as (keyof T)[]) {
    const patchVal = patch[key];
    if (patchVal === undefined) continue;
    const baseVal = base[key];
    if (
      patchVal &&
      typeof patchVal === "object" &&
      !Array.isArray(patchVal) &&
      baseVal &&
      typeof baseVal === "object" &&
      !Array.isArray(baseVal)
    ) {
      result[key as string] = deepMerge(
        baseVal as object,
        patchVal as object
      );
    } else {
      result[key as string] = patchVal;
    }
  }
  return result as T;
}
