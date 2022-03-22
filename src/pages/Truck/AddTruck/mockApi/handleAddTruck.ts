import { rest } from "msw";

export const addTruckColorHandler = () => {
    return rest.get('*api/truck-service/colors*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "colorCd": "12",
                        "colorNm": "Red",
                    },
                    {
                        "colorCd": "13",
                        "colorNm": "Green",
                    }
                ]
            })
        );
    });
};


export const addEditTruckHandler = () => {
    return rest.put('*/api/truck-service/delivery-vehicles/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                    "deliveryVehicleId": "642d894c-0ea1-4423-9fde-3cde5c946744",
                    "colorCd": "054f0dbc-189a-473d-8554-8415b28a6045",
                    "activeInactiveInd": "Y",
                    "deliveryVehicleNm": "HCM_Truck12345500",
                    "makeAndModelNm": "HCM_MAKE672",
                    "vinNo": "HCM_VIN672",
                    "registrationYr": 2022,
                    "registrationStateNm": "us",
                    "licenceNo": "113456789",
                    "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
                    "createdDtm": "2022-02-21T11:24:15.402Z",
                    "lastUpdatedDtm": "2022-02-23T11:58:54.073Z",
                    "deletedDtm": null,
                    "deliveryVehicleTanks": [
                        {
                            "deliveryVehicleTankId": "1a965c1b-9bc9-4c56-bc2e-1868c9c85522",
                            "tcsRegisterId": 1234567890,
                            "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
                            "minCapacityVol": 1,
                            "maxCapacityVol": 25,
                            "deliveryVehicleId": "642d894c-0ea1-4423-9fde-3cde5c946744",
                            "createdDtm": "2022-02-23T11:58:54.114Z",
                            "lastUpdatedDtm": "2022-02-23T11:58:54.114Z",
                            "deletedDtm": null
                        }
                    ],
                    "parkingLocations": [
                        "24828c6f-7b00-4566-baf6-b9c18bc1da03"
                    ]
                },
                "error": null
            })
        );
    });
};


export const useGetEditTruckDetails = () => {
    return rest.get('*/api/truck-service/delivery-vehicles*', (req, res, ctx) => {
        if (req.params[1] === '/999') {
            return res(
                ctx.status(200),
                ctx.json({
                    "data": {
                        "deliveryVehicleId": "999",
                        "colorCd": "054f0dbc-189a-473d-8554-8415b28a6045",
                        "activeInactiveInd": "Y",
                        "deliveryVehicleNm": "HCM_Truck12345500",
                        "makeAndModelNm": "HCM_MAKE672",
                        "vinNo": "HCM_VIN672",
                        "registrationYr": 2022,
                        "registrationStateNm": "us",
                        "licenceNo": "113456789",
                        "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
                        "productNm": "Regular",
                        "createdDtm": "2022-02-21T11:24:15.402Z",
                        "lastUpdatedDtm": "2022-02-23T11:58:54.073Z",
                        "deletedDtm": null,
                        "parkingLocations": [
                            {
                                "parkingLocationId": "24828c6f-7b00-4566-baf6-b9c18bc1da03",
                                "parkingLocationNm": "HCM_22nd_Truck_Parking_Lot_Name",
                                "activeInactiveInd": "Y",
                                "addressLine1": "MGM Casino, National Harbor, MGM Casino,",
                                "addressLine2": " MGM Casino",
                                "cityNm": "Fort Washington",
                                "stateNm": "MD",
                                "postalCd": "20745",
                                "productNm": "Premium444",
                                "countryCd": "us",
                                "createdDtm": "2022-02-21T09:25:04.284Z",
                                "lastUpdatedDtm": "2022-02-21T09:25:04.284Z",
                                "deletedDtm": null
                            }
                        ],
                        "deliveryVehicleTanks": [
                            {
                                "deliveryVehicleTankId": "1a965c1b-9bc9-4c56-bc2e-1868c9c85522",
                                "deliveryVehicleId": "999",
                                "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
                                "tcsRegisterId": 1234567890,
                                "minCapacityVol": 1,
                                "maxCapacityVol": 25,
                                "createdDtm": "2022-02-23T11:58:54.114Z",
                                "lastUpdatedDtm": "2022-02-23T11:58:54.114Z",
                                "deletedDtm": null
                            }
                        ]
                    },
                    "error": null
                })
            );
        }
    });
};