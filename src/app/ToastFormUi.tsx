import { useState } from "react";
import { GiToaster } from "react-icons/gi";
import { uuid } from "../utils/helper";
import { Toasts } from "./ToastPortal";

interface ToastFormUiProps {
    getToast: (toast: Toasts) => void;
}
const ToastFormUi = ({getToast}:ToastFormUiProps) => {
    const [value,setValue] = useState<string>("");
    const [mode,setMode] = useState<string>("info");
    
    const handelSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!value.trim()) return;
        
        // Create a new toast object with the user's input, mode, and autoClose setting.
        const newToast = {
            id: uuid(),
            message: value,
            mode: mode,
        };
        getToast(newToast);
        setValue("");
    };
  return (
    <div className=" w-[400px] h-[450px] border rounded-sm">
        <div className=" p-2 flex flex-col justify-center items-center">
            <h1 className=" text-center text-3xl font-mono">
                React Toast🍞
            </h1>

            <div className=" h-[200px]  w-full flex items-center justify-center">
              <GiToaster size={160} className=" mr-5" fill="salmon"/>
            </div>

            <div className="h-[200px]  w-full flex items-center justify-center flex-col space-y-2">
                <div className=" w-46 ">
                    <select 
                     value={mode}
                     onChange={(e)=>setMode(e.target.value)}
                     className=" w-full h-8 bg-slate-900 text-neutral-100 font-semibold text-sm border rounded-sm"
                    >
                        <option value="info">Info</option>
                        <option value="success">Success</option>
                        <option value="danger">Danger</option>
                        <option value="warning">Warning</option>
                    </select>
                </div>

                <form className=" w-46 " onSubmit={handelSubmit}>
                    <input 
                        type="text" 
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        placeholder="Give Your Message!" 
                        className=" bg-slate-800 w-full h-auto text-neutral-100 font-semibold text-sm p-2 rounded-sm"
                    />
                    <button
                        type="submit"
                        onClick={()=>console.log(value)}
                        className="bg-purple-500 text-neutral-100 font-semibold text-sm py-2 px-4 rounded-sm mt-1 w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ToastFormUi;