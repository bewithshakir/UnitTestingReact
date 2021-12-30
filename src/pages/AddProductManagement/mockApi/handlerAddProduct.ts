import { rest } from "msw"

export const productTypesHandler = ()=> {
    return rest.get('*/api/product-service/product/productType', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "productClassCd": "111",
                        "productClassNm": "Test11 Non-Fuel",
                        "activeInactiveInd": "Y"
                    },
                    {
                        "productClassCd": "222",
                        "productClassNm": "Fuel",
                        "activeInactiveInd": "Y"
                    }
                ]
            })
        )
    })
};

export const productColorsHandler = ()=> {
    return rest.get('*/api/product-service/product/productColor', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "productColorCd": "12",
                        "name": "red",
                        "activeInactiveInd": "Y"
                    },
                    {
                        "productColorCd": "13",
                        "name": "blue",
                        "activeInactiveInd": "Y"
                    }
                ]
            })
        )
    })
};

export const addProductManagementHandler = ()=> {
    return rest.post('*/api/product-service/product/add', (req, res, ctx) => {
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
        )
    })
};

export const getProductDataHandler = ()=> {
    return rest.get('*/api/product-service/product/details/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "productId": "1",
                    "productName": "test edit Diesel",
                    "productServiceInd": "Y",
                    "manualPricing": 3,
                    "productClass": {
                        "productClassCd": "12",
                        "productClassNm": "test edit Non-Fuel",
                        "activeInactiveInd": "Y"
                    },
                    "productColor": {
                        "productColorCd": "2",
                        "productColorNm": "test edit color Purple",
                        "productColorCode": "#641964",
                        "activeInactiveInd": "Y"
                    },
                    "productGroupCd": "3"
                },
                "error": null
            })
        )
    })
};

export const editProductManagementHandler = ()=> {
    return rest.put('*/api/product-service/product/edit/*', (req, res, ctx) => {
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
    })
};