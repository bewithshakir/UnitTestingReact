import { rest } from "msw";
import { editProductHandler } from "./lotProducts";


export const editCustomerLotHandler = () => {
    return rest.put('*/api/customer-service/lots/*', (req, res, ctx) => {
        const pathName = req.url.pathname;
        if (pathName.includes('/products')) {
            return editProductHandler(res, ctx);
        }
    });
};