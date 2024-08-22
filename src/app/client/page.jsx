'use client'
import { toast } from 'react-toastify';
export default function PageHome() {
    const notifySuccess = () => {
        toast.success('Success!', {
            position: "top-right",
            autoClose: 1000, // tự đóng sau 1000ms
            hideProgressBar: false, // cho phép ẩn chạy tiến trình
            closeOnClick: true, // cho phép đóng thanh toast
            pauseOnHover: true, // dừng tiến trình khi hover vào toast
            draggable: true, // cho phep di chuyen toast
            progress: undefined, 
        });
      };
    
      const notifyError = () => {
        toast.error('Error!', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
      };
    return(
        <>
            <h1>Trang chủ</h1>
            <button onClick={notifySuccess}>Show Success Toast</button>
            <button onClick={notifyError}>Show Error Toast</button>
        </>
    )
}