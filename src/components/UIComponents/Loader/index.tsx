import { Box, CircularProgress } from '@mui/material';
import "./loader.scss";

function Loader() {
    return (
        <div>
            <Box className="loader">
                <CircularProgress />
            </Box>
        </div>
    );
}

export  {Loader};