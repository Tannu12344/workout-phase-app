// src/components/WorkoutSuggestions.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./WorkoutSuggestions.css";
const WORKOUT_LIBRARY = [
  // sample library; expand as desired
  {
    id: "w1",
    title: "Gentle Yoga Flow",
    duration: 20,
    intensity: "Low",
    muscles: ["Full Body", "Core"],
    phases: ["menstrual", "luteal"],
    goals: ["flexibility", "fat_loss"],
    equipment: "Mat",
    description: "Gentle sequence focusing on hip openers and breath — great for period days.",
  },
  {
    id: "w2",
    title: "Pilates Strength",
    duration: 30,
    intensity: "Medium",
    muscles: ["Core", "Glutes"],
    phases: ["follicular", "luteal"],
    goals: ["curvy_shaping", "flexibility"],
    equipment: "Mat",
    description: "Pilates-based core + glute focus for sculpting curves and improving posture.",
  },
  {
    id: "w3",
    title: "HIIT Blast",
    duration: 20,
    intensity: "High",
    muscles: ["Full Body", "Legs"],
    phases: ["ovulation", "follicular"],
    goals: ["fat_loss", "strength"],
    equipment: "None",
    description: "Short, intense intervals — great for peak-energy days.",
  },
  {
    id: "w4",
    title: "Moderate Cardio — Walk + Intervals",
    duration: 35,
    intensity: "Medium",
    muscles: ["Cardio"],
    phases: ["follicular", "luteal"],
    goals: ["fat_loss"],
    equipment: "None",
    description: "Low-impact intervals to keep heart rate elevated without strain.",
  },
  {
    id: "w5",
    title: "Bodyweight Strength (Home)",
    duration: 40,
    intensity: "Medium",
    muscles: ["Upper Body", "Lower Body", "Core"],
    phases: ["follicular", "ovulation", "luteal"],
    goals: ["strength", "curvy_shaping"],
    equipment: "None",
    description: "Compound bodyweight moves for functional strength and muscle tone.",
  },
  {
    id: "w6",
    title: "Short Core & Mobility",
    duration: 15,
    intensity: "Low",
    muscles: ["Core"],
    phases: ["menstrual", "luteal", "follicular"],
    goals: ["flexibility", "curvy_shaping"],
    equipment: "Mat",
    description: "Quick core work that is gentle on the body — great warmup or active recovery.",
  },
  {
    id: "w7",
    title: "Slow Strength with Bands",
    duration: 30,
    intensity: "Medium",
    muscles: ["Glutes", "Legs"],
    phases: ["follicular", "ovulation", "luteal"],
    goals: ["curvy_shaping", "strength"],
    equipment: "Resistance Band",
    description: "Slow, controlled reps to build glute/leg shape (use a band if available).",
  },
  {
    id: "w8",
    title: "Recovery Stretch + Breath",
    duration: 12,
    intensity: "Low",
    muscles: ["Full Body"],
    phases: ["menstrual"],
    goals: ["flexibility", "fat_loss"],
    equipment: "None",
    description: "Gentle mobility and breathwork to ease cramps and tension.",
  },
  // Add more workouts as needed...
];

/* Helper: localStorage keys */
const LS_KEYS = {
  FAVS: "wf_favorites_v1",
  TODAY: "wf_today_v1",
  DONE_COUNT: "wf_done_count_v1",
};

function loadLocal(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}
function saveLocal(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export default function WorkoutSuggestions({
  currentPhase = null,
  workoutsThisWeek,
  setWorkoutsThisWeek,
}) {
  // user-selected goal (local if not stored elsewhere)
  const [goal, setGoal] = useState(loadLocal("wf_selected_goal") || "fat_loss");

  // filter & search states
  const [query, setQuery] = useState("");
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState("any");
  const [selectedIntensity, setSelectedIntensity] = useState("any");
  const [selectedDuration, setSelectedDuration] = useState("any");
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [favorites, setFavorites] = useState(loadLocal(LS_KEYS.FAVS, []));
  const [todayWorkout, setTodayWorkout] = useState(loadLocal(LS_KEYS.TODAY, null));
  const [doneCountLocal, setDoneCountLocal] = useState(loadLocal(LS_KEYS.DONE_COUNT, 0));
  const effectiveDoneCount = typeof workoutsThisWeek === "number" ? workoutsThisWeek : doneCountLocal;

  // Sync selected goal to local storage
  useEffect(() => {
    saveLocal("wf_selected_goal", goal);
  }, [goal]);

  // Save favorites
  useEffect(() => {
    saveLocal(LS_KEYS.FAVS, favorites);
  }, [favorites]);

  // Save today's workout
  useEffect(() => {
    saveLocal(LS_KEYS.TODAY, todayWorkout);
  }, [todayWorkout]);

  // Save local done count if parent callback not provided
  useEffect(() => {
    if (!setWorkoutsThisWeek) saveLocal(LS_KEYS.DONE_COUNT, doneCountLocal);
  }, [doneCountLocal, setWorkoutsThisWeek]);

  // Build muscle list for filter chips
  const allMuscles = useMemo(() => {
    const set = new Set();
    WORKOUT_LIBRARY.forEach((w) => w.muscles.forEach((m) => set.add(m)));
    return Array.from(set);
  }, []);

  // Filtering logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORKOUT_LIBRARY.filter((w) => {
      if (selectedPhaseFilter !== "any" && !w.phases.includes(selectedPhaseFilter)) return false;
      if (selectedIntensity !== "any" && w.intensity !== selectedIntensity) return false;
      if (selectedDuration !== "any") {
        if (selectedDuration === "<30" && !(w.duration <= 30)) return false;
        if (selectedDuration === "30-45" && !(w.duration > 30 && w.duration <= 45)) return false;
        if (selectedDuration === ">45" && !(w.duration > 45)) return false;
      }
      if (selectedMuscles.length > 0) {
        // require at least one muscle match
        const intersects = w.muscles.some((m) => selectedMuscles.includes(m));
        if (!intersects) return false;
      }
      if (q) {
        const hay = `${w.title} ${w.description} ${w.muscles.join(" ")} ${w.goals.join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [query, selectedPhaseFilter, selectedIntensity, selectedDuration, selectedMuscles]);

  // Recommendation algorithm for "Today's recommended workout"
  const recommended = useMemo(() => {
    // priority list: match currentPhase & goal -> match goal -> phase -> any
    const today = new Date().toISOString().split("T")[0];
    // prefer workouts that match currentPhase and goal
    let pool = WORKOUT_LIBRARY.filter((w) => (currentPhase ? w.phases.includes(currentPhase) : true) && w.goals.includes(goal));
    if (pool.length === 0) pool = WORKOUT_LIBRARY.filter((w) => w.goals.includes(goal));
    if (pool.length === 0 && currentPhase) pool = WORKOUT_LIBRARY.filter((w) => w.phases.includes(currentPhase));
    if (pool.length === 0) pool = WORKOUT_LIBRARY.slice();

    // sort by small heuristics: duration close to 20-40 preferred, intensity matching energy (if phase)
    const energyPref = (phase) => {
      // map phases to preferred intensity
      if (!phase) return ["Medium", "Low", "High"];
      if (phase === "menstrual") return ["Low", "Medium"];
      if (phase === "follicular") return ["Medium", "High"];
      if (phase === "ovulation") return ["High", "Medium"];
      if (phase === "luteal") return ["Medium", "Low"];
      return ["Medium", "Low", "High"];
    };

    const intensityRank = energyPref(currentPhase);
    pool.sort((a, b) => {
      // prefer intensity ranking
      const ia = intensityRank.indexOf(a.intensity) >= 0 ? intensityRank.indexOf(a.intensity) : 99;
      const ib = intensityRank.indexOf(b.intensity) >= 0 ? intensityRank.indexOf(b.intensity) : 99;
      if (ia !== ib) return ia - ib;
      // prefer workouts that explicitly list the phase
      const aPhaseMatch = currentPhase && a.phases.includes(currentPhase) ? 0 : 1;
      const bPhaseMatch = currentPhase && b.phases.includes(currentPhase) ? 0 : 1;
      if (aPhaseMatch !== bPhaseMatch) return aPhaseMatch - bPhaseMatch;
      // prefer shorter duration slightly
      return a.duration - b.duration;
    });

    // return first item or null
    return pool.length > 0 ? pool[0] : null;
  }, [currentPhase, goal]);

  // handlers
  function toggleFavorite(id) {
    setFavorites((prev) => {
      if (prev.includes(id)) return prev.filter((p) => p !== id);
      return [...prev, id];
    });
  }

  function handleAddToToday(workout) {
    const payload = {
      date: new Date().toISOString().split("T")[0],
      workout,
    };
    setTodayWorkout(payload);
  }

  function handleMarkDone(workoutId) {
    // increment parent if provided, else local
    if (typeof setWorkoutsThisWeek === "function") {
      setWorkoutsThisWeek((prev) => (typeof prev === "number" ? prev + 1 : 1));
    } else {
      setDoneCountLocal((prev) => prev + 1);
    }
    // clear today's workout if it matches
    if (todayWorkout && todayWorkout.workout.id === workoutId) {
      setTodayWorkout(null);
    }
  }

  function clearFilters() {
    setQuery("");
    setSelectedPhaseFilter("any");
    setSelectedIntensity("any");
    setSelectedDuration("any");
    setSelectedMuscles([]);
  }

  // UI components
  function FilterPanel() {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <SearchIcon />
            <TextField
              placeholder="Search workouts, muscles, goals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="small"
              fullWidth
            />
            <Tooltip title="Clear filters">
              <IconButton onClick={clearFilters}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          <Grid container spacing={1}>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Phase</InputLabel>
                <Select value={selectedPhaseFilter} label="Phase" onChange={(e) => setSelectedPhaseFilter(e.target.value)}>
                  <MenuItem value="any">Any</MenuItem>
                  <MenuItem value="menstrual">Menstrual</MenuItem>
                  <MenuItem value="follicular">Follicular</MenuItem>
                  <MenuItem value="ovulation">Ovulation</MenuItem>
                  <MenuItem value="luteal">Luteal</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Intensity</InputLabel>
                <Select value={selectedIntensity} label="Intensity" onChange={(e) => setSelectedIntensity(e.target.value)}>
                  <MenuItem value="any">Any</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Duration</InputLabel>
                <Select value={selectedDuration} label="Duration" onChange={(e) => setSelectedDuration(e.target.value)}>
                  <MenuItem value="any">Any</MenuItem>
                  <MenuItem value="<30">&lt;= 30 min</MenuItem>
                  <MenuItem value="30-45">31–45 min</MenuItem>
                  <MenuItem value=">45">&gt; 45 min</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Goal</InputLabel>
                <Select value={goal} label="Goal" onChange={(e) => setGoal(e.target.value)}>
                  <MenuItem value="fat_loss">Fat loss</MenuItem>
                  <MenuItem value="curvy_shaping">Curvy shaping</MenuItem>
                  <MenuItem value="strength">Strength</MenuItem>
                  <MenuItem value="flexibility">Flexibility / Recovery</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography variant="caption">Filter by muscle (choose one or more):</Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {allMuscles.map((m) => (
                  <Chip
                    key={m}
                    label={m}
                    onClick={() =>
                      setSelectedMuscles((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]))
                    }
                    color={selectedMuscles.includes(m) ? "primary" : "default"}
                    clickable
                    variant={selectedMuscles.includes(m) ? "filled" : "outlined"}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }

  function TodayCard() {
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Today's Recommendation
          </Typography>

          {recommended ? (
            <>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h6">{recommended.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {recommended.duration} min • {recommended.intensity} • {recommended.muscles.join(", ")}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {recommended.description}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    onClick={() => handleAddToToday(recommended)}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Add to Today
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleMarkDone(recommended.id)}
                    startIcon={<CheckCircleOutlineIcon />}
                  >
                    Mark Done
                  </Button>
                  <IconButton onClick={() => toggleFavorite(recommended.id)} color={favorites.includes(recommended.id) ? "error" : "default"}>
                    <FavoriteIcon />
                  </IconButton>
                </Stack>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Why: Matches your {currentPhase ? `phase (${currentPhase})` : "today's energy"} and your goal ({goal.replace("_", " ")}).
                </Typography>
              </Box>
            </>
          ) : (
            <Typography>No recommendation available — try changing your goal or filters.</Typography>
          )}

          {todayWorkout ? (
            <Box sx={{ mt: 2 }}>
              <Divider />
              <Typography variant="subtitle2" sx={{ mt: 1 }}>
                Today's saved workout:
              </Typography>
              <Typography variant="body2">{todayWorkout.workout.title} • {todayWorkout.workout.duration} min</Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button size="small" onClick={() => handleMarkDone(todayWorkout.workout.id)}>
                  Mark Done
                </Button>
                <Button size="small" onClick={() => setTodayWorkout(null)}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ) : null}
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 800 }}>
        Personalized Workouts
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Phase-aware suggestions + goal-based planning + library with filters.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TodayCard />

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Quick Stats
              </Typography>
              <Typography variant="body2">Workouts this week: {effectiveDoneCount}</Typography>
              <Typography variant="body2">Active goal: {goal.replace("_", " ")}</Typography>
              <Typography variant="body2">Current phase: {currentPhase || "Unknown"}</Typography>
            </CardContent>
          </Card>

          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Favorites
              </Typography>
              {favorites.length === 0 ? (
                <Typography variant="body2">No favorites yet — click ♥ on a workout to save it.</Typography>
              ) : (
                <Stack spacing={1}>
                  {favorites.map((id) => {
                    const w = WORKOUT_LIBRARY.find((x) => x.id === id);
                    if (!w) return null;
                    return (
                      <Box key={id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="body2">{w.title}</Typography>
                        <Stack direction="row" spacing={1}>
                          <Button size="small" onClick={() => handleAddToToday(w)}>
                            Add
                          </Button>
                          <IconButton onClick={() => toggleFavorite(id)} size="small">
                            <FavoriteIcon color="error" />
                          </IconButton>
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <FilterPanel />

          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
            Library — {filtered.length} workouts
          </Typography>

          <Grid container spacing={2}>
            {filtered.map((w) => (
              <Grid item xs={12} sm={6} key={w.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {w.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {w.duration} min • {w.intensity} • {w.muscles.join(", ")}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {w.description}
                        </Typography>

                        <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                          {w.phases.map((p) => (
                            <Chip key={p} label={p} size="small" variant={currentPhase === p ? "filled" : "outlined"} />
                          ))}
                          {w.goals.map((g) => (
                            <Chip key={g} label={g.replace("_", " ")} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </Box>

                      <Stack spacing={1} alignItems="flex-end">
                        <Tooltip title="Add to Today">
                          <IconButton onClick={() => handleAddToToday(w)}>
                            <AddCircleOutlineIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Mark done">
                          <IconButton onClick={() => handleMarkDone(w.id)}>
                            <CheckCircleOutlineIcon />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title={favorites.includes(w.id) ? "Unfavorite" : "Add to favorites"}>
                          <IconButton onClick={() => toggleFavorite(w.id)} color={favorites.includes(w.id) ? "error" : "default"}>
                            <FavoriteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
