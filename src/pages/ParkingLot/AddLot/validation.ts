import * as Yup from 'yup';
import moment from 'moment';

const AddParkingLotValidationSchema = Yup.object().shape({
  lotName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lotId: Yup.string()
    .min(6, 'Lot Id should have minimum of 6 digits')
    .max(10, 'Lot Id should have maximum of 10 digits')
    .matches(/^\d{1,10}$/, 'Invalid Lot Id')
    .required('Required'),
  addressLine1: Yup.string().required('Required'),
  addressLine2: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  county: Yup.string().required('Required'),
  postalCode: Yup.string().required('Required'),
  jurisdictionId: Yup.string()
    .min(13, 'Should be minimum 13 characters long')
    .required('Required'),
  productDelFreq: Yup.object().shape({
    label: Yup.string(),
    value: Yup.string(),
  }),
  timeZone: Yup.object().shape({
    label: Yup.string().required('Required'),
    value: Yup.string().required('Required'),
  }),
  locationContact: Yup.array()
    .of(
      Yup.object().shape({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        phoneNumber: Yup.string()
          .matches(
            /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,
            'Invalid phone number'
          )
          .required('Required'),
      })
    )
    .required('Must have emergency contact')
    .min(1, 'Minimum of 1 emergency contact'),
  orderScheduleDel: Yup.array().of(
    Yup.object().shape({
      fromDate: Yup.date().nullable().required('Required'),
      toDate: Yup.date().nullable().test('fromDate', function (value: any, context: any) {
        // debugger;// eslint-disable-line no-debugger
        if (context?.parent?.fromDate && moment(context?.parent?.fromDate) >  moment(value)) {
          return this.createError({ message: "End date can not be before Start date" });
        } else {
            return true;
        }
      }),
      startTime: Yup.string().required('Required'),
      endTime: Yup.string().required('Required'),
      delFreq: Yup.string(),
      productDelDaysMulti: Yup.array()
        .test('delFreq', function (value: any, context: any) {
          if (context?.parent?.delFreq?.toLowerCase() === 'bi-weekly' && value?.length !== 2) {
            return this.createError({ message: 'Two days should be selected in case of Bi-weekly Delivery Frequency' });
          } else {
            if (['daily', 'weekends'].includes(String(context?.parent?.delFreq).toLowerCase()) && value?.length === 0) {
              return this.createError({ message: 'Atleast one day should be selected' });
            } else {
              return true;
            }
          }
        }),
      productDelDays: Yup.object().shape({
        label: Yup.string(),
        value: Yup.string(),
      }),
    })
  ),
});

export default AddParkingLotValidationSchema;
