import { rest } from "msw";

export const addAssetHandler = () => {
    return rest.post('http://52.226.196.74/api/product-service/assets', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: "Asset saved successfully.",
                "error": null
            })
        );
    });
};
