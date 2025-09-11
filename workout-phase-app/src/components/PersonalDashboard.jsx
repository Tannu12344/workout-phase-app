import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // ✅ for navigation
import "./PersonalDashboard.css";

// Mock data (can later be fetched from local storage / API)
const nextPeriodDate = "Sept 25, 2025";
const currentPhase = "Luteal";
const daysRemaining = 10;
const workoutsThisWeek = 3;
const weeklyGoal = 5;
const streak = 3;

function PersonalDashboard() {
  const navigate = useNavigate();

  const handleOpenCalendar = () => {
    navigate("/cycle-tracker"); // ✅ goes to CycleTracker route
  };

  return (
    <Card className="dashboard-card">
      <CardContent>
        {/* Title */}
        <Typography variant="h6" className="dashboard-title" gutterBottom>
          Personal Dashboard
        </Typography>

        {/* Cycle Summary */}
        <div className="dashboard-section">
          <h3>🌸 Cycle Summary</h3>
          <p>
            Next Period: {nextPeriodDate} ({daysRemaining} days left)
          </p>
          <p>Current Phase: {currentPhase}</p>
        </div>

        {/* Workout Overview */}
        <div className="dashboard-section">
          <h3>🏋️ Workout Progress</h3>
          <p>
            Weekly Workouts: {workoutsThisWeek} / {weeklyGoal}
          </p>
          <p>Streak: {streak} days 🔥</p>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-section">
          <h3>⚡ Quick Actions</h3>
          <div className="quick-actions">
            <Button variant="contained" color="primary">
              Add Workout
            </Button>
            <Button variant="contained" color="secondary">
              Log Symptoms
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={handleOpenCalendar}
            >
              Open Calendar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonalDashboard;
