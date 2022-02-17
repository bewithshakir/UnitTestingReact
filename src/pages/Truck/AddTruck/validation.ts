import * as Yup from 'yup';


const dropDownSchema = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');
const statusDropDownSchema = Yup.object().shape({ label: Yup.string(), value: Yup.string() });

const contactSchema = Yup.object().shape({
    tankTcsId: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid ID.').required('Required'),
    tankFuelType: dropDownSchema,
    tankMinCapacity: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Min Capacity.').required('Required'),
    tankMaxCapacity: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Max Capacity.').required('Required')
});

const AddTruckValidationSchema = Yup.object().shape({
    truckName: Yup.string().required('Required'),
    license: Yup.string().required('Required'),
    vin: Yup.string().required('Required'),
    makeModel: Yup.string().required('Required'),
    color: dropDownSchema,
    year:Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Year.'),
    status:statusDropDownSchema,
    truckParkingLot: Yup.array().test('', function (value: any) {
        if(value.length === 0) {
            return this.createError({ message: 'Atleast one parkinglot should be selected' });
        } else {
            return true;
        }
    }),
    opexFuelType: dropDownSchema,
    tankDetails: Yup.array()
        .of(contactSchema)
        .required('Must have tank details')
        .min(1, 'Minimum of 1 tank details required.'),
});

export default AddTruckValidationSchema;