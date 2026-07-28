export function withBase(p: string): string {
  return `${import.meta.env.BASE_URL}${p}`.replace(/\/+/g, "/");
}
