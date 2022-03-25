import { rest } from "msw";
import editUser from './putEditUser';

export const putUserHandler = () =>
    rest.put('*/api/user-service/users/:userId', (req, res, ctx) => {
        // Customer Onboarding : Edit User
        return editUser(req, res, ctx);
    });