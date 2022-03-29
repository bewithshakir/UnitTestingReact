import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getProductByGroup = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            "data": [{
                "productCd": "64e83707-b387-46c0-8e27-700e2a448b82",
                "productNm": "Diesel New",
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
            }, {
                "productCd": "f8d3eff8-3045-45a1-b052-a3ee0fb5961a",
                "productNm": "regular o",
                "manualPricing": 0,
                "countryCode": "us",
                "activeInactiveInd": "Y",
                "ProductIcon": {
                    "productIconCd": "3b02ae9f-17e4-4563-a258-ea8dc996ce32",
                    "productIconNm": "Purple",
                    "productIconHexCode": "#641964",
                    "activeInactiveInd": "Y"
                },
                "ProductGroup": {
                    "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                    "productGroupNm": "Fuel",
                    "activeInactiveInd": "Y"
                }
            }, {
                "productCd": "8ee38e73-f9dd-40ca-a53c-49327eab1487",
                "productNm": "Regular1",
                "manualPricing": 0,
                "countryCode": "us",
                "activeInactiveInd": "Y",
                "ProductIcon": {
                    "productIconCd": "1bcfe6f1-0fae-4473-a686-82084c8a5030",
                    "productIconNm": "Aqua",
                    "productIconHexCode": "#89CFDC",
                    "activeInactiveInd": "Y"
                },
                "ProductGroup": {
                    "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                    "productGroupNm": "Fuel",
                    "activeInactiveInd": "Y"
                }
            }, {
                "productCd": "13fcd51e-4183-4999-91ec-c7e16b6b20fa",
                "productNm": "Test product 2",
                "manualPricing": 0,
                "countryCode": "us",
                "activeInactiveInd": "Y",
                "ProductIcon": {
                    "productIconCd": "57f15eeb-cb05-4449-aba1-056bf4173765",
                    "productIconNm": "Sky Blue",
                    "productIconHexCode": "#009EB4",
                    "activeInactiveInd": "Y"
                },
                "ProductGroup": {
                    "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                    "productGroupNm": "Fuel",
                    "activeInactiveInd": "Y"
                }
            }, {
                "productCd": "9986b9d3-fe75-45a4-b131-9e7e4f1ecfc9",
                "productNm": "Test Data Model 1",
                "manualPricing": 0,
                "countryCode": "us",
                "activeInactiveInd": "Y",
                "ProductIcon": {
                    "productIconCd": "7381a575-7e35-405b-87e5-bbe833010743",
                    "productIconNm": "Yellow",
                    "productIconHexCode": "#FBCE07",
                    "activeInactiveInd": "Y"
                },
                "ProductGroup": {
                    "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                    "productGroupNm": "Fuel",
                    "activeInactiveInd": "Y"
                }
            }, {
                "productCd": "246745df-7a58-4102-b445-8a184b709ba0",
                "productNm": "Test Fuel",
                "manualPricing": 0,
                "countryCode": "us",
                "activeInactiveInd": "Y",
                "ProductIcon": {
                    "productIconCd": "bf310d7b-1ac4-4f55-af8e-15b74f2873a8",
                    "productIconNm": "Navy Blue",
                    "productIconHexCode": "#003C88",
                    "activeInactiveInd": "Y"
                },
                "ProductGroup": {
                    "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                    "productGroupNm": "Fuel",
                    "activeInactiveInd": "Y"
                }
            }],
            "error": null
        })
    );
};
