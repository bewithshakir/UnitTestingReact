import { rest } from "msw";

export const addAssetHandler = () => {
    return rest.post('*/api/product-service/assets', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "assetId": "1",
                    "assetNm": "Test111",
                    "activeInactiveInd": "Y",
                    "countryCd": "us",
                    "lastUpdatedDate": "2022-02-10T11:04:39.465Z",
                    "addedDate": "2022-02-10T11:04:39.465Z",
                    "deletedDtm": null
                },
                error: null
            })
        );
    });
};
