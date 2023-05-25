import { Card, Subtitle, Flex, Metric } from "@tremor/react";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { UsersIcon } from "@heroicons/react/24/outline";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <>
      <section className="min-h-screen pt-20 bg-white">

        <Flex flexDirection="col" alignItems="start" className="max-w-5xl gap-px mx-auto mb-8 text-left">
          <Metric>Olá {user?.name}!</Metric>
          <Subtitle>O que você deseja fazer hoje?</Subtitle>

        </Flex>

        <Flex justifyContent="start" className="flex-wrap max-w-5xl gap-5 mx-auto">
          <Link className="w-full max-w-[200px] group/card" href="/users">
            <Card className="flex flex-col gap-3">
              <Flex justifyContent="center" className="w-full rounded aspect-square bg-slate-100">
                <UsersIcon className="w-12 h-12 transition-transform group-hover/card:scale-125" />
              </Flex>

              <Subtitle>Geren. usuários</Subtitle>
            </Card>
          </Link>
          <Link className="w-full max-w-[200px] group/card" href="/users">
            <Card className="flex flex-col gap-3">
              <Flex justifyContent="center" className="w-full rounded aspect-square bg-slate-100">
                <UsersIcon className="w-12 h-12 transition-transform group-hover/card:scale-125" />
              </Flex>

              <Subtitle>Usuários</Subtitle>
            </Card>
          </Link>
          <Link className="w-full max-w-[200px] group/card" href="/users">
            <Card className="flex flex-col gap-3">
              <Flex justifyContent="center" className="w-full rounded aspect-square bg-slate-100">
                <UsersIcon className="w-12 h-12 transition-transform group-hover/card:scale-125" />
              </Flex>

              <Subtitle>Usuários</Subtitle>
            </Card>
          </Link>
          <Link className="w-full max-w-[200px] group/card" href="/users">
            <Card className="flex flex-col gap-3">
              <Flex justifyContent="center" className="w-full rounded aspect-square bg-slate-100">
                <UsersIcon className="w-12 h-12 transition-transform group-hover/card:scale-125" />
              </Flex>

              <Subtitle>Usuários</Subtitle>
            </Card>
          </Link>
          <Link className="w-full max-w-[200px] group/card" href="/users">
            <Card className="flex flex-col gap-3">
              <Flex justifyContent="center" className="w-full rounded aspect-square bg-slate-100">
                <UsersIcon className="w-12 h-12 transition-transform group-hover/card:scale-125" />
              </Flex>

              <Subtitle>Usuários</Subtitle>
            </Card>
          </Link>
          <Link className="w-full max-w-[200px] group/card" href="/users">
            <Card className="flex flex-col gap-3">
              <Flex justifyContent="center" className="w-full rounded aspect-square bg-slate-100">
                <UsersIcon className="w-12 h-12 transition-transform group-hover/card:scale-125" />
              </Flex>

              <Subtitle>Usuários</Subtitle>
            </Card>
          </Link>
        </Flex>
      </section>
    </>
  );
}
