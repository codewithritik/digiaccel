
import { toast } from 'react-toastify';


export const SuccessToaster = (msg) => {
    toast.success(`${msg}`, {
        position: toast.POSITION.TOP_RIGHT
    });
};


export const FalierToaster = (msg) => {
    toast.error(`${msg}`, {
        position: toast.POSITION.TOP_RIGHT
    });
};