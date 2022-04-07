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
                },
                {
                    activeInactiveInd: "Y",
                    productGroupCd: "0f117f3d-02a8-4d5e-9a97-eb67a66509cf",
                    productGroupNm: "Non-Fuel"
                },
                {
                    activeInactiveInd: "Y",
                    productGroupCd: "4af508ce-c380-4f40-a424-923188935ecf",
                    productGroupNm: "Add-On service"
                }
            ]
        })
    );
};
