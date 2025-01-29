import { MdClose } from "react-icons/md";
import { ToastUiProps } from "../utils/types";
import { useToast } from "../context/ToastContext";

const infoGreen : string = "bg-blue-400";
const dangerRed  : string= "bg-red-400";
const warningYellow : string = "bg-yellow-400";
const successBlue : string = "bg-green-400";
const ToastUi = ({
    id,
    message,
    mode
}:ToastUiProps) => {
    const {removeToast} = useToast();
  return (
    <div className={` w-full h-12 mt-1 transition-transform duration-150 ease-in-out rounded-sm text-black flex items-center justify-between px-2 hover:scale-95 bg-amber-300  ${mode === "info" ? infoGreen : mode === "success" ? successBlue : mode === "error" ? dangerRed : mode === "warning" ? warningYellow : ""}`}>
           <span className=" flex items-center gap-1 text-md font-medium line-clamp-1">
               {message}
           </span>
           <MdClose 
               size={20} 
               className=" cursor-pointer" 
               onClick={()=>removeToast(id)}
           />
    </div>
  )
}

export default ToastUi