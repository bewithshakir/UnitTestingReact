import React, {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";

import Backdrop from '@mui/material/Backdrop';
import { Drawer, IconButton, AppBar, Toolbar, Box } from "@mui/material";

import Select from "../Select/dropdown";
import DatePicker from "../DatePicker/DatePicker.component";
import  {CloseIcon} from "../../../assets/icons";
import "./CustomerFilterPanel.style.scss";

interface InfoPanelProps {
  open: boolean;
  onClose: (...args: any[]) => void;
}

export const CustomerFilterPanel: React.FC<InfoPanelProps> = ({ open, onClose }) => {

  const [form, setForm] = useState({ state: "", city: "", settlementType:"" });
  const { t, i18n } = useTranslation();
    
  const geoData = {
    states : [
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

  const handleSelect = (e: any) => setForm(x => ({ ...x, [e.target.name]: e.target.value }));

  return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
    <Drawer
      className="customer_filter_panel"
      variant="permanent"
      anchor="right" 
      open={open}>
      <div className="customer_filter_panel_header">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{'backgroundColor':'var(--Blue-Btn)'}}>
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
      <div className="customer_filter_panel_content">
        <div className="filter_panel_field_box">
          <Select
              name='state'
              label='Select State'
              value={form.state}
              placeholder=''
              items={geoData.states}
              onChange={handleSelect}
              multiple
          />
        </div>
        <div className="filter_panel_field_box">
          <Select
            name='city'
            label='Select City'
            value={form.city}
            placeholder=''
            items={geoData.cities}
            onChange={handleSelect}
            multiple
          />
        </div>
        <div className="filter_panel_field_box">
          <Select
            name='settlement-type'
            label='Settlement Type'
            value={form.settlementType}
            placeholder=''
            items={settlementTypes}
            onChange={handleSelect}
            multiple
          />
        </div>
        <div className="filter_panel_field_box">
          <DatePicker label="From" name="from" />
        </div>
      </div>
    </Drawer>
    </Backdrop>
  );
}
