// src/App.jsx
import React from "react";
import Header from "./layouts/Header";
import { CssBaseline, Container, AppBar, Toolbar, Typography } from "@mui/material";
import {link} from "react-router-dom";
import "./App.css";


function App() {
  return (
    <>
      <CssBaseline /> {/* Reset default browser styles */}
      
      <Header/>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
     </>
  );
}

export default App;

