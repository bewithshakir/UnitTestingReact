import { rest } from "msw";

export const addVehicleAssetHandler = () => {
    return rest.post('*/api/vehicle-service/vehicle-asset', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                    "vehicleAssetId": "ad6cc85c-1709-435f-bfb5-16880c148f32",
                    "activeInactiveInd": "Y",
                    "vehicleColorCd": "23e1c69f-6721-43a0-934c-99e1f659b928",
                    "vehicleTypeCd": "00564273-9d49-46d2-a61d-836e978239f3",
                    "vinNo": "WD4PF1CD1KP147379",
                    "registrationYear": 2005,
                    "makeNm": "Tata",
                    "modelNm": "AL200",
                    "isAsset": "N",
                    "applyValidationRule": "Y",
                    "licencePlate": "123456CD",
                    "updatedDtm": "2022-03-25T14:12:45.073Z",
                    "createdDtm": "2022-03-25T14:12:45.073Z",
                    "assetTypeCd": null,
                    "assetComment": null,
                    "registrationStateNm": null,
                    "assetIdentificationNo": null,
                    "deletedDtm": null
                },
                "error": null
            }));
    });
};
