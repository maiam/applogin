import AuthSplitLayout from "../layouts/AuthSplitLayout";
import LoginForm from "../features/auth/LoginForm";

export default function Login() {
  return (
    <AuthSplitLayout
      leftTitle="Bem-vindo de volta"
      leftDescription="Login simples, seguro e pronto para deploy no Render."
      leftBullets={[
        "Cookie HttpOnly (mais seguro)",
        "Rotas /api e SPA no mesmo serviço",
        "Tailwind com visual “glass”",
      ]}
    >
      <LoginForm />
    </AuthSplitLayout>
  );
}
