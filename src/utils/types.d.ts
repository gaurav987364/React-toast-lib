import { IconType } from "react-icons";

export interface Toasts {
    id: string | number; 
    message: string;
    mode: string;
    emoji?:IconType;
};

// position props of portal
export interface usePortalProps {
    position?:string | undefined;
};

export interface ToasterContainerProps {
    position?:"top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
    autoClose?:boolean;
    autoCloseDuration?: number;
    progressBar?:boolean;
}

export interface ToastUiProps {
    message:string;
    id:string | number;
    mode: string;
    bar?:boolean;
    autoClose?:boolean;
    autoCloseDuration?:number;
}

export interface AddToastProps{
    message:string;
    mode:string;
    emoji?:IconType;
}