import { MdClose } from "react-icons/md";
import { applyBgColor } from "../utils/helper";
import { IoAlertCircle, IoCheckmarkCircle, IoInformationCircle, IoWarning } from "react-icons/io5";


const iconMap: { [key in ToastProps['mode']]: React.ReactElement } = {
    info: <IoInformationCircle size={22} />,
    success: <IoCheckmarkCircle size={22} />,
    danger: <IoAlertCircle size={22} />,
    warning: <IoWarning size={22} />
};
interface ToastProps {
    id: string|number;
    message: string;
    mode: string;
    onClose?: (id:string|number) => void;
};


const Toast = ({
    id,
    message,
    mode,
    onClose
}:ToastProps) => {
    const bgColorClass = applyBgColor(mode);
    const IconComponent = iconMap[mode];
  return (
    <div className={` w-full h-12 mt-1 transition-transform duration-500 ease-linear rounded-sm text-black flex items-center justify-between px-2  bg-[#${bgColorClass}]`}>
        <span className=" flex items-center gap-1 text-lg font-semibold line-clamp-1">
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