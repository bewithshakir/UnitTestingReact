
import { Grid, Typography } from '@mui/material';
import { FormikProvider, useFormik } from "formik";
import { AddProductValidationSchema } from './validation';

import Input from '../../components/UIComponents/Input/Input';
import Select from '../../components/UIComponents/Select/SingleSelect';
import { Button } from '../../components/UIComponents/Button/Button.component';
import { useTranslation } from "react-i18next";


// interface props { 

// }

export default function AddProduct() {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: { customerName: "", paymentType: { label: "", value: "" } },
        validationSchema: AddProductValidationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values));
        }
    });

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit} className="productForm">
                <Grid container direction="column"
                    className="productContainer">
                    <Grid item container lg={12} md={12} sm={12} xs={12}>
                        <Grid item md={12} my={4} mx={4}>
                            <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" >Add New Product or select the product from the table to edit the details</Typography>
                        </Grid>
                        <Grid item md={12} mx={4} >
                            <Typography color="var(--Darkgray)" variant="h4" gutterBottom className="fw-bold" mb={1}>General Infoemation</Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12} mx={4}>
                            <hr></hr>
                        </Grid>

                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Select
                                id='paymentType'
                                name='paymentType'
                                label='PAYMENT TYPE'
                                value={formik.values.paymentType}
                                placeholder='Choose'
                                items={[]}
                                helperText={(formik.touched.paymentType && formik.errors.paymentType) ? formik.errors.paymentType.value : undefined}
                                error={(formik.touched.paymentType && formik.errors.paymentType) ? true : false}
                                onChange={formik.setFieldValue}
                                onBlur={() => { formik.setFieldTouched("paymentType"); formik.validateField("paymentType"); }}
                                required
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name2'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name3'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name4'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name5'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name6'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name5'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name6'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name5'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name6'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name5'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name6'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name5'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name6'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name5'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={1} >
                            <Input
                                id='customerName'
                                label='Customer Name6'
                                type='text'
                                helperText={(formik.touched.customerName && formik.errors.customerName) ? formik.errors.customerName : undefined}
                                error={(formik.touched.customerName && formik.errors.customerName) ? true : false}
                                description=''
                                required
                                {...formik.getFieldProps('customerName')}
                            />
                        </Grid>
                    </Grid>
                    <Grid item container lg={12} md={12} sm={12} xs={12} className="lastItem" >
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4}></Grid>
                        <Grid item lg={5} md={8} sm={8} xs={8} mx={4} my={4} textAlign="right">
                            <Button
                                type="submit"
                                types="save"
                                aria-label="save"
                                className="ml-4"

                            >
                                {t("buttons.save")}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </FormikProvider>
    );
}