import { rest } from "msw";
import { addDspHandler } from "./addDsp";

export const postCustomersHandler = () =>
    rest.post('*/api/customer-service/customers/*/dsps', (req, res, ctx) => {
        // Customer Onboarding : Add User
        return addDspHandler(req, res, ctx);
    });