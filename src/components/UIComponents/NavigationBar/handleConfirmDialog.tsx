import { modelBackConfig } from "./config";


export const handleModelConfirm = (props: any) => {
  const { onBack, hideDialogBox, resetFormFieldValue, pathname, navigate, selectedCustomerId, selectedCustomerName, backToParkingLot } = props;
  hideDialogBox(false);
  resetFormFieldValue(false);
  if (pathname.includes('viewLot')) {
    navigate(backToParkingLot(), {
      state: {
        customerId: selectedCustomerId,
        customerName: selectedCustomerName,
      },
    });
  } else if (pathname.includes('addLot')) {
    navigate(-1);
  } else if (pathname.includes('AddAttachment')) {
    navigate(-1);
  } else if (modelBackConfig.find(pathObj => pathname.includes(pathObj.path))) {
    const foundPathObj = modelBackConfig.find(pathObj => pathname.includes(pathObj.path));
    // eslint-disable-next-line no-console
    console.log("🚀 ~ file: handleConfirmDialog.tsx ~ line 21 ~ foundPathObj", foundPathObj);
    navigate(foundPathObj?.backTo);
  } else if (pathname.includes('dsps/addDsp') || pathname.includes('dsps/edit')) {
    navigate(`/customer/${selectedCustomerId}/dsps`, {
      state: {
        customerId: selectedCustomerId,
        customerName: selectedCustomerName
      }
    });
  } else if (pathname.includes('users/add') || pathname.includes('users/edit')) {
    navigate(`/customer/${selectedCustomerId}/users`, {
      state: {
        customerId: selectedCustomerId,
        customerName: selectedCustomerName
      }
    });
  } else {
    onBack();
  }
};