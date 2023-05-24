"use client";

import { Menu, Transition } from '@headlessui/react'

import { Fragment, useEffect, useRef, useState } from 'react'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { Badge } from "@tremor/react";

import gradient from 'random-gradient'

const Header = () => {
  const { data: session } = useSession();
  // const user = session?.user;
  const user = "admin";

  return (
    <header className="h-20 bg-white border-b">
      <nav className="container flex items-center justify-between h-full">
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="text-xl font-semibold text-slate-700">
            ROI Dashoard
          </Link>
          <Badge size="xs" className="text-lg">BETA</Badge>
        </div>
        <ul className="flex items-center gap-4">
          <Menu as="div" className="relative inline-block text-left">
            <div className="p-0.5 border-2 rounded-full">
              <Menu.Button className="rounded-full cursor-pointer w-7 h-7" style={{ background: gradient(user) }}>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    <button>
                      Edit
                    </button>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </ul>
      </nav>
    </header>
  );
};

export default Header;