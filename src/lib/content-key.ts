const KEY_RE = /^[a-z0-9]+(\.[a-z0-9-]+)+$/;

export function isValidKey(key: string): boolean {
  return KEY_RE.test(key);
}
