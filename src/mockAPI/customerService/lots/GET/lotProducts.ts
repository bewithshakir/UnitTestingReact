import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

const produtIconName = 'Parrot Green';
const productIconCd = 'cdc00914-dbef-4603-89c5-9f18e4af3ccc';
const productId = '684c58ab-d23c-4591-b9fd-41296c7a394e';
const pricingModelNm = "OPIS Retail";
const pricingModelCd = "945d3d8b-57bb-42c8-88a5-2dae9cd230f0";
const lotId = "fe193659-fa71-481c-b30f-4d6c82b25e5b";
export const getLotProducts = (pathName: string, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    if (pathName.includes('emptyRespUser123')) {
        return res(
            ctx.status(200),
            ctx.json({ "data": { "pagination": { "totalCount": 0, "limit": 15, "offset": 0 }, "lotProducts": [], } })
        );
    }
    return res(
        ctx.status(200),
        ctx.json({
            "data": {
                ...(pathName.includes('skipPagination=true') ? {} : {
                    "pagination": { "totalCount": 8, "limit": 15, "offset": 0 },
                }),
                "lotProducts": [
                    {
                        "applicableProductId": "155f1447-23d4-4e1f-a3de-1fdd30170083",
                        "deliveryLocationId": lotId,
                        "productId": "9fa85e21-fab8-48d2-af36-85c7686e7666",
                        "productNm": "1 Purple Product Retail",
                        "productColor": {
                            "productIconCd": "a59eac7d-d7fe-4635-805a-dc8e38bfa750",
                            "productIconNm": "Green",
                            "productIconHexCode": "#008443",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": pricingModelCd,
                            "pricingModelNm": pricingModelNm,
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y",
                        "opisRackStatus": "Y",
                        "opisProductKey": null
                    },
                    {
                        "applicableProductId": "75593724-17ae-4fa2-876b-4dfb4e82c9b6",
                        "deliveryLocationId": lotId,
                        "productId": productId,
                        "productNm": "Diesel Retail",
                        "productColor": {
                            "productIconCd": productIconCd,
                            "productIconNm": produtIconName,
                            "productIconHexCode": "#BED50F",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": pricingModelCd,
                            "pricingModelNm": pricingModelNm,
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y",
                        "opisRackStatus": "Y",
                        "opisProductKey": null
                    },
                    {
                        "applicableProductId": "480bb3a3-7475-448d-89ad-0eeabaa80a0d",
                        "deliveryLocationId": lotId,
                        "productId": "21f72366-d691-4a5e-b6b7-44089d699f5a",
                        "productNm": "Prod one Retail",
                        "productColor": {
                            "productIconCd": "eb87bb2a-cec7-4b06-b47a-36af04d71a7a",
                            "productIconNm": "Orange",
                            "productIconHexCode": "#EB8705",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": pricingModelCd,
                            "pricingModelNm": pricingModelNm,
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y",
                        "opisRackStatus": "Y",
                        "opisProductKey": null
                    },
                    {
                        "applicableProductId": "6ed4ff41-9f3c-4260-83f4-8709c0949068",
                        "deliveryLocationId": lotId,
                        "productId": productId,
                        "productNm": "Product 1",
                        "productColor": {
                            "productIconCd": productIconCd,
                            "productIconNm": produtIconName,
                            "productIconHexCode": "#BED50F",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": "7c12da5b-3902-4aa6-bcba-dd3c3519afa1",
                            "pricingModelNm": "Custom",
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y",
                        "opisRackStatus": "Y",
                        "opisProductKey": null
                    },
                    {
                        "applicableProductId": "f7732a85-b920-4d2c-8644-4c4ed522132d",
                        "deliveryLocationId": lotId,
                        "productId": productId,
                        "productNm": "Product1",
                        "productColor": {
                            "productIconCd": productIconCd,
                            "productIconNm": produtIconName,
                            "productIconHexCode": "#BED50F",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": "7f5411c8-ae32-43f6-a05e-146b4d866206",
                            "pricingModelNm": "OPIS Rack",
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y",
                        "opisRackStatus": "N",
                        "opisProductKey": "biodieselb10smeultralowsulno2sr935carson0uno2n-10orportlandsmed"
                    },
                    {
                        "applicableProductId": "b0170ed7-0fb3-4b3d-9e48-3f87715b84af",
                        "deliveryLocationId": lotId,
                        "productId": "8ee38e73-f9dd-40ca-a53c-49327eab1487",
                        "productNm": "Regular Retail",
                        "productColor": {
                            "productIconCd": "1bcfe6f1-0fae-4473-a686-82084c8a5030",
                            "productIconNm": "Aqua",
                            "productIconHexCode": "#89CFDC",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": pricingModelCd,
                            "pricingModelNm": pricingModelNm,
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y",
                        "opisRackStatus": "Y",
                        "opisProductKey": null
                    },
                    {
                        "applicableProductId": "d783d7f6-7778-4cd3-a2d6-540e33a2c57e",
                        "deliveryLocationId": lotId,
                        "productId": "9986b9d3-fe75-45a4-b131-9e7e4f1ecfc9",
                        "productNm": "Test Data Model 1 Retail",
                        "productColor": {
                            "productIconCd": "7381a575-7e35-405b-87e5-bbe833010743",
                            "productIconNm": "Yellow",
                            "productIconHexCode": "#FBCE07",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": pricingModelCd,
                            "pricingModelNm": pricingModelNm,
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y",
                        "opisRackStatus": "Y",
                        "opisProductKey": null
                    },
                    {
                        "applicableProductId": "a7d76e92-ad4e-48d6-bdff-d2ce15113a0a",
                        "deliveryLocationId": lotId,
                        "productId": "3384bfc4-3c54-45d1-928e-6ba8f584fc3d",
                        "productNm": "Test product 2 Retail",
                        "productColor": {
                            "productIconCd": "2488eb63-2306-4c92-922c-9a527300024b",
                            "productIconNm": "Red",
                            "productIconHexCode": "#DD1D21",
                            "activeInactiveInd": "Y"
                        },
                        "pricingModel": {
                            "pricingModelCd": pricingModelCd,
                            "pricingModelNm": pricingModelNm,
                            "countryCd": "us",
                            "activeInactiveIndicator": "Y"
                        },
                        "activeInactiveInd": "Y",
                        "opisRackStatus": "Y",
                        "opisProductKey": null
                    }
                ]
            },
            "error": null
        })
    );
};
