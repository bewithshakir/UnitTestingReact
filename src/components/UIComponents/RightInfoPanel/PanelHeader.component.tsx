import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, AppBar, Toolbar, Box } from '@mui/material';
import DataGridActionsMenu from '../Menu/DataGridActionsMenu.component';
import { CloseIcon } from '../../../assets/icons';
import './RightInfoPanel.style.scss';
import { useTheme } from '../../../contexts/Theme/Theme.context';
import { useNavigate } from 'react-router-dom';

interface InfoPanelProps {
  headingText: string;
  panelType: string;
  editURL?: string;
  nameStrForEdit?: string;
  onClose: (...args: any[]) => void;
}
export const PanelHeader: React.FC<InfoPanelProps> = ({
  headingText,
  panelType,
  onClose,
  editURL,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToViewEditPage = () => {
    if (editURL) {
      navigate(editURL);
    }
  };

  return (
    <div className='right_info_panel_header'>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar sx={{ bgcolor: theme['--Primary'] }} variant='dense'>
            {panelType === 'info-view' && (
              <IconButton edge='start' onClick={onClose}>
                <CloseIcon
                  className='info_panel_close_icon'
                  color='var(--White)'
                />
              </IconButton>
            )}
            <h2>{t(headingText)}</h2>
            {panelType === 'info-view' && (
              <DataGridActionsMenu
                disablePortal
                options={[
                  {
                    label: t('right-info-panel.settings.view & edit details'),
                  },
                ]}
                onSelect={navigateToViewEditPage}
              />
            )}
            {panelType === 'dynamic-filter' && (
              <IconButton edge='start' onClick={onClose} data-testid="closeIcon">
                <CloseIcon
                  className='info_panel_close_icon'
                  color='var(--White)'
                />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};
