import { rest } from "msw";

export const getOPISCitiesHandler = () => {
    return rest.get('*/api/product-service/opis/served-cities*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    pagination: {
                        "totalCount": 2,
                        "limit": 15,
                        "offset": 0
                    },
                    opisCities: [
                        {
                            "city": "Los Angeles",
                            "cityId": 102,
                            "countryCd": "us",
                            "opisServedCityId": "943846a8-3cde-4d4a-b091-64108f687025",
                            "state": "CA",
                        },
                        {
                            "city": "Portland",
                            "cityId": 112,
                            "countryCd": "us",
                            "opisServedCityId": "19d21c52-7c89-4e81-97dc-6822e713175e",
                            "state": "ME",
                        }
                    ]
                }
            })
        );
    });
};