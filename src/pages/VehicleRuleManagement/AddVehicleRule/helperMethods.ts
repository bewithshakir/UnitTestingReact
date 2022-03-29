

export const getProductIds = (arr: any) => {
    const temp: any = [];
    arr.map((obj: any) => temp.push(obj.value));
    return temp;
};

export const getFilteredProductsFromMainList = (vehicleRuleProducts: any, productNameList: any) => {
    return productNameList?.filter((el: any) => {
        return vehicleRuleProducts.some((f: any) => {
            return f.productCd === el.value;
        });
    });
};

export const isFuelNonFuelProduct = (obj: any) => {
    if (obj.ProductGroup.productGroupNm === ("Fuel" || "Non-Fuel")) {
        return true;
    } else {
        return false;
    }
};
