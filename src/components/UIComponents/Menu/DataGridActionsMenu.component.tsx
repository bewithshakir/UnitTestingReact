import { Button, ListItemIcon, SvgIcon, Typography } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import React from "react";
import { DataGridActionIcon } from '../../../assets/icons';
import './DataGridActionsMenu.style.scss';
import {
  ExportIcon,
  PlusIcon,
  DeleteIcon,
  ImportIcon,
} from "../../../assets/icons";

export type DataGridActionsMenuOption = {
  action?: string;
  label: string;
  icon?: React.ReactNode | string;
  color?: string;
}

interface DataGridActionsMenuProps {
  options?: DataGridActionsMenuOption[],
  menuName?: string,
  onSelect?: (e: React.SyntheticEvent, selectedValue: DataGridActionsMenuOption) => void,
}
export default function DataGridActionsMenu (props: DataGridActionsMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { options, onSelect } = props;

  const handleToggle = (e: React.MouseEvent<EventTarget>) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
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

  const renderIcons = (iconName: string) => {
    switch (iconName) {
      case "ExportIcon":
        return (<ExportIcon />);
      case "PlusIcon":
        return (<PlusIcon />);
      case "DeleteIcon":
        return (<DeleteIcon />);
      case "ImportIcon":
        return (<ImportIcon />);
      default:
        return null;
    }
  };

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
        placement="bottom-end"
        disablePortal
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
                      // disabled={index === 3}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {
                        option.icon &&
                        <ListItemIcon className="menuitem-icon">
                          {
                            typeof option.icon === "string" ? renderIcons(option.icon) : option.icon
                          }
                        </ListItemIcon>
                      }
                      <div className="menuitem-text">
                        <Typography variant="inherit">{option.label}</Typography>
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
