import { rest } from "msw";

export const rightInfoFilterHandler = () => {
    return rest.get('*/*/filter-options', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "cities": [
                        "Dulles test",
                        "Elkton test"
                    ],
                    "states": [
                        "VA test"
                    ],
                    "zipCodes": [
                        "20166",
                        "22827"
                    ]
                },
                error: null
            })
        );
    });
};
