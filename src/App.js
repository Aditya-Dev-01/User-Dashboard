import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  CssBaseline,
  Box,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppBarComponent from "./components/AppBarComponent";
import SidebarComponent from "./components/SidebarComponent";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import CreateUserPage from "./pages/CreateUserPage";
import EditUserPage from "./pages/EditUserPage";

const App = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBarComponent toggleDrawer={toggleDrawer} open={open && !isMobile} />

      <SidebarComponent
        open={open}
        toggleDrawer={toggleDrawer}
        location={location}
        isMobile={isMobile}
        theme={theme}
      />

      <Box
        component="main"
        sx={{
          backgroundColor: theme.palette.background.default,
          flexGrow: 1,
          overflow: "auto",
          p: 3,
          marginTop: "64px",
        }}
      >
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/create-user" element={<CreateUserPage />} />
            <Route path="/edit-user/:id" element={<EditUserPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
