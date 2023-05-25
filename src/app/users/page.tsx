"use client"

import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Metric,
  Flex,
  Button,
  Icon
} from "@tremor/react";

import { UserPlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface User {
  id: number,
  username: string,
  created_at: string | null,
  updated_at: string | null,
}

interface Response {
  data: User[]
}

const getUsersData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { next: { revalidate: 30 } });
  return res.json();
}

const promise = getUsersData();

export default async function Profile() {
  const data: Response = await promise;

  return (
    <section className="max-w-5xl min-h-screen pt-20 mx-auto">
      <Flex alignItems="center" className="mb-5">
        <Metric>Gerenciar usuários</Metric>
        <Button icon={UserPlusIcon}>Adicionar usuário</Button>
      </Flex>
      <Card>
        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Usuário</TableHeaderCell>
              <TableHeaderCell>Criação</TableHeaderCell>
              <TableHeaderCell>Última edição</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.username}</TableCell>
                <TableCell>{item.created_at || <Text className="opacity-50">Não informado</Text>}</TableCell>
                <TableCell>{item.updated_at || <Text className="opacity-50">Não informado</Text>}</TableCell>
                <TableCell>
                  <Flex justifyContent="start" className="gap-2 w-max">
                    <Icon
                      icon={PencilSquareIcon}
                      variant="solid"
                      tooltip="Alterar senha do usuário"
                      className="cursor-pointer"
                    />
                    <Icon
                      icon={TrashIcon}
                      color="red"
                      variant="solid"
                      tooltip="Excluir usuário"
                      className="cursor-pointer"
                    />
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </section>
  );
}