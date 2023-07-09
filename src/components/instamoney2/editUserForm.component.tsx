import {
    TextInput,
    Button,
    SelectBox,
    SelectBoxItem,
} from "@tremor/react";

import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { LockClosedIcon, PencilSquareIcon, UsersIcon } from "@heroicons/react/24/outline"
import { FetchWithToken } from "@/lib/fetch";

import { ReaisToCents } from "@/helpers/money"

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
        bank: ""
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
            path: `igmoney-admin-users/${modal.data.id}`,
            method: "PUT",
            data: {
                saldo: ReaisToCents(info.balance) / 10000,
                banco: info.bank == "" ? modal.data.banco : info.bank
            }
        });

        if (data.status !== 200) return toast.error("Erro ao alterar saldo.")

        setFetching(false);
        toast.success("Saldo alterado!")

        setTimeout(() => {
            setOpenModal(false);
        }, 500);
    }

    return (
        <>
            <TextInput
                onChange={(evt) => setInfo({ ...info, balance: evt.target.value })}
                value={info.balance}
                type="text"
                icon={LockClosedIcon}
                placeholder="Novo saldo"
                className="py-2"
            />

            <SelectBox placeholder="Selecione o banco...">
                <SelectBoxItem onClick={() => setInfo({
                    ...info,
                    bank: "itau"
                })} value="Itaú" icon={UsersIcon} />
                {/* <SelectBoxItem onClick={() => setInfo({
                    ...info,
                    bank: "nubank"
                })} value="nubank" icon={UsersIcon} /> */}
            </SelectBox>

            <Button loading={fetching} loadingText="Alterando saldo..." onClick={() => submitForm()} className="w-full p-3" icon={PencilSquareIcon}>Alterar saldo do usuário</Button>
        </>

    )

}

export { EditUserForm }