import { rest } from "msw";

export const getAttachmentList = () => {
    return rest.get('*/api/customer-service/customers/167fd7be-c20e-412a-bac0-502672a055d6/files*', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                "data": {
                  "pagination": {
                    "totalCount": 1,
                    "limit": 15,
                    "offset": 0
                  },
                  "customerDocuments": [
                    {
                      "customerDocumentId": "39d6f8b5-a721-4a8d-b13a-277468ed78de",
                      "customerId": "167fd7be-c20e-412a-bac0-502672a055d6",
                      "documentName": "sample.pdf",
                      "documentFormat": "pdf",
                      "dateAdded": "2022-04-07T07:31:47.470Z",
                      "uploadedBy": "Dinesh Chakkravarthi",
                      "uploadedIn": "Attachments"
                    }
                  ]
                },
                "error": null
              })
        );
    });
};




