import { rest } from "msw";

export const getUsersList = () => {
    return rest.get('*/api/user-service/users?/*', (req, res, ctx) => {
           const urlHref = req.url.href;
           if (urlHref.includes('limit=10&offset=0&customerId=')) {
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
                        users: [
                                {
                                    "userId": "82425cea-9ccb-4be0-ac09-7c642bcd5487",
                                    "shellDigitalAccountId": "9924af50-dc13-4ece-9d78-5069a1bef811",
                                    "firstNm": "Nikhil",
                                    "lastNm": "Patel",
                                    "email": "nikhil.patel@bacancy.com",
                                    "phone": null,
                                    "customerId": "c905ebe1-325a-4e27-b44e-d1049848e7a8",
                                    "dspId": "cb1ba4e1-b613-4e27-9c97-5a193cc66e44",
                                    "createdDtm": "2022-03-21T10:41:11.603Z",
                                    "userGroup": [
                                        {
                                            "userGroupCd": "4fba4054-fc0d-4d60-88fd-dab70c7611b9",
                                            "userGroupNm": "DSP"
                                        }
                                    ]
                                },
                                {
                                    "userId": "9fa6214e-17aa-414a-a808-1712f26d8c5a",
                                    "shellDigitalAccountId": "9924af50-dc13-4ece-9d78-5069a1bef812",
                                    "firstNm": "Nikhil",
                                    "lastNm": "Patel",
                                    "email": "nikhil.patel@bacancy.com",
                                    "phone": null,
                                    "customerId": "55410dea-846f-4a56-8248-02377c222595",
                                    "dspId": null,
                                    "createdDtm": "2022-03-22T12:27:42.356Z",
                                    "userGroup": [
                                        {
                                            "userGroupCd": "0b7d6559-6cd3-4d82-beb4-bdb011cd5585",
                                            "userGroupNm": "Customer"
                                        }
                                    ]
                                },
                                {
                                    "userId": "ef075c4e-083a-4983-bd32-eee9e4764c48",
                                    "shellDigitalAccountId": "84e09318-0a1f-4790-83d6-e1da593a734e",
                                    "firstNm": "Himanshu",
                                    "lastNm": "Mehta",
                                    "email": "himanshumehta00786@gmail.com",
                                    "phone": null,
                                    "customerId": "fdd19f8e-7862-4875-9b11-73d022a6e025",
                                    "dspId": "0d075dcd-d440-4a90-a91b-b8afe0a41977",
                                    "createdDtm": "2022-03-17T10:17:27.969Z",
                                    "userGroup": [
                                        {
                                            "userGroupCd": "4fba4054-fc0d-4d60-88fd-dab70c7611b9",
                                            "userGroupNm": "DSP"
                                        }
                                    ]
                                }
                            ]
                        },
                        "error": null
                   })
               );
           }
        });
    };
