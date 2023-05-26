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

interface UserProps {
    username: string,
    password: string
}

const submitForm = async ({ username, password }: UserProps, setFetching: (state: boolean) => void) => {
    setFetching(true);

    setTimeout(() => {
        if (!username || !password) {
            setFetching(false);
            return toast.error("Preencha os dados corretamente!")
        }
    }, 5000);

}

const CreateUserForm = () => {
    const [info, setInfo] = useState({
        username: "",
        password: ""
    })

    const [fetching, setFetching] = useState(false)

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