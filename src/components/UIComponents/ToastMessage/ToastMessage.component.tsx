import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { ErrorExclamationIcon, SuccessTickIcon } from '../../../assets/icons';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import './ToastMessage.style.scss';

interface ToastMessageProps {
    isOpen: boolean;
    messageType: string;
    setOpen?: any;
    message: string;
    onClose: (event?: React.SyntheticEvent) => void;
}

function Alert(props: AlertProps) {
    return <MuiAlert variant="filled" {...props} />;
}

export default function ToastMessage(props: ToastMessageProps) {
    const getComponentToRender = () => {
        switch(props.messageType) {
            case 'Success' :{
                    return (
                        <Snackbar className={'success-snackbar'} open={props.isOpen} autoHideDuration={6000} onClose={props.onClose}>
                            <div className={'success-snackbar-alertContainer'}>
                                <Alert className={'messagebar-icon'}
                                    icon={<SuccessTickIcon />}>
                                    <span>{props.message}</span>
                                </Alert>
                            </div>
                        </Snackbar>
                    )
                }
                case 'Error' : {
                    return (
                        <Snackbar className={'error-snackbar'} open={props.isOpen} autoHideDuration={6000} onClose={props.onClose}>
                            <div className={'error-snackbar-alertContainer'}>
                                <Alert className={'messagebar-icon'}
                                    icon={<ErrorExclamationIcon />}>
                                    <span>{props.message}</span>
                                </Alert>
                            </div>
                        </Snackbar>
                    )
                }
                default : {
                    return (
                        <Snackbar  open={props.isOpen} autoHideDuration={6000} onClose={props.onClose}>
                            <div style={{ 'display': 'flex' }}>
                                <Alert className={'messagebar-icon'}>
                                    {props.message}
                                </Alert>
                            </div>
                        </Snackbar>
                    )
                }
        }
        
    }

    return (
        getComponentToRender()
    );
}
