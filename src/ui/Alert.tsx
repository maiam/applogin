import type React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "error" | "success" | "info";
};

export default function Alert({
  variant = "info",
  className = "",
  ...props
}: Props) {
  const base = "rounded-xl border px-4 py-3 text-sm";

  const styles =
    variant === "error"
      ? "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-200"
      : variant === "success"
        ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
        : "border-sky-500/20 bg-sky-500/10 text-sky-800 dark:text-sky-200";

  return <div className={`${base} ${styles} ${className}`} {...props} />;
}
