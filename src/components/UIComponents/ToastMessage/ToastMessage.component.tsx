import React, { useEffect } from 'react';
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
    const [open, setOpen] = React.useState(false);
    
    useEffect(()=> {
        setOpen(props.isOpen);
        console.log('did mount', props.isOpen)
    }, [props.isOpen])
    
    const handleClose = () => {
        setOpen(false);
    };
    const getComponentToRender = () => {
        switch(props.messageType) {
            case 'Success' :{
                    return (
                        <Snackbar className={'success-snackbar'} open={open} autoHideDuration={6000} onClose={handleClose}>
                            <div className={'success-snackbar-alertContainer'}>
                                <Alert className={'messagebar-icon'}
                                    icon={<SuccessTickIcon />} onClose={handleClose}>
                                    <span>{props.message}</span>
                                </Alert>
                            </div>
                        </Snackbar>
                    );
                }
                case 'Error' : {
                    return (
                        <Snackbar className={'error-snackbar'} open={open} autoHideDuration={6000} onClose={handleClose}>
                            <div className={'error-snackbar-alertContainer'}>
                                <Alert className={'messagebar-icon'}
                                    icon={<ErrorExclamationIcon />} onClose={handleClose}>
                                    <span>{props.message}</span>
                                </Alert>
                            </div>
                        </Snackbar>
                    );
                }
                default : {
                    return (
                        <Snackbar  open={open} autoHideDuration={6000} onClose={handleClose}>
                            <div style={{ 'display': 'flex' }}>
                                <Alert className={'messagebar-icon'} onClose={handleClose} severity="success">
                                  {props.message}
                                </Alert>
                            </div>
                        </Snackbar>
                    );
                }
        }
        
    };

    return (
        <div className="toaster_wrapper">
            {getComponentToRender()}
        </div>
    );
}
