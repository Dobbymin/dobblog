export function toAnchorId(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w가-힣-]/g, '');
}
