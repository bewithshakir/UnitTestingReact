import * as Yup from 'yup';

export const AddFuelTaxValidationSchema = Yup.object().shape({
    addressLine1: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    fuelType: Yup.object().shape({ label: Yup.string(), value: Yup.string() }),
    federalRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    localRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    salesFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    stateFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    cityFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    countryFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    InspFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    miscLocalFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    loadFuel: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required')
});


export const EditFuelTaxValidationSchema = Yup.object().shape({
    addressLine1: Yup.string(),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    fuelType: Yup.object().shape({ label: Yup.string(), value: Yup.string()}),
    federalRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    localRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    salesFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    stateFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    cityFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    countryFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    InspFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    miscLocalFuelRate: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required'),
    loadFuel: Yup.string().matches(/^[0-9]+([.][0-9]+)?$/, 'Invalid Rate.').required('Required')
});