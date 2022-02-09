import { Button, ListItemIcon, SvgIcon } from "@material-ui/core";
import React from "react";
import { DataGridActionIcon } from '../../../assets/icons';
import './DataGridActionsMenu.style.scss';
import { Icon, Typography, Grow, MenuItem, MenuList, Paper, Popper, ClickAwayListener } from '@mui/material';

export type DataGridActionsMenuOption = {
  action?: string;
  label: string;
  icon?: React.ReactNode | any;
  color?: string;
}

interface DataGridActionsMenuProps {
  options?: DataGridActionsMenuOption[],
  menuName?: string,
  onSelect?: (e: React.SyntheticEvent, selectedValue: DataGridActionsMenuOption) => void,
  showInnerTableMenu?: boolean
}
export default function DataGridActionsMenu (props: DataGridActionsMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { options, onSelect } = props;

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  const handleMenuItemClick = (event: React.SyntheticEvent, index: number) => {
    event.stopPropagation();
    setSelectedIndex(index);
    onSelect && options && onSelect(event, options[index]);
    setOpen(false);
  };

  function handleListKeyDown (event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Button
        ref={anchorRef}
        variant="contained"
        className={`btn-grid-action ${open ? 'active' : ''}`}
        aria-controls={open ? "datagrid-actions-menu-list" : undefined}
        aria-label="datagrid actions menu list"
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={<SvgIcon component={DataGridActionIcon} viewBox="0 0 40 40" />}
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        className={"datagrid-actions-popper"}
        placement={"bottom-end"}
        modifiers={
          [
            {
              name: 'flip',
              enabled: true,
              options: {
                altBoundary: true,
                rootBoundary: 'viewport',
              },
            },
            {
              name: 'preventOverflow',
              enabled: true,
              options: {
                altAxis: true,
                altBoundary: true,
                rootBoundary: 'viewport',
              },
            }
          ]
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "top-start" ? "bottom" : "top"
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  className="datagrid-actions-menu"
                  autoFocusItem={open}
                  id="datagrid-actions-menu-list"
                  onKeyDown={handleListKeyDown}
                >
                  {options && options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      className={"menuitem"}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {
                        option.icon &&
                        <ListItemIcon className="menuitem-icon">
                          {
                            React.isValidElement(option.icon) ?
                              option.icon
                              :
                              <Icon sx={{ height: "14px", width: "14px" }} component={option.icon} />
                          }
                        </ListItemIcon>
                      }
                      <div className="menuitem-text">
                        <Typography color="var(--Darkgray)" variant="inherit">{option.label}</Typography>
                      </div>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div >
  );
}

DataGridActionsMenu.defaultProps = {
  showInnerTableMenu: false
};
