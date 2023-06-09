import { Subtitle, Flex, Metric } from "@tremor/react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { CardModule } from "../components/card.component"
import moment from "moment";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ROI Dashboard",
  description: "An dashboard to control all ROI apps",
};


export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.session.user;

  const greeting = () => {
    const hour = moment().hour();

    if (hour > 18) {
      return "Boa noite";
    }

    if (hour > 12) {
      return "Boa tarde";
    }

    return "Bom dia";
  }

  return (
    <>
      <section>
        <Flex flexDirection="col" alignItems="start" className="gap-px mx-auto mb-8 text-left">
          <Metric>{greeting()}, {user?.name}!</Metric>
          <Subtitle>O que você deseja fazer hoje?</Subtitle>
        </Flex>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(0px,300px))] grid-rows-1 p-4 mx-auto gap-7">
          <CardModule link="/users" title="Geren. usuários" image="./images/cards/users.jpg" />
          <CardModule link="/playpix" title="Playpix" image="./images/cards/playpix.jpg" />
          <CardModule link="/socialmoney" title="Socialmoney" image="./images/cards/socialmoney.jpg" />
          <CardModule link="/itau" title="Itaú" image="./images/cards/itau.jpg" />
          <CardModule link="/nubank" title="Nubank" image="./images/cards/nubank.jpg" />
          <CardModule link="/avaliador-de-marcas" title="Avaliador de marcas" image="./images/cards/money-looks.jpg" />
          <CardModule link="/betano" title="Betano" image="./images/cards/betano.jpg" />
          <CardModule link="/avaliador-premiado" title="Avaliador Premiado" image="./images/cards/ap.jpg" />
        </div>

      </section>
    </>
  );
}
