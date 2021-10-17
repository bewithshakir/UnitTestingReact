import React, { useState, useEffect } from 'react';
import './TimePicker.style.scss';
import { Paper, Grid } from '@mui/material';
import { Button } from '../Button/Button.component';
import moment from 'moment';
import {timeFormatStr, AM, PM} from './config';




type timeMer = 'AM' | 'PM' | '';

interface TimeBoxProps {
    hour: number | null,
    minute: number | null,
    merd: string | timeMer,
    onClose: (...args: any) => void;
    applyTimeStr: (...args: any) => void;
}



export const TimeBox: React.FC<TimeBoxProps> = ({ applyTimeStr, onClose, hour, minute, merd }) => {
    const [timeStrVal, setTimeStrVal] = useState<string>('');
    const [merdVal, setMerdVal] = useState<string>('');
    
    useEffect(() => {
        console.warn("check time->", ('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2));
        setTimeStrVal(('0' + hour).slice(-2) + ':' + ('0' + minute).slice(-2));
        setMerdVal(merd.toUpperCase());
    }, [hour, minute, merd]);

    const generateTimeArray = () => {
        const x = 30;
        const times: any[] = [];
        let tt = 0;
        const arr = [];
        for (let i = 0; tt < 12 * 60; i++) {
            const hh = Math.floor(tt / 60);
            const mm = (tt % 60);
            const wrappedHH = ("0" + ((hh == 12) ? "12" : (hh % 12 == 0 ? "12" : hh % 12))).slice(-2);
            const wrappedMM = ("0" + mm).slice(-2);
            times[i] = wrappedHH + ':' + wrappedMM;
            arr.push(<div
                className={`h-m-value-box ${timeStrVal === times[i] ? 'selected' : ''}`}
                key={i}
                onClick={(e) => selectTimeStr(e, hh, mm, times[i])}
            >
                {times[i]}
            </div>);
            tt = tt + x;
        }
        return <div className=''>{arr}</div>;

    };

    const selectTimeStr = (e: any, hh: number, mm: number, timeStr: string | '') => {

        setTimeStrVal(timeStr);
        applyTimeStr(moment(`${timeStr} ${merdVal?merdVal:AM}`,timeFormatStr).format(timeFormatStr));
        if (merdVal && timeStr) {
            onClose();
        }
    };

    const selectMeridian = (e: any, mer: string) => {
        setMerdVal(mer);
        applyTimeStr(moment(`${timeStrVal?timeStrVal:'12:00'} ${mer}`,timeFormatStr).format(timeFormatStr));
        if (mer && timeStrVal) {
            onClose();
        }
    };

    return (
        <div className={`time-div`}>
            <Paper>
                <Grid container spacing={1}>
                    <Grid item>
                        <div className='hm-box'>
                            {generateTimeArray()}
                        </div>

                    </Grid>
                    <Grid item>
                        <div className="meridiem-div"><Button types={merdVal === AM ? 'primary' : 'cancel'} onClick={(e) => selectMeridian(e, AM)} className="">{AM}</Button></div>
                        <div className="meridiem-div"><Button types={merdVal === PM ? 'primary' : 'cancel'} onClick={(e) => selectMeridian(e, PM)} className="">{PM}</Button></div>
                    </Grid>
                </Grid >
            </Paper>
        </div >
    );
};

