// src/components/CycleTracker.jsx
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Popover,
  IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CycleTracker.css";

const phaseInfo = {
  menstrual: {
    title: "Menstrual Phase",
    description:
      "Period days. Low energy. Focus on light activities: yoga, stretching, walking. Rest if needed.",
  },
  follicular: {
    title: "Follicular Phase",
    description:
      "Energy rises. Great for cardio, strength training, or trying new workouts. Focus on skill-based activities.",
  },
  ovulation: {
    title: "Ovulation Phase",
    description:
      "Peak estrogen. High energy and strength. Ideal for HIIT and strength workouts. Watch joint stability.",
  },
  luteal: {
    title: "Luteal Phase",
    description:
      "Moderate energy. Best for moderate cardio, bodyweight exercises, and flexibility. Focus on consistent routines.",
  },
};

function CycleTracker() {
  const [periodStart, setPeriodStart] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [cycleLength, setCycleLength] = useState(28);
  const [selectedDate, setSelectedDate] = useState(null);
  const [predictedCycles, setPredictedCycles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(null);

  const handleSubmit = () => {
    if (periodStart) {
      setShowCalendar(true);
      const startDate = new Date(periodStart);
      setSelectedDate(startDate);

      // predict next 3 cycles
      let cycles = [];
      for (let i = 0; i < 3; i++) {
        const nextCycle = new Date(startDate);
        nextCycle.setDate(startDate.getDate() + i * cycleLength);
        cycles.push(nextCycle);
      }
      setPredictedCycles(cycles);
    }
  };

  const tileClassName = ({ date }) => {
    if (!showCalendar || predictedCycles.length === 0) return "default-day";

    for (let start of predictedCycles) {
      const diff = Math.floor((date - start) / (1000 * 60 * 60 * 24));

      if (diff >= 0 && diff <= 4) return "menstrual-day";
      if (diff >= 5 && diff <= 12) return "follicular-day";
      if (diff >= 13 && diff <= 16) return "ovulation-day";
      if (diff >= 17 && diff <= cycleLength - 1) return "luteal-day";
    }

    if (selectedDate && date.toDateString() === selectedDate.toDateString())
      return "selected-period-day";

    if (date.toDateString() === new Date().toDateString()) return "today";

    return "default-day";
  };

  const handleLegendClick = (phase, event) => {
    setCurrentPhase(phase);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentPhase(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card className="cycle-tracker-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
        </Typography>
        {!showCalendar ? (
          <>
            <Typography variant="body2" gutterBottom>
              Enter your last period start date to track your cycle.
            </Typography>
            <TextField
              type="date"
              value={periodStart}
              onChange={(e) => setPeriodStart(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              type="number"
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              fullWidth
              margin="normal"
              label="Average cycle length (days)"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              fullWidth
            >
              Show Calendar
            </Button>
          </>
        ) : (
          <>
            <Calendar tileClassName={tileClassName} prev2Label={null} next2Label={null} />

            <div className="legend-container">
              {["menstrual", "follicular", "ovulation", "luteal"].map((phase) => (
                <div key={phase} className="legend-item" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span className={`legend-color ${phase}`}></span>
                  <Typography variant="body2">
                    {phase.charAt(0).toUpperCase() + phase.slice(1)}
                  </Typography>
                  <IconButton size="small" onClick={(e) => handleLegendClick(phase, e)}>
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </div>
              ))}

              <div className="legend-item">
                <span className="legend-color selected-period-day"></span>
                <Typography variant="body2">Last Period</Typography>
              </div>
              <div className="legend-item">
                <span className="legend-color today"></span>
                <Typography variant="body2">Today</Typography>
              </div>
            </div>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <CardContent style={{ maxWidth: 300 }}>
                {currentPhase && (
                  <>
                    <Typography variant="subtitle1">
                      {phaseInfo[currentPhase].title}
                    </Typography>
                    <Typography variant="body2">
                      {phaseInfo[currentPhase].description}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Popover>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default CycleTracker;
