  import { rest } from "msw";

export const addVehicleRule = () => {
    return rest.post('*/api/vehicle-service/vehicle-rules', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
              "data": {
                "customerVehicleRuleId": "3a60939b-79e0-43ba-919f-9e3361eb47f9",
                "cityNm": "Culpeper",
                "stateNm": "VA",
                "countryCd": "us",
                "yearNo": 2010,
                "activeInactiveInd": "Y",
                "updatedDtm": "2022-03-28T18:05:52.878Z",
                "createdDtm": "2022-03-28T18:05:52.878Z",
                "deletedDtm": null
              },
              "error": null
            })
        );
    });
}