
import { FormikProvider, useFormik } from 'formik';
import { Grid, Dialog, DialogContent, DialogActions, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Button } from '../Button/Button.component';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { FilterDialogField, DailogProps } from './config';
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

function DynamicFilterDialog(props: DailogProps) {
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
        const fieldCompMasterObj = {
            'singleSelectPaginate': SelectPaginate,
            'singleSelect': apiUrl ? SelectDynamic : Select,
            'multiSelect': apiUrl ? MultiSelectDynamic : MultiSelect,
            'text': InputText,
            'date': DatePicker,
            'dateRange': DatePicker,
            'checkbox': Checkbox,
            'radio': RadioBtn
        };
        const SpecificFieldComponent = fieldCompMasterObj[fieldType];
        return <SpecificFieldComponent {...{ field, fieldId: `dynFilt${fieldId}`, formik, onChange: formik.setFieldValue }} />;
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
                    <Grid container direction="column" >
                        <div className="dyn-filter-dialog-container" id="discard-dialogue">
                            {title && <Typography color="var(--Darkgray)" variant="h2" component="h2" className="fw-bold" px={2.5} pt={2.5} >
                                {title}
                            </Typography>}
                            <DialogContent className="dialog-content">
                                {fields.map((field, index) => <Grid key={`dynFilDialogGrid${index}`} item mb={2.5} mt={2}>
                                    {getFieldComponent(field, index)}</Grid>
                                )}
                            </DialogContent>
                            <DialogActions className="dialog-actions">
                                <Grid item className="lastItem" container direction="row" justifyContent="flex-end" mt={2.5} >
                                    <Grid item>
                                        <Button variant="outlined" onClick={handleCancel} className="action-no" types='cancel'>
                                            {cancelBtnTitle || 'Cancel'}
                                        </Button></Grid>
                                    <Grid item>
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
                                    </Grid>
                                </Grid>
                            </DialogActions>
                        </div>
                    </Grid>
                </form>
            </FormikProvider>
        </Dialog >
    );
}

export default DynamicFilterDialog;
