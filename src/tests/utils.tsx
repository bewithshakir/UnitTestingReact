import { render } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getOPISCitiesHandler } from '../pages/OPISCity/mockApi/handlerOPISCityLandingPage';
import { getAllParkingLotsHandler } from '../pages/ParkingLotsManagement/mockApi/handlerAllParkingLotsLandingPage';
import { getAttachmentListHandler } from '../pages/Attachments/mockApi/AttachmentLandingPageHandler';
import { addDspHandler, editDspHandler } from "../pages/DspLanding/AddDSP/mockApi/handlerAddDsp";
import { getFormattedAddressHandler, getGoogleAddressHandler } from "../components/UIComponents/GoogleAddressComponent/mockApi/googleAddressAutoHandler";
import {
    getProductByLotHandler,
    editProductHandler,
    getTaxExemptionsListHandler,
    getServedCitiesHandler,
    getSupplierPricesHandler,
    getSupplierBrandProductsHandler,
    getOpisRackProductDetailsHandler,
    getProductsHandler
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
import { getDspList } from '../pages/DspLanding/mockApi/handlerDspLanding';
import { getCustomerList } from '../pages/CustomerManagement/mockApi/handlerCustomer';
import { rightInfoFilterHandler } from '../components/UIComponents/RightInfoPanel/mockApi/handleRightInfoPanel';
import { getProductHandler } from '../mockAPI/productService/products/GET';
import { postProductHandler } from '../mockAPI/productService/products/POST';
import { putProductHandler } from '../mockAPI/productService/products/PUT';
import { addUserHandler, verifyUserHandler, getUserGroupsHandler, getCustomerDSPHandler, getUserPermissionHandler } from '../pages/Users/AddUser/mockApi/handlerAddUser';

export const handlers = [
    getProductHandler(),
    postProductHandler(),
    putProductHandler(),
    getOPISCitiesHandler(),
    getAttachmentListHandler(),
    getProductByLotHandler(),
    getAllParkingLotsHandler(),
    getFormattedAddressHandler(),
    getGoogleAddressHandler(),

    rightInfoFilterHandler(),
    getCustomerList(),
    addDspHandler(),
    getDspList(),

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
    getProductsHandler(),

    addUserHandler(),
    verifyUserHandler(),
    getUserGroupsHandler(),
    getCustomerDSPHandler(),
    getUserPermissionHandler(),
];

const createTestQueryClient = () => new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

export function renderWithClient (ui: React.ReactElement) {
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

export function createWrapper () {
    const testQueryClient = createTestQueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
    );
}