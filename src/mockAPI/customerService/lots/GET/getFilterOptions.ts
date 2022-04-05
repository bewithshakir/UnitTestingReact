import { DefaultRequestBody, ResponseComposition, RestContext } from "msw";

export const getAllLotFilterOptions = (res: ResponseComposition<DefaultRequestBody>, ctx: RestContext) => {
    return res(
        ctx.status(200),
        ctx.json({
            "data": {
                "cities": [
                    "Abilene", "Amissville", "Arlington", "Ashburn",],
                "states": [
                    "AL", "CA", "DC", "GJ", "KA", "MD", "MH", "MS", "NY", "ON", "OR", "RJ", "Scotland", "TX", "VA"
                ],
                "zipcode": ["10007", "11581", "123455", "20001abc", "20005"],
                "walletStatus": [
                    "Active", "Attention", "Expire"
                ],
                "fuelType": [{
                    "productCd": "070e690f-f446-4d6f-85a2-e0e0fb232769",
                    "productNm": "NewDieselproduct345678"
                }, {
                    "productCd": "08753a43-6544-4b87-b103-d4adafaad178",
                    "productNm": "Test Data Model"
                }, {
                    "productCd": "0dd5f587-8c6f-40ce-9f77-1616f4b5b842",
                    "productNm": "Barun 1"
                }, {
                    "productCd": "13fcd51e-4183-4999-91ec-c7e16b6b20fa",
                    "productNm": "Test product 2"
                }, {
                    "productCd": "15a7d749-f8c7-49b4-90f4-8ffe2ff93a21",
                    "productNm": "Red Dye Diesel"
                }]
            },
            "error": null
        })
    );
};