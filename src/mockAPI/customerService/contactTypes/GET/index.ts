import { rest } from "msw";


export const getCustomerHandler = () => rest.get('*/api/customer-service/contact-types', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: [
                {
                    locationContactCd: '6e1df17a-29ba-4312-a55e-6b34e47fbb4d',
                    locationContactNm: 'Primary',
                    activeInactiveInd: 'Y'
                },
                {
                    locationContactCd: 'ca9fcb3a-abc1-4991-a4fd-41d0ee3f47ad',
                    locationContactNm: 'Secondary',
                    activeInactiveInd: 'Y'
                }
            ],
            error: null
        }));
});