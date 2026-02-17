export type SessionUser = { id: string; email: string };

export async function getMe(): Promise<SessionUser | null> {
  const res = await fetch("/api/me", { credentials: "include" });
  if (!res.ok) return null;
  return res.json();
}
