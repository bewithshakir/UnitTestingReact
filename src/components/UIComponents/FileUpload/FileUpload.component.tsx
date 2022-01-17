import { useDropzone } from 'react-dropzone';

interface Props {
    onDrop: any,
    acceptedFiles?: string,
    maxFiles?: number,
    maxSizeinBytes?: number,
    children?: React.ReactNode;
    disabled?: boolean
}

function FileUploadComponent(props: Props) {
    const { onDrop, acceptedFiles, maxFiles, maxSizeinBytes, children, disabled } = props;
    const { getRootProps, getInputProps, } = useDropzone({
        onDrop,
        accept: acceptedFiles,
        maxFiles,
        maxSize: maxSizeinBytes,
        disabled
    });

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {children}
            </div>
        </>
    );
}

export default FileUploadComponent;