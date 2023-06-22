import {
    Card,
    Flex,
    Title,
    Icon
} from "@tremor/react";

import { XMarkIcon } from "@heroicons/react/24/outline"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface Props {
    content: JSX.Element,
    title: string,
    state: [
        modal: {
            isOpen: boolean,
            type: string
        },
        setOpenModal: (object: object) => void
    ]
}


const Modal = ({ content, title, state }: Props) => {
    const [modal, setOpenModal] = state;

    return (
        <Transition appear show={modal.isOpen || false} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => setOpenModal({ ...modal, isOpen: false })}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-full p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="mb-4 text-lg font-medium leading-6 text-gray-900"
                                >
                                    {title}
                                </Dialog.Title>

                                <Flex flexDirection="col" className="gap-3">
                                    {content}
                                </Flex>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

}

export { Modal }