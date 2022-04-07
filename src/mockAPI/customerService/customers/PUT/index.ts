import { rest } from "msw";
import { editDspHandler } from "./editDspHandler";

export const putCustomersHandler = () =>
    rest.put('*/api/customer-service/customers/*/dsps/*', (req, res, ctx) => {
        // Customer Onboarding : Add User
        return editDspHandler(req, res, ctx);
    });