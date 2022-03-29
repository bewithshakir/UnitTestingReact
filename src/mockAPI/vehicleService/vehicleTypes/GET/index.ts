import { rest } from "msw";

export const getVehicleTypeHandler = () => {
    return rest.get('*/api/vehicle-service/vehicle-types', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": [
                    {
                        "vehicleTypeCd": "00564273-9d49-46d2-a61d-836e978239f3",
                        "vehicleTypeNm": "Medium",
                        "activeInactiveInd": "Y"
                    },
                    {
                        "vehicleTypeCd": "0b9355a3-78dc-4fdb-b09d-ecac2acf97e2",
                        "vehicleTypeNm": "Small",
                        "activeInactiveInd": "Y"
                    },
                    {
                        "vehicleTypeCd": "621a5759-5ee7-4794-8e30-9f889b93e15e",
                        "vehicleTypeNm": "Large",
                        "activeInactiveInd": "Y"
                    }
                ],
                "error": null
            })
        );
    });
};
