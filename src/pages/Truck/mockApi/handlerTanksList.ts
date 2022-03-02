import { rest } from "msw";

export const getTanksList = () => {
    return rest.get('*/api/truck-service/delivery-vehicles/*/tanks*', (req, res, ctx) => {
        if (req.params[1] === '666') {
            return res(
                ctx.status(200),
                ctx.json({
                    data: {
                        pagination: {
                            "totalCount": 1,
                            "limit": 15,
                            "offset": 0
                        },
                        "tanks": [
                            {
                                "deliveryVehicleId": "666",
                                "deliveryVehicleTankId": "82e375a7-3509-46c2-b1bf-abef2cfcc379",
                                "tcsRegisterId": 123456789,
                                "maxCapacityVol": 10,
                                "minCapacityVol": 1,
                                "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
                                "createdDtm": "2022-02-21T12:27:17.080Z",
                                "productNm": "Premium444",
                                "productIcon": {
                                    "productIconCd": "3b02ae9f-17e4-4563-a258-ea8dc996ce32",
                                    "productIconNm": "Purple",
                                    "productIconHexCode": "#641964",
                                    "activeInactiveInd": "Y"
                                },
                                "lastRefuelVolume": 23.5,
                                "lastRefuelDatetime": "Today at 3:30pm",
                                "currentWetstock": 2232,
                                "lastTransactionDatetime": "Today at 3:30pm",
                                "volumeDispensed": 2322,
                                "billNumber": 2323
                            },
                        ]
                    }
                })
            );
        }
    });
};