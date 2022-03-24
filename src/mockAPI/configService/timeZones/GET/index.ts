import { rest } from "msw";


export const getConfigServiceTimezones = () => rest.get('*/api/config-service/time-zones', (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({
            data: {
                timezones: [
                    {
                        timezoneCd: '0a51d90c-bde1-4010-92b9-6cea5201df1e',
                        timezoneNm: 'HST (Hawaii Standard Time - GMT-10:00)',
                        activeInactiveInd: 'Y'
                    },
                    {
                        timezoneCd: '1da8bdc1-5ae4-4e81-8769-e06169f91da6',
                        timezoneNm: 'AST (Alaska Standard Time - GMT-9:00)',
                        activeInactiveInd: 'Y'
                    },
                    {
                        timezoneCd: '22335774-44b6-4f8d-a79b-ff78eda3a7c0',
                        timezoneNm: 'CST (Central Standard Time - GMT-6:00)',
                        activeInactiveInd: 'Y'
                    },
                    {
                        timezoneCd: '50bccc8c-c001-4d4a-baa0-c7a83003fa45',
                        timezoneNm: 'UTC (Coordinated Universal Time - GMT)',
                        activeInactiveInd: 'Y'
                    }
                ]
            },
            error: null
        }));
});