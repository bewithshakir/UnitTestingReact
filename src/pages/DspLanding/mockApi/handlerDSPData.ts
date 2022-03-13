import { rest } from "msw";

export const getDspDataHandler = () => {
    return rest.get('*/api/customer-service/customers/*/dsps*', (req, res, ctx) => {
        console.log('req--', req.url.pathname)
        const search = req.url.searchParams.get('search');
        const limit = req.url.searchParams.get('limit');
        return res(
            ctx.status(200),
            ctx.json(
                limit ?
                    {
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
                    }
                    :
                    {
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
                        }
                    }
            )
        );
    });
};
