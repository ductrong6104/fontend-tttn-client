import { IoPersonOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
export default function ItemInforAccount({type, name, value, onChange, placeholder, onUpdate, labelButton, labelInput}){
    const handleClickButton = () => {
        onUpdate(type, name, value, onChange, placeholder, labelInput);
    }
    return (
        <div className="flex rounded-md border-2 p-2 mb-2 justify-between">
            <div className="flex w-1/2">
                <div className="flex items-center w-2/5">
                    <IoPersonOutline className="text-red-500 mr-2"/> 
                    <label htmlFor="" className="text-blue-800 font-bold">{labelInput}</label>
                </div>
                <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} readOnly/>
            </div>
            <div className="flex items-center">
                <FaEdit className="absolute text-blue-400 ml-2"/>
                <button className="bg-purple-100 p-2 pl-8 rounded-md end-0" onClick={handleClickButton}>{labelButton}</button>
            </div>
        </div>
    )
}