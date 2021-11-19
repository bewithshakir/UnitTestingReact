import React from 'react';
import { useHistory } from 'react-router';
import { useAddSalesTax } from './queries';

const Btn: React.FC = ()=> {
    const history = useHistory();
    
    const onAddSalesTaxError = ()=> {
        // return
    };
    const onAddSalesTaxSuccess = ()=> {
        // return
    };
    const { mutate: addNewSalesTax } = useAddSalesTax(onAddSalesTaxError, onAddSalesTaxSuccess);
    const goToBtn = () => {
        const apiPayload = {
            "countryCode":"us",
            "state":"TX",
            "city":"Houstan",
            "stateRate":1.32,
            "federalRate":3.654,
            "localRate":2.3456
        };
        addNewSalesTax(apiPayload);
        history.push('/btn');
    };
    return (
        <div data-test="component-btn">
            Button from component
            <button type="button" onClick={goToBtn}>btn</button>
        </div>
    );
};
export default Btn;