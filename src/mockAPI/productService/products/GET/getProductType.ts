import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getPropductType = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
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