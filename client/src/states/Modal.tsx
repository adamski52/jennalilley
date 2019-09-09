export interface IModal {
    title: string;
    message: string;
}

export interface ModalProps extends IModal {
    onClose: () => void; 
}

export interface ModalState {

}
