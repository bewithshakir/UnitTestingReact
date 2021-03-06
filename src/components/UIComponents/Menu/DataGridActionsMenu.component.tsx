import { Button, ListItemIcon, SvgIcon } from "@material-ui/core";
import React, { forwardRef, useImperativeHandle } from "react";
import { DataGridActionIcon } from '../../../assets/icons';
import './DataGridActionsMenu.style.scss';
import { Icon, Typography, Grow, MenuItem, MenuList, Paper, Popper, ClickAwayListener } from '@mui/material';

export type DataGridActionsMenuOption = {
  action?: string;
  label: string;
  icon?: React.ReactNode | any;
  color?: string;
}

type DataGridActionsMenuProps = {
  options?: DataGridActionsMenuOption[],
  menuName?: string,
  disablePortal?: boolean,
  onSelect?: (e: React.SyntheticEvent, selectedValue: DataGridActionsMenuOption) => void,
  showInnerTableMenu?: boolean
}

export type RowActionHanddlerRef = {
  closeMenu: () => void,
};

const renderListItemIcon = (option: DataGridActionsMenuOption) => (
  option.icon &&
  <ListItemIcon className="menuitem-icon">
    {
      React.isValidElement(option.icon) ?
        option.icon
        :
        <Icon sx={{ height: "14px", width: "14px" }} component={option.icon} />
    }
  </ListItemIcon>
);

const DataGridActionsMenu = forwardRef<RowActionHanddlerRef, DataGridActionsMenuProps>((props, parentRef) => {
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { options, onSelect } = props;

  useImperativeHandle(parentRef, () => ({
    closeMenu () {
      if (open) {
        setOpen(false);
      }
    },
  }));

  const handleToggle = () => {
    setOpen((prevOpenState) => !prevOpenState);
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

  let activeClssName = '';
  let ariaControlStr = undefined;
  let ariaExpandedStr = undefined;

  if (open) {
    activeClssName = 'active';
    ariaControlStr = 'datagrid-actions-menu-list';
    ariaExpandedStr = true;
  }
  return (
    <div>
      <Button
        ref={anchorRef}
        variant="contained"
        className={`btn-grid-action ${activeClssName}`}
        aria-controls={ariaControlStr}
        aria-expanded={ariaExpandedStr}
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
        disablePortal={props.disablePortal}
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
                  {options?.map((option, index) => (
                    <MenuItem
                      key={option.label}
                      className={"menuitem"}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {renderListItemIcon(option)}
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
});

DataGridActionsMenu.defaultProps = {
  showInnerTableMenu: false,
  disablePortal: false
};

export default DataGridActionsMenu;