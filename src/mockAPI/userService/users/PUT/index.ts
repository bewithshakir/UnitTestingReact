import { rest } from "msw";
import editUser from './putEditUser';

export const putUserHandler = () =>
    rest.put('*/api/user-service/users/:userId', (req, res, ctx) => {
        // eslint-disable-next-line no-console
        // console.log("req $$$$$$$$$$$>", req);

        // Customer Onboarding : Add User
        return editUser(req, res, ctx);
    });