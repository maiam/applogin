import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import ThemeToggle from "../../components/ThemeToggle";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";
import { postJSON } from "../../lib/api";

export default function RegisterForm() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    if (password.length < 6)
      return setErr("A senha precisa ter pelo menos 6 caracteres.");
    if (password !== confirm) return setErr("As senhas não coincidem.");

    setLoading(true);
    try {
      await postJSON<{ ok: true }>("/api/register", { email, password });
      nav("/app");
    } catch (e: any) {
      setErr(e?.message || "Falha ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Cadastrar</h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-slate-300">
            Crie seu usuário para acessar.
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
          placeholder="mínimo 6 caracteres"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          label="Confirmar senha"
          type="password"
          placeholder="repita a senha"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {err ? <Alert variant="error">{err}</Alert> : null}

        <Button type="submit" loading={loading}>
          Criar conta
        </Button>

        <div className="pt-2 text-center text-sm text-zinc-600 dark:text-slate-300">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="font-semibold underline underline-offset-4 hover:opacity-80"
          >
            Entrar
          </Link>
        </div>
      </form>
    </Card>
  );
}
