import { DefaultRequestBody, PathParams, ResponseComposition, rest, RestContext, RestRequest } from "msw";

export const editDspHandler = (req: RestRequest<DefaultRequestBody, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: {
                "dspId": "22",
                "dspName": "dsp updated test",
                "customerId": "33",
                "contactName": "steve",
                "contactEmailId": "newcustomer@gmail.com",
                "contactPhoneNumber": "8939785301",
                "createdDtm": "2022-01-27T09:03:55.931Z",
                "lastUpdatedDtm": "2022-01-27T19:23:34.437Z",
                "deletedDtm": null,
                "addressLine1": "Houston Court ",
                "addressLine2": "Houston Ct",
                "cityNm": "Saratoga",
                "stateNm": "CA",
                "postalCd": "95070",
                "activeInactiveInd": "Y"
            },
            error: null
        })
    );
};
