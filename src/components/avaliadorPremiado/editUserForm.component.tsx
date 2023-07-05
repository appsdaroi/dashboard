import {
    TextInput,
    Button,
    SelectBox,
    SelectBoxItem,
} from "@tremor/react";

import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { BanknotesIcon, PencilSquareIcon, UsersIcon } from "@heroicons/react/24/outline"
import { FetchWithToken } from "@/lib/fetch";

import { CentsToReais, ReaisToCents } from "@/helpers/money"

interface ModalStateProps {
    state: [
        open: {
            [key: string]: any
        },
        setOpen: (boolean: boolean) => void
    ]
}

const EditUserForm = ({ state }: ModalStateProps) => {
    const [modal, setOpenModal] = state;
    const [fetching, setFetching] = useState(false);

    const [info, setInfo] = useState({
        balance: CentsToReais(modal.data.balance),
        ref_balance: CentsToReais(modal.data.ref_balance),
        bank: modal.data.bank,
    })

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
                balance: ReaisToCents(info.balance),
                ref_balance: ReaisToCents(info.ref_balance),
                bank: info.bank
            }
        });

        if (data.status !== 200) return toast.error("Erro ao alterar dados.")

        setFetching(false);
        toast.success("Dados alterados!")

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
                icon={BanknotesIcon}
                placeholder="Novo saldo"
                className="py-2"
            />
            <TextInput
                onChange={(evt) => setInfo({ ...info, ref_balance: evt.target.value })}
                value={info.ref_balance}
                type="text"
                icon={UsersIcon}
                placeholder="Novo saldo de indicação"
                className="py-2"
            />

            <SelectBox placeholder="Selecione o banco...">
                <SelectBoxItem onClick={() => setInfo({
                    ...info,
                    bank: "itau"
                })} value="Itaú" icon={UsersIcon} />
                <SelectBoxItem onClick={() => setInfo({
                    ...info,
                    bank: "nubank"
                })} value="Nubank" icon={UsersIcon} />
            </SelectBox>

            <Button loading={fetching} loadingText="Alterando saldo..." onClick={() => submitForm()} className="w-full p-3" icon={PencilSquareIcon}>Alterar saldo do usuário</Button>
        </>

    )

}

export { EditUserForm }