import React from "react";
import CalenderView from "../components/CalenderView";
import WorkoutSuggestions from "../components/WorkoutSuggestions";
import CycleTracker from "../components/CycleTracker";
import PersonalDashboard  from "../components/PersonalDashboard";
import "./Header.css";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Header() {
  return (
    <AppBar position="static" className="app-bar" elevation={0}>
      <Toolbar className="toolbar">
        <Typography variant="h6" className="header-title">
          FlowFit
        </Typography>
        <Box className="header-buttons">
          <Button>Home</Button>
          <Button>Dashboard</Button>
          <Button>About</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;