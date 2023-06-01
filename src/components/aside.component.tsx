"use client"
import { Flex, Icon, Metric, Title } from "@tremor/react";

import { getSession } from "next-auth/react";

import React, { useState, useEffect } from "react";
import Avatar, { genConfig } from 'react-nice-avatar'
import { ArrowDownRightIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import { Skeleton } from "./skeleton.component";

import Link from "next/link";
import { usePathname } from 'next/navigation';

const Aside = () => {
    const [username, setUsername] = useState("default");
    const pathname = usePathname();

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

                    <ul className="flex-1 w-full">
                        <li>
                            <Link href="/" className={pathname == "/" ? "active" : ""}>Início</Link>
                        </li>
                        <li>
                            <Link href="/users" className={pathname == "/users" ? "active" : ""}>Gerenciar usuários</Link>
                        </li>
                    </ul>

                    {username === "default" ? (
                        <Flex justifyContent="start" alignItems="center" className="gap-3 animate-pulse">
                            <Skeleton className="!w-8 h-8 rounded-full aspect-square bg-primary-700"/>
                            <Skeleton className="flex-1 bg-primary-700"/>
                            <Skeleton className="!w-8 h-8 rounded aspect-square bg-primary-700"/>
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