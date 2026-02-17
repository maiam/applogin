import type React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function Button({ loading, children, ...props }: Props) {
  const disabled = loading || props.disabled;

  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        "w-full rounded-xl px-4 py-3 font-semibold transition",
        "border border-black/10 shadow-sm",
        // Light
        "bg-zinc-900 text-zinc-50 hover:bg-zinc-800",
        "active:scale-[0.99]",
        // Dark
        "dark:border-white/10 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
        // Disabled
        "disabled:cursor-not-allowed disabled:opacity-60",
      ].join(" ")}
    >
      {loading ? "Entrando..." : children}
    </button>
  );
}
