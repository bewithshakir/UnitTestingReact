
import { FormikProvider, useFormik } from 'formik';
import { Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { FilterDialogField } from './config';
import SelectPaginate from './inputComponents/selectPaginate';
import Select from './inputComponents/select';
import SelectDynamic from './inputComponents/selectDynamic';
import MultiSelect from './inputComponents/multiSelect';
import InputText from './inputComponents/inputText';
import MultiSelectDynamic from './inputComponents/multiSelectDynamic';
import Checkbox from './inputComponents/checkBox';
import RadioBtn from './inputComponents/radiobtn';
import DatePicker from './inputComponents/datePicker';
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
    const initialValues = fields.reduce((acc, field) => {
        acc[field.name] = field.initialValue;
        return acc;
    }, {} as any);
    const formik = useFormik({
        initialValues,
        onSubmit: (values) => {
            handleConfirm(values);
        },
    });

    function getFieldComponent(field: FilterDialogField, fieldId: number | string) {
        const { fieldType, apiUrl } = field;
        const fieldKey = `dynFilt${fieldId}`;
        const fieldCompMasterObj = {
            'singleSelectPaginate':<SelectPaginate
            field={field}
            fieldId={fieldKey}
            formik={formik}
            onChange={formik.setFieldValue}
        />,
            'singleSelect':apiUrl ? <SelectDynamic
            field={field}
            fieldId={fieldKey}
            formik={formik}
            onChange={formik.setFieldValue}
        /> : <Select
            field={field}
            fieldId={fieldKey}
            formik={formik}
            onChange={formik.setFieldValue}
        />,
            'multiSelect':apiUrl ? <MultiSelectDynamic
            field={field}
            fieldId={fieldKey}
            formik={formik}
            onChange={formik.setFieldValue}
        /> : <MultiSelect
            field={field}
            fieldId={fieldKey}
            formik={formik}
            onChange={formik.setFieldValue}
        />,
            'text':<InputText field={field} fieldId={fieldKey} formik={formik} onChange={formik.setFieldValue} />,
            'date':<DatePicker field={field} fieldId={fieldKey} formik={formik} onChange={formik.setFieldValue} />,
            'dateRange':<DatePicker field={field} fieldId={fieldKey} formik={formik} onChange={formik.setFieldValue} />,
            'checkbox':<Checkbox field={field} fieldId={fieldKey} formik={formik} onChange={formik.handleChange} />,
            'radio':<RadioBtn field={field} fieldId={fieldKey} formik={formik} onChange={formik.handleChange} />
        };
        return fieldCompMasterObj[fieldType];
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
