import type React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function TextField({ label, error, ...props }: Props) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700 dark:text-slate-200">
        {label}
      </span>

      <input
        {...props}
        className={[
          "mt-1 w-full rounded-xl border px-4 py-3 outline-none transition",
          // Light
          "border-black/10 bg-white/70 text-zinc-900 placeholder:text-zinc-400",
          "focus:border-black/20 focus:ring-2 focus:ring-black/5",
          // Dark
          "dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:placeholder:text-slate-400",
          "dark:focus:border-white/25 dark:focus:ring-white/10",
          // Error
          error
            ? "border-red-500/30 focus:border-red-500/40 focus:ring-red-500/10 dark:border-red-400/30 dark:focus:border-red-400/40"
            : "",
        ].join(" ")}
      />

      {error ? (
        <p className="mt-1 text-xs text-red-700 dark:text-red-200">{error}</p>
      ) : null}
    </label>
  );
}
