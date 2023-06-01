import {
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
        open: boolean,
        setOpen: (boolean: boolean) => void
    ]
}

const ChangePasswordForm = ({ state }: ModalStateProps) => {
    const [info, setInfo] = useState({
        password: "",
    })

    const [modal, setOpenModal] = state;
    const [fetching, setFetching] = useState(false)

    const submitForm = async ({ id, username }: UserProps) => {
        setFetching(true);

        if (!info.password) {
            setFetching(false);
            return toast.error("Preencha com a nova senha!")
        }

        try {
            const res = await FetchWithToken({
                path: `users/${id}`,
                method: "PUT",
                data: { password: info.password },
            });

            if (res.status !== 200) return toast.error("Erro ao alterar senha do usuário.")
            toast.success(`Senha de ${username} foi alterado!`)
            setOpenModal(false);
        } catch {
            setFetching(false);
            return toast.error(`Erro ao alterar senha do usuário ${username}.`)
        }
    }

    return (
        <>
            <TextInput
                onChange={(evt) => setInfo({ ...info, password: evt.target.value })}
                value={info.password}
                type="text"
                icon={LockClosedIcon}
                placeholder="Nova senha"
                className="py-2"
            />

            <Button loading={fetching} loadingText="Alterando senha..." onClick={() => submitForm(modal.data)} className="w-full p-3" icon={PlusIcon}>Alterar senha do usuário</Button>
        </>

    )

}

export { ChangePasswordForm }