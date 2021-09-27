import React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Drawer, IconButton, AppBar, Toolbar, Box, Grid, Backdrop } from "@mui/material";
import Select from "../Select/dropdown";
import { DatePicker } from "../DatePicker/DatePicker.component";
import { Button } from '../Button/Button.component';
import { CloseIcon } from "../../../assets/icons";
import "./CustomerFilterPanel.style.scss";

interface InfoPanelProps {
  open: boolean;
  onClose: (...args: any[]) => void;
}

export const CustomerFilterPanel: React.FC<InfoPanelProps> = ({ open, onClose }) => {
  const formInitial = { state: [], city: [], settlementType: [], startDate: null, endDate: null };
  const [form, setForm] = React.useState(formInitial);
  // const [form, setForm] = React.useState<{ state: string | Array<object>, city: string | Array<object>, settlementType: string | Array<object>, startDate: Date | string | null | moment.Moment, endDate: Date | string | null | moment.Moment }>(formInitial)

  
  const { t, i18n } = useTranslation();

  const geoData = {
    states: [
      { label: 'Alabama', value: 'Alabama' },
      { label: 'Alaska', value: 'Alaska' },
      { label: 'California', value: 'California' },
      { label: 'Virginia', value: 'Virginia' },
      { label: 'Florida', value: 'Florida' }
    ],
    cities: [
      { label: 'New York', value: 'New York' },
      { label: 'Los Angeles', value: 'Los Angeles' },
      { label: 'Chicago', value: 'Chicago' },
      { label: 'San Diego', value: 'San Diego' },
      { label: 'Houston', value: 'Houston' }
    ]
  }

  const settlementTypes = [
    { label: 'Invoice', value: 'Invoice' },
    { label: 'Voyager', value: 'Voyager' },
    { label: 'WEX', value: 'WEX' }
  ]

  const onDateChange = (name: string, newValue: Date | string | null | moment.Moment) => {
    setForm(x => ({ ...x, [name]: newValue }));
  }

  const handleSelect = (e: any) => {
    setForm(x => ({ ...x, [e.target.name]: e.target.value }));
  }

  const applyFilter = () => {
    console.log(form);
  }

  const clearFilter = () => {
    setForm(formInitial);
  }

  return (
    <Backdrop
      sx={{ color: "var(--White)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Drawer
        className="customer_filter_panel"
        variant="permanent"
        anchor="right"
        open={open}>
        <div className="cust_filter_panel_header">
          <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static" sx={{ 'backgroundColor': 'var(--Blue-Btn)' }}>
              <Toolbar variant="dense" className="custom-toolbar">
                <h2 style={{ flexGrow: 1 }}>
                  {t("customer-filter-panel.header.filter")}
                </h2>
                <IconButton
                  edge="start"
                  onClick={onClose}
                >
                  <CloseIcon className="customer_filter_panel_close_icon" color="var(--White)" />
                </IconButton>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
        <div className="cust_filter_panel_content">
          {/* {JSON.stringify(form)} */}
          <Grid container spacing={2} className="cust_filter_parent_grid">
            <Grid item xs={12} columnSpacing={{ xs: 1, sm: 2, md: 3 }} container>
              <Grid item xs={12} className="cust_filter_date_label_grid">
                Period
              </Grid>
              <Grid item xs={6} spacing={2}>
                <DatePicker
                  id="cust-filter-start-date"
                  placeholder="From Date" 
                  name="startDate" 
                  onChange={onDateChange} 
                  value={form.startDate} 
                />
              </Grid>
              <Grid item xs={6} spacing={2}>
              <DatePicker 
                id="cust-filter-end-date"
                disableBeforeDate={form.startDate} 
                placeholder="To Date" 
                name="endDate" 
                onChange={onDateChange} 
                value={form.endDate} 
              />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Select
                name='state'
                label='Select State'
                // value={form.state}
                placeholder=''
                items={geoData.states}
                onChange={handleSelect}
                multiple
                width="100%"
                // selectedValues={form.state}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                name='city'
                label='Select City'
                // value={form.city}
                placeholder=''
                items={geoData.cities}
                onChange={handleSelect}
                multiple
                width="100%"
                // selectedValues={form.city}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                name='settlementType'
                label='Settlement Type'
                // value={form.settlementType}
                placeholder=''
                items={settlementTypes}
                onChange={handleSelect}
                multiple
                // selectedValues={form.settlementType}
                width="100%"
              />
            </Grid>
          </Grid>
          <div className="cust_filter_buttons_container">
            < Button
              types="cancel"
              aria-label={t("customer-filter-panel.buttons.clear all")}
              onClick={clearFilter}
            >
              {t("customer-filter-panel.buttons.clear all")}
            </Button >
            <Button
              types="save"
              aria-label={t("customer-filter-panel.buttons.apply")}
              onClick={applyFilter}
            >
              {t("customer-filter-panel.buttons.apply")}
            </Button>
          </div>
        </div>
      </Drawer>
    </Backdrop>
  );
}
