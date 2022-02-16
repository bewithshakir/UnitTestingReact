import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { YellowFuelIcon, RedFuelIcon, PurpleFuelIcon, SkyBlueFuelIcon, ParrotGreenFuelIcon, AquaFuelIcon, GreenFuelIcon, BrownFuelIcon, OrangeFuelIcon, NavyBlueFuelIcon, AlertExclamationIcon } from '../assets/icons';


export type dropdownItem = {
    label: string,
    value: string | number,
    icon?: JSX.Element
}

export default class ProductModel {
    // General Information
    fieldsToDisplay(): headerObj[] {
        return [
            { field: "productNm", label: "PRODUCT NAME", type: 'text' },
            { field: "pricingModelNm", label: "PRICING MODEL", type: 'text' },
            {
                field: "activeInactiveInd",
                label: "",
                type: 'status',
                align: 'center',
                showIconLast: true,
                fieldOptions: [
                    {
                        value: "N",
                        icon: AlertExclamationIcon,
                    }
                ]
            },
            {
                field: "productColorCode",
                label: "",
                type: 'status',
                align: 'center',
                showIconLast: true,
                fieldOptions: [
                    {
                        value: "#FBCE07",
                        icon: YellowFuelIcon,
                    },
                    {
                        value: "#DD1D21",
                        icon: RedFuelIcon,
                    },
                    {
                        value: "#008443",
                        icon: GreenFuelIcon,
                    },
                    {
                        value: "#641964",
                        icon: PurpleFuelIcon,
                    },
                    {
                        value: "#89CFDC",
                        icon: AquaFuelIcon,
                    },
                    {
                        value: "#743410",
                        icon: BrownFuelIcon,
                    },
                    {
                        value: "#EB8705",
                        icon: OrangeFuelIcon,
                    },
                    {
                        value: "#003C88",
                        icon: NavyBlueFuelIcon,
                    },
                    {
                        value: "#BED50F",
                        icon: ParrotGreenFuelIcon,
                    },
                    {
                        value: "#009EB4",
                        icon: SkyBlueFuelIcon,
                    },
                ]
            },
        ];
    }

    dataModel(data: any) {
        return data.map((x: any) => (
            {
                ...x,
                pricingModelNm: x.pricingModel.pricingModelNm,
                productColorCode: x.productColor.productColorCode,
            }
        ));
    }

    fieldsToDisplaySupplierRack(): headerObj[] {
        return [
            { field: "productIndicator", label: "PRODUCT INDICATOR", type: 'text' },
            { field: "productType", label: "PRODUCT TYPE", type: 'text' },
            { field: "priceDate", label: "DATE DAILY", type: 'text' },
            { field: "cityId", label: "CITY ID", type: 'text' },
            { field: "state", label: "STATE", type: 'text' },
            { field: "city", label: "CITY", type: 'text' },
            { field: "supplier", label: "SUPPLIER", type: 'text' },
            { field: "brandIndicator", label: "BRAND", type: 'text' },
            { field: "terms", label: "TERM", type: 'text' },
            { field: "grossPrice", label: "NET PRICE", type: 'text' },
            { field: "uniqueMarker", label: "UNIQUE MARKER", type: 'text' },
            { field: "octaneValue", label: "OCTANE LEVEL", type: 'text' },
            { field: "actualProduct", label: "ACTUAL PRODUCT", type: 'text' },
            { field: "rvp", label: "RVP", type: 'text' },
            { field: "dieselBlend", label: "DIESEL BLEND", type: 'text' },
            { field: "bioType", label: "BIO TYPE", type: 'text' },
            { field: 'lastUpdatedDate', label: 'Last Updated Date', type: 'text' }
        ];
    }

}


// actualProduct: "NO2"
// addedDate: "2022-02-16T10:51:58.644Z"
// bioType: "MULT      "
// brandIndicator: "u"
// city: "Colton"
// cityId: 870
// countryCd: "us"
// dieselBlend: "CULSD"
// generatedProductName: "sxuno20"
// grossPrice: 333.5
// lastUpdatedDate: "2022-02-16T13:02:25.557Z"
// octaneValue: 0
// opisProductName: "Biodiesel B0-5 MULT Carb ULS Dye"
// opisServedCityId: "f3584b2f-6682-4230-aaff-58d9abf206b1"
// priceDate: "2022-02-15T00:00:00.000Z"
// productCategoryId: null
// productIndicator: "S"
// productKey: "biodieselb0-5multcarbulsdyesx870marathonwithcar0uno2n-10cacoltonmult"
// productType: "x"
// rvp: "0.00"
// state: "CA"
// supplier: "Marathon With CAR"
// terms: " N-10"
