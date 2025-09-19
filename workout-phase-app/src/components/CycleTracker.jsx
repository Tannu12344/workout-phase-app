// src/components/CycleTracker.jsx
import React, { useState, useEffect } from "react";
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

function CycleTracker({
  setNextPeriodDate,
  setCurrentPhase,
  setDaysRemaining,
  setWorkoutsThisWeek,
  setWeeklyGoal,
  setStreak,
}) {
  const [periodStart, setPeriodStart] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [cycleLength, setCycleLength] = useState(28);
  const [selectedDate, setSelectedDate] = useState(null);
  const [predictedCycles, setPredictedCycles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPhaseState, setCurrentPhaseState] = useState(null);
  const [pendingEditDate, setPendingEditDate] = useState(null);

  useEffect(() => {
    const storedDate = localStorage.getItem("periodStart");
    const storedCycleLength = localStorage.getItem("cycleLength");

    if (storedDate) {
      setPeriodStart(storedDate);
      const startDate = new Date(storedDate);
      setSelectedDate(startDate);
      setShowCalendar(true);

      let cycles = [];
      const length = storedCycleLength ? Number(storedCycleLength) : 28;
      for (let i = 0; i < 3; i++) {
        const nextCycle = new Date(startDate);
        nextCycle.setDate(startDate.getDate() + i * length);
        cycles.push(nextCycle);
      }
      setPredictedCycles(cycles);

      // 🔹 Update parent props
      setNextPeriodDate(cycles[1]?.toDateString());
      setDaysRemaining(Math.floor((cycles[0] - new Date()) / (1000 * 60 * 60 * 24)));
    }

    if (storedCycleLength) {
      setCycleLength(Number(storedCycleLength));
    }
  }, [setNextPeriodDate, setDaysRemaining]);

  const handleSubmit = () => {
    if (periodStart) {
      setShowCalendar(true);
      const startDate = new Date(periodStart);
      setSelectedDate(startDate);

      let cycles = [];
      for (let i = 0; i < 3; i++) {
        const nextCycle = new Date(startDate);
        nextCycle.setDate(startDate.getDate() + i * cycleLength);
        cycles.push(nextCycle);
      }
      setPredictedCycles(cycles);

      localStorage.setItem("periodStart", periodStart);
      localStorage.setItem("cycleLength", cycleLength.toString());

      // 🔹 Update parent props
      setNextPeriodDate(cycles[1]?.toDateString());
      setDaysRemaining(Math.floor((cycles[0] - new Date()) / (1000 * 60 * 60 * 24)));
    }
  };

  const handleDateClick = (date) => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date > tomorrow) return;

    setPendingEditDate(date);
  };

  const confirmEditDate = () => {
    if (!pendingEditDate) return;

    const newDate = pendingEditDate.toISOString().split("T")[0];
    setPeriodStart(newDate);
    setSelectedDate(pendingEditDate);

    let cycles = [];
    for (let i = 0; i < 3; i++) {
      const nextCycle = new Date(pendingEditDate);
      nextCycle.setDate(pendingEditDate.getDate() + i * cycleLength);
      cycles.push(nextCycle);
    }
    setPredictedCycles(cycles);

    localStorage.setItem("periodStart", newDate);
    localStorage.setItem("cycleLength", cycleLength.toString());

    // 🔹 Update parent props
    setNextPeriodDate(cycles[1]?.toDateString());
    setDaysRemaining(Math.floor((cycles[0] - new Date()) / (1000 * 60 * 60 * 24)));

    setPendingEditDate(null);
  };

  const cancelEditDate = () => {
    setPendingEditDate(null);
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
    setCurrentPhaseState(phase);
    setAnchorEl(event.currentTarget);
    setCurrentPhase(phase); // 🔹 update parent
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentPhaseState(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card className="cycle-tracker-card">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Cycle Tracker
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
            <Calendar
              tileClassName={tileClassName}
              prev2Label={null}
              next2Label={null}
              onClickDay={handleDateClick}
            />

            {pendingEditDate && (
              <div style={{ marginTop: "12px", textAlign: "center" }}>
                <Typography variant="body2" gutterBottom>
                  You clicked {pendingEditDate.toDateString()}.  
                  Do you want to set this as your new period date?
                </Typography>
                <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={confirmEditDate}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={cancelEditDate}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            <div className="legend-container">
              {["menstrual", "follicular", "ovulation", "luteal"].map((phase) => (
                <div
                  key={phase}
                  className="legend-item"
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span className={`legend-color ${phase}`}></span>
                  <Typography variant="body2">
                    {phase.charAt(0).toUpperCase() + phase.slice(1)}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleLegendClick(phase, e)}
                  >
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
                {currentPhaseState && (
                  <>
                    <Typography variant="subtitle1">
                      {phaseInfo[currentPhaseState].title}
                    </Typography>
                    <Typography variant="body2">
                      {phaseInfo[currentPhaseState].description}
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

