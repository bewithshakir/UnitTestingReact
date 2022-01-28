import { rest } from "msw";

export const getProductByLotHandler = () => {
    return rest.get('*/api/customer-service/lot/9999/product*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 4,
                        "limit": 15,
                        "offset": 0
                    },
                    lotProducts: [
                        {
                            "applicableProductId": "458b8e0b-a305-4a34-bbca-985703dbf56b",
                            "deliveryLocationId": "3916b833-4c0c-4e9f-bd16-39c327dae66e",
                            "productId": "35c92ec4-83db-401e-b43e-587668022764",
                            "productNm": "regular-custom",
                            "productColor": {
                                "productIconCd": "012711bf-dd95-4458-a6ec-9a3f30207022",
                                "productIconNm": "Orange",
                                "productIconHexCode": "#EB8705",
                                "activeInactiveInd": "Y"
                            },
                            "pricingModel": {
                                "pricingModelCd": "34cb0599-a8e4-4023-afed-4d705ac1375c",
                                "pricingModelNm": "Custom",
                                "countryCd": "us",
                                "activeInactiveIndicator": "Y"
                            },
                            "activeInactiveInd": "Y"
                        },
                        {
                            "applicableProductId": "e0ebcabd-5c97-4fd9-be5b-21ec5b3a7b98",
                            "deliveryLocationId": "3916b833-4c0c-4e9f-bd16-39c327dae66e",
                            "productId": "35c92ec4-83db-401e-b43e-587668022764",
                            "productNm": "regular-custom2",
                            "productColor": {
                                "productIconCd": "012711bf-dd95-4458-a6ec-9a3f30207022",
                                "productIconNm": "Orange",
                                "productIconHexCode": "#EB8705",
                                "activeInactiveInd": "Y"
                            },
                            "pricingModel": {
                                "pricingModelCd": "34cb0599-a8e4-4023-afed-4d705ac1375c",
                                "pricingModelNm": "Custom",
                                "countryCd": "us",
                                "activeInactiveIndicator": "Y"
                            },
                            "activeInactiveInd": "Y"
                        },
                        {
                            "applicableProductId": "16300452-7c3d-4ad7-baca-d307fac6e921",
                            "deliveryLocationId": "3916b833-4c0c-4e9f-bd16-39c327dae66e",
                            "productId": "35c92ec4-83db-401e-b43e-587668022764",
                            "productNm": "regular-custom3",
                            "productColor": {
                                "productIconCd": "012711bf-dd95-4458-a6ec-9a3f30207022",
                                "productIconNm": "Orange",
                                "productIconHexCode": "#EB8705",
                                "activeInactiveInd": "Y"
                            },
                            "pricingModel": {
                                "pricingModelCd": "34cb0599-a8e4-4023-afed-4d705ac1375c",
                                "pricingModelNm": "Custom",
                                "countryCd": "us",
                                "activeInactiveIndicator": "Y"
                            },
                            "activeInactiveInd": "Y"
                        },
                        {
                            "applicableProductId": "06a74424-d20c-464e-a76c-4e6858481557",
                            "deliveryLocationId": "3916b833-4c0c-4e9f-bd16-39c327dae66e",
                            "productId": "35c92ec4-83db-401e-b43e-587668022764",
                            "productNm": "regular-custom4",
                            "productColor": {
                                "productIconCd": "012711bf-dd95-4458-a6ec-9a3f30207022",
                                "productIconNm": "Orange",
                                "productIconHexCode": "#EB8705",
                                "activeInactiveInd": "Y"
                            },
                            "pricingModel": {
                                "pricingModelCd": "34cb0599-a8e4-4023-afed-4d705ac1375c",
                                "pricingModelNm": "Custom",
                                "countryCd": "us",
                                "activeInactiveIndicator": "Y"
                            },
                            "activeInactiveInd": "Y"
                        }
                    ]
                },
                error: null
            })
        );
    });
};