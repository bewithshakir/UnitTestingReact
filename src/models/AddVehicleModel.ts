import { headerObj } from "../components/UIComponents/DataGird/grid.component";

export default class AddVehicleModel {
    fieldsToDisplay(): headerObj[] {
        return [
            { field: 'vin', label: 'VIN / ID', type: 'text' },
            { field: 'serviceFee', label: 'Service Fee', type: 'text' }
        ];
    }

    dataModel(data: any) {
        return data.map((x: any) => ({
            ...x
        }));
    }
}
