import * as React from 'react';
import { MessageTypes } from '../types/types';

export const useMessage = () => {
    const [popupMessage, setPopupMessage] = React.useState({ hidden: true, message: '', header: 'Success', type: MessageTypes.info })

    const closePopUp = ()=>{
        setPopupMessage({ ...popupMessage, hidden: true });
    }

    const showInfoMessage = (msg: string, header: string = 'Success') => {
        setPopupMessage({ ...popupMessage, hidden: false, header: header , message: msg, type: MessageTypes.info });
        setTimeout(() => {
            setPopupMessage({ ...popupMessage, hidden: true });
        }, 2000)
    }

    const showWarningMessage = (msg: string, header: string='Warning') => {
        setPopupMessage({ ...popupMessage, hidden: false, header: header , message: msg, type: MessageTypes.warning});
        setTimeout(() => {
            setPopupMessage({ ...popupMessage, hidden: true });
        }, 5000)
    }

    return {popupMessage , showInfoMessage , showWarningMessage , closePopUp} ; 
}



