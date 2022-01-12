import * as React from 'react';
// import { useLocation } from 'react-router-dom';
import './AddAttachment.style.scss';
import { HorizontalBarVersionState, useStore } from '../../../store';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const AddAttachment: React.FC = () => {
    const setVersion = useStore((state: HorizontalBarVersionState) => state.setVersion);
    setVersion("Breadcrumbs-Many");
    return (
        <div className='upload-attachment-div'>
            <Container maxWidth="sm">
                <Box>
                </Box>
            </Container>
        </div>
    );
};

export default AddAttachment;
