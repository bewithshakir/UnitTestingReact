import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

const getUserListHandler = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) =>
    res(
        ctx.status(200),
        ctx.json({
            data: {
                "pagination": {
                    "totalCount": 2,
                    "limit": 10,
                    "offset": 0
                },
                users: [
                    {
                        "userId": "ID-4536",
                        "shellDigitalAccountId": "ID-123",
                        "firstNm": "USER NAME",
                        "lastNm": "USER NAME",
                        "email": "abc123@bacancy.com",
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
                        "email": "abc345@bacancy.com",
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
                ]
            },
            "error": null
        })
    );

export default getUserListHandler;