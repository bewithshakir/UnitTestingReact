import { rest } from "msw";

export const addVehicleRule = () => {
    return rest.post('*/api/vehicle-service/vehicle-rules', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                  "customerVehicleRuleId": "a1ec9c53-8368-4863-8853-88e9573a0542",
                  "cityNm": "Wernersville",
                  "stateNm": "PA",
                  "countryCd": "us",
                  "yearNo": 2001,
                  "activeInactiveInd": "Y",
                  "updatedDtm": "2022-03-28T09:54:40.888Z",
                  "createdDtm": "2022-03-28T09:54:40.888Z",
                  "deletedDtm": null
                },
                "error": null
              })
        );
    });
}