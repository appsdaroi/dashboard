import {
    Card,
    Flex,
    Title,
    Icon
} from "@tremor/react";

import { XMarkIcon } from "@heroicons/react/24/outline"

interface Props {
    content: JSX.Element,
    title: string,
    state: [
        modal: {
            isOpen: boolean,
            type: string
        },
        setOpenModal: (boolean: boolean) => void
    ]
}

const Modal = ({ content, title, state }: Props) => {
    const [open, setOpenModal] = state;

    return (
        <>
            {open && (
                <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/20 flex items-center justify-center w-screen h-screen z-[9999]">
                    <Card className="max-w-xl">
                        <Flex className="pb-4">
                            <Title>{title}</Title>
                            <Icon className="cursor-pointer text-slate-300" icon={XMarkIcon} onClick={() => setOpenModal(false)} />
                        </Flex>
                        <Flex flexDirection="col" className="gap-3 p-4">
                            {content}
                        </Flex>
                    </Card>
                </div>
            )}
        </>

    )

}

export { Modal }