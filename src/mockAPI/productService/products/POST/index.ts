import { rest } from "msw";

export const postProductHandler = () => {
    return rest.post('*/api/product-service/products', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {
                    "productId": "12345",
                    "productGroupCd": "1",
                    "productClassCd": "2",
                    "countryCd": "us",
                    "productCd": "3",
                    "saleableProductNm": "test Premium",
                    "productServiceInd": "Y",
                    "colorCd": "22",
                    "manualPricing": 0,
                    "supplierCd": null,
                    "opisProductKey": null,
                    "octaneLvl": null
                }
            })
        );
    });
}