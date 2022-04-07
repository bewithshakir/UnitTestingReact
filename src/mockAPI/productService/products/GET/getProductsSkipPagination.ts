import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getProductsSkipPagination = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: [
                {
                    "productCd": "1",
                    "productNm": "Tire Pressure Check",
                    "manualPricing": 0,
                    "countryCode": "us",
                    "activeInactiveInd": "Y",
                    "ProductIcon": {
                        "productIconCd": "cdc00914-dbef-4603-89c5",
                        "productIconNm": "Parrot Green",
                        "productIconHexCode": "#BED50F",
                        "activeInactiveInd": "Y"
                    },
                    "ProductGroup": {
                        "productGroupCd": "4af508ce-c380-4f40-a424",
                        "productGroupNm": "Add-On service",
                        "activeInactiveInd": "Y"
                    }
                }
            ]
        })
    );
}