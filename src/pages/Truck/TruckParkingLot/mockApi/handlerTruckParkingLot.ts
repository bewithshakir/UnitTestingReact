import { rest } from "msw";

export const getTruckParkingLotList = () => {
    return rest.get('*/api/truck-service/parking-locations*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 18,
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
    });
};