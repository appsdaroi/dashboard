"use client";

import { SessionProvider } from "next-auth/react";
import Aside from "@/components/aside.component";

import { usePathname } from 'next/navigation';

import { BrowserView, MobileView } from 'react-device-detect';
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";

import { Icon } from "@tremor/react";

import { useState } from "react";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  const pathname = usePathname();

  const [openAside, setOpenAside] = useState(false)

  return (
    <SessionProvider>
      {pathname.includes("/login") ? (
        <>
          {children}
        </>
      ) : (
        <>
          <BrowserView>
            <Aside />

            <div className="flex flex-col p-8 py-12 mr-2 ml-80">
              {children}
            </div>
          </BrowserView>

          <MobileView>
            {/* <nav className="fixed flex top-0 left-0 right-0 h-16 p-2 rounded-lg shadow-lg shadow-primary-900/10 m-2 z-[999]">
              <Icon icon={Bars3BottomLeftIcon} size="lg" color="violet" onClick={() => setOpenAside(!openAside)}></Icon>
            </nav>

            {openAside && (
              <Aside />
            )} */}

            <div className="flex flex-col p-8 py-12">
              {children}
            </div>
          </MobileView>
        </>
      )}
    </SessionProvider>);
};
