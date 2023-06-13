"use client"
import { Flex, Icon, Metric, Title } from "@tremor/react";

import { getSession } from "next-auth/react";

import React, { useState, useEffect } from "react";
import Avatar, { genConfig } from 'react-nice-avatar'
import { ArrowDownRightIcon, ChevronRightIcon, CubeTransparentIcon, UsersIcon, HomeModernIcon, DevicePhoneMobileIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { Skeleton } from "./skeleton.component";

import Link from "next/link";
import { usePathname } from 'next/navigation';

const Aside = () => {
    const [username, setUsername] = useState("default");
    const [activeSubmenu, setActiveSubmenu] = useState("");
    const pathname = usePathname();

    const houses = [
        "/playpix",
    ]

    const apps = [
        "/socialmoney"
    ]

    const banks = [
        "/itau"
    ]

    const renderAvatar = () => {
        const config = genConfig(username);

        return (
            <Avatar className="w-8 h-8" {...config} />
        )
    }

    useEffect(() => {
        const getUserSession = async () => {
            const session = await getSession()
            setUsername(session?.session.user.name)
        }

        getUserSession()
    }, [])

    return (
        <div className="fixed top-0 left-0 h-screen p-4 w-80">
            <aside className="w-full h-full rounded-[20px] shadow-lg shadow-primary-200 bg-primary-500">
                <Flex justifyContent="center" alignItems="center" flexDirection="col" className="h-full gap-3 p-6">
                    <Flex justifyContent="center" className="py-4 font-semibold">
                        <Metric color="white">roi</Metric>
                        <Metric color="white" className="opacity-50">dashboard</Metric>

                        <span className="p-1 ml-2 text-[0.5rem] text-white rounded bg-primary-600">
                            BETA
                        </span>
                    </Flex>

                    <ul className="flex flex-col flex-1 w-full gap-2">
                        <li>
                            <Link onClick={() => setActiveSubmenu("")} href="/" className={pathname == "/" ? "active" : ""}>
                                <Icon size="sm" icon={CubeTransparentIcon} /> Visão geral
                            </Link>
                        </li>
                        <li>
                            <Link onClick={() => setActiveSubmenu("")} href="/users" className={pathname == "/users" ? "active" : ""}>
                                <Icon size="sm" icon={UsersIcon} /> Gerenciar usuários
                            </Link>
                        </li>
{/*                         
                        <li>
                            <a
                                onClick={() => setActiveSubmenu(activeSubmenu === "houses" ? "" : "houses")}
                                className={`cursor-pointer group ${(activeSubmenu === "houses" || houses.includes(pathname)) && "active"}`}
                            >
                                <Icon size="sm" icon={HomeModernIcon} /> Casas <Icon className="ml-auto group-[.active]:rotate-90 transition-all" size="xs" icon={ChevronRightIcon} />
                            </a>

                            {(activeSubmenu === "houses" || houses.includes(pathname)) && (
                                <ul className="flex-1 w-full scale-90">
                                    <li>
                                        <Link href="/playpix" className={pathname == "/playpix" ? "active" : ""}>
                                            <Icon size="sm" icon={CubeTransparentIcon} /> Playpix
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li> */}

                        <li>
                            <a
                                onClick={() => setActiveSubmenu(activeSubmenu === "apps" ? "" : "apps")}
                                className={`cursor-pointer group ${(activeSubmenu === "apps" || apps.includes(pathname)) && "active"}`}
                            >
                                <Icon size="sm" icon={DevicePhoneMobileIcon} /> Apps <Icon className="ml-auto group-[.active]:rotate-90 transition-all" size="xs" icon={ChevronRightIcon} />
                            </a>

                            {(activeSubmenu === "apps" || apps.includes(pathname)) && (
                                <ul className="flex-1 w-full scale-90">
                                    <li>
                                        <Link href="/socialmoney" className={pathname == "/socialmoney" ? "active" : ""}>
                                            <Icon size="sm" icon={CubeTransparentIcon} /> Socialmoney
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/avaliador-de-marcas" className={pathname == "/avaliador-de-marcas" ? "active" : ""}>
                                            <Icon size="sm" icon={CubeTransparentIcon} /> Avaliador de Marcas
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <a
                                onClick={() => setActiveSubmenu(activeSubmenu === "banks" ? "" : "banks")}
                                className={`cursor-pointer group ${(activeSubmenu === "banks" || banks.includes(pathname)) && "active"}`}
                            >
                                <Icon size="sm" icon={BanknotesIcon} /> Bancos <Icon className="ml-auto group-[.active]:rotate-90 transition-all" size="xs" icon={ChevronRightIcon} />
                            </a>

                            {(activeSubmenu === "banks" || banks.includes(pathname)) && (
                                <ul className="flex-1 w-full scale-90">
                                    <li>
                                        <Link href="/itau" className={pathname == "/itau" ? "active" : ""}>
                                            <Icon size="sm" icon={CubeTransparentIcon} /> Itaú
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>

                    {username === "default" ? (
                        <Flex justifyContent="start" alignItems="center" className="gap-3 animate-pulse">
                            <Skeleton className="!w-8 h-8 rounded-full aspect-square bg-primary-700" />
                            <Skeleton className="flex-1 bg-primary-700" />
                            <Skeleton className="!w-8 h-8 rounded aspect-square bg-primary-700" />
                        </Flex>
                    ) : (
                        <Flex justifyContent="start" alignItems="center" className="gap-3">
                            {renderAvatar()}
                            <Title color="white">{username}</Title>
                            <Icon onClick={() => signOut()} size="sm" color="white" className="ml-auto cursor-pointer" icon={ArrowDownRightIcon} />
                        </Flex>
                    )}
                </Flex>
            </aside>
        </div>

    )
}

export default Aside;