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

type DataGridActionsMenuOption = {
  label: string;
  icon?: React.ReactNode;
  color?: string;
}

interface DataGridActionsMenuProps {
  options: DataGridActionsMenuOption[],
  menuName?: string,
  onSelect: (selectedValue: object) => void,
}
export default function DataGridActionsMenu(props: DataGridActionsMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { options, onSelect } = props

  const handleToggle = () => {
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

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    onSelect(options[index]);
    setOpen(false);
  };


  function handleListKeyDown(event: React.KeyboardEvent) {
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
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      className={"menuitem"}
                      // disabled={index === 3}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {
                        option.icon &&
                        <ListItemIcon className="menuitem-icon" >
                          option.icon
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
