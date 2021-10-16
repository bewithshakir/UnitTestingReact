import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

parkingLot.propTypes = {

};

function parkingLot(props: any): React.ReactElement {
    console.warn(props);
    const history = useHistory();
    const onItemClick = () => {
        history.push("/customer/parkingLots/addLot");
    };
    return (
        <div>
            <Button onClick={onItemClick} style={{margin:40}}>{"Add Lot"}</Button>
        </div>
    );
}

export default parkingLot;