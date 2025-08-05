import * as React from "react";

export interface IMyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function MyButton({ children, onClick }: IMyButtonProps) {
  return (
    <button
      className="bg-secondary text-tx-primary px-4 pt-3 pb-2 rounded-lg hover:bg-tertiary transition-colors text-sm font-bold dark:bg-dark-bg dark:text-dark-bg-tx-primary dark:hover:bg-dark-bg-hover"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
