"use client";

import { Menu, Transition } from '@headlessui/react'

import { Fragment, useEffect, useRef, useState } from 'react'
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Badge } from "@tremor/react";

import gradient from "random-gradient";
import { ArrowLeftOnRectangleIcon, UserIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="h-20 bg-white rounded-lg shadow-lg shadow-slate-100">
      <nav className="flex items-center justify-between h-full px-4">
        <Menu as="div" className="relative inline-block ml-auto text-left">
          <div className="p-0.5 border-2 rounded-full flex">
            <Menu.Button className="rounded-full cursor-pointer w-7 h-7" style={{ background: gradient("admin") }}>
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
            <Menu.Items className="absolute right-0 w-56 mt-1 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-1">
                <Menu.Item>
                  <Link href="/profile" className="flex items-center w-full gap-2 p-2">
                    <UserIcon className="w-4 h-4" />
                    Meu perfil
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button onClick={() => signOut()} className="flex items-center w-full gap-2 p-2">
                    <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                    Sair
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;