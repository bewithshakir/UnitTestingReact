import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getProductDetails = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
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