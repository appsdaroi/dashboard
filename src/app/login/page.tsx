import { LoginForm } from "./form";

import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"

import { redirect } from 'next/navigation';

import { Badge, Card, Metric } from "@tremor/react";

export default async function LoginPage() {
  const session = await getServerSession(authOptions)
  if (session) redirect('/');

  return (
    <>
      <section className="min-h-screen pt-20 bg-white">
        <div className="container flex items-center justify-center h-full px-6 py-12 mx-auto">
          <Card className="px-8 py-10 md:w-8/12 lg:w-5/12">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Metric>
                ROI Dashoard
              </Metric>
              <Badge size="xs" className="text-lg">BETA</Badge>
            </div>
            <LoginForm />
          </Card>
        </div>
      </section>
    </>
  );
}
