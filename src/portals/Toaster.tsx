import  ReactDOM  from "react-dom";
import { usePortal } from "../hooks/usePortal";
import { ToasterContainerProps } from "../utils/types";
import { useToast } from "../context/ToastContext";
import ToastUi from "../components/ToastUi";

const Toaster = ({
    position="top-right",
}:ToasterContainerProps) => {
    const {toasts} = useToast();
    const {loaded,portalId} = usePortal({position});


  return loaded && ReactDOM.createPortal(
    <div className=" toast-container">
        {toasts?.map((toast) => (
           <ToastUi key={toast.id} {...toast}/>
        ))}
    </div>,
    document.getElementById(portalId) as HTMLElement
  ) 
};

export default Toaster;