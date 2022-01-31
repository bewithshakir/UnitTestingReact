import React, { useCallback, useState } from 'react';
import { FileCopy } from '@mui/icons-material';
import { IconButton , Box, Paper} from '@mui/material';
import { useTranslation } from "react-i18next";
import { LoadingIcon } from '../../../assets/icons';
import { config } from '../config';
import { DeleteIcon, ImportIcon } from '../../../assets/icons';
import { HorizontalBarVersionState, useStore } from '../../../store';
import { getCountryCode } from '../../../navigation/utils';
import { formatFileSizeUnit, getUploadedBy, getUploadedIn } from '../../../utils/helperFunctions';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import FileUploadComponent from '../../../components/UIComponents/FileUpload/FileUpload.component';
import ToastMessage from '../../../components/UIComponents/ToastMessage/ToastMessage.component';
import FileUploadErrorDialog from '../../../components/UIComponents/ConfirmationDialog/DiscardChangesDialog.component';
import { useUploadAttachment } from '../queries';
import { useAddedCustomerIdStore, useAddedCustomerNameStore} from '../../../store';
import './AddAttachment.style.scss';

interface IFormStatus {
    message: string
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    fileuploadsuccess: {
        message: 'File Uploaded Successfully',
        type: 'Success'
    },
    error: {
        message: 'Something went wrong. Please try again.',
        type: 'Error',
    }
};

const AddAttachment: React.FC<any> = () => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    const addedCustomerId = useAddedCustomerIdStore((state) => state.customerId);
    const addedCustomerName = useAddedCustomerNameStore((state) => state.customerName);
    const [apiResposneState, setAPIResponse] = useState(false);
    const [formStatus, setFormStatus] = useState<IFormStatus>({ message: '', type: ''});
    const [showConfirmationDialogBox, setShowConfirmationDialogBox] = useState(false);
    const [validFiles, setValidFiles] = useState<File[]>([]);
    const [failureFiles, setFailureFiles] = useState<Array<any>>([]);
    const [uploadErrorMsg, setUploadErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    setVersion("Breadcrumbs-Many");

    const onDropCallBack = useCallback((acceptedFiles: File[], rejectedFiles: Array<any>) => {
        if (acceptedFiles.length) {
            setUploadErrMsg('');
            setValidFiles(acceptedFiles);
        }
        if (rejectedFiles.length) {
            setFailureFiles(rejectedFiles);
            setUploadErrMsg(rejectedFiles[0].errors.map((err: { code: string, message: string }) => ({
                code: err.code, message: err.code === 'file-too-large' ? `File is larger than ${config.maxAllowedFileSizeMB} MB` : err.message
            }))[0].message);
        }
    }, []);

    const onFileUploadSuccess = () => {
        setIsLoading(false);
        setValidFiles([]);
        setFailureFiles([]);
        setAPIResponse(true);
        setFormStatus(formStatusProps.fileuploadsuccess);
        setTimeout(() => {
            setAPIResponse(false);
        }, 6000);
    };

    const onFileUploadError = (err: any) => {
        setIsLoading(false);
        const { data: { error } } = err.response;
        if (error?.httpCode === 409) {
            setShowConfirmationDialogBox(true);
        } else {
            setUploadErrMsg(`${t("UploadAttachments.uploadGenericError")}`);
        }
    };

    const handleFileDelete = () => {
        setValidFiles([]);
        setFailureFiles([]);
        setUploadErrMsg('');
    };

    const uploadFile = (isOverwriteFile: boolean = false) => {
        const countryCd = getCountryCode();
        const formData = new FormData();
        const fileToUpload = validFiles[0];
        formData.append('customerFile', fileToUpload);
        formData.append('newCustomer', 'n' );
        formData.append('countryCode', countryCd as string);
        formData.append('companyNm', addedCustomerName);
        formData.append('fileOverwrite', isOverwriteFile ? 'y' : 'n');
        formData.append('uploadedBy', getUploadedBy());
        formData.append('uploadedIn', getUploadedIn(location.pathname));
        setIsLoading(true);
        uploadAttachment(formData);
    };

    const { mutate: uploadAttachment } = useUploadAttachment(addedCustomerId, onFileUploadError, onFileUploadSuccess);

    const handleModelToggle = () => {
        setShowConfirmationDialogBox(false);
    };

    const handleModelConfirm = () => {
        uploadFile(true);
        setShowConfirmationDialogBox(false);
    };

    const uploadAttachedFile = () =>{
        uploadFile();
    };

    return (
        <React.Fragment>
            <Box className='upload-attachment-main-container'>
                {(validFiles.length ||  failureFiles.length) ?
                    <Box className='file-box'>
                        <Paper elevation={2} className="filename-paper" >
                            <div>
                                <FileCopy />
                            </div>
                            <div className='filename-div'>
                                {validFiles?.length > 0 && validFiles[0].name}
                                {failureFiles?.length > 0 && failureFiles[0]?.file?.name}
                            </div>
                            <div>
                                {validFiles?.length > 0 && formatFileSizeUnit(validFiles[0].size)}
                                {failureFiles?.length > 0 && formatFileSizeUnit(failureFiles[0]?.file?.size)}
                            </div>
                            {uploadErrorMsg && <div className='file-error'>
                                {uploadErrorMsg}
                            </div> }
                            <div className='delete-div'>
                                <IconButton onClick={handleFileDelete}>
                                    <DeleteIcon color={'var(--ToastMessageRed)'} />
                                </IconButton>
                            </div>
                        </Paper>
                    </Box> :
                    <div className='upload-box'>
                        <FileUploadComponent
                            onDrop={onDropCallBack}
                            acceptedFiles={config.acceptedFiles}
                            maxFiles={config.noOfFilesLimit}
                            maxSizeinBytes={config.maxAllowedFileSizeBtyes}
                            multiple={config.multipleAllowed}>
                            <div className='main-text'>
                                {t("UploadAttachments.uploadInitialText")} <span className='highlighted-text'>{t("UploadAttachments.choose")}</span>
                            </div>
                            <div className='helper-text'>
                                {t("UploadAttachments.fileFormatSize")}
                            </div>
                        </FileUploadComponent>
                    </div>
                }
                <ToastMessage isOpen={apiResposneState} messageType={formStatus.type} onClose={() => { return ''; }} message={formStatus.message} />
            </Box>
            <Button disabled={(validFiles.length == 0 || !!uploadErrorMsg || isLoading)} className='final-upload-btn' types='primary' aria-label='primary' onClick={uploadAttachedFile}>  {isLoading ? <LoadingIcon data-testid="loading-spinner" className='loadingIcon' /> : <ImportIcon />} {t("UploadAttachments.uploadFile")} </Button>
            <FileUploadErrorDialog
                title={t("UploadAttachments.fileuploaddialog.title")}
                content={t("UploadAttachments.fileuploaddialog.content")}
                open={showConfirmationDialogBox}
                handleToggle={handleModelToggle}
                handleConfirm={handleModelConfirm}
                cancelBtnTitle={t("UploadAttachments.no")}
                discardBtnTitle={t("UploadAttachments.yes")}
            />
        </React.Fragment>
    );
};

export default AddAttachment;


