import { rest } from "msw";

export const FetchFormattedAddressHandler = () => {
    return rest.get('*/api/customer-service/address/place-detail*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    address1: "Elkton Test",
                    address2: "",
                    city: "Elkton",
                    country: "United States",
                    state: "VA",
                    state_detail: "Virginia",
                    zip: "22827"
                },
                error: null
            })
        );
    });
};

export const FetchGoogleAddressHandler = () => {
    return rest.get('*/api/customer-service/address/auto-complete*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    predictions: [
                        {
                            "description": "Elkton Test",
                            "matched_substrings": [
                                {
                                    "length": 1,
                                    "offset": 0
                                }
                            ],
                            "place_id": "123",
                            "reference": "123",
                            "structured_formatting": {
                                "main_text": "Elkton",
                                "main_text_matched_substrings": [
                                    {
                                        "length": 1,
                                        "offset": 0
                                    }
                                ],
                                "secondary_text": "VA, USA"
                            },
                            "terms": [
                                {
                                    "offset": 0,
                                    "value": "Elkton"
                                },
                                {
                                    "offset": 8,
                                    "value": "VA"
                                },
                                {
                                    "offset": 12,
                                    "value": "USA"
                                }
                            ],
                            "types": [
                                "locality",
                                "political",
                                "geocode"
                            ]
                        }
                    ],
                    status: "OK"
                },
                error: null
            })
        );
    });
};