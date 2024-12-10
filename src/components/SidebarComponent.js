import React from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const SidebarMenu = ({ location }) => (
  <List>
    <ListItemButton
      component={RouterLink}
      to="/"
      selected={location.pathname === "/"}
    >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>

    <ListItemButton
      component={RouterLink}
      to="/create-user"
      selected={location.pathname === "/create-user"}
    >
      <ListItemIcon>
        <AddIcon />
      </ListItemIcon>
      <ListItemText primary="Create User" />
    </ListItemButton>
  </List>
);

const SidebarComponent = ({
  open,
  toggleDrawer,
  location,
  isMobile,
  theme,
}) => {
  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={toggleDrawer}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: open ? 240 : theme.spacing(7),
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          ...(isMobile
            ? {
                paddingTop: "60px",
              }
            : {
                overflowX: "hidden",
                width: open ? 240 : theme.spacing(7),
                [theme.breakpoints.up("sm")]: {
                  width: open ? 240 : theme.spacing(9),
                },
              }),
        },
      }}
    >
      {!isMobile && (
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          {open && (
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          )}
        </Toolbar>
      )}
      <Divider />
      <SidebarMenu location={location} />
    </Drawer>
  );
};

export default SidebarComponent;
