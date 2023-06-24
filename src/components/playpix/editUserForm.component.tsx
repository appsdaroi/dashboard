import {
    TextInput,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Flex,
    Button,
    Icon,
    Title,
} from "@tremor/react";

import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { LockClosedIcon, PlusIcon, CurrencyDollarIcon, XMarkIcon, TrophyIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
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
        balance: "",
        extracts: []
    })

    const [modal, setOpenModal] = state;
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(true);

    const [newExtract, setNewExtract] = useState({
        isOpen: false,
        info: {
            quotes: "",
            value: "",
            date: ""
        }
    });

    const getThisUserInfo = async () => {
        try {
            const { data } = await FetchWithToken({
                path: `playpix/${modal.data.user_id}/extracts`,
                method: "GET",
            });

            const extracts = data.response;

            setInfo({
                balance: CentsToReais(modal.data.balance),
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
                path: `playpix/${modal.data.user_id}/extracts/${id}`,
                method: "DELETE",
            });

            if (data.status === 200) toast.success("Extrato excluído")

            getThisUserInfo();
        } catch (err) {
            toast.error(err);
        }
    }

    const insertExtract = async (id: string) => {
        try {
            const { data } = await FetchWithToken({
                path: `playpix/${modal.data.user_id}/extracts`,
                method: "POST",
                data: {
                    value: ReaisToCents(newExtract.info.value),
                    date: moment(newExtract.info.date).format("YYYY-MM-DD HH:mm:ss"),
                    quotes: newExtract.info.quotes
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
        if (info.balance == null && info.balance?.length === 0) return toast.error("Preencha um dos campos.")

        setFetching(true);

        const { data } = await FetchWithToken({
            path: `playpix/${modal.data.user_id}`,
            method: "PUT",
            data: {
                balance: ReaisToCents(info.balance)
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
                onChange={(evt) => setInfo({ ...info, balance: evt.target.value })}
                value={info.balance}
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
                    <TextInput
                        onChange={(evt) => setNewExtract({
                            ...newExtract,
                            info: {
                                ...newExtract.info,
                                value: evt.target.value
                            }
                        })}
                        type="text"
                        icon={CurrencyDollarIcon}
                        placeholder="Valor apostado"
                        className="py-2"
                    />

                    <TextInput
                        onChange={(evt) => setNewExtract({
                            ...newExtract,
                            info: {
                                ...newExtract.info,
                                quotes: evt.target.value
                            }
                        })}
                        type="text"
                        icon={XMarkIcon}
                        placeholder="Multiplicador"
                        className="py-2"
                    />

                    {console.log()}

                    <TextInput
                        type="text"
                        icon={TrophyIcon}
                        className="py-2"
                        disabled
                        value={`Valor ganho: ${CentsToReais((newExtract.info.value && newExtract.info.quotes) ? (newExtract.info.quotes * ReaisToCents(newExtract.info.value)) : 0)}`}
                    />

                    <input onChange={(evt) => setNewExtract({
                        ...newExtract,
                        info: {
                            ...newExtract.info,
                            date: evt.target.value
                        }
                    })} type="datetime-local" className="w-full p-4 text-sm border rounded-xl" />
                    <Button onClick={() => insertExtract()} className="w-full p-3" icon={PlusIcon}>Criar novo extrato</Button>
                </Flex>
            )}

            <Flex flexDirection="col" className="p-2 border border-gray-300 rounded-lg">

                <Table className="w-full max-h-[400px]">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell className="bg-white z-[999]">Valor aposta</TableHeaderCell>
                            <TableHeaderCell className="bg-white z-[999]">Multiplicador</TableHeaderCell>
                            <TableHeaderCell className="bg-white z-[999]">Valor obtido</TableHeaderCell>
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
                                            <TableCell>{CentsToReais(item.value)}</TableCell>
                                            <TableCell>{item.quotes}x</TableCell>
                                            <TableCell>{CentsToReais(item.value * parseFloat(item.quotes))}</TableCell>
                                            <TableCell>{(item.date && moment(item.date).format("DD/MM/YYYY HH:mm:ss")) || <Text className="opacity-50">Não informado</Text>}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </>
                        )}

                    </TableBody>
                </Table>
            </Flex>


            <Button loading={fetching} loadingText="Alterando dados..." onClick={() => submitForm()} className="w-full p-3" icon={ArrowPathIcon}>Alterar dados do usuário</Button>
        </>

    )

}

export { EditUserForm }