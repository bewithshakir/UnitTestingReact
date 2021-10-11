import { Box, CircularProgress } from '@mui/material';
import "./loader.scss"

function Loader(props:any) {
    return (
        <div>
            <Box className="loader">
                <CircularProgress />
            </Box>
        </div>
    );
}

export  {Loader};