import  ReactDOM  from "react-dom";
import { usePortal } from "../hooks/usePortal";
import { ToasterContainerProps } from "../utils/types";
import { useToast } from "../context/ToastContext";
import ToastUi from "../components/ToastUi";
import { useEffect, useRef } from "react";


const Toaster = ({
    position="top-right",
    autoClose = true,
    autoCloseDuration,
    progressBar = true,
}:ToasterContainerProps) => {
  
    const {toasts,setToasts} = useToast();
    const {loaded,portalId} = usePortal({position});
    // const [isClose,setIsClosing] = useState<string | number | boolean>("");
    //? ref for storing time previous wala 
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // useEffect(()=>{
    //   if(isClose){
    //     setToasts((prev)=> prev?.filter((t)=> t.id !== isClose));
    //   }
    // },[isClose]);

    // useEffect(()=>{
    //   if(autoClose && toasts.length){
    //     const id = toasts[toasts.length - 1]?.id;
    //     setTimeout(()=> setIsClosing(id), autoCloseDuration);
    //   }
    // },[autoClose, autoCloseDuration,toasts]);

    // Unnecessary useEffect calls.
    // setTimeout should be stored in useRef to prevent unnecessary re-renders.

    useEffect(() => {
      if (autoClose && toasts.length) {
        const id = toasts[toasts.length - 1]?.id;
        timeoutRef.current = setTimeout(() => {
          setToasts((prev) => prev?.filter((t) => t.id !== id));
        }, autoCloseDuration);
      }
  
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, [autoClose, autoCloseDuration, toasts]);
    
  return loaded && ReactDOM.createPortal(
    <div className="toast-container">
        {toasts?.map((toast) => (
           <ToastUi 
            key={toast.id} 
            {...toast} 
            bar={progressBar} 
            autoClose={autoClose}  // to close specific toast
            autoCloseDuration={autoCloseDuration}
           />
        ))}
    </div>,
    document.getElementById(portalId) as HTMLElement
  ) 
};

export default Toaster;