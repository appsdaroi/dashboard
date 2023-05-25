'use client';

import "./globals.css";
import { NextAuthProvider } from "./providers";

export const metadata = {
  title: "ROI Dashboard",
  description: "An dashboard to control all ROI apps",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-BR">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
