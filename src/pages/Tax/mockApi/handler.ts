import { rest } from "msw";

export const getFuelTaxList = () => {
    return rest.get('*/api/tax-service/fueltax/list*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 2,
                        "limit": 15,
                        "offset": 0
                    },
                    fuelTax: [
                        {
                            "taxJurisdictionId": "ea4d862f-4284-4053-98a6-42fcac879447",
                            "cityName": "Anchorage",
                            "countryName": "us",
                            "stateName": "AL",
                            "productsCount": 1
                        },
                        {
                            "taxJurisdictionId": "564693bb-ddf0-433d-bcdd-9b161a10ef99",
                            "cityName": "Chicago",
                            "countryName": "us",
                            "stateName": "IL",
                            "productsCount": 1
                        }
                    ]
                },
                error: null,
            })
        );
    });
};

export const getFuelTaxProductsList = () => {
    return rest.get('*/api/tax-service/fueltax/list/products?countryCode=us&limit=15&offset=0&taxJurisdictionId=99zz', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 2,
                        "limit": 15,
                        "offset": 0
                    },
                    products: [
                        {
                            "currencyCd": "USD",
                            "productCd": "96c0b449-a2db-494e-947c-7be433c8ab45",
                            "productGroupCd": "0b938129-4589-4d97-9932-c8d522c59eab",
                            "startDate": "11/06/2021",
                            "endDate": "01/31/2023",
                            "productNm": "Premium",
                            "miscInspFuelTax": 3,
                            "ppdSalesTax": 5.101,
                            "cityFuelTax": 6.034,
                            "stateFuelTax": 21.345,
                            "salesFuelRate": 5.245,
                            "countyFuelTax": 1.56,
                            "fedFuelTax": 11.499,
                            "miscLoadFuelTax": 3.106,
                            "revenueFuelRate": 23.44,
                            "miscLocalFuelTax": 4
                        },
                        {
                            "currencyCd": "USD",
                            "productCd": "7215bc37-c9a5-468c-92c0-5d825e52daba",
                            "productGroupCd": "0b938129-4589-4d97-9932-c8d522c59eab",
                            "startDate": "11/06/2021",
                            "endDate": "12/31/2023",
                            "productNm": "Diesel",
                            "ppdSalesTax": 5.101,
                            "miscLocalFuelTax": 4,
                            "fedFuelTax": 13.499,
                            "miscLoadFuelTax": 3.106,
                            "stateFuelTax": 20,
                            "countyFuelTax": 1.56,
                            "cityFuelTax": 1.034,
                            "revenueFuelRate": 23.44,
                            "salesFuelRate": 1.2,
                            "miscInspFuelTax": 3
                        }
                    ]
                },
                error: null,
            })
        );
    });
};