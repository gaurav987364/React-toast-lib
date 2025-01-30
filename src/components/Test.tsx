import useToastType from "../hooks/useToastType"

const Test = () => {
    const toast = useToastType();
  return (
    <div className=" flex gap-2">
        <button className=" px-3 py-1 bg-gray-500 rounded-lg cursor-pointer" onClick={()=> toast.success("Success toast")}>success</button>
        <button className=" px-3 py-1 bg-gray-500 rounded-lg cursor-pointer" onClick={()=> toast.error("Error Toast")}>error</button>
        <button className=" px-3 py-1 bg-gray-500 rounded-lg cursor-pointer" onClick={()=> toast.info("Info Toast")}>info</button>
        <button className=" px-3 py-1 bg-gray-500 rounded-lg cursor-pointer" onClick={()=> toast.warning("Warning Toast")}>warning</button>
        <button className=" px-3 py-1 bg-gray-500 rounded-lg cursor-pointer" onClick={()=> toast.regular("Regular Toast")}>Regular</button>
    </div>
  )
}

export default Test