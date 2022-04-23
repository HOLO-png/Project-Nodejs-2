import { toast } from 'react-toastify';

export const messageInfoToast = (status, title) => {
    if (status) {
        toast.success(title);
    } else {
        toast.warning(title);
    }
};
