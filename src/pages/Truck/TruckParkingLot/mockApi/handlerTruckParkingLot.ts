import { rest } from "msw";

export const getTruckParkingLotList = () => {
    return rest.get('*/api/truck-service/parking-locations*', (req, res, ctx) => {
        const search = req.url.searchParams.get('search');
        if (search?.trim()) {
            return search === "UTC Truck Lot" ?
                res(
                    ctx.status(200),
                    ctx.json({
                        data: {
                            pagination: {
                                "totalCount": 1,
                                "limit": 15,
                                "offset": 0
                            },
                            parkingLocations: [
                                {
                                    "id": "111",
                                    "name": "UTC Truck Lot",
                                    "address": "Address 1   Address 2",
                                    "city": "Test55",
                                    "state": "Test66",
                                    "postalCode": "778899"
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
                            parkingLocations: []
                        }
                    })
                );
        } else {
            return res(
                ctx.status(200),
                ctx.json({
                    data: {
                        pagination: {
                            "totalCount": 1,
                            "limit": 15,
                            "offset": 0
                        },
                        parkingLocations: [
                            {
                                "id": "123",
                                "name": "Testing1",
                                "address": "Address 1   Address 2",
                                "city": "Test53",
                                "state": "Test6",
                                "postalCode": "788003"
                            }
                        ]
                    }
                })
            );
        }
    });
};