import { useEffect, useState } from "react";
import { uuid } from "../utils/helper";
import  ReactDOM  from "react-dom";
import Toast from "../components/Toast";


export interface Toasts {
    id: string | number; 
    message: string;
    mode: string;
    autoClose?: boolean | string;
};

interface ToastPortalProps {
    allToast: Toasts[];
    removeToast: (id: string | number) => void;
}


const ToastPortal = ({allToast,removeToast}:ToastPortalProps) => {
     //?:todo=> later move this code into custom-hook
    const [loaded,setLoaded] = useState<boolean>(false);
    const [portalId] = useState(`toast-portal-${uuid()}`);

   
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