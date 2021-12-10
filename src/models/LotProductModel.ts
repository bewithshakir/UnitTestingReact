import { headerObj } from '../components/UIComponents/DataGird/grid.component';
import { YellowFuelIcon, RedFuelIcon, PurpleFuelIcon, BlueFuelIcon, ParrotGreenFuelIcon, AquaFuelIcon, GreenFuelIcon, BrownFuelIcon, OrangeFuelIcon, NavyBlueFuelIcon, AlertExclamationIcon } from '../assets/icons';

export default class ProductModel {
    // General Information

    // constructor() {

    // }

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
                        icon: BlueFuelIcon,
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



}