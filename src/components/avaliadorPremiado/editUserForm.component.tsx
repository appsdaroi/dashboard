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
import toast from 'react-hot-toast';
import { UserIcon, LockClosedIcon, PencilSquareIcon } from "@heroicons/react/24/outline"
import { FetchWithToken } from "@/lib/fetch";

import { CentsToReais, ReaisToCents } from "@/helpers/money"
import { formatToBRL } from 'brazilian-values';

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
        balance: ""
    })

    const [modal, setOpenModal] = state;
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        console.log(modal.data)
    }, [])

    const submitForm = async () => {
        if (!Object.values(info).some(v => v)) return toast.error("Preencha todos os campos.")

        setFetching(true);

        const { data } = await FetchWithToken({
            path: `avaliadorpremiado/${modal.data.id}`,
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

    const formatInputToCurrency = (value: string) => {
        const currency = value.toString().replace(/\D/g, '');
        return formatToBRL(currency);
    }

    return (
        <>
            <TextInput
                onInput={() => formatInputToCurrency(evt.target.value)}
                onChange={(evt) => setInfo({ ...info, balance: evt.target.value })}
                value={info.balance}
                type="text"
                icon={LockClosedIcon}
                placeholder="Novo saldo"
                className="py-2"
            />

            <Button loading={fetching} loadingText="Alterando saldo..." onClick={() => submitForm()} className="w-full p-3" icon={PencilSquareIcon}>Alterar saldo do usuário</Button>
        </>

    )

}

export { EditUserForm }