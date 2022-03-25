import { rest } from "msw";
import getUserProfileDetails from "./getUserProfileDetails";
import getUserPermissions from "./getUserPermissions";
import getJanrinUserDetailsHandler from "./getJanrinUserDetails";
import getUserGroups from "./getUserGroups";
import getUserList from './getUserList';

export const getUserHandler = () => {
    return rest.get('*/api/user-service/users*', (req, res, ctx) => {
        // eslint-disable-next-line no-console
        // console.log("req ===========>", req);

        const params = req.params;
        if (Object.values(params)[1] === '/user-groups') {
            // User Group Types select
            return getUserGroups(res, ctx);
        }
        else if (Object.values(params)[1] === '/permission-types') {
            // User Access Permission List
            return getUserPermissions(res, ctx);
        }
        else if (Object.values(params)[1] === '/verification/janrain') {
            // Verify Janrin User Profile
            return getJanrinUserDetailsHandler(req, res, ctx);
        }
        else if (Object.values(params)[1] === '/test1234' || Object.values(params)[1] === '/test1111') {
            // Edit User : Get User Profile Details
            return getUserProfileDetails(req, res, ctx);
        }
        else {
            // Customer Onboarding : Users Landing > Default
            return getUserList(res, ctx);
        }
    });
};



