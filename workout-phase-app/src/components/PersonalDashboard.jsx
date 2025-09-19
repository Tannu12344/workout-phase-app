// src/components/PersonalDashboard.jsx
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import "./PersonalDashboard.css";

function PersonalDashboard({
  nextPeriodDate,
  currentPhase,
  daysRemaining,
  workoutsThisWeek,
  weeklyGoal,
  streak,
}) {
  return (
    <Card className="dashboard-card">
      <CardContent>
        <Typography variant="h6" className="dashboard-title" gutterBottom>
          Personal Dashboard
        </Typography>

        {/* Cycle Summary */}
        <div className="dashboard-section">
          <h3>🌸 Cycle Summary</h3>
          <p>
            Next Period:{" "}
            {nextPeriodDate
              ? `${nextPeriodDate} (${daysRemaining} days left)`
              : "Not set yet"}
          </p>
          <p>Current Phase: {currentPhase || "Unknown"}</p>
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
              onClick={() => (window.location.href = "/cycle-tracker")}
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
