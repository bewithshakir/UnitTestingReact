import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const editProductHandler = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {

    return res(
        ctx.status(200),
        ctx.json({
            "data": [
                {
                    "applicableProductId": "e718e6b8-083b-484d-b387-f086e2b29b50",
                    "deliveryLocationId": "c26cc0ab-cbba-414f-a8e5-4a14844ea70b",
                    "pricingCityId": null,
                    "pricingProductId": null,
                    "productNm": "p12-edited",
                    "productCd": "fe29b0ed-1380-4992-9734-ce71ffe76aa6",
                    "pricingModelCd": "7c12da5b-3902-4aa6-bcba-dd3c3519afa1",
                    "opisCityId": null,
                    "manualPriceAmt": 10,
                    "addedPriceAmt": null,
                    "discountPriceAmt": null,
                    "createdDtm": "2022-01-30T17:08:19.310Z",
                    "updatedDtm": "2022-01-31T02:06:09.753Z",
                    "deletedDtm": null,
                    "activeInactiveInd": "Y"
                }
            ],
            "error": null
        })
    );
};