import { rest } from "msw";
import { getAllLotFilterOptions } from "./getFilterOptions";
import { getLotProductTypes } from "./getProductTypes";
import { getLotProducts } from "./lotProducts";

export const getCustomerLotHandler = () => {
    return rest.get('*/api/customer-service/lots/*', (req, res, ctx) => {
        const pathName = req.url.pathname;
        if (pathName.includes('/products')) {
            return getLotProducts(pathName, res, ctx);
        }
        if (pathName.includes('/productTypes')) {
            return getLotProductTypes(res, ctx);
        }
        if (pathName.includes('filter-options')) {
            return getAllLotFilterOptions(res, ctx);
        }
    });
};