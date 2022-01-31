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

