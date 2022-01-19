import React, { useCallback, useState } from 'react';
import { FileCopy } from '@material-ui/icons';
import { useTranslation } from "react-i18next";
import './AddAttachment.style.scss';
import { HorizontalBarVersionState, useStore } from '../../../store';
import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import { DeleteIcon, ImportIcon } from '../../../assets/icons';
import { formatFileSizeUnit } from '../../../utils/helperFunctions';

import Box from '@mui/material/Box';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import FileUploadComponent from '../../../components/UIComponents/FileUpload/FileUpload.component';



const AddAttachment: React.FC<any> = () => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    const [validFiles, setValidFiles] = useState<File[]>([]);
    const [uploadErroMsg, setUploadErrMsg] = useState('');
    const { t } = useTranslation();

    setVersion("Breadcrumbs-Many");

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: Array<any>) => {
        if (acceptedFiles.length) {
            setUploadErrMsg('');
            setValidFiles(acceptedFiles);
            setUploadErrMsg('');
        }
        if (rejectedFiles.length) {
            setUploadErrMsg(rejectedFiles[0].errors[0].message);
        }
    }, []);

    const handleDeleteFileClick = () => {
        setValidFiles([]);
        setUploadErrMsg('');
    };

    // const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

    // const files = acceptedFiles.map(file => (
    //   <li key={(file as any).path}>
    //     {(file as any).path} - {file.size} bytes
    //   </li>
    // ));


    // const uploadFile = (isOverwriteFile: boolean = false, customer: (CustomerModel | any) = {}) => {
    //     const formData = new FormData();
    //     const fileToUpload = validFiles[0];
    //     formData.append('customerFile', fileToUpload);
    //     formData.append('newCustomer', isEditMode ? 'n' : 'y');
    //     formData.append('countryCode', customer.countryCd);
    //     formData.append('companyNm', customer.companyNm);
    //     formData.append('fileOverwrite', isOverwriteFile ? 'y' : 'n');
    //     uploadContractFiles(formData);
    // };

    return (
        <div>
            <Box className='upload-attachment-main-container'>
                {validFiles.length ?
                    <Box
                    className='file-box'
                        // sx={{
                        //     display: 'flex',
                        //     flexWrap: 'wrap',
                        //     '& > :not(style)': {
                        //         m: 1,
                        //         width: '100%',
                        //         padding: '22px 28px'
                        //     },
                        // }}
                    >
                        <Paper elevation={2} className="filename-paper" >
                            <div>
                                <FileCopy />
                            </div>
                            <div className='filename-div'>
                                {validFiles[0].name}
                            </div>
                            <div>
                                {formatFileSizeUnit(validFiles[0].size)}
                            </div>
                            {uploadErroMsg ? <div className='file-error'>
                                {uploadErroMsg}
                            </div> : ''}
                            <div className='delete-div'>
                                <IconButton onClick={handleDeleteFileClick}>
                                    <DeleteIcon color={'var(--ToastMessageRed)'} />
                                </IconButton>
                            </div>
                        </Paper>

                    </Box>

                    :
                    <div className='upload-box'>
                        <FileUploadComponent
                            onDrop={onDrop}
                            acceptedFiles='.pdf,.doc,.docx,.xls'
                            maxFiles={1}
                            maxSizeinBytes={25000000}
                        >
                            <div className='main-text'>
                            {t("UploadAttachments.uploadInitialText")} <span className='highlighted-text'>{t("UploadAttachments.Choose")}</span>
                            </div>
                            <div className='helper-text'>
                            {t("UploadAttachments.FileFormatSize")} 
                            </div>
                        </FileUploadComponent>
                    </div>
                }
            </Box>
            <Button disabled={(validFiles.length == 0 || !!uploadErroMsg)} className='final-upload-btn' types='primary' aria-label='primary'> <ImportIcon /> {t("UploadAttachments.UploadFile")} </Button>
        </div>
    );
};

export default AddAttachment;


