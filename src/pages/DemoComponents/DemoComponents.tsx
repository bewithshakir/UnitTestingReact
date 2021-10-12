import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import HorizontalBar from '../../components/UIComponents/NavigationBar/HorizontalBar';
import { DemoComponents } from '../../components/UIComponents/DemoComponents/DemoComponents.component';

const DemoReusableComponent: React.FC<any> = (props: any) => {
   

    const history = useHistory();

    function onClickBack() {
        history.goBack();
    }

    return (
        <Box display="flex" mt={8}>
            <CssBaseline />
            <HorizontalBar
                version={props.version}
                onBack={onClickBack}
            />
            <DemoComponents />
          </Box>
    );
};

DemoReusableComponent.propTypes = {

};

export default DemoReusableComponent;