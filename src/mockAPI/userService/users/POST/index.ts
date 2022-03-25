import { rest } from "msw";
import addUser from './postAddUser';

export const postUserHandler = () =>
    rest.post('*/api/user-service/users', (req, res, ctx) => {
        // eslint-disable-next-line no-console
        // console.log("req +++++++++++>", req);

        // Customer Onboarding : Add User
        return addUser(req, res, ctx);
    });