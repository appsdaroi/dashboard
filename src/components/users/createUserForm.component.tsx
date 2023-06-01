import {
    Card,
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    Flex,
    Title,
    Button,
    TextInput
} from "@tremor/react";

import { useState } from "react";
import { toast } from 'react-toastify';
import { UserIcon, LockClosedIcon, PlusIcon } from "@heroicons/react/24/outline"
import { FetchWithToken } from "@/lib/fetch";
import { UserProps } from "../types/user";

interface ModalStateProps {
    state: [
        _: boolean,
        setOpen: (boolean: boolean) => void
    ]
}

const CreateUserForm = ({ state }: ModalStateProps) => {
    const [info, setInfo] = useState({
        username: "",
        password: ""
    })

    const [_, setOpen] = state;
    const [fetching, setFetching] = useState(false)

    const submitForm = async ({ username, password }: UserProps, setFetching: (state: boolean) => void) => {
        setFetching(true);

        if (!username || !password) {
            setFetching(false);
            return toast.error("Preencha os dados corretamente!")
        }

        try {
            const res = await FetchWithToken({
                path: "users",
                method: "POST",
                data: { username, password }, 
            });
    
            if (res.status !== 200) return toast.error("Erro ao criar usuário.")
            toast.success(`Usuário ${username} foi criado com sucesso!`)
            setOpen(false)
        } catch {
            setFetching(false);
            return toast.error("Erro ao alterar senha do usuário.")
        }

    }

    return (
        <>
            <TextInput
                onChange={(evt) => setInfo({ ...info, username: evt.target.value })}
                value={info.username}
                icon={UserIcon}
                placeholder="Usuário"
                className="py-2"
            />

            <TextInput
                onChange={(evt) => setInfo({ ...info, password: evt.target.value })}
                value={info.password}
                type="password"
                icon={LockClosedIcon}
                placeholder="Senha"
                className="py-2"
            />

            <Button loading={fetching} loadingText="Criando usuário..." onClick={() => submitForm(info, setFetching)} className="w-full p-3" icon={PlusIcon}>Criar novo usuário</Button>
        </>

    )

}

export { CreateUserForm }