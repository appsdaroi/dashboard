export interface ModalStateProps {
    isOpen: boolean,
    type: "createUser" | "changePassword" | "deleteUser",
    data: { [key: string]: any }
}