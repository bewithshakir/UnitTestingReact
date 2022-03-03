import { rest } from "msw";

export const getDSPList = () => {
    return rest.get('*/api/customer-service/customers/*/dsps*', (req, res, ctx) => {
        const search = req.url.searchParams.get('search');
        const params = req.params;
        if (search?.trim()) {
            return search === "Test DSP" ?
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
                );
        } else {
            if (params[2] !== '/222') {
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
        }
    });
};