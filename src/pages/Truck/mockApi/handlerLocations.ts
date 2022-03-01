import { rest } from "msw";

export const getLocationsList = () => {
    return rest.get('*/api/truck-service/delivery-vehicles/*/parking-locations*', (req, res, ctx) => {
        if (req.params[1] === '456') {
            return res(
                ctx.status(200),
                ctx.json({
                    data: {
                        pagination: {
                            "totalCount": 1,
                            "limit": 15,
                            "offset": 0
                        },
                        "parkingLocations": [
                            {
                                "id": "24828c6f-7b00-4566-baf6-b9c18bc1da03",
                                "name": "HCM_22nd_Truck_Parking_Lot_Name",
                                "address": "MGM Casino, National Harbor, MGM Casino,  MGM Casino",
                                "city": "Fort Washington",
                                "state": "MD",
                                "postalCode": "20745"
                            }
                        ]
                    }
                })
            );
        }
    });
};