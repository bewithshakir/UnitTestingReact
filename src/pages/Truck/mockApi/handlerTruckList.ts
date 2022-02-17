import { rest } from "msw";

export const getTrucksList = () => {
    return rest.get('*/api/truck-service/delivery-vehicles*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 1,
                        "limit": 15,
                        "offset": 0
                    },
                    "deliveryVehicles": [
                        {
                            "deliveryVehicleId": "3aeeadc7-15f5-486f-bfdb-1d8ffa027800",
                            "color": {
                                "colorCd": "d98708ba-2344-4a34-b924-7015d695a59d",
                                "colorNm": "red"
                            },
                            "activeInactiveInd": "Y",
                            "deliveryVehicleNm": "T2",
                            "makeAndModelNm": "MG",
                            "vinNo": "7766",
                            "registrationYr": 2008,
                            "registrationStateNm": "us",
                            "licenceNo": "12LIC",
                            "productCd": "684c58ab-d23c-4591-b9fd-41296c7a394e",
                            "createdDtm": "2022-02-16T02:23:50.427Z",
                            "tankCount": 1,
                            "parkingLocationCount": 1,
                            "drivers": "John",
                            "orderCount": 1
                        },
                    ]
                }
            })
        );
    });
};