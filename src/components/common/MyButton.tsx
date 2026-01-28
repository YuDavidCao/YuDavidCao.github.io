import * as React from "react";

export interface IMyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function MyButton({ children, onClick }: IMyButtonProps) {
  return (
    <button
      className="btn-vintage text-ink dark:text-dark-ink text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
