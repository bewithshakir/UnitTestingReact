import { Fragment, useState } from 'react';
import Select from '../Select/SingleSelect';
import { components, OptionProps, SingleValueProps } from 'react-select';
import {YellowFuelIcon, RedFuelIcon, GreenFuelIcon, NavyBlueFuelIcon } from '../../../assets/icons';

export default function ProductSingleSelect(props:any) {
    const [value, setValue] = useState(props.value);

    const getFuelIcon = (fuelStatus: string) => {
        return ({
            "Regular": <YellowFuelIcon />,
            "Premium": <RedFuelIcon />,
            "Diesel": <GreenFuelIcon />,
            "V-Power": <NavyBlueFuelIcon />,
        }[fuelStatus] || '');
    };

    const Option = (props: OptionProps<any>) => {
        return (
            <components.Option {...props}>
                <Fragment>
                    <div className='option_with_icon' >
                        {getFuelIcon(props.label)}
                        <label>{props.label}</label>
                    </div>
                </Fragment>
            </components.Option>
        );
    };

    const SingleValue = (props: SingleValueProps<any>) => (
        <components.SingleValue {...props}>
            <Fragment>
                <div className='container_with_icon'>
                    {getFuelIcon(props.data.label)}
                    <label>{props.data.label}</label>
                </div>
            </Fragment>
        </components.SingleValue>
    );

    const options = [
        { value: 'Regular', label: 'Regular' },
        { value: 'Premium', label: 'Premium' },
        { value: 'Diesel', label: 'Diesel' },
        { value: 'V-Power', label: 'V-Power' }
    ];

    return (
        <div className='tableSelect'>
            <Select
                value={value}
                items={options}
                onChange={(x: any, e: any) => {
                    setValue(e);
                }}
                components={{ SingleValue, Option }}
            />
        </div>
    );
}