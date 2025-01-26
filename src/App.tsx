import { useState } from "react"
import Toast from "./components/ToastFormUi"
import ToastPortal, { Toasts } from "./portals/ToastPortal"

const App = () => {
  const [toast,setToast] = useState<Toasts[]>([]);

  const getToast = (newt:Toasts)=>{
    setToast([...toast, newt])
  };
  //remove toasts
  const removeToast = (id: string | number) => {
      setToast((prev) => prev.filter((toast) => toast.id !== id));
  };
  return (
    <div className=' w-full h-screen bg-slate-950 text-neutral-100 flex items-center justify-center'>
      <Toast  getToast={getToast}/>
      <ToastPortal 
       allToast={toast}
       removeToast={removeToast}
      />
    </div>
  )
}

export default App