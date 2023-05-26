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
import React, { useEffect, useState } from "react";

import { Skeleton } from "../skeleton.component";
import { Modal } from "../modal.component";

import { CreateUserForm } from "../users/createUserForm.component"

// const UsersTable = (data: Response) => {
const UsersTable = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(true);

    useEffect(() => {
        const getUsersData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { next: { revalidate: 30 } });
            setData(await res.json());
            setLoading(false);
        }

        getUsersData();
    }, [])

    return (
        <>
            <Modal content={<CreateUserForm />} state={[open, setOpen]} title="Adicionar novo usuário" />
            <Flex alignItems="center" className="mb-5">
                <Metric>Gerenciar usuários</Metric>
                <Button onClick={() => setOpen(true)} icon={UserPlusIcon}>Adicionar usuário</Button>
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
                        {loading ? (
                            <>
                                {
                                    [...Array(5)].map((_, i) => (
                                        <TableRow key={i} className="animate-pulse">
                                            <TableCell><Skeleton /></TableCell>
                                            <TableCell><Skeleton /></TableCell>
                                            <TableCell><Skeleton /></TableCell>
                                            <TableCell><Skeleton /></TableCell>
                                            <TableCell><Skeleton /></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                {
                                    data.data.map((item) => (
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
                                    ))
                                }
                            </>
                        )}

                    </TableBody>
                </Table>
            </Card>

        </>
    );
}

export { UsersTable }