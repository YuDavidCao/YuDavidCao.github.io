import * as React from "react";

export interface IInlineCodeProps {
  children: React.ReactNode;
}

export function InlineCode(props: IInlineCodeProps) {
  return (
    <code className="bg-secondary text-tx-primary px-1 rounded-md dark:bg-dark-bg dark:text-dark-bg-tx-primary">
      {props.children}
    </code>
  );
}
