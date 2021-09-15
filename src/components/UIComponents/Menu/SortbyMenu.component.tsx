import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import CheckIcon from '@material-ui/icons/Check';
import MenuList from "@material-ui/core/MenuList";

import './SortbyMenu.style.scss';
import { useTranslation } from "react-i18next";
import { namespaces } from "../../../i18n/i18n.constants";
import { Button, ListItemIcon, Typography } from "@material-ui/core";


interface SortbyMenuProps {
  options: string[],
  menuName?: string,
  onSelect: (selectedValue: string) => void,
}
export default function SortbyMenu(props: SortbyMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { t } = useTranslation(namespaces.pages.simple);
  const { menuName, options, onSelect } = props

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
        color={undefined}
        className={`btn-sortby ${open ? 'active' : ''}`}
        aria-controls={open ? "sortby-menu-list" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        startIcon={<ArrowDownwardOutlinedIcon />}
      >
        {menuName || t("buttons.sort by")}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        className={"sortby-popper"}
        placement="bottom-start"
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
                  className="sortby-menu"
                  autoFocusItem={open}
                  id="sortby-menu-list"
                  onKeyDown={handleListKeyDown}
                >
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      className={"menuitem"}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      <div className="menuitem-text">
                        <Typography variant="inherit">{option}</Typography>
                      </div>
                      <ListItemIcon className="menuitem-icon" >
                        {index === selectedIndex ?
                          <CheckIcon fontSize="small" />
                          : null
                        }
                      </ListItemIcon>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
