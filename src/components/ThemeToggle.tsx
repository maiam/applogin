import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar tema"
      title={theme === "dark" ? "Mudar para claro" : "Mudar para escuro"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl
                 border border-black/10 bg-black/5 text-lg
                 hover:bg-black/10
                 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <span className="select-none">{theme === "dark" ? "🌙" : "☀️"}</span>
    </button>
  );
}
