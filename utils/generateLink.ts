export function generateLink(email: string): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  const emailPrefix = email
    .split("@")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const rawId = `${email}-${timestamp}-${randomStr}`;
  const encodedId = btoa(rawId);

  return `${window.location.origin}/heartnote/${encodedId}`;
}
