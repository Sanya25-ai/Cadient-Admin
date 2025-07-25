import DynamicGlobalNavbar from "@/components/common/dynamic-global-navbar";
import ConditionalSidebar from "@/components/conditional-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth-context";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import type React from "react";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Cadient - HRMS/ATS Platform",
  description: "Human Resource Management System and Applicant Tracking System",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={openSans.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body className={`${openSans.className}`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <ConditionalSidebar />
            <main
              className="flex flex-col min-h-screen transition-all duration-300"
              style={{ marginLeft: "var(--sidebar-width, 64px)" }}
            >
              <div className="sticky top-0 z-20 bg-white shadow-sm">
                <DynamicGlobalNavbar />
              </div>
              <div className="flex-1">{children}</div>
            </main>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
