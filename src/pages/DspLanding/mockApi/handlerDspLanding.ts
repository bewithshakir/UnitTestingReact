import { rest } from "msw";

export const getDspList = () => {
    return rest.get('*/api/customer-service/customers/111edit/dsps*', (req, res, ctx) => {

        const search = req.url.searchParams.get('search');
        const limit = req.url.searchParams.get('limit');
        
        if (limit && search) {
            // DSP Search
            return res(
                ctx.status(200),
                ctx.json({
                    data: {
                        pagination: {
                            "totalCount": search?.trim() && search !== "Test DSP" ? 0 : 1,
                            "limit": 15,
                            "offset": 0
                        },
                        dsps:
                            search !== "Test DSP" ? []
                                : [
                                    {
                                        address: "12343 Bonfire Dr,  Bonfire Dr,   Bonfire Dr",
                                        city: "Reisterstown",
                                        contactName: "Test Contact",
                                        customerId: "test-customer-id",
                                        email: "d.s.h.j.s@h.dc.com",
                                        id: "3a14f46b-0c85-441a-a532-4e068b3b6f3e",
                                        lots: [],
                                        name: "Test DSP",
                                        postalCode: "21136",
                                        state: "Test State",
                                        totalLotAssigned: 0,
                                    }
                                ]
                    }
                })
            );
        }

        if (req.url.href.includes('&city')) {
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
                                "id": "11",
                                "name": "DSP city search",
                                "contactName": "DSP2",
                                "customerId": "12",
                                "email": "DSP@gmmail.com",
                                "address": "Dulles International Airport,  Saarinen Cir,   Saarinen Cir",
                                "city": "Dulles",
                                "state": "VA",
                                "postalCode": "20166",
                                "totalLotAssigned": 0,
                                "lots": []
                            }
                        ]
                    }
                })
            );
        }
        if (req.params[1]) {
            // Edit DSP form
            return res(
                ctx.status(200),
                ctx.json({
                    data: {
                        "dspId": "111",
                        "dspName": "dsp updated1 test",
                        "customerId": "222",
                        "contactName": "steve",
                        "contactEmailId": "newcustomer@gmail.com",
                        "contactPhoneNumber": "8939785301",
                        "createdDtm": "2022-01-27T09:03:55.931Z",
                        "lastUpdatedDtm": "2022-01-27T17:51:29.712Z",
                        "deletedDtm": null,
                        "addressLine1": "Houston Court",
                        "addressLine2": "Houston Ct",
                        "cityNm": "Saratoga",
                        "stateNm": "CA",
                        "postalCd": "95070",
                        "activeInactiveInd": "Y"
                    },
                    error: null
                })
            );
        }
        else {
            // DSP Landing
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
                                "id": "123",
                                "name": "DSP Test",
                                "contactName": "DSP2",
                                "customerId": "11",
                                "email": "DSP@gmmail.com",
                                "address": "Dulles International Airport,  Saarinen Cir,   Saarinen Cir",
                                "city": "Dulles",
                                "state": "VA",
                                "postalCode": "20166",
                                "totalLotAssigned": 0,
                                "lots": []
                            }
                        ]
                    }
                })
            );
        }
        
    });
};