import { ReactNode } from "react";

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 space-y-8 bg-[var(--color-surface)] rounded-b-lg">
      {children}
    </div>
  );
}
