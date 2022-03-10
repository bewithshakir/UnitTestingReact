import { rest } from "msw";

export const putProductHandler = () => {
    return rest.put('*/api/product-service/products/*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    colorCd: "11",
                    countryCd: "us",
                    manualPricing: 0,
                    productCd: "22",
                    productClassCd: "33",
                    productGroupCd: "44",
                    productId: "55",
                    productServiceInd: "Y",
                    saleableProductNm: "Test45"
                }
            })
        );
    });
};