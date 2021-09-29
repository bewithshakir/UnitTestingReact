import { Add, FileCopy } from '@material-ui/icons';
import { Box, Container, CssBaseline, FormControl, FormControlLabel, FormGroup, Grid, Link, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Button } from '../components/UIComponents/Button/Button.component';
import { DatePicker } from '../components/UIComponents/DatePicker/DatePicker.component';
import Input from '../components/UIComponents/Input/Input';
import HorizontalBar from '../components/UIComponents/NavigationBar/HorizontalBar';
import Select from '../components/UIComponents/Select/dropdown';
import "./AddCustomer.style.scss";
import Legend from './Legend/index';
import Checkbox from '../components/UIComponents/Checkbox/Checkbox.component';

const AddCustomer = (props: any) => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            customerName: '',
            customerId: '',
            email: '',
            item: [],
            item2: [],
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            postalCode: '',
            startDate: null,
            endDate: null,
            firstName: '',
            lastName: '',
            lotLevel: false,
            businessLevel: false,
            vehicleLevel: false,
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const items = [
        { label: 'Amazon', value: 'Amazon' },
        { label: 'Nike', value: 'Nike' },
        { label: 'Flipkart', value: 'Flipkart' },
        { label: 'Apple', value: 'Apple' },
        { label: 'Hp', value: 'Hp' }
    ]

    const items2 = [
        { label: 'Amazon', value: 'Amazon' },
        { label: 'Nike', value: 'Nike' },
        { label: 'Flipkart', value: 'Flipkart' },
        { label: 'Apple', value: 'Apple' },
        { label: 'Hp', value: 'Hp' }
    ]

    const history = useHistory()

    function onClickBack() {
        history.goBack()
    }

    // const onDateChange = (name: string, newValue: Date | string | null | moment.Moment) => setForm(x => ({ ...x, [name]: newValue }));

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm(x => ({ ...x, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

    return (
        <Box display="flex" mt={8}>
            <CssBaseline />
            <HorizontalBar
                version={props.version}
                onBack={onClickBack}
            />

            <Grid container pl={6.25} className="main-area">
                <Grid item md={2} pt={5} xs={2} className="legend-area">
                    <Legend />
                </Grid>
                <Grid item md={10} pt={5} xs={10} className="page-area">
                    <Container maxWidth="lg" className="page-container">
                        <form onSubmit={formik.handleSubmit}>
                            <Typography variant="h3" component="h3" gutterBottom className="fw-bold" mb={1}>
                                Customer Profile
                            </Typography>
                            <Grid container mt={1}>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        General Information
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        name='customerName'
                                        label='Customer Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.customerName}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='customerId'
                                        label='Customer ID'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.customerId}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        name='addressLine1'
                                        label='ADDRESS LINE 1'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.addressLine1}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='addressLine2'
                                        label='ADDRESS LINE 2'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.addressLine2}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        name='city'
                                        label='City'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.city}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                    <Input
                                        name='state'
                                        label='STATE / PROVINCE'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.state}
                                        required
                                        description=''
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5}>
                                    <Input
                                        name='postalCode'
                                        label='POSTAL CODE'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.postalCode}
                                        required
                                        description=''
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Customer Contact
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input name='email'
                                        label='Email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='phoneNumber'
                                        label='Phone Number'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Payment and Wallet rules
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        name='item'
                                        label='PAYMENT TYPE'
                                        value={formik.values.item}
                                        placeholder='Choose'
                                        items={items}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5} />
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Select
                                        name='item'
                                        label='INVOICE FREQUENCY'
                                        value={formik.values.item2}
                                        placeholder='Choose'
                                        items={items2}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5} pr={2.5} pb={2.5}>
                                    <DatePicker
                                        label='CUSTOMER START DATE'
                                        id="cust-filter-end-date"
                                        disableBeforeDate={formik.values.startDate}
                                        // placeholder="To Date"
                                        name="endDate"
                                        // onChange={onDateChange}
                                        onChange={formik.handleChange}
                                        value={formik.values.endDate}
                                        required
                                    />
                                </Grid>
                                <Grid item md={3} pl={2.5}>
                                    <Input
                                        name='postalCode'
                                        label='PAYMENT TERM'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.postalCode}
                                        description=''
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <FormControl sx={{ m: 3 }}>
                                        <FormGroup>
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                control={
                                                    <Checkbox checked={formik.values.lotLevel} onChange={formik.handleChange} name="lotLevel" />
                                                }
                                                label={
                                                    <Typography variant="h4" component="h4" className="fw-bold">
                                                        Apply at Lot level
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                control={
                                                    <Checkbox checked={formik.values.businessLevel} onChange={formik.handleChange} name="businessLevel" />
                                                }
                                                label={
                                                    <Typography variant="h4" component="h4" className="fw-bold">
                                                        Apply at Busines level
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                sx={{ margin: "0px", marginBottom: "1rem", fontWeight: "bold" }}
                                                control={
                                                    <Checkbox checked={formik.values.vehicleLevel} onChange={formik.handleChange} name="vehicleLevel" />
                                                }
                                                label={
                                                    <Typography variant="h4" component="h4" className="fw-bold">
                                                        Apply at Vehicle level
                                                    </Typography>
                                                }
                                            />
                                        </FormGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Emergency Contact
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input name='email'
                                        label='Email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='phoneNumber'
                                        label='Phone Number'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={4}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        sx={{ display: "flex", alignItems: "center" }}
                                        onClick={() => {
                                            console.info("I'm a button.");
                                        }}
                                    >
                                        <Add />
                                        <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary" mb={1}>
                                            ADD EMERGENCY CONTACT
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        AP Contact
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input
                                        name='firstName'
                                        label='First Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='lastName'
                                        label='Last Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pr={2.5} pb={2.5}>
                                    <Input name='email'
                                        label='Email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                        description=''
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} pl={2.5} pb={2.5}>
                                    <Input
                                        name='phoneNumber'
                                        label='Phone Number'
                                        type='text'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                        description=''
                                    />
                                </Grid>
                                <Grid item md={12} mt={2} mb={4}>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        sx={{ display: "flex", alignItems: "center" }}
                                        onClick={() => {
                                            console.info("I'm a button.");
                                        }}
                                    >
                                        <Add />
                                        <Typography variant="h3" component="h3" className="fw-bold MuiTypography-h5-primary" mb={1}>
                                            ADD AP CONTACT
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                        Import Contract (Optional)
                                    </Typography>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Box className="import-file">
                                        <FileCopy />
                                        <Typography variant="h4" component="h4" display={"inline-flex"} className="fw-bold pl-3" mb={1}>
                                            Import Contract (Optional)
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item md={12} mt={2} mb={1}>
                                    <Box className="form-action-section">
                                        <Button
                                            types="cancel"
                                            aria-label="cancel"
                                            className="mr-4"
                                            onClick={() => { }}
                                        >
                                            {t("buttons.cancel")}
                                        </Button>
                                        <Button
                                            type="submit"
                                            types="save"
                                            aria-label="save"
                                            className="ml-4"
                                        >
                                            {t("buttons.save")}
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </Grid>
            </Grid>
        </Box >
    );
};

AddCustomer.propTypes = {

};

export default AddCustomer;