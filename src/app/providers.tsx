"use client";

import { SessionProvider } from "next-auth/react";

import Header from "@/components/header.component";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Header />

      {children}
    </SessionProvider>);
};
