import { rest } from "msw";

export const addTruckParkingLotHandler = () => {
    return rest.post('*/api/truck-service/parking-locations', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "parkingLocationId": "7f7e8728-eac5-453c-98f2-91224b63aef5",
                    "parkingLocationNm": "Packing Location 17",
                    "addressLine1": "Address 1  ",
                    "addressLine2": "Address 2",
                    "cityNm": "Silchar",
                    "stateNm": "Assam",
                    "postalCd": "524345",
                    "activeInactiveInd": "Y",
                    "countryCd": "us",
                    "lastUpdatedDtm": "2022-02-02T12:13:31.995Z",
                    "createdDtm": "2022-02-02T12:13:31.995Z",
                    "deletedDtm": null
                },
                "error": null
            })
        );
    });
};

