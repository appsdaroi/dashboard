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
    Icon,
} from "@tremor/react";

import { UserPlusIcon, PencilSquareIcon, TrashIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";

import { Skeleton } from "../skeleton.component";
import { Modal } from "../modal.component";

import { EditUserForm } from "./editUserForm.component"
import { CreateUserForm } from "./createUserForm.component"
import { DeleteUserForm } from "./deleteUserForm.component"
import moment from "moment";

import { ResponsiveButton } from "../responsiveButton.component"

import { FetchWithToken } from "@/lib/fetch"
import { CentsToReais } from "@/helpers/money"

import { ModalStateProps } from "../types/modal";

// const UsersTable = (data: Response) => {
const UsersTable = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modal, setOpenModal] = useState<ModalStateProps>({
        isOpen: false,
        type: "createUser",
        data: {}
    });

    const modalContent = {
        editUser: {
            el: <EditUserForm state={[modal, setOpenModal]} />,
            title: "Alterar saldo"
        },
        createUser: {
            el: <CreateUserForm state={[modal, setOpenModal]} />,
            title: "Criar saldo"
        },
        deleteUser: {
            el: <DeleteUserForm state={[modal, setOpenModal]} />,
            title: "Excluir saldo"
        },
    }

    const getUsersData = async () => {

        const { data } = await FetchWithToken({
            path: "avaliadorpremiado",
            method: "GET",
        });

        setData(data);
        setLoading(false);
    }

    useEffect(() => {
        if (!modal.isOpen) getUsersData();
    }, [modal.isOpen])

    return (
        <>
            <Modal content={modalContent[modal.type]?.el} state={[modal, setOpenModal]} title={modalContent[modal.type]?.title} />
            <Flex alignItems="center" justifyContent="start" className="gap-3 mb-5">
                <Metric>Geren. usuários Avaliador de Marcas</Metric>

                <ResponsiveButton
                    className="ml-2 small"
                    onClick={() => setOpenModal({
                        isOpen: true,
                        type: "createUser",
                        data: data.response
                    })}
                    icon={UserPlusIcon}
                >
                    Adicionar usuário
                </ResponsiveButton>

                <Icon icon={ArrowUpRightIcon} variant="light" className="p-2 cursor-pointer" color="violet" tooltip="Abrir app" onClick={() => window.open("https://money-looks.vercel.app",'_blank')}/>
            </Flex>
            <Card className="border-0 ring-0">
                <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>#</TableHeaderCell>
                            <TableHeaderCell>Usuário</TableHeaderCell>
                            <TableHeaderCell>Saldo</TableHeaderCell>
                            <TableHeaderCell>Banco</TableHeaderCell>
                            <TableHeaderCell>Cód. de indicação</TableHeaderCell>
                            <TableHeaderCell>Saldo de indicação</TableHeaderCell>
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
                                    data.response.map((item) => (
                                        <TableRow key={item.user_id}>
                                            <TableCell>{item.user_id}</TableCell>
                                            <TableCell>{item.username}</TableCell>
                                            <TableCell>{CentsToReais(item.balance)}</TableCell>
                                            <TableCell>{item.bank}</TableCell>
                                            <TableCell>{item.ref}</TableCell>
                                            <TableCell>{CentsToReais(item.ref_balance)}</TableCell>
                                            <TableCell>{(item.created_at && moment(item.created_at).format("DD/MM/YYYY HH:mm:ss")) || <Text className="opacity-50">Não informado</Text>}</TableCell>
                                            <TableCell>{(item.updated_at && moment(item.updated_at).format("DD/MM/YYYY HH:mm:ss")) || <Text className="opacity-50">Não informado</Text>}</TableCell>
                                            <TableCell>
                                                <Flex justifyContent="start" className="gap-2 w-max">
                                                    <Icon
                                                        icon={PencilSquareIcon}
                                                        variant="solid"
                                                        tooltip={`Alterar saldo e extratos de ${item.username}`}
                                                        className="cursor-pointer"
                                                        onClick={() => setOpenModal({
                                                            isOpen: true,
                                                            type: "editUser",
                                                            data: item
                                                        })}
                                                    />
                                                    <Icon
                                                        icon={TrashIcon}
                                                        color="red"
                                                        variant="solid"
                                                        tooltip={`Excluir saldo e extratos de ${item.username}`}
                                                        className="cursor-pointer"
                                                        onClick={() => setOpenModal({
                                                            isOpen: true,
                                                            type: "deleteUser",
                                                            data: item
                                                        })}
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