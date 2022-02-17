import { rest } from "msw";

export const addTruckColorHandler = () => {
    return rest.get('*api/truck-service/colors*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "colorCd": "12",
                        "colorNm": "Red",
                    },
                    {
                        "colorCd": "13",
                        "colorNm": "Green",
                    }
                ]
            })
        );
    });
};


export const addTruckFuelHandler = () => {
    return rest.get('*/api/product-service/products/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "productCd": "123",
                        "productNm": "Diesel",
                        "activeInactiveInd": "Y"
                    },
                    {
                        "productCd": "124",
                        "productNm": "WhiteDiesel",
                        "activeInactiveInd": "Y"
                    }
                ]
            })
        );
    });
};
