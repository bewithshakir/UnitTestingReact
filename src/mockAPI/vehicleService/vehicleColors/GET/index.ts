import { rest } from "msw";
export const getVehicleColorsHandler = () => {
    return rest.get('*/api/vehicle-service/vehicle-colors', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json(
                {
                    "data":
                        [
                            {
                                vehicleColorCd: "23e1c69f-6721-43a0-934c-99e1f659b928",
                                vehicleColorNm: "Green", vehicleColorHexCode: "#008000", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "2946ee8d-d4a5-486e-ac67-2c4f70854276",
                                vehicleColorNm: "Red", vehicleColorHexCode: "#FF0000", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "2e0d349c-a41f-4ff2-8919-21e357c024a5",
                                vehicleColorNm: "Silver", vehicleColorHexCode: "#C0C0C0", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "5eb885ea-ac23-4dc0-826e-703ebed205bc",
                                vehicleColorNm: "Gray", vehicleColorHexCode: "#808080", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "661a2251-3097-4676-a052-f75f59c67cc2",
                                vehicleColorNm: "Blue", vehicleColorHexCode: "#0000FF", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "9255aa98-1c3a-411c-9661-7d045acdacb9",
                                vehicleColorNm: "Beige", vehicleColorHexCode: "#F5F5DC", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "a0df47a4-0bac-4ab9-80b3-b0cc5886bffb",
                                vehicleColorNm: "Black", vehicleColorHexCode: "#000000", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "b5ec4959-8ef5-4b3f-a307-c664e05efc50",
                                vehicleColorNm: "White", vehicleColorHexCode: "#FFFFFF", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "e54be843-05d2-4ad7-b709-077506fe1910",
                                vehicleColorNm: "Brown", vehicleColorHexCode: "#A52A2A", activeInactiveInd: "Y"
                            },
                            {
                                vehicleColorCd: "fb9e9518-5c8b-4851-8cb9-f215848f43bb",
                                vehicleColorNm: "Orange", vehicleColorHexCode: "#FFA500", activeInactiveInd: "Y"
                            }
                        ],
                    "error": null
                }
            )
        );
    });
};
