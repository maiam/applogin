import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import ThemeToggle from "../../components/ThemeToggle";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";
import { postJSON } from "../../lib/api";

export default function LoginForm() {
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
    <Card className="w-full">
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

        {err ? <Alert variant="error">{err}</Alert> : null}

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
    </Card>
  );
}
