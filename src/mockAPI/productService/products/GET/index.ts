import { rest } from "msw";
import { getDefaultProducts } from "./getDefaultProducts";
import { getProductByGroup } from "./getProductByGroup";
import { getProductColor } from "./getProductColor";
import { getProductDetails } from "./getProductDetails";
import { getProductName } from "./getProductName";
import { getProductsSkipPagination } from "./getProductsSkipPagination";
import { getPropductType } from "./getProductType";

export const getProductHandler = () => {
    return rest.get('*/api/product-service/products*', (req, res, ctx) => {

        const urlHref = req.url.href;
        const skipPagination = req.url.searchParams.get('skipPagination');
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
        else if(skipPagination) {
            // Data with no pagination
            return getProductsSkipPagination(res, ctx);
        }
        else {
            // Product management Landing > Default
            return getDefaultProducts(res, ctx);
        }
    });
};
