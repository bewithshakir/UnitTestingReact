import { DefaultRequestBody, PathParams, ResponseComposition, RestContext, RestRequest } from "msw";

const getUserListHandler = (req: RestRequest<never, PathParams>, res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {

    const customerId = req.url.searchParams.get('customerId');
    const sortBy = req.url.searchParams.get('sortBy');
    const search = req.url.searchParams.get('search');
    if (search?.trim()) {
        if(search !== "Users Data") {
          return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 1,
                        "limit": 10,
                        "offset": 0
                    },
                    users: [
                        {
                            "userId": "ID-09890",
                            "shellDigitalAccountId": "ID-Data123",
                            "firstNm": "USER First Name Search",
                            "lastNm": "USER Last Name Search",
                            "email": "search@shell.com",
                            "phone": null,
                            "customerId": "ID-XYZ-4536",
                            "dspId": "ID-XYZ-5600",
                            "createdDtm": "2022-03-21T10:41:11.603Z",
                            "userGroup": [
                                {
                                    "userGroupCd": "4fva423054-fc0d-4d60-88fd-dab70c7611b9",
                                    "userGroupNm": "DSP Search User"
                                }
                            ],
                            "fullName": 'Search User'
                        }
                    ]
                }
            })
          )
        } else {
          return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 1,
                        "limit": 10,
                        "offset": 0
                    },
                    users: []
                }
            })
          )
        }
    } else {   
    return res(
        ctx.status(200),
        ctx.json({
            data: {
                "pagination": {
                    "totalCount": 2,
                    "limit": 10,
                    "offset": 0
                },
                users: !customerId && sortBy ? [
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
                ] : 
                customerId && sortBy === "firstNm"?[
                    {
                        "userId": "ID-45362",
                        "shellDigitalAccountId": "ID-1233",
                        "firstNm": "12344USER NAME",
                        "lastNm": "434764837USER NAME",
                        "email": "dsp@shell.com",
                        "phone": null,
                        "customerId": "ID-34124-4536",
                        "dspId": "ID-98781-5600",
                        "createdDtm": "2022-11-21T10:41:11.603Z",
                        "userGroup": [
                            {
                                "userGroupCd": "4fba42335654-fc0d-4d60-88fd-dab70c7611b9",
                                "userGroupNm": "DSP"
                            }
                        ],
                        "fullName": 'test username'
                    },
                    {
                        "userId": "ID-453644",
                        "shellDigitalAccountId": "ID-12344",
                        "firstNm": "4386483USER NAME",
                        "lastNm": "424782USER NAME",
                        "email": "dsp1@bacancy.com",
                        "phone": null,
                        "customerId": "ID-344456-4536",
                        "dspId": "ID-9878-5646",
                        "createdDtm": "2022-12-21T10:41:11.603Z",
                        "userGroup": [
                            {
                                "userGroupCd": "4fba140674-fc0d-4d60-88fd-dab70c7611b9",
                                "userGroupNm": "DSP"
                            }
                        ],
                        "fullName": 'test user'
                    }
                ]:[
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
}

export default getUserListHandler;