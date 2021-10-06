import * as React from 'react';
import { Button } from '../Button/Button.component';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import PropTypes from 'prop-types'
import './DiscardChangesDialog.style.scss';

interface Props {
    title: string;
    content: string;
    open: boolean;
    handleToggle: () => void;
    handleConfirm: () => void;
}
function DiscardChangesDialog (props: Props) {
    const { title, content, open, handleToggle, handleConfirm } = props;


    return (
        <Dialog
            open={open}
            maxWidth="sm"
            // ---------  un-comment the code to auto close model on outside click ---------
            // onClose={handleToggle} 
            aria-labelledby="discard-changes-dialog-title"
            aria-describedby="discard-changes-dialog-description"
        >
            <Typography variant="h2" component="h2" className="fw-bold" p={2.5}>
                {title}
            </Typography>
            <DialogContent className="dialog-content">
                <DialogContentText id="discard-changes-dialog-description" color={'var(--Darkgray)'}>
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions className="dialog-actions">
                <Button variant="outlined" onClick={handleToggle} className="action-no">
                    No
                </Button>
                <Button color="default" onClick={handleConfirm} className="action-yes">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

DiscardChangesDialog.propTypes = {

}

export default DiscardChangesDialog;