import React, { createContext, useCallback, useContext, useState } from "react";
import { Toasts } from "../utils/types";
import { uuid } from "../utils/helper";

interface ContextTypes {
    toasts:Toasts[];
    setToasts:React.Dispatch<React.SetStateAction<Toasts[]>>;
    addToast:(message:string,mode:string)=>void;
    removeToast:(id:string | number)=>void;
}
export const ToastContext = createContext<ContextTypes | undefined>(undefined);

export const ToastProvider = ({children}:{children:React.ReactNode})=>{
    const [toasts,setToasts] = useState<Toasts[]>([]);

    const addToast = useCallback((message:string,mode:string)=>{
        setToasts((prev)=>[...prev, {message, mode, id:uuid()}]);
    },[]);

    const removeToast = useCallback((id:string | number)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id!==id));
    },[]);
    
    return (
        <ToastContext.Provider value={{toasts,setToasts,addToast,removeToast}}>
            {children}
        </ToastContext.Provider>
    )
};

export const useToast = ()=>{
    const context = useContext(ToastContext);
    if(!context){
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};