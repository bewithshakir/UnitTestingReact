import { memo } from "react";

import { ProductsListSet } from "../../../pages/ProductManagementLanding/queries";

import Select from '../Select/SingleSelect';

import './ColorLegendControl.scss';
import { formatLegendsData } from "../../../utils/legendColorData";

const ColorLegendControl = memo(() => {
    
    const { data }: any = ProductsListSet('', {sortBy: '', order: ''}, {});
    const onChaneFn = ()=> {
        return false;
    };
    return (
        <div className="legend_wrapper">
            <Select
                id='productColor'
                name='productColor'
                dropdownType='productcolor'
                label=""
                placeholder='Choose'
                items={formatLegendsData(data)}
                onChange={onChaneFn}
            />
        </div>
    );
});

export default ColorLegendControl;