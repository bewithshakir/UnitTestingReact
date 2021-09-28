import HorizontalBar from '../components/UIComponents/NavigationBar/HorizontalBar';
import { useHistory } from 'react-router-dom';
import { Box, Container, CssBaseline, Grid, Typography } from '@mui/material';
import Input from '../components/UIComponents/Input/Input';
import Select from '../components/UIComponents/Select/dropdown';
import { useState } from 'react';
import Legend from './Legend/index';



const AddCustomer = (props: any) => {
    const [form, setForm] = useState({ customerName: '', customerId: '', email: '', item: [], addressLine1: '', addressLine2: '', city: '' });
    const items = [
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

    const handleChange = (e: any) => setForm(x => ({ ...x, [e.target.name]: e.target.value }));
    return (
        <Box display="flex" mt={8}>
            <CssBaseline />
            <HorizontalBar
                version={props.version}
                onBack={onClickBack}
            />

            <Grid container mt={1} ml={6.25}>
                <Grid item md={2} xs={2} pr={2} bgcolor="var(--Lightgray_3)">
                    <Legend />
                </Grid>
                <Grid item md={10} xs={10} pl={2} bgcolor="var(--Lightgray_4)">
                    <Container maxWidth="lg" sx={{ margin: "0px" }}>
                        <Typography variant="h3" component="h3" gutterBottom className="fw-bold" mb={1}>
                            Customer Profile
                        </Typography>
                        <Grid container mt={1}>
                            <Grid item md={12} mt={2} mb={1}>
                                <Typography variant="h4" component="h4" gutterBottom className="fw-bold" mb={1}>
                                    General Information
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name='customerName'
                                    label='Customer Name'
                                    type='text'
                                    onChange={handleChange}
                                    value={form.customerName}
                                    description=''
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* <Input name='email'
                                    label='Email'
                                    onChange={handleChange}
                                    value={form.email}
                                    description=''
                                    required
                                /> */}
                                <Input
                                    name='email'
                                    label='Customer ID'
                                    onChange={handleChange}
                                    value={form.customerId}
                                    description=''
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name='addressLine1'
                                    label='ADDRESS LINE 1'
                                    type='text'
                                    onChange={handleChange}
                                    value={form.addressLine1}
                                    description=''
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name='addressLine2'
                                    label='ADDRESS LINE 2'
                                    type='text'
                                    onChange={handleChange}
                                    value={form.addressLine2}
                                    description=''
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Input name='city'
                                    label='City'
                                    type='text'
                                    onChange={handleChange}
                                    value={form.city}
                                    description=''
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid item md={4}>
                                    <Select
                                        name='item'
                                        label='Select item'
                                        value={form.item}
                                        placeholder='Choose'
                                        items={items}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <Select
                                        name='item'
                                        label='Select item'
                                        value={form.item}
                                        placeholder='Choose'
                                        items={items}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* <Select
                            name='item'
                            label='Select item'
                            value={form.item}
                            placeholder='Choose'
                            items={items}
                            onChange={handleChange}
                        /> */}
                    </Container>
                </Grid>
            </Grid>
        </Box >
    );
};

AddCustomer.propTypes = {

};

export default AddCustomer;