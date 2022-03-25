import { rest } from "msw";
import addUser from './postAddUser';

export const postUserHandler = () =>
    rest.post('*/api/user-service/users', (req, res, ctx) => {
        // Customer Onboarding : Add User
        return addUser(req, res, ctx);
    });