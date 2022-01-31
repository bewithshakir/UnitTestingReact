import { rest } from "msw";

export const productTypesHandler = () => {
    return rest.get('*/api/product-service/product/productGroups', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "productGroupCd": "111",
                        "productGroupNm": "Test11 Non-Fuel",
                        "activeInactiveInd": "Y"
                    },
                    {
                        "productGroupCd": "222",
                        "productGroupNm": "Fuel",
                        "activeInactiveInd": "Y"
                    }
                ]
            })
        );
    });
};

export const productColorsHandler = () => {
    return rest.get('*/api/product-service/product/productIcons', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "productIconCd": "12",
                        "name": "red",
                        "hex": "Y"
                    },
                    {
                        "productColorCd": "13",
                        "name": "blue",
                        "hex": "Y"
                    }
                ]
            })
        );
    });
};

export const addProductManagementHandler = () => {
    return rest.post('*/api/product-service/product', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "productId": "12345",
                    "productGroupCd": "1",
                    "productClassCd": "2",
                    "countryCd": "us",
                    "productCd": "3",
                    "saleableProductNm": "test Premium",
                    "productServiceInd": "Y",
                    "colorCd": "22",
                    "manualPricing": 0,
                    "supplierCd": null,
                    "opisProductKey": null,
                    "octaneLvl": null
                }
            })
        );
    });
};

export const getProductDataHandler = () => {
    return rest.get('*/api/product-service/product/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                    "data": {
                        "productCd": "5bfb42d3-be1f-4fd5-8d31-3cf0259ebc45",
                        "productNm": "test edit Diesel",
                        "activeInactiveInd": "Y",
                        "manualPricing": 3,
                        "countryCode": "us",
                        "productGroup": {
                            "productGroupCd": "85ba2673-6c56-440f-8478-0630ebeddab6",
                            "productGroupNm": "test edit Non-Fuel",
                            "activeInactiveInd": "Y"
                        },
                        "productIcon": {
                            "productIconCd": "35410964-01a7-44ed-aa28-8f9d9d981861",
                            "productIconNm": "test edit color Purple",
                            "productIconHexCode": "#EB8705",
                            "activeInactiveInd": "Y"
                        }
                    },
                    "error": null
                })
        );
    });
};

export const editProductManagementHandler = () => {
    return rest.put('*/api/product-service/product/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    colorCd: "11",
                    countryCd: "us",
                    manualPricing: 0,
                    productCd: "22",
                    productClassCd: "33",
                    productGroupCd: "44",
                    productId: "55",
                    productServiceInd: "Y",
                    saleableProductNm: "Test45"
                }
            })
        );
    });
};