import { rest } from "msw";
import getUserDSPDropdownHandler from "./getUserDSPDropdown";
import getCustomerList from './getCustomerList';
import getAttachmentListHandler from './getAttachmentList';
import getDSPList from './getDSPList';

export const getCustomerHandler = () => {
    return rest.get('*/api/customer-service/customers*', (req, res, ctx) => {
     if (Object.values(req.params)[1].includes('/files')) {
            // Attachment List
            return getAttachmentListHandler(req, res, ctx);
        }
        else if (Object.values(req.params)[1].includes('/dsps')) {
            const skipPagination = req.url.searchParams.get('skipPagination');
            if (skipPagination === 'true') {
                // User DSP Dropdown list
                return getUserDSPDropdownHandler(req, res, ctx);
            }
            // User Access Permission List
            return getDSPList(req, res, ctx);
        }
        else {
            // Customer Onboarding : Users Landing > Default
            return getCustomerList(res, ctx);
        }
    });
};



