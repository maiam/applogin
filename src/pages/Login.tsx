import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { postJSON } from "../lib/api";
import ThemeToggle from "../components/ThemeToggle";
import { Link } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await postJSON<{ ok: true }>("/api/login", { email, password });
      nav("/app");
    } catch (e: any) {
      setErr(e?.message || "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          <div className="hidden md:block">
            <div className="rounded-3xl border border-black/10 bg-zinc-50/70 p-10 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <h1 className="text-3xl font-bold tracking-tight">
                Bem-vindo de volta
              </h1>
              <p className="mt-3 text-zinc-600 dark:text-slate-300">
                Login simples, seguro e pronto para deploy no Render.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-zinc-600 dark:text-slate-300">
                <li>• Cookie HttpOnly (mais seguro)</li>
                <li>• Rotas /api e SPA no mesmo serviço</li>
                <li>• Tailwind com visual “glass”</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-3xl border border-black/10 bg-zinc-50/70 p-8 shadow-xl backdrop-blur dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Entrar</h2>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-slate-300">
                    Use seu e-mail e senha.
                  </p>
                </div>

                <div className="pt-1">
                  <ThemeToggle />
                </div>
              </div>

              <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                <TextField
                  label="E-mail"
                  type="email"
                  placeholder="voce@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {err ? (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-200">
                    {err}
                  </div>
                ) : null}

                <Button type="submit" loading={loading}>
                  Entrar
                </Button>

                <div className="pt-2 text-center text-sm text-zinc-600 dark:text-slate-300">
                  Não tem conta?{" "}
                  <Link
                    to="/register"
                    className="font-semibold underline underline-offset-4 hover:opacity-80"
                  >
                    Criar agora
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
