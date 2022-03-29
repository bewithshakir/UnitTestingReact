import { DefaultRequestBody, PathParams, ResponseComposition, RestContext, RestRequest } from "msw";

const getUserListHandler = (req: RestRequest<never, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {

    const customerId = req.url.searchParams.get('customerId');
    return res(
        ctx.status(200),
        ctx.json({
            data: {
                "pagination": {
                    "totalCount": 2,
                    "limit": 10,
                    "offset": 0
                },
                users: !customerId ? [
                    {
                        "userId": "ID-4536",
                        "shellDigitalAccountId": "ID-123",
                        "firstNm": "USER NAME",
                        "lastNm": "USER NAME",
                        "email": "dsp@shell.com",
                        "phone": null,
                        "customerId": "ID-344-4536",
                        "dspId": "ID-9878-5600",
                        "createdDtm": "2022-04-21T10:41:11.603Z",
                        "userGroup": [
                            {
                                "userGroupCd": "4fba423054-fc0d-4d60-88fd-dab70c7611b9",
                                "userGroupNm": "DSP"
                            }
                        ],
                        "fullName": 'test test'
                    },
                    {
                        "userId": "ID-4536",
                        "shellDigitalAccountId": "ID-123",
                        "firstNm": "USER NAME",
                        "lastNm": "USER NAME",
                        "email": "dsp1@bacancy.com",
                        "phone": null,
                        "customerId": "ID-34456-4536",
                        "dspId": "ID-9878-5646",
                        "createdDtm": "2022-05-21T10:41:11.603Z",
                        "userGroup": [
                            {
                                "userGroupCd": "4fba40674-fc0d-4d60-88fd-dab70c7611b9",
                                "userGroupNm": "DSP"
                            }
                        ],
                        "fullName": 'test test'
                    }
                ] : [
                    {
                        "userId": "ID-4536-1",
                        "shellDigitalAccountId": "ID-123-1",
                        "firstNm": "Victor",
                        "lastNm": "test",
                        "email": "abc123@bacancy.com",
                        "phone": null,
                        "customerId": "ID-344-4536-1",
                        "dspId": "ID-9878-5600-1",
                        "createdDtm": "2022-04-21T10:41:11.603Z",
                        "userGroup": [
                            {
                                "userGroupCd": "4fba423054-fc0d-4d60-88fd-dab70c7611b9-1",
                                "userGroupNm": "DSP"
                            }
                        ],
                        "fullName": 'test test'
                    },
                    {
                        "userId": "ID-4536-2",
                        "shellDigitalAccountId": "ID-123-2",
                        "firstNm": "john",
                        "lastNm": "test2",
                        "email": "abc345@bacancy.com",
                        "phone": null,
                        "customerId": "ID-34456-4536-2",
                        "dspId": "ID-9878-5646-1",
                        "createdDtm": "2022-05-21T10:41:11.603Z",
                        "userGroup": [
                            {
                                "userGroupCd": "4fba40674-fc0d-4d60-88fd-dab70c7611b9-2",
                                "userGroupNm": "DSP"
                            }
                        ],
                        "fullName": 'test test'
                    }
                ]
            },
            "error": null
        })
    );
}

export default getUserListHandler;