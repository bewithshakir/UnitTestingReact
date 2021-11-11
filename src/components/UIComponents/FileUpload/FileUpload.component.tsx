import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';

import { Button } from '../../../components/UIComponents/Button/Button.component';


interface Props {
    onDrop: any,
    acceptedFiles : string,
    maxFiles: number,
    maxSizeinBytes: number
}

function FileUploadComponent(props: Props) {
    const { onDrop, acceptedFiles, maxFiles, maxSizeinBytes } = props;
    const { t } = useTranslation();
    const {getRootProps, getInputProps,} = useDropzone({
        onDrop,
        accept:acceptedFiles,
        maxFiles,
        maxSize:maxSizeinBytes
    });

    return (
        <>
            <Button
                types="browse"
                aria-label="browse"
                className="mr-4"
            >
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {t("buttons.browse")}
                </div>
            </Button>
        </>
    );
}

export default FileUploadComponent;