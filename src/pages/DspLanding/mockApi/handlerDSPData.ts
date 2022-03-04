import { rest } from "msw";

export const getDspDataHandler = () => {
    return rest.get('*/api/customer-service/customers/*/dsps*', (req, res, ctx) => {
        const search = req.url.searchParams.get('search');
        const limit = req.url.searchParams.get('limit');
        return (search?.trim()) ?
            search === "Test DSP" ?
                res(
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
                ) :
                res(
                    ctx.status(200),
                    ctx.json({
                        data: {
                            pagination: {
                                "totalCount": 0,
                                "limit": 15,
                                "offset": 0
                            },
                            dsps: []
                        }
                    })
                )
            :
            limit ?
                res(
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
                ) :
                res(
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
    });
};