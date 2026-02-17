import type React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "glass" | "solid";
};

export default function Card({
  variant = "glass",
  className = "",
  ...props
}: Props) {
  const base = "rounded-3xl border p-8 shadow-xl";

  const styles =
    variant === "solid"
      ? "border-black/10 bg-white text-zinc-900 dark:border-white/10 dark:bg-slate-900/60 dark:text-white"
      : "border-black/10 bg-zinc-50/70 text-zinc-900 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-white";

  return <div className={`${base} ${styles} ${className}`} {...props} />;
}
