export function uniqueBy<T, K extends keyof T>(array: T[], key: K): T[] {
  return Array.from(new Map(array.map((item) => [item[key], item])).values());
}
