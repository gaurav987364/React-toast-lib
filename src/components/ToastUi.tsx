import { MdClose, MdNotificationsActive } from "react-icons/md";
import { ToastUiProps } from "../utils/types";
import { useToast } from "../context/ToastContext";
import React from "react";
import { useProgressBar } from "../utils/helper";
import { IoCheckmarkCircle, IoInformationCircle, IoWarning } from "react-icons/io5";
import { PiSmileySadBold } from "react-icons/pi";

const infoGreen : string = "border-blue-500";
const dangerRed  : string= "border-red-500";
const warningYellow : string = "border-yellow-500";
const successBlue : string = "border-green-500";
const regularWhite : string = "border-neutral-700";

const iconMap: { [key in ToastUiProps['mode']]: React.ReactElement } = {
    info: <IoInformationCircle size={28} fill="#2B7FFF"/>,
    success: <IoCheckmarkCircle size={28} fill="#00C950" />,
    error: <PiSmileySadBold size={28} fill="#FB2C36"/>,
    warning: <IoWarning size={28} fill="#F0B100" />,
    regular:<MdNotificationsActive size={28} fill="gray" />
};







const ToastUi = ({
    id,
    message,
    mode,
    autoCloseDuration=3000,
    bar=true
}:ToastUiProps) => {
    const {removeToast} = useToast();
    const progress = useProgressBar(bar,autoCloseDuration);
    const icon = iconMap[mode];

  return (
    <React.Fragment>
      <div className={` relative w-full h-14 mt-1 transition-transform duration-150 ease-in-out rounded-sm text-neutral-50 flex items-center justify-between px-2 border-l-[5px]  
        ${mode === "info" 
        ? infoGreen : mode === "success" 
        ? successBlue : mode === "error" 
        ? dangerRed : mode === "warning" 
        ? warningYellow : mode === "regular" 
        ? regularWhite : "border-neutral-500"}
          bg-gradient-to-r from-[#0f172a]  to-[#334155]`}
      >
            <div className="flex justify-start items-center gap-2 text-md font-medium line-clamp-1 ">
                <span>{icon}</span>
                <div>
                  <span className=" capitalize text-md font-medium">{mode}</span>
                  <span className=" capitalize text-sm font-mono line-clamp-2">{message}</span>
                </div>
            </div>
            <MdClose 
                size={20} 
                className=" cursor-pointer" 
                onClick={()=>removeToast(id)}
            />
      </div>
      
      {bar && (
        <div className="progress w-full absolute bottom-0 left-0 h-0.5 overflow-hidden">
         <div 
         className={` h-full transition-all 
          ${mode === "info" 
          ? "bg-blue-500" : mode === "success" 
          ? "bg-green-500" : mode === "error" 
          ? "bg-red-500" : mode === "warning" 
          ? "bg-yellow-500" : "bg-neutral-500"}`} 
         style={{width:`${progress}%`,transition:`width ${autoCloseDuration}ms linear`}}></div>
        </div>
      )}
    </React.Fragment>
  )
}

export default ToastUi




































































// import { MdClose } from "react-icons/md";
// import { ToastUiProps } from "../utils/types";
// import { useToast } from "../context/ToastContext";
// import React, { useEffect, useState, useRef } from "react";

// const infoGreen: string = "bg-blue-400";
// const dangerRed: string = "bg-red-400";
// const warningYellow: string = "bg-yellow-400";
// const successBlue: string = "bg-green-400";
// const regularWhite: string = "bg-neutral-100";

// const ToastUi = ({ id, message, mode, bar, autoCloseDuration = 3000 }: ToastUiProps) => {
//   const { removeToast } = useToast();
//   const [progress, setProgress] = useState(100);
//   const [remainingTime, setRemainingTime] = useState(autoCloseDuration);
//   const timerRef = useRef<NodeJS.Timeout | null>(null);
//   const startTimeRef = useRef<number>(Date.now());

//   const startTimer = (duration: number) => {
//     startTimeRef.current = Date.now();
//     setProgress(0);
//     timerRef.current = setTimeout(() => removeToast(id), duration);
//   };

//   const pauseTimer = () => {
//     if (timerRef.current) {
//       clearTimeout(timerRef.current);
//       setRemainingTime(remainingTime - (Date.now() - startTimeRef.current));
//     }
//   };

//   const resumeTimer = () => {
//     startTimer(remainingTime);
//   };

//   useEffect(() => {
//     if (bar) startTimer(autoCloseDuration);
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [bar, autoCloseDuration]);

//   return (
//     <div
//       className={`relative w-full h-12 mt-1 transition-transform duration-150 ease-in-out rounded-sm text-black flex items-center justify-between px-2  bg-amber-300 ${
//         mode === "info"
//           ? infoGreen
//           : mode === "success"
//           ? successBlue
//           : mode === "error"
//           ? dangerRed
//           : mode === "warning"
//           ? warningYellow
//           : regularWhite
//       }`}
//       onMouseEnter={pauseTimer}
//       onMouseLeave={resumeTimer}
//     >
//       <span className="flex items-center gap-1 text-md font-medium line-clamp-1">{message}</span>
//       <MdClose size={20} className="cursor-pointer" onClick={() => removeToast(id)} />

//       {/* Progress Bar */}
//       {bar && (
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-400 overflow-hidden">
//           <div
//             className="h-full bg-blue-500 transition-all"
//             style={{
//               width: `${progress}%`,
//               transition: `width ${remainingTime}ms linear`,
//             }}
//           ></div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ToastUi;
