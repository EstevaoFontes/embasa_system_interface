import { toast } from 'react-toastify';

export const useNotification = () => {

    function notifySucess(message){
        toast.success(message)
    }

    function notifyError(message){
        toast.error(message)
    }

    return {
        notifyError,
        notifySucess
    }

}