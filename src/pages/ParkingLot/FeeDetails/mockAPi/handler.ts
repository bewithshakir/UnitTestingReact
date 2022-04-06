import { rest, DefaultRequestBody, ResponseComposition, RestContext, RestRequest } from "msw";
import { addEditFeeResponse, feeDetailsResp } from "./sampleResponse";

export const getDelFeeSchduleHandler = () => {
    return rest.get('*/api/pricing-fee-service/fees/frequencies*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": [
                    {
                        "feeFrequencyCd": "04a06dbf-9f2f-4414-aae8-9045aad0cb87",
                        "feeFrequencyNm": "Per Day",
                        "activeInactiveIndicator": "Y"
                    },
                    {
                        "feeFrequencyCd": "2014186b-8e1a-40e6-b23f-04456eb02816",
                        "feeFrequencyNm": "Per Month",
                        "activeInactiveIndicator": "Y"
                    },
                    {
                        "feeFrequencyCd": "32c0986d-aa76-4b1c-9feb-e5f82b41c326",
                        "feeFrequencyNm": "Per Week",
                        "activeInactiveIndicator": "Y"
                    },
                    {
                        "feeFrequencyCd": "58664ce4-49f7-4038-82a9-af7d5d0c9831",
                        "feeFrequencyNm": "Per Order",
                        "activeInactiveIndicator": "Y"
                    }
                ],
                "error": null
            })
        );
    });
};

export const getAssetTypeHandler = () => {
    return rest.get('*/api/product-service/assets', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                    "assets": [
                        {
                            "assetId": "03fdf3ba-83be-4765-956c-68a56e2a0fe6",
                            "assetNm": "Gas Tank 2",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "048c19c3-55b6-4dd7-bcbb-bd9dabdb0e48",
                            "assetNm": "Gas Tank 4",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "083422e6-6eff-4787-86f4-eb51c86567f9",
                            "assetNm": "Generator 2",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "15ab645b-3e68-4fbb-9ba4-c2077e6d5819",
                            "assetNm": "Sedan 2",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "18aa92b0-8fbb-4701-ab7d-08fb103179c6",
                            "assetNm": "Sedan 4",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "26bcd745-7788-43a6-bf44-ca6e5e29e65c",
                            "assetNm": "Gas Tank",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "2a46610f-c4f0-4413-9203-98816ead7f19",
                            "assetNm": "Truck",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "3ef3da85-0365-407c-acac-dfc00e7a9b17",
                            "assetNm": "Truck 4",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "424f86fa-daa2-4217-9db6-ab1aa67849e1",
                            "assetNm": "Sedan 3",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "471b3ac3-8674-4504-90c2-d332388bbf4e",
                            "assetNm": "Generator 5",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "512627a4-a2a0-40c9-8fd3-2f87a0ee52af",
                            "assetNm": "Generator 3",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "708dd76e-09f4-4839-aa72-c5379782633c",
                            "assetNm": "Truck 2",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "80273ef7-b382-4ba3-8d6e-9609a0c9f967",
                            "assetNm": "Sedan 5",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "8ec969a0-f63d-43ae-b5aa-3e33eeb05886",
                            "assetNm": "Truck 5",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "96362cbe-d3bd-4fe5-acdc-4ef414c6960b",
                            "assetNm": "Gas Tank 3",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "b5e6b7dd-2c8c-4da1-ab4e-5c2be256d2ac",
                            "assetNm": "Truck 3",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "efe70373-3248-4b24-8144-11b2e9a35a2f",
                            "assetNm": "Gas Tank 5",
                            "activeInactiveInd": "Y"
                        },
                        {
                            "assetId": "fab415a3-7dba-4030-8332-861577cf8af7",
                            "assetNm": "Sedan",
                            "activeInactiveInd": "Y"
                        }
                    ]
                },
                "error": null
            })
        );
    });
};

const handleAddFeeResp = (
    _req: RestRequest,
    res: ResponseComposition<DefaultRequestBody>,
    ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            "data": addEditFeeResponse,
            "error": null
        })
    );
};

const feeDetailsAPIPath = '*/api/pricing-fee-service/fees';

export const addFeeDetailsHandler = () => {
    return rest.post(feeDetailsAPIPath, handleAddFeeResp);
};

export const getFeeDetailsHandler = () => {
    return rest.get(feeDetailsAPIPath, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(feeDetailsResp)
        );
    });
};


export const editFeeDetailsHandler = () => {
    return rest.put(feeDetailsAPIPath, handleAddFeeResp);
};
