// import React from 'react';
// import Button from '@material-ui/core/Button';
// import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

// export interface State extends SnackbarOrigin {
//     open: boolean;
//     message?: string
// }

// export default function SuccessMessage() {
//     const [state, setState] = React.useState<State>({
//         open: false,
//         vertical: 'top',
//         horizontal: 'center',
//     });
//     const { vertical, horizontal, open } = state;

//     const handleClick = (newState: SnackbarOrigin) => () => {
//         setState({ open: true, ...newState });
//     };

//     const handleClose = () => {
//         setState({ ...state, open: false });
//     };

//     const buttons = (
//         <React.Fragment>
//             <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
//                 Bottom-Center
//             </Button>
//         </React.Fragment>
//     );

//     return (
//         <div>
//             {buttons}
//             <Snackbar
//                 anchorOrigin={{ vertical, horizontal }}
//                 autoHideDuration={6000}
//                 open={open}
//                 onClose={handleClose}
//                 message="I love snacks"
//                 key={vertical + horizontal}
//             />
//         </div>
//     );
// }


import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import './SuccessMessage.style.scss';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function SuccessMessage() {
    console.log("SuccessMessage UP")
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        
            <Snackbar 
            // anchorOrigin={{ vertical, horizontal }}
                // autoHideDuration={6000}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                // key={vertical + horizontal}
                className={'success-snackbar'} 
                />
    );
}
