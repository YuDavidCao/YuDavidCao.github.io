import type { ReactNode } from "react";

export function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full md:w-3/5 px-4 md:px-0 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
      {children}
    </div>
  );
}
