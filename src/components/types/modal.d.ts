export interface ModalStateProps {
    isOpen: boolean,
    type: "createUser" | "editUser" | "deleteUser",
    data: { [key: string]: any }
}