import {
    Subtitle,
    TextInput,
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
    Title,
} from "@tremor/react";

import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { UserIcon, LockClosedIcon, PlusIcon } from "@heroicons/react/24/outline"
import { FetchWithToken } from "@/lib/fetch";

import { CentsToReais, ReaisToCents } from "@/helpers/money"
import { UserProps } from "../types/user";
import { Skeleton } from "../skeleton.component";
import moment from "moment";


interface ModalStateProps {
    state: [
        open: boolean,
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

    const getThisUserInfo = async () => {
        try {
            const { data } = await FetchWithToken({
                path: `playpix/${modal.data.user_id}`,
                method: "GET",
                data: {},
            });

            const { extracts } = data.response;

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
                path: `playpix/${id}`,
                method: "DELETE",
            });

            if (data.status === 200) toast.success("Extrato excluído")

            getThisUserInfo();
        } catch (err) {
            toast.error(err);
        }
    }

    // const submitForm = async () => {
    //     setFetching(true);

    //     if (!modal.data.user_id) {
    //         setFetching(false);
    //         return toast.error("ID do usuário não encontrado.")
    //     }

    //     try {

    //         const res = await FetchWithToken({
    //             path: `users/${modal.data.user_id}`,
    //             method: "PUT",
    //             data: {},
    //         });

    //         if (res.status !== 200) return toast.error("Erro ao excluir usuário.")
    //         toast.success(`Usuário ${username} foi excluído com sucesso!`)
    //         setOpenModal(false)
    //     } catch {
    //         setFetching(false);
    //         return toast.error(`Erro ao excluir usuário ${username}.`)
    //     }
    // }

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

            <Title className="block w-full mt-4 text-start">Extratos</Title>

            <Flex flexDirection="col" className="p-2 border border-gray-300 rounded-lg">

                <Table className="w-full">
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>Valor aposta</TableHeaderCell>
                            <TableHeaderCell>Multiplicador</TableHeaderCell>
                            <TableHeaderCell>Valor obtido</TableHeaderCell>
                            <TableHeaderCell>Data</TableHeaderCell>
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
                                            <TableCell>{CentsToReais(item.value)}</TableCell>
                                            <TableCell>{item.quotes}x</TableCell>
                                            <TableCell>{CentsToReais(item.value * parseFloat(item.quotes))}</TableCell>
                                            <TableCell>{(item.created_at && moment(item.created_at).format("DD/MM/YYYY hh:mm:ss")) || <Text className="opacity-50">Não informado</Text>}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </>
                        )}

                    </TableBody>
                </Table>
            </Flex>


            <Button loading={fetching} loadingText="Alterando senha..." onClick={() => submitForm()} className="w-full p-3" icon={PlusIcon}>Alterar senha do usuário</Button>
        </>

    )

}

export { EditUserForm }