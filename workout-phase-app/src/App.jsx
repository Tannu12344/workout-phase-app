// src/App.jsx
import React, { useState } from "react";
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
  const [nextPeriodDate, setNextPeriodDate] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(null);
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [workoutsThisWeek, setWorkoutsThisWeek] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(5);
  const [streak, setStreak] = useState(0);

  return (
    <Router>
      <CssBaseline />
      <div className="app-layout">
        <Header />
        <main className="app-content">
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    nextPeriodDate={nextPeriodDate}
                    currentPhase={currentPhase}
                    daysRemaining={daysRemaining}
                    workoutsThisWeek={workoutsThisWeek}
                    weeklyGoal={weeklyGoal}
                    streak={streak}
                  />
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/workout-suggestions" element={<WorkoutSuggestions />} />
              <Route
                path="/cycle-tracker"
                element={
                  <CycleTracker
                    setNextPeriodDate={setNextPeriodDate}
                    setCurrentPhase={setCurrentPhase}
                    setDaysRemaining={setDaysRemaining}
                    setWorkoutsThisWeek={setWorkoutsThisWeek}
                    setWeeklyGoal={setWeeklyGoal}
                    setStreak={setStreak}
                  />
                }
              />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
