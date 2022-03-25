import { render } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getOPISCitiesHandler } from '../pages/OPISCity/mockApi/handlerOPISCityLandingPage';
import { getAllParkingLotsHandler } from '../pages/ParkingLotsManagement/mockApi/handlerAllParkingLotsLandingPage';
// import { getAttachmentListHandler } from '../pages/Attachments/mockApi/AttachmentLandingPageHandler';
import { addDspHandler, editDspHandler } from "../pages/DspLanding/AddDSP/mockApi/handlerAddDsp";
import { getFormattedAddressHandler, getGoogleAddressHandler } from "../components/UIComponents/GoogleAddressComponent/mockApi/googleAddressAutoHandler";
import {
    getProductByLotHandler,
    editProductHandler,
    getTaxExemptionsListHandler,
    getServedCitiesHandler,
    getSupplierPricesHandler,
    getSupplierBrandProductsHandler,
    getOpisRackProductDetailsHandler
} from '../pages/ProductManagement/mockApi/handler';
import { getFuelTaxList, getFuelTaxProductsList } from '../pages/Tax/mockApi/handler';
import {
    getDelFeeSchduleHandler,
    getProductTypeHandler,
    getVehicleTypeHandler,
    getAssetTypeHandler,
    getLotProductNamesHandler,
    addFeeDetailsHandler,
    getFeeDetailsHandler,
    editFeeDetailsHandler
} from '../pages/ParkingLot/FeeDetails/mockAPi/handler';
import { addTruckParkingLotHandler, editTruckParkingLotHandler } from '../pages/Truck/TruckParkingLot/AddLot/mockApi/handlerAddTruckParkingLot';

import { getTruckParkingLotList } from '../pages/Truck/TruckParkingLot/mockApi/handlerTruckParkingLot';
import { getTrucksList } from '../pages/Truck/mockApi/handlerTruckList';
import { getTanksList } from '../pages/Truck/mockApi/handlerTanksList';
import { getLocationsList } from '../pages/Truck/mockApi/handlerLocations';
import { addAssetHandler, getAssetDeatilsHandler, editAssetHandler } from '../pages/AssetManagement/AddAsset/mockApi/handlerAddAsset';
import { addTruckColorHandler, addEditTruckHandler, useGetEditTruckDetails } from '../pages/Truck/AddTruck/mockApi/handleAddTruck';
// import { getDspList } from '../pages/DspLanding/mockApi/handlerDspLanding';
// import { getCustomerList } from '../pages/CustomerManagement/mockApi/handlerCustomer';
import { rightInfoFilterHandler } from '../components/UIComponents/RightInfoPanel/mockApi/handleRightInfoPanel';


import { getCustomerHandler } from '../mockAPI/customerService/customers/GET';
import { getProductHandler } from '../mockAPI/productService/products/GET';
import { postProductHandler } from '../mockAPI/productService/products/POST';
import { putProductHandler } from '../mockAPI/productService/products/PUT';
import { getUserHandler } from '../mockAPI/userService/users/GET';
import { postUserHandler } from '../mockAPI/userService/users/POST';
import { putUserHandler } from '../mockAPI/userService/users/PUT';


// import {
//     // addUserHandler,editUserHandler
//     // getUserDSPDropdownHandler,
//     // getUserPermissionHandler, getUserDetailsHandler, verifyUserHandler, getUserGroupsHandler
// } from '../pages/Users/AddUser/mockApi/handlerAddUser';

// import { getUsersList } from '../pages/Users/mockApi/handlerUsersLanding';
import { getAllLotFilterOptions } from '../components/UIComponents/ConfirmationDialog/inputComponents/mockApi/handlerLotFilter';
import { getCustomerHandler } from '../mockAPI/customerService/contactTypes/GET';
import { getConfigServiceTimezones } from '../mockAPI/configService/timeZones/GET';
import { getConfigServiceDeliveryFreq } from '../mockAPI/configService/deliveryFrequencies/GET';
import { getConfigServiceDays } from '../mockAPI/configService/days/GET';

export const handlers = [
    getCustomerHandler(),
    getAllLotFilterOptions(),
    getConfigServiceTimezones(),
    getConfigServiceDeliveryFreq(),
    getConfigServiceDays(),
    getProductHandler(),
    postProductHandler(),
    putProductHandler(),
    getOPISCitiesHandler(),
    // getAttachmentListHandler(),
    getProductByLotHandler(),
    getAllParkingLotsHandler(),
    getFormattedAddressHandler(),
    getGoogleAddressHandler(),

    rightInfoFilterHandler(),
    // getCustomerList(),


    addDspHandler(),
    // getDspList(),

    getCustomerHandler(),


    editDspHandler(),
    editProductHandler(),
    getFuelTaxList(),
    getFuelTaxProductsList(),
    getDelFeeSchduleHandler(),
    getProductTypeHandler(),
    getVehicleTypeHandler(),
    getAssetTypeHandler(),
    getLotProductNamesHandler(),
    addFeeDetailsHandler(),
    getFeeDetailsHandler(),
    editFeeDetailsHandler(),
    addTruckParkingLotHandler(),
    getTruckParkingLotList(),
    editTruckParkingLotHandler(),
    addAssetHandler(),
    getTanksList(),
    getLocationsList(),
    getAssetDeatilsHandler(),
    editAssetHandler(),
    getTaxExemptionsListHandler(),
    getServedCitiesHandler(),
    getSupplierBrandProductsHandler(),
    getSupplierPricesHandler(),
    getTrucksList(),
    addTruckColorHandler(),
    addEditTruckHandler(),
    useGetEditTruckDetails(),
    getOpisRackProductDetailsHandler(),
    // user-services 
    getUserHandler(),
    postUserHandler(),
    putUserHandler(),
    // addUserHandler(),
    // verifyUserHandler(),
    // getUserGroupsHandler(),
    // getUserPermissionHandler(),
    // getUserDetailsHandler(),
    // getUserDSPDropdownHandler(),
    getCustomerHandler(),
    // editUserHandler(),
    // getUsersList()
];

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export function renderWithClient(ui: React.ReactElement) {
    const testQueryClient = createTestQueryClient();
    const { rerender, ...result } = render(
        <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    );
    return {
        ...result,
        rerender: (rerenderUi: React.ReactElement) =>
            rerender(
                <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
            ),
    };
}

export function createWrapper() {
    const testQueryClient = createTestQueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    );
}