import {
    Text,
    Flex,
    Icon,
    Button,
} from "@tremor/react";

import { useState } from "react";
import toast from 'react-hot-toast';
import { ExclamationTriangleIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"

import { ModalStateProps } from "../types/modal";

import { FetchWithToken } from "@/lib/fetch"
import { UserProps } from "../types/user";

interface Props {
    state: [
        modal: ModalStateProps,
        setOpenModal: (boolean: boolean) => void
    ]
}


const DeleteUserForm = ({ state }: Props) => {
    const [modal, setOpenModal] = state;
    const [fetching, setFetching] = useState(false)

    const submitForm = async () => {
        setFetching(true);

        try {
            const res = await FetchWithToken({
                path: `instamoney/${modal.data.user_id}`,
                method: "DELETE",
            });

            if (res.status !== 200) return toast.error(`Erro ao excluir saldo de ${modal.data.username}.`)
            
            toast.success(`Saldo de ${modal.data.username} foi excluído com sucesso!`)
            setOpenModal(false)
        } catch {
            setFetching(false);
            return toast.error(`Erro ao excluir saldo de ${modal.data.username}.`)
        }
    }

    return (
        <>
            <Flex className="gap-1 mb-2" flexDirection="col">
                <Text className="text-lg">Deseja excluir o saldo do usuário <span style={{ fontWeight: 700 }}>{modal.data.username}</span>?</Text>
                <Flex justifyContent="center">
                    <Icon size="xs" color="red" icon={ExclamationTriangleIcon} />
                    <Text>Essa ação é irreversível</Text>
                </Flex>
            </Flex>


            <Button color="red" loading={fetching} loadingText="Excluindo usuário..." onClick={() => submitForm(modal.data)} className="w-full p-3" icon={TrashIcon}>Sim, quero excluir o usuário!</Button>
        </>

    )

}

export { DeleteUserForm }