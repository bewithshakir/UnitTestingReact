import { filter } from 'lodash';

import { getProductIcon } from "./helperFunctions";

export const formatLegendsData = (data: any)=> {
    const filteredData = filter(data?.pages[0].data.products, {  activeInactiveInd: 'Y' });

    const updatedData = filteredData.map(item => ({
        value: item.productCd,
        label: item.ProductGroup.productGroupNm + ' - ' + item.productNm, 
        icon: getProductIcon(item.ProductIcon.productIconNm),
        isDisabled: true
    }));
    return updatedData;
};

