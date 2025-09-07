import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import "./Header.css";

function Header() {
  return (
    <AppBar position="fixed" className="app-bar" elevation={0}
      sx={{ background: "linear-gradient(90deg, #ff6f91 0%, #ffb6b9 100%)" }}
>

      <Toolbar className="toolbar">
        <Typography variant="h6" className="header-title">
          FlowFit
        </Typography>
        <Box className="header-buttons">
          <Button component={Link} to="/">
            Home
          </Button>
          <Button component={Link} to="/dashboard">
            Dashboard
          </Button>
          <Button component={Link} to="/calendar">
            Calendar
          </Button>
          <Button component={Link} to="/workout-suggestions">
            Workout Suggestions
          </Button>
          <Button component={Link} to="/cycle-tracker">
            Cycle Tracker
          </Button>
          <Button component={Link} to="/about">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
