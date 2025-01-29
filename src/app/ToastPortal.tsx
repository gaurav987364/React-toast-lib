import { useEffect, useState } from "react";
import { uuid } from "../utils/helper";
import  ReactDOM  from "react-dom";
import Toast from "./Toast";


export interface Toasts {
    id: string | number; 
    message: string;
    mode: string;
    autoClose?: boolean | string;
};

interface ToastPortalProps {
    allToast: Toasts[];
    removeToast: (id: string | number) => void;
    autoClose?: boolean;
    autoCloseTime?: number;
    setToast: (toast: Toasts[] | ((prev: Toasts[]) => Toasts[])) => void;
}


const ToastPortal = ({
    allToast,
    removeToast,
    autoCloseTime=3000,
    setToast,
    autoClose=true
}:ToastPortalProps) => {
     //?:todo=> later move this code into custom-hook
    const [loaded,setLoaded] = useState<boolean>(false);
    const [portalId] = useState(`toast-portal-${uuid()}`);
    const [isClose,setIsClosing] = useState<string | number | boolean>("");
   
    useEffect(()=>{
        if(isClose){
            setToast((prev: Toasts[]) => prev.filter((toast: Toasts) => toast.id !== isClose));
        }
    },[isClose]);


    useEffect(()=>{
        if(autoClose && allToast.length){
            const id = allToast[allToast.length - 1].id;
            setTimeout(()=> setIsClosing(id), autoCloseTime);
        }
    },[allToast,autoCloseTime]);


    useEffect(()=>{
        const div = document.createElement("div");  // creating one div
        div.id = portalId; // creating random id for toast
        div.style = "position: fixed; top: 10px; right: 10px; width:250px; min-height:100%; overflow-hidden; display:flex; flex-direction:column; gap:2px"; // position
        document.getElementsByTagName("body")[0].prepend(div); // we push this div into html avobe of root
        setLoaded(true); // set loaded to true

        return () => {
            document.getElementsByTagName("body")[0].removeChild(div); // remove the div from html
        }
    },[portalId]);

    //! instead of normal returning jsx we have to use portals from react-dom which take two arguments first is jsx and second is the div where we want to render;

   return loaded ? ReactDOM.createPortal(
    <div className=" toast-container">
        {allToast?.map((toast : Toasts)=>(
            <Toast 
                key={toast.id} 
                {...toast} 
                onClose={()=>removeToast(toast?.id)}
            />
        ))}
    </div>,
    document.getElementById(portalId) as HTMLElement
   ) : <></>;
}

export default ToastPortal;



//? Portals defination: It provide frist class way of rendering children direclty into dom node outside the DOM hirechy of the parent component;Means haamara app index.html me #root naaam ke div ke andar hota hai portal ka use karke ham uske bahar bhi kuch render kar sakte hai;