import {
    TextInput,
    Text,
    Button,
    SelectBox,
    SelectBoxItem
} from "@tremor/react";

import { useState, useEffect } from "react";
import { FetchWithToken } from "@/lib/fetch";

import toast from 'react-hot-toast';
import { UsersIcon, LockClosedIcon, PlusIcon, CalculatorIcon } from "@heroicons/react/24/outline"

import { ReaisToCents } from "@/helpers/money"
import { formatToBRL } from 'brazilian-values';

interface ModalStateProps {
    state: [
        open: {
            [key: string]: any
        },
        setOpen: (boolean: boolean) => void
    ]
}

const CreateUserForm = ({ state }: ModalStateProps) => {
    const [modal, setOpenModal] = state;

    const [info, setInfo] = useState({
        balance: "",
        user_id: 0,
        bank: ""
    })

    const [userList, setUserList] = useState([]);
    const [fetching, setFetching] = useState(false);

    const getUsersData = async () => {
        try {
            const { data } = await FetchWithToken({
                path: "users",
                method: "GET",
            });

            if (data.status !== 200) return toast.error("Erro ao consultar lista de usuários.")
            const removeUsersWithBalance = data.data.filter(k => !modal.data.some(p => p.user_id == k.id));

            setUserList(removeUsersWithBalance);
        } catch (err) {
            toast.error(err)
        }
    }

    useEffect(() => {
        getUsersData()
    }, [])

    const submitForm = async () => {
        if (!Object.values(info).some(v => v)) return toast.error("Preencha todos os campos.")

        setFetching(true);

        try {
            const { data } = await FetchWithToken({
                path: "socialmoney",
                method: "POST",
                data: {
                    user_id: info.user_id,
                    bank: info.bank,
                    balance: ReaisToCents(info.balance)
                }
            });

            if (data.status !== 200) return toast.error("Erro ao criar saldo.")

            setFetching(false);
            toast.success("Saldo criado!")

            setTimeout(() => {
                setOpenModal(false);
            }, 500);
        } catch (err) {

        }
    }

    const formatInputToCurrency = (value: string) => {
        const currency = value.toString().replace(/\D/g, '');
        return formatToBRL(currency);
    }

    return (
        <>
            <Text>Selecione o usuário e o banco na qual ele vai estar conectado.</Text>
            <SelectBox placeholder="Selecione o usuário...">
                {
                    userList.map((user, i) => (
                        <SelectBoxItem key={user.id} onClick={() => setInfo({
                            ...info,
                            user_id: user.id
                        })} value={`${user.username}`} icon={UsersIcon} />
                    ))
                }
            </SelectBox>

            <SelectBox placeholder="Selecione o banco...">
                <SelectBoxItem onClick={() => setInfo({
                    ...info,
                    bank: "itau"
                })} value="Itaú" icon={UsersIcon} />
            </SelectBox>

            <TextInput
                onInput={(evt) => formatInputToCurrency(evt.target.value)}
                onChange={(evt) => setInfo({ ...info, balance: evt.target.value })}
                value={info.balance}
                type="text"
                icon={LockClosedIcon}
                placeholder="Saldo do usuário"
                className="py-2 mt-4"
            />

            <Button disabled={info.user_id === 0} loading={fetching} loadingText="Criando saldo..." onClick={() => submitForm()} className="w-full p-3" icon={PlusIcon}>Criar saldo</Button>
        </>

    )

}

export { CreateUserForm }