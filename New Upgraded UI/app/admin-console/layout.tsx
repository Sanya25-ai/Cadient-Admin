import type React from "react";

export default function AdminConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1 flex flex-col h-full">{children}</div>;
}
