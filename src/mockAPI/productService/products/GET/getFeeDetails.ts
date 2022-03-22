import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getFeeDetails = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            "data": {
                "pagination": {},
                "lotProducts": [
                    {
                        "applicableProductId": "1feeDetails",
                        "deliveryLocationId": "39ac4e30",
                        "productId": "8493c923",
                        "productNm": "regular-Custom_6",
                        "productColor": {
                            "productIconCd": "3b427583",
                            "productIconNm": "Green",
                            "productIconHexCode": "#008443",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": "0b4b",
                            "pricingModelNm": "Custom",
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y"
                    },
                    {
                        "applicableProductId": "75fdf205-d9b7-4fc7-a3ae-517c133249e3",
                        "deliveryLocationId": "4119",
                        "productId": "bc5",
                        "productNm": "regular-Custom_8",
                        "productColor": {
                            "productIconCd": "507-406e-815b-30f3033ceac0",
                            "productIconNm": "Green",
                            "productIconHexCode": "#008443",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": "403a",
                            "pricingModelNm": "Custom",
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y"
                    },
                    {
                        "applicableProductId": "d1c5c7b0-19eb-4db4-85ff-7481a5e1a4c5",
                        "deliveryLocationId": "b1fd-ae31a0e0eccc",
                        "productId": "4f9e-889a-1bc35303e797",
                        "productNm": "regular-Custom_9",
                        "productColor": {
                            "productIconCd": "815b-30f3033ceac0",
                            "productIconNm": "Green",
                            "productIconHexCode": "#008443",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": "9a35649d4957",
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