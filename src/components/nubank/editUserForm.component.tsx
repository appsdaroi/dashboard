import {
    TextInput,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Flex,
    Button,
    Icon,
    Title,
    SelectBox,
    SelectBoxItem,
} from "@tremor/react";

import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { UserIcon, LockClosedIcon, PlusIcon } from "@heroicons/react/24/outline"
import { FetchWithToken } from "@/lib/fetch";

import { CentsToReais, ReaisToCents } from "@/helpers/money"
import { UserProps } from "../types/user";
import { Skeleton } from "../skeleton.component";
import moment from "moment";


interface ModalStateProps {
    state: [
        open: {
            [key: string]: any
        },
        setOpen: (boolean: boolean) => void
    ]
}

const EditUserForm = ({ state }: ModalStateProps) => {
    const [info, setInfo] = useState({
        saldo: "",
        extracts: []
    })

    const [modal, setOpenModal] = state;
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(true);

    const [newExtract, setNewExtract] = useState({
        isOpen: false,
        info: {
            tipo: "",
            remetente: "",
            valor: "",
            data: ""
        }
    });

    const getThisUserInfo = async () => {
        try {
            const { data } = await FetchWithToken({
                path: `nubank/${modal.data.user_id}/extracts`,
                method: "GET",
            });

            const extracts = data.response;

            setInfo({
                saldo: CentsToReais(modal.data.saldo),
                extracts
            })

            setLoading(false)
        } catch (err) {
            toast.error(err);
        }
    }

    const deleteThisRow = async (id: string) => {
        try {
            const { data } = await FetchWithToken({
                path: `nubank/${modal.data.user_id}/extracts/${id}`,
                method: "DELETE",
            });

            if (data.status === 200) toast.success("Extrato excluído")

            getThisUserInfo();
        } catch (err) {
            toast.error(err);
        }
    }

    const insertExtract = async () => {
        try {
            const { data } = await FetchWithToken({
                path: `nubank/${modal.data.user_id}/extracts`,
                method: "POST",
                data: {
                    valor: ReaisToCents(newExtract.info.valor),
                    data: moment(newExtract.info.data).format("YYYY-MM-DD HH:mm:ss"),
                    tipo: newExtract.info.tipo,
                    remetente: newExtract.info.remetente
                }
            });

            if (data.status === 200) toast.success("Extrato criado")

            getThisUserInfo();
        } catch (err) {
            toast.error(err);
        }
    }

    const submitForm = async () => {
        console.log(info)
        if (info.saldo == null && info.saldo?.length === 0) return toast.error("Preencha um dos campos.")

        setFetching(true);

        const { data } = await FetchWithToken({
            path: `nubank/${modal.data.user_id}`,
            method: "PUT",
            data: {
                saldo: ReaisToCents(info.saldo)
            }
        });

        if (data.status !== 200) return toast.error("Erro ao alterar saldo.")

        setFetching(false);
        toast.success("Saldo alterado!")

        setTimeout(() => {
            setOpenModal(false);
        }, 500);
    }

    useEffect(() => {
        getThisUserInfo();
    }, [])

    return (
        <>
            <TextInput
                onChange={(evt) => setInfo({ ...info, saldo: evt.target.value })}
                value={info.saldo}
                type="text"
                icon={LockClosedIcon}
                placeholder="Nova senha"
                className="py-2"
            />

            <Flex className="gap-2" alignItems="center" justifyContent="start">
                <Title className="block text-start">Extratos</Title>
                <Icon onClick={() => setNewExtract({
                    ...newExtract,
                    isOpen: !newExtract.isOpen
                })} icon={PlusIcon} className="cursor-pointer" size="xs" color="violet" variant="light" tooltip="Adicionar extrato"></Icon>
            </Flex>

            {newExtract.isOpen && (
                <Flex flexDirection="col" className="gap-2">
                    <SelectBox placeholder="Selecione o tipo do extrato...">
                        <SelectBoxItem onClick={() => setNewExtract({
                            ...newExtract,
                            info: {
                                ...newExtract.info,
                                tipo: "deposit"
                            }
                        })} value="Entrada" />

                        <SelectBoxItem onClick={() => setNewExtract({
                            ...newExtract,
                            info: {
                                ...newExtract.info,
                                tipo: "withdraw"
                            }
                        })} value="Saída" />
                    </SelectBox>

                    <TextInput
                        onChange={(evt) => setNewExtract({
                            ...newExtract,
                            info: {
                                ...newExtract.info,
                                remetente: evt.target.value
                            }
                        })}
                        type="text"
                        icon={LockClosedIcon}
                        placeholder="Título do extrato (socialmoney, money looks, etc...)"
                        className="py-2"
                    />

                    <TextInput
                        onChange={(evt) => setNewExtract({
                            ...newExtract,
                            info: {
                                ...newExtract.info,
                                valor: evt.target.value
                            }
                        })}
                        type="text"
                        icon={LockClosedIcon}
                        placeholder="Valor do extrato"
                        className="py-2"
                    />

                    <input onChange={(evt) => setNewExtract({
                        ...newExtract,
                        info: {
                            ...newExtract.info,
                            data: evt.target.value
                        }
                    })} type="datetime-local" className="w-full p-4 text-sm border rounded-xl" />
                    <Button onClick={() => insertExtract()} className="w-full p-3" icon={PlusIcon}>Criar novo extrato</Button>
                </Flex>
            )}

            <Flex flexDirection="col" className="p-2 border border-gray-300 rounded-lg">

                <Table className="w-full max-h-[400px]">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell className="bg-white z-[999]">Tipo</TableHeaderCell>
                            <TableHeaderCell className="bg-white z-[999]">Título</TableHeaderCell>
                            <TableHeaderCell className="bg-white z-[999]">Valor</TableHeaderCell>
                            <TableHeaderCell className="bg-white z-[999]">Data</TableHeaderCell>
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
                                        </TableRow>
                                    ))
                                }
                            </>
                        ) : (
                            <>
                                {
                                    info.extracts.map((item) => (
                                        <TableRow onClick={() => deleteThisRow(item.id)} key={item.id} className="relative cursor-pointer after:transition-all after:absolute after:bg-red-500/10 after:w-full after:h-full after:right-0 after:top-0 after:opacity-0 after:rounded-lg hover:after:opacity-100">
                                            <TableCell>{item.tipo}</TableCell>
                                            <TableCell>{item.remetente}</TableCell>
                                            <TableCell>{CentsToReais(item.valor)}</TableCell>
                                            <TableCell>{moment(item.data).format("DD/MM/YYYY HH:mm:ss")}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </>
                        )}

                    </TableBody>
                </Table>
            </Flex>


            <Button loading={fetching} loadingText="Alterando dados..." onClick={() => submitForm()} className="w-full p-3" icon={PlusIcon}>Alterar dados do usuário</Button>
        </>

    )

}

export { EditUserForm }