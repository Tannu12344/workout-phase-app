import React from "react";
import { Card, Typography, Button } from "@mui/material";
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
    <div className="dashboard-container">
      {/* 🌸 Dashboard Header */}
      <section className="dashboard-hero">
        <h1>Welcome Back 🌷</h1>
        <p>Your personalized wellness and workout overview</p>
      </section>

      {/* 🌿 Overview Section */}
      <section className="dashboard-overview">
        <Card className="dashboard-card">
          <Typography variant="h6" className="dashboard-title">
            Next Period
          </Typography>
          <Typography>
            {nextPeriodDate
              ? `${nextPeriodDate} (${daysRemaining} days left)`
              : "Not set yet"}
          </Typography>
        </Card>

        <Card className="dashboard-card">
          <Typography variant="h6" className="dashboard-title">
            Current Phase
          </Typography>
          <Typography>{currentPhase || "Unknown"}</Typography>
        </Card>

        <Card className="dashboard-card">
          <Typography variant="h6" className="dashboard-title">
            Workout Streak
          </Typography>
          <Typography>{streak || 0} Days 🔥</Typography>
        </Card>
      </section>

      {/* 🏋️ Workout Summary */}
      <section className="dashboard-section">
        <h3>🏋️ Weekly Progress</h3>
        <p>
          You’ve completed <strong>{workoutsThisWeek}</strong> out of{" "}
          <strong>{weeklyGoal}</strong> workouts this week.
        </p>
      </section>

      {/* ⚡ Quick Actions */}
      <section className="dashboard-section">
        <h3>⚡ Quick Actions</h3>
        <div className="quick-actions">
          <Button variant="contained" color="primary">
            Add Workout
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => (window.location.href = "/cycle-tracker")}
          >
            Open Tracker
          </Button>
        </div>
      </section>

      {/* 🌙 Quote */}
      <section className="dashboard-quote">
        <Typography variant="body1">
          “Listen to your body. Every phase is a chance to grow stronger.” 💫
        </Typography>
      </section>
    </div>
  );
}

export default PersonalDashboard;
