/** Resolve public media under both local / and the GitHub Pages /hala/ base. */
export function assetUrl(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, "");
}
