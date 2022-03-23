import { rest } from "msw";

export const getUsersList = () => {
    return rest.get('*/api/user-service/users?limit=10&offset=0&customerId=c905ebe1-325a-4e27-b44e-d1049848e7a8/*', (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    data: {
                        pagination: {
                            "totalCount": 1,
                            "limit": 15,
                            "offset": 0
                        },
                        dsps: [
                            {
                                "userId": "ID-4536",
                                "shellDigitalAccountId": "ID-123",
                                "firstNm": "USER NAME",
                                "lastNm": "USER NAME",
                                "email": "test@bacancy.com",
                                "phone": null,
                                "customerId": "ID-344-4536",
                                "dspId": "ID-9878-5646",
                                "createdDtm": "2022-03-21T10:41:11.603Z",
                                "userGroup": [
                                    {
                                        "userGroupCd": "4fba4054-fc0d-4d60-88fd-dab70c7611b9",
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
        });
    };
