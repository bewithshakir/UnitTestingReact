
export const handleModelConfirm = (onBack: any, hideDialogBox: any, resetFormFieldValue: any, pathname: string,
  navigate: any, selectedCustomerId: string, selectedCustomerName: string, backToParkingLot: any) => {
  hideDialogBox(false);
  resetFormFieldValue(false);
  if (pathname.includes('viewLot')) {
    navigate(backToParkingLot(), {
      state: {
        customerId: selectedCustomerId,
        customerName: selectedCustomerName,
      },
    });
  } else if (pathname.includes('addLot') || pathname.includes('addFuelTax')) {
    navigate(-1);
  } else if (pathname.includes('salesTax/add') || pathname.includes('salesTax/edit')) {
    navigate('/salesTax');
  } else if (pathname.includes('opisCities/add')) {
    navigate('/opisCities');
  } else if (pathname.includes('editFuelTax')) {
    navigate('/taxes');
  } else if (pathname.includes('productManagement/add') || pathname.includes('productManagement/edit')) {
    navigate('/productManagement');
  } else if (pathname.includes('/truckParkingLot/add') || pathname.includes('/truckParkingLot/edit')) {
    navigate('/truckParkingLot');
  } else if (pathname.includes('/assetManagement/add') || pathname.includes('/assetManagement/edit')) {
    navigate('/assetManagement');
  } else if (pathname.includes('/trucks/addTruck') || pathname.includes('/trucks/editTruck')) {
    navigate('/trucks');
  } else if (pathname.includes('AddAttachment')) {
    navigate(-1);
  }
  else if (pathname.includes('dsps/addDsp') || pathname.includes('dsps/edit')) {
    navigate(`/customer/${selectedCustomerId}/dsps`, {
      state: {
        customerId: selectedCustomerId,
        customerName: selectedCustomerName
      }
    });
  } else if (pathname.includes('users/addUser') || pathname.includes('users/editUser')) {
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