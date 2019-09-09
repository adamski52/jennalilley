export interface BasePageProps {
    setGlobalMessage: (type:string, message:string) => void;
    clearGlobalMessage: () => void;
    setModalMessage: (title: string, message: string) => void;
    clearModalMessage: () => void;
}
