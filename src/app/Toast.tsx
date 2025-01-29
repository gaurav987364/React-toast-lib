import { MdClose } from "react-icons/md";
import {  IoCheckmarkCircle, IoInformationCircle, IoWarning } from "react-icons/io5";
import { PiSmileySadBold } from "react-icons/pi";


const iconMap: { [key in ToastProps['mode']]: React.ReactElement } = {
    info: <IoInformationCircle size={22} />,
    success: <IoCheckmarkCircle size={22} />,
    danger: <PiSmileySadBold size={22} />,
    warning: <IoWarning size={22} />
};
interface ToastProps {
    id: string|number;
    message: string;
    mode: string;
    toastBgColor?: string;
    onClose?: (id:string|number) => void;
};

const infoGreen : string = "bg-blue-400";
const dangerRed  : string= "bg-red-400";
const warningYellow : string = "bg-yellow-400";
const successBlue : string = "bg-green-400";

const Toast = ({
    id,
    message,
    mode,
    onClose,
    toastBgColor,
}:ToastProps) => {
    const IconComponent = iconMap[mode];
  return (
    <div className={` w-full h-12 mt-1 transition-transform duration-150 ease-in-out rounded-sm text-black flex items-center justify-between px-2 hover:scale-95 ${mode === "info" ? infoGreen : mode === "success" ? successBlue : mode === "danger" ? dangerRed : mode === "warning" ? warningYellow : toastBgColor}`}>
        <span className=" flex items-center gap-1 text-md font-medium line-clamp-1">
            {IconComponent}
            {message}
        </span>
        <MdClose 
            size={20} 
            className=" cursor-pointer" 
            onClick={()=>onClose && onClose(id)}
        />
    </div>
  )
}

export default Toast