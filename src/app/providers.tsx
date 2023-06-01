"use client";

import { SessionProvider } from "next-auth/react";
import Aside from "@/components/aside.component";

import { usePathname } from 'next/navigation';

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  const pathname = usePathname();

  return (
    <SessionProvider>
      {pathname.includes("/login") ? (
        <>
          {children}
        </>
      ) : (
        <>
          <Aside />

          <div className="flex flex-col p-8 py-12 mr-2 ml-80">
            {children}
          </div></>
      )}
    </SessionProvider>);
};
