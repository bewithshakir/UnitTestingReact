import { rest } from "msw";

export const getProductMngList = () => (rest.get('*/api/product-service/products*', (req, res, ctx) => {
    if (req.url.href.includes('products?limit=15')) {
        // Product management Landing
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
                            "productCd": "1",
                            "productNm": "Barun 1 test",
                            "manualPricing": 0,
                            "countryCode": "us",
                            "activeInactiveInd": "Y",
                            "ProductIcon": {
                                "productIconCd": "cdc00914-dbef-4603-89c5-9f18e4af3ccc",
                                "productIconNm": "Parrot Green",
                                "productIconHexCode": "#BED50F",
                                "activeInactiveInd": "Y"
                            },
                            "ProductGroup": {
                                "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                                "productGroupNm": "Fuel",
                                "activeInactiveInd": "Y"
                            }
                        },
                        {
                            "productCd": "2",
                            "productNm": "Premium444 test",
                            "manualPricing": 0,
                            "countryCode": "us",
                            "activeInactiveInd": "N",
                            "ProductIcon": {
                                "productIconCd": "f5f52aa5-9a03-4ea5-8885-d872151b819d",
                                "productIconNm": "Brown",
                                "productIconHexCode": "#743410",
                                "activeInactiveInd": "Y"
                            },
                            "ProductGroup": {
                                "productGroupCd": "acad56a6-1e77-4f38-92e5-30a656e786fb",
                                "productGroupNm": "Fuel",
                                "activeInactiveInd": "Y"
                            }
                        }
                    ]
                }
            })
        );
    }
}));