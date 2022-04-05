import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getLotProductTypes = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            "data": {
                "lotProductTypes": [
                    {
                        "productGroupCd": "bfd5cdb8-e0a5-428a-abfc-9d5c9185fe81",
                        "productGroupNm": "Fuel",
                        "activeInactiveInd": "Y"
                    }
                ]
            },
            "error": null
        })
    );
};