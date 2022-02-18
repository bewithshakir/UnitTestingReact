import { rest } from "msw";

export const addAssetHandler = () => {
    return rest.post('http://52.226.196.74/api/product-service/assets', (req, res, ctx) => {
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


export const getAssetDeatilsHandler = () => {
    return rest.get('http://52.226.196.74/api/product-service/assets/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "assetId": "bbc7490e-4dea-43d1-92f3-d1b0feae42d0",
                    "assetNm": "Asset One",
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
