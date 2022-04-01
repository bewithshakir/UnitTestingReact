import * as Yup from 'yup';


const dropDownSchema = Yup.object().shape({ label: Yup.string().required('Required'), value: Yup.string().required('Required') }).required('Required');
const statusDropDownSchema = Yup.object().shape({ label: Yup.string(), value: Yup.string() });

const contactSchema = Yup.object().shape({
    tcsRegisterId: Yup.string().max(10,'TCS register id must be at most 10 characters').matches(/^[a-zA-Z0-9]*$/, 'Invalid ID.').required('Required'),
    tankFuelType: dropDownSchema,
    minCapacityVol: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Min Capacity.').required('Required').test('mintest', 'Min capacity should be less than max', (value, context) => {
        if(value && context.parent.maxCapacityVol){
           return value < context.parent.maxCapacityVol;
       }
       return true;
    }),
    maxCapacityVol: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Max Capacity.').required('Required')
});

const AddTruckValidationSchema = Yup.object().shape({
    truckName: Yup.string().required('Required'),
    license: Yup.string().required('Required').matches(/^[a-zA-Z0-9]*$/,'License should be alpha numeric').max(10),
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