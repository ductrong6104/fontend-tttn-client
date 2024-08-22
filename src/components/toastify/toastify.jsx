import { toast } from 'react-toastify';
export const notifySuccess = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 4000, // tự đóng sau 1000ms
        hideProgressBar: false, // cho phép ẩn chạy tiến trình
        closeOnClick: true, // cho phép đóng thanh toast
        pauseOnHover: true, // dừng tiến trình khi hover vào toast
        draggable: true, // cho phep di chuyen toast
        progress: undefined, 
    });
  };

 export const notifyError = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    
  };