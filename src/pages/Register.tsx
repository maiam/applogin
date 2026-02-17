import AuthSplitLayout from "../layouts/AuthSplitLayout";
import RegisterForm from "../features/auth/RegisterForm";

export default function Register() {
  return (
    <AuthSplitLayout
      leftTitle="Criar conta"
      leftDescription="Cadastro rápido para começar a usar."
      leftBullets={[
        "Cadastro em segundos",
        "Login automático após criar",
        "Sessão via cookie HttpOnly",
      ]}
    >
      <RegisterForm />
    </AuthSplitLayout>
  );
}
