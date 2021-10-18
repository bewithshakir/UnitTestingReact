import React, { useEffect } from 'react';
import './TimePicker.style.scss';
import { Paper, Grid } from '@mui/material';
import { Button } from '../Button/Button.component';
import {AM, PM, defaultTimeDiff} from './config';
// import { useTimePickerScrollRefStore } from "../../../store";

type timeMer = 'AM' | 'PM' | '';

interface TimeBoxProps {
    merd: string | timeMer,
    onClose: (...args: any) => void;
    applyTimeStr: (...args: any) => void;
    timeStrVal: string | '';
    timeDiffMins?: number;
}

let matchedRefIndex:any = null;

export const TimeBox: React.FC<TimeBoxProps> = ({ applyTimeStr, onClose, merd , timeStrVal, timeDiffMins}) => {
    const lineRefs:any[] = [];

    useEffect(() => {
        if(matchedRefIndex){
            scrollToRef(matchedRefIndex);    
        }
      }, [timeStrVal]);

    const generateTimeDivStack = () => {
        const times: any[] = [];
        let tt = 0;
        const arr = [];
        for (let i = 0; tt < 12 * 60; i++) {
            const hh = Math.floor(tt / 60);
            const mm = (tt % 60);
            const wrappedHH = ("0" + ((hh == 12) ? "12" : (hh % 12 == 0 ? "12" : hh % 12))).slice(-2);
            const wrappedMM = ("0" + mm).slice(-2);
            times[i] = wrappedHH + ':' + wrappedMM;
            lineRefs.push(lineRefs[i] ?? React.createRef());
            if(timeStrVal === times[i]){
                matchedRefIndex=i;
            }
            arr.push(<div
                className={`h-m-value-box ${timeStrVal === times[i] ? 'selected' : ''}`}
                key={i}
                ref={lineRefs[i]}
                onClick={() => selectTimeStr(hh, mm, times[i])}
            >
                {times[i]}
            </div>);
            tt = timeDiffMins? tt + timeDiffMins: tt + defaultTimeDiff;
        }
        return <div className=''>{arr}</div>;
    };

    const scrollToRef = (ref:any) => {
        if(ref && lineRefs[ref] && lineRefs[ref].current){
            lineRefs[ref].current.scrollIntoView({ behavior: "smooth" , block: 'nearest', inline: 'start'});
        }
    };    

    const selectTimeStr = (hh: number, mm: number, timeStr: string | '') => {
        applyTimeStr(timeStr, merd);
        if (merd && timeStr) {
            onClose();
        }
    };

    const selectMeridian = (mer: string) => {
        applyTimeStr(timeStrVal, mer);
        if (merd && timeStrVal) {
            onClose();
        }
    };

    return (
        <div className={`time-div`}>
            <Paper>
                <Grid container spacing={1}>
                    <Grid item>
                        <div className='hm-box'>
                            {generateTimeDivStack()}
                        </div>
                    </Grid>
                    <Grid item>
                        <div className="meridiem-div"><Button types={merd === AM ? 'primary' : 'cancel'} onClick={() => selectMeridian(AM)} className="">{AM}</Button></div>
                        <div className="meridiem-div"><Button types={merd === PM ? 'primary' : 'cancel'} onClick={() => selectMeridian(PM)} className="">{PM}</Button></div>
                    </Grid>
                </Grid >
            </Paper>
        </div >
    );
};

