import type React from "react";

type Props = {
  leftTitle: string;
  leftDescription?: string;
  leftBullets?: string[];
  children: React.ReactNode;
};

export default function AuthSplitLayout({
  leftTitle,
  leftDescription,
  leftBullets = [],
  children,
}: Props) {
  return (
    <main className="min-h-screen bg-zinc-100 text-zinc-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6">
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          {/* Left */}
          <div className="hidden md:block">
            <div className="rounded-3xl border border-black/10 bg-zinc-50/70 p-10 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <h1 className="text-3xl font-bold tracking-tight">{leftTitle}</h1>
              {leftDescription ? (
                <p className="mt-3 text-zinc-600 dark:text-slate-300">
                  {leftDescription}
                </p>
              ) : null}

              {leftBullets.length ? (
                <ul className="mt-6 space-y-2 text-sm text-zinc-600 dark:text-slate-300">
                  {leftBullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center">{children}</div>
        </div>
      </div>
    </main>
  );
}
