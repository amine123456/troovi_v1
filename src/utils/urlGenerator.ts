export function generateItemUrl(itemId: string): string {
  // In a real production app, this would be your actual domain
  const baseUrl = window.location.origin;
  return `${baseUrl}/user/${itemId}`;
}

export function generateItemId(): string {
  return crypto.randomUUID();
}