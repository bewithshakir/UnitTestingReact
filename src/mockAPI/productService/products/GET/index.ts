import { rest } from "msw";
import { getProductByGroup } from "./getProductByGroup";
import { getProductColor } from "./getProductColor";
import { getProductDetails } from "./getProductDetails";
import { getProductName } from "./getProductName";
import { getPropductType } from "./getProductType";

export const getProductHandler = () => {
    return rest.get('*/api/product-service/products*', (req, res, ctx) => {

        const urlHref = req.url.href;
        if (urlHref.includes('product-groups')) {
            // Product Type select
            return getPropductType(res, ctx);
        }
        else if (urlHref.includes('product-icons')) {
            // Product Color select
            return getProductColor(res, ctx);
        }
        else if (urlHref.includes('skipPagination=true')) {
            // Add Fuel Tax > Product Name
            return getProductName(res, ctx);
        }
        else if (urlHref.includes('productGroupCd=')) {
            // Fee Details > useGetLotMasterProductNames
            return getProductByGroup(res, ctx);
        }
        else if (urlHref.includes('editproduct')) {
            // Edit product details
            return getProductDetails(res, ctx);
        }
        else {
            // Product management Landing > Default
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
    });
};
