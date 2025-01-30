import { useToast } from "../context/ToastContext"

const useToastType = () => {
    const {addToast} = useToast();

    const success = (message:string)=> addToast(message,"success");
    const error = (message:string)=> addToast(message,"error");
    const warning = (message:string)=> addToast(message,"warning");
    const info = (message:string)=> addToast(message,"info");
    const regular = (message:string)=> addToast(message,"regular");
    return {success,error,warning,info,regular}  
    // returning all the toast types as a object
}

export default useToastType;