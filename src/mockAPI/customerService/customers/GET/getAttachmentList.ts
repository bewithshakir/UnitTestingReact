import {
  DefaultRequestBody,
  PathParams,
  ResponseComposition,
  RestContext,
  RestRequest,
} from 'msw';

const getAttachmentListHandler = (
  req: RestRequest<never, PathParams>,
  res: ResponseComposition<DefaultRequestBody>,
  ctx: RestContext
) => {
  const search = req.url.searchParams.get('search');
  if (search) {
    // attachment Search
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          pagination: {
            totalCount: 1,
            limit: 15,
            offset: 0,
          },
          customerDocuments: [
            {
              customerDocumentId: '39d6f8b5-a721-4a8d-b13a-277468ed78de',
              customerId: '167fd7be-c20e-412a-bac0-502672a055d6',
              documentName: 'sample.pdf',
              documentFormat: 'pdf',
              dateAdded: '2022-04-07T07:31:47.470Z',
              uploadedBy: 'Dinesh Chakkravarthi',
              uploadedIn: 'Attachments',
            },
          ],
        },
        error: null,
      })
    );
  }
  // entire list
  return res(
    ctx.status(200),
    ctx.json({
      data: {
        pagination: {
          totalCount: 1,
          limit: 15,
          offset: 0,
        },
        customerDocuments: [
          {
            customerDocumentId: '39d6f8b5-a721-4a8d-b13a-277468ed78de',
            customerId: '167fd7be-c20e-412a-bac0-502672a055d6',
            documentName: 'sample.pdf',
            documentFormat: 'pdf',
            dateAdded: '2022-04-07T07:31:47.470Z',
            uploadedBy: 'Dinesh Chakkravarthi',
            uploadedIn: 'Attachments',
          },
          {
            customerDocumentId: 'afc5dbed-fe20-411f-93bf-0ba20dbb5ebe',
            customerId: '167fd7be-c20e-412a-bac0-502672a055d6',
            documentName: 'Sprint 13.xlsx',
            documentFormat: 'xlsx',
            dateAdded: '2022-03-10T13:42:02.764Z',
            uploadedBy: 'Dinesh Chakkravarthi',
            uploadedIn: 'Add Customer',
          },
        ],
      },
      error: null,
    })
  );
};

export default getAttachmentListHandler;
