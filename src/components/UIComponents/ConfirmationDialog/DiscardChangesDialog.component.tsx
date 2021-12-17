import * as React from 'react';
import { Button } from '../Button/Button.component';
import { Dialog, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import './DiscardChangesDialog.style.scss';

interface Props {
    title: string;
    content: string;
    open: boolean;
    cancelBtnTitle?: string,
    discardBtnTitle?: string,
    handleToggle: () => void;
    handleConfirm: () => void;
}
function DiscardChangesDialog (props: Props) {
    const { title, content, open, handleToggle, handleConfirm, cancelBtnTitle, discardBtnTitle } = props;


    return (
        <Dialog
            open={open}
            aria-labelledby="discard-changes-dialog-title"
            aria-describedby="discard-changes-dialog-description"
        >
            <div className="discard-dialog-container">
                <Typography color="var(--Darkgray)" variant="h2" component="h2" className="fw-bold" px={2.5} pt={2.5} >
                    {title}
                </Typography>
                <DialogContent className="dialog-content">
                    <DialogContentText id="discard-changes-dialog-description" color={'var(--Darkgray)'}>
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className="dialog-actions">
                    <Button variant="outlined" onClick={handleToggle} className="action-no">
                        {cancelBtnTitle || 'Cancel'}
                    </Button>
                    <Button color="default" onClick={handleConfirm} className="action-yes">
                        {discardBtnTitle || 'Discard'}
                    </Button>
                </DialogActions>
            </div>
        </Dialog >
    );
}

DiscardChangesDialog.propTypes = {

};

export default DiscardChangesDialog;