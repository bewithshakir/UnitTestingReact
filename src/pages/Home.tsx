import { useHistory } from 'react-router-dom';

import HorizontalBar from '../components/UIComponents/NavigationBar/HorizontalBar';
import { Box, CssBaseline } from '@mui/material';



const Home = (props: { version: any }) => {
    
   
    const history = useHistory()
    function onClickBack() {
        history.goBack()
    }
  

    console.log(props, "home props")
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HorizontalBar
                version={props.version}
                onBack={onClickBack}
            />
           
        </Box>
    );
};

Home.propTypes = {

};

export default Home;