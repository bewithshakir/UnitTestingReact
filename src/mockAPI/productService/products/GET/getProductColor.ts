import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getProductColor = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
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