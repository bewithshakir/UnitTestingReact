import { rest } from "msw";

export const getProductHandler = () => {
    return rest.get('*/api/product-service/products*', (req, res, ctx) => {
        
        const urlHref = req.url.href;
        if (urlHref.includes('product-groups')) {
            // Product Type select
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
        } 
        else if (urlHref.includes('product-icons')) {
            // Product Color select
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
        } 
        else if (urlHref.includes('&skipPagination=true&productGroups=[')) {
            // Add Fuel Tax > Product Name
            return res(
                ctx.status(200),
                ctx.json({
                    data: [
                        {
                            ProductGroup: {
                                activeInactiveInd: "Y",
                                productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                                productGroupNm: "Non-Fuel"
                            },
                            productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                            productGroupNm: "Non-Fuel",
                            ProductIcon: {
                                activeInactiveInd: "Y",
                                productIconCd: "2488eb63-2306-4c92-922c-9a527300024b",
                                productIconHexCode: "#DD1D21",
                                productIconNm: "Red"
                            },
                            productCd: "123",
                            productNm: "Diesel",
                            activeInactiveInd: "Y",
                            countryCode: "us",
                            manualPricing: 0,
                        },
                        {
                            ProductGroup: {
                                activeInactiveInd: "Y",
                                productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                                productGroupNm: "Non-Fuel"
                            },
                            productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                            productGroupNm: "Non-Fuel",
                            ProductIcon: {
                                activeInactiveInd: "Y",
                                productIconCd: "2488eb63-2306-4c92-922c-9a527300024b",
                                productIconHexCode: "#DD1D21",
                                productIconNm: "Yellow"
                            },
                            productCd: "456",
                            productNm: "Regular",
                            activeInactiveInd: "Y",
                            countryCode: "us",
                            manualPricing: 0,
                        },
                    ],
                    error: null
                })
            );
        } 
        else if (urlHref.includes('&productGroupCd=')) {
            // Fee Details > useGetLotMasterProductNames
            return res(
                ctx.status(200),
                ctx.json({
                    "data": {
                        "pagination": {},
                        "lotProducts": [
                            {
                                "applicableProductId": "cede7489-0258-4e33-b6c7-78e4a1c7e43d",
                                "deliveryLocationId": "39ac4e30-4119-4b31-b1fd-ae31a0e0eccc",
                                "productId": "8493c923-8bc5-4f9e-889a-1bc35303e797",
                                "productNm": "regular-Custom_6",
                                "productColor": {
                                    "productIconCd": "3b427583-7507-406e-815b-30f3033ceac0",
                                    "productIconNm": "Green",
                                    "productIconHexCode": "#008443",
                                    "activeInactiveInd": "Y"
                                },
                                "pricingModel": {
                                    "pricingModelCd": "d3e2659d-0b4b-403a-9ccb-9a35649d4957",
                                    "pricingModelNm": "Custom",
                                    "countryCd": "us",
                                    "activeInactiveIndicator": "Y"
                                },
                                "activeInactiveInd": "Y"
                            },
                            {
                                "applicableProductId": "75fdf205-d9b7-4fc7-a3ae-517c133249e3",
                                "deliveryLocationId": "39ac4e30-4119-4b31-b1fd-ae31a0e0eccc",
                                "productId": "8493c923-8bc5-4f9e-889a-1bc35303e797",
                                "productNm": "regular-Custom_8",
                                "productColor": {
                                    "productIconCd": "3b427583-7507-406e-815b-30f3033ceac0",
                                    "productIconNm": "Green",
                                    "productIconHexCode": "#008443",
                                    "activeInactiveInd": "Y"
                                },
                                "pricingModel": {
                                    "pricingModelCd": "d3e2659d-0b4b-403a-9ccb-9a35649d4957",
                                    "pricingModelNm": "Custom",
                                    "countryCd": "us",
                                    "activeInactiveIndicator": "Y"
                                },
                                "activeInactiveInd": "Y"
                            },
                            {
                                "applicableProductId": "d1c5c7b0-19eb-4db4-85ff-7481a5e1a4c5",
                                "deliveryLocationId": "39ac4e30-4119-4b31-b1fd-ae31a0e0eccc",
                                "productId": "8493c923-8bc5-4f9e-889a-1bc35303e797",
                                "productNm": "regular-Custom_9",
                                "productColor": {
                                    "productIconCd": "3b427583-7507-406e-815b-30f3033ceac0",
                                    "productIconNm": "Green",
                                    "productIconHexCode": "#008443",
                                    "activeInactiveInd": "Y"
                                },
                                "pricingModel": {
                                    "pricingModelCd": "d3e2659d-0b4b-403a-9ccb-9a35649d4957",
                                    "pricingModelNm": "Custom",
                                    "countryCd": "us",
                                    "activeInactiveIndicator": "Y"
                                },
                                "activeInactiveInd": "Y"
                            }
                        ]
                    },
                    "error": null
                })
            );
        }
        else if (urlHref.includes('editproduct')) {
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
        } 
        else {
            // Product management Landing
            return res(
                ctx.status(200),
                ctx.json({
                    data: {
                        pagination: {
                            "totalCount": 2,
                            "limit": 15,
                            "offset": 0
                        },
                        products: [
                            {
                                "productCd": "1",
                                "productNm": "Barun 1 test",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "activeInactiveInd": "Y",
                                "ProductIcon": {
                                    "productIconCd": "cdc00914-dbef-4603-89c5-9f18e4af3ccc",
                                    "productIconNm": "Parrot Green",
                                    "productIconHexCode": "#BED50F",
                                    "activeInactiveInd": "Y"
                                },
                                "ProductGroup": {
                                    "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                }
                            },
                            {
                                "productCd": "2",
                                "productNm": "Premium444 test",
                                "manualPricing": 0,
                                "countryCode": "us",
                                "activeInactiveInd": "N",
                                "ProductIcon": {
                                    "productIconCd": "f5f52aa5-9a03-4ea5-8885-d872151b819d",
                                    "productIconNm": "Brown",
                                    "productIconHexCode": "#743410",
                                    "activeInactiveInd": "Y"
                                },
                                "ProductGroup": {
                                    "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                                    "productGroupNm": "Fuel",
                                    "activeInactiveInd": "Y"
                                }
                            }
                        ]
                    }
                })
            );
        }
    });
};



