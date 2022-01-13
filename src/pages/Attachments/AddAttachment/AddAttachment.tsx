import React, {useCallback, useState} from 'react';
// import { useLocation } from 'react-router-dom';
import './AddAttachment.style.scss';
import { HorizontalBarVersionState, useStore } from '../../../store';
import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
import { Button } from '../../../components/UIComponents/Button/Button.component';
import FileUploadComponent from '../../../components/UIComponents/FileUpload/FileUpload.component';
// import { AddBox } from '@mui/icons-material';

const AddAttachment: React.FC<any> = () => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    const [validFiles, setValidFiles] = useState<File[]>([]);
    const [uploadErroMsg, setUploadErrMsg] = useState('');

    setVersion("Breadcrumbs-Many");

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: Array<any>) => {
        if (acceptedFiles.length) {
            setUploadErrMsg('');
            setValidFiles(acceptedFiles);
        }
        if (rejectedFiles.length) {
            setUploadErrMsg(rejectedFiles[0].errors[0].message);
        }
    }, []);

    return (
        <div>

            <Box className='upload-attachment-div'>
                <FileUploadComponent
                    onDrop={onDrop}
                    acceptedFiles='.pdf,.doc,.docx'
                    maxFiles={1}
                    maxSizeinBytes={25000000}
                >
                    {/* <Button
                    types="browse"
                    aria-label="browse"
                    className="mr-4"
                >
                    {t("buttons.browse")}
                </Button> */}

                    <div className='main-text'>
                        Drag & drop the file or <span className='highlighted-text'>Choose</span>
                    </div>
                    <div className='helper-text'>
                        Max file size : 25MB | File format : PDF or DOC
                    </div>
                </FileUploadComponent>
                {uploadErroMsg ? <span className='import-error fw-bold'>{uploadErroMsg}</span> : ''}
            </Box>
            <Button className='final-upload-btn'>Upload File</Button>
        </div>
    );
};

export default AddAttachment;


