import { rest } from "msw";

export const getAllLotFilterOptions = () => {
    return rest.get('*/api/customer-service/lots/filter-options', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                    "cities": [
                        "Abilene", "Amissville", "Arlington", "Ashburn", "Baltimore", "Bengaluru", "Boligee",
                        "calton", "Castleton", "Charlottesville", "Columbia", "Culpeper", "Elkton",
                        "Fairfax", "Flint Hill", "Fredericksburg", "Herndon", "Houston", "Leesburg",
                        "Markham", "Mumbai", "New Carrollton", "New York", "Portland",
                        "Rajkot", "Reston", "Richmond", "Saratoga", "Sperryville", "Stanley", "Toronto",
                        "Valley Stream", "Vienna", "Washington", "Woodville"
                    ],
                    "states": [
                        "AL", "CA", "DC", "GJ", "KA", "MD", "MH", "MS", "NY", "ON", "OR", "RJ", "Scotland", "TX", "VA"
                    ],
                    "zipcode": [
                        "10007", "11581", "123455", "20001abc", "20005", "20008", "20106", "20147",
                        "20171", "20176", "20191", "2074511", "20784", "21045", "21227", "22030",
                        "22182", "22202", "22408", "22627", "22643", "22701", "22716", "22740",
                        "22740aS", "22747", "22749", "22827", "22851", "22903", "23234", "304803",
                        "35443", "360311", "38851", "560099", "77001", "77007", "77096", "79601",
                        "95070", "97035", "EH7 5AA", "M4H 1C3"
                    ],
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
                    }, {
                        "productCd": "1fca4cbb-e592-4073-96d8-0e3e83fd48b4",
                        "productNm": "Premium444"
                    }, {
                        "productCd": "21f72366-d691-4a5e-b6b7-44089d699f5a",
                        "productNm": "Prod one "
                    }, {
                        "productCd": "237694f3-6128-4d6d-80b7-1c147863f7c7",
                        "productNm": "07th Feb 2022_Premium Petrol_Fuel"
                    }, {
                        "productCd": "246745df-7a58-4102-b445-8a184b709ba0",
                        "productNm": "Test Fuel"
                    }, {
                        "productCd": "3384bfc4-3c54-45d1-928e-6ba8f584fc3d",
                        "productNm": "Test product 2"
                    }, {
                        "productCd": "59606111-3a3c-4315-b091-09568ac2c107",
                        "productNm": "Reg Plus"
                    }, {
                        "productCd": "653efd6d-292e-45f0-9800-b8f69bfead10",
                        "productNm": "Prod name1"
                    }, {
                        "productCd": "684c58ab-d23c-4591-b9fd-41296c7a394e",
                        "productNm": "A Diesel "
                    }, {
                        "productCd": "691db3cb-e4bb-4807-8d23-7498e4b0c547",
                        "productNm": "B"
                    }, {
                        "productCd": "6de43056-8eec-4850-b4ac-fbbefb140e07",
                        "productNm": "A"
                    }, {
                        "productCd": "7d2040b5-0b26-49b9-87bf-5b79ca52adc0",
                        "productNm": "Regular-Ethanol "
                    }, {
                        "productCd": "8d1a2b7b-b911-46b1-9735-aa19890697c3",
                        "productNm": "Non fuel1"
                    }, {
                        "productCd": "8ee38e73-f9dd-40ca-a53c-49327eab1487",
                        "productNm": "Regular1"
                    }, {
                        "productCd": "937e2f16-017e-4f36-84a5-907c0d5729d0",
                        "productNm": "Test4"
                    }, {
                        "productCd": "9986b9d3-fe75-45a4-b131-9e7e4f1ecfc9",
                        "productNm": "Test Data Model 1"
                    }, {
                        "productCd": "9fa85e21-fab8-48d2-af36-85c7686e7666",
                        "productNm": "1 Purple Product"
                    }, {
                        "productCd": "a19d5cf0-4741-4bb9-b2ce-a57a72a3d2ca",
                        "productNm": "DEF"
                    }, {
                        "productCd": "cb6e24ef-2e16-463e-bbf4-209c3ed035e9",
                        "productNm": "testqa123456"
                    }, {
                        "productCd": "e2673d65-6046-4fa3-8dd6-2224b4c910be",
                        "productNm": "nik new products"
                    }, {
                        "productCd": "f8d3eff8-3045-45a1-b052-a3ee0fb5961a",
                        "productNm": "regular o"
                    }, {
                        "productCd": "fe29b0ed-1380-4992-9734-ce71ffe76aa6",
                        "productNm": "Winter Dye Diesel"
                    }]
                },
                "error": null
            }
            )
        );
    });
};