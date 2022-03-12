import { Fragment, useState } from 'react';
import { Grid, Divider } from "@mui/material";
import './InfoViewUI.scss';

type props = {
    data: any
}

export default function TripleColSection({ data }: props) {
    return (
        <Fragment>
            {data?.data && <div>
                <h4>{data.heading} </h4>
                {Object.entries(data?.data).map(([key, value]: any[]) =>
                    <div key={key}>
                        <Grid container item xs={12} spacing={2} key={value.key}>
                            <Grid item xs={4} className="right_info_panel_content_label">
                                {value.key}
                                {value.subKey && <div>{value.subKey} </div>}
                            </Grid>
                            <Grid item xs={4} className="right_info_panel_content_label">
                                {<>{value.midValue ? value.midValue : "-"}</>}
                            </Grid>
                            <Grid item xs={4} className="right_info_panel_content_label">
                                {<>{value.endValue ? value.endValue : "-"}</>}
                            </Grid>
                        </Grid>
                        <Divider className="right_info_panel_content_item_divider" />
                    </div>)}
            </div>}
        </Fragment>
    );
}