import React from "react";
import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

function WorkoutSuggestions() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Workout Suggestions</Typography>
        <List>
          <ListItem>Yoga</ListItem>
          <ListItem>Light Cardio</ListItem>
          <ListItem>Strength Training</ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

export default WorkoutSuggestions;