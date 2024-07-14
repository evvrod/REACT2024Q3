export default function extractIdFromUrl(url: string): number | null {
  const parts = url.split('/');
  let idStr = parts[parts.length - 1];

  if (url.endsWith('/')) {
    idStr = parts[parts.length - 2];
  }

  const id = parseInt(idStr, 10);
  if (!Number.isNaN(id)) {
    return id;
  }

  // eslint-disable-next-line no-console
  console.log('Error extracting ID from URL: Invalid number format');
  return null;
}
