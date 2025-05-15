import { ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8 space-y-8 bg-[var(--color-surface)] rounded-b-lg">
      {children}
    </div>
  );
}
