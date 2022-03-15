import { Fragment } from 'react';
import { Grid, Divider } from "@mui/material";
import './InfoViewUI.scss';

type props = {
    data: any
}

export default function TripleColSection({ data }: props) {
    return (
        <Fragment>
            {data?.data && <div className="sectionBox">
                <h4>{data.heading} </h4>
                {Object.entries(data?.data).map(([key, value]: any[]) =>
                    <div key={key}>
                        <Grid container item xs={12} spacing={2} key={value.key}>
                            <Grid item xs={4} className="sectionRowLabel tripleColSectionRowLabel">
                                {value.key}
                                {value.subKey && <div className='subKey'>{value.subKey} </div>}
                            </Grid>
                            <Grid item xs={4} className="sectionRowValue sectionRowMidValue">
                                {<>{value.midValue ? (`$${value.midValue}/gal`) : "-"}</>}
                            </Grid>
                            <Grid item xs={4} className="sectionRowValue tripleColSectionRowValue">
                                {<>{value.endValue ? value.endValue : "-"}</>}
                            </Grid>
                        </Grid>
                        <Divider className="sectionRowDivider" />
                    </div>)}
            </div>}
        </Fragment>
    );
}