import { rest } from "msw";

export const editVehicleRule = () => {
    return rest.put('*/api/vehicle-service/vehicle-rules/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                  "customerVehicleRuleId": "aa87757d-8e84-485c-a324-6e4b7e83a84e",
                  "cityNm": "Culpeper",
                  "stateNm": "VA",
                  "countryCd": "us",
                  "yearNo": 2007,
                  "activeInactiveInd": "Y",
                  "createdDtm": "2022-03-28T19:56:55.102Z",
                  "updatedDtm": "2022-03-29T09:45:23.859Z",
                  "deletedDtm": null
                },
                "error": null
              })
        );
    });
};