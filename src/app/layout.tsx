'use client';

import "./globals.css";
import { NextAuthProvider } from "./providers";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Metadata } from 'next';

export const metadata: Metadata = {
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
        
        <ToastContainer
          position="bottom-center"
        />
      </body>
    </html>
  );
}
