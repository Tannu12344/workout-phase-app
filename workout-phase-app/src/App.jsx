// src/App.jsx
import React from "react";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { CssBaseline, Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./components/PersonalDashboard";
import About from "./pages/About";
import WorkoutSuggestions from "./components/WorkoutSuggestions";
import CycleTracker from "./components/CycleTracker";
import "./App.css";

function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="app-layout">
        <Header />
        <main className="app-content">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/workout-suggestions" element={<WorkoutSuggestions />} />
              <Route path="/cycle-tracker" element={<CycleTracker />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
