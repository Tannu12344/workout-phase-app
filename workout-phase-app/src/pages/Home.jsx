import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import "./Home.css";

function Home({ nextPeriodDate, currentPhase, streak }) {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to FlowFit 🌸</h1>
        <p>Track your cycle. Align your workouts. Embrace your flow.</p>
        <Button variant="contained" color="primary" component={Link} to="/cycle-tracker">
          Start Tracking
        </Button>
      </section>

      <section className="overview">
        <Card><Typography variant="h6">Next Period</Typography><Typography>{nextPeriodDate || "Not set"}</Typography></Card>
        <Card><Typography variant="h6">Current Phase</Typography><Typography>{currentPhase || "Unknown"}</Typography></Card>
        <Card><Typography variant="h6">Workout Streak</Typography><Typography>{streak || 0} Days 🔥</Typography></Card>
      </section>

      <section className="features">
        <h2>✨ What You Can Do</h2>
        <ul>
          <li>🩸 Track your menstrual cycle</li>
          <li>🏋️ Plan workouts by your phase</li>
          <li>🧘 Maintain balance with self-care</li>
        </ul>
      </section>

      <section className="quote">
        <Typography variant="body1">
          “Your cycle is your rhythm. Move with it, not against it.” 🌙
        </Typography>
      </section>

      <section className="cta-buttons">
        <Button variant="contained" color="secondary" component={Link} to="/dashboard">Go to Dashboard</Button>
        <Button variant="outlined" color="primary" component={Link} to="/workout-suggestions">Workout Ideas</Button>
        <Button variant="contained" color="success" component={Link} to="/cycle-tracker">Open Tracker</Button>
      </section>
    </div>
  );
}

export default Home;
