import { LoginForm } from "./form";

import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"

import { redirect } from 'next/navigation';

import { Badge, Card, Flex, Metric } from "@tremor/react";

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/');

  return (
    <>
      <section className="min-h-screen pt-20">
        <div className="container flex items-center justify-center h-full px-6 py-12 mx-auto">
          <Card className="px-8 py-10 md:w-8/12 lg:w-5/12">
            <Flex justifyContent="center" className="mb-8 font-semibold">
              <Metric color="slate">roi</Metric>
              <Metric color="slate" className="opacity-50">dashboard</Metric>

              <span className="p-1 ml-2 text-[0.5rem] text-white rounded bg-primary-600">
                BETA
              </span>
            </Flex>
            <LoginForm />
          </Card>
        </div>
      </section>
    </>
  );
}
