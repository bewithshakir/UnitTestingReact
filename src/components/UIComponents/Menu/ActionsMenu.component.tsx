import { Button, ListItemIcon, SvgIcon } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import React from "react";
import { ActionsListIcon } from '../../../assets/icons';
import './ActionsMenu.style.scss';
import { Icon, Typography } from '@mui/material';


type ActionsMenuOption = {
  action?: string;
  label: string;
  icon?: React.ReactNode | any;
  color?: string;
}

interface ActionsMenuProps {
  options: ActionsMenuOption[],
  menuName?: string,
  onSelect: (selectedValue: any) => void,
}
export default function ActionsMenu (props: ActionsMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { options, onSelect } = props;

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
        className={`btn-listmemu ${open ? 'active' : ''}`}
        aria-controls={open ? "actions-menu-list" : undefined}
        aria-haspopup="true"
        aria-label="actions menu list"
        onClick={handleToggle}
        size="small"
        startIcon={<SvgIcon component={ActionsListIcon} viewBox="0 0 20 20" />}
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        className={"actions-popper"}
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
                  className="actions-menu"
                  autoFocusItem={open}
                  id="actions-menu-list"
                  onKeyDown={handleListKeyDown}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      className={"menuitem"}
                      disabled={index === 3}
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
