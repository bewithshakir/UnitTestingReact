import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const CustomerMangement =  lazy(() => import("./pages/CustomerManagement"));
const CustomerOnboarding = lazy(() => import('./pages/CustomerOnboarding'));
const AddCustomer = lazy(() => import('./pages/CustomerOnboarding/AddCustomer/AddCustomer'));
const ViewCustomer = lazy(() => import('./pages/CustomerOnboarding/AddCustomer/AddCustomer'));
const CustomerParkingLot = lazy(() => import("./pages/ParkingLot"));
const CustomerAddParkingLot = lazy(() => import('./pages/ParkingLot/AddLot/AddLotWrapper'));
const CustomerViewParkingLot = lazy(() => import('./pages/ParkingLot/AddLot/AddLotWrapper'));
const Taxes = lazy(() => import("./pages/Tax"));
const AddFuelTax = lazy(() => import('./pages/AddFuelTax'));
const EditFuelTax = lazy(() => import('./pages/AddFuelTax'));
const SalesTax = lazy(() => import("./pages/Tax/SalesTax"));
const AddSalesTax = lazy(() => import('./pages/AddSalesTax/AddSalesTax'));
const EditSalesTax = lazy(() => import('./pages/AddSalesTax/AddSalesTax'));
const OpisCities = lazy(() => import("./pages/OPISCity"));
const ProductManagement = lazy(() => import("./pages/ProductManagementLanding"));
const AddOpisCities = lazy(() => import('./pages/OPISCity/AddOpisCities'));
const Query = lazy(() => import('./pages/QueryTest'));
const DemoComponents = lazy(() => import('./pages/DemoComponents/DemoComponents'));
const AddProductManagement = lazy(() => import('./pages/AddProductManagement/AddProduct'));
const EditProductManagement =lazy(() => import('./pages/AddProductManagement/AddProduct'));

export const routes : RouteObject[]  = [
  {
    path: "/",
    element: <CustomerMangement sidebarName="Home"  version= "NavLinks"/>,
  },
  {
    path: "/customer",
    element: <CustomerOnboarding   version= "Breadcrumbs-Single"/>,
    children: [
      {
        path: "/customer/addCustomer",
        element: <AddCustomer version= "Breadcrumbs-Single"/>,
      },
      {
        path: "/customer/viewCustomer/:customerId",
        element: <ViewCustomer version= "Breadcrumbs-Single"/>,
      },
      {
        path: "/customer/:customerId/parkingLots",
        element: <CustomerParkingLot version= "Breadcrumbs-Single"/>,
      },
      {
        path: "/customer/:customerId/parkingLots/addLot",
        element: <CustomerAddParkingLot   version= 'Breadcrumbs-Many'/>
      },
      {
        path: "/customer/:customerId/parkingLots/viewLot/:parkinglotId",
        element: <CustomerViewParkingLot version= 'Breadcrumbs-Many'/>
      }
    ]
  },
  {
    path: "/taxes",
    element: <Taxes version="NavLinks"/>
  },
  {
    path: "/addFuelTax",
    element: <AddFuelTax version= "Breadcrumbs-Single"/>,
  },
  {
    path: "/editFuelTax",
    element: <EditFuelTax version= "Breadcrumbs-Single"/>
  },
  {
    path: "/salesTax",
    element: <SalesTax   version= "Breadcrumbs-Many"/>
  },
  {
    path: "/salesTax/add",
    element: <AddSalesTax   version= "Breadcrumbs-Single"/>,
  },
  {
    path: "/salesTax/edit/",
    element: <EditSalesTax  version= "Breadcrumbs-Single"/>,
  },
  {
    path: "/opisCities",
    element: <OpisCities  version= "Breadcrumbs-Many"/>
  },
  {
    path: "/productManagement",
    element: <ProductManagement version= "Breadcrumbs-Many"/>
  },
  {
    path: "/opisCities/add",
    element: <AddOpisCities  version= "Breadcrumbs-Single"/>,
  },
  {
    path: "/query",
    element: <Query />,
  },
  {
    path: "/demo",
    element: <DemoComponents />,
  },
  {
    path: "/productManagement/add",
    element: <AddProductManagement   version= "Breadcrumbs-Single"/>
  },
  {
    path: "/productManagement/edit/:productId",
    element: <EditProductManagement   version= "Breadcrumbs-Single"/>
  }
];