import { render } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { addProductManagementHandler, editProductManagementHandler, getProductDataHandler, productColorsHandler, productTypesHandler } from '../pages/AddProductManagement/mockApi/handlerAddProduct';
import { getOPISCitiesHandler } from '../pages/OPISCity/mockApi/handlerOPISCityLandingPage';
import { getAllParkingLotsHandler } from '../pages/ParkingLotsManagement/mockApi/handlerAllParkingLotsLandingPage';
import { getAttachmentListHandler } from '../pages/Attachments/mockApi/AttachmentLandingPageHandler';
import { addDspHandler, getDspDataHandler, editDspHandler } from "../pages/DspLanding/AddDSP/mockApi/handlerAddDsp";
import { getFormattedAddressHandler, getGoogleAddressHandler } from "../components/UIComponents/GoogleAddressComponent/mockApi/googleAddressAutoHandler";
import { getProductByLotHandler, editProductHandler, getTaxExemptionsListHandler, getServedCitiesHandler, getSupplierPricesHandler, getSupplierBrandProductsHandler, getOpisRackProductDetailsHandler , getProductsHandler} from '../pages/ProductManagement/mockApi/handler';
import { getFuelTaxList, getFuelTaxProductsList } from '../pages/Tax/mockApi/handler';
import { getDelFeeSchduleHandler, getProductTypeHandler, getVehicleTypeHandler, getAssetTypeHandler, getLotMasterProductNamesHandler, getLotProductNamesHandler, addFeeDetailsHandler } from '../pages/ParkingLot/FeeDetails/mockAPi/handler';
import { addTruckParkingLotHandler, editTruckParkingLotHandler } from '../pages/Truck/TruckParkingLot/AddLot/mockApi/handlerAddTruckParkingLot';
import { getProductTypesDropdownHandler } from '../pages/AddFuelTax/mockApi/handlerAddFuelTax';
import { getTruckParkingLotList } from '../pages/Truck/TruckParkingLot/mockApi/handlerTruckParkingLot';
import { getTrucksList } from '../pages/Truck/mockApi/handlerTruckList';
import { addAssetHandler, getAssetDeatilsHandler, editAssetHandler } from '../pages/AssetManagement/AddAsset/mockApi/handlerAddAsset';
import { addTruckColorHandler, addTruckFuelHandler, addEditTruckHandler, useGetEditTruckDetails } from '../pages/Truck/AddTruck/mockApi/handleAddTruck';

export const handlers = [
    getProductTypesDropdownHandler(),
    productTypesHandler(),
    productColorsHandler(),
    addProductManagementHandler(),
    getProductDataHandler(),
    editProductManagementHandler(),
    getOPISCitiesHandler(),
    getAttachmentListHandler(),
    getProductByLotHandler(),
    getAllParkingLotsHandler(),
    getFormattedAddressHandler(),
    getGoogleAddressHandler(),
    addDspHandler(),
    getDspDataHandler(),
    editDspHandler(),
    editProductHandler(),
    getFuelTaxList(),
    getFuelTaxProductsList(),
    getDelFeeSchduleHandler(),
    getProductTypeHandler(),
    getVehicleTypeHandler(),
    getAssetTypeHandler(),
    getLotMasterProductNamesHandler(),
    getLotProductNamesHandler(),
    addFeeDetailsHandler(),
    addTruckParkingLotHandler(),
    getTruckParkingLotList(),
    editTruckParkingLotHandler(),
    addAssetHandler(),
    getAssetDeatilsHandler(),
    editAssetHandler(),
    getTaxExemptionsListHandler(),
    getServedCitiesHandler(),
    getSupplierBrandProductsHandler(),
    getSupplierPricesHandler(),
    getTrucksList(),
    addTruckColorHandler(),
    addTruckFuelHandler(),
    addEditTruckHandler(),
    useGetEditTruckDetails(),
    getOpisRackProductDetailsHandler(),
    getProductsHandler()
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