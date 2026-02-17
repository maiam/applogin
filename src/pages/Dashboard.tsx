import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../lib/auth";
import type { SessionUser } from "../lib/auth";

export default function Dashboard() {
  const nav = useNavigate();
  const [me, setMe] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await getMe();
      if (!user) {
        nav("/login", { replace: true });
        return;
      }
      setMe(user);
      setLoading(false);
    })();
  }, [nav]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white grid place-items-center">
        <div className="text-slate-300">Carregando...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h1 className="text-2xl font-bold">Área logada</h1>
          <p className="mt-2 text-slate-300">
            Usuário: <span className="font-semibold">{me?.email}</span>
          </p>
        </div>
      </div>
    </main>
  );
}
