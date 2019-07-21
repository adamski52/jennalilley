import { PageContainerBaseProps, PageContainerBaseState } from "./Containers";

export interface ContactPageProps extends PageContainerBaseProps {
    
}

export interface ContactPageState extends PageContainerBaseState {
    content: string;
    instagram: string;
    phone: string;
    facebook: string;
    twitter: string;
}
