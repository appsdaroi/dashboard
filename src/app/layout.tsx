'use client';

import "./globals.css";
import { NextAuthProvider } from "./providers";

import { Toaster } from 'react-hot-toast';
import { Metadata } from 'next';

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
        
        <Toaster/>
      </body>
    </html>
  );
}
