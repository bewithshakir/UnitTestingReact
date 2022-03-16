
import { FormikProvider, useFormik } from 'formik';
import { useMemo } from 'react';
import { Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { FilterDialogField } from './config';
import SelectPaginate from './inputComponents/selectPaginate';
import './DynamicFilterDialog.style.scss';

interface Props {
    title: string;
    open: boolean;
    cancelBtnTitle?: string,
    nextBtnTitle?: string,
    handleToggle: () => void;
    handleConfirm: (data: { [k: string]: any }) => void;
    fields: FilterDialogField[]
}


function DynamicFilterDialog(props: Props) {
    const { title, open, handleToggle, handleConfirm, cancelBtnTitle, nextBtnTitle, fields } = props;
    const { theme } = useTheme();
    const initialValues = useMemo(() => {
        return fields.reduce((acc, field) => {
            acc[field.name] = field.initialValue;
            return acc;
        }, {} as any);

    }, [fields]);

    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            handleConfirm(values);
        },
        enableReinitialize: true
    });

    function getFieldComponent(field: FilterDialogField, fieldId: number | string) {
        const { fieldType } = field;
        switch (fieldType) {
            case 'singleSelectPaginate':
                return <SelectPaginate field={field} fieldId={fieldId} formik={formik} />;
            case 'singleSelect':
                return (
                    'singleSelect-----------'
                );
            case 'multiSelect':
                return 'multi select';
            case 'text':
                return 'text ';
            case 'date':
                return 'date';
            case 'dateRange':
                return 'date range';
            case 'checkbox':
                return 'check box';
            case 'radio':
                return 'radio';
            default:
                return null;
        }
    }

    const ApplyBtn = styled(Button)(() => ({
        "&&": {
            width: '200px',
            backgroundColor: theme["--Save-Btn"],
            color: theme["--Darkgray"],
            border: "0px",
            "&:hover": {
                backgroundColor: theme["--Gray"],
                color: theme["--Save-Btn"],
            }
        }
    }));
    const handleCancel = () => {
        handleToggle();
        formik.resetForm();
    };
    return (
        <Dialog
            open={open}
            aria-labelledby="dynamic-filter-dialog-title"
            aria-describedby="dynamic-filter-dialog-description"
        >
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className="filterDialogForm">
                    <div className="dyn-filter-dialog-container" id="discard-dialogue">
                        {title && <Typography color="var(--Darkgray)" variant="h2" component="h2" className="fw-bold" px={2.5} pt={2.5} >
                            {title}
                        </Typography>}
                        <DialogContent className="dialog-content">
                            {fields.map((field, index) => getFieldComponent(field, index))}
                        </DialogContent>
                        <DialogActions className="dialog-actions">
                            <Button variant="outlined" onClick={handleCancel} className="action-no" types='cancel'>
                                {cancelBtnTitle || 'Cancel'}
                            </Button>

                            <ApplyBtn
                                data-testid="applyAll"
                                id="applyAll"
                                type="submit"
                                types="save"
                                disabled={!formik.dirty}
                                aria-label={nextBtnTitle}
                            >
                                {nextBtnTitle || 'Continue'}
                            </ApplyBtn>
                        </DialogActions>
                    </div>
                </form>
            </FormikProvider>
        </Dialog >
    );
}

export default DynamicFilterDialog;
