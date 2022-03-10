import { memo } from "react";

import { ProductsListSet } from "../../../pages/ProductManagementLanding/queries";
import Select from '../Select/SingleSelect';
import { formatLegendsData } from "../../../utils/legendColorData";
import './ColorLegendControl.scss';

const ColorLegendControl = memo(() => {
    
    const { data }: any = ProductsListSet('', {sortBy: '', order: ''}, {});
    const onChaneFn = ()=> {
        return false;
    };
    return (
        <div className="legend_wrapper">
            <Select
                id='productLegends'
                name='productLegends'
                dropdownType='productLegends'
                label=""
                placeholder='Products'
                items={formatLegendsData(data)}
                onChange={onChaneFn}
            />
        </div>
    );
});

export default ColorLegendControl;