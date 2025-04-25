import Test from "./components/Test";
import { ToastProvider } from "./context/ToastContext";
import Toaster from "./portals/Toaster";

const App = () => {
  return (
    <ToastProvider>
      <div className=' w-full h-screen bg-slate-950 text-neutral-100 flex items-center justify-center'>
        <Test/>
        <Toaster
         position="top-right"
         autoClose={true}
         autoCloseDuration={3000}
         progressBar={true}
        />
      </div>
    </ToastProvider>
  )
}

export default App;