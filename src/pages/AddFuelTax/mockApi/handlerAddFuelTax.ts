import { rest } from "msw";

export const getProductTypesDropdownHandler = () => {
    return rest.get('*/api/product-service/products*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: [
                    {
                        "productCd": "123",
                        "productNm": "Diesel",
                        "activeInactiveInd": "Y",
                    },
                    {
                        "productCd": "456",
                        "productNm": "Regular",
                        "activeInactiveInd": "Y",
                    }
                ],
                error: null
            })
        );
    });
};
